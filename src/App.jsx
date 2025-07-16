import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import BottomFixed from './components/bottom/bottom_fixed/FixedButtons';
import Acessibilidade from './components/acessebilidade/Acessibilidade';
import Headers from './components/header/Header';
import Navbars from './components/navbar/Navbar';
import Footers from './components/footer/Footer';
import { FontSizeProvider } from './context/FontSizeContext';
import { entidadeUrl } from './utils/global';
import useHomeService from './services/api/home';
const COR_PRIMARIA = ' #007bff';
const COR_SECUNDARIA = '#0052cc';

const App = () => {
  const homeApi = useHomeService();
  const [prefeitura, setPrefeitura] = useState({
    razao_social: '',
    imagem: '',
    cpf_cnpj: '',
    cor_primaria: COR_PRIMARIA,
    cor_secundaria: COR_SECUNDARIA,
    link_acesso_informacao: ''
  });

  useEffect(() => {
    const today = new Date();
    getHome();
  }, []);

  const getHome = async () => {
    const result = await homeApi.home();
    setPrefeitura({ ...result.prefeitura, cor_primaria: result.prefeitura.cor_primaria ?? COR_PRIMARIA, cor_secundaria: result.prefeitura.cor_secundaria ?? COR_SECUNDARIA });
  }

  return (
    entidadeUrl
      ?
      <FontSizeProvider>
        < div className="main-content" >
          <div className="main-container">
            <div className="inner-body">
              <Acessibilidade prefeitura={prefeitura} />
              <Headers prefeitura={prefeitura} />
              <BottomFixed />
              <Navbars prefeitura={prefeitura} />
              <Outlet />
            </div>
          </div>
          <Footers prefeitura={prefeitura} />
        </div >
      </FontSizeProvider>
      :
      null
  );
}

export default App;
