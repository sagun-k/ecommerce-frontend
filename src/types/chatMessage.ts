export interface ChatMessage {
  _id?: string;
  userId: string;
  role: ChatSender;
  content: string;
  timestamp?: string;
}

export enum ChatSender {
  User = "user",
  Bot = "bot",
}
