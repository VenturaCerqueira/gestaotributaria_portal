import React, { useState, useEffect } from 'react';
import '../../assets/styles/header.css';
import { formatDate } from '../../utils/formatDate';
import useHomeService from '../../services/api/home';

const Header = ({ prefeitura }) => {
  const homeApi = useHomeService();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    setCurrentDate(formatDate(today));
  }, []);

  return (
    <header
      className="custom-header"
      style={{
        background: `linear-gradient(135deg, ${prefeitura.cor_secundaria}, ${prefeitura.cor_primaria})`
      }}>
      <div className="custom-logo">
        <img src={prefeitura.imagem} alt="Logo Prefeitura" />
      </div>
      <h1 className="header-title">Secretaria Municipal da Fazenda</h1>
      <div className="icon-container">
        <a href="https://wa.me/5571996565392" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-whatsapp"></i>
        </a>
        <a href="https://www.instagram.com/keepinformatica?igsh=MWJ1c2x2cTJhb3ZtaQ%3D%3D" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-instagram"></i>
        </a>
      </div>
      <div className="location-date">
        <span>{prefeitura.razao_social}</span>
        <br />
        <span>{currentDate}</span>
      </div>
    </header>
  );
};

export default Header;

