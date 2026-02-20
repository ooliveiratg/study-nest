/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!user) throw new BadRequestException('Usuário não encontrado');

      const updateUser = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: updateUserDto.name ? updateUserDto.name : user.name,
          passwordHash: updateUserDto.password
            ? updateUserDto.password
            : user.passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return updateUser;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Falha ao atualizar usuário usuário');
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!user) throw new BadRequestException('Usuário não encontrado');

      await this.prisma.user.delete({
        where: {
          id: user.id,
        },
      });
      return { message: 'usuário deletado com sucesso' };
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Falha ao deletar usuário usuário usuário');
    }
  }
}
