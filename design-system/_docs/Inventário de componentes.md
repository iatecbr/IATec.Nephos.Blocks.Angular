---
tipo: inventario
tags: [trabalho, nephos, design-system, componentes, ia-agente]
---

# 🧩 Inventário de componentes — Nephos

> **O que é este arquivo:** a lista de todos os componentes que o sistema tem, dizendo quais vêm **prontos do PrimeNG** (a gente só veste com a cor da marca) e quais precisam de **trabalho nosso**. É o mapa de quais componentes do Prime UI usamos sem alteração e quais precisam de extensão. Mapeia a fronteira **Prime UI vs. componentes próprios** (ver [[Como o Moses usa o Nephos — arquitetura de entrega]]).

Os componentes vêm do **UI kit PrimeOne 4.0.0** (= catálogo padrão do PrimeNG 21). A identidade (cor + tipografia) entra pelo tema, via [[nephos.preset]]. Ver [[design.md]].

---

## A regra de classificação

Cada componente recebe uma etiqueta:

- **🟦 PrimeNG puro** — usa-se como vem. O Nephos só aplica a cor da marca e a tipografia pelo tema. **Nenhum código de componente é escrito.** É a maioria esmagadora.
- **🟨 PrimeNG + composição Nephos** — o *componente* é puro, mas o **jeito de usar** dele vira um padrão nosso (um "bloco"): quais colunas numa tabela, quais campos num formulário, qual densidade. Isso não é reescrever o componente — é documentar a **receita**. Vive na frente de *blocos e layouts*, não aqui.
- **🟥 Nephos-own** — componente que **não existe** no PrimeNG e a organização precisa. **Hoje: nenhum.** Se aparecer, vira uma entrada nova aqui, com `.meta.ts` próprio.

> **A fronteira, em uma frase:** no nível de *componente*, é tudo PrimeNG. O que é "nosso" mora um nível acima — na **composição** (blocos, telas) e na **identidade** (tema). Foi exatamente o que o `design.md` já previa: *"o Nephos entra com identidade, o PrimeNG entra com estrutura."*

---

## Inventário (≈80 componentes do PrimeOne 4.0.0)

### Formulário — entrada de dados
| Componente | Para que serve | Classe |
|---|---|---|
| InputText | Campo de texto de uma linha | 🟦 |
| Textarea | Campo de texto de várias linhas | 🟦 |
| InputNumber | Número com formatação/moeda | 🟦 |
| Password | Senha com medidor de força | 🟦 |
| Checkbox | Marcar/desmarcar | 🟦 |
| RadioButton | Escolha única numa lista | 🟦 |
| ToggleSwitch | Liga/desliga | 🟦 |
| ToggleButton | Botão de dois estados | 🟦 |
| SelectButton | Escolha entre botões | 🟦 |
| Select | Menu suspenso (dropdown) | 🟦 |
| MultiSelect | Menu suspenso de múltipla escolha | 🟦 |
| CascadeSelect | Seleção em níveis (hierárquica) | 🟦 |
| TreeSelect | Seleção a partir de uma árvore | 🟦 |
| Listbox | Lista selecionável fixa | 🟦 |
| AutoComplete | Busca com sugestões | 🟦 |
| DatePicker | Calendário / seleção de data | 🟦 |
| ColorPicker | Seleção de cor | 🟦 |
| Slider | Controle deslizante | 🟦 |
| Rating | Estrelas / avaliação | 🟦 |
| Knob | Seletor circular | 🟦 |
| Editor | Texto rico (rich text) | 🟦 |
| InputGroup | Agrupar campo + ícone/botão (wrapper) | 🟦 |
| IconField | Ícone dentro do campo (wrapper) | 🟦 |
| FloatLabel | Rótulo que flutua ao focar (wrapper) | 🟦 |
| IftaLabel | Rótulo fixo dentro do campo (wrapper) | 🟦 |

### Botão
| Componente | Para que serve | Classe |
|---|---|---|
| Button | Ação. Variações: severidade, outline, text, ícone | 🟦 |

### Dados — listas e tabelas
| Componente | Para que serve | Classe |
|---|---|---|
| Table (DataTable) | Dado tabular: ordenar, filtrar, paginar | 🟨 *composição* |
| DataView | Lista/grade de cartões | 🟨 *composição* |
| Paginator | Navegação por páginas | 🟦 |
| Tree | Árvore hierárquica | 🟦 |
| TreeTable | Árvore + colunas | 🟨 *composição* |
| Timeline | Linha do tempo | 🟦 |
| OrganizationChart | Organograma | 🟦 |
| VirtualScroller | Rolagem virtual (listas enormes) | 🟦 |

