---
tipo: guia-normativo
projeto: Nephos 2.0 (Design System agêntico para o Moses 5.0)
destino: _docs/ (vai para o repo — o Moses lê este arquivo)
proposito: ensinar o Moses a USAR heurísticas de usabilidade como um humano experiente usaria, antes de gerar qualquer artefato (protótipo ou HTML)
---

# Heurísticas de Usabilidade — Guia para o Moses

> Este documento não é uma lista de curiosidades de UX. É um **procedimento de decisão**. Cada seção termina em uma pergunta que o Moses deve conseguir responder — com base no `nephos-index.json` e no `design.md` — antes de desenhar qualquer tela. Na dúvida entre duas heurísticas, ou entre heurística e catálogo: **o catálogo (`.meta.ts`) sempre vence**. Heurística orienta a ESCOLHA de qual peça do catálogo usar e como compô-la; ela nunca autoriza inventar um componente, uma cor ou um valor fora do que está documentado.

---

## 1. O que é uma heurística (e por que não é "regra rígida")

Uma heurística é um **atalho de julgamento validado por repetição** — não uma lei física, mas um padrão que funciona na maioria dos casos porque foi testado em milhares de interfaces reais. Ela difere de uma regra de negócio ou de uma regra de acessibilidade (como as do `AGENTS.md`) em um ponto importante:

- **Regra de acessibilidade** = binária. Cumpre ou não cumpre (ex.: todo campo tem `<label for>`).
- **Heurística de usabilidade** = uma lente de avaliação. Ela pesa contra outras heurísticas e contra o contexto. Duas heurísticas podem puxar em direções opostas na mesma tela (ex.: "minimalismo" pede menos texto; "reconhecimento > memorização" pede mais texto visível). Resolver esse conflito é exatamente o julgamento que este documento tenta ensinar o Moses a fazer.

Por isso, este guia não traz só a lista de heurísticas — traz também **como pesá-las quando colidem**, na seção 6 em diante.

---

## 2. Como um humano lê, interpreta e executa uma heurística

Entender o mecanismo humano importa porque é o que o Moses precisa **simular por procedimento**, já que não tem o mecanismo em si.

### 2.1 O humano não "consulta uma lista" — ele reconhece um padrão

Um designer sênior olhando para uma tela não pensa "heurística 4, consistência, ok, verificado". Ele **sente que algo está errado** antes de saber nomear o quê. Esse reconhecimento rápido (psicólogos chamam de "pensamento Sistema 1" — automático, baseado em padrões memorizados) é o produto de ter visto centenas de telas boas e ruins antes. A heurística nomeada (Sistema 2 — devagar, deliberado) só entra depois, para **justificar e comunicar** o que o instinto já apontou.

**Consequência prática para o Moses:** como ele não tem "instinto" construído por experiência visual, ele precisa inverter a ordem — rodar a checklist deliberada (Sistema 2) **antes** de gerar, no lugar do reconhecimento automático que um humano faria em milésimos de segundo. É por isso que este documento propõe um **protocolo de simulação pré-geração** (seção 8): ele substitui o instinto por procedimento.

### 2.2 O humano interpreta a heurística à luz do contexto, não ao pé da letra

"Reconhecimento em vez de memorização" não significa "mostre tudo sempre". Um designer sabe que em uma tela de configurações avançadas, pedir que o usuário memorize um atalho de teclado é aceitável — porque o público daquela tela já é fluente. A mesma heurística, aplicada ao público errado, produziria um conselho ruim.

**Consequência prática:** cada heurística abaixo vem acompanhada da pergunta de contexto que muda sua aplicação. O Moses deve responder essa pergunta usando o que sabe do bloco/tela que está montando — não aplicar a heurística de forma cega.

### 2.3 O humano prioriza heurísticas por dano potencial, não por ordem alfabética

