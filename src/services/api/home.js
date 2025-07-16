import useApi from './api';

// eslint-disable-next-line import/no-anonymous-default-export
const useHomeService = () => {
    const { api } = useApi();
    return {
        home: async () => {
            return await api.get('/portal-contribuinte/home').then((resp) => resp.data);
        },
    }
}
export default useHomeService;
