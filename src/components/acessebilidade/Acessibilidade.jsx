import React, { useContext } from "react";
import { FontSizeContext } from '../../context/FontSizeContext';
import '../../assets/styles/Acessibilidade.css';


const Acessibilidade = ({ prefeitura }) => {
  const { decreaseFontSize, increaseFontSize, resetFontSize } = useContext(FontSizeContext);

  const changeFontSize = (action) => {

    console.log(`Alterar tamanho da fonte: ${action}`);
  };

  return (
    <div className="top-accessibility-bar py-1 px-3">
      <div className="container d-flex justify-content-start align-items-center gap-4">
        <span className="fw-bold">ACESSIBILIDADE</span>
        <a href="#" className="text-decoration-none" onClick={(e) => { e.preventDefault(); decreaseFontSize(); }}>
          A-
        </a>
        <a href="#" className="text-decoration-none" onClick={(e) => { e.preventDefault(); resetFontSize(); }}>
          A
        </a>
        <a href="#" className="text-decoration-none" onClick={(e) => { e.preventDefault(); increaseFontSize(); }}>
          A+
        </a>
        <span className="mx-2">|</span>
        <a
          href={prefeitura.link_acesso_informacao}
          target='_blank'
          rel="noopener noreferrer"
          className="text-decoration-none"
        >
          <i className="fas fa-info-circle"></i> ACESSO À INFORMAÇÃO
        </a>
      </div>
    </div>
  );
};

export default Acessibilidade;
