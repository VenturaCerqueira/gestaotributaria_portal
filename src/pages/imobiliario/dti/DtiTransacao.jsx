import React, { useState } from 'react';
// Ajuste o caminho conforme sua estrutura
// Ex: import './dtiTransacao.css';
import '../../../assets/styles/dtiTransacao.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Importando os ícones necessários
import {
    faHome, faChevronRight, faChevronLeft, faExchangeAlt, faCar,
    faGift, faSyncAlt, faKey, faFileSignature, faUsers, faEllipsisH
} from '@fortawesome/free-solid-svg-icons';


const DtiTransacao = () => {
    // Dados das transações com ícones associados
    const transacoes = [
        { id: 1, icon: faExchangeAlt, titulo: "Compra e Venda", descricao: "A Declaração de Transações Imobiliárias (DTI) é um documento essencial para formalizar operações de compra e venda de imóveis em Salvador, sendo utilizada para o cálculo e pagamento do imposto sobre a Transmissão Inter Vivos (ITIV). Para preencher a DTI junto à Secretaria da Fazenda de Salvador (SEFAZ), são necessários os seguintes documentos:\n\n1. Documentos de Identificação:\n- Comprador e Vendedor:\n  - Cópia do RG e CPF.\n  - Se pessoa jurídica, cópia do CNPJ e do contrato social.\n\n2. Documentação do Imóvel:\n- Certidão atualizada do Cartório de Registro de Imóveis:\n  - Comprova a propriedade e a situação jurídica do imóvel.\n- Contrato de Compra e Venda ou Escritura Pública:\n  - Detalha os termos da transação imobiliária." },
        { id: 2, icon: faCar, titulo: "Compra e Venda de Garagem", descricao: "Geralmente segue o processo de Compra e Venda normal, mas pode ter especificidades quanto à matrícula no Registro de Imóveis (se é unidade autônoma ou vinculada a um apartamento). Documentos básicos: Identificação das partes, Certidão do imóvel/garagem, Contrato." },
        { id: 3, icon: faGift, titulo: "Dação em Pagamento", descricao: "Ocorre quando uma dívida é paga com a entrega de um bem (o imóvel, neste caso) em vez de dinheiro. Documentos: Identificação das partes, Documentação do imóvel, Instrumento de dação em pagamento, Comprovação da dívida original." },        { id: 4, icon: faSyncAlt, titulo: "Permuta", descricao: "Troca de imóveis entre duas ou mais partes. Pode haver ou não torna (pagamento de diferença em dinheiro). Documentos: Identificação de todas as partes envolvidas, Documentação de TODOS os imóveis permutados, Contrato ou Escritura de Permuta." },
        { id: 5, icon: faKey, titulo: "Usufruto", descricao: "Direito de usar e gozar de um imóvel que pertence a outra pessoa (nu-proprietário). Não há transferência de propriedade, apenas do direito de uso. Documentos: Identificação do instituidor e do usufrutuário, Documentação do imóvel, Escritura de instituição de usufruto." },
        { id: 6, icon: faFileSignature, titulo: "Cessão de Direitos Decorrentes de Compra e Venda", descricao: "Transferência dos direitos que alguém possui sobre um imóvel que ainda não está quitado ou registrado em seu nome (ex: imóvel na planta). Documentos: Identificação do cedente (quem cede) e cessionário (quem recebe), Documentação do imóvel, Contrato original de compra e venda, Instrumento de Cessão de Direitos." },
        { id: 7, icon: faUsers, titulo: "Cessão de Direitos a Sucessão", descricao: "Transferência dos direitos hereditários sobre um imóvel antes da conclusão do inventário. Documentos: Identificação do(s) herdeiro(s)-cedente(s) e do cessionário, Documentação do imóvel, Certidão de óbito do proprietário original, Comprovação da qualidade de herdeiro, Escritura de cessão de direitos hereditários." },
        { id: 8, icon: faEllipsisH, titulo: "Outros", descricao: "Casos não especificados acima podem incluir: Integralização de Capital Social com Imóvel, Adjudicação Compulsória, Arrematação em Leilão, Doação com Reserva de Usufruto, etc. A documentação varia conforme o caso específico e deve ser consultada junto à SEFAZ ou um profissional." },
    ];

    // Estado para guardar a transação atualmente selecionada
    const [transacaoSelecionada, setTransacaoSelecionada] = useState(transacoes[0]);

    // Função para atualizar a transação selecionada ao clicar em um item da lista
    const handleSelect = (transacao) => {
        setTransacaoSelecionada(transacao);
    };

    // Renderização do componente

    return (
        // Container principal do componente
        <div className="transacao-container">
           
            <div className="transacao-header">
                <h2>
                    <FontAwesomeIcon icon={faHome} className="transacao-header-icon" /> Selecione abaixo o tipo de transação
                </h2>

            </div>

            {/* Área de conteúdo principal com duas colunas */}
            <div className="transacao-content">
                {/* Coluna 1: Lista de Seleção */}
                <div className="transacao-selecao">
                    <ul className="list-group">
                        {/* Mapeia o array de transações para criar os itens da lista */}
                        {transacoes.map((transacao) => (
                            <li
                                key={transacao.id}
                                className={`list-group-item ${transacaoSelecionada.id === transacao.id ? 'active' : ''}`}
                                onClick={() => handleSelect(transacao)} // Define a transação selecionada no clique
                            >
                                {/* Conteúdo do item: Ícone esquerdo + Título */}
                                <span className="list-item-content">
                                    <FontAwesomeIcon icon={transacao.icon} className="list-item-icon-left" aria-hidden="true" />
                                    {transacao.titulo}
                                </span>
                                {/* Ícone direito (seta) */}
                                <FontAwesomeIcon icon={faChevronRight} className="list-item-icon-right" aria-hidden="true" />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Coluna 2: Detalhes da Transação e Botões */}
                <div className="transacao-detalhes">
                    {/* Área de texto descritivo */}
                    <div className="transacao-texto">
                        <h3>{transacaoSelecionada.titulo}</h3>
                        {/* Usar dangerouslySetInnerHTML é um risco se a descrição vier de fontes não confiáveis.
                            Alternativa: Usar uma biblioteca de markdown ou formatar no backend.
                            Para manter a simplicidade e as quebras de linha do array: */}
                        <p style={{ whiteSpace: 'pre-line' }}>{transacaoSelecionada.descricao}</p>
                    </div>
                    {/* Área dos botões de ação */}
                    <div className="transacao-botoes">
                        <button className="btn btn-secondary" onClick={() => alert('Ação Voltar não implementada')}>
                            <FontAwesomeIcon icon={faChevronLeft} /> Voltar
                        </button>
                        <button className="btn btn-primary" onClick={() => alert('Ação Próximo não implementada')}>
                            Próximo <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DtiTransacao;