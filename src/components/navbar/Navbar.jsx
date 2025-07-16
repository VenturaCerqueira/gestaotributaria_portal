import { Link } from "react-router-dom";
import "../../assets/styles/navbar.css";
import React from "react";
import { fullUrl } from "../../utils/global";

const Navbar = ({ prefeitura }) => {
  return (
    <nav
      className="navbar navbar-expand-xl custom-navbar"
      style={{
        backgroundColor: prefeitura.cor_primaria,
      }}
    >
      <div className="container">

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Itens da Navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {/* Link para Início */}
            <li className="nav-item">
              <Link className="nav-link" to={`${fullUrl}`}>
                <i className="fas fa-home"></i> Início
              </Link>
            </li>

            {/* Dropdown Contribuinte */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/contribuinte"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user"></i> Contribuinte
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={`${fullUrl}/contribuinte/emissao-cnd`}>
                    <i className="fas fa-file-alt"></i> Emissão de CND
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={`${fullUrl}/contribuinte/validacao-cnd`}>
                    <i className="fas fa-check-circle"></i> Validação CND
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={`${fullUrl}/contribuinte/validacao-certidao`}>
                    <i className="fas fa-check-circle"></i> Validação de Certidão de baixa de atividade
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={`${fullUrl}/contribuinte/declaracao-nao-inscrito`}>
                    <i className="fas fa-file-invoice-dollar"></i> Declaração de Não Inscrito
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={`${fullUrl}/contribuinte/validacao-declaracao-nao-inscrito`}>
                    <i className="fas fa-check-circle"></i> Validação de Declaração de não inscrito
                  </Link>
                </li>
              </ul>
            </li>

            {/* Dropdown Mobiliário */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/mobiliario"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-building"></i> Mobiliário
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={`${fullUrl}/mobiliario/emissao-cnd`}>
                    <i className="fas fa-file-alt"></i> Emissão de CND
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={`${fullUrl}/mobiliario/validacao-cnd`}>
                    <i className="fas fa-check-circle"></i> Validação CND
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={`${fullUrl}/mobiliario/2via-iss`}>
                    <i className="fas fa-file-alt"></i> 2ª Via ISS
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={`${fullUrl}/mobiliario/2via-tff`}>
                    <i className="fas fa-check-circle"></i> 2ª Via TFF
                  </Link>
                </li>
              </ul>
            </li>

            {/* Dropdown Imobiliário */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/imobiliario"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-home"></i> Imobiliário
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={`${fullUrl}/imobiliario/2via-iptu`}>
                    <i className="fas fa-file-alt"></i> 2ª Via IPTU
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={`${fullUrl}/imobiliario/2via-itiv`}>
                    <i className="fas fa-check-circle"></i> 2ª Via ITIV
                  </Link>
                </li>
              </ul>
            </li>

            {/* Dropdown Protocolo */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/protocolo"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-folder"></i> Protocolo
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="http://www.keepinformatica.com.br/protocolo" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-file-invoice-dollar"></i> Acesse o Sistema de Protocolo
                  </a>
                </li>
              </ul>
            </li>

            {/* Dropdown NFS-e */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/nfse"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-receipt"></i> NFS-e
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="http://www.e-contrib.com.br/nfs-e" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-file-invoice-dollar"></i> Acesse o Sistema de NFS-e
                  </a>
                </li>
                <li>
                  <Link className="dropdown-item" to="/nfse/consulta">
                    <i className="fas fa-file-invoice-dollar"></i> Consultar Autenticidade de NFS-e
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

};

export default Navbar;
