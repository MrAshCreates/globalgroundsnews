// backend/src/controllers/chatController.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import Conversation from '../models/Conversation';
import Message from '../models/Message';
import User from '../models/User'; // Import User model to check participant existence
import { Types } from 'mongoose';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

// Get all conversations for the authenticated user
export const getConversations: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const userId = req.user.id;

    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate('participants', 'username')
      .sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

// Get messages for a specific conversation
export const getMessages: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const userId = req.user.id;
    const { conversationId } = req.params;

    // Verify that the user is a participant in the conversation
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      res.status(404).json({ message: 'Conversation not found' });
      return;
    }

    const isParticipant = conversation.participants.some(
      (participantId) => participantId.toString() === userId
    );

    if (!isParticipant) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    const messages = await Message.find({ conversation: conversationId })
      .populate('sender', 'username')
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// Create a new conversation
export const createConversation: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const userId = req.user.id;
    const { participantId } = req.body;

    // Ensure participantId is provided
    if (!participantId) {
      res.status(400).json({ message: 'Participant ID is required' });
      return;
    }

    // Check if the participant exists
    const participantExists = await User.findById(participantId);
    if (!participantExists) {
      res.status(404).json({ message: 'Participant not found' });
      return;
    }

    // Check if the conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, participantId] },
    });

    if (conversation) {
      res.status(200).json(conversation);
      return;
    }

    // Create a new conversation
    conversation = new Conversation({
      participants: [userId, participantId],
    });

    await conversation.save();

    res.status(201).json(conversation);
  } catch (error) {
    next(error);
  }
};

// Send a message in a conversation
export const sendMessage: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const userId = req.user.id;
    const { conversationId } = req.params;
    const { content } = req.body;

    // Validate input
    if (!content) {
      res.status(400).json({ message: 'Message content is required' });
      return;
    }

    // Verify that the user is a participant in the conversation
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      res.status(404).json({ message: 'Conversation not found' });
      return;
    }

    const isParticipant = conversation.participants.some(
      (participantId) => participantId.toString() === userId
    );

    if (!isParticipant) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    const message = new Message({
      conversation: conversationId,
      sender: userId,
      content,
    });

    await message.save();

    // Update the conversation's updatedAt field
    conversation.updatedAt = new Date();
    await conversation.save();

    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};