---
# ─────────────────────────────────────────────────────────────
# Nephos Design System — especificação legível por máquina
# Padrão: YAML front-matter + corpo Markdown.
# Primeira coisa que qualquer agente lê antes de criar ou
# modificar interface. Esta é a fonte normativa do sistema.
# ─────────────────────────────────────────────────────────────

name: Nephos
version: 4.0.0

stack:
  framework: angular
  component_base: primeng
  primeng: 21.0.2
  themes_engine: "@primeuix/themes 2.0.2"
  theme_preset: aura
  storybook: true

output:
  primary_artifact: html-semantic
  # O produto gera HTML semântico puro. Sem classes de framework.

icons:
  set: font-awesome-7-pro
  default_style: solid
  syntax: '<i class="fa-solid fa-<nome>"></i>'
  scope: all            # inclusive os ícones internos dos componentes PrimeNG

# ── Fonte da verdade ──────────────────────────────────────────
source_of_truth:
  normative: "design.md + *.meta.ts no repositório"

# ── Arquitetura de tokens ─────────────────────────────────────
# A IA consome SEMPRE a camada de papel (role). Nunca a primitiva.
token_architecture:
  primitive:
    name: core
    count: 168
    groups: [base, brand, slate, gray, sky, green, orange, red, purple]
    description: "Rampas cruas. Uso direto em componente é PROIBIDO."
  role:
    name: role
    description: "Camada semântica (primary, surface, neutral, feedback). É esta que componentes e IA consomem."

# ── Multimarca ────────────────────────────────────────────────
# Trocar de marca = trocar o tema ativo. Um único papel varia:
# `primary`. Nenhum componente sabe em qual marca roda.
branding:
  mechanism: theme-switch
  active_theme_default: global
  dark_mode_selector: ".app-dark"
  axes:
    brand: "primary — a vertical ativa"
    color_scheme: "surface — claro/escuro"
  themes:
    - global
    - educacao
    - financeiro
    - comercial
    - recursos-humanos
    - igrejas
    - gerencial
  theme_dependent:
    - primary        # ÚNICO papel que varia
  theme_independent:
    - surface        # slate
    - neutral        # gray
    - feedback       # info/success/warn/danger/help
    - typography

