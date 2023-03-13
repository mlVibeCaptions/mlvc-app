import axios, {AxiosInstance, AxiosResponse} from "axios";

export default class PredictionService {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: 'http://127.0.0.1:5000/api',
            headers: {'Content-Type': 'multipart/form-data'}
        })
    }

    public async predict(audioStream: any): Promise<AxiosResponse> {
        try {
            const response = await this.api.post('/predict', audioStream);
            return response;

        } catch (error) {
            return Promise.reject(error);
        }

    }
}
