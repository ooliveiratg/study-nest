import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/security/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { ZodValidationPipe } from 'src/security/pipes/zod-validation-pipe';
import z from 'zod';

const pageQueryParamSchema = z.string().optional().default('1').transform(Number).pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@Query('page',queryValidationPipe) page:PageQueryParamSchema) {
    const questions = await this.prisma.question.findMany({
        take:1,
        skip:(page-1)*1
        orderBy: {
            createdAt: 'desc'
        }
    })
    return {questions}
  }
}
