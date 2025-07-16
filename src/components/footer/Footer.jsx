import React from "react";
import "../../assets/styles/Footer.css";
const Footer = ({ prefeitura }) => {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: prefeitura.cor_secundaria,
      }}
    >
      <div className="footer-container">
        {/* Logo ou Nome */}
        <div className="footer-logo">
          <h3>Portal do Contribuinte</h3>
        </div>

        {/* Links úteis */}
        <div className="footer-links">
          <ul>
            <li><a href="/">Início</a></li>
            <li><a href="/sobre">Sobre Nós</a></li>
            <li><a href="/contato">Contato</a></li>
            <li><a href="/privacidade">Política de Privacidade</a></li>
          </ul>
        </div>

        {/* Ícones sociais */}
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://https://www.instagram.com/keepinformatica/.com" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} - Desenvolvido por Keep Informática - e-Contrib. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
