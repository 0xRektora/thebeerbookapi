import { PrismaClient } from '@prisma/client';
import axios, { AxiosInstance } from 'axios';

export abstract class BaseControllerTemplate {
    public PrismaService: PrismaClient;
    public Axios: AxiosInstance;
    constructor() {
        this.PrismaService = new PrismaClient();
        this.Axios = axios.create({
            baseURL: 'https://api.pivohub.com/public',
            headers: {
                Accept: 'application/json, text/plain, */*',
            },
        });
    }
}
