const gates = [
  {
    id: 'h',
    name: 'Hadamard Gate',
    bg: 'bg-[#4c97ff]',
    text: 'text-white',
    easyName: 'Equal Probability',
    work: 'Normally a qubit is either |0⟩ or |1⟩, but after applying the Hadamard, it becomes a superpostion of both |0⟩ and |1⟩, with same 50% chances of measuring either.',
    undo: 'Applying it twice returns the qubit back to its original state.',
    type: 'single'
  },
  {
    id: 'x',
    name: 'Pauli X Gate',
    bg: 'bg-[#9966ff]',
    text: 'text-white',
    easyName: 'Bit Flipper',
    work: 'It Flips State: Either: |0⟩ to |1⟩, or |1⟩ to |0⟩. It works like the classic computer NOT gate.',
    undo: 'Applying it NOT Gate twice brings you back to original state.',
    type: 'single'
  },
  {
    id: 'y',
    name: 'Pauli Y Gate',
    bg: 'bg-[#cf63cf]',
    text: 'text-white',
    easyName: 'Phase and Bit Flipper',
    work: 'Flips the qubit from |0⟩ to |1⟩ or from |1⟩ to |0⟩, like the X gate. It also adds a phase change, represented by the imaginary number i. In nutshell, |0⟩ becomes i|1⟩, and |1⟩ becomes -i|0⟩.',
    undo: 'Applying the Y gate two times brings the qubit back to its starting state.',
    type: 'single'
  },
  {
    id: 'z',
    name: 'Pauli Z Gate',
    bg: 'bg-[#e8b213]',
    text: 'text-black',
    easyName: 'Phase Flipper',
    work: 'Flips the phase sign from plus to minus if the qubit is in the |1⟩ state (but the possibility of measuring it remains unchanged). |0⟩ stays |0⟩, but |1⟩ becomes -|1⟩.',
    undo: 'Applying it twice resets the phase angle.',
    type: 'single'
  },
  {
    id: 's',
    name: 'Phase Gate',
    bg: 'bg-[#59c059]',
    text: 'text-white',
    easyName: '1/4th Phase Turn',
    work: 'Adds a 90-degree phase angle shift to the |1⟩ state.',
    undo: 'Applying it four times returns to the original state.',
    type: 'single'
  },
  {
    id: 't',
    name: 'π/8 Gate',
    bg: 'bg-[#ff6680]',
    text: 'text-white',
    easyName: '1/8th Phase Turn',
    work: 'Adds a 45-degree phase angle shift to the |1⟩ state.',
    undo: 'Applying it eight times returns to the original state.',
    type: 'single'
  },
  {
    id: 'cx',
    name: 'Controlled-Not Gate',
    bg: 'bg-cyan-500',
    text: 'text-white',
    easyName: 'Controlled-NOT',
    work: 'Flips the target qubit only if the control qubit is |1⟩. If the control is |0⟩, the target remains unchanged.',
    undo: 'Applying the exact same pair control loop twice undoes it.',
    type: 'multi'
  },
  {
    id: 'cz',
    name: 'Controlled-Z Gate',
    bg: 'bg-rose-500',
    text: 'text-white',
    easyName: 'Controlled-Z',
    work: 'Flips the target phase only if both qubits are |1⟩. If either qubit is |0⟩, the target remains unchanged. |0⟩ stays |0⟩, but |1⟩ becomes -|1⟩.',
    undo: 'Repeating the operation across both qubits reverses the shift.',
    type: "multi"
  },
  {
    id: 'sw',
    name: 'SWAP Gate',
    bg: 'bg-fuchsia-500',
    text: 'text-white',
    easyName: 'State Swap',
    work: 'Swaps the quantum states of two separate qubits entirely. Like, one is |0⟩ and the other is |1⟩, they will switch places.',
    undo: 'Swapping the same two qubits again restores their positions.',
    type: 'multi-two-qubit'
  },
  {
    id: 'ccx',
    name: 'Controlled-Controlled-X Gate',
    bg: 'bg-amber-500',
    text: 'text-black',
    easyName: 'Toffoli Gate',
    work: 'Flips the target qubit only if both control qubits are |1⟩.',
    undo: 'Applying the same Toffoli twice undoes it.',
    type: 'multi-three-qubit'
  },
  {
    id: 'ccz',
    name: 'Controlled-Controlled-Z gate',
    bg: 'bg-lime-600',
    text: 'text-white',
    easyName: 'Toffoli Gate',
    work: 'Flips the target qubit only if both control qubits are |1⟩.',
    undo: 'Applying the same Toffoli twice undoes it.',
    type: 'multi-three-qubit'
  },

];

export default gates;