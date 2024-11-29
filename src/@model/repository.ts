import mongoose, { Schema } from 'mongoose';
import { ISlack } from './interface/messenger';

interface IMeta {
  slack?: ISlack;
}

interface IRepository extends Document {
  name: string;
  meta: IMeta;
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
    // branch - array
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
