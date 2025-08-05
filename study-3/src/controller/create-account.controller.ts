import { Body, ConflictException, Controller, HttpCode, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { hash } from 'bcrypt';

@Controller('/accounts')
export class CreateAccoutController {
    constructor(private prisma: PrismaService) {}
    
    @Post()
    @HttpCode(201)
    async handle(@Body() body:any) {
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
        }
    }