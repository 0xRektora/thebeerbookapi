import { Beer, Prisma, Vote } from '@prisma/client';
import { IsDefined } from 'class-validator';
import { Body, BodyParam, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers';
import { IProductsResults } from '../../External/IPivoHub';
import { BaseControllerTemplate } from '../BaseControllerTemplate';
import { BeerController } from '../Beer/BeerController';

const PATH = '/vote';

class GetAllBeersQueryParams {
    @IsDefined()
    limit!: number;
    @IsDefined()
    skip!: number;
}

class PostVoteBodyParams {
    @IsDefined()
    uuid!: string;
    @IsDefined()
    beerId!: string;
}

interface IBeerGetAllVote {
    beerId: string;
    count: { beerId: number | null };
}

@JsonController(PATH)
export class VoteController extends BaseControllerTemplate {
    @Get()
    async getAll(@QueryParams() query: GetAllBeersQueryParams): Promise<IBeerGetAllVote[]> {
        const votes = await this.PrismaService.vote.groupBy({
            by: ['beerId'],
            count: {
                beerId: true,
            },
            orderBy: {
                beerId: 'desc',
            },
        });

        const resApplyParams = this.applyLimitAndSkip(votes, query.limit, query.skip);
        return resApplyParams;
    }

    @Get('/:id')
    async get(@Param('id') id: string): Promise<IBeerGetAllVote | undefined> {
        const vote = await this.getAll({ limit: 0, skip: 0 });

        return vote.find((e) => e.beerId === id);
    }

    @Post()
    async vote(@Body() bodyParams: PostVoteBodyParams): Promise<Vote> {
        return this.PrismaService.vote.create({
            data: {
                uuid: bodyParams.uuid,
                beerId: bodyParams.beerId,
            },
        });
    }

    @Delete()
    async unVote(@Body() bodyParams: PostVoteBodyParams): Promise<Vote> {
        return this.PrismaService.vote.delete({
            where: {
                beerId_uuid: {
                    beerId: bodyParams.beerId,
                    uuid: bodyParams.uuid,
                },
            },
        });
    }
}
