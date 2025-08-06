import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { hash } from 'bcrypt';
import { z }    from 'zod';
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";

const createAccountSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.email(),
    password: z.string().min(6).max(100)
});

type CreateAccountBody = z.infer<typeof createAccountSchema>;

@Controller('/accounts')
export class CreateAccoutController {
    constructor(private prisma: PrismaService) {}
    
    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createAccountSchema))
    async handle(@Body() body: CreateAccountBody) {
        //validação das requisições usando zod
            const { name, email, password } = body;

        const userWithSameEmail = await this.prisma.user.findUnique({
            where: {
                email
            }
        });

        const hashedPassword = await hash(password, 8);

        if (userWithSameEmail) {
            throw new ConflictException('User with this email already exists');
        }

            await this.prisma.user.create({
                data: {
                    name,
                    email,
                    password : hashedPassword
                }
            });
            return { message: 'Account created successfully'};
        }
    }