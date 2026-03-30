"use client";
import React from "react";
import SignUpForm from "../../components/signUpForm";
import Winner from "../../components/winner";

export default function detailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams as { id: string };

  return (
    <>
      {id}
      <SignUpForm pollId={id} />
      <Winner pollId={id} />
    </>
  );
}
