#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────
 * Nephos MCP · server.mjs — o "bibliotecário" que o Moses consulta
 * ─────────────────────────────────────────────────────────────
 * Servidor MCP (stdio) que expõe o catálogo Nephos (`nephos-index.json`)
 * como ferramentas. O Moses (ou qualquer cliente MCP) pergunta
 * "campo de senha" e recebe a ficha certa — sem o Claude no meio.
 *
 * Ferramentas:
 *   • nephos_search      — busca componentes por termo livre
 *   • nephos_get         — ficha completa de um componente por id
 *   • nephos_list        — lista o catálogo (filtra por categoria/origin/status)
 *   • nephos_foundations — regras do sistema (cor/tipografia/ícones/fidelidade)
 *
 * Rodar:  node mcp/server.mjs   (usa ../nephos-index.json; ou env NEPHOS_INDEX)
 * ─────────────────────────────────────────────────────────────
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import {
  loadIndex,
  search,
  getComponent,
  list,
  foundations,
} from './lib.mjs';

const idx = await loadIndex();

const server = new McpServer({
  name: 'nephos-ds',
  version: idx.version ?? '2.0.0',
});

const asText = (obj) => ({
  content: [{ type: 'text', text: JSON.stringify(obj, null, 2) }],
});

server.tool(
  'nephos_search',
  'Busca componentes do Design System Nephos por termo livre (PT ou EN). ' +
    'Use quando precisar descobrir QUAL peça usar (ex.: "campo de senha", ' +
    '"aviso de erro", "menu de navegação"). Devolve os melhores resumos; ' +
    'depois chame nephos_get com o id para a ficha completa.',
  {
    query: z.string().describe('O que você precisa, em linguagem natural.'),
    limit: z.number().int().min(1).max(20).optional().describe('Máx. de resultados (padrão 8).'),
  },
  async ({ query, limit }) => {
    const hits = search(idx, query, limit ?? 8);
    if (hits.length === 0) {
      return asText({
        query,
        hits: [],
        dica: 'Nada encontrado. Se a peça não existe no catálogo, PERGUNTE ao time de DS — não invente (ver foundations.fidelityChecklist).',
      });
    }
    return asText({ query, hits });
  },
);

server.tool(
  'nephos_get',
  'Retorna a FICHA COMPLETA (.meta.ts) de um componente pelo id: propósito, ' +
    'API (inputs/outputs/slots/states/combinações inválidas), tokens, ' +
    'anti-padrões, exemplos (HTML semântico), acessibilidade e dicas. ' +
    'Abra a ficha ANTES de gerar qualquer HTML com a peça.',
  { id: z.string().describe('O id do componente, ex.: "password", "menubar".') },
  async ({ id }) => {
    const m = getComponent(idx, id);
    if (!m) {
      return asText({
        error: `Componente "${id}" não existe no catálogo.`,
        dica: 'Use nephos_search para encontrar o id certo, ou nephos_list para ver todos.',
      });
    }
    return asText(m);
  },
);

server.tool(
  'nephos_list',
  'Lista o catálogo de componentes (resumos). Filtre por category ' +
    '(atom/molecule/organism/block/layout), origin (primeng/primeng-extended/' +
    'nephos-own) e/ou status (draft/beta/stable/deprecated).',
  {
    category: z.enum(['atom', 'molecule', 'organism', 'block', 'layout']).optional(),
    origin: z.enum(['primeng', 'primeng-extended', 'nephos-own']).optional(),
    status: z.enum(['draft', 'beta', 'stable', 'deprecated']).optional(),
  },
  async (filters) => {
    const items = list(idx, filters);
    return asText({ total: items.length, filtros: filters, items });
  },
);

server.tool(
  'nephos_foundations',
  'Regras de FUNDAÇÃO do sistema (o essencial do design.md): modelo de cor ' +
    '(papel+passo), escala tipográfica, set de ícones (Font Awesome 7), ' +
    'multimarca, geometria herdada, e a CHECAGEM DE FIDELIDADE que deve rodar ' +
    'ANTES de gerar HTML. Consulte no início de qualquer geração. Para MONTAR ' +
    'um projeto do zero (pacotes, styles.scss, tema, marca, fonte, ícones), ' +
    'peça a seção `setup`.',
  {
    section: z
      .enum([
        'stack', 'setup', 'multibrand', 'colorModel', 'typography', 'icons',
        'geometry', 'fidelityChecklist', 'globalRules',
      ])
      .optional()
      .describe('Seção específica; omita para trazer tudo.'),
  },
  async ({ section }) => asText(foundations(idx, section)),
);

await server.connect(new StdioServerTransport());
// stderr não interfere no protocolo (stdout é do JSON-RPC).
console.error(
  `[nephos-ds] MCP no ar · ${idx.counts?.total ?? idx.components.length} fichas · índice ${idx.version}`,
);
