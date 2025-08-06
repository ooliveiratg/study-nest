import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvSchema } from "src/env";
import { z } from "zod";



const tokenSchema = z.object({
    sub: z.string().uuid(),
})

type TokenSchema = z.infer<typeof tokenSchema>;
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(config: ConfigService<EnvSchema,true>){
        const jwtSecret = config.get('JWT_SECRET', { infer: true });
        super({     
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
            algorithms:['HS256']
        })
    }

    async validate(payload: TokenSchema) {
        return{
          Token: tokenSchema.parse(payload)  //validação do payload usando zod
        }
        
    }

}