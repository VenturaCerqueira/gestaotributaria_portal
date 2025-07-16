import React from "react";
import '../../../assets/styles/BottomFixed.css'

const BottomFixed = () => {
  return (
    <>
      {/* Botão e-Contrib */}
      <a href="http://www.e-contrib.com.br" target="_blank" rel="noopener noreferrer">
        <div className="fixed-button" id="fixedButton">
          <i className="fas fa-chart-line"></i>
          <span className="button-text">e-Contrib</span>
        </div>
      </a>

      {/* Botão NFS-e */}
      <a href="http://www.e-contrib.com.br/nfs-e" target="_blank" rel="noopener noreferrer">
        <div className="fixed-button fixed-button-nfse" id="fixedButtonNfse">
          <i className="fas fa-file-invoice-dollar"></i>
          <span className="button-text">NFS-e</span>
        </div>
      </a>

      {/* Botão Protocolo */}
      <a href="http://www.keepinformatica.com.br/protocolo" target="_blank" rel="noopener noreferrer">
        <div className="fixed-button fixed-button-protocolo" id="fixedButtonProtocolo">
          <i className="fas fa-file-alt"></i>
          <span className="button-text">Protocolo</span>
        </div>
      </a>
    </>
  );
};

export default BottomFixed;
