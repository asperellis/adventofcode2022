import { readInput } from '../src/utils/readInput.js'

const findMarker = (input: string, length: number) => {
    let trackingCode = ''
    let markerIndex = 0
    for (let counter = 0; counter < input.length; counter++) {
        const newChar = input[counter]
        const prefix = trackingCode.slice(-1 * (length - 1))
        trackingCode = prefix + newChar
        const isUnique = [...new Set(trackingCode.split(''))].length === length
        if (isUnique && trackingCode.length === length) {
            return markerIndex = counter + 1
        }
    }

    return input.length
}
readInput(6, (data: string) => {
    const input = data.trim()

    console.log(`Characters processed before packet marker: ${findMarker(input, 4)}`)
    console.log(`Characters processed before message marker: ${findMarker(input, 14)}`)
})