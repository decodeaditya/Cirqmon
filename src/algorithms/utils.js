const exportToCode = (maxQubits, circuitInstructions) => {
  const sortedGates = [...circuitInstructions].sort((a, b) => a.step - b.step);

  const codeSnippets = sortedGates.map(item => {
    const gate = item.gate.toLowerCase();
    if (!item.controls) {
      return `qc.${gate}(${item.target})`;
    }
    else {
      return `qc.${gate}(${item.controls.map((control) => control)},${item.targets[0]})`
    }
  })

  const code = `from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

# 1. Create a Quantum Circuit with ${maxQubits} qubit
qc = QuantumCircuit(${maxQubits})

# 2. Adding gates to the circuit
${codeSnippets.join('\n') || '# No Gates added'}

# 3. Measure the qubit and store the result
qc.measure_all()

 # 4. Simulate the circuit
sampler = StatevectorSampler()
job = sampler.run([qc], shots=1024)
result = job.result()
pub_result = result[0]

print("Measurement Counts:", pub_result.data.meas.get_counts())`

  return code
}

const canvasToJSON = (circuit) => {
  const circuitInstructions = [];
  const maxQubits = Object.keys(circuit).length;

  const multiMap = {};

  Object.keys(circuit).forEach((qubitId) => {
    circuit[qubitId].forEach((gateObj, stepId) => {
      if (!gateObj) return;

      if (gateObj.type === "single") {
        circuitInstructions.push({
          gate: gateObj.gate,
          target: parseInt(qubitId),
          step: stepId
        });
        return;
      }

      if (gateObj.type.includes('multi')) {
        const controls = gateObj.controls || [];
        const targets = [gateObj.target]
        const allQubits = [...controls, ...targets].map(Number).sort((a, b) => a - b);
        const key = `${stepId}-${gateObj.gate}-${allQubits.join("-")}`;

        if (!multiMap[key]) {
          multiMap[key] = {
            gate: gateObj.gate,
            controls: [...controls],
            targets: [...targets],
            step: stepId
          };
        }
      }
    });
  });

  Object.values(multiMap).forEach(g => {
    circuitInstructions.push(g);
  });
  return { circuitInstructions, maxQubits };
};

const getBlogImg = (content) => {
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/;
  const match = content.match(imgRegex);

  return match[1];
}

export { exportToCode, canvasToJSON, getBlogImg }


