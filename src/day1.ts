const readInput = require('../utils/readInput');

type Elf = {
    elfNumber: number,
    food: number[],
    totalCalories: number
}

const toElf = (elfString: string, elfNumber: number): Elf => { 
    const food = elfString.split('\n').map(Number)
    return {
        elfNumber,
        food,
        totalCalories: food.reduce((sum, calories) => sum + calories, 0)
    }
}

const byCalories = ({ totalCalories }: Elf, { totalCalories: totalCalories2 }: Elf) => totalCalories2 - totalCalories

const getTotalCaloriesOfTopElves = (elves: Elf[], numberOfElves: number) =>
    elves.sort(byCalories)
        .slice(0, numberOfElves)
        .reduce((sum, { totalCalories }) => sum + totalCalories, 0)

readInput(1, (data: string) => {
    const elves = data.trim().split('\n\n').map(toElf);
    
    console.log(`Top Elf Calories:   ${getTotalCaloriesOfTopElves(elves, 1)}`)
    console.log(`Top 3 Elf Calories: ${getTotalCaloriesOfTopElves(elves, 3)}`)
})