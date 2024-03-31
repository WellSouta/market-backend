import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

// eslint-disable-next-line @typescript-eslint/ban-types
const PRIMITIVE_TYPES: Function[] = [String, Boolean, Number, Array, Object]

@Injectable()
export class PlainToInstancePipe implements PipeTransform<any> {
  public transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || this.isPrimitive(metatype)) {
      return value
    }

    return plainToInstance(metatype, value, {
      enableImplicitConversion: true,
      exposeDefaultValues: true,
      ignoreDecorators: true
    })
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private isPrimitive(type: Function) {
    return PRIMITIVE_TYPES.includes(type)
  }
}
