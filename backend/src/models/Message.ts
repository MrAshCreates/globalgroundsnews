// backend/src/models/Message.ts
import { Schema, model, Types } from 'mongoose';

interface IMessage {
  conversation: Types.ObjectId;
  sender: Types.ObjectId;
  content: string;
  createdAt?: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    conversation: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IMessage>('Message', messageSchema);