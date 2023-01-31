function roll(noOfSides, noOfRolls) {
  let count = 0;

  for (let i = 0; i < noOfRolls; i++) {
    const rand = Math.random();
    count += Math.floor(rand * noOfSides) + 1;
  }

  console.log(`Dice roll ${count}`)
  
  return count;
}

export { roll };
