const readInput = require('../utils/readInput');
const toElf = (elfString, elfNumber) => {
    const food = elfString.split('\n').map(Number);
    return {
        elfNumber,
        food,
        totalCalories: food.reduce((sum, calories) => sum + calories, 0)
    };
};
const byCalories = ({ totalCalories }, { totalCalories: totalCalories2 }) => totalCalories2 - totalCalories;
const getTotalCaloriesOfTopElves = (elves, numberOfElves) => elves.sort(byCalories)
    .slice(0, numberOfElves)
    .reduce((sum, { totalCalories }) => sum + totalCalories, 0);
readInput(1, (data) => {
    const elves = data.trim().split('\n\n').map(toElf);
    console.log(`Top Elf Calories:   ${getTotalCaloriesOfTopElves(elves, 1)}`);
    console.log(`Top 3 Elf Calories: ${getTotalCaloriesOfTopElves(elves, 3)}`);
});
//# sourceMappingURL=day1.js.map