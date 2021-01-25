import { Beer } from '@prisma/client';

export default class BeerEntity implements Beer {
    id!: string;
    companyId!: string;
    imageUrl!: string;
    percentage!: number;
    description!: string;
}
