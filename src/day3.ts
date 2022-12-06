import { readInput } from '../src/utils/readInput.js'

const GROUP_SIZE = 3

const getRucksackItem = (rucksack: string) => {
    const rucksackSize = rucksack.length
    const compartmentOne = rucksack.slice(0, rucksackSize / 2).split('')
    const compartmentTwo = rucksack.slice(rucksackSize / 2, rucksackSize).split('')
    return compartmentOne.find(item => compartmentTwo.includes(item))
}

const getGroupBadges = (badges: string[], rucksack: string, index: number, rucksacks: string[]) => {
    if (index % GROUP_SIZE !== 0) {
        return badges
    }

    const rucksack1 = rucksack.split('')
    const rucksack2 = rucksacks[index + 1].split('')
    const rucksack3 = rucksacks[index + 2].split('')
    const badge = rucksack1.find(item => rucksack2.includes(item) && rucksack3.includes(item))

    return [...badges, badge]
}

const getPriority = (item: string) => {
    const code = item.charCodeAt(0)
    const isLowerCase = code >= 97
    return isLowerCase ? code - 96 : code - 38
}

const toPrioritySum = (sum: number, item: string) => sum + getPriority(item)

readInput(3, (data: string) => {
    const rucksacks = data.trim().split('\n')
    console.log(`Priority sum: ${rucksacks.map(getRucksackItem).reduce(toPrioritySum, 0)}`)
    console.log(`Badge priority sum: ${rucksacks.reduce(getGroupBadges, []).reduce(toPrioritySum, 0)}`)
})