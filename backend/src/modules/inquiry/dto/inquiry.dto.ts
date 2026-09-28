import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  IsEnum,
  MaxLength,
  IsBoolean,
  IsOptional,
  ArrayNotEmpty,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  InitiativeScope,
  InquiryType,
  InquiryStatus,
} from '../../../common/enums/index';

export class CreateInquiryDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  company!: string;

  @IsEmail({}, { message: 'Please enter a valid work email' })
  @IsNotEmpty()
  workEmail!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(InitiativeScope, { each: true, message: 'Invalid initiative scope' })
  initiativeScope!: InitiativeScope[];

  @IsString()
  @IsNotEmpty()
  @MaxLength(600, {
    message: 'Technical specifications must not exceed 600 characters',
  })
  technicalSpecifications!: string;

  @IsEnum(InquiryType, { message: 'Invalid inquiry type' })
  @IsOptional()
  type?: InquiryType;
}

export class UpdateInquiryDto {
  @IsEnum(InquiryStatus, { message: 'Invalid inquiry status' })
  @IsOptional()
  status?: InquiryStatus;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  contactedAt?: Date;

  @IsString()
  @IsOptional()
  notes?: string;
}
