import { Beer } from '@prisma/client';
import { Get, JsonController, Param } from 'routing-controllers';

const PATH = '/beers';

@JsonController(PATH)
export class BeerController {
    @Get()
    getAll(): Beer[] {
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
