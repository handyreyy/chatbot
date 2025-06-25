export interface ChatMessage {
  role: "user" | "bot";
  text: string;
}

export interface ChatRequest {
  text: string;
}

export interface ChatResponse {
  response: string;
}
