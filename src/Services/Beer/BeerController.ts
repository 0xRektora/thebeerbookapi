import { Beer } from '@prisma/client';
import { IsPositive } from 'class-validator';
import { Get, JsonController, Param, QueryParams } from 'routing-controllers';
import { BaseControllerTemplate } from '../BaseControllerTemplate';

const PATH = '/beers';

class GetAllBeersQueryParams {
    @IsPositive()
    limit!: number;

    @IsPositive()
    skip!: number;
}

@JsonController(PATH)
export class BeerController extends BaseControllerTemplate {
    protected beerRoute = '/products?tags[]=the-festival-2019';

    @Get()
    getAll(@QueryParams() query: GetAllBeersQueryParams): Beer[] {
        this.Axios.get(this.beerRoute)
            .then((e) => {
                console.log(e.data);
            })
            .catch((e) => {
                console.log(e);
            });
        return [
            {
                companyId: 'test',
                description: 'test',
                id: 'test',
                imageUrl: 'test',
                percentage: 15,
            },
        ];
    }

    @Get('/:id')
    get(@Param('id') id: string): Beer {
        return {
            companyId: 'test',
            description: 'test',
            id: 'test',
            imageUrl: 'test',
            percentage: 15,
        };
    }
}
