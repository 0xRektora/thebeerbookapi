import axios, { AxiosInstance } from 'axios';
import { logger } from '../app';
import { IProductsResults } from './IPivoHub';

export class PivoHub {
    static productsRoute = '/products?tags[]=the-festival-2019';
    public axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: 'https://api.pivohub.com/public',
            headers: {
                Accept: 'application/json, text/plain, */*',
            },
        });
    }

    /**
     * Retrieve the '/products' API
     */
    private async queryProductsApi(): Promise<IProductsResults> {
        try {
            const data = (await this.axios.get<IProductsResults>(PivoHub.productsRoute)).data;
            return data;
        } catch (err) {
            logger.error(err);
            const emptyResults: IProductsResults = { data: [], meta: { count: 0 } };
            return emptyResults;
        }
    }

    /**
     * Get the data from PivoHub API, an optional map arg is given
     *
     * @param map A map fn, pass the data in the parameter and return the desired type
     */
    async getProducts<T = never>(map: (data: IProductsResults) => T): Promise<T> {
        const data = await this.queryProductsApi();
        return map(data);
    }
}
