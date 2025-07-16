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

###  🔁 Tabela: tipo_transacao
Tabela de domínio para os tipos de transações imobiliárias disponíveis.

|   Coluna      |   Tipo        |   Restrições    |   Descrição                                     |
|---------------|---------------|-----------------|-------------------------------------------------|
| id	        | INTEGER	    | PRIMARY KEY	  | Identificador único do tipo de transação.       |
| nome	        | VARCHAR(100)	| NOT NULL	      | Nome da transação (Ex: Compra e Venda, Permuta).|
| descricao     | text          | NOT NULL        | Descrição sobre a transação (Compra e venda -> descrição sbre   )|    

### 📃 Tabela: cartorio
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
| **fk_tipo_transacao** | `INTEGER`   | `NOT NULL`, `FK`           | Chave estrangeira para `tipo_transacao.id`.       |
| **fk_imovel** | `INTEGER`   | `NULL`, `FK`           | Chave estrangeira para `imovel.id`. Observação: Ele pode ser null caso tipo imovel seja rural, sera necessario atribuir ao gravar a inscrição como varchar =>(`Zona Rural`), desabilitando o campo inscrição imobiliária, registro em cartório, cartorio de registro e inscrição matricula              |
| endereco_imovel_rural | text | `NULL` | Serve para usuario descrever endereço, caso endereço seja tipo zona rual, exemplo nome da fazenda. | 
| **fk_cartorio** | `INTEGER`   | `NULL`, `FK`               | Chave estrangeira para `cartorio.id`.             |
| **registrado_cartorio** | `BOOLEAN`   | `NOT NULL`                 | Indica se o imóvel tem registro em cartório (Sim/Não).|
| **tipo_imovel** |  `INTEGER` | `NOT NULL` | 1 - urbano e 2 - Rural | 
| **matricula** | `VARCHAR(20)` | `NULL`                     | Número da matrícula do imóvel no cartório.        |
| **valor_transacao** | `NUMERIC(15,2)` | `NOT NULL`                 | Valor total da transação.                         |
| **data_transacao** | `DATE`      | `NOT NULL`                 | Data em que a transação foi realizada.            |
| **valor_avista** | `NUMERIC(15,2)` | `NOT NULL`                 | Parcela do valor paga à vista.                    |
| **aliquota_avista** | `NUMERIC(5,2)` | `NOT NULL`                 | Alíquota de ITIV sobre o valor à vista.           |
| **valor_financiado** | `NUMERIC(15,2)` | `NOT NULL`                 | Parcela do valor que foi financiada.              |
| **aliquota_financiado** | `NUMERIC(5,2)` | `NOT NULL`                 | Alíquota de ITIV sobre o valor financiado.        |
| **valor_itiv** | `NUMERIC(15,2)` | `NOT NULL`                 | Valor total calculado do imposto ITIV.            |
| **tipo_instrumento** | `INTEGER`   | `NOT NULL`                 | 1-Particular; 2-Público.                          |
| **tipo_documento** | `INTEGER`   | `NOT NULL`                 | 1-Contrato Compra/Venda; 2-Com Alienação; etc.    |
| **situacao** | `INTEGER`   | `NOT NULL`                 | 1-Aberto; 2-Em Análise; 3-Confirmado; 4-Pago; etc. |
| **fk_usuario_cancelamento** | `INTEGER`   | `NULL`, `FK`               | Chave estrangeira para `usuario.id` que cancelou. |
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