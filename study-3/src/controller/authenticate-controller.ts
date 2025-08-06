import { Body, Controller, HttpCode, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { json, z } from 'zod';
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { compare } from "bcrypt";

const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100)
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/sessions')
export class AuthenticateController {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService
    ) {}
    
    @Post()
    @HttpCode(200)
    async handle(@Body() body: AuthenticateBodySchema) {
        const {email, password} = body;
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user ){
            throw new UnauthorizedException("User credentials are invalid");
        }

        if (!user.password) {
            throw new UnauthorizedException("User credentials are invalid");
        }

        const isPasswordValid = await compare(password, user.password)

        
        if(!isPasswordValid) {
            throw new UnauthorizedException("User credentials are invalid");
        }
        
        const token = this.jwt.sign({
            sub: user.id,
        });
        
        return {
            access_token: token
        }
    }
}