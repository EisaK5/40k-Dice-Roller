//RollDice.js 
import { useState } from "react";
import { resolveAttack } from "./diceLogic.jsx";
import './RollDice.css'

function RollDice() {

const [attacks, setAttacks] = useState(10);
const [bsWs, setSkill] = useState(3);
const [strength, setStrength] = useState(4);
const [toughness, setToughness] = useState(4);
const [save, setSave] = useState(3);
const [invuln, setInvuln] = useState(4);
const [ap, setAp] = useState(0);
const [damage, setDamage] = useState(2);
const [wounds, setWounds] = useState(4);
const [sustainedHits, setSustainedHits] = useState(0);

const [result, setResult] = useState(null);

function handleRoll() {
    const r = resolveAttack({attacks, bsWs, strength, toughness, save, invuln, ap, damage, wounds, sustainedHits,});

    setResult(r);
}

return (
    <div  className ="RollDice">
        <label>
            Attacks:
            <input
                type="number"
                value={attacks}
                onChange={(e) => setAttacks(Number(e.target.value))}
            /> 
        </label>

        <label>
            BS/WS:
            <input
                type="number"
                value={bsWs}
                onChange={(e) => setSkill(Number(e.target.value))}
            /> 
        </label>

        <label>
            Stength:
            <input
                type="number"
                value={strength}
                onChange={(e) => setStrength(Number(e.target.value))}
            /> 
        </label>

        <label>
            AP:
            <input
                type="number"
                value={ap}
                onChange={(e) => setAp(Number(e.target.value))}
            /> 
        </label>

        <label>
            Damage:
            <input
                type="number"
                value={damage}
                onChange={(e) => setDamage(Number(e.target.value))}
            /> 
        </label>

        <label>
            sustainedHits:
            <input
                type="number"
                value={sustainedHits}
                onChange={(e) => setSustainedHits(Number(e.target.value))}
            />
        </label>
        <label>
            lethalHits:
            <input

            />
        </label>
        <label>
            devastatingWounds:
            <input

            />
        </label>
        <label>
            rerollHits:
            <input

            />
        </label>
        <label>
            rerollWounds:
            <input

            />
        </label>
        
        <label>
            Toughness:
            <input
                type="number"
                value={toughness}
                onChange={(e) => setToughness(Number(e.target.value))}
            /> 
        </label>

        <label>
            Save:
            <input
                type="number"
                value={save}
                onChange={(e) => setSave(Number(e.target.value))}
            /> 
        </label>
        <label>
            Invunerable Save:
            <input
                type="number"
                value={invuln}
                onChange={(e) => setInvuln(Number(e.target.value))}
            /> 
        </label>
        <label>
            Wounds:
            <input
                type="number"
                value={wounds}
                onChange={(e) => setWounds(Number(e.target.value))}
            /> 
        </label>

        <button onClick={handleRoll}>Roll</button>
        {result && (
            <div>
                <p>Hits: {result.hitCount}</p>

                <p>Wounds: {result.woundCount}</p>

                <p>Failed saves: {result.failedSaves}</p>

                <p>Models killed: {result.modelsKilled}</p>
            </div>
        )}
    </div>
    );
}



export default RollDice;