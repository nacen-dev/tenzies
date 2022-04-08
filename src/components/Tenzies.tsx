import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { generateRandomNumber } from "../utils";
import { Die } from "./Die";

type Props = {};

export interface DieInterface {
  id: number;
  dieNumber: 1 | 2 | 3 | 4 | 5 | 6;
  froze: boolean;
}

const Tenzies = (props: Props) => {
  const generateDieNumber = () => {
    let dieNum = generateRandomNumber(1, 6);
    return dieNum as DieInterface["dieNumber"];
  };

  const newDice = () => {
    let array: DieInterface[] = [];
    for (let i = 0; i < 10; i++) {
      array.push({ id: i, dieNumber: generateDieNumber(), froze: false });
    }
    return array;
  };

  const [dice, setDice] = useState<DieInterface[]>(newDice());
  const [tenzies, setTenzies] = useState(false);

  const toggleFreeze = (id: number) => {
    setDice((dice) => {
      return dice.map((die) =>
        die.id === id ? { ...die, froze: !die.froze } : die
      );
    });
  };

  const rollDice = () => {
    if (!tenzies) {
      setDice((dice) =>
        dice.map((die) =>
          !die.froze ? { ...die, dieNumber: generateDieNumber() } : die
        )
      );
    } else if (tenzies) {
      setDice(newDice());
      setTenzies(false);
    }
  };

  useEffect(() => {
    const firstDice = dice[0].dieNumber;
    const allSameNumber = dice.every((die) => die.dieNumber === firstDice);
    const allFrozen = dice.every((die) => die.froze);
    if (allSameNumber && allFrozen) {
      setTenzies(true);
    }
  }, [dice]);

  return (
    <div className="bg-background_color px-10 md:px-[20%] lg:px-[30%] py-[2.5%] h-full">
      {tenzies && <Confetti />}
      <main className="bg-content_color w-full h-full rounded-md px-[5%] py-8 flex flex-col items-center gap-3">
        <h1 className="text-4xl text-textColor font-bold">Tenzies</h1>
        <p className="text-subTextColor text-lg text-center">
          Roll until all frozen dice are the same. Click each die to freeze it
          at its current value between rolls.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 w-full gap-5 mt-5 mb-10 justify-items-center">
          {dice.map((die, index) => (
            <Die Die={die} key={index} toggleFreeze={toggleFreeze} />
          ))}
        </div>
        <button
          className="rounded-lg text-white bg-buttonColor font-bold py-3 px-8 text-2xl"
          onClick={rollDice}
        >
          {!tenzies ? "Roll" : "Reset Game"}
        </button>
      </main>
    </div>
  );
};

export { Tenzies };
