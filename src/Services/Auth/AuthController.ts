import { Controller, Get } from 'routing-controllers';

@Controller()
export class AuthController {
    @Get('/login')
    post(): unknown {
        return 'Saving user...';
    }
}
