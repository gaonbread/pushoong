import mongoose, { Schema } from 'mongoose';
import { ISlack, ITelegram } from './interface/messenger';

interface IMeta {
  slack?: ISlack;
  telegram?: ITelegram;
}

export interface IRepository extends Document {
  name: string;
  meta: IMeta;
  branch: string[];
}

const RepositorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    meta: {
      slack: {
        token: { type: String },
        channel_id: { type: String },
      },
    },
    branch: { type: [String] },
  },
  {
    collection: 'repositories',
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Repository = mongoose.model<IRepository>('Repository', RepositorySchema);

export default Repository;
