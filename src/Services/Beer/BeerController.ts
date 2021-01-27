import { Beer } from '@prisma/client';
import { IsDefined, IsPositive } from 'class-validator';
import { Get, JsonController, Param, QueryParams } from 'routing-controllers';
import { IProductsResults } from '../../External/IPivoHub';
import { BaseControllerTemplate } from '../BaseControllerTemplate';

const PATH = '/beers';

class GetAllBeersQueryParams {
    @IsDefined()
    limit!: number;
    @IsDefined()
    skip!: number;
}

@JsonController(PATH)
export class BeerController extends BaseControllerTemplate {
    protected beerRoute = '/products?tags[]=the-festival-2019';

    @Get()
    async getAll(@QueryParams() query: GetAllBeersQueryParams): Promise<Beer[]> {
        const data = await this.PivoHubService.getProducts<Beer[]>(BeerController.mapProductsAPIToBeerEntity);
        const res = await this.hydrateDbBeerValues(data);

        const resApplyParams = res.slice(query.skip).slice(0, query.limit);
        return resApplyParams;
    }

    @Get('/:id')
    async get(@Param('id') id: string): Promise<Beer | null> {
        const beer = await this.PrismaService.beer.findUnique({
            where: {
                id: id,
            },
        });
        return beer;
    }

    /**
     * Create records of the passed data if needed
     *
     * @param data The data to hydrate the DB with
     */
    private async hydrateDbBeerValues(data: Beer[]): Promise<Beer[]> {
        const beerCount = await this.PrismaService.beer.count();
        if (!beerCount) {
            const createManyMapFn = (e: Beer) => {
                return this.PrismaService.beer.create({ data: e });
            };
            const transactions = await this.createMany(data, createManyMapFn);
            return transactions;
        }
        return data;
    }

    /**
     * Map the raw data to a DB friendly one
     *
     * @param data The PivoHub API data
     */
    private static mapProductsAPIToBeerEntity(data: IProductsResults): Beer[] {
        return data.data.map((e) => ({
            companyId: e.companyId,
            id: e.id,
            description: e.description['en-CA'],
            imageUrl: e.imageUrl,
            percentage: e.details.percentage,
        }));
    }
}
