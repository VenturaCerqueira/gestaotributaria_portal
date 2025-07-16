import useApi from "./api";

// eslint-disable-next-line import/no-anonymous-default-export
const useContribuinteService = () => {
    const { api } = useApi();
    return {
        emissaoCnd: async (data) => {
            return await api.post('/portal-contribuinte/contribuintes/emissao-cnd', data).then((resp) => resp.data);
        },
        validacaoCnd: async (data) => {
            return await api.post('/portal-contribuinte/contribuintes/validacao-cnd', data).then((resp) => resp.data);
        },
        validacaoCertidao: async (data) => {
            return await api.post('/portal-contribuinte/contribuintes/validacao-certidao', data).then((resp) => resp.data);
        },
        declaracaoNaoInscrito: async (data) => {
            return await api.post('/portal-contribuinte/contribuintes/declaracao-nao-inscrito', data).then((resp) => resp.data);
        },
        validacaoDeclaracaoNaoInscrito: async (data) => {
            return await api.post('/portal-contribuinte/contribuintes/validacao-declaracao-nao-inscrito', data).then((resp) => resp.data);
        },
    }
}
export default useContribuinteService;