Quando duas heurísticas colidem e o tempo é curto, um profissional resolve pela pergunta "qual erro é mais caro se eu errar aqui?". Erro de prevenção (heurística 5) em uma ação destrutiva é mais caro que erro de estética (heurística 8). Erro de status invisível (heurística 1) em uma ação demorada é mais caro que erro de eficiência (heurística 7) em uma tela usada uma vez por mês.

**Consequência prática:** a seção 7 traz uma ordem de prioridade para o Moses usar como desempate — não para aplicar sempre, mas para os casos de conflito real.

---

## 3. As 10 heurísticas de Nielsen — leitura operacional para o Moses

Para cada heurística: o que ela pede, a pergunta de verificação que o Moses deve fazer, e onde ela já está resolvida no catálogo Nephos (para o Moses reconhecer que não precisa reinventar nada — só escolher a peça certa).

### H1 — Visibilidade do status do sistema
**Pede:** o usuário nunca fica sem saber o que está acontecendo.
**Pergunta de verificação:** esta ação tem uma resposta visível em menos de 400ms (ver Doherty Threshold, seção 5)? Se a ação for demorada, há um `progressbar`/`progressspinner`/`skeleton`? Se o resultado for assíncrono, há `toast`?
**No catálogo:** `progressbar`, `progressspinner`, `skeleton`, `toast`, `message` cobrem os quatro tempos de espera (instantâneo, curto, longo, resultado final).

### H2 — Correspondência com o mundo real
**Pede:** linguagem, ícones e fluxo devem soar como o vocabulário do usuário, não do banco de dados ou do time técnico.
**Pergunta de verificação:** o texto gerado (rótulo, mensagem de erro, texto de botão) usa termo técnico (`null`, `erro 400`, `payload`, `token expirado`) em vez do equivalente humano ("sessão expirou, entre novamente")?
**No catálogo:** os anti-padrões de bloco (ex.: `destructive-confirm`) já pedem "verbo real, não 'OK'" — é a mesma heurística aplicada a botão.

### H3 — Controle e liberdade do usuário
**Pede:** toda ação tem uma saída — desfazer, cancelar, voltar — sem custo alto.
**Pergunta de verificação:** esta ação é reversível? Se sim, ela usa confirmação leve + `Toast` com desfazer (não um `ConfirmDialog` bloqueante)? Se é irreversível, ela usa `confirmdialog` com foco no cancelar?
**No catálogo:** já é regra dura em `confirmdialog.meta.ts` e `destructive-confirm.block.meta.ts`.

### H4 — Consistência e padrões
**Pede:** a mesma ação, em qualquer parte do produto, usa o mesmo componente e o mesmo padrão visual.
**Pergunta de verificação:** existe uma ficha `.meta.ts` para este padrão? Se sim, ela é a única fonte — não recriar variação. Se não existe, é falta real do catálogo (perguntar, nunca inventar).
**No catálogo:** é o motivo de existir do próprio `nephos-index.json` — consistência é a heurística que o mecanismo de busca do MCP resolve estruturalmente, não caso a caso.

### H5 — Prevenção de erros
**Pede:** evitar que o erro aconteça, não só avisar depois que aconteceu.
**Pergunta de verificação:** o formato do dado é fixo (CPF, telefone, data)? Usa `inputmask`/`datepicker`, não `inputtext` livre. A ação é ambígua ou destrutiva? Tem confirmação antes de executar. O limite (tamanho de arquivo, caracteres) é comunicado **antes** de o usuário errar, não só depois?
**No catálogo:** `inputmask`, `fileupload` (regra "comunicar tipo+tamanho ANTES do erro"), `forceSelection` do `autocomplete`.

### H6 — Reconhecimento em vez de memorização
**Pede:** as opções e o estado atual ficam visíveis; o usuário não precisa lembrar o que viu em outra tela.
**Pergunta de verificação:** o rótulo do campo continua visível depois que o usuário digita (ex.: `floatlabel`, não um placeholder que some)? O texto de ajuda relevante está perto do campo, não escondido atrás de um clique extra?
**No catálogo:** `floatlabel`, `helper-text` (sempre ligado ao campo por `aria-describedby`, sempre visível).

