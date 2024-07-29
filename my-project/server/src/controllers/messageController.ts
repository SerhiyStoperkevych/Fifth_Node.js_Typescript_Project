import { Request, Response } from 'express';
import { loadMessages, saveMessages } from '../utils/fileUtils';

export const getMessages = (req: Request, res: Response) => {
  const messages = loadMessages();
  res.json(messages);
};

export const postMessage = (req: Request, res: Response) => {
  const newMessage = req.body.message as string;
  if (!newMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const messages = loadMessages();
  messages.push(newMessage);
  saveMessages(messages);

  res.status(201).json({ message: 'Message saved' });
};
