import mongoose from 'mongoose';

const repositorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  chat_id: {
    type: String,
  },
  // 다른 필요한 필드를 추가할 수 있습니다.
});

const Repository = mongoose.model('Repository', repositorySchema);

export default Repository;
