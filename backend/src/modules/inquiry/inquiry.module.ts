import { Module } from '@nestjs/common';
import { InquiryController } from './inquiry.controller';
import { InquiryService } from './inquiry.service';
import { InquiryModel } from '../../common/model/index';
import { InquiryRepository } from '../../common/repository/index';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [InquiryModel, AuthenticationModule],
  controllers: [InquiryController],
  providers: [InquiryService, InquiryRepository],
  exports: [InquiryService, InquiryRepository],
})
export class InquiryModule {}
