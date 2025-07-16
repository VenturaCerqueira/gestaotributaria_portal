import React, { useState } from 'react';
import '../../../assets/styles/dtiLogin.css';
import { FaIdCard, FaUser, FaEnvelope, FaSignInAlt, FaUserPlus, FaArrowLeft } from 'react-icons/fa';

/**
 * Formata um valor de string como CPF (###.###.###-##).

 * @param {string} value 
 * @returns {string}
 */
const formatCPF = (value) => {
  if (!value) return ""; 

  
  const digitsOnly = value.replace(/\D/g, "");

  
  const truncatedDigits = digitsOnly.slice(0, 11);


  let formattedCPF = truncatedDigits;
  if (truncatedDigits.length > 9) {
    formattedCPF = truncatedDigits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (truncatedDigits.length > 6) {
    formattedCPF = truncatedDigits.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  } else if (truncatedDigits.length > 3) {
    formattedCPF = truncatedDigits.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  }

  return formattedCPF;
};


const DtiLogin = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const [formData, setFormData] = useState({
        loginCpf: '',
        signUpCpf: '',
        signUpName: '',
        signUpEmail: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        
        if (name === 'loginCpf' || name === 'signUpCpf') {
            const formattedValue = formatCPF(value);
            setFormData(prevData => ({
                ...prevData,
                [name]: formattedValue,
            }));
        } else {
           
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const toggleSignIn = () => setIsSignUp(false);
    const toggleSignUp = () => setIsSignUp(true);

    const handleSignInSubmit = (e) => {
        e.preventDefault();
        console.log("Login CPF (sem máscara):", formData.loginCpf.replace(/\D/g, "")); 
        alert(`Tentativa de login com CPF: ${formData.loginCpf}`);
    };

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        console.log("Cadastro Dados (CPF sem máscara):", {
            cpf: formData.signUpCpf.replace(/\D/g, ""), 
            nome: formData.signUpName,
            email: formData.signUpEmail
        });
        alert(`Tentativa de cadastro para: ${formData.signUpName}`);
    };

    return (
        <div className="card">
            <div className={`dti-login-container ${isSignUp ? 'dti-login-active' : ''}`}>

                {/* Formulário de Cadastro (Sign Up) */}
                <div className="dti-login-form-container dti-login-sign-up">
                    <div className="dti-login-content">
                        <h1 className="dti-login-title">
                            Cadastrar-se <FaUserPlus aria-hidden="true" className="dti-login-title-icon"/>
                        </h1>
                        <p>Preencha os campos para criar sua conta.</p>
                        <form className="dti-login-form" onSubmit={handleSignUpSubmit}>
                            {/* Campo CPF com Máscara e Limite */}
                            <label htmlFor="signUpCpf" className="dti-login-label">
                                <FaIdCard aria-hidden="true" className="dti-login-icon" />
                                <input
                                    type="text" 
                                    id="signUpCpf"
                                    name="signUpCpf"
                                    placeholder="CPF (___.___.___-__)" 
                                    className="dti-login-input"
                                    value={formData.signUpCpf}
                                    onChange={handleInputChange}
                                    maxLength={14} 
                                    required
                                    inputMode="numeric" 
                                />
                            </label>
                            {/* Campo Nome Completo */}
                            <label htmlFor="signUpName" className="dti-login-label">
                                <FaUser aria-hidden="true" className="dti-login-icon" />
                                <input
                                    type="text"
                                    id="signUpName"
                                    name="signUpName"
                                    placeholder="Nome Completo"
                                    className="dti-login-input"
                                    value={formData.signUpName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            {/* Campo E-mail */}
                            <label htmlFor="signUpEmail" className="dti-login-label">
                                <FaEnvelope aria-hidden="true" className="dti-login-icon" />
                                <input
                                    type="email"
                                    id="signUpEmail"
                                    name="signUpEmail"
                                    placeholder="E-mail"
                                    className="dti-login-input"
                                    value={formData.signUpEmail}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            {/* Botão Cadastrar */}
                            <button type="submit" className="dti-login-button dti-login-button-primary">
                                <FaUserPlus aria-hidden="true" style={{ marginRight: '8px' }}/> Cadastrar-se
                            </button>

                           
                            <button
                                type="button" 
                                className="dti-login-button dti-login-back-button" 
                                onClick={toggleSignIn} 
                            >
                                <FaArrowLeft aria-hidden="true" style={{ marginRight: '8px' }} /> Voltar
                            </button>
                           
                        </form>
                    </div>
                </div>

                {/* Formulário de Login  */}
                <div className="dti-login-form-container dti-login-sign-in">
                    <div className="dti-login-content">
                         <h1 className="dti-login-title">
                             Login <FaSignInAlt aria-hidden="true" className="dti-login-title-icon"/>
                        </h1>
                        <p>Acesse sua conta usando seu CPF.</p>
                        <form className="dti-login-form" onSubmit={handleSignInSubmit}>
                            {/* Campo CPF com Máscara e Limite */}
                            <label htmlFor="loginCpf" className="dti-login-label">
                                <FaIdCard aria-hidden="true" className="dti-login-icon" />
                                <input
                                    type="text" 
                                    id="loginCpf"
                                    name="loginCpf"
                                    placeholder="CPF (___.___.___-__)"
                                    className="dti-login-input"
                                    value={formData.loginCpf}
                                    onChange={handleInputChange}
                                    maxLength={14} 
                                    required
                                    inputMode="numeric"
                                />
                            </label>
                            {/* Botão Acessar */}
                            <button type="submit" className="dti-login-button dti-login-button-primary">
                                <FaSignInAlt aria-hidden="true" style={{ marginRight: '8px' }} /> Acessar
                            </button>
                        </form>
                    </div>
                </div>

                {/* Painel de Alternância (Toggle Overlay) */}
                <div className="dti-login-toggle-container">
                    <div className="dti-login-toggle">
                        {/* Painel Esquerdo */}
                        <div className="dti-login-toggle-panel dti-login-toggle-left">
                            {/* Fonte será ajustada via CSS */}
                            <h1 className="dti-login-welcome">Bem-Vindo de volta!</h1>
                            <p>Já possui cadastro? Clique abaixo para fazer login.</p>
                            <button type="button" className="dti-login-button dti-login-button-ghost" onClick={toggleSignIn}>
                                <FaSignInAlt aria-hidden="true" style={{ marginRight: '8px' }} /> Login
                            </button>
                        </div>
                         {/* Painel Direito */}
                        <div className="dti-login-toggle-panel dti-login-toggle-right">
                             {/* Fonte será ajustada via CSS */}
                            <h1 className="dti-login-welcome">Bem-Vindo</h1>
                            <p>Não tem uma conta? Cadastre-se facilmente clicando abaixo.</p>
                            <button type="button" className="dti-login-button dti-login-button-ghost" onClick={toggleSignUp}>
                                <FaUserPlus aria-hidden="true" style={{ marginRight: '8px' }} /> Cadastrar-se
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DtiLogin;