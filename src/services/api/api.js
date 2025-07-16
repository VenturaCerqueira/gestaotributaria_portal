import axios from 'axios';
import { entidadeUrl } from '../../utils/global';
import * as toast from '../../components/toast';

const BASE_URL = import.meta.env.VITE_API_URL;

const useApi = () => {

    const api = axios.create({
        baseURL: BASE_URL,
    });

    api.defaults.headers.post['Content-Type'] = 'application/json';
    api.defaults.headers.post['Content-Type'] = 'multipart/form-data';

    api.interceptors.request.use((config) => {
        config.params = { ...config.params };
        config.headers = { ...config.headers, 'entidade': entidadeUrl };
        return config;
    });

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const { response } = error;

            if (response && response.config.responseType === 'blob') {
                try {

                    const reader = new FileReader();
                    const text = await new Promise((resolve, reject) => {
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = () => reject(reader.error);
                        reader.readAsText(response.data);
                    });
                    const errorData = JSON.parse(text);


                    toast.notify('error', errorData.message || 'Erro ao processar a solicitação.');
                } catch (e) {

                    toast.notify('error', 'Erro ao processar o arquivo.');
                }
            } else {

                switch (response?.status) {
                    case 401:
                        toast.notify('error', 'Não autorizado');
                        window.location.href = `${window.location.origin}${import.meta.env.VITE_PUBLIC_URL}`;
                        break;
                    case 403:
                        toast.notify('error', 'Não autorizado');
                        window.location.href = `${window.location.origin}${import.meta.env.VITE_PUBLIC_URL}`;
                        break;
                    case 422:
                        Object.keys(response.data.errors).forEach((item) => {
                            toast.notify('error', response.data.errors[item][0]);
                        });
                        break;
                    case 500:
                        toast.notify('error', response.data.error ?? response.data.message ?? 'Erro interno do servidor');
                        console.log(response);
                        break;
                    default:
                        toast.notify('error', 'Ocorreu um erro durante o processamento. Por favor, tente novamente.');
                }
            }

            return Promise.reject(error);
        }
    );

    return { api };
};

export default useApi;
