import { Injectable, NotFoundException } from '@nestjs/common';
import { InquiryRepository } from '../../common/repository/index';
import { CreateInquiryDto, UpdateInquiryDto } from './dto/inquiry.dto';
import { InquiryDocument } from '../../common/model/index';
import { InquiryStatus } from '../../common/enums/index';

@Injectable()
export class InquiryService {
  constructor(private readonly inquiryRepository: InquiryRepository) {}

  async createInquiry(
    createInquiryDto: CreateInquiryDto,
  ): Promise<InquiryDocument> {
    return await this.inquiryRepository.createOne({
      data: createInquiryDto,
    });
  }

  async findAllInquiries(query: {
    page?: number;
    size?: number;
    status?: InquiryStatus;
  }) {
    const { page = 1, size = 10, status } = query;
    const filter: Record<string, any> = {};

    if (status) {
      filter.status = status;
    }

    return await this.inquiryRepository.paginate({
      filter,
      page,
      size,
      options: { sort: { createdAt: -1 } },
    });
  }

  async findInquiryById(id: string): Promise<InquiryDocument> {
    const inquiry = await this.inquiryRepository.findbyid({ _id: id });
    if (!inquiry) {
      throw new NotFoundException(`Inquiry with ID ${id} not found`);
    }
    return inquiry as InquiryDocument;
  }

  async updateInquiry(
    id: string,
    updateInquiryDto: UpdateInquiryDto,
  ): Promise<InquiryDocument> {
    await this.findInquiryById(id);

    const updateData: Record<string, any> = { ...updateInquiryDto };
    if (
      updateInquiryDto.status === InquiryStatus.CONTACTED &&
      !updateInquiryDto.contactedAt
    ) {
      updateData.contactedAt = new Date();
    }

    const updatedInquiry = await this.inquiryRepository.findByIdAndUpdate({
      _id: id,
      update: updateData,
      options: { new: true },
    });

    if (!updatedInquiry) {
      throw new NotFoundException(`Failed to update inquiry with ID ${id}`);
    }

    return updatedInquiry;
  }

  async deleteInquiry(id: string): Promise<void> {
    await this.findInquiryById(id);
    await this.inquiryRepository.findByIdAndDelete({ _id: id });
  }
}
