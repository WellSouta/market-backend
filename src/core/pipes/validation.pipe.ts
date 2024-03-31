import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { validate } from 'class-validator'

// eslint-disable-next-line @typescript-eslint/ban-types
const PRIMITIVE_TYPES: Function[] = [String, Boolean, Number, Array, Object]

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  public async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || this.isPrimitive(metatype)) {
      return value
    }

    const errors = await validate(value, {
      forbidUnknownValues: true,
      stopAtFirstError: true
    })

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed', {
        description: errors[0].toString(),
        cause: errors[0]
      })
    }

    return value
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private isPrimitive(metatype: Function): boolean {
    return PRIMITIVE_TYPES.includes(metatype)
  }
}
