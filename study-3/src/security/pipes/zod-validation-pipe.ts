
import{
    PipeTransform,
    ArgumentMetadata,
    BadRequestException
} from "@nestjs/common";
import { stat } from "fs";
import { ZodError, ZodSchema } from "zod";
import { fromZodError } from "zod-validation-error";

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}

    transform(value: unknown, ) {
        try {
            this.schema.parse(value);
        } catch (e) {
            if(e instanceof ZodError){
                throw new BadRequestException({
                    errors: fromZodError(e),
                    statusCode: 400,
                    message: "Validation error"
                });
            }
            throw new BadRequestException('Validation failed');
        }
        return value;
    }
}
