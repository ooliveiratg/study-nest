import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvSchema } from "src/env";
import { z } from "zod";



const tokenPayload = z.object({
    sub: z.string().uuid(),
})

export type TokenPayload = z.infer<typeof tokenPayload>;
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

    async validate(payload: TokenPayload) {
        return{
          Token: tokenPayload.parse(payload)  //validação do payload usando zod
        }
        
    }

}