---
tipo: referencia
tags: [trabalho, nephos, fidelidade, primeng]
---

# Valores reais herdados do PrimeNG (Aura) — referência de fidelidade

> Valores reais herdados do PrimeNG (preset **Aura**, `@primeuix/themes 2.0.2`). Referência para não inventar geometria; no produto cada componente já os aplica.

## Fidelidade por área

- **Cores — surface (slate):** idêntico ao PrimeNG (11 passos).
- **Cores — feedback + gray:** padrão do kit (Tailwind), confere no `aura/base`.
- **Cores — 7 marcas (primary):** nossas — não existem no PrimeNG (identidade).
- **Funções (hover/active/contraste/highlight/foco):** copiadas fiéis do `aura/base.semantic.colorScheme`.
- **API dos componentes (`.meta.ts`):** API real do PrimeNG documentada, não inventada.
- **Raio / espaçamento / tamanhos nas fichas:** fiéis por herança — as fichas delegam ao PrimeNG.
- **Tipografia:** o PrimeNG não tem escala global — a escala Nephos (Noto Sans) é nossa.

## Valores reais herdados do PrimeNG (Aura)

Ninguém deve **inventar** estes valores; eles vêm prontos do PrimeNG. Guardados aqui só para referência e para protótipos ficarem fiéis.

**Raio de canto** (`primitive.borderRadius`): none `0` · xs `2px` · sm `4px` · md `6px` · lg `8px` · xl `12px`
- campo de formulário e **botão** → md = **6px**
- **cartão (card)** → xl = **12px**
- **modal/dialog** → xl = 12px · popover/select → md = 6px

**Campo de formulário** (`semantic.formField`): paddingX **0.75rem** · paddingY **0.5rem** · borderRadius **6px**
- sm: fontSize 0.875rem · 0.625rem / 0.375rem
- lg: fontSize 1.125rem · 0.875rem / 0.625rem
- borda: `surface.300` · hover `surface.400` · foco `primary` · inválido `red.400` (claro)
- texto `surface.700` · placeholder `surface.500`

**Botão** (`aura/button`): borderRadius = 6px (form.field) · paddingX 0.75rem · paddingY 0.5rem · gap 0.5rem · iconOnlyWidth **2.5rem** · **label fontWeight 500** · rounded 2rem
- link.color = `primary.color`

**Card** (`aura/card`): borderRadius **12px (xl)** · body padding **1.25rem** · title 1.25rem/500 · subtitle = texto muted

**Foco** (`primitive.focusRing`): width 1px · style solid · color `primary` · offset 2px

**Outros**: transitionDuration 0.2s · disabledOpacity 0.6 · iconSize 1rem · content.borderRadius 6px

**Tipografia**: o Aura **não define família nem escala** — herda o CSS da página. Só fixa tamanhos/pesos pontuais por componente (ex.: card title 1.25rem, peso de rótulo de botão 500). Logo, a **escala tipográfica Nephos (Noto Sans) é nossa** e legítima.

## Nota importante

Para o **produto real** (Moses gera componentes PrimeNG), a geometria é **automática (100%)** — cada componente já traz raio/padding/peso corretos. O protótipo em HTML/CSS imita isso à mão; é só ali que a aproximação aparece. Onde há valores sob nosso controle (cores), a fidelidade é verificada no kit, não deduzida.
