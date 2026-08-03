---
tipo: referencia
tags:
  - trabalho
  - design-system
  - nephos
  - ia-agente
---

# Princípios do Nephos

Este arquivo é a lista de decisões que o Nephos assume como verdade para construir uma UI legível por agentes de IA. Não é uma biblioteca bonita: é a camada de UI do cérebro do produto — a parte que responde "que interface usar aqui". Cada princípio abaixo é estrutural e vale como contrato para o time.

---

## A stack do Nephos

O Nephos é **Angular + PrimeNG + Storybook**, com **HTML semântico** como artefato de saída do Moses.

O que isso fixa:

- **PrimeNG é a base de componentes.** É a escolha certa para produto Angular empresarial com tabelas, filtros, calendários e tree views. Roda sobre PrimeNG **21.0.2** + **@primeuix/themes 2.0.2**, preset **Aura**.
- **O espelho dos tokens é o theming do PrimeNG** (as CSS custom properties do motor de tema), não classes utilitárias de Tailwind. A camada semântica se ancora ali.
- **Cada componente entrega Angular + exemplo em HTML puro**, porque o Moses gera HTML semântico. O exemplo não pode assumir que a saída é sempre um componente de framework.
- **Os metadados moram ao lado do componente** (`*.meta.ts`) — ver [[Schema de metadados de componente]].

Regra-mãe: copiar a *estrutura de pensamento* de um DS agêntico, nunca comandos ou ferramentas amarradas a outra stack.

---

## 1. A pergunta certa não é "Figma → código"

O fluxo obsoleto é *PM escreve ticket → Designer desenha no Figma → Engenheiro reconstrói*. Ele falha porque cada papel trabalha com uma **versão diferente da realidade**, e a IA, recebendo só um print ou um ticket, produz algo **visualmente correto e funcionalmente errado**.

O fluxo do Nephos é **conhecimento do produto → código**. Três mudanças estruturais:

1. **O repositório é o "cérebro do produto"** — não só código, mas decisões, regras de negócio e requisitos.
2. **Componentes são "businessware"** — carregam *quando*, *como* e *por que* usar, não só a aparência.
3. **Agentes são parte do time** — revisam, fazem QA, detectam padrão obsoleto, abrem PR.

O Nephos é a **camada de UI desse cérebro**: a parte que responde "que interface usar aqui".

---

## 2. As cinco perguntas que a IA faz em silêncio

Todo componente precisa responder, sem ambiguidade:

1. Devo usar este componente?
2. Qual variante?
3. O que vai dentro dele?
4. Quais regras devo obedecer?
5. **O que eu nunca devo fazer?**

A pergunta 5 é a que praticamente nenhum DS humano responde — e é a que mais evita alucinação. Se um metadado do Nephos não responde às cinco, ele está incompleto.

---

## 3. Anti-padrões são obrigatórios, não opcionais

Dizer à IA o que **não** fazer vale tanto quanto dizer o que fazer. Exemplos canônicos:

- Não usar dois botões primários lado a lado
- Não usar botão para navegação simples
- Não introduzir novas matizes de cor
- Não usar mais de dois pesos de fonte numa mesma região
- Não desviar do grid de espaçamento definido

**Regra operacional:** todo componente entra na biblioteca com no mínimo **3 anti-padrões escritos**, no formato **regra → porque → em vez disso**. Componente sem anti-padrão não é considerado pronto.

**Ciclo de correção:** toda vez que o Moses errar visualmente, o erro vira uma nova linha de anti-padrão no metadado ou no `design.md`. O sistema aprende por acumulação de proibições.

---

## 4. Tokens falam intenção, não cor

- ❌ `primary`, `secondary`, `#0B5FFF`
- ✅ `emphasis`, `default`, `subtle`, `surface-card`, `text-primary`

Duas camadas:

- **Primitivos** — valores brutos, nomenclatura técnica (`core-gray-200`). É onde o PrimeNG já opera.
- **Semânticos** — intenção de uso (`text-primary`, `surface-card`, `border-emphasis`). É a camada que o Nephos cria e documenta por cima do PrimeNG.

