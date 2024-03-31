import { IntersectionType } from '@nestjs/swagger'
import { PaginatedRequestDto } from '../../common/dtos/paginated-request.dto'
import { SortedRequestDto } from '../../common/dtos/sorting-request.dto'

export class ProductGetListRequestDto extends IntersectionType(
  PaginatedRequestDto,
  SortedRequestDto
) {}
