function roll(noOfDice, diceSize) {
  const rand = Math.random()
  console.log(`${rand}:${noOfDice}:${diceSize}+${1} => ${Math.floor(rand * diceSize * noOfDice) + 1}`)
  return Math.floor(rand * diceSize * noOfDice) + 1
}

export { roll };
