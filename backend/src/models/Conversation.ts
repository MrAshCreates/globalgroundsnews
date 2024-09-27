// backend/src/models/Conversation.ts
import { Schema, model, Types } from 'mongoose';

interface IConversation {
  participants: Types.ObjectId[];
  updatedAt?: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  },
  { timestamps: true }
);

export default model<IConversation>('Conversation', conversationSchema);