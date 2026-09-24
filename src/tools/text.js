import stateVectorSimplifer from "../algorithms/stateVectorParse.js";

const textCircuit = [
    {
        "gate": "h",
        "target": 0,
        "step": 0
    },
    {
        "gate": "s",
        "target": 2,
        "step": 0
    },
    {
        "gate": "cz",
        "controls": [
            0
        ],
        "targets": [
            1
        ],
        "step": 1
    },
    {
        "gate": "ccz",
        "controls": [
            0,
            1
        ],
        "targets": [
            2
        ],
        "step": 2
    }
]

const init= (qubits)=>{
    const size = Math.pow(2, qubits);
    const stateVector = new Array(size).fill(null).map(()=>[0,0])
    stateVector[1] = [1,0]
    return stateVector;
}

const run = ({textCircuit})=>{
    const stateVector = stateVectorSimplifer()

}