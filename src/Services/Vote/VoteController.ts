import { Beer, Vote } from '@prisma/client';
import { IsDefined } from 'class-validator';
import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from 'routing-controllers';
import { BaseControllerTemplate } from '../BaseControllerTemplate';

const PATH = '/vote';

class GetAllBeersQueryParams {
    @IsDefined()
    limit!: number;
    @IsDefined()
    skip!: number;
    beerId?: string;
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
    beer: Beer;
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

        const beers = await this.PrismaService.beer.findMany({
            where: {
                id: { in: votes.map((e) => e.beerId) },
            },
        });

        const leaderBoard = votes.map<IBeerGetAllVote>((e) => ({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            beer: beers.find((v) => v.id === e.beerId)!,
            beerId: e.beerId,
            count: e.count,
        }));

        return this.filterById(this.applyLimitAndSkip(leaderBoard, query.limit, query.skip), query.beerId);
    }

    @Get('/:id')
    async get(@Param('id') id: string): Promise<IBeerGetAllVote | undefined> {
        const vote = await this.getAll({ limit: 0, skip: 0, beerId: id });

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

    /**
     * Return an array with only 1 element if the id is defined and found,
     * or the array if no id has been given
     *
     * @param data The beer votes
     * @param id The id to look for
     */
    private filterById(data: IBeerGetAllVote[], id?: string): IBeerGetAllVote[] {
        if (!id) return data;

        return data.filter((e) => e.beerId === id);
    }
}
