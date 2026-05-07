export type Role = "user" | "assistant";

// This is a union type — it means Role can only ever be one of two exact string values: "user" or "assistant".

// "user" = a message the human typed
// "assistant" = a message the AI responded with

export interface Message {
  id: string;
  role: Role;
  content: string;
}

// This defines the shape of every single message in our chat.
