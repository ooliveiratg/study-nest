import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "@/infra/security/auth/jwt-auth.guard";
import { Request } from 'express'
import { CurrentUser } from "@/infra/security/auth/current-user-decoretor";
import type { TokenPayload } from "@/infra/security/auth/jwt.strategy";
import z from "zod";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { PrismaService } from "@/infra/db/prisma/prisma.service";

const createQuestionBodySchema = z.object({
    title: z.string().min(2).max(100),
    content: z.string().min(2).max(1000)
});

type CreateQuestionBody = z.infer<typeof createQuestionBodySchema>;

@Controller('/questions')
@UseGuards(JwtAuthGuard)

export class CreateQuestionController {
    constructor(
        private prisma: PrismaService
    ) {}
    
    @Post()
    async handle(
        @CurrentUser() user: TokenPayload,
        @Body(new ZodValidationPipe(createQuestionBodySchema)) body: CreateQuestionBody
) {
    const { title, content } = body
    const userId = user.sub

    await this.prisma.question.create({
        data: {
            authorId: userId,
            title,
            content,
            slug: 'asd'
        }
    })

    }
} 