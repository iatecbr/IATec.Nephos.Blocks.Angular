/**
 * Gera o ESPERADO das 14 combinações (7 marcas × 2 modos) para o par de
 * cor que os TEMPLATES usam — lendo o `nephos.palettes.ts` de verdade,
 * dentro do `@iatec/nephos-ui`.
 *
 * Irmão do `.prova-esperado.mjs`, que faz o mesmo para o realce dos
 * BLOCOS (chip de filtro, linha selecionada, barra de ações em massa).
 * Aqui o alvo é outro: a única superfície de marca que uma moldura tem é
 * o painel do `auth` no layout `split` — fundo `primary.color` + texto
 * `primary.contrastColor`, que é o par verificado marca a marca em
 * 31/07/2026.
 *
 * O passo da ênfase NÃO é fixo: vem de `BRAND_EMPHASIS` (o `comercial`
 * usa 600 no claro, os outros 500), e o texto vem de `BRAND_ON_PRIMARY`
 * (branco ou `surface/950`, marca a marca). Resolver essas referências
 * antes de comparar é o que evita um falso negativo em 14/14.
 *
 *   node .prova-templates-esperado.mjs
 */
import {build} from 'esbuild';
import {writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

const PALETAS = 'projects/iatec/nephos-ui/src/lib/theme/nephos.palettes.ts';
const SAIDA = 'dist/.prova-templates-palettes.mjs';

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

/** `{surface.950}` é referência de token: resolve na rampa slate. */
const resolverTexto = (valor) =>
    valor === p.ON_PRIMARY_DARK ? hexParaRgb(p.SURFACE_SLATE[950]) : hexParaRgb(valor);

const linhas = [];
for (const marca of p.NEPHOS_THEMES) {
    const rampa = p.BRAND_RAMPS[marca];
    const passo = p.BRAND_EMPHASIS[marca];
    const texto = p.BRAND_ON_PRIMARY[marca];

    linhas.push({
        marca,
        modo: 'claro',
        fundo: hexParaRgb(rampa[passo.light]),
        texto: resolverTexto(texto.light),
    });
    linhas.push({
        marca,
        modo: 'escuro',
        fundo: hexParaRgb(rampa[passo.dark]),
        texto: resolverTexto(texto.dark),
    });
}

writeFileSync('dist/.prova-templates-esperado.json', JSON.stringify(linhas, null, 2));
console.log(JSON.stringify(linhas, null, 2));
