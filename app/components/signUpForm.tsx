"use client";
import { useSignUp, signUpSchema } from "../hooks/usePoll";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUpForm({ pollId }: { pollId: string }) {
  const { mutate } = useSignUp();
  type SignUpType = z.infer<typeof signUpSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      pollId: pollId,
      username: "",
    },
  });
  const onSubmit = async (data: SignUpType) => {
    mutate(data);
  };
  return (
    <form className="border border-black" onSubmit={handleSubmit(onSubmit)}>
      <p>pollId:</p>
      <input className="border border-black" type="text" {...register("pollId")} />
      <p>username:</p>
      <input className="border border-black" type="text" {...register("username")} />
      <button className="border border-black" type="submit">
        Sign Up
      </button>
    </form>
  );
}
