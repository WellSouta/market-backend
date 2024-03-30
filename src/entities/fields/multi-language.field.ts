import { ApiProperty } from '@nestjs/swagger'
import { Locale } from '../../common/constants/localization'

export class MultiLanguageField {
  @ApiProperty({
    type: 'string',
    description: 'Russian'
  })
  public [Locale.RU]!: string

  @ApiProperty({
    type: 'string',
    description: 'English'
  })
  public [Locale.EN]!: string
}
