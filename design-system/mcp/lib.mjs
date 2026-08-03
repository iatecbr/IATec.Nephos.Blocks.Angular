/**
 * ─────────────────────────────────────────────────────────────
 * Nephos MCP · lib.mjs — a lógica do "bibliotecário" (pura, testável)
 * ─────────────────────────────────────────────────────────────
 * Carrega o `nephos-index.json` e responde consultas sobre o catálogo.
 * Sem dependência de MCP aqui — o `server.mjs` só liga estas funções
 * ao protocolo. Assim dá para testar a busca/consulta sem subir o servidor.
 * ─────────────────────────────────────────────────────────────
 */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Caminho do índice: env NEPHOS_INDEX, senão ../nephos-index.json. */
export function indexPath() {
  return process.env.NEPHOS_INDEX
    ? resolve(process.env.NEPHOS_INDEX)
    : join(__dirname, '..', 'nephos-index.json');
}

export async function loadIndex() {
  const raw = await readFile(indexPath(), 'utf8');
  const idx = JSON.parse(raw);
  if (!Array.isArray(idx.components)) {
    throw new Error('nephos-index.json inválido: falta `components`.');
  }
  return idx;
}

/** Resumo curto de uma ficha (o que a busca/lista devolvem). */
export function summarize(m) {
  return {
    id: m.identity.id,
    name: m.identity.name,
    category: m.identity.category,
    origin: m.identity.origin,
    status: m.identity.status,
    oneLiner: m.purpose?.oneLiner ?? '',
  };
}

function norm(s) {
  return String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, ''); // remove acentos p/ casar "botao" com "botão"
}

/** Palavras-vazias (PT/EN) que não devem pesar na busca. */
const STOP = new Set([
  'de', 'da', 'do', 'das', 'dos', 'para', 'pra', 'por', 'com', 'sem', 'em',
  'no', 'na', 'nos', 'nas', 'o', 'a', 'os', 'as', 'um', 'uma', 'e', 'ou',
  'que', 'the', 'of', 'for', 'to', 'in', 'on', 'and', 'or', 'field', 'campo',
]);
// nota: 'field'/'campo' são vazias porque quase toda ficha de formulário as cita.

function tokenize(s) {
  return norm(s)
    .split(/[^a-z0-9-]+/)
    .filter((t) => t.length >= 2 && !STOP.has(t));
}

/**
 * Pontua uma ficha contra os termos da busca. Conta termos DISTINTOS por
 * campo (evita inflar com repetição) e dá um bônus forte de COBERTURA —
 * casar mais termos da consulta vale mais que casar um termo várias vezes.
 */
function scoreComponent(m, terms) {
  const fields = [
    { w: 10, text: m.identity.id },
    { w: 9, text: m.identity.name },
    { w: 7, text: (m.aiHints?.keywords ?? []).join(' ') },
    { w: 5, text: m.purpose?.oneLiner ?? '' },
    { w: 3, text: (m.purpose?.whenToUse ?? []).join(' ') },
    { w: 2, text: m.aiHints?.selectionCriteria ?? '' },
    { w: 2, text: (m.relationships?.partOfPatterns ?? []).join(' ') },
    {
      w: 2,
      text: (m.aiHints?.disambiguation ?? [])
        .map((d) => `${d.confundeCom} ${d.criterio}`)
        .join(' '),
    },
  ].map((f) => ({ ...f, text: norm(f.text) }));

  let score = 0;
  const matchedTerms = new Set();
  for (const term of terms) {
    for (const f of fields) {
      if (f.text.includes(term)) {
        score += f.w;
        matchedTerms.add(term);
        if (f.w >= 9 && f.text === term) score += 15; // id/nome exatos
      }
    }
  }
  // Cobertura: proporção dos termos da consulta que a ficha casou.
  const coverage = terms.length ? matchedTerms.size / terms.length : 0;
  score += Math.round(30 * coverage);
  // Exige casar ao menos um termo além do trivial.
  return matchedTerms.size === 0 ? 0 : score;
}

/** Preferência em EMPATE: a peça menor antes do bloco (quem busca a peça quer a peça). */
const CATEGORY_RANK = { atom: 0, molecule: 1, organism: 2, block: 3, layout: 4 };

/** Busca por termo livre. Devolve resumos ordenados por relevância. */
export function search(idx, query, limit = 8) {
  const terms = tokenize(query);
  if (terms.length === 0) return [];
  const ranked = idx.components
    .map((m) => ({ m, score: scoreComponent(m, terms) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => {
      // depreciado SEMPRE por último: não some da busca (pode ser a única opção),
      // mas nunca é 1ª escolha — o Moses deve preferir o substituto (`replaces`).
      const da = a.m.identity.status === 'deprecated' ? 1 : 0;
      const db = b.m.identity.status === 'deprecated' ? 1 : 0;
      if (da !== db) return da - db;
      if (b.score !== a.score) return b.score - a.score;
      // desempate: categoria mais elementar primeiro, depois id alfabético
      const ca = CATEGORY_RANK[a.m.identity.category] ?? 9;
      const cb = CATEGORY_RANK[b.m.identity.category] ?? 9;
      if (ca !== cb) return ca - cb;
      return a.m.identity.id.localeCompare(b.m.identity.id);
    })
    .slice(0, limit)
    .map((r) => ({ ...summarize(r.m), score: r.score }));
  return ranked;
}

/** Ficha completa por id (ou null). */
export function getComponent(idx, id) {
  const key = norm(id).trim();
  return idx.components.find((m) => norm(m.identity.id) === key) ?? null;
}

/** Lista filtrada (resumos). Filtros opcionais: category, origin, status. */
export function list(idx, { category, origin, status } = {}) {
  return idx.components
    .filter((m) => !category || m.identity.category === category)
    .filter((m) => !origin || m.identity.origin === origin)
    .filter((m) => !status || m.identity.status === status)
    .map(summarize);
}

/** Fundações (design.md em dados). Seção opcional. */
export function foundations(idx, section) {
  const f = idx.foundations ?? {};
  if (!section) return f;
  return f[section] ?? { error: `Seção desconhecida: ${section}`, disponiveis: Object.keys(f) };
}
