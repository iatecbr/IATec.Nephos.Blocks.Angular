---
tipo: catalogo
tags: [trabalho, nephos, blocos, templates, atomic-design]
---

# Catálogo de blocos e templates — Nephos (Atomic Design)

Catálogo dos **blocos (organismos)** e **templates** do manual.

## A estrutura que adotamos (Atomic Design)

```
átomos / moléculas  →  blocos (organismos)  →  templates  →  páginas
(componentes)          (combinações)           (layout, sem       (template +
                                                conteúdo real)     conteúdo real)
```

- **Componente** (átomo/molécula) = a peça pronta do PrimeNG. Ficha `.meta.ts` com `origin: primeng`.
- **Bloco** (organismo) = combinação de componentes, montada do jeito da organização. Ficha `.meta.ts` com `category: 'block'`, `origin: 'nephos-own'`. **É o "nosso".**
- **Template** = a estrutura da página (onde ficam header, sidebar, conteúdo), **sem conteúdo real**. `category: 'layout'`.
- **Página** = template + conteúdo real. Não é artefato do DS; é o que o Moses gera no fim.

**Legenda:** 🟨 composição-Nephos (nosso, mais trabalho) · 🟦 usa componente PrimeNG quase direto

---

## Navegação

| Bloco | Compõe | Ficha (.meta.ts) |
|---|---|---|
| **Header / navbar** (menu, busca, avatar) | logo · menubar · search-input · theme-toggle · icon-button · overlaybadge · avatar · menu | `header.block.meta.ts` |
| **Sidebar / menu lateral** (colapsável) | panelmenu · icon-button · icon · divider · drawer (mobile) | `sidebar.block.meta.ts` |
| Breadcrumbs 🟦 | breadcrumb | — |
| Tabs / abas 🟦 | tabs | — |
| Footer 🟨 | link · texto | — |
| Paginação 🟦 | paginator | — |

## Entrada de dados

| Bloco | Compõe | Ficha (.meta.ts) |
|---|---|---|
| **Login** | inputtext · password · checkbox · button | `login-form.block.meta.ts` |
| Cadastro 🟨 | inputtext · password · checkbox · button | — |
| **Busca com filtros** | search-input · select · multiselect · chip · button · icon-button | `search-filters.block.meta.ts` |
| Wizard / stepper (etapas) 🟨 | stepper · button | — |
| Upload (preview + progresso) 🟦 | fileupload · progressbar | — |

## Exibição de dados

| Bloco | Compõe | Ficha (.meta.ts) |
|---|---|---|
| **Tabela de dados** (ordenar, filtrar, seleção em massa) | datatable · checkbox · tag · button · icon-button · paginator · empty-state | `data-table.block.meta.ts` |
| Card (produto/artigo/usuário/estatística) 🟨 | card · tag · button · avatar | — |
| Lista (avatar + ações rápidas) 🟨 | dataview/list · avatar · button | — |
| Dashboard widget / gráfico 🟨 | card · chart | — |
| **Empty state** (sem dados) | ícone · texto · button | `empty-state.block.meta.ts` |
| Timeline / feed de atividades 🟦 | timeline · tag | — |

## Feedback e overlay

| Bloco | Compõe | Ficha (.meta.ts) |
|---|---|---|
| Modal / dialog 🟦 | dialog | — |
| Toast / notificação 🟦 | toast | — |
| Alert / banner de aviso | message (inline) · banner (nosso) | — |
| Loading / skeleton 🟦 | skeleton · progressspinner | — |
| **Confirmação de ação destrutiva** | confirmdialog · button | `destructive-confirm.block.meta.ts` |

---

## Templates

Estruturas de página sem conteúdo real — onde os blocos se encaixam.

| Template | Compõe (blocos) | Ficha (.meta.ts) |
|---|---|---|
| **App shell** (header + sidebar + conteúdo) | header · sidebar · breadcrumbs | `app-shell.template.meta.ts` |
| **Tela de autenticação** (centralizada) | login/cadastro | `auth.template.meta.ts` |
| **Listagem** (filtros + tabela + paginação) | busca-filtros · tabela · paginação | `listing.template.meta.ts` |
| **Detalhe / formulário** | header · form · ações | `detail-form.template.meta.ts` |
| **Dashboard** (grade de widgets) | widgets · empty-state | `dashboard.template.meta.ts` |

---

## Nota de método

Do mais reusado ao mais específico: primeiro os **átomos** que travam vários blocos (avatar, menu/menubar, breadcrumb, tabs, paginator, skeleton); depois os **blocos universais** (empty-state, confirmação destrutiva, busca-com-filtros, header/navbar, sidebar); o **flagship** é a tabela de dados (datatable), onde a organização mais tem jeito próprio; então os **templates** (app shell, listagem, autenticação, detalhe/form, dashboard); por fim o **MCP + skill** amarram tudo para o Moses.

> Cada bloco/template roda a **checagem de fidelidade** (ver `design.md`) e cumpre o contrato (`.meta.ts`, 10 blocos).
