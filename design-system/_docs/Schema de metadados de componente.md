---
tipo: especificacao
tags:
  - trabalho
  - design-system
  - nephos
  - metadados
  - ia-agente
---

# Schema de metadados de componente — Nephos

Contrato técnico que todo componente da biblioteca precisa cumprir para ser consumível pelo Moses. Deriva dos princípios em [[Princípios do Nephos]], adaptados para Angular + PrimeNG + saída HTML.

> **Por que definir isto antes do primeiro componente:** se o schema nascer depois de 10 componentes prontos, os 10 precisam ser refeitos. O custo de mudar o schema cresce linearmente com o tamanho da biblioteca.

---

## Decisão de formato

**Fonte da verdade:** `<componente>.meta.ts` — TypeScript, tipado, colocado ao lado do componente.

**Consumo pelo MCP:** um passo de build agrega todos os `.meta.ts` num `nephos-index.json`.

### Por que TypeScript e não JSON ou Markdown puro

| Critério | `.meta.ts` | `.meta.json` | Markdown |
|---|---|---|---|
| Erro de schema pega em build | ✅ | ⚠️ (só com JSON Schema) | ❌ |
| Autocomplete ao escrever | ✅ | ⚠️ | ❌ |
| Impossível ficar dessincronizado do componente | ✅ (mesma pasta, mesmo PR) | ✅ | ❌ (vira doc órfã) |
| Legível pela IA | ✅ | ✅ | ✅ |
| Consumível pelo MCP | via build | ✅ direto | ⚠️ |

O `.ts` dá a garantia que mais importa num sistema mantido por IA: **é impossível commitar um metadado incompleto**, porque o type-check quebra. Anti-padrão sem `porque` não compila. É enforcement estrutural, não disciplina humana.

### Localização

```
packages/ui-next/src/lib/button/
  ├── button.component.ts
  ├── button.component.html
  ├── button.meta.ts          ← contrato
  ├── button.stories.ts
  └── button.docs.md          ← narrativa longa, se necessário
```

---

## Os 10 blocos do schema

Os **4 pilares** (componente / props / relações / tokens+hints), expandidos com 6 blocos que o nosso contexto exige — marcados com 🆕.

### 1. `identity` — o que é

```ts
identity: {
  id: 'nephos-button',
  name: 'Button',
  category: 'atom',              // atom | molecule | organism | block | layout
  status: 'stable',              // draft | beta | stable | deprecated
  version: '1.0.0',
  origin: 'primeng-extended',    // 🆕 primeng | primeng-extended | nephos-own
  replaces: null,                // id do componente legado, se houver
}
```

🆕 **`origin` é o campo mais importante para nós.** Ele resolve a diretriz de *não duplicar toda a base do PrimeNG, documentar só o que é nosso*. Três valores, três comportamentos:

- `primeng` — usar direto, sem wrapper. O metadado existe só para orientar a escolha e apontar para a doc oficial
- `primeng-extended` — envolvemos com regras/tokens/comportamento próprios. Documentar **o delta**
- `nephos-own` — componente que não existe no PrimeNG. Documentação completa obrigatória

Isso também responde a "quais componentes do Prime UI são usados sem alteração" — a resposta é uma consulta ao campo.

### 2. `purpose` — por que existe

```ts
purpose: {
  oneLiner: 'Gatilho interativo para uma única ação decisiva do usuário.',
  whenToUse: [
    'Ação primária de um formulário ou modal',
    'Confirmação de operação que altera estado',
  ],
  whenNotToUse: [
    'Navegação entre páginas — use Link',
    'Alternar estado binário — use Toggle ou Switch',
  ],
}
```

Linguagem natural, frases completas. É o texto que a IA lê para decidir *se* pega este componente.

### 3. `api` — o contrato técnico

```ts
api: {
  inputs: [
    {
      name: 'variant',
      type: "'emphasis' | 'default' | 'subtle' | 'danger'",
      default: 'default',
      description: 'Peso visual da ação na hierarquia da tela.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: 'md',
      description: 'Densidade. Use sm apenas dentro de linhas de tabela.',
    },
  ],
  outputs: [
    { name: 'clicked', payload: 'MouseEvent', description: '...' },
  ],
  slots: [
    { name: 'default', accepts: 'texto curto, verbo no infinitivo' },
    { name: 'icon-start', accepts: 'ícone do set Nephos', optional: true },
  ],
  states: ['default', 'hover', 'focus', 'active', 'disabled', 'loading'],
  invalidCombinations: [
    {
      combo: "variant='subtle' + size='lg'",
      porque: 'Ação de baixa ênfase em tamanho grande gera hierarquia contraditória.',
    },
  ],
}
```

**`description` em toda propriedade é obrigatório.** Sem ela a IA escolhe a variante pelo nome, e nome não carrega critério.

**`invalidCombinations` é o que impede a IA de inventar variantes** que existem no type system mas não fazem sentido no produto.

