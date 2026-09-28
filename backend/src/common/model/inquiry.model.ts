import { MongooseModule, SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { InitiativeScope, InquiryType, InquiryStatus } from '../enums/index';
import { IInquiry } from '../interfaces/index';
@Schema({ timestamps: true })
export class Inquiry implements IInquiry {
  @Prop({
    required: true,
    trim: true,
  })
  fullName: string;

  @Prop({
    required: true,
    trim: true,
  })
  company: string;

  @Prop({
    required: true,
    lowercase: true,
    trim: true,
  })
  workEmail: string;

  @Prop({
    required: true,
    trim: true,
  })
  phone: string;

  @Prop({
    type: [String],
    enum: Object.values(InitiativeScope),
    required: true,
  })
  initiativeScope: InitiativeScope[];

  @Prop({
    required: true,
    maxlength: 600,
  })
  technicalSpecifications: string;

  @Prop({
    type: String,
    enum: InquiryType,
    default: InquiryType.CONSULTATION,
  })
  type: InquiryType;

  @Prop({
    type: String,
    enum: InquiryStatus,
    default: InquiryStatus.NEW,
  })
  status: InquiryStatus;

  @Prop()
  contactedAt?: Date;

  @Prop()
  notes?: string;
}

export const inquirySchema = SchemaFactory.createForClass(Inquiry);

export const InquiryModel = MongooseModule.forFeature([
  {
    name: Inquiry.name,
    schema: inquirySchema,
  },
]);

export type InquiryDocument = HydratedDocument<Inquiry>;
