import useApi from "./api";

// eslint-disable-next-line import/no-anonymous-default-export
const useImobiliarioService = () => {
    const { api } = useApi();
    return {
        segundaVia: async (data) => {
            return await api.post('/portal-contribuinte/imobiliario/segunda-via', data).then((resp) => resp.data);
        },
    }
}
export default useImobiliarioService;
