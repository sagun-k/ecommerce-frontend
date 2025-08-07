import type { UserChatSummary } from "../pages/admin/AdminChatViewer";
import type { ChatMessage } from "../types/chatMessage";
import axiosInstance from "./axiosInstance";
import { throwAsServiceError } from "./theowAsServiceError";

export class ChatService {
  static async askChatBot(userId: string, question: string) {
    try {
      const response = await axiosInstance.post("/chat/ask", {
        userId,
        question,
      });
      return response.data;
    } catch (err) {
      throwAsServiceError(err);
    }
  }

  static async getChatHistory(userId: string): Promise<ChatMessage[]> {
    try {
      const chat = await axiosInstance.get(`/chat/history?userId=${userId}`);
      return chat.data;
    } catch (err) {
      throwAsServiceError(err);
    }
  }

  static async getUserSummary(): Promise<UserChatSummary[]> {
    try {
      const res = await axiosInstance.get(
        "/admin/chat/history?page=1&limit=100"
      );
      return res.data;
    } catch (err) {
      throwAsServiceError(err);
    }
  }
}
