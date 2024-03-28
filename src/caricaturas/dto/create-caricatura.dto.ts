import { IsInt, IsPositive, IsString, Min, MinLength, min } from "class-validator";

export class CreateCaricaturaDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    no:number;

    @IsString()
    @MinLength(1)
    name:string;
}
