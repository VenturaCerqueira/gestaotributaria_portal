import React from 'react'
import { Route, Routes } from "react-router-dom";
import { fullUrl, entidadeUrl } from '../utils/global';

import App from '../App';
import Error404 from '../pages/Error404';
import Home from '../pages/Home/index.jsx';

import EmissaoCnd from '../pages/contribuinte/EmissaoCnd';
import ValidacaoCnd from '../pages/contribuinte/ValidacaoCnd';
import ValidacaoCertidao from '../pages/contribuinte/ValidacaoCertidao';
import DeclaracaoNaoInscrito from '../pages/contribuinte/DeclaracaoNaoInscrito';
import ValidacaoDeclaracaoNaoInscrito from '../pages/contribuinte/ValidacaoDeclaracaoNaoInscrito';
import IssSegundaVia from '../pages/mobiliario/IssSegundaVia';
import Tff2Via from '../pages/mobiliario/TffSegundaVia';
import Iptu2Via from '../pages/imobiliario/IptuSegundaVia';
import Itiv2Via from '../pages/imobiliario/ItivSegundaVia';
import Dti from '../pages/imobiliario/dti/DtiHome.jsx';
import DtiLogin from '../pages/imobiliario/dti/DtiLogin.jsx';
import DtiTransacao from '../pages/imobiliario/dti/DtiTransacao.jsx';
import DtiDadosImovel from '../pages/imobiliario/dti/DtiDadosImovel.jsx';


function Rotas() {
    return (
        entidadeUrl
            ?
            <Routes>
                <Route path={`${import.meta.env.VITE_PUBLIC_URL}`} element={<Error404 />} />

                <Route path={`${fullUrl}`} element={<App />} >
                    <Route path={`${fullUrl}/`} element={<Home />} />

                    <Route path={`${fullUrl}/contribuinte/emissao-cnd`} element={<EmissaoCnd />} />
                    <Route path={`${fullUrl}/contribuinte/validacao-cnd`} element={<ValidacaoCnd />} />
                    <Route path={`${fullUrl}/contribuinte/validacao-certidao`} element={<ValidacaoCertidao />} />
                    <Route path={`${fullUrl}/contribuinte/declaracao-nao-inscrito`} element={<DeclaracaoNaoInscrito />} />
                    <Route path={`${fullUrl}/contribuinte/validacao-declaracao-nao-inscrito`} element={<ValidacaoDeclaracaoNaoInscrito />} />

                    <Route path={`${fullUrl}/mobiliario/emissao-cnd`} element={<EmissaoCnd />} />
                    <Route path={`${fullUrl}/mobiliario/validacao-cnd`} element={<ValidacaoCnd />} />
                    <Route path={`${fullUrl}/mobiliario/2via-iss`} element={<IssSegundaVia />} />
                    <Route path={`${fullUrl}/mobiliario/2via-tff`} element={<Tff2Via />} />

                    <Route path={`${fullUrl}/imobiliario/2via-iptu`} element={<Iptu2Via />} />
                    <Route path={`${fullUrl}/imobiliario/2via-itiv`} element={<Itiv2Via />} />

                    <Route path={`${fullUrl}/imobiliario/dti`} element={<Dti />} /> 
                    <Route path={`${fullUrl}/imobiliario/dti/login`} element={<DtiLogin />} />
                    <Route path={`${fullUrl}/imobiliario/dti/transacao`} element={<DtiTransacao />} />
                    <Route path={`${fullUrl}/imobiliario/dti/dados-imovel`} element={<DtiDadosImovel />} />

                    {/* Rota de erro 404 */}
                    <Route path="*" element={<Error404 />} />
                </Route>
            </Routes>
            :
            null
    )
}

export default Rotas