# ── Cor ───────────────────────────────────────────────────────
# Modelo: paletas por papel. Cada papel é uma rampa completa.
# Valores hex completos no corpo (seção "Cor — paletas por papel").
color:
  model: paletas-por-papel
  rule: "Cor SEMPRE por papel + passo (primary/500, surface/50, feedback.danger/500). NUNCA hex. NUNCA nome de marca."
  roles:
    primary:  "rampa da marca ativa — varia por tema"
    surface:  "rampa slate — fundo, borda e texto. Não varia por tema"
    neutral:  "rampa gray — 2º neutro de reserva"
    feedback: [info, success, warn, danger, help]
  brand_ramp_steps: [color, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  surface_ramp_steps: [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  feedback_ramp_steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

# ── Tipografia ────────────────────────────────────────────────
# Uma família, quatro pesos, doze tamanhos. Igual nos 7 temas.
# Escala nomeada por FUNÇÃO, não por tamanho.
typography:
  family: "Noto Sans"
  weights:
    regular:  400
    medium:   500
    semibold: 600
    bold:     700
  scale_px:
    overline:   10.5
    caption:    12
    button-sm:  14
    body-sm:    14
    button-lg:  16
    body-lg:    16
    body-xl:    24
    title-sm:   20
    title-md:   24
    title-lg:   34
    title-xlg:  48
    title-xxlg: 60
  max_weights_per_region: 2

# ── Geometria (raio, espaçamento, densidade, foco) ────────────
# Valores concretos do sistema. No produto, cada componente já os
# aplica automaticamente — nunca fixar px "no olho".
geometry:
  radius_px:
    none: 0
    xs: 2
    sm: 4
    md: 6
    lg: 8
    xl: 12
  radius_usage:
    field: 6        # md
    button: 6       # md
    select: 6
    popover: 6
    card: 12        # xl
    dialog: 12      # xl
  form_field:
    padding_x: "0.75rem"
    padding_y: "0.5rem"
    border_radius: "6px"
    sm: { font_size: "0.875rem", padding_y: "0.375rem", padding_x: "0.625rem" }
    lg: { font_size: "1.125rem", padding_y: "0.625rem", padding_x: "0.875rem" }
    border: surface/300
    border_hover: surface/400
    border_focus: primary
    border_invalid: feedback.danger/400
    text: surface/700
    placeholder: surface/500
  button:
    border_radius: "6px"
    padding_x: "0.75rem"
    padding_y: "0.5rem"
    gap: "0.5rem"
    icon_only_width: "2.5rem"
    label_font_weight: 500
    rounded_radius: "2rem"
  card:
    border_radius: "12px"
    body_padding: "1.25rem"
    title_font: { size: "1.25rem", weight: 500 }
  focus_ring:
    width: "1px"
    style: solid
    color: primary
    offset: "2px"
  misc:
    transition_duration: "0.2s"
    disabled_opacity: 0.6
    icon_size: "1rem"
    content_border_radius: "6px"
  spacer_rule: "Não existe elemento 'spacer'. Espaço = gap/padding do contêiner. Nunca <div> vazio."

references:
  component_metadata: "./componentes/*.meta.ts"
  machine_mirror: "./nephos-foundations.json"
---

# Nephos — Design System

Especificação de referência para agentes de IA. **Primeira coisa que qualquer agente lê** antes de criar ou modificar interface.

---

## Regra de ouro

> **Ao criar ou modificar qualquer interface (UI), leia e siga este arquivo.**
> Antes de construir ou compor um componente, **abra o `.meta.ts` dele** para o contrato completo.

Replicar **no topo** do `CLAUDE.md` e do `agents.md` do repositório. Sem isso, este arquivo é ignorado.

---

## Multimarca — como funciona

O Nephos veste sete verticais da organização. O mecanismo é uma **troca de tema**: um conjunto de apontamentos que muda de uma vez.

Só **um papel** de cor muda entre temas: `primary`. Todo o resto — superfície, neutros, estados, tipografia — é idêntico nas sete verticais.

| Tema | Cor da marca |
|---|---|
| `global` | azul `#3B82F6` |
| `educacao` | âmbar `#F1A92D` |
| `financeiro` | verde `#447549` |
| `comercial` | teal `#3E8391` |
| `recursos-humanos` | roxo `#4B207F` |
| `igrejas` | vinho `#7F264A` |
| `gerencial` | azul-marinho `#003366` |

### Por que é uma boa arquitetura

Um componente pede `primary/color`. Ele nunca sabe se está rodando em `educacao` ou `financeiro` — quem decide é o tema ativo. Trocar a marca inteira do produto é trocar um tema, não tocar em componente nenhum. A tela é gerada uma vez e serve as sete verticais.

### A regra que decorre

> **Nenhum componente pode saber em qual marca está rodando.**

- **Nunca** escrever nome de marca em componente ou `.meta.ts`
- **Nunca** referenciar primitivo (`brand/educacao/500`) fora da camada de papel
- Descrições falam de função — *"cor de ênfase da marca ativa"* — nunca de cor (*"laranja"*)
- Teste visual precisa rodar em **mais de um tema**, senão vazamento de marca passa batido

### Dois eixos independentes

| Eixo | Papel que varia | Como muda |
|---|---|---|
| **Marca** | `primary` | tema ativo (uma das 7 verticais) |
| **Claro/escuro** | `surface` | seletor `.app-dark` |

### A vertical vem do contexto — não é escolha do usuário

O agente já sabe, pelo **contexto do produto**, em qual vertical está gerando. A saída nasce **na cor daquela vertical** e pronto. O HTML gerado **nunca** oferece um seletor de marca para o usuário trocar de vertical — trocar de vertical é decisão de contexto/ambiente (o tema ativo), não uma funcionalidade da tela.

O **claro/escuro** é diferente: esse **pode** ser um controle de produto (o `theme-toggle`), porque é preferência da pessoa, não a identidade da vertical.

> O seletor das 7 marcas que aparece nos protótipos e na galeria é **andaime de teste** — serve só para provar que uma mesma tela veste as 7 verticais. Não faz parte do produto e não deve ser reproduzido no HTML gerado.

---

## Arquitetura de tokens

Duas camadas. A IA e os componentes consomem **sempre a camada de papel**, nunca a primitiva.

| Camada | O que é | Quem usa |
|---|---|---|
| **core** (primitiva) | 168 valores brutos das rampas | ninguém direto — proibido em componente |
| **role** (papel) | `primary`, `surface`, `neutral`, `feedback` | componentes e IA leem **daqui** |

Escolher cor é sempre **papel + passo da rampa**: `primary/500`, `surface/50`, `feedback.danger/500`. Nunca hex, nunca nome de marca.

---

## Cor — paletas por papel

Cada papel é **uma rampa completa**. A marca (`primary`) tem um passo `color` de referência mais a rampa 50–900; `surface` vai de 0 a 950; feedback e neutral vão de 50 a 900.

**A regularidade que importa:** toda paleta usa a mesma escala — 50 é o tom mais claro, 900/950 o mais escuro. O agente lê qualquer paleta sem instrução caso a caso.

### `primary` — rampa da marca (varia por tema)

| Tema | color | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **global** | `#3B82F6` | `#EAF2FF` | `#D8E6FD` | `#B1CDFB` | `#89B4FA` | `#629BF8` | `#3B82F6` | `#2F68C5` | `#234E94` | `#183462` | `#0C1A31` |
| **educacao** | `#F1A92D` | `#FFFCF0` | `#FCEED5` | `#F9DDAB` | `#F7C881` | `#F4BA57` | `#F1A92D` | `#C18724` | `#91651B` | `#604412` | `#302209` |
| **financeiro** | `#447549` | `#EEF6EF` | `#DAE3DB` | `#B4C8B6` | `#8FAC92` | `#69916D` | `#447549` | `#365E3A` | `#29462C` | `#1B2F1D` | `#0E170F` |
| **comercial** | `#3E8391` | `#F0F6F7` | `#D8E6E9` | `#B2CDD3` | `#8BB5BD` | `#659CA7` | `#3E8391` | `#326974` | `#254F57` | `#19343A` | `#0C1A1D` |
| **recursos-humanos** | `#4B207F` | `#ECE5F2` | `#DBD2E5` | `#B7A6CC` | `#9379B2` | `#6F4D99` | `#4B207F` | `#3C1A66` | `#2D134C` | `#1E0D33` | `#0F0619` |
| **igrejas** | `#7F264A` | `#FBF8FA` | `#E5D4DB` | `#CCA8B7` | `#B27D92` | `#99516E` | `#7F264A` | `#661E3B` | `#4C172C` | `#330F1E` | `#19080F` |
| **gerencial** | `#003366` | `#F0F6F7` | `#CCD6E0` | `#99ADC2` | `#6685A3` | `#335C85` | `#003366` | `#002952` | `#001F3D` | `#001429` | `#000A14` |

### `surface` — slate (não varia por tema)

Fundo, borda e texto derivam daqui. É o eixo claro/escuro.

| 0 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `#FFFFFF` | `#F8FAFC` | `#F1F5F9` | `#E2E8F0` | `#CBD5E1` | `#94A3B8` | `#64748B` | `#475569` | `#334155` | `#1E293B` | `#0F172A` | `#020617` |

### `neutral` — gray (2º neutro de reserva)

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#F9FAFB` | `#DBDDE0` | `#B7BBC1` | `#9399A1` | `#6F7782` | `#4B5563` | `#3C444F` | `#2D333B` | `#1E2228` | `#0F1114` |

### `feedback` — estado e mensagem (não variam por tema)

| Papel | Rampa | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **info** | sky | `#F0F9FF` | `#CCE6F4` | `#9ACEE9` | `#67B5DD` | `#359DD2` | `#0284C7` | `#026A9F` | `#014F77` | `#013550` | `#001A28` |
| **success** | green | `#F0FDF4` | `#D0EDDB` | `#A2DAB7` | `#73C892` | `#45B56E` | `#16A34A` | `#12823B` | `#0D622C` | `#09411E` | `#04210F` |
| **warn** | orange | `#FFF7ED` | `#FBDECE` | `#F7BC9E` | `#F29B6D` | `#EE793D` | `#EA580C` | `#BB460A` | `#8C3507` | `#5E2305` | `#2F1202` |
| **danger** | red | `#FEF2F2` | `#F8D4D4` | `#F1A8A8` | `#EA7D7D` | `#E35151` | `#DC2626` | `#B01E1E` | `#841717` | `#580F0F` | `#2C0808` |
| **help** | purple | `#FAF5FF` | `#E9D6FB` | `#D4ADF7` | `#BE85F2` | `#A95CEE` | `#9333EA` | `#7629BB` | `#581F8C` | `#3B145E` | `#1D0A2F` |

### Âncoras

`base/white` = `#FFFFFF` · `base/dark` = `#020617`. Ancoram os extremos de todas as rampas.

---

## Funções de cor — vocabulário de token

O agente escreve no vocabulário Nephos (papel + passo). As **funções** (hover, active, foco, texto-sobre-cor, fundo, borda) são a camada semantic do motor de tema. Não se inventa função: usa-se o token abaixo.

### Funções da marca (variam por tema, via `primary`)

| Função | Token |
|---|---|
| rampa da ênfase | `primary/50…900` |
| cor de ênfase | `primary.color` |
| texto sobre a ênfase | `primary.contrastColor` |
| hover da ênfase | `primary.hoverColor` |
| active da ênfase | `primary.activeColor` |
| seleção / item destacado | `highlight.{background, focusBackground, color, focusColor}` |
| anel de foco | `focusRing.{width, style, color, offset}` |

O texto sobre a ênfase (`primary.contrastColor`) e a cor do anel de foco (`focusRing.color`) **variam por marca**, não por modo — ver "Contraste da ênfase" em Modo claro/escuro. A rampa de marca vive em 50–900.

### Neutros — fundo, borda, texto (via `surface`, não varia por tema)

| Função | Token |
|---|---|
| rampa de superfície | `surface/0,50…950` |
| fundo de cartão / superfície | `content.background` |
| borda | `content.borderColor` |
| texto padrão | `text.color` |
| texto secundário / suave | `text.mutedColor` |

### Feedback

`info/success/warn/danger/help` são consumidos por **tokens de componente** (message, tag, severity de botão) sobre as rampas acima. Um `.meta.ts` que precise do vermelho de erro referencia `feedback.danger` via o token de severity daquele componente — **nunca um hex**.

---

## Modo claro/escuro

O tema tem dois eixos independentes: a **marca** (papel `primary`, muda por tema) e o **claro/escuro** (papel `surface`). Trocar de marca não altera o modo, e vice-versa.

- **Como liga:** o modo escuro é ativado pelo seletor `.app-dark` na raiz. Sem ele, vale o claro.
- **O que muda:** só a rampa `surface` e as funções derivadas dela — `content.background`, `text.color`, `text.mutedColor`, `content.borderColor` — têm valores próprios em `colorScheme.light` e `colorScheme.dark`. A rampa de marca (`primary/50…900`) é **a mesma** nos dois modos.
- **Regra:** nenhum componente fixa cor de fundo/texto por modo — usa os tokens acima, que o motor de tema resolve. Todo teste visual roda nos **dois modos** (além de em mais de uma marca).

### Contraste da ênfase — é POR MARCA, não por modo

A cor de ênfase muda de tom entre os modos (`primary/500` no claro, `primary/400` no escuro) e as
7 rampas têm luminosidades muito diferentes entre si. **Nenhuma cor de texto fixa serve às 7:** o
branco some nas marcas de rampa clara, o quase-preto some nas de rampa escura.

Por isso `primary.contrastColor` é **declarado marca a marca**, com a razão medida par a par. Os
valores vivem em `nephos.palettes.ts › BRAND_ON_PRIMARY` e o preset apenas os consome.

| Marca | Ênfase no claro | Texto no claro | Ênfase no escuro | Texto no escuro |
|---|---|---|---|---|
| global | `primary/500` | `surface/950` — 5,48 | `primary/400` | `surface/950` — 7,27 |
| educacao | `primary/500` | `surface/950` — 10,04 | `primary/400` | `surface/950` — 11,53 |
| financeiro | `primary/500` | branco — 5,40 | `primary/400` | `surface/950` — 5,64 |
| comercial | **`primary/600`** | branco — 6,16 | `primary/400` | `surface/950` — 6,60 |
| igrejas | `primary/500` | branco — 9,22 | `primary/400` | branco — 5,59 |
| recursos-humanos | `primary/500` | branco — 11,59 | `primary/400` | branco — 6,57 |
| gerencial | `primary/500` | branco — 12,61 | `primary/400` | branco — 6,98 |

O **passo da ênfase** também é declarado por marca (`nephos.palettes.ts › BRAND_EMPHASIS`). O padrão é
`primary/500` no claro e `primary/400` no escuro; hoje só o `comercial` sai do padrão — o teal `500`
passava raspando com os dois textos (4,32 com branco, 4,67 com escuro), então a ênfase do claro subiu
para `primary/600` com texto branco. Subir o passo muda o **tom** do botão, nunca a cor da marca.

### Hover e active seguem o TEXTO, não o modo

O estado move o fundo **para longe da cor do texto**, para o contraste subir durante a interação:

- texto **branco** → hover e active **escurecem** (um e dois passos abaixo);
- texto **escuro** → hover e active **clareiam** (um e dois passos acima).

Amarrar a direção ao modo — o padrão herdado do Aura — só funciona quando o texto é sempre o mesmo.
Com texto por marca, o hover reprovava o AA em 5 dos 14 pares: `global` no claro, por exemplo, caía
de 5,48 para 3,75 porque o fundo escurecia justamente na direção do texto escuro.

O **anel de foco** segue a mesma lógica: o padrão é a própria ênfase, mas três marcas precisam de um
passo vizinho para alcançar os 3:1 contra o fundo da página (`surface/0` no claro, `surface/900` no
escuro) — `educacao` usa `primary/600` no claro; `recursos-humanos` e `gerencial` usam `primary/300`
no escuro. Valores em `nephos.palettes.ts › BRAND_FOCUS_RING`.

- **Regra de autoria:** ao mexer numa rampa de marca, **medir de novo** os pares — e não só o estado
  parado: base, hover e active, nos dois modos. Contraste é verificado, nunca deduzido — nem por
  semelhança com outra marca.
- **O que NÃO muda:** a cor da marca. O ajuste é sempre no texto por cima (ou, em último caso, no
  passo da ênfase) — nunca na identidade.

---

## Cores de dados / gráfico

Gráficos reusam as rampas existentes — **não se introduz matiz nova**. As séries categóricas são **independentes de marca** (uma série não muda de significado quando a vertical troca).

### Séries categóricas (qualitativas, sem ordem)

Sequência fixa, passo 500, na ordem — escolhida para máxima distinção e sem vizinhança vermelho↔verde:

| Ordem | Papel | Hex |
|---|---|---|
| 1 | `feedback.info` (sky) | `#0284C7` |
| 2 | `feedback.warn` (orange) | `#EA580C` |
| 3 | `feedback.success` (green) | `#16A34A` |
| 4 | `feedback.help` (purple) | `#9333EA` |
| 5 | `feedback.danger` (red) | `#DC2626` |
| 6 | `neutral` (gray) | `#4B5563` |

Mais de 6 séries: usar o passo 300 e depois o 700 das mesmas rampas.

### Sequencial (uma métrica, baixo → alto)

Rampa da **marca ativa**: `primary/100…900` (claro → escuro). Veste o gráfico com a identidade da vertical; como sequencial não compara categorias, variar o matiz por marca é seguro.

### Divergente (negativo ↔ neutro ↔ positivo)

`feedback.danger/500` (ponta negativa) ↔ `surface/200` (neutro) ↔ `feedback.success/500` (ponta positiva).

### Semântico no gráfico (KPI, variação)

Alta/positivo = `feedback.success` · queda/negativo = `feedback.danger` · neutro/meta = `neutral`.

### Regras

- Cor de série **identifica**, não significa — exceto quando o dado é literalmente status (aí usar `feedback`).
- **Nunca depender só de cor:** rótulo direto na série ou legenda; para daltônicos, reforçar com forma/rótulo/traçado.
- Todo gráfico tem **alternativa textual** — `aria-label` + tabela equivalente em `<details>`.
- Variação de KPI **nunca só cor/seta**: sinal + texto.
- Moldura: fundo = `surface` · grelha = `surface/200` · eixo e rótulos = `text.mutedColor`.

---

## Tipografia

Uma família, quatro pesos, doze tamanhos. Igual nas sete marcas. A escala é nomeada por **função** (`button-sm`, `title-lg`), não por tamanho — o agente lê "isto é um título de página", não "isto é 34px".

**Família:** Noto Sans
**Pesos:** regular (400) · medium (500) · semibold (600) · bold (700)

| Token | px | Uso |
|---|---|---|
| `overline` | 10.5 | rótulo acima de título, versalete |
| `caption` | 12 | legenda, texto auxiliar |
| `button-sm` / `body-sm` | 14 | botão compacto, corpo denso |
| `button-lg` / `body-lg` | 16 | botão padrão, corpo padrão |
| `body-xl` | 24 | corpo de destaque |
| `title-sm` | 20 | título de seção |
| `title-md` | 24 | título de bloco |
| `title-lg` | 34 | título de página |
| `title-xlg` | 48 | display |
| `title-xxlg` | 60 | display grande |

Regra: no máximo **dois pesos** de fonte numa mesma região.

---

## Geometria — raio, espaçamento, densidade, foco

No produto real cada componente já aplica estes valores automaticamente. Eles estão aqui para referência e para que protótipos fiquem fiéis. **Nunca fixar px "no olho".**

### Raio de canto

| Passo | none | xs | sm | md | lg | xl |
|---|---|---|---|---|---|---|
| px | 0 | 2 | 4 | 6 | 8 | 12 |

- campo de formulário e **botão** → md = **6px**
- select / popover → md = 6px
- **cartão (card)** → xl = **12px**
- **modal / dialog** → xl = 12px

### Campo de formulário

- padding: **0.75rem** (X) · **0.5rem** (Y) · raio **6px**
- `sm`: fonte 0.875rem · padding 0.375rem / 0.625rem
- `lg`: fonte 1.125rem · padding 0.625rem / 0.875rem
- borda `surface/300` · hover `surface/400` · foco `primary` · inválido `feedback.danger/400`
- texto `surface/700` · placeholder `surface/500`

### Botão

- raio **6px** · padding 0.75rem / 0.5rem · gap 0.5rem
- largura de ícone-só **2.5rem** · peso do rótulo **500** · variante arredondada 2rem

### Cartão

- raio **12px** · padding do corpo **1.25rem** · título 1.25rem / peso 500

### Foco

Anel: largura 1px · estilo solid · cor `primary` · offset 2px.

### Diversos

transição 0.2s · opacidade desabilitado 0.6 · tamanho de ícone 1rem · raio de conteúdo 6px.

### Espaçamento

Espaço é sempre **gap ou padding do contêiner**. **Não existe elemento "spacer"** — nunca usar `<div>` vazio para empurrar layout.

---

## Ícones — Font Awesome 7 Pro

O set de ícones do Nephos é **Font Awesome (sempre a última versão — hoje 7 Pro)** — não PrimeIcons.

- Sintaxe: `<i class="fa-solid fa-<nome>"></i>` · estilo padrão de UI = **solid**
- Estilos disponíveis: solid · regular · light · thin · duotone
- Nomes em **kebab-case**, validados no catálogo oficial (fontawesome.com/icons)
- Decorativo → `aria-hidden`; significativo → `aria-label`
- **Todos** os ícones são Font Awesome — inclusive os **internos** dos componentes PrimeNG (setinha do dropdown, X do dialog, toggler da árvore etc.), sobrescritos para FA. **PrimeIcons não é usado em lugar nenhum.**
- Fora do set → pedir, não inventar nem misturar.

Nomes mudaram entre versões do FA: `search`→`magnifying-glass`, `times`→`xmark`, `trash`→`trash-can`, `pencil`→`pen-to-square`, `home`→`house`, `info-circle`→`circle-info`. Detalhes em `componentes/icon.meta.ts`.

---

## Personalidade e tom

Nephos é **claro, confiável e eficiente**. Prioriza densidade de informação sobre decoração — o usuário está trabalhando, não navegando. Hierarquia sóbria: a cor de ênfase é escassa e sempre significa "esta é a ação". Nada compete por atenção sem motivo funcional.

---

## Dos & Don'ts do sistema

Regras válidas para **qualquer** interface gerada. Regras por componente vivem no `.meta.ts`.

### Sempre

- Escolher a cor por **papel + passo da rampa** (`primary/500`, `neutral/700`, `feedback.danger/500`)
- Uma única cor de ênfase (`primary`) por região de decisão
- HTML semântico: `<button>` age, `<a>` navega, `<table>` é dado tabular
- Todo campo com `<label>` associado

### Nunca

- **Não introduzir matiz nova.** Cor que não existe na paleta → pedir, não inventar hex
- **Não usar valor bruto** (hex) onde existe passo de paleta
- **Não escrever nome de marca** em componente ou metadado — o tema é que define `primary`
- **Não usar `<div>` clicável** no lugar de `<button>`
- **Não usar mais de dois pesos de fonte** numa mesma região
- **Não emitir classes de framework** no HTML gerado
- **Não inventar função** (hover, foco, fundo): usar o token do vocabulário acima, nunca criar valor novo
- **Não fixar geometria em px "no olho"**: raio, espaço e densidade vêm do componente

---

## Checagem de fidelidade — rodar ANTES de gerar

Qualquer IA roda esta pré-checagem antes de emitir HTML.

1. **Cor** — só por papel + passo (`primary/500`, `surface/50`, `feedback.danger/500`). Nunca hex, nunca nome de marca.
2. **Geometria** (raio, espaço, tamanho) — nunca fixar px "no olho": vem pronta do componente (raio campo/botão 6px, card 12px…).
3. **Tipografia** — só a escala nomeada (`button-lg`, `title-sm`…), Noto Sans.
4. **Componente** — abrir o `.meta.ts` e respeitar `states`, `invalidCombinations`, `antiPatterns` e o `origin`.
5. **Fora do catálogo** → perguntar ao time de DS, não inventar.
6. **Saída** → HTML semântico puro (tag certa), sem classes de framework.

> Regra-mãe: **na dúvida, herdar ou perguntar — nunca inventar valor.**

---

## Piso ético — o que a interface nunca faz

A checagem de fidelidade garante que a tela está **correta**. Este piso garante que ela
**trata com respeito** quem vai usá-la. São eixos diferentes: dá para montar uma tela 100% fiel
ao Nephos e ainda assim confundir ou pressionar a pessoa do outro lado. É **piso mínimo** —
cresce só com caso real, não por antecipação.

### Recusa automática (sem zona cinzenta)

| Anti-padrão | O que é | Em vez disso |
|---|---|---|
| **Opt-in disfarçado de padrão** | Caixa pré-marcada para newsletter, compartilhar dado ou qualquer opção que amplia o que é coletado/compartilhado | Toda opção desse tipo nasce **desmarcada** |
| **Erro que esconde a causa** | Mensagem genérica ("algo deu errado") quando o sistema sabe o que falhou | Dizer o que falhou e o que fazer a seguir (herda de `message`/`toast`) |
| **Ação destrutiva sem fricção proporcional** | Excluir, cancelar matrícula, estornar sem confirmação clara | Passa por `destructive-confirm` — foco no cancelar, verbo real, nunca "OK" |
| **Falso vazio / falso carregando** | Tela de "nenhum resultado" que na verdade é erro disfarçado | Erro é `message`/estado de erro; vazio de verdade é `empty-state` — nunca confundir |

### Perguntar antes de aplicar (depende de contexto de negócio)

Estes têm zona cinzenta real — a IA **não recusa nem gera sem checar**; sinaliza a dúvida e
segue a regra-mãe (herdar ou perguntar):

- **Contador / prazo / "restam X"** — só gerar se corresponder a um limite **real** já existente
  no sistema (ex.: data de fechamento de matrícula). Se o pedido não deixar claro que o prazo é
  real, perguntar antes de inventar um.
- **Exposição de dado** (CPF, nota, salário, histórico completo) — mostrar o **mínimo** que a
  tarefa da tela precisa; o detalhe completo fica atrás de uma ação explícita de abrir. Se não
  estiver claro que a tela precisa do dado completo, perguntar antes de expor.

### Quando um pedido esbarra num destes

Não recusar a tarefa inteira: gerar a tela **sem** o padrão da recusa automática e **avisar,
numa linha**, qual regra protegeu. Ex.: pedido "checkbox de aceite já marcado" → gerar
**desmarcado** e sinalizar "opt-in não nasce pré-marcado". Para os itens de "perguntar antes",
**parar e perguntar** em vez de decidir sozinho.

---

## Acessibilidade da composição — a tela montada

Cada `.meta.ts` já traz a a11y da SUA peça (rótulo associado, `aria-*`, foco preso em modal, erro
nunca só por cor). Isso garante a PEÇA, não a TELA: a a11y real quebra na **composição**. Antes de
considerar a tela pronta, imaginar alguém navegando **só de teclado** e alguém **ouvindo** a tela —
se para qualquer um não dá pra usar, não está pronta, mesmo com cada peça 100% fiel.

### Ordem, foco e hierarquia

- Ordem visual e ordem de foco/leitura (Tab + leitor de tela) **têm que bater**. CSS que reordena
  a posição sem reordenar o HTML quebra isso.
- O **nível de heading** de cada bloco é decidido no contexto da PÁGINA montada — não o nível "de
  exemplo" da ficha. Um `<h1>` por página, hierarquia sem pular nível.
- Depois de uma ação que muda a tela (enviar formulário, abrir modal, aplicar filtro), o **foco
  vai pra onde faz sentido** (confirmação, primeiro erro, título do conteúdo novo) — nunca fica
  perdido num botão que já sumiu nem volta ao topo sem motivo.

### Percepção, movimento e alvo

- **Cor nunca é o único sinal** — vale por ficha, reforça na composição (dashboard de badges
  coloridos sem texto/ícone de apoio falha pra quem não distingue cor).
- **Gráfico/tabela com alternativa textual** não é opcional quando o dado importa pra decisão
  (ver "Cores de dados / gráfico").
- **Texto de erro/ajuda/rótulo escrito pra quem não conhece o sistema** — sem jargão interno
  ("erro 4022") sem explicação ao lado.
- **`prefers-reduced-motion`** respeitado nas transições (abrir drawer, trocar de aba, skeleton).
- **Toast/alerta que some sozinho nunca carrega a única cópia** de info importante — ela também
  fica em lugar persistente (histórico, mensagem inline).
- **Alvo de toque** (botão, ícone de ação, item de menu) nunca menor que o mínimo do PrimeNG — não
  apertar o padrão "porque cabe melhor". **Zoom de texto** funciona sem cortar/sobrepor: não travar
  em px onde o PrimeNG já usa `rem`.

### Contraste — por par de token verificado, nunca por dedução

Cor certa (papel/marca certos) ≠ contraste suficiente. **Texto nunca nasce de uma combinação
nova:** só os PARES já garantidos pelo tema (`primary.contrastColor` sobre `primary.color`;
`text.color`/`text.mutedColor` sobre `surface`). Fundo sem par de texto definido → usar o par
testado mais próximo ou perguntar — nunca estimar "parece claro o suficiente".

**Mínimos WCAG AA (piso, não meta):** texto normal **4,5:1**; texto grande (≥24px, ou ≥18.66px
em negrito) e elementos gráficos/bordas com significado (ícone de estado, borda de campo em erro)
**3:1**.

**Onde costuma quebrar no nosso catálogo:**
- Texto sobre tons CLAROS da rampa (`primary/50`, `feedback/50`, `highlight.background`) — nunca
  `contrastColor` (pensado pro tom 500+); usar `text.color`/`text.mutedColor`, que é o que o tema
  espera ali.
- Badge/Tag/Chip com fundo de feedback — usar o par da ficha; não trocar por "cor mais vibrante"
  nem aplicar peso de fonte fino (reduz legibilidade).
- `mutedColor`/helper-text fora do `surface` padrão (card com fundo alternativo, estado
  selecionado/hover) — recalcular, não presumir que o par continua válido.
- Placeholder segue o mesmo mínimo (é texto que muita gente lê, não decoração).
- Ícone sozinho carregando significado sobre fundo colorido — mesmo 3:1, mesmo par verificado.

**Nunca aceitável:** cinza-claro sobre branco/surface "pra ficar mais sutil"; branco sobre tom
pastel da marca; texto sobre imagem/gráfico sem verificar o pior caso da área que ele cobre.

---

## Ciclo de vida — status e depreciação

Toda ficha declara um `status`: `draft` · `beta` · `stable` · `deprecated`. Ele diz o que é
válido usar hoje.

- **`deprecated` não entra em tela nova.** Se uma peça está depreciada, o agente **não a usa** em
  saídas novas — procura o substituto.
- **`replaces` aponta o caminho.** Quando uma peça nova substitui uma antiga, ela declara o `id`
  da antiga em `replaces`; a antiga vira `deprecated`. O agente segue do depreciado para quem o
  substitui.
- **Se a depreciada for a única opção viável**, o agente **avisa** (numa linha, como no piso
  ético) em vez de usar em silêncio — nunca finge que está tudo certo.
- Na descoberta, a busca do MCP **rebaixa** o que está `deprecated` (aparece por último, nunca
  como 1ª escolha). `nephos_list(status: 'deprecated')` lista o que saiu de circulação.

---

## Referências profundas

Este arquivo é de **nível de sistema** e deliberadamente leve.

> **Antes de construir, compor ou modificar qualquer componente, abra o `componentes/<componente>.meta.ts`** — variantes, combinações inválidas, relações, tokens por estado e anti-padrões específicos.

**Como descobrir a peça certa:** o catálogo completo (componentes, blocos e templates) é pesquisável pelo MCP `nephos-ds` — `nephos_search` por termo livre (PT/EN) encontra a peça, `nephos_get` traz a ficha, `nephos_foundations` traz estas regras. Sem MCP, ler o `nephos-index.json`. Peça que não existe no catálogo → pedir ao time de DS, não inventar.

Contrato de metadados: [[Schema de metadados de componente]] · Princípios: [[Princípios do Nephos]]