### 4. `relationships` — onde vive

```ts
relationships: {
  parents: ['nephos-form-actions', 'nephos-modal-footer', 'nephos-toolbar'],
  children: ['nephos-icon', 'nephos-spinner'],
  commonlyUsedWith: ['nephos-button', 'nephos-link'],
  partOfPatterns: ['form-submission', 'destructive-confirmation'],
}
```

Responde à pergunta "o que vai dentro dele" e "onde ele pode aparecer" — as perguntas 3 e 1 das cinco perguntas silenciosas.

### 5. `tokens` — o que consome

O bloco `tokens` carrega **cor por papel + passo**, `byState` mapeado ao vocabulário semantic do PrimeNG e tipografia por papel. Nunca um valor bruto.

```ts
tokens: {
  color: {
    background: 'primary/500',   // papel/passo — nunca hex, nunca marca
    text: 'base/white',
    border: 'neutral/300',
  },
  byState: {
    default: 'primary.color',
    hover:   'primary.hoverColor',
    active:  'primary.activeColor',
    focus:   'focusRing.color',
  },
  typography: 'button-lg',        // papel tipográfico por papel
  // spacing, radius, elevation → herdam do PrimeNG (formField.*, content.borderRadius)
}
```

Spacing, radius e elevação vêm do PrimeNG (raio de campo/botão 6px, card 12px). É proibido fixá-los como valor bruto — campo ausente herda do motor de tema, nunca campo com valor provisório inventado.

Regras que já valem:
- Cor sempre por **papel + passo** (`primary/500`, `feedback.danger/500`), nunca hex
- `byState` (default/hover/active/focus) aponta para os nomes semantic do PrimeNG (`colorScheme.*.primary.*`, `highlight.*`, `focusRing.*`)
- **Só os quatro papéis existem:** `primary`, `secondary`, `neutral`, `feedback.*`. Cor que não cabe neles → pedir, não inventar

🔺 **Neutralidade de marca — restrição dura.** O Nephos é multimarca: sete temas (`global`, `educacao`, `financeiro`, `comercial`, `igrejas`, `recursos-humanos`, `gerencial`). Trocar o tema troca **uma única paleta**: `primary`. Portanto:

- **Nenhum nome de marca pode aparecer em `.meta.ts` nenhum** — nem no token, nem na descrição, nem no exemplo
- **Nenhuma referência a primitivo** (`brand/educacao/500`). Só papel + passo
- Descrições falam de papel — *"cor de ênfase da marca ativa"* — nunca de cor concreta (*"laranja"*)

Um metadado que menciona cor concreta funciona numa vertical e quebra silenciosamente nas outras seis. Adicionar à validação automática `token-audit`. Ver [[design]] §Multimarca.

### 6. `antiPatterns` 🔺 — o bloco mais importante

```ts
antiPatterns: [
  {
    regra: 'Nunca dois botões variant="emphasis" lado a lado.',
    porque: 'Destrói a hierarquia de decisão; o usuário não sabe qual é a ação esperada.',
    emVezDisso: 'Um emphasis + um default, ou um emphasis + um link de texto.',
  },
  {
    regra: 'Nunca usar Button para navegar entre páginas.',
    porque: 'Quebra semântica de HTML, acessibilidade e o comportamento de abrir em nova aba.',
    emVezDisso: 'nephos-link',
  },
  {
    regra: 'Nunca aplicar cor fora dos tokens de variant.',
    porque: 'Introduz matiz não prevista e quebra a consistência do tema.',
    emVezDisso: 'Solicitar nova variante ao time de DS.',
  },
]
```

**Mínimo de 3 por componente.** Sempre no formato tripla `regra / porque / emVezDisso` — o `emVezDisso` é o que transforma uma proibição em decisão executável: sem ele a IA sabe que errou, mas não sabe para onde ir.

### 7. `examples` 🆕 — incluindo HTML

```ts
examples: {
  angular: `<nephos-button variant="emphasis" (clicked)="salvar()">Salvar</nephos-button>`,
  html: `<button type="submit" data-variant="emphasis">Salvar</button>`,
  inContext: `<nephos-form-actions>
  <nephos-button variant="default" (clicked)="cancelar()">Cancelar</nephos-button>
  <nephos-button variant="emphasis" (clicked)="salvar()">Salvar</nephos-button>
</nephos-form-actions>`,
}
```

🆕 **O exemplo em HTML puro é a adaptação crítica ao Moses 5.0.** No nosso fluxo o artefato validável é HTML — se o metadado só carregar o exemplo Angular, o Moses gera HTML por inferência, que é exatamente onde a alucinação acontece.

🆕 **`inContext`** mostra composição real. É o que ensina hierarquia melhor do que qualquer descrição textual.

