"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";

const url = "https://v0-game-poll-api.vercel.app";

export const createPollSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const participantSchema = z.object({
  id: z.string(),
  username: z.string(),
  joinedAt: z.string(),
});
const pollSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  participants: z.array(participantSchema),
  winner: z.nullable(z.string()),
});

const responseSchema = z.object({
  success: z.boolean(),
  data: z.array(pollSchema),
  count: z.number(),
});

const winnerSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.string(),
    username: z.string(),
    joinedAt: z.string(),
  }),
  hasWinner: z.boolean(),
});

export function useGetWinner(pollId: string) {
  return useQuery({
    queryKey: ["winner", pollId],
    queryFn: async () => {
      const response = await fetch(`${url}/api/polls/${pollId}/winner`);
      const data = await response.json();
      return winnerSchema.parse(data);
    },
  });
}
export function usePoll() {
  return useQuery({
    queryKey: ["poll"],
    queryFn: async () => {
      const response = await fetch(`${url}/api/polls`);
      const data = await response.json();
      return responseSchema.parse(data);
    },
  });
}
export const signUpSchema = z.object({
  pollId: z.string(),
  username: z.string(),
});
type SignUpType = z.infer<typeof signUpSchema>;

export function useSignUp() {
  return useMutation({
    mutationFn: async (data: SignUpType) => {
      const response = await fetch(`${url}/api/polls/${data.pollId}/participants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: data.username }),
      });
      return await response.json();
    },
  });
}
export function useCreatePoll() {
  return useMutation({
    mutationFn: async (poll: z.infer<typeof createPollSchema>) => {
      const response = await fetch(`${url}/api/polls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(poll),
      });
      usePoll();
      return await response.json();
    },
  });
}
/*
{
  "success": true,
  "data": [
    {
      "id": "abc123",
      "name": "Best Framework Poll",
      "description": "Vote for your favorite",
      "createdAt": "2026-03-17T10:00:00.000Z",
      "participants": [],
      "winner": null
    }
  ],
  "count": 1
}

 "id": "axkinxf",
          "username": "student1",
          "joinedAt": "2026-03-17T07:17:03.560Z"

  {
  "name": "Best Framework Poll",
  "description": "Vote for your favorite"
}

{
  "success": true,
  "data": {
    "id": "xyz789",
    "username": "john_doe",
    "joinedAt": "2026-03-17T10:30:00.000Z"
  },
  "hasWinner": true
}
*/