### H7 — Flexibilidade e eficiência de uso
**Pede:** quem já sabe usar o produto tem um caminho mais rápido, sem que isso atrapalhe quem está vendo pela primeira vez.
**Pergunta de verificação:** esta é uma tela de uso frequente/repetitivo (ex.: um painel operacional usado todo dia)? Se sim, ela comporta atalho, filtro salvo, ação em lote — sem remover o caminho guiado padrão.
**No catálogo:** quando a tela pede eficiência para usuário avançado (atalho, filtro salvo, ação em lote) e não há ficha para isso, sinalizar ao time de DS — não improvisar um padrão novo (H4 / regra-mãe).

### H8 — Estética e design minimalista
**Pede:** só o que é relevante para a tarefa atual aparece na tela; todo elemento extra compete por atenção.
**Pergunta de verificação:** cada elemento desta composição serve à tarefa principal do usuário nesta tela? Um elemento decorativo, uma cor de marca fora do papel semântico, ou um texto redundante são sinais de violação.
**No catálogo:** a regra-mãe "na dúvida, herdar ou perguntar — nunca inventar" evita poluição por invenção; esta heurística cobre poluição por **excesso do que já existe**, não por invenção.

### H9 — Ajudar a reconhecer, diagnosticar e corrigir o erro
**Pede:** a mensagem de erro diz o que houve, em linguagem humana, e como resolver — nunca só "algo deu errado" ou só uma cor vermelha.
**Pergunta de verificação:** o erro é comunicado por texto (não só borda/cor vermelha)? A mensagem diz a causa E a próxima ação possível?
**No catálogo:** regra dura de a11y no schema — erro sempre por mensagem de texto + `aria-invalid`/`aria-describedby`, nunca só cor.

### H10 — Ajuda e documentação
**Pede:** quando ajuda é necessária, ela é fácil de achar e específica da tarefa (não um manual genérico).
**Pergunta de verificação:** esta interação é complexa o bastante para precisar de ajuda contextual? Se sim, ela usa `tooltip` (complementar, nunca a única fonte de informação essencial) ou um link de ajuda perto do campo — nunca substitui o rótulo/instrução principal.
**No catálogo:** `tooltip.meta.ts` já documenta essa fronteira (dica complementar, não substitui `aria-label`).

---

## 4. Leis complementares — a "física" da percepção e da decisão

As 10 heurísticas de Nielsen tratam do fluxo geral de uso. Estas leis complementam com o comportamento perceptivo e cognitivo mais granular — são mais úteis para decidir **layout, agrupamento e quantidade** dentro de uma tela.

