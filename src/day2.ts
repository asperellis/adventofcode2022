import { readInput } from '../src/utils/readInput.js'

type Throw = keyof typeof THROW_NAME
type RoundOutCome = keyof typeof ROUND_TYPE
type Round = Throw[]

const THROW_NAME = {
    "ROCK": "ROCK",
    "PAPER": "PAPER",
    "SCISSORS": "SCISSORS",
} as const;

const THROW_TYPE = {
    A: THROW_NAME.ROCK,
    B: THROW_NAME.PAPER,
    C: THROW_NAME.SCISSORS,
    X: THROW_NAME.ROCK,
    Y: THROW_NAME.PAPER,
    Z: THROW_NAME.SCISSORS,
} as const;

const THROW_SCORE = {
    [THROW_NAME.ROCK]: 1,
    [THROW_NAME.PAPER]: 2,
    [THROW_NAME.SCISSORS]: 3
} as const;

const ROUND_TYPE = {
    'WIN': 'WIN',
    'DRAW': 'DRAW',
    'LOSE': 'LOSE'
} as const;

const ROUND_SCORE = {
    [ROUND_TYPE.WIN]: 6,
    [ROUND_TYPE.DRAW]: 3,
    [ROUND_TYPE.LOSE]: 0
} as const;

const ROUND_RESULT = {
    X: ROUND_TYPE.LOSE,
    Y: ROUND_TYPE.DRAW,
    Z: ROUND_TYPE.WIN,
} as const;

const playRoundOfRockPaperScissors = (score: number, round: Round) => {
    const [player1Throw, yourThrow] = round
    const throwScore = THROW_SCORE[yourThrow]
    let roundScore = throwScore

    if (player1Throw === yourThrow) {
        roundScore += ROUND_SCORE.DRAW
    } else if (yourThrow === 'ROCK') {
        roundScore += (player1Throw === 'PAPER' ? ROUND_SCORE.LOSE : ROUND_SCORE.WIN)
    } else if (yourThrow === 'PAPER') {
        roundScore += (player1Throw === 'SCISSORS' ? ROUND_SCORE.LOSE : ROUND_SCORE.WIN)
    } else if (yourThrow === 'SCISSORS') {
        roundScore += (player1Throw === 'ROCK' ? ROUND_SCORE.LOSE : ROUND_SCORE.WIN)
    }

    return score + roundScore
}

const getDesiredThrow = (opponentThrowType: Throw, desiredOutcome: RoundOutCome): Throw => {
    if (desiredOutcome === 'WIN') {
        if (opponentThrowType === 'ROCK') {
            return 'PAPER'
        } else if (opponentThrowType === 'PAPER') {
            return 'SCISSORS'
        } else if (opponentThrowType === 'SCISSORS') {
            return 'ROCK'
        }
    } else if (desiredOutcome === 'LOSE') {
        if (opponentThrowType === 'ROCK') {
            return 'SCISSORS'
        } else if (opponentThrowType === 'PAPER') {
            return 'ROCK'
        } else if (opponentThrowType === 'SCISSORS') {
            return 'PAPER'
        }
    }

    return opponentThrowType
}

const charToThrowType = (throwChar) => THROW_TYPE[throwChar]
const toRound = (roundStr) => roundStr.split(' ').map(charToThrowType)
const toDesiredRound = (char, index, round) => {
    const isOpponentThrow = index === 0
    
    if (isOpponentThrow) {
        return charToThrowType(char)
    } 
    
    const opponentThrow = charToThrowType(round[0])
    const desiredOutcome = ROUND_RESULT[char]
    return getDesiredThrow(opponentThrow, desiredOutcome)
}
    
    
readInput(2, (data: string) => {
    const input = data.trim().split('\n')

    const rounds: Round[] = input.map(toRound);
    const secondRounds: Round[] = input.map((roundStr) => roundStr.split(' ').map(toDesiredRound));

    console.log(`Initial score: ${rounds.reduce(playRoundOfRockPaperScissors, 0)}`)
    console.log(`Second score: ${secondRounds.reduce(playRoundOfRockPaperScissors, 0)}`)
})