import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/security/auth/jwt-auth.guard";
import { Request } from 'express'
import { CurrentUser } from "src/security/auth/current-user-decoretor";
import type { TokenPayload } from "src/security/auth/jwt.strategy";



@Controller('/questions')
@UseGuards(JwtAuthGuard)

export class CreateQuestionController {
    constructor(
    ) {}
    
    @Post()
    async handle(@CurrentUser() user: TokenPayload) {
    }
} 