| Lei | O que descreve | Pergunta de verificação para o Moses |
|---|---|---|
| **Lei de Fitts** | Quanto maior e mais perto o alvo, mais rápido e preciso é o clique/toque. | Botões primários e áreas de toque frequente têm tamanho mínimo adequado (área de toque, não só o ícone visual)? Ações destrutivas estão fisicamente afastadas de ações seguras equivalentes? |
| **Lei de Hick** | Quanto mais opções simultâneas, mais tempo a decisão leva. | Este menu/lista/formulário oferece mais de ~7 opções ao mesmo tempo sem agrupamento? Se sim, precisa de categorização, busca (`search-input`) ou disclosure progressivo (`accordion`), não uma lista plana infinita. |
| **Lei de Miller** | A memória de trabalho segura ~4 itens de cada vez (revisão moderna de "7±2"). | Um formulário, menu ou dashboard está pedindo que o usuário retenha mais de ~4 coisas simultâneas na cabeça? Se sim, quebrar em `stepper` (etapas) ou agrupar em blocos visuais menores. |
| **Lei da Proximidade (Gestalt)** | Elementos próximos são lidos como relacionados, mesmo sem borda. | O espaçamento entre grupos de campos é maior que o espaçamento dentro de um grupo? (Espaçamento aqui é token do PrimeNG, nunca "no olho" — ver `design.md`.) |
| **Lei da Região Comum (Gestalt)** | Um contorno/fundo compartilhado agrupa mais fortemente que só proximidade. | Este agrupamento de campos/ações precisa de um `card`/`panel` (fronteira visual) ou a proximidade + espaçamento já bastam? Contorno demais também viola H8 (minimalismo). |
| **Efeito Von Restorff** | O elemento visualmente diferente do padrão é o que mais chama atenção — use com intenção. | Existe só UM elemento com destaque visual forte (cor de ênfase, tamanho maior) por tela/seção — a ação mais importante? Se dois elementos competem por destaque, nenhum vence. |
| **Limiar de Doherty** | Resposta do sistema abaixo de ~400ms mantém o usuário em fluxo; acima disso, a percepção de lentidão cresce desproporcionalmente. | Uma ação que passa de ~400ms tem feedback de carregamento (ligado a H1)? Abaixo disso, feedback de carregamento é desnecessário e pode até piorar a percepção (pisca antes de resolver). |
| **Efeito Estética-Usabilidade** | Interfaces estéticamente cuidadas são *percebidas* como mais fáceis de usar, mesmo quando a usabilidade real é igual. | Isto não é permissão para decoração — é o motivo pelo qual seguir a geometria/tipografia herdada do PrimeNG (nunca "no olho") importa tanto quanto a lógica funcional da tela. |

---

## 5. Heurística de decisão: Texto vs. Ícone

Este é um dos pontos onde IAs geradoras de UI mais erram — tendem a usar ícone "porque parece mais moderno" sem testar se ele comunica sozinho. Regra de decisão, em ordem:

1. **Ícone sozinho só é permitido quando o significado é universalmente reconhecido E a ação é de baixo risco.** Exemplos aceitáveis: lupa=buscar, "x"=fechar/remover, seta=voltar. Fora desse grupo pequeno e convencional, ícone sozinho é ambíguo.
2. **Ação de alto risco (destrutiva, irreversível, financeira) nunca usa só ícone.** Excluir, cobrar, enviar, confirmar — sempre têm rótulo de texto visível, mesmo que acompanhados de ícone.
3. **Se o espaço é reduzido (barra de ferramentas, célula de tabela) e o ícone precisa ficar sozinho, ele é obrigatoriamente acompanhado de `aria-label`** (nome acessível) — a ficha `icon-button.meta.ts` já trata isso como regra dura, não como recomendação.
4. **Ícone + texto juntos é o padrão seguro por default** para qualquer ação nova cujo reconhecimento não está testado. O ícone acelera o escaneamento visual (reconhecimento H6); o texto remove ambiguidade (H2, H9).
5. **Ícone puramente decorativo (não comunica uma ação nem um estado) é `aria-hidden` e nunca é a única pista de uma informação** — se ele carrega significado (ex.: cadeado = "protegido"), o significado também precisa existir em texto ou `aria-label` em algum lugar próximo.
6. **Um mesmo ícone nunca deve significar duas coisas diferentes dentro do mesmo produto.** Isso quebra H4 (consistência) e H6 (reconhecimento) ao mesmo tempo — é o pior tipo de erro porque o usuário aprende o significado errado e carrega esse erro para outras telas.

**Tabela rápida de decisão:**

| Situação | Escolha |
|---|---|
| Ação frequente, espaço amplo (botão de formulário) | Texto, ou texto+ícone |
| Ação frequente, espaço reduzido (barra de tabela, toolbar) | Ícone + `aria-label` obrigatório |
| Ação destrutiva/irreversível, qualquer espaço | Texto sempre visível |
| Estado/status (sucesso, erro, alerta) | Ícone + cor + texto — nunca ícone/cor sozinhos (H9) |
| Navegação estrutural (voltar, fechar, menu hambúrguer) | Ícone convencional aceitável sozinho, com `aria-label` |
| Ação nova, sem convenção estabelecida | Texto+ícone, nunca só ícone |

