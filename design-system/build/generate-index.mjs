/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · build/generate-index.mjs — GERADOR do nephos-index.json
 * ─────────────────────────────────────────────────────────────
 * Agrega todas as fichas `componentes/*.meta.ts` (via `componentes/index.ts`)
 * + as fundações (`nephos-foundations.json`) num único catálogo JSON que o
 * MCP serve ao Moses. É o passo de build citado na arquitetura de entrega.
 *
 * Como rodar (no repo, com Node ≥ 18):
 *   npm i -D esbuild
 *   node build/generate-index.mjs
 *
 * Saída: `nephos-index.json` na raiz da pasta do DS.
 *
 * Por que esbuild: as fichas são `.meta.ts` (TypeScript). O esbuild
 * transpila e junta tudo em memória (removendo os `import type`), então
 * importamos o módulo já em JS e serializamos os objetos. Nenhum valor é
 * inventado aqui — o JSON é reflexo fiel das fichas.
 * ─────────────────────────────────────────────────────────────
 */

import { build } from 'esbuild';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..'); // pasta do Design System

async function main() {
  // 1) Transpila + junta as fichas a partir de componentes/index.ts
  const entry = join(root, 'componentes', 'index.ts');
  const result = await build({
    entryPoints: [entry],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    logLevel: 'silent',
  });
  const code = result.outputFiles[0].text;

  // 2) Importa o bundle via data: URL (sem tocar no disco)
  const dataUrl =
    'data:text/javascript;base64,' + Buffer.from(code).toString('base64');
  const mod = await import(dataUrl);
  const components = mod.NEPHOS_COMPONENTS ?? [];
  if (!Array.isArray(components) || components.length === 0) {
    throw new Error('NEPHOS_COMPONENTS vazio — a agregação falhou.');
  }

  // 3) Fundações (o essencial do design.md em forma de dados)
  const foundations = JSON.parse(
    await readFile(join(root, 'nephos-foundations.json'), 'utf8'),
  );

  // 4) Contagens derivadas (não inventadas — calculadas das fichas)
  const by = (key, get) =>
    components.reduce((acc, m) => {
      const k = get(m);
      acc[k] = (acc[k] ?? 0) + 1;
      return acc;
    }, {});

  const counts = {
    total: components.length,
    byCategory: by('category', (m) => m.identity.category),
    byOrigin: by('origin', (m) => m.identity.origin),
    byStatus: by('status', (m) => m.identity.status),
  };

  // 5) Monta o índice. Ordem estável (por id) p/ diffs limpos no git.
  const sorted = [...components].sort((a, b) =>
    a.identity.id.localeCompare(b.identity.id),
  );

  const index = {
    $schema: 'nephos-index@2',
    name: 'Nephos Design System — índice do Moses',
    version: foundations?.stack ? '2.0.0' : '2.0.0',
    // generatedAt é preenchido pelo pipeline (evita diff a cada build local).
    generatedAt: process.env.NEPHOS_BUILD_TIME ?? null,
    stack: foundations.stack,
    counts,
    foundations,
    components: sorted,
  };

  const outPath = join(root, 'nephos-index.json');
  await writeFile(outPath, JSON.stringify(index, null, 2) + '\n', 'utf8');

  // Relatório curto no console.
  console.log(`✅ nephos-index.json gerado: ${counts.total} fichas`);
  console.log(`   por categoria:`, counts.byCategory);
  console.log(`   por origin:   `, counts.byOrigin);
  console.log(`   → ${outPath}`);
}

main().catch((err) => {
  console.error('❌ Falha ao gerar o índice:', err);
  process.exit(1);
});
