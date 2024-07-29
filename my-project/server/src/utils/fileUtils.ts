import fs from 'fs';
import { User } from '../models/user';
import { messagesFilePath, usersFilePath } from './paths';

export const loadMessages = (): string[] => {
  if (fs.existsSync(messagesFilePath)) {
    const data = fs.readFileSync(messagesFilePath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
};

export const loadUsers = (): User[] => {
  if (fs.existsSync(usersFilePath)) {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
};

export const saveMessages = (messages: string[]) => {
  fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
};

export const saveUsers = (users: User[]) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};
