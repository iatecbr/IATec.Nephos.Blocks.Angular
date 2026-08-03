# Onde mora o tema

O `nephos.preset.ts` e o `nephos.palettes.ts` **saíram desta pasta** em
03/08/2026. Agora eles são parte do pacote:

```
projects/iatec/nephos-ui/src/lib/theme/
    nephos.palettes.ts    as 7 marcas (a única camada de cor que é nossa)
    nephos.preset.ts      o preset que as pluga no @primeuix/themes
```

e são exportados por `@iatec/nephos-ui`:

```ts
import { nephosPreset, applyNephosTheme, NEPHOS_THEMES } from '@iatec/nephos-ui';
```

## Por que

Enquanto o tema morou aqui, ele **não era distribuído em pacote nenhum**.
Um projeto que consumisse o Nephos tinha os componentes, mas não tinha
como montar a cor das 7 marcas — teria que copiar os dois arquivos à mão.

Isso quebrava justamente o cenário que define o projeto: o Moses **não
clona o repositório**, ele lê a documentação de como instalar e
configurar (reunião de 03/08). Um tema que só existe dentro do repo não
atende a esse cenário.

O `@iatec/nephos-ui` é o destino natural porque já é a base de que os
outros pacotes dependem, e porque o tema é **identidade** — a parte que é
nossa, ao lado da tipografia.

## O que continua aqui

Esta pasta segue sendo o Design System no sentido de **documentação**: o
`design.md` normativo, as 110 fichas, as fundações em dados, o MCP e as
skills. O que saiu foi só o código que precisava ser instalável.

## Uma consequência que vale saber

O `nephos.palettes.ts` é a **camada primitiva** — é onde o hex mora de
propósito (exceção declarada na skill `nephos-token-audit`). Ao auditar,
o caminho a considerar agora é
`projects/iatec/nephos-ui/src/lib/theme/nephos.palettes.ts`.
