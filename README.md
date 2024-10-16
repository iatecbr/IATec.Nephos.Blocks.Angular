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

1. **Instale o Node.js e npm:**
Certifique-se de ter o Node.js e npm instalados em sua máquina. Você pode baixar a versão mais recente do Node.js em [nodejs.org](https://nodejs.org/).


2. **Configure as credências npm:**
Na raiz do usuário, edite o arquivo `.npmrc` e adicione as credenciais do IATec subistituindo os valores entre `#{}`:
```.npmrc
registry=https://registry.npmjs.org/
@iatec:registry=#{NPM_iatec_host_community}#

always-auth=true

; begin auth token
//sda-iatec.pkgs.visualstudio.com/_packaging/IATec.Community/npm/registry/:username=#{NPM_Username}#
//sda-iatec.pkgs.visualstudio.com/_packaging/IATec.Community/npm/registry/:_password=#{Base64_Password}#
//sda-iatec.pkgs.visualstudio.com/_packaging/IATec.Community/npm/registry/:email=#{NPM_email}#
//sda-iatec.pkgs.visualstudio.com/_packaging/IATec.Community/npm/:username=#{NPM_Username}#
//sda-iatec.pkgs.visualstudio.com/_packaging/IATec.Community/npm/:_password=#{Base64_Password}#
//sda-iatec.pkgs.visualstudio.com/_packaging/IATec.Community/npm/:email=#{NPM_email}#
; end auth token

```
## Contribuindo

A contribuição para o Nephos é muito bem-vinda! Seja adicionando novos componentes, melhorando a documentação ou reportando bugs, sua ajuda é fundamental para o crescimento deste projeto. Veja nosso guia de contribuição para saber como começar.
