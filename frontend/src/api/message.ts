import axios from "axios";
import type { ChatRequest, ChatResponse } from "../types/message";

export const sendMessage = async (
  payload: ChatRequest
): Promise<ChatResponse> => {
  const res = await axios.post<ChatResponse>(
    "http://localhost:8080/api/message",
    payload
  );
  return res.data;
};
