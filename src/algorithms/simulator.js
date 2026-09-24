import gateMatrices from "../data/gateMatrices";

const initializeStateVector = (numQubits) => {
    const size = 1 << numQubits;
    const stateVector = Array.from({ length: size }, () => [0, 0]);
    stateVector[0] = [1, 0];
    return stateVector;
};

// needed because JS cant handle complex multiplication. but math is simple as we do for normal (a+b)(a-b) type
const multiplyComplex = ([a, b], [c, d]) => [
    a * c - b * d,
    a * d + b * c
];

// this approach of calculating the statevector only changes the state and postions that the gate is involved with others are not repeated and 
// finally just multiplying the corresponding [row][col] of gate to [col] of stateVector; this one is better than last version's inflating the matrix 
// because that used to have so much iterations in building up and mutltiplying the matrices.
const applyQuantumGate = (stateVector, numQubits, gate, involvedQubits, bigEndian) => {
    const quantumGate = gate === 'sw' ? 'SWAP' : gate.toUpperCase();
    const gateMatrix = gateMatrices[quantumGate];

    const gateLength = involvedQubits.length;
    const gateSize = 1 << gateLength;
    const bitPos = involvedQubits.map((q) => bigEndian ? numQubits - 1 - q : q);

    const offsets = new Array(gateSize);
    for (let gateState = 0; gateState < gateSize; gateState++) {
        let offset = 0;
        for (let b = 0; b < gateLength; b++) {
            if ((gateState >> (gateLength - 1 - b)) & 1) {
                offset |= (1 << bitPos[b]);
            }
        }
        offsets[gateState] = offset;
    }

    let targetMask = 0;
    for (const pos of bitPos) {
        targetMask |= (1 << pos);
    }

    for (let state = 0; state < stateVector.length; state++) {
        if ((state & targetMask) !== 0) continue;

        const oldAmplitudes = new Array(gateSize);
        for (let row = 0; row < gateSize; row++) {
            oldAmplitudes[row] = stateVector[state | offsets[row]];
        }

        for (let row = 0; row < gateSize; row++) {
            let nextReal = 0;
            let nextImag = 0;

            for (let col = 0; col < gateSize; col++) {
                const product = multiplyComplex(gateMatrix[row][col], oldAmplitudes[col]);
                nextReal += product[0];
                nextImag += product[1];
            }

            stateVector[state | offsets[row]] = [nextReal, nextImag];
        }
    }
};

// final function to run the Simulator
const runSimulator = (numQubits, rawCircuit, bigEndian = false) => {
    const stateVector = initializeStateVector(numQubits);
    if (!rawCircuit?.length) return stateVector;

    const sortedCircuit = [...rawCircuit].sort((a, b) => a.step - b.step);

    for (const gate of sortedCircuit) {
        const controls = gate.controls || [];
        const targets = gate.targets || [gate.target];
        const qubits = [...controls, ...targets];

        applyQuantumGate(stateVector, numQubits, gate.gate, qubits, bigEndian);
    }
    return stateVector;
};

export default runSimulator;
