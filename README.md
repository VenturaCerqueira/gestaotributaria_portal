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

#   Documentação do Esquema de Banco de Dados gestao_tributaria
## 🚀 DTI:
Este documento detalha as tabelas do banco de dados, complementando a estrutura inicial com os campos identificados na aplicação.
## Rotas:
- http://localhost:3000/portal_web/HOME/imobiliario/dti/login

###   🙎‍♂️ Tabela: dti_usuario
Armazena os dados dos usuários que se cadastram e acessam o sistema.
#### Regra:
-   Primeiro acesso:
    ```bash
    1 - Login: CPF não cadastrado muda para opção cadastrar-**se**
    2 - Cadastra-se: com todos campos preenchido corretamente, deve-se  disparar um e-mail para ativacao do cadastro 
    3 - Login: Caso CPF já cadastrado verificar, se encontra-se ativo "Sim" ou "Não", caso "Não", usuario poderar clicar botão para reenviar e-mail;
    ```
|   Coluna      |   Tipo        |   Restrições    |   Descrição                                 |
|---------------|---------------|-----------------|---------------------------------------------|
|id             | INTEGER       | PRIMARY KEY	  | Identificador único do usuário.             |
|cpf	        | VARCHAR(11)   | NOT NULL UNIQUE | CPF do usuário (armazenar apenas dígitos).  |
|nome_completo  | VARCHAR(255)  | NOT NULL	      | Nome completo do usuário.                   |                
|email	        | VARCHAR(255)  | NOT NULL UNIQUE |	E-mail do usuário.                          |
|status         | int           | NOT NULL        | Status inicial -> 0 - email não verificado 1 - verificado | 
|data_cadastro	| DATETIME	    | NOT NULL	      | Data e hora em que o usuário foi cadastrado.|****

---

###  🔁 Tabela: dti_tipo_transacao
Tabela de domínio para os tipos de transações imobiliárias disponíveis.

|   Coluna      |   Tipo        |   Restrições    |   Descrição                                     |
|---------------|---------------|-----------------|-------------------------------------------------|
| id	        | INTEGER	    | PRIMARY KEY	  | Identificador único do tipo de transação.       |
| nome	        | VARCHAR(100)	| NOT NULL	      | Nome da transação (Ex: Compra e Venda, Permuta).|
| descricao     | text          | NOT NULL        | Descrição sobre a transação (Compra e venda -> descrição sbre   )|    

### 📃 Tabela: dti_cartorio
Armazena a lista de cartórios de registro de imóveis.

|   Coluna      |   Tipo        |   Restrições    |   Descrição                                     |
|---------------|---------------|-----------------|-------------------------------------------------|
| id	        |  INTEGER	    | PRIMARY KEY	  | Identificador único do cartório.                |
| nome_cartorio	| VARCHAR(255)	| NOT NULL	      | Nome oficial do cartório.                       | 
---
###   Tabela: DTI_itiv
Tabela principal que armazena os dados de uma Declaração de Transação Imobiliária (DTI).
| Coluna                    | Tipo        | Restrições                 | Descrição                                         |
|---------------------------|-------------|----------------------------|---------------------------------------------------|
| **id** | `INTEGER`   | `PRIMARY KEY`              | Identificador único da declaração ITIV.           |
|**fk_dti_usuario** | `Varchar (15)` | `NOT NULL`, `FK`|Chave estrangeira|
| **fk_dti_cartorio** | `INTEGER`   | `NULL`, `FK`               | Chave estrangeira para `cartorio.id`.             |
| **fk_usuario_cancelamento** | `INTEGER`   | `NULL`, `FK`               | Chave estrangeira para `usuario.id` que cancelou. |
| **fk_dti_tipo_transacao** | `INTEGER`   | `NOT NULL`, `FK`           | Chave estrangeira para `tipo_transacao.id`.       |
| **fk_imovel** | `INTEGER`   | `NULL`, `FK`           | Chave estrangeira para `imovel.id`. Observação: Ele pode ser null caso tipo imovel seja rural, sera necessario atribuir ao gravar a inscrição como varchar =>(`Zona Rural`), desabilitando o campo inscrição imobiliária, registro em cartório, cartorio de registro e inscrição matricula              |
| endereco_imovel_rural | text | `NULL` | Serve para usuario descrever endereço, caso endereço seja tipo zona rual, exemplo nome da fazenda. | 
| **registrado_cartorio** | `BOOLEAN`   | `NOT NULL`                 | Indica se o imóvel tem registro em cartório (Sim/Não).|
| **tipo_imovel** |  `INTEGER` | `NOT NULL` | 1 - urbano e 2 - Rural | 
| **matricula** | `VARCHAR(20)` | `NULL`                     | Número da matrícula do imóvel no cartório.        |
| **valor_transacao** | `NUMERIC(15,2)` | `NOT NULL`                 | Valor total da transação. Observação: valor da transação não pode ser diferente do valor (avista + financiado).                         |
| **numero_transacao** | varchar(15) | `NOT NULL`| Um código alfanumérico aleatório de 15 caracteres será gerado no momento em que o usuário confirmar o registro do DTI. Este código será único e composto por uma combinação de letras e números, garantindo sua exclusividade e servindo como um identificador para o registro.   |
| **chave_validacao_declaracao** | `VARCHAR (15)` | `NULL` | Quando a situação do DTI (Documento de Transferência Interna) for alterada para "4 - Transferido/Pago", será gerado um código alfanumérico aleatório de 15 caracteres. Este código combinará letras e números para garantir sua unicidade. |
| **data_transacao** | `DATE`      | `NOT NULL`                 | Data em que a transação foi realizada. Observação/validação: Data não pode ser maior que atual do usuario         |
| **valor_avista** | `NUMERIC(15,2)` | `NOT NULL`                 | Parcela do valor paga à vista.                    |
| **aliquota_avista** | `NUMERIC(5,2)` | `NOT NULL`                 | Alíquota de ITIV sobre o valor à vista.           |
| **valor_financiado** | `NUMERIC(15,2)` | `NOT NULL`                 | Parcela do valor que foi financiada.              |
| **aliquota_financiado** | `NUMERIC(5,2)` | `NOT NULL`                 | Alíquota de ITIV sobre o valor financiado.        |
| **valor_itiv** | `NUMERIC(15,2)` | `NOT NULL`                 | Valor total calculado do imposto ITIV. Formula: ((Aliquota_avista * valor_Avista)/100) +  ((Aliquota_financiada * valor_financiado)/100) = valor_itiv         |
| **tipo_instrumento** | `INTEGER`   | `NOT NULL`                 | 1-Particular; 2-Público.                          |
| **situacao** | `INTEGER`   | `NOT NULL`                 | 1-Aberto; 2-Em Análise; 3-Confirmado; 4-Transferido/Pago; 5-Cancelado etc. |
| **data_cancelamento** | `DATETIME`  | `NULL`                     | Data e hora do cancelamento.                      |
---
### Tabela: `dti_comprador`

