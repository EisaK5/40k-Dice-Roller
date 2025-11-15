//RollDice.js 
import { useState } from "react";
import { getTarget, rollAndCountSuccess } from "./diceLogic.jsx";

function RollDice() {

const [unitA, setUnitA] = useState(7);
const [unitB, setUnitB] = useState(6);
const [numDice, setNumDice] = useState(10);
const [result, setResult] = useState(null);

function handleRoll() {
    const target = getTarget(unitA, unitB);
    const r = rollAndCountSuccess(numDice, target);
    setResult({...r, target});
}

return (
    <div  className ="RollDice">
        <label>
            Unit A:
            <input
                type="number"
                value={unitA}
                onChange={(e) => setUnitA(Number(e.target.value))}
            />
        </label>

        <label>
            Unit B:
            <input
                type="number"
                value={unitB}
                onChange={(e) => setUnitB(Number(e.target.value))}
            />
        </label>

        <label>
            Number of Dice:
            <input
                type="number"
                value={numDice}
                onChange={(e) => setNumDice(Number(e.target.value))}
            /> 
        </label>

        <button onClick={handleRoll}>Roll Dice</button>
        {result && (
            <div>
                <p>Target: {result.target}+</p>
                <p>Successes: {result.successes}</p>
                <p>Rolls: {result.rolls.join(", ")}</p>
            </div>
        )}
    </div>
    );
}



export default RollDice;