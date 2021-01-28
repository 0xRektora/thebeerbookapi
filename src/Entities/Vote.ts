import { Vote } from '@prisma/client';

export default class VoteEntity implements Vote {
    beerId!: string;
    uuid!: string;
}
