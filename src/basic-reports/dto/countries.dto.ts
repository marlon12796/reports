import { IsEnum, IsOptional } from 'class-validator';
import { ContinentEnum } from '../enums/countries.enum';

export class ContinentsQueryDto {
	@IsOptional()
	@IsEnum(ContinentEnum, {
		message: `El continente debe ser uno de los valores permitidos: ${Object.values(ContinentEnum).join(', ')}`,
	})
	continent?: ContinentEnum;
}
