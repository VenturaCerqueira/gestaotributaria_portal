import { createContext, useState, useEffect } from "react";

// Criar o contexto
export const FontSizeContext = createContext();

// Criar o Provider para envolver o App
export const FontSizeProvider = ({ children }) => {
    const defaultFontSize = 16; // Defina o tamanho padrão
    const minFontSize = 8; // Tamanho mínimo permitido
    const maxFontSize = 30; // Tamanho máximo permitido

    // Pega o valor salvo no localStorage ou usa o padrão
    const [fontSize, setFontSize] = useState(() => {
        return parseInt(localStorage.getItem("fontSize")) || defaultFontSize;
    });

    // Atualiza o tamanho da fonte globalmente sempre que `fontSize` mudar
    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}px`;
        localStorage.setItem("fontSize", fontSize); // Salvar a escolha do usuário
    }, [fontSize]);

    // Funções para alterar a fonte
    const decreaseFontSize = () => setFontSize((prev) => Math.max(minFontSize, prev - 2));
    const increaseFontSize = () => setFontSize((prev) => Math.min(maxFontSize, prev + 2));
    const resetFontSize = () => setFontSize(defaultFontSize);

    return (
        <FontSizeContext.Provider value={{ fontSize, decreaseFontSize, increaseFontSize, resetFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};