import axios from "axios";
import type { ChatRequest, ChatResponse } from "../types/message";

export const sendMessage = async (
  payload: ChatRequest
): Promise<ChatResponse> => {
  const res = await axios.post<ChatResponse>(
    "https://chatbot-production-3c89.up.railway.app/api/message",
    payload
  );
  return res.data;
};
