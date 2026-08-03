/**
 * Teste da lógica do bibliotecário (lib.mjs) — não precisa do MCP.
 * Roda: `node mcp/test.mjs`  (usa ../nephos-index.json ou env NEPHOS_INDEX).
 */
import assert from 'node:assert/strict';
import { loadIndex, search, getComponent, list, foundations } from './lib.mjs';

let pass = 0;
const ok = (label) => { pass++; console.log(`  ✓ ${label}`); };

const idx = await loadIndex();
console.log(`Índice: ${idx.counts.total} fichas (v${idx.version})\n`);

// 1) Busca em PT casa com o componente certo
{
  const hits = search(idx, 'campo de senha');
  assert.equal(hits[0].id, 'password', `esperava password, veio ${hits[0]?.id}`);
  ok('busca "campo de senha" → password');
}
// 2) Busca com acento/EN
{
  const hits = search(idx, 'navegação principal');
  assert.ok(hits.some((h) => h.id === 'menubar'), 'menubar deve aparecer');
  ok('busca "navegação principal" → inclui menubar');
}
{
  const hits = search(idx, 'search field');
  assert.ok(hits.some((h) => h.id === 'search-input'), 'search-input deve aparecer');
  ok('busca EN "search field" → inclui search-input');
}
// 3) Ficha completa por id
{
  const m = getComponent(idx, 'menubar');
  assert.equal(m.identity.id, 'menubar');
  assert.ok(Array.isArray(m.antiPatterns) && m.antiPatterns.length >= 3);
  ok('nephos_get menubar → ficha completa com anti-padrões');
}
// 4) id inexistente
{
  assert.equal(getComponent(idx, 'naoexiste'), null);
  ok('nephos_get id inválido → null');
}
// 5) Lista filtrada
{
  const blocks = list(idx, { category: 'block' });
  assert.ok(blocks.length >= 3, 'esperava ao menos 3 blocos');
  const own = list(idx, { origin: 'nephos-own' });
  assert.ok(own.some((m) => m.id === 'logo'));
  ok(`nephos_list category=block → ${blocks.length}; origin=nephos-own inclui logo`);
}
// 6) Fundações
{
  const typo = foundations(idx, 'typography');
  assert.equal(typo.family, 'Noto Sans');
  const icons = foundations(idx, 'icons');
  assert.equal(icons.defaultStyle, 'solid');
  assert.ok(icons.set.toLowerCase().includes('font awesome'));
  ok('nephos_foundations typography/icons → Noto Sans + FA7 solid');
}
// 6b) Setup: o agente que chega de FORA não clona o repositório — ele lê
//     daqui como instalar e configurar. Se esta seção sumir, ele acha o
//     componente certo e monta um projeto onde ele não renderiza.
{
  const s = foundations(idx, 'setup');
  assert.ok(Array.isArray(s.packages) && s.packages.length >= 4, 'setup.packages');
  assert.ok(s.packages.some((p) => p.name === '@iatec/nephos-blocks'), 'setup cita o nephos-blocks');
  // a ordem do styles.scss é o erro mais fácil de cometer
  const ordem = s.styles.ordem.join(' ');
  assert.ok(
    ordem.indexOf('nephos-ui') < ordem.indexOf('nephos-blocks'),
    'nephos-ui.scss vem ANTES do nephos-blocks.scss',
  );
  assert.ok(s.theme.provider.includes('darkModeSelector'), 'setup.theme traz o provider');
  assert.ok(s.brand.provider.includes('provideNephosBrand'), 'setup.brand traz o provider');
  ok('nephos_foundations setup → pacotes, ordem do styles, tema e marca');
}
// 7) Integridade: todo componente tem os 10 blocos
{
  const blocos = ['identity','purpose','api','relationships','tokens','antiPatterns','examples','a11y','aiHints','references'];
  for (const m of idx.components) {
    for (const b of blocos) assert.ok(m[b] != null, `${m.identity?.id} sem bloco ${b}`);
  }
  ok(`integridade: ${idx.components.length} fichas com os 10 blocos`);
}

// 8) Depreciado é rebaixado na busca (nunca 1ª escolha, some por último)
{
  const mk = (id, status) => ({
    identity: { id, name: id, category: 'atom', origin: 'primeng', status },
    purpose: { oneLiner: '', whenToUse: [] },
    aiHints: { keywords: ['widget teste xyz'], selectionCriteria: '', disambiguation: [] },
    relationships: { partOfPatterns: [] },
  });
  const fake = { components: [mk('velho-x', 'deprecated'), mk('novo-x', 'stable')] };
  const hits = search(fake, 'widget teste xyz');
  assert.equal(hits[0].id, 'novo-x', 'stable deve vir antes do deprecated');
  assert.equal(hits[hits.length - 1].id, 'velho-x', 'deprecated deve vir por último');
  ok('busca rebaixa deprecated → stable 1º, deprecated por último');
}

console.log(`\n✅ ${pass} testes passaram.`);