---

## 6. Outras heurísticas de "o que colocar e como colocar"

### 6.1 Tabela vs. cards (lista de itens)
Pergunta: os dados têm **colunas comparáveis** entre os itens (o usuário quer ordenar/comparar campo a campo)? → `datatable`. Cada item é uma **unidade visual rica**, sem comparação direta entre colunas (ex.: catálogo de produtos, galeria)? → `dataview`. (Já documentado nas fichas — citado aqui porque é a mesma lógica de "escolher a estrutura certa para o tipo de decisão que o usuário vai tomar".)

### 6.2 Modal vs. inline vs. drawer vs. nova página
- **Inline (mensagem/expansão na própria tela):** a informação é curta e o contexto da tela de origem precisa continuar visível.
- **`Popover`:** conteúdo rico e interativo, mas ligado a um gatilho específico (edição rápida, detalhe pontual).
- **`Drawer`:** tarefa secundária que precisa de mais espaço que um popover mas não deve tirar o usuário do fluxo principal (filtros, detalhe de item numa lista).
- **`Dialog`/`ConfirmDialog`:** interrupção deliberada — a tarefa exige atenção total antes de continuar (confirmação de risco, formulário curto e bloqueante).
- **Nova página/rota:** a tarefa é longa, tem etapas próprias, ou o usuário pode querer voltar a ela depois (favoritar/compartilhar link) — não cabe em sobreposição.

Regra de ouro: quanto mais a tarefa secundária **rouba atenção da tarefa principal sem necessidade**, mais errada é a escolha. Modal para tudo é o erro mais comum de IA generativa de UI.

### 6.3 Progressive disclosure (o que mostrar de cara vs. o que esconder)
- Mostrar de cara: o que é necessário para a decisão mais comum (regra dos 80%).
- Esconder atrás de "mostrar mais"/`accordion`/aba avançada: o que só uma minoria de casos precisa.
- Nunca esconder: a ação principal da tela e qualquer aviso de erro/risco.
- Isso é a aplicação direta da Lei de Miller (seção 4) — não sobrecarregar a memória de trabalho com opções que 80% dos usuários não vão tocar.

### 6.4 Ordem de campos em formulário
- Do mais previsível/fácil para o mais raro/difícil (aquece o usuário antes de pedir o campo que exige mais esforço mental).
- Campos relacionados ficam visualmente agrupados (Lei da Proximidade) e, se fizer sentido, dentro do mesmo `fieldset`/`panel`.
- O campo com foco automático ao carregar a tela é sempre o primeiro campo editável — nunca um botão ou um campo no meio do formulário.

### 6.5 Cor como sinal
- Cor **reforça** um significado que já existe em outro canal (texto, ícone, posição) — nunca é o único portador do significado (H9, WCAG). Isso já é regra dura do Nephos, citada aqui porque é também heurística de "o que colocar": nunca "resolver" um estado só pintando de vermelho/verde.
- Paleta de dados (categórica/sequencial/divergente) segue a seção "Cores de dados/gráfico" do `design.md` — nunca inventar matiz nova para um gráfico.

### 6.6 Empty state: ilustração, ícone ou nada
- **Primeiro uso** (usuário nunca teve dado ali): pode usar ilustração/ícone maior + texto explicando o que vai aparecer e como preencher — é o momento de mais incerteza do usuário, vale investir em clareza.
- **Sem resultado de filtro/busca**: ícone pequeno + texto direto ("nenhum resultado para X") + ação de limpar filtro — não precisa de ilustração grande, o usuário já sabe o que é a tela.
- **Bloqueado/sem permissão**: texto claro do motivo + ação possível (pedir acesso, voltar) — nunca esconder atrás de silêncio ou de uma tela genérica de erro.
- (Distinção já existe em `empty-state.block.meta.ts` — citada aqui como exemplo do mesmo princípio: a quantidade de "enfeite" varia com o quanto o usuário precisa de acolhimento naquele momento, não é fixa.)

