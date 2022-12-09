import { readInput } from '../src/utils/readInput.js'

type Cargo = Record<string, string[]>

type Instruction = {
    amount: number
    from: string
    to: string
}

class CargoShip {
    cargo: Cargo

    constructor(cargo: Cargo) {
        this.cargo = cargo
    }

    moveSingleCargo({amount, from, to}: Instruction) {
        for (let count = 0; count < amount; count++) {
            if (this.cargo[from].length) {
                this.cargo[to].push(this.cargo[from].pop())
            }
        }
    }

    moveMultipleCargo({amount, from, to}: Instruction) {
        if (!this.cargo[from].length) {
            return
        }

        const cargoToMove = amount >= this.cargo[from].length ? this.cargo[from] : this.cargo[from].slice(-1 * amount)
        this.cargo[to] = this.cargo[to].concat(cargoToMove)
        this.cargo[from] = amount >= this.cargo[from].length ? [] : this.cargo[from].slice(0, this.cargo[from].length - amount)
    }

    getTopCrates() {
        return Object.keys(this.cargo).reduce((topCrates, level) => topCrates += this.cargo[level].slice(-1), '')
    }
}

readInput(5, (data: string) => {
    const [, instructionStrings] = data.trim().split('\n\n')
    const instructions: Instruction[] = instructionStrings.trim().split('\n').map(instruction => {
        const [,amount,,from,,to] = instruction.split(' ')
        return {
            amount: Number(amount),
            from: `L${from}`,
            to: `L${to}`
        }
    })

    const Ship = new CargoShip({
        L1: ['B', 'V', 'S', 'N', 'T', 'C', 'H', 'Q'],
        L2: ['W', 'D', 'B', 'G'],
        L3: ['F', 'W', 'R', 'T', 'S', 'Q', 'B'],
        L4: ['L', 'G', 'W', 'S', 'Z', 'J', 'D', 'N'],
        L5: ['M', 'P', 'D', 'V', 'F'],
        L6: ['F', 'W', 'J'],
        L7: ['L', 'N', 'Q', 'B', 'J', 'V'],
        L8: ['G', 'T', 'R', 'C', 'J', 'Q', 'S', 'N'],
        L9: ['J', 'S', 'Q', 'C', 'W', 'D', 'M'],
    })
    instructions.forEach(instruction => Ship.moveSingleCargo(instruction))
    console.log(`Top Crates Ship 1: ${Ship.getTopCrates()}`)

    const Ship2 = new CargoShip({
        L1: ['B', 'V', 'S', 'N', 'T', 'C', 'H', 'Q'],
        L2: ['W', 'D', 'B', 'G'],
        L3: ['F', 'W', 'R', 'T', 'S', 'Q', 'B'],
        L4: ['L', 'G', 'W', 'S', 'Z', 'J', 'D', 'N'],
        L5: ['M', 'P', 'D', 'V', 'F'],
        L6: ['F', 'W', 'J'],
        L7: ['L', 'N', 'Q', 'B', 'J', 'V'],
        L8: ['G', 'T', 'R', 'C', 'J', 'Q', 'S', 'N'],
        L9: ['J', 'S', 'Q', 'C', 'W', 'D', 'M'],
    })
    instructions.forEach(instruction => Ship2.moveMultipleCargo(instruction))
    console.log(`Top Crates Ship 2: ${Ship2.getTopCrates()}`)
})