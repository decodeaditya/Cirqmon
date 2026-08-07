// Demo info by AI (Needs to update in next version)

const gates = [
  {
    id: 'h',
    name: 'H',
    bg: 'bg-[#FF6B6B]',
    text: 'text-white',
    easyName: 'Hadamard',
    work: 'Puts a qubit into a 50-50 possibility superposition state of |0⟩ and |1⟩.',
    undo: 'Applying it twice collapses the qubit back to its original state.',
    type: 'single'
  },
  {
    id: 'x',
    name: 'X',
    bg: 'bg-[#4ECDC4]',
    text: 'text-black',
    easyName: 'Bit Flipper',
    work: 'It Flips |0⟩ to |1⟩, or |1⟩ to |0⟩. The classic NOT gate.',
    undo: 'Applying it twice brings you back to the start.',
    type: 'single'
  },
  {
    id: 'y',
    name: 'Y',
    bg: 'bg-[#5F27CD]',
    text: 'text-white',
    easyName: 'Phase and Bit Flipper',
    work: 'Flips the state and changes the phase angle at the same time, using the imaginary number i. |0⟩ to |1⟩, or |1⟩ to |0⟩, but with a 180-degree phase shift.',
    undo: 'Applying it twice returns the qubit to its original state up to phase.',
    type: 'single'
  },
  {
    id: 'z',
    name: 'Z',
    bg: 'bg-[#FFE66D]',
    text: 'text-black',
    easyName: 'Phase Flipper',
    work: 'Flips the phase sign from plus to minus if the qubit is in the |1⟩ state (but the possibility of measuring it remains unchanged). |0⟩ stays |0⟩, but |1⟩ becomes -|1⟩.',
    undo: 'Applying it twice resets the phase angle.',
    type: 'single'
  },
  {
    id: 's',
    name: 'S',
    bg: 'bg-[#1DD1A1]',
    text: 'text-black',
    easyName: 'Phase Quarter-Turn',
    work: 'Adds a 90-degree phase angle shift to the |1⟩ state.',
    undo: 'Applying it four times returns to the original state.',
    type: 'single'
  },
  {
    id: 't',
    name: 'T',
    bg: 'bg-[#F368E0]',
    text: 'text-white',
    easyName: 'Phase Eighth-Turn',
    work: 'Adds a 45-degree phase angle shift to the |1⟩ state.',
    undo: 'Applying it eight times returns to the original state.',
    type: 'single'
  },
  {
    id: 'cx',
    name: 'CX',
    bg: 'bg-[#EE5253]',
    text: 'text-white',
    easyName: 'Controlled-NOT',
    work: 'Flips the target qubit only if the control qubit is |1⟩. If the control is |0⟩, the target remains unchanged.',
    undo: 'Applying the exact same pair control loop twice undoes it.',
    type: 'multi'
  },
  {
    id: 'cz',
    name: 'CZ',
    bg: 'bg-[#5F27CD]',
    text: 'text-white',
    easyName: 'Controlled-Z',
    work: 'Flips the target phase only if both qubits are |1⟩. If either qubit is |0⟩, the target remains unchanged. |0⟩ stays |0⟩, but |1⟩ becomes -|1⟩.',
    undo: 'Repeating the operation across both qubits reverses the shift.',
    type:"multi"
  },
  {
    id: 'sw',
    name: 'SW',
    bg: 'bg-[#341F97]',
    text: 'text-white',
    easyName: 'State Swap',
    work: 'Swaps the quantum states of two separate qubits entirely. Like, one is |0⟩ and the other is |1⟩, they will switch places.',
    undo: 'Swapping the same two qubits again restores their positions.',
    type: 'multi'
  },
  {
    id: 'ch',
    name: 'CH',
    bg: 'bg-[#01A3A4]', 
    text: 'text-white',
    easyName: 'Controlled-Hadamard',
    work: 'Puts the target qubit into a superposition state only if the control qubit is |1⟩. If the control is |0⟩, the target remains unchanged.',
    undo: 'Running the exact two-qubit operation twice restores the original states.',
    type: 'multi',
  }
];

export default gates;