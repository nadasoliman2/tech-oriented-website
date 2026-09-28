import { DatabaseRepository } from './database.repository.js';
import { Model } from 'mongoose';
import { Inquiry, InquiryDocument } from '../model/index';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InquiryRepository extends DatabaseRepository<InquiryDocument> {
  constructor(
    @InjectModel(Inquiry.name) protected readonly model: Model<InquiryDocument>,
  ) {
    super(model);
  }
}
