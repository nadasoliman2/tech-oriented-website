import { InitiativeScope, InquiryType, InquiryStatus } from '../enums/index';

export interface IInquiry {
  fullName: string;
  company: string;
  workEmail: string;
  phone: string;
  initiativeScope: InitiativeScope[];
  technicalSpecifications: string;

  type?: InquiryType;
  status?: InquiryStatus;
  contactedAt?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
