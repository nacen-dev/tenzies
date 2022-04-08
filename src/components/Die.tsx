import React from "react";
import { DieInterface } from "./Tenzies";

type Props = {
  Die: DieInterface;
  toggleFreeze: (id: number) => void;
};

const Die = ({ Die, toggleFreeze }: Props) => {
  return (
    <div
      className={`${
        Die.froze ? "bg-dice_freeze" : "bg-white"
      } flex items-center justify-center drop-shadow-lg p-4 rounded cursor-pointer w-[75px] h-[75px]`}
      onClick={() => toggleFreeze(Die.id)}
    >
      <p className="text-textColor text-xl">{Die.dieNumber}</p>
    </div>
  );
};

export { Die };