**HTML de saída: semântico puro.** Sem classes de framework. A variante viaja em `data-variant`, o significado viaja na tag (`<button>` para ação, `<a>` para navegação). Consequência prática: o anti-padrão *"nunca `<div>` clicável no lugar de `<button>`"* é regra de sistema, porque a semântica da tag é a única informação que sobrevive no artefato entregue.

### 8. `a11y` 🆕

```ts
a11y: {
  role: 'button',
  keyboard: ['Enter e Space acionam', 'Tab entra e sai'],
  requiredAria: ['aria-label obrigatório quando só tem ícone'],
  contrastMin: '4.5:1 texto sobre fundo em todos os states',
}
```

🆕 Num DS corporativo a acessibilidade é requisito, e é barato de codificar aqui — vira validação automática depois.

### 9. `aiHints` — como o MCP encontra este componente

```ts
aiHints: {
  keywords: ['botão', 'button', 'ação', 'submit', 'confirmar', 'salvar', 'CTA'],
  selectionCriteria: 'Escolha este componente quando o requisito descrever uma ação que o usuário dispara e que altera estado do sistema. Se a descrição envolver ir para outra tela, prefira Link.',
  disambiguation: [
    { confundeCom: 'nephos-link', criterio: 'Button age, Link navega.' },
    { confundeCom: 'nephos-icon-button', criterio: 'Use icon-button apenas em toolbars densas, sem texto.' },
  ],
}
```

🆕 **`disambiguation` é adição nossa.** Com o catálogo enorme do PrimeNG, o erro provável é **escolher o componente errado entre vários parecidos**. Este campo ataca isso diretamente — e é o que faz a busca do MCP retornar o item certo.

`keywords` em **português e inglês** — os requisitos chegam em português, a base de código está em inglês.

### 10. `references`

```ts
references: {
  figmaNode: 'https://figma.com/...',
  storybookId: 'atoms-button',
  primengDocs: 'https://primeng.org/button',
  deltaFromPrimeng: 'Adiciona variant=subtle e estado loading; remove severity nativo.',
}
```

🆕 `deltaFromPrimeng` só existe quando `origin === 'primeng-extended'`. É o que evita duplicar a doc do PrimeNG — documentamos a diferença, não o todo.

---

## Definition of Done de um componente

Um componente só entra na biblioteca quando:

- [ ] `.meta.ts` completo, com type-check passando
- [ ] Mínimo de 3 anti-padrões no formato `regra / porque / emVezDisso`
- [ ] Todos os `inputs` com `description` preenchida
- [ ] Bloco `tokens` sem nenhum valor bruto (hex/px)
- [ ] Exemplos `angular`, `html` e `inContext` presentes
- [ ] Story no Storybook cobrindo todos os `states` e variantes
- [ ] Aba Metadata renderizando o `.meta.ts` no Storybook
- [ ] Validação visual contra o Figma/plataforma (checar *token mismatch*)
- [ ] `origin` declarado corretamente
- [ ] **Checagem de fidelidade passou** (cor por papel+passo, geometria herdada, HTML semântico) — ver `Como o Moses usa o Nephos` › Checagem de fidelidade

---

## Validações automáticas

Rodam como skill sobre as fichas (ver [[Princípios do Nephos]]):

1. **`meta-completeness`** — todo componente tem `.meta.ts`, com os 10 blocos
2. **`token-audit`** — nenhum valor *hardcoded* em `tokens` nem no CSS do componente
3. **`antipattern-minimum`** — mínimo de 3, todos com as três chaves
4. **`orphan-check`** — todo `relationships.parents` aponta para id existente

---

## Fundações do sistema

Fatos do sistema que o schema assume:

1. **Stack** — PrimeNG **21.0.2 + `@primeuix/themes` 2.0.2** (theming moderno), preset oficial **Aura**. Repo base: `IATec.Nephos.Blocks.Angular`.
2. **HTML de saída: semântico puro.** Sem classes de framework. Variante em `data-variant`, significado na tag.
3. **Blocos e layouts usam o mesmo schema**, com `category: 'block' | 'layout'` e o peso da composição em `api.slots`. Um schema só.
4. **Versionamento por componente.** É o que permite ao Moses saber que um padrão foi abandonado. `status: 'deprecated'` + `replaces` fazem o par.
5. **`byState`, spacing, radius, elevação** — o vocabulário semantic existe e está mapeado: `byState` (hover/active/foco/texto-sobre-cor) → `colorScheme.*.primary.*` e `highlight.*`; spacing/radius → `formField.*` e `content.borderRadius`. Ver [[design]] › Vocabulário de token.
6. **Papel `secondary`** — é a rampa `slate` = `surface` do PrimeNG.
7. **Papel `neutral`** — é a rampa `gray`, o padrão do PrimeNG (Tailwind).
8. **Passo `primary/950`** — o contraste do modo escuro roteia para `surface.950`; a rampa de marca fica em 50–900.

O contrato é código em `componentes/component-meta.type.ts` — o type-check garante os 10 blocos.
