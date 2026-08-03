/**
 * Gera o ESPERADO das 14 combinações (7 marcas × 2 modos) lendo o
 * `nephos.palettes.ts` DE VERDADE — agora dentro do pacote
 * `@iatec/nephos-ui`, não mais numa pasta de documentação.
 *
 * Compara-se contra o que o Storybook mede com `getComputedStyle`. Se os
 * dois batem, o realce da marca (chip de filtro ativo, linha selecionada,
 * barra de ações em massa) está saindo da paleta declarada.
 *
 *   node .prova-esperado.mjs
 */
import {build} from 'esbuild';
import {writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

const PALETAS = 'projects/iatec/nephos-ui/src/lib/theme/nephos.palettes.ts';
const SAIDA = 'dist/.prova-palettes.mjs';

await build({
    entryPoints: [PALETAS],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile: SAIDA,
});

const p = await import(pathToFileURL(SAIDA).href);

const hexParaRgb = (hex) => {
    const n = parseInt(hex.replace('#', ''), 16);
    return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
};

const linhas = [];
for (const marca of p.NEPHOS_THEMES) {
    const rampa = p.BRAND_RAMPS[marca];
    // preset: highlight.background = {primary.50} · color = {primary.700}
    linhas.push({marca, modo: 'claro', hb: hexParaRgb(rampa[50]), hc: hexParaRgb(rampa[700])});
    // escuro: color-mix(in srgb, {primary.400}, transparent 84%) + rgba(255,255,255,.87)
    linhas.push({marca, modo: 'escuro', hb: rampa[400], hc: 'rgba(255, 255, 255, 0.87)'});
}

writeFileSync('dist/.prova-esperado.json', JSON.stringify(linhas, null, 2));
console.log(JSON.stringify(linhas));