Armazena os dados de um ou mais compradores associados a uma DTI.

| Coluna                | Tipo          | Restrições           | Descrição                                        |
|-----------------------|---------------|----------------------|--------------------------------------------------|
| **id** | `INTEGER`     | `PRIMARY KEY`        | Identificador único do registro.                 |
| **fk_itiv** | `INTEGER`     | `NOT NULL`, `FK`     | Chave estrangeira para `itiv.id`.                |
| **tipo_pessoa** | `VARCHAR(10)` | `NOT NULL`           | 'Físico' ou 'Jurídico'.                          |
| **cpf_cnpj** | `VARCHAR(14)` | `NOT NULL`           | CPF ou CNPJ do comprador (apenas dígitos).       |
| **nome_razao_social** | `VARCHAR(255)`| `NULL`               | Nome completo ou Razão Social.                   |
| **email** | `VARCHAR(255)`| `NULL`               | E-mail de contato do comprador.                  |
| **telefone** | `VARCHAR(15)` | `NULL`               | Telefone fixo (com DDD).                         |
| **celular** | `VARCHAR(15)` | `NULL`               | Telefone celular (com DDD).                      |

---
### Tabela: `dti_vendedor`

Armazena os dados de um ou mais vendedores associados a uma DTI.

| Coluna                | Tipo          | Restrições           | Descrição                                        |
|-----------------------|---------------|----------------------|--------------------------------------------------|
| **id** | `INTEGER`     | `PRIMARY KEY`        | Identificador único do registro.                 |
| **fk_itiv** | `INTEGER`     | `NOT NULL`, `FK`     | Chave estrangeira para `itiv.id`.                |
| **cpf_cnpj** | `VARCHAR(14)` | `NOT NULL`           | CPF ou CNPJ do vendedor (apenas dígitos).        |
| **nome_razao_social** | `VARCHAR(255)`| `NULL`               | Nome completo ou Razão Social.                   |
| **nome_fantasia** | `VARCHAR(255)`| `NULL`               | Nome fantasia (para pessoa jurídica).            |
| **email** | `VARCHAR(255)`| `NULL`               | E-mail de contato do vendedor.                   |
| **telefone** | `VARCHAR(15)` | `NULL`               | Telefone fixo (com DDD).                         |
| **celular** | `VARCHAR(15)` | `NULL`               | Telefone celular (com DDD).                      |

---
### Tabela: `dti_anexo`

Armazena os documentos anexados a uma DTI.

| Coluna           | Tipo          | Restrições           | Descrição                                        |
|------------------|---------------|----------------------|--------------------------------------------------|
| **id** | `INTEGER`     | `PRIMARY KEY`        | Identificador único do anexo.                    |
| **fk_itiv** | `INTEGER`     | `NOT NULL`, `FK`     | Chave estrangeira para `itiv.id`.                |
| **tipo_documento** | `VARCHAR(100)`| `NOT NULL`           | Descrição do tipo de documento (Ex: Contrato, RG).|
| **nome_arquivo** | `VARCHAR(255)`| `NOT NULL`           | Nome original do arquivo enviado.                |
| **path_arquivo** | `VARCHAR(500)`| `NOT NULL`           | Caminho de armazenamento do arquivo no servidor. |
| **data_anexo** | `DATETIME`    | `NOT NULL`           | Data e hora do upload do anexo.                  |

---
### Tabela: `dti_lancamento`

Tabela para relacionar a DTI com o lançamento fiscal correspondente no sistema tributário.

| Coluna             | Tipo      | Restrições           | Descrição                                           |
|--------------------|-----------|----------------------|-----------------------------------------------------|
| **id** | `INTEGER` | `PRIMARY KEY`        | Identificador único do registro.                    |
| **fk_itiv** | `INTEGER` | `NOT NULL`, `FK`     | Chave estrangeira para `itiv.id`.                   |
| **fk_lancamento** | `INTEGER` | `NOT NULL`           | ID do lançamento no sistema de arrecadação.         |
