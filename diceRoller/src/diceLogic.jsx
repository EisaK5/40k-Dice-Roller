
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
    attacks, bsWs, strength, toughness, save, ap, damage, wounds, sides = 6,
}) {
    //hit roll
    const hitResult = rollAndCountSuccess(attacks, bsWs, sides);
    const hitCount = hitResult.successes;

    //wound roll
    const woundTarget = getTarget(strength, toughness);
    const woundResult = rollAndCountSuccess(hitCount, woundTarget, sides);
    const woundCount = woundResult.successes;

    //save roll
    const saveTarget = save+ap;
    const saveResult = rollAndCountSuccess(woundCount, saveTarget, sides);
    const saveCount = saveResult.successes;
    const failedSaves = woundCount - saveCount;

    //models killed
    const totalDamage = failedSaves * damage;
    const modelsKilled = Math.floor(totalDamage / wounds);

    return {
        hitTarget: bsWs, woundTarget, saveTarget,

        hitRolls: hitResult.rolls, hitCount,

        woundRolls: woundResult.rolls, woundCount,

        saveRolls: saveResult.rolls, saveCount, failedSaves,

        totalDamage, modelsKilled,
    };
}

