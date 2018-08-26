import { Module, HttpModule } from '@nestjs/common';
import { BuildbotService } from './buildbot.service';
import { BuildbotController } from './buildbot.controller';

// TODO: change this to .env
import config from './buildbot.config.json';

@Module({
    imports: [
        HttpModule.register({
        withCredentials : true,
        baseURL: config.url,
        auth: {
            username: config.username,
            password: config.password,
        },
        // without this axios will skip 302 redirect for authentication
        maxRedirects: 0,
    })],
    controllers: [BuildbotController],
    providers: [BuildbotService],
})
export class BuildbotModule {}
