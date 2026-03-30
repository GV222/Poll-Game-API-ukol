"use client";
import { useCreatePoll, createPollSchema } from "../hooks/usePoll";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CreatePoll() {
  const { mutate } = useCreatePoll();
  type Poll = z.infer<typeof createPollSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Poll>({
    resolver: zodResolver(createPollSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: Poll) => {
    mutate(data);
  };

  return (
    <form className="border border-black mb-4" onSubmit={handleSubmit(onSubmit)}>
      <p>name of poll:</p>
      <input className="border border-black" type="text" {...register("name")} />
      <p>description:</p>
      <input className="border border-black" type="text" {...register("description")} />
      <button className="border border-black" type="submit">
        Create Poll
      </button>
    </form>
  );
}
