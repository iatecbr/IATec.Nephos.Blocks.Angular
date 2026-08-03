import {InjectionToken, Provider} from '@angular/core';

/**
 * ─────────────────────────────────────────────────────────────
 * Nephos UI · a vertical ativa, injetada
 * ─────────────────────────────────────────────────────────────
 * Regra multimarca (`AGENTS.md` › Multimarca): **nenhum componente sabe
 * em qual das 7 verticais roda**. Nome e logo chegam pelo CONTEXTO,
 * exatamente como o papel `primary` chega pelo tema — nunca escritos no
 * HTML nem no componente.
 *
 * É por isso que este token existe: sem ele, a única forma de um `<img>`
 * saber qual logo mostrar seria alguém digitar o nome de uma marca.
 *
 * ⚠️ Isto NÃO é um seletor para o usuário. A vertical vem do ambiente
 * (domínio, tenant, sessão); quem escolhe é o sistema. O único eixo que
 * a pessoa controla é claro/escuro — ver `ThemeToggleComponent`.
 * ─────────────────────────────────────────────────────────────
 */
export interface NephosBrand {
    /** Nome da organização/vertical ativa. Vira o texto alternativo do logo. */
    name: string;

    /** Logo completo (símbolo + nome). Preferir SVG. */
    logoFull: string;

    /** Só o símbolo, para barra compacta e telas estreitas. */
    logoSymbol: string;
}

export const NEPHOS_BRAND = new InjectionToken<NephosBrand>('NEPHOS_BRAND');

/**
 * Declara a vertical ativa na raiz da aplicação:
 *
 *   providers: [provideNephosBrand(brandDoTenantAtual)]
 */
export function provideNephosBrand(brand: NephosBrand): Provider {
    return {provide: NEPHOS_BRAND, useValue: brand};
}
