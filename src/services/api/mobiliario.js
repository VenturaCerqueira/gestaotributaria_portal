import useApi from "./api";

// eslint-disable-next-line import/no-anonymous-default-export
const useMobiliarioService = () => {
    const { api } = useApi();
    return {
        segundaVia: async (data) => {
            return await api.post('/portal-contribuinte/mobiliario/segunda-via', data).then((resp) => resp.data);
        },
    }
}
export default useMobiliarioService;