### 6.7 Completude de ação — nenhuma ação sem destino

Toda ação que a tela oferece leva a um resultado desenhado. Um gatilho — botão, ação de linha, item de menu — que não produz resposta visível deixa a pessoa sem saber se algo aconteceu e corrói a confiança na interface. Vale também para as ações que o próprio julgamento sugere acrescentar a uma tela pelo contexto (ex.: "exportar" num painel, "ver detalhe" numa lista): prever a ação é bom, mas prevê-la pela metade — sem o que acontece ao acioná-la — é pior do que não prevê-la, porque promete algo que a tela não cumpre.

A superfície do resultado segue a decisão da §6.2, aplicada ao que a ação produz:

- Confirmação breve, que não bloqueia o trabalho → **Toast** (`toast`).
- Tarefa curta, escolha de opções ou decisão que exige foco → **Dialog / ConfirmDialog** (`dialog`, `confirmdialog`).
- Detalhe de um item ou filtros que não devem tirar a pessoa do fluxo → **Drawer** (`drawer`).
- Conteúdo pequeno ancorado ao próprio gatilho → **Popover** (`popover`).
- Fluxo longo, com etapas ou endereço próprio → **página/rota** — aqui o resultado é outra tela, que deve ser declarada explicitamente, nunca deixada implícita.

**No catálogo:** as superfícies de resultado já existem como fichas (`toast`, `dialog`, `confirmdialog`, `drawer`, `popover`); a escolha entre elas é a §6.2. O que esta seção acrescenta é a regra de não deixar **nenhuma** ação sem uma dessas respostas.

**Pergunta de verificação:** para cada ação disparável da tela, o que acontece ao acioná-la está desenhado nesta mesma entrega, na superfície certa para o tipo de resultado? Existe algum gatilho que "não vai a lugar nenhum"?

---

## 7. Como as heurísticas colidem — desempate por dano potencial

Quando duas heurísticas puxam para lados opostos na mesma decisão, o Moses resolve na seguinte ordem de prioridade (do que é mais caro errar para o que é mais barato errar):

1. **Prevenção de erro / segurança (H5, H3)** — o dano de uma ação destrutiva mal confirmada é irreversível. Vence quase sempre.
2. **Acessibilidade e diagnóstico de erro (H9)** — excluir uma pessoa do uso, ou deixá-la sem entender o que errou, é um dano direto e imediato.
3. **Visibilidade de status (H1)** — deixar o usuário sem saber se algo está acontecendo gera repetição de ação (duplo clique, reenvio) e ansiedade.
4. **Consistência (H4)** — quebrar o padrão custa aprendizado extra em toda tela futura, não só nesta.
5. **Reconhecimento > memorização (H6)** e **prevenção de erro leve** — custam retrabalho, não dano.
6. **Eficiência para usuário avançado (H7)** — melhora quem já é fluente, mas não deve nunca comprometer os itens acima.
7. **Minimalismo estético (H8)** — importa, mas nunca à custa de esconder algo que outra heurística mais alta exige mostrar.

Exemplo de aplicação: um formulário de exclusão de conta poderia "ficar mais limpo" (H8) escondendo o aviso de que a ação é irreversível atrás de um tooltip. Isso perde para H5/H3 — o aviso tem que estar sempre visível, mesmo que isso deixe a tela "menos minimalista".

---

## 8. Protocolo de simulação pré-geração — o que o Moses roda antes de desenhar

Este protocolo substitui o "instinto" que um designer humano usaria (seção 2.1). Ele entra **entre** a etapa "abrir a(s) ficha(s) `.meta.ts` relevante(s)" e a etapa "gerar o HTML", dentro do fluxo já descrito em `Como o Moses usa o Nephos — arquitetura de entrega.md`.

