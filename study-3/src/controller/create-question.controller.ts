import { Controller, Post } from "@nestjs/common";




@Controller('/questions')
export class CreateQuestionController {
    constructor(
    ) {}
    
    @Post()
    async handle() {
    }
}