"use client";

import { usePoll } from "./hooks/usePoll";
import CreatePoll from "./components/createPoll";

export default function HomePage() {
  const { data, isLoading, error } = usePoll();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <CreatePoll />
      {data?.data.map((poll) => (
        <div className="cursor-pointer w-3" onClick={() => (window.location.href = `/detail/${poll.id}`)} key={poll.id}>
          <h1>{poll.name}</h1>
          <p>{poll.description}</p>
        </div>
      ))}
    </>
  );
}
