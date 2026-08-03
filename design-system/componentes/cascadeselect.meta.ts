/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · cascadeselect.meta.ts — família "Campos de seleção"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-cascadeselect`. API lida do código real
 * (primeng@21.0.2, `types/primeng-cascadeselect.d.ts`).
 *
 * Escolher UM valor navegando por uma estrutura em NÍVEIS
 * (categoria › subcategoria › item). Abre um overlay que revela o
 * próximo nível ao passar por um grupo. Guarda a folha escolhida.
 * Saída = combobox que abre um menu/árvore de opções, com rótulo.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const cascadeSelectMeta: NephosComponentMeta = {
  identity: {
    id: 'cascadeselect',
    name: 'CascadeSelect',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Escolher UM valor navegando por uma hierarquia em níveis (categoria › subcategoria › item).',
    whenToUse: [
      'A opção final vive dentro de uma árvore conhecida: país › estado › cidade, categoria › subcategoria › produto.',
      'Quando expor todos os níveis de uma vez (vários selects encadeados) ocuparia espaço demais.',
    ],
    whenNotToUse: [
      'Lista plana, de um nível só — use Select.',
      'Escolher VÁRIOS itens — use MultiSelect.',
      'A pessoa quer digitar e filtrar em massa numa base grande/aberta — use AutoComplete.',
      'Só dois níveis rasos e ambos importam à vista — dois Selects dependentes são mais claros.',
    ],
  },

  api: {
    inputs: [
      { name: 'options', type: 'any[]', default: '[]', description: 'A árvore de opções (grupos com filhos). Obrigatório.' },
      { name: 'optionLabel', type: 'string', default: '—', description: 'Campo de cada opção-folha que vira o texto visível.' },
      { name: 'optionValue', type: 'string', default: '—', description: 'Campo da folha que vira o valor guardado. Sem ele, guarda o objeto inteiro.' },
      { name: 'optionGroupLabel', type: 'string', default: '—', description: 'Campo que rotula um nível de agrupamento (o texto do grupo intermediário).' },
      { name: 'optionGroupChildren', type: 'string[] | string', default: '—', description: 'Campo(s) que contêm os filhos de cada nível — um por nível de profundidade. Define quantos níveis a árvore tem.' },
      { name: 'placeholder', type: 'string', default: '—', description: 'Texto quando nada foi escolhido ("Selecione…"). Não substitui o rótulo.' },
      { name: 'showClear', type: 'boolean', default: 'false', description: 'Mostra um "x" para limpar a escolha. Só quando "nenhum" é um estado válido.' },
      { name: 'size', type: "'small' | 'large'", default: '(normal)', description: 'Densidade do campo. `small` em áreas densas. Omitir para o padrão.' },
      { name: 'variant', type: "'outlined' | 'filled'", default: 'outlined', description: 'Estilo da borda. Manter o mesmo variant em todos os campos do formulário.' },
      { name: 'fluid', type: 'boolean', default: 'false', description: 'Ocupa 100% da largura do contêiner. Comum em formulário de coluna única.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Estado de carregando (níveis vindo do servidor). Mostra o `loadingIcon`.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o campo. Se o motivo não é óbvio, explicar no contexto.' },
      { name: 'invalid', type: 'boolean', default: 'false', description: 'Marca como inválido (borda de erro). Anda junto com a mensagem e o aria-invalid.' },
      { name: 'optionDisabled', type: 'any', default: '—', description: 'Campo que marca uma opção como desabilitada dentro da árvore.' },
      { name: 'inputId', type: 'string', default: '—', description: 'Id do elemento focável interno — o `for` do `<label>` aponta para ele.' },
      { name: 'ariaLabel', type: 'string', default: '—', description: 'Nome acessível quando não há `<label>` visível ligado.' },
    ],
    outputs: [
      { name: 'onChange', payload: '{ originalEvent, value }', description: '⭐ A opção-folha escolhida mudou.' },
      { name: 'onGroupChange', payload: 'Event', description: 'Entrou/navegou para outro grupo (nível) da árvore.' },
      { name: 'onShow', payload: 'CascadeSelectShowEvent', description: 'Abriu o overlay.' },
      { name: 'onHide', payload: 'CascadeSelectHideEvent', description: 'Fechou o overlay.' },
      { name: 'onClear', payload: 'any', description: 'Limpou a escolha (showClear).' },
      { name: 'onFocus', payload: 'FocusEvent', description: 'O campo recebeu foco.' },
      { name: 'onBlur', payload: 'FocusEvent', description: 'O campo perdeu foco.' },
    ],
    slots: [
      { name: 'value', accepts: 'template do que aparece no campo depois de escolhido', optional: true },
      { name: 'option', accepts: 'template de cada opção (ícone + texto)', optional: true },
      { name: 'header', accepts: 'template do topo do overlay', optional: true },
      { name: 'footer', accepts: 'template do rodapé do overlay', optional: true },
      { name: 'triggerIcon', accepts: 'ícone do gatilho (setinha)', optional: true },
      { name: 'groupIcon', accepts: 'ícone que indica "tem mais um nível"', optional: true },
      { name: 'clearIcon', accepts: 'ícone do botão limpar', optional: true },
    ],
    states: ['default', 'hover', 'focus', 'open', 'filled', 'invalid', 'disabled', 'loading'],
    invalidCombinations: [
      {
        combo: 'CascadeSelect sem `<label>` associado',
        porque: 'O controle sem rótulo não é anunciado; a pessoa não sabe o que está escolhendo.',
      },
      {
        combo: 'CascadeSelect para uma lista plana (um nível só)',
        porque: 'A navegação em níveis vira um clique a mais sem motivo; isso é um Select.',
      },
      {
        combo: 'optionGroupChildren que não bate com a profundidade real da árvore',
        porque: 'Faltando um nível, os filhos não aparecem e a árvore quebra na navegação.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'floatlabel', 'toolbar'],
    children: ['icon'],
    commonlyUsedWith: ['label', 'helper-text', 'select', 'button'],
    partOfPatterns: ['form-submission', 'filters', 'form-field'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      default: { border: 'surface/300', text: 'surface/text', background: 'surface/0' },
      hover: { border: 'surface/400' },
      focus: { border: 'primary/color', ring: 'focus/ring' },
      optionActive: { background: 'primary/50', text: 'primary/color' },
      invalid: { border: 'feedback.danger/500' },
    },
    note: 'Campo herda os tokens de formulário do PrimeNG (formField.*); o overlay e os níveis herdam de overlay/menu. Realce da opção ativa = ênfase da marca (primary). Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar CascadeSelect sem `<label>` associado.',
      porque: 'O leitor de tela não anuncia o campo e a pessoa perde a referência quando o placeholder some.',
      emVezDisso: 'Um `<label for>` ligado ao controle (visível ou com FloatLabel).',
    },
    {
      regra: 'Nunca usar CascadeSelect para uma lista de um nível só.',
      porque: 'Obriga navegar por níveis que não existem — mais cliques sem ganho.',
      emVezDisso: 'Select para lista plana; CascadeSelect só quando há hierarquia real.',
    },
    {
      regra: 'Nunca esconder a trilha escolhida atrás de um rótulo curto ambíguo.',
      porque: 'Com hierarquia, ver só "Centro" não diz de qual cidade/estado veio.',
      emVezDisso: 'Mostrar o caminho completo no campo (ex.: "SP › Campinas › Centro") ou o rótulo da folha sem ambiguidade.',
    },
    {
      regra: 'Nunca aninhar níveis demais.',
      porque: 'Três ou mais saltos para chegar na folha cansam e escondem opções.',
      emVezDisso: 'Achatar a árvore, agrupar, ou trocar por AutoComplete com busca quando a base é grande.',
    },
  ],

  examples: {
    angular: `<label for="local">Localidade</label>
