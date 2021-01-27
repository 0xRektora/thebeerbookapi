import { PrismaClient } from '@prisma/client';
import { PivoHub } from '../External/PivoHub';

export abstract class BaseControllerTemplate {
    public PrismaService: PrismaClient;
    public PivoHubService: PivoHub;
    constructor() {
        this.PrismaService = new PrismaClient();
        this.PivoHubService = new PivoHub();
    }

    /**
     * Uses Prisma transactions to create many records in one DB call
     *
     * @param data The data to create
     * @param mapFn The map fn for atomic creation
     */
    public async createMany<T, E>(data: T[], mapFn: (e: T) => E): Promise<T[]> {
        const transactions = data.map(mapFn);
        return ((await this.PrismaService.$transaction(transactions)) as unknown) as T[];
    }
}