**Passo A — Ler a intenção da tela.** Qual é a tarefa principal que o usuário está tentando resolver aqui? (Uma frase. Se não dá para responder em uma frase, a tela provavelmente está tentando fazer coisa demais — revisar com H8/Lei de Miller antes de continuar.)

**Passo B — Rodar a checklist das 10 heurísticas (seção 3) contra essa tarefa.** Para cada heurística, perguntar: essa tela viola alguma pergunta de verificação? Marcar as violações.

**Passo C — Rodar as perguntas de layout/agrupamento (seção 4) contra a composição.** Quantidade de opções simultâneas, agrupamento visual, tamanho de alvo de clique, destaque único.

**Passo D — Resolver texto vs. ícone (seção 5) para cada ação/estado da tela** — e, para cada ação, confirmar que o seu resultado está desenhado (§6.7): nenhum gatilho fica sem destino.

**Passo E — Se duas heurísticas colidirem, aplicar a ordem de prioridade da seção 7.**

**Passo F — Verificar contra a checagem de fidelidade de 6 passos do `design.md`** (cor por papel+passo · geometria herdada · tipografia nomeada · abrir o `.meta.ts` · fora do catálogo = perguntar · saída HTML semântico). Este passo já existe e não muda — a novidade deste documento é que os passos A–E acontecem **antes** dele, como preparação de julgamento, não como substituição.

**Passo G — Gerar o artefato.** Só depois de A–F resolvidos.

Este protocolo não precisa ser narrado no HTML de saída nem em comentários visíveis ao usuário final — é um raciocínio interno do Moses, da mesma forma que a checagem de fidelidade já é.

---

## 9. Quando uma heurística pede algo que o catálogo não cobre

Nem toda heurística tem uma peça pronta no catálogo. Quando a tela pede um padrão que não existe em ficha, a regra é a mesma da H4 e da regra-mãe: **sinalizar ao time de DS — nunca improvisar um componente, um padrão ou um valor novo.** Marcar como falta do catálogo é um resultado válido, não uma falha.

Áreas onde essa lacuna costuma aparecer (pontos de atenção perenes, não uma lista fechada):

- **Eficiência para usuário avançado (H7):** atalho, filtro salvo, ação em lote, "modo avançado" — telas de uso frequente (operacional, gerencial) costumam pedir isso.
- **Ajuda contextual além da dica (H10):** um "painel de ajuda" ou "link para documentação" dentro de um fluxo vai além do `tooltip`, limitado a dica complementar.
- **Densidade configurável (Lei de Miller em tabelas grandes):** "modo compacto vs. confortável", além da paginação/filtro que a tabela já cobre.

Ao encontrar uma dessas necessidades sem ficha correspondente, sinalizar — o novo padrão nasce no catálogo primeiro, e só então na tela.

---

## 10. Referência rápida (para consulta durante a geração)

- **Toda ação de alto risco → texto visível, nunca só ícone, confirmação com foco no cancelar.**
- **Toda espera > ~400ms → feedback de carregamento visível.**
- **Todo erro → texto + `aria-invalid`, nunca só cor.**
- **Mais de ~4 itens simultâneos para reter → agrupar ou dividir em etapas.**
- **Mais de ~7 opções para escolher → busca, categorização ou disclosure progressivo.**
- **Um destaque visual forte por tela/seção — nunca dois competindo.**
- **Ícone sozinho só se for convenção universal e ação de baixo risco.**
- **Modal só quando a tarefa exige atenção total — senão, inline/drawer/popover.**
- **Nenhuma ação sem destino → o resultado de todo gatilho é projetado (toast/dialog/drawer/popover/rota), inclusive o das ações acrescentadas por julgamento.**
- **Na dúvida entre heurísticas → seguir a ordem de prioridade da seção 7.**
- **Na dúvida entre heurística e catálogo → o catálogo vence sempre.**
