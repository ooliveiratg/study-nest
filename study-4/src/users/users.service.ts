/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (user) return user;

    throw new NotFoundException('Usuário não encontrado');
  }

  async create(createUserDto: CreateUserDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          passwordHash: createUserDto.password,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return user;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Falha ao cadastrar usuário');
    }
  }
}
