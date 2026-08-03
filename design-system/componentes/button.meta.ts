/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · button.meta.ts — PILOTO #1 do contrato
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → o Button é usado DIRETO do PrimeNG (p-button).
 * Não se reescreve nada; este metadado só orienta o Moses a ESCOLHER e
 * USAR certo, e aponta para a doc oficial. A identidade (cor da marca)
 * já chega pelo tema (nephos.preset.ts), sem tocar no componente.
 *
 * Saída do Moses 5.0 = HTML semântico puro: `<button>` age, `<a>` navega;
 * a variante viaja em `data-variant`, o significado viaja na tag.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const buttonMeta: NephosComponentMeta = {
  identity: {
    id: 'button',
    name: 'Button',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Gatilho interativo para uma ação que o usuário dispara e que altera o estado do sistema.',
    whenToUse: [
      'Ação primária de um formulário, modal ou barra de ações (salvar, confirmar, enviar).',
      'Confirmação de uma operação que muda dados.',
      'Ação secundária de apoio (cancelar, voltar) — em peso visual menor.',
    ],
    whenNotToUse: [
      'Navegar entre páginas ou abrir um endereço — use um link (`<a>`).',
      'Alternar um estado liga/desliga — use ToggleSwitch ou ToggleButton.',
      'Escolher entre poucas opções mutuamente exclusivas — use SelectButton.',
    ],
  },

  api: {
    // API real do PrimeNG p-button (v21). Documentamos o que existe, não inventamos.
    inputs: [
      {
        name: 'label',
        type: 'string',
        default: '—',
        description: 'Texto do botão. Verbo no infinitivo, curto ("Salvar", "Enviar"). Opcional quando o botão é só ícone (aí exige aria-label).',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast'",
        default: 'primary',
        description: 'Papel da ação na hierarquia. `primary` = ênfase da marca ativa (a ação esperada). `danger` = ação destrutiva. `secondary` = apoio neutro. As cores vêm do tema — nunca se escolhe cor à mão.',
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        description: 'Só contorno, fundo transparente. Rebaixa a ênfase — bom para a ação secundária ao lado de uma primária preenchida.',
      },
      {
        name: 'text',
        type: 'boolean',
        default: 'false',
        description: 'Sem fundo nem borda (só o texto/ícone). A menor ênfase possível — ações terciárias, "saiba mais", fechar.',
      },
      {
        name: 'raised',
        type: 'boolean',
        default: 'false',
        description: 'Adiciona sombra (elevação). Usar com parcimônia; a elevação é do PrimeNG, não se customiza.',
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        description: 'Cantos totalmente arredondados (pílula). Padrão do produto é o raio normal; usar só quando o padrão da tela pedir.',
      },
      {
        name: 'icon',
        type: 'string',
        default: '—',
        description: "Classe do ícone Font Awesome (ex.: 'fa-solid fa-check'). Reforça o rótulo; não substitui o texto, exceto em botão só-ícone com aria-label.",
      },
      {
        name: 'iconPos',
        type: "'left' | 'right' | 'top' | 'bottom'",
        default: 'left',
        description: 'Posição do ícone em relação ao rótulo.',
      },
      {
        name: 'size',
        type: "'small' | 'large'",
        default: '(normal)',
        description: 'Densidade. `small` só dentro de linhas de tabela ou barras densas. Omitir para o tamanho padrão.',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Mostra girador e bloqueia o clique enquanto a ação processa. Usar em ações assíncronas (salvar no servidor).',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Desabilita a ação. Preferir esconder a ação a desabilitá-la sem explicação; quando desabilitar, deixar claro o porquê no contexto.',
      },
      {
        name: 'fluid',
        type: 'boolean',
        default: 'false',
        description: 'Ocupa 100% da largura do contêiner. Comum em formulários estreitos/mobile.',
      },
    ],
    outputs: [
      {
        name: 'onClick',
        payload: 'MouseEvent',
        description: 'Disparado ao acionar o botão (clique, Enter ou Space).',
      },
    ],
    slots: [
      { name: 'default', accepts: 'texto curto (verbo no infinitivo) — alternativa ao input `label`' },
      { name: 'icon', accepts: 'ícone customizado no lugar do input `icon`', optional: true },
    ],
    states: ['default', 'hover', 'focus', 'active', 'disabled', 'loading'],
    invalidCombinations: [
      {
        combo: 'outlined=true + text=true',
        porque: 'São dois níveis de ênfase mutuamente exclusivos — o componente não pode ser contorno e sem-contorno ao mesmo tempo.',
      },
      {
        combo: 'text=true + raised=true',
        porque: 'Elevação (sombra) num botão sem fundo é contraditória: não há superfície para elevar.',
      },
      {
        combo: 'loading=true + disabled=true',
        porque: 'Redundante e confuso — `loading` já bloqueia o clique. Use apenas `loading` enquanto processa.',
      },
    ],
  },

  relationships: {
    parents: ['form-actions', 'dialog-footer', 'toolbar', 'card'],
    children: ['icon', 'progressspinner'],
    commonlyUsedWith: ['button', 'inputtext'],
    partOfPatterns: ['form-submission', 'destructive-confirmation'],
  },

  tokens: {
    // origin: 'primeng' → estes tokens VÊM do PrimeNG (component tokens do button).
    // Documentamos só o mapeamento de PAPEL para o Moses raciocinar. Nada é sobrescrito.
    typography: 'button-lg',
    byState: {
      // severity 'primary' (a ênfase). Ver design.md › Vocabulário de token.
      default: { background: 'primary/500', text: 'primary/contrast', border: 'primary/500' },
      hover: { background: 'primary/600' },
      active: { background: 'primary/700' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Para as demais severidades (danger, success…), a cor é o token de severity do próprio botão no PrimeNG, ancorado nos primitivos de feedback. Nunca referenciar hex nem nome de marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca dois botões de ênfase (severity primary, preenchido) lado a lado na mesma região de decisão.',
      porque: 'Destrói a hierarquia — o usuário não sabe qual é a ação esperada.',
      emVezDisso: 'Uma ação primária preenchida + as demais em `outlined` ou `text`.',
    },
    {
      regra: 'Nunca usar Button para navegar entre páginas ou abrir um endereço.',
      porque: 'Quebra a semântica do HTML, a acessibilidade e o "abrir em nova aba".',
      emVezDisso: 'Um link `<a href>` (com aparência de botão, se preciso).',
    },
    {
      regra: 'Nunca usar `<div>`/`<span>` clicável no lugar de `<button>`.',
      porque: 'Sem foco por teclado, sem papel de botão, sem acionar por Enter/Space — inacessível.',
      emVezDisso: 'Um `<button type="button">` real.',
    },
    {
      regra: 'Nunca deixar um botão só-ícone sem `aria-label`.',
      porque: 'O leitor de tela não tem texto para anunciar — a ação fica muda.',
      emVezDisso: 'Adicionar `aria-label` descritivo com o verbo da ação ("Excluir item").',
    },
    {
      regra: 'Nunca aplicar cor fora dos tokens de severity do tema.',
      porque: 'Introduz matiz não prevista e quebra a consistência entre as marcas.',
      emVezDisso: 'Escolher a `severity` adequada; se nenhuma serve, pedir ao time de DS.',
    },
  ],

  examples: {
    angular: `<p-button label="Salvar" severity="primary" (onClick)="salvar()" />`,
    html: `<button type="submit" data-variant="primary">Salvar</button>`,
    inContext: `<!-- rodapé de formulário: uma ênfase + um apoio -->
<div data-block="form-actions">
  <button type="button" data-variant="text" (click)="cancelar()">Cancelar</button>
  <button type="submit" data-variant="primary" (click)="salvar()">Salvar</button>
</div>`,
  },

  a11y: {
    role: 'button',
    keyboard: ['Enter e Space acionam', 'Tab entra e sai do botão'],
    requiredAria: ['aria-label obrigatório quando o botão é só ícone', 'aria-busy durante loading'],
    contrastMin: '4.5:1 entre texto e fundo em todos os estados',
  },

  aiHints: {
    keywords: [
      'botão', 'button', 'ação', 'acao', 'submit', 'enviar', 'salvar',
      'confirmar', 'cancelar', 'CTA', 'call to action', 'click', 'clicar',
      'limpar', 'limpar filtros', 'aplicar', 'botão de ação', 'botao de acao',
    ],
    selectionCriteria:
      'Escolha o Button quando o requisito descreve uma AÇÃO que o usuário dispara e que altera o estado do sistema. Se a descrição envolve ir para outra tela ou abrir um endereço, prefira um link. Se envolve alternar um estado, prefira Toggle.',
    disambiguation: [
      { confundeCom: 'link (<a>)', criterio: 'Button AGE (muda estado); link NAVEGA (muda de endereço).' },
      { confundeCom: 'togglebutton', criterio: 'ToggleButton fica pressionado representando um estado ligado/desligado; Button dispara e volta.' },
      { confundeCom: 'selectbutton', criterio: 'SelectButton é para escolher UMA entre opções; Button é uma ação única.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/button',
    figmaNode: 'https://www.figma.com/design/mHUXdyDZ820suwIRIIlp9Z/PrimeOne-4.0.0', // grupo "button" do PrimeOne 4.0.0
    storybookId: 'atoms-button',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Só a cor da marca entra pelo tema.',
  },
};
