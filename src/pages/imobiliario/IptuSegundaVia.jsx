import React, { useState } from "react";
import {
  FaFileAlt,
  FaCalendarAlt,
  FaListUl,
  FaDollarSign,
  FaCalendarCheck,
  FaPrint,
  FaCheckCircle,
} from "react-icons/fa"; // Ícones
import "../../assets/styles/form.css"; // Importação do CSS
import { cnpjValidate, cpfValidate, dateBr, removeSeparador } from "../../utils/helper";
import useImobiliarioService from "../../services/api/imobiliario";
import { entidadeUrl } from "../../utils/global";

const IptuSegundaVia = () => {
  const [documento, setDocumento] = useState("");
  const [error, setError] = useState(false);
  const [errorExercicio, setErrorExercicio] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exercicio, setExercicio] = useState("");
  const [dadosTabela, setDadosTabela] = useState([]);
  const imobiliarioApi = useImobiliarioService();

  // Atualiza o estado do CPF/CNPJ
  const handleDocumentoChange = (e) => {
    setError(false);
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      value = value.replace(/^(\d{3})(\d)/, "$1.$2");
      value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
      value = value.replace(/\.(\d{3})(\d)/, ".$1-$2");

    } else {
      value = value.slice(0, 14);
      value = value.replace(/^(\d{2})(\d)/, "$1.$2");
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
      value = value.replace(/(\d{4})(\d)/, "$1-$2");
    }

    if (value.length === 14) {
      setError(!cpfValidate(value));
    }
    if (value.length === 18) {
      setError(!cnpjValidate(value));
    }
    setDocumento(value);
  };

  // Atualiza o estado do Exercício
  const handleExercicioChange = (e) => {
    setErrorExercicio(false);
    var hoje = new Date();
    let exercicio = e.target.value.replace(/\D/g, "");
    if (exercicio.length === 4 && (exercicio < 1900 || exercicio > hoje.getFullYear())) {
      setErrorExercicio(true);

    }
    setExercicio(exercicio);
  };

  // Geração de dados simulados e exibição da tabela
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await imobiliarioApi.segundaVia({
        cpf_cnpj: removeSeparador(documento),
        exercicio,
        conta_contabil: 1
      });
      setDadosTabela(result.cotas);
      setLoading(false);
    }
    catch (error) {
      setLoading(false)
    }
  };

  const handleImprimir = (cota) => {
    window.open(
      `${import.meta.env.VITE_API_URL}/portal-contribuinte/imobiliario/segunda-via/imprimir/${cota.numero}?entidade=${entidadeUrl}`,
      '_blank'
    );
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="form-container">
            <h2 className="form-title">2ª via IPTU</h2>
            <form className="form" onSubmit={handleSubmit}>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Digite CPF ou CNPJ"
                  value={documento}
                  onChange={handleDocumentoChange}
                  maxLength="18"
                />
                {error && <span className="text-danger ml-1">Formato do documento inválido</span>}
              </div>

              <div className="input-container mt-3">
                <input
                  type="text"
                  placeholder="Exercício Ex: 2025"
                  value={exercicio}
                  onChange={handleExercicioChange}
                  minLength={4}
                  maxLength={4}
                />
                {errorExercicio && <span className="text-danger ml-1">Exercício inválido</span>}
              </div>

              <div className="button-group mt-5">
                {loading
                  ?
                  <button
                    className="btn-form"
                    type="submit"
                    disabled={true}
                  >
                    <FaFileAlt className="emissao-button-icon" />
                    <span>Aguarde...</span>
                  </button>
                  :
                  <button
                    className="btn-form"
                    type="submit"
                    disabled={
                      (documento.length !== 14 && documento.length !== 18) ||
                      exercicio.length !== 4 ||
                      dadosTabela.length > 0 ||
                      error
                    }
                  >
                    <FaPrint className="emissao-button-icon" />
                    <span>Gerar</span>
                  </button>
                }

              </div>
            </form>

          </div>
        </div>

        <div className="col-md-12 px-5" style={{ marginTop: "-50px" }}>
          {dadosTabela.length > 0 && (
            <div className="tabela-wrapper">
              <table className="tabela-resultados">
                <thead>
                  <tr>
                    <th>
                      <FaFileAlt style={{ marginRight: "8px" }} /> Número DAM
                    </th>
                    <th>
                      <FaCalendarAlt style={{ marginRight: "8px" }} /> Exercício
                    </th>
                    <th>
                      <FaListUl style={{ marginRight: "8px" }} /> Inscrição
                    </th>
                    <th>
                      <FaDollarSign style={{ marginRight: "8px" }} /> Valor
                    </th>
                    <th>
                      <FaCalendarCheck style={{ marginRight: "8px" }} /> Vencimento
                    </th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosTabela.map((cota, index) => (
                    <tr
                      key={index}
                      style={{
                        color: cota.situacao === 2
                          ? "gray" // Cinza claro para pagos
                          : new Date(cota.data_vencimento + ' 01:00:00') < new Date()
                            ? "red" // Vermelho para vencidos
                            : "inherit", // Cor padrão para itens normais
                        opacity: cota.pago ? 0.8 : 1, // Mais claro para pagos
                      }}
                    >
                      <td>{cota.numero}</td>
                      <td>{cota.exercicio}</td>
                      <td>{cota.inscricao} - {cota.logradouro}</td>
                      <td>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(cota.valor_total)}
                      </td>
                      <td>{dateBr(cota.data_vencimento)}</td>
                      <td style={{ textAlign: "center" }}>
                        {cota.situacao === 2 ? (
                          <span>
                            Pago <FaCheckCircle style={{ color: "green" }} />
                          </span>
                        ) : (
                          <button
                            className="icon-btn print-btn"
                            title="Imprimir"
                            onClick={() => handleImprimir(cota)}
                          >
                            <FaPrint />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3">Valor total:</td>
                    <td colSpan="3">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(
                        dadosTabela.reduce((total, cota) => total + parseFloat(cota.valor_total), 0)
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default IptuSegundaVia;
