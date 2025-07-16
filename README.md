# **Portal Contribuinte**

Este repositório contém o front-end do Portal Unificado, desenvolvido em **React**. Ele foi projetado para oferecer uma interface moderna, modular e responsiva, garantindo uma ótima experiência para diferentes dispositivos.

---

## **📋 Sumário**
- [📦 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [📖 Pré-requisitos](#-pré-requisitos)
- [⚙️ Configuração do Ambiente](#️-configuração-do-ambiente)
- [🚀 Funcionalidades Principais](#-funcionalidades-principais)
- [🛠️ Scripts Disponíveis](#️-scripts-disponíveis)
- [🐛 Solução de Problemas](#-solução-de-problemas)
- [📜 Licença](#-licença)

---

## **📦 Tecnologias Utilizadas**

As seguintes tecnologias e bibliotecas estão sendo usadas no projeto:

| Tecnologia              | Versão    | Descrição                                          |
|-------------------------|-----------|--------------------------------------------------|
| **React**               | 18.2.0    | Biblioteca principal para construção da interface. |
| **React DOM**           | 18.2.0    | Gerenciamento da renderização no DOM.            |
| **React Router DOM**    | 6.4.0     | Gerenciamento de rotas no React.                 |
| **Bootstrap**           | 5.2.3     | Framework CSS para responsividade e layout.      |
| **FontAwesome**         | 6.2.1     | Ícones para melhorar a interface.                |
| **SASS**                | 1.54.9    | Pré-processador CSS para estilização customizada. |
| **Vite**                | 3.2.0     | Ferramenta de build rápida para desenvolvimento. |
| **ESLint**              | 8.31.0    | Linter para padronização de código.              |
| **Prettier**            | 2.8.0     | Ferramenta de formatação automática de código.   |

---

## **📂 Estrutura do Projeto**

A organização do projeto foi feita para facilitar a escalabilidade e modularidade:

```plaintext
src/
├── assets/
│   ├── styles/      # Arquivos CSS/SASS globais e reset
|   ├── icons/      # Arquivos CSS/SASS globais e reset
|   ├── fonts/      # Arquivos CSS/SASS globais e reset
│   └── img/      # Imagens utilizadas no projeto
├── components/      # Componentes reutilizáveis
│   ├── navbar/      # Navbar fixa com menus e dropdowns
│   ├── bottom/      # Botões flutuantes
│   └── footer/      # Footer do portal
├── pages/           # Páginas principais do sistema
│   ├── Home/        # Página inicial
│   ├── Contribuinte/
│   ├── Mobiliario/
│   ├── Imobiliario/
│   └── Nfse/
├── App.jsx          # Componente principal do React
└── main.jsx         # Ponto de entrada do aplicativo
```
## 📖 Pré-requisitos
Antes de começar, verifique se você possui os seguintes pré-requisitos instalados:

    -   Node.js: versão 16.20.2 (recomendada para este projeto). 
    Caso precise de outra versão, é possível configurar com o nvm como descrito na seção de Solução de Problemas.


    -   npm ou yarn: versão compatível com o Node.js..

## ⚙️ Configuração do Ambiente
1. Clone o Repositório
Faça o clone deste repositório para sua máquina local:

```plaintext
git clone https://github.com/VenturaCerqueira/Portal_Contribuinte_web.git
```
```
cd Portal_Contribuinte_web
```
2. Instale as Dependências
Instale todas as dependências listadas no arquivo package.json com o comando:
```
npm install
```
3. Configure o Servidor
Caso queira rodar o servidor na porta 3000 (em vez da padrão do Vite, 5173), edite ou crie o arquivo vite.config.js:

javascript
```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Porta configurada para 3000
  },
});
```
4. Inicie o Servidor
Rode o servidor de desenvolvimento:
```
npm run dev
```
O projeto estará acessível em:
```
http://localhost:3000
```
## 🚀 Funcionalidades Principais:

Navbar Fixa: Inclui menus dropdown e é responsiva.

Botões Flutuantes: Atalhos para funcionalidades importantes do portal.

Sistema de Rotas: Gerenciamento de rotas usando React Router DOM.

Estilização Customizada: CSS modular com SASS e Bootstrap.

Compatibilidade Mobile: Layout adaptável para diferentes dispositivos.

## 🛠️ Scripts Disponíveis
No diretório do projeto, você pode executar os seguintes comandos:
```
npm run dev: Inicia o servidor de desenvolvimento.
```
```
npm run build: Gera a build de produção otimizada.
```
```
npm run start: Pré-visualiza a build de produção localmente.
```
```
npm run lint: Verifica e corrige problemas de formatação no código.
```
## 🐛 Solução de Problemas
```
Erro: Porta Não É 3000
```
Se o projeto abrir em outra porta, como 5173, configure a porta desejada no arquivo vite.config.js:

```
javascript
server: {
  port: 3000,
}
```
Erro: Caminhos de Arquivo Não Encontrados

## Verifique se os caminhos estão corretos no seu App.jsx e outros arquivos:
```
javascript
import "./assets/styles/global.css";
Erro: Versão do Node.js
Se o ambiente exigir o Node.js v18, mas você estiver usando a v16 (ou vice-versa):
```
### Instale o gerenciador de versão nvm.

#### Use o comando:

```
nvm install 16
```
```
nvm use 16
```