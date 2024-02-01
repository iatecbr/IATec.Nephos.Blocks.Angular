# Nephos - Biblioteca de Componentes Angular do IATec Design System

Bem-vindo ao repositório oficial do Nephos, a biblioteca Angular que implementa o Design System do IATec, oferecendo um conjunto rico e coeso de componentes UI para desenvolvedores que buscam uniformidade, eficiência e facilidade de uso em suas aplicações.

## Sobre o Projeto

O Nephos é uma iniciativa para proporcionar aos desenvolvedores Angular acesso direto aos componentes visuais e funcionalidades definidos pelo Design System do IATec. Nosso objetivo é facilitar a criação de interfaces de usuário consistentes e atraentes, seguindo as melhores práticas de design e desenvolvimento.

### Principais Características

- **Componentes Reutilizáveis**: Uma vasta gama de componentes UI, incluindo botões, formulários, modais, tabelas e muito mais, todos adaptáveis para atender às necessidades do seu projeto.
- **Estilos Personalizáveis**: Temas e estilos facilmente customizáveis para alinhar com a identidade visual da sua aplicação.
- **Responsividade e Acessibilidade**: Componentes projetados para serem totalmente responsivos e acessíveis, garantindo uma excelente experiência de usuário em dispositivos móveis e para pessoas com diferentes necessidades.
- **Documentação Abrangente**: Guia detalhado sobre como utilizar os componentes, incluindo exemplos de código e melhores práticas.

## Como Começar

Para começar a utilizar o Nephos em seu projeto Angular, siga os passos abaixo:

1. **Instale a biblioteca via npm:**

```ts
npm install @iatec/nephos-blocker
```

2. **Importe os módulos dos componentes que deseja utilizar em seu módulo Angular:**

```ts
import { IATecNephosBlockHeader } from '@iatec/nephos';

@NgModule({
  declarations: [...],
  imports: [IATecNephosBlockHeader, ...],
})
export class SeuModulo {}
```
