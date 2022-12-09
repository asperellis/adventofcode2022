import { readInput } from '../src/utils/readInput.js'

type Group = {
    start: number
    end: number
}

const toGroup = (groupString): Group => {
    const [start, end] = groupString.split('-').map(Number)

    return {
        start,
        end
    }
}

const toFullyOverlappedGroups = (totalOverlaps: number, [group1, group2]: Group[]) => 
    (group1.start >= group2.start && group1.end <= group2.end) ||
    (group2.start >= group1.start && group2.end <= group1.end) ?
        totalOverlaps + 1 : totalOverlaps

const toGroupsWithoutOverlaps = (totalOverlaps: number, [group1, group2]: Group[]) => 
    group1.end < group2.start || group1.start > group2.end ?
        totalOverlaps + 1 : totalOverlaps

readInput(4, (data: string) => {
    const groups = data.trim().split('\n').map(groupString => groupString.split(',').map(toGroup))

    console.log(`Fully overlapped groups: ${groups.reduce(toFullyOverlappedGroups, 0)}`)
    console.log(`Groups with any overlap: ${groups.length - groups.reduce(toGroupsWithoutOverlaps, 0)}`)
})