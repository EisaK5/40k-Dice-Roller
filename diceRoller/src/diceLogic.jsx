
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getTarget(strength, toughness) {
    if (strength > toughness) {
        if (strength >= 2 * toughness)
            return 2;
        else
            return 3;
    }
    else if (strength == toughness)
        return 4;
    else {
        if (toughness >= 2 * strength)
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

export function resolveAttack({
    attacks, bsWs, strength, toughness, save, invuln, ap, damage, wounds, sustainedHits, sides = 6,
}) {
    //hit roll + sustained hits
    const hitRolls = [];
    let hitCount = 0;

    for (let  i = 0; i < attacks; i++) {
        //roll a die
        const value = randomInt(1, sides);
        hitRolls.push(value); //store role for display
        
        if (value >= bsWs) {
            hitCount += 1;

            if (sustainedHits > 0 && value == 6)
                hitCount += sustainedHits;
        }
    }
    

    //wound roll
    const woundTarget = getTarget(strength, toughness);
    const woundResult = rollAndCountSuccess(hitCount, woundTarget, sides);
    const woundCount = woundResult.successes;

    let saveTarget;
    if (invuln > 0) { //invuln save allows static save
        if (save+ap >= invuln) //if save roll with ap > invuln use invuln
            saveTarget = invuln;
        else //else save roll lower than invuln keep save
            saveTarget = save+ap;
    } else { //no invuln just go to normal save
        saveTarget = save+ap;
    }
        const saveResult = rollAndCountSuccess(woundCount, saveTarget, sides);
        const saveCount = saveResult.successes;
        const failedSaves = woundCount - saveCount;
    
    
    let modelsKilled = 0;
    let currentWounds = wounds;
    for (let i = 0; i < failedSaves; i++) {  //for splash damage
        currentWounds -= damage;

        if (currentWounds <= 0) {
             modelsKilled += 1;
             currentWounds = wounds;
        }


    }

    return {
        hitTarget: bsWs, woundTarget, saveTarget,

        hitRolls, hitCount,

        woundRolls: woundResult.rolls, woundCount,

        saveRolls: saveResult.rolls, saveCount, failedSaves,

        modelsKilled,
    };
}

