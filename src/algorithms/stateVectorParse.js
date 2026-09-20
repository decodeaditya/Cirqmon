const parseEachState = ([real, imaginary], noOfQubits, index) => {
    const probability = (Math.pow(real, 2) + Math.pow(imaginary, 2)).toFixed(2);
    const phaseAngle =  (Math.atan2(imaginary, real)).toFixed(1);
    const stateName = index.toString(2).padStart(noOfQubits, '0')

    // Hamming weight - no of 1s in state
    const hammingWeight = [...stateName].filter((digit) => digit == '1').length
    return { index, probability, phaseAngle, hammingWeight, stateName };
}

const simplifyStateVector = (stateVector) => {
    const numOfStates = stateVector.length;
    const noOfQubits = Math.log2(numOfStates);
    const parsedStateVector = []
    stateVector.map((amplitude, index) => {
        parsedStateVector.push(parseEachState(amplitude, noOfQubits, index))
    });
    return { parsedStateVector, numOfStates, noOfQubits }
}

const calculateQSphereNodes = (parsedStateVector, noOfQubits) => {
    const QSphereData = [];
    const weightGroups = {};

    parsedStateVector.forEach(state => {
        if (state.probability == 0) return;
        if (!weightGroups[state.hammingWeight]) {
            weightGroups[state.hammingWeight] = [];
        }
        weightGroups[state.hammingWeight].push(state);
    });

    for (const weightStr in weightGroups) {
        const weight = Number(weightStr)
        const group = weightGroups[weight]
        const groupSize = group.length;

        const theta = (Math.PI * weight) / noOfQubits; // from Z axis
        group.sort((a, b) => a.index - b.index);

        group.forEach((node, i) => {
            const phi = (2 * Math.PI * i) / groupSize //from X Axis
            // Coordinate swapping is due to Therotical and CS differences
            const x = (Math.sin(theta) * Math.cos(phi))
            const y = Math.cos(theta)
            const z = (Math.sin(theta) * Math.sin(phi))

            QSphereData.push({
                index: node.index,
                probability: node.probability,
                phase: node.phaseAngle,
                coordinates: [x, y, z],
                stateName: node.stateName
            });

        })
    }
    return QSphereData;
}

const stateVectorSimplifer = (stateVector) => {
    const { parsedStateVector, noOfQubits } = simplifyStateVector(stateVector)
    const QsphereData = calculateQSphereNodes(parsedStateVector, noOfQubits)
    return { parsedStateVector, QsphereData }
}

export default stateVectorSimplifer