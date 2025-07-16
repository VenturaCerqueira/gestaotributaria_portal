import React, { useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import "../../assets/styles/form.css";
import useContribuinteService from '../../services/api/contribuinte.js';
import { cnpjValidate, cpfValidate, removeSeparador } from "../../utils/helper";

const ValidacaoDeclaracaoNaoInscrito = () => {
  const [documento, setDocumento] = useState("");
  const [chave, setChave] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [declaracao, setDeclaracao] = useState({});
  const contribuinteApi = useContribuinteService();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await contribuinteApi.validacaoDeclaracaoNaoInscrito({ cpf_cnpj: removeSeparador(documento), chave_validacao: chave });

      setDeclaracao(result.declaracao);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }

  };

  return (

    <div className="row">
      <div className="col-md-12">
        <div className="form-container">
          <h2 className="form-title">Validação de declaração de não inscrito</h2>
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
                placeholder="Chade de validação"
                value={chave}
                onChange={(e) => setChave(e.target.value)}
                maxLength="20"
              />
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
                    ((documento.length !== 14 && documento.length !== 18) || chave.length < 20) ||
                    Object.keys(declaracao).length > 0 ||
                    error
                  }
                >
                  <FaFileAlt className="emissao-button-icon" />
                  <span>Validar declaração</span>
                </button>
              }

            </div>
          </form>

        </div>
      </div>
      <div className="col-md-12">
        {Object.keys(declaracao).length > 0 && (
          <>
            <embed
              id="pdfViewer"
              src={declaracao.arquivo}
              type="application/pdf"
              width="100%"
              height="500px"
            />
          </>

        )}
      </div>

    </div>
  );
};

export default ValidacaoDeclaracaoNaoInscrito;
