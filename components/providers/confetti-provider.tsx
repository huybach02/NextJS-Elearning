"use client";

import ReactConfetti from "react-confetti";

import React from "react";
import {useConfettiStore} from "@/hooks/useConfettiStore";

type Props = {};

const ConfettiProvider = (props: Props) => {
  const confetti = useConfettiStore();

  if (!confetti.isOpen) {
    return null;
  }

  return (
    <div>
      <ReactConfetti
        className="pointer-events-none z-[1000]"
        numberOfPieces={500}
        recycle={false}
        onConfettiComplete={() => {
          confetti.onClose();
        }}
      />
    </div>
  );
};

export default ConfettiProvider;
