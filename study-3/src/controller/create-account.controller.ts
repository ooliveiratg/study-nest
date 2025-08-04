import { Controller, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('/accounts')
export class CreateAccoutController {
    constructor(private prisma: PrismaService) {}
    
    @Post()
    async handle() {
            const name = 'Lucas';
            const email = 'lucas@example.com';
            const password =  '123456';

            await this.prisma.user.create({
                data: {
                    name,
                    email,
                    password
                }
            });
        }
    }