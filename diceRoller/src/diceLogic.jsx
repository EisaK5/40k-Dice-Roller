
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getTarget(unitA, unitB) {
    if (unitA > unitB) {
        if (unitA >= 2 * unitB)
            return 2;
        else
            return 3;
    }
    else if (unitA == unitB)
        return 4;
    else {
        if (unitB >= 2 * unitA)
            return 6;
        else
            return 5;
    }
}

export function rollAndCountSuccess(numDice, target, sides = 6) {
    const rolls = [];
    let successes = 0;

    for (let i = 0; i < numDice; i++) {
        const value = randomInt(1, sides);
        rolls.push(value);
        if (value >= target) {
            successes += 1;
        }
    }

    return {
        rolls,
        successes,
    };
}



