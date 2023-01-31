import { roll } from "../../lib/diceHelpers";

test("Roll one 6-sided dice", async () => {
  expect(roll).toBeTruthy();

  for (let i = 0; i < 1000; i++) {
    let result = roll(6, 1);

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(6);
  }
});

test("Roll two 6-sided dice", async () => {
    expect(roll).toBeTruthy();
  
    for (let i = 0; i < 1000; i++) {
      let result = roll(6, 2);
  
      expect(result).toBeGreaterThanOrEqual(2);
      expect(result).toBeLessThanOrEqual(12);
    }
  });

  test("Roll three 20-sided dice", async () => {
    expect(roll).toBeTruthy();
  
    for (let i = 0; i < 1000; i++) {
      let result = roll(20, 3);
  
      expect(result).toBeGreaterThanOrEqual(3);
      expect(result).toBeLessThanOrEqual(60);
    }
  }); 
