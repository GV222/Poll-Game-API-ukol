"use client";

import { useState } from "react";
import { useGetWinner } from "../hooks/usePoll";

export default function Winner({ pollId }: { pollId: string }) {
  const [showWinner, setShowWinner] = useState(false);
  const { data, isLoading, error } = useGetWinner(pollId);

  return (
    <div className="border border-black">
      <button className="border border-black" type="button" onClick={() => setShowWinner(true)}>
        get winner
      </button>
      {showWinner && (
        <>
          {console.log(data)}
          {isLoading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {data && <h1>{data.data.username}</h1>}
        </>
      )}
    </div>
  );
}