**O ponto mais subestimado:** *ter descrição em tudo é a coisa mais poderosa*. Cada token precisa de uma frase em linguagem natural — "usar para itens ativos e dar ênfase", "hover em itens com elevação sutil". A IA lê a descrição para decidir, não o nome.

---

## 5. `design.md` é o mapa, não o território

Estrutura híbrida:

- **Front-matter YAML** — tokens legíveis por máquina: cores em Hex, escala tipográfica, elevação, espaçamento, formas.
- **Corpo Markdown** — em linguagem natural: personalidade da marca ("confiável e precisa"), propósito semântico das cores, regras rígidas, dos & don'ts.

Três características não negociáveis:

- **Leve.** Ele não contém o contrato de cada componente. Se ficar pesado, a IA se perde.
- **Linguagem restritiva.** "Construído sobre espaçamento **estrito** de 4px", "**apenas** peso 600". A palavra "estrito" faz diferença real no comportamento do modelo.
- **Deep references.** No lugar do detalhe, a instrução: *"Antes de construir ou modificar este componente, abra o arquivo de metadados para entender o contrato completo"*.

**Regra de ouro do enforcement:** a instrução *"Ao criar ou modificar qualquer UI, leia e siga o `design.md`"* precisa estar **no topo** do `CLAUDE.md` / `agents.md` do repositório. Sem isso, o `design.md` é ignorado.

---

## 6. Metadados por componente são a peça central

Quatro pilares mínimos:

1. **Componente** — categoria (átomo/molécula/organismo) + descrição da função
2. **Props e variantes** — todos os estados, tamanhos, variações; e as **combinações inválidas**
3. **Relações** — hierarquia (pai/filho), com o que costuma aparecer, em que padrões se encaixa
4. **Tokens + AI hints** — quais tokens consome e instruções contextuais de quando aplicar

Detalhamento completo e formato em → [[Schema de metadados de componente]]

**Adaptação do Nephos:** como o artefato do Moses é **HTML**, cada metadado carrega um exemplo em HTML puro além do exemplo Angular. A saída não é sempre o componente de framework — é HTML semântico.

---

## 7. Storybook é fonte da verdade visual **e** instrucional

Não é galeria. É onde a IA consulta a implementação real, os metadados e os tokens ao mesmo tempo.

- Toda story herda tokens e fontes do repositório global — se herdar errado, o problema é de configuração de ambiente, não do componente
- **Aba "Metadata"** exibindo o metadado do componente: permite ao designer verificar se a IA está lendo as regras certas
- Debug visual com navegador/Playwright: comparar o componente no Storybook contra a plataforma real para pegar *token mismatch*

---

## 8. Nunca migrar tudo de uma vez

Sequência do Nephos:

1. **Auditoria + `catalog.md`** — inventário por escopo (global vs. página) e complexidade (simples/média/complexa), com prioridade P0/P1/P2
2. **3 a 4 componentes um a um** — é aqui que aparecem os problemas sistêmicos (token mismatch, herança de fonte, CSS conflitante)
3. **Checklist de pré-voo + guia de desenvolvimento** commitados no repo — institucionalizam o aprendizado
4. **Só então batching** de 10+ componentes

Sinal de maturidade: quando o terceiro componente leva metade do tempo do primeiro, o fluxo está pronto para escalar.

---

## 9. Skill vem depois, não antes

Skill ≠ arquivo Markdown. Markdown é passivo (precisa ser citado); skill é **ativa** — o modelo lê a descrição de todas as skills disponíveis e puxa sozinho a que combina com a tarefa.

**A regra de sequenciamento que mais importa:** só transformar em skill depois de o fluxo manual estar redondo em 3–4 componentes. Skill construída cedo demais cristaliza um processo errado.

Skills previsíveis para o Nephos:

- criação de componente + metadados + story (o pacote completo)
- auditoria de tokens (caçar valor *hardcoded*)
- validação de anti-padrões numa tela gerada
- consulta ao MCP do Nephos

Skills se atualizam: *"atualize a skill"* quando o padrão mudar.
