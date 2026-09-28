import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { CreateInquiryDto, UpdateInquiryDto } from './dto/inquiry.dto';
import { Auth } from 'src/common/decorator/index';
import { RoleEnum, InquiryStatus } from 'src/common/enums/index';
import { RateLimitGuard } from 'src/common/guard/rate-limit.guard';

@UsePipes(
  new ValidationPipe({
    stopAtFirstError: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
@Controller('inquiries')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @UseGuards(RateLimitGuard)
  @Post()
  async create(@Body() createInquiryDto: CreateInquiryDto) {
    const inquiry = await this.inquiryService.createInquiry(createInquiryDto);
    return {
      message: 'Inquiry submitted successfully',
      data: inquiry,
    };
  }

  @Auth([RoleEnum.ADMIN])
  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('size') size?: number,
    @Query('status') status?: InquiryStatus,
  ) {
    return await this.inquiryService.findAllInquiries({ page, size, status });
  }

  @Auth([RoleEnum.ADMIN])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const inquiry = await this.inquiryService.findInquiryById(id);
    return {
      data: inquiry,
    };
  }

  @Auth([RoleEnum.ADMIN])
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInquiryDto: UpdateInquiryDto,
  ) {
    const updatedInquiry = await this.inquiryService.updateInquiry(
      id,
      updateInquiryDto,
    );
    return {
      message: 'Inquiry updated successfully',
      data: updatedInquiry,
    };
  }

  @Auth([RoleEnum.ADMIN])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.inquiryService.deleteInquiry(id);
    return {
      message: 'Inquiry deleted successfully',
    };
  }
}
