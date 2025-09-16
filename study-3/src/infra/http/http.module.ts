import { Module } from "@nestjs/common";
import { AuthenticateController } from "./controller/authenticate.controller";
import { CreateAccoutController } from "./controller/create-account.controller";
import { CreateQuestionController } from "./controller/create-question.controller";
import { FetchRecentQuestionsController } from "./controller/fetch-recent-questions.controller";
import { PrismaService } from "../db/prisma/prisma.service";
import { DatabaseModule } from "@faker-js/faker";

@Module({
    imports: [
        DatabaseModule
    ],
     controllers: [
        CreateAccoutController, 
        AuthenticateController,
        FetchRecentQuestionsController,
        CreateQuestionController
    ],

    providers:[]
})

export class HttpModule{}