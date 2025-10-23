import { Module } from "@nestjs/common";
import { AuthenticateController } from "./controller/authenticate.controller";
import { CreateAccoutController } from "./controller/create-account.controller";
import { CreateQuestionController } from "./controller/create-question.controller";
import { FetchRecentQuestionsController } from "./controller/fetch-recent-questions.controller";
import { PrismaService } from "../db/prisma/prisma.service";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";
import { DatabaseModule } from "../db/db.module";

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

    providers:[CreateQuestionUseCase]
})

export class HttpModule{}