<p-cascadeselect inputId="local" [(ngModel)]="local" [options]="regioes"
  optionLabel="nome" optionValue="codigo"
  optionGroupLabel="nome" [optionGroupChildren]="['estados', 'cidades']"
  placeholder="Selecione a cidade" [fluid]="true" (onChange)="aplicar($event)" />`,
    html: `<label for="local">Localidade</label>
<button id="local" role="combobox" aria-haspopup="tree" aria-expanded="false"
        aria-controls="local-tree">Selecione a cidade</button>
<ul id="local-tree" role="tree" aria-label="Localidade" hidden>
  <li role="treeitem" aria-expanded="false"><span>São Paulo</span>
    <ul role="group">
      <li role="treeitem" aria-expanded="false"><span>Campinas</span>
        <ul role="group">
          <li role="treeitem"><span>Centro</span></li>
        </ul>
      </li>
    </ul>
  </li>
</ul>`,
    inContext: `<!-- campo hierárquico dentro de um formulário -->
<div data-block="form-field">
  <label for="cat">Categoria do produto <span aria-hidden="true">*</span></label>
  <button id="cat" role="combobox" aria-required="true"
          aria-haspopup="tree" aria-expanded="false" aria-controls="cat-tree"
          aria-describedby="cat-ajuda">Selecione</button>
  <ul id="cat-tree" role="tree" aria-label="Categoria" hidden><!-- níveis --></ul>
  <small id="cat-ajuda">Escolha a subcategoria final.</small>
</div>`,
  },

  a11y: {
    role: 'combobox que abre uma árvore de opções em níveis (tree)',
    keyboard: [
      'Enter/Espaço/seta ↓ abrem o overlay',
      'setas ↑/↓ percorrem o nível; seta → entra no próximo nível, seta ← volta',
      'Enter escolhe a folha; Esc fecha; digitar salta para a opção',
    ],
    requiredAria: [
      'sempre um `<label for>` associado (ou aria-label)',
      'gatilho com role="combobox" e aria-expanded',
      'níveis anunciados (tree/treeitem com aria-expanded); opção ativa com foco visível',
    ],
    contrastMin: '4.5:1 do texto e das opções; 3:1 do realce da opção ativa e do foco',
  },

  aiHints: {
    keywords: [
      'cascadeselect', 'cascade', 'seleção em níveis', 'selecao em niveis', 'hierarquia',
      'categoria subcategoria', 'árvore de opções', 'arvore de opcoes', 'níveis', 'niveis',
      'pais estado cidade', 'país estado cidade', 'select aninhado', 'seleção hierárquica', 'selecao hierarquica',
    ],
    selectionCriteria:
      'Escolha CascadeSelect para escolher UM valor que vive numa HIERARQUIA em níveis (categoria › subcategoria › item), economizando o espaço de vários selects. Lista plana = Select. Várias escolhas = MultiSelect. Base grande com busca livre = AutoComplete.',
    disambiguation: [
      { confundeCom: 'select', criterio: 'Select é lista plana de um nível; CascadeSelect navega por níveis aninhados.' },
      { confundeCom: 'multiselect', criterio: 'MultiSelect marca VÁRIOS de uma lista fechada; CascadeSelect escolhe UM dentro de uma árvore.' },
      { confundeCom: 'autocomplete', criterio: 'AutoComplete filtra digitando numa base grande/aberta; CascadeSelect navega uma árvore conhecida.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/cascadeselect',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída = combobox que abre uma árvore de opções (tree) ARIA. Escolha única plana em `select.meta.ts`; múltipla em `multiselect.meta.ts`.',
  },
};
