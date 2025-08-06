import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { EnvSchema } from "src/env";
import { AuthenticateController } from "src/controller/authenticate-controller";


@Module({
    imports:[
        PassportModule,
        JwtModule.registerAsync({
            //configService serve para pegar as variaveis de ambiente
            inject:[ConfigService],
            global: true, //tornar o JwtModule global
            //aqui tipamos o configService com o EnvSchema
            useFactory(config: ConfigService<EnvSchema, true>) {
                //infer:true faz com que o typescript infira o tipo da variavel (transformando string em number)
                const secret = config.get('JWT_SECRET', { infer: true });
                return {
                    secret,
                    signOptions:{
                        expiresIn: '1d' 
                    }
                };
            },
        }),
        
    ],
    controllers: [AuthenticateController],
})

export class AuthModule {}  