### Painel — estrutura e agrupamento
| Componente | Para que serve | Classe |
|---|---|---|
| Card | Cartão de conteúdo | 🟦 |
| Panel | Painel com cabeçalho | 🟦 |
| Fieldset | Grupo de formulário com legenda | 🟦 |
| Accordion | Seções expansíveis | 🟦 |
| Tabs | Abas | 🟦 |
| Toolbar | Barra de ações | 🟨 *composição* |
| Divider | Separador | 🟦 |
| Splitter | Painéis redimensionáveis | 🟦 |
| ScrollPanel | Área com rolagem estilizada | 🟦 |
| Stepper | Passo a passo (wizard) | 🟨 *composição* |

### Overlay — sobreposições
| Componente | Para que serve | Classe |
|---|---|---|
| Dialog | Janela modal | 🟦 |
| Drawer | Painel lateral (gaveta) | 🟦 |
| Popover | Balão de conteúdo ancorado | 🟦 |
| ConfirmDialog | Confirmação em modal | 🟦 |
| ConfirmPopup | Confirmação em balão | 🟦 |
| Tooltip | Dica ao passar o mouse | 🟦 |

### Menu — navegação
| Componente | Para que serve | Classe |
|---|---|---|
| Menubar | Barra de menu horizontal | 🟨 *composição* |
| Menu | Menu simples | 🟦 |
| TieredMenu | Menu com submenus | 🟦 |
| MegaMenu | Menu grande multi-coluna | 🟨 *composição* |
| PanelMenu | Menu em acordeão (lateral) | 🟦 |
| ContextMenu | Menu de contexto (botão direito) | 🟦 |
| Breadcrumb | Trilha de navegação | 🟦 |
| Dock | Doca de atalhos | 🟦 |

### Mensagens
| Componente | Para que serve | Classe |
|---|---|---|
| Message | Aviso inline (na página) | 🟦 |
| Toast | Notificação temporária (canto) | 🟦 |

### Mídia
| Componente | Para que serve | Classe |
|---|---|---|
| Image | Imagem com preview/zoom | 🟦 |
| ImageCompare | Comparar duas imagens | 🟦 |
| Carousel | Carrossel | 🟦 |
| Galleria | Galeria de imagens | 🟦 |

### Arquivo
| Componente | Para que serve | Classe |
|---|---|---|
| FileUpload | Envio de arquivos | 🟨 *composição* |

### Indicadores e enfeites
| Componente | Para que serve | Classe |
|---|---|---|
| Tag | Etiqueta de status | 🟦 |
| Chip | Ficha removível | 🟦 |
| Badge | Contador/marcador | 🟦 |
| OverlayBadge | Badge sobre outro elemento | 🟦 |
| Avatar | Foto/iniciais de usuário | 🟦 |
| ProgressBar | Barra de progresso | 🟦 |
| ProgressSpinner | Girador de carregamento | 🟦 |
| Skeleton | Esqueleto de carregamento | 🟦 |
| MeterGroup | Medidor multi-segmento | 🟦 |
| Inplace | Edição no próprio lugar | 🟦 |
| Terminal | Terminal de comando | 🟦 |

**Resumo:** ~80 componentes. **🟦 PrimeNG puro:** ~72. **🟨 composição Nephos (o componente é puro; a receita de uso é nossa):** ~8. **🟥 Nephos-own:** 0.

---

## O que isso decide

1. **Nenhum componente vai ser reescrito.** O trabalho de componente é **documentar** (o `.meta.ts` que o Moses lê), não codar do zero. Isso encaixa com o "não reconstruir o repo".
2. **O que é "nosso" é a composição.** As ~8 marcadas 🟨 (tabela, formulário, toolbar, stepper, menu grande, upload) são onde a organização tem jeito próprio de montar. Isso vira **blocos e layouts**. **Nota:** a organização **não tem o plano de blocos pagos** do PrimeNG (PrimeBlocks) — só o Core gratuito. Logo, esses blocos são **100% composição nossa**, montados a partir dos componentes Core.
3. **A camada de tema já cobre a identidade** dos ~80 (via [[nephos.preset]]). Não há gap de cor por componente.

---

## Método — documentar do átomo simples ao composto

Fazer o `.meta.ts` de **um a um**, do mais simples ao mais composto, para calibrar o contrato antes de escalar:

1. **Button** — atômico, muitas variações (severidade/outline/text/ícone). Ótimo para fixar o padrão de "variantes + combinações inválidas + tokens por estado".
2. **InputText + FloatLabel** — o padrão de *campo de formulário* (rótulo, ajuda, erro, obrigatório). Puxa as regras de acessibilidade (`<label>` associado).
3. **Card** — contêiner. Ensina o Moses a **compor** (slot de cabeçalho/corpo/rodapé) — a ponte para os blocos.

Cada componente documentado evolui o checklist de qualidade.

> **Fonte estrutural para o `.meta.ts`:** a API de cada componente é a doc oficial do PrimeNG (primeng.org) — props, eventos, estados. O `.meta.ts` traduz isso para "quando e como o Moses usa", seguindo o [[Schema de metadados de componente]].
