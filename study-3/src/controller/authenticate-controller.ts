import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { json, z } from 'zod';
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { JwtService } from "@nestjs/jwt";

const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100)
});

@Controller('/sessions')
export class AuthenticateController {
    constructor(private jwt: JwtService) {}
    
    @Post()
    @HttpCode(200)
    async handle() {
        const token = this.jwt.sign({
            sub: 'user-id',
        });
        
        return {
            token
        }
    }
}