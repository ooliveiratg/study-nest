import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()

export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
    public client = PrismaClient;
    constructor(){
        super();
    }

    //quando o modulo for iniciado, conecta ao banco de dados
    onModuleInit() {
        return this.$connect();
    }

    //quando o modulo for destruido, desconecta do banco de dados
    onModuleDestroy() {
        return this.$disconnect();
    }

}