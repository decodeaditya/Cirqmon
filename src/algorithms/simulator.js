import gateMatrics from "../data/gateMatrics.js";

const initializeStateVector = (numQubits) => {
    const size = Math.pow(2, numQubits);
    const stateVector = new Array(size).fill(null).map(() => [0, 0]);
    stateVector[0] = [1, 0];
    return stateVector;
};

// needed because JS cant handle complex multiplication. but math is simple as we do for normal (a+b)(a-b) type
const calcCompNum = (complex1, complex2) => {
    const [a, b] = complex1;
    const [c, d] = complex2;
    return [a * c - b * d, a * d + b * c];
};

// Main Part that compares gate matrix with Temp unitaryMatrix matrix by inflating and forcing bigger unitaryMatrix matrix to match what
// gateMatrix's corresponding row and Column. Uses Bitwise operations. 
const buildStepMatrix = (gateType, involvedQubits, numQubits, bigEndian = false) => {
    let gateMatrix = gateMatrics[gateType.toUpperCase()];
    if (gateType == "sw"){ gateMatrix = gateMatrics["SWAP"] }

    const gateLength = involvedQubits.length;     
    const unitaryMatrixSize = Math.pow(2,numQubits);
    const gateMatrixSize = Math.pow(2,gateLength)

    const unitaryMatrix = Array.from({ length: unitaryMatrixSize }, () =>
        Array.from({ length: unitaryMatrixSize }, () => [0, 0])
    );

    const bitPos = involvedQubits.map(q =>
        bigEndian ? (numQubits - 1 - q) : q
    );

    for (let i = 0; i < unitaryMatrixSize; i++) {
        for (let row = 0; row < gateMatrixSize; row++) {
            let fullRow = i;
            let gateColIndex = 0;
        
            for (let b = 0; b < gateLength; b++) {
                const bit = (row >> (gateLength - 1 - b)) & 1;
                const mask = 1 << bitPos[b];
                fullRow = bit ? (fullRow | mask) : (fullRow & ~mask);
        
                if ((i >> bitPos[b]) & 1) {
                    gateColIndex = gateColIndex | (1 << (gateLength - 1 - b));
                }
            } 
            unitaryMatrix[fullRow][i] = gateMatrix[row][gateColIndex];
        }
    }
    return unitaryMatrix;
};


// for Matrix and Statevector multiplication
const multiplyMatrixVector = (matrix, vector) => {
    const size = vector.length;
    const newVector = new Array(size).fill(null).map(() => [0, 0]);

    for (let i = 0; i < size; i++) {
        let sum = [0, 0];
        for (let j = 0; j < size; j++) {
            const product = calcCompNum(matrix[i][j], vector[j]);
            sum = [sum[0] + product[0], sum[1] + product[1]];
        }
        newVector[i] = sum;
    }
    return newVector;
};


// final function
const runSimulator = (numQubits, rawCircuit, bigEndian = false) => {
    let stateVector = initializeStateVector(numQubits);
    if (!rawCircuit || rawCircuit.length === 0) return stateVector;

    const maxStep = Math.max(...rawCircuit.map(c => c.step));

    for (let step = 0; step <= maxStep; step++) {
        const gatesInStep = rawCircuit.filter(c => c.step === step);

        for (const gate of gatesInStep) {
            const controls = gate.controls ?? (gate.control !== undefined ? [gate.control] : []);
            const targets = gate.targets ?? (gate.target !== undefined ? [gate.target] : []);
            const qubits = [...controls, ...targets];

            const stepMatrix = buildStepMatrix(gate.gate, qubits, numQubits, bigEndian);
            stateVector = multiplyMatrixVector(stepMatrix, stateVector);

        }

    }

    return stateVector;
};

export default runSimulator;