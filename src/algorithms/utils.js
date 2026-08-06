const exportToCode = (maxQubits, circuitInstructions) => {
  const sortedGates = [...circuitInstructions].sort((a, b) => a.step - b.step);
  
  const codeSnippets = sortedGates.map(item => {
    const gate = item.gate.toLowerCase();

    if (item.target !== undefined) {
      return `qc.${gate}(${item.target})`;
    }

    else {
      return `qc.${gate}(${item.controls[0]}, ${item.targets[0]})`
    }

  })

    const code = `from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

# Note that This Cirqmon shows ideal results and Qiskit code will inject some noise when Executed!

# 1. Create a Quantum Circuit with ${maxQubits} qubit
qc = QuantumCircuit(${maxQubits})
${codeSnippets.join('\n')}

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
    
        if (gateObj.type === "multi") {
          const partners = [parseInt(qubitId), gateObj.pairedWith].sort((a,b) => a-b);
          const key = `${stepId}-${gateObj.gate}-${partners.join("-")}`;
    
          if (!multiMap[key]) {
            multiMap[key] = {
              gate: gateObj.gate,
              controls: [],
              targets: [],
              step: stepId
            };
          }
    
          if (gateObj.role === "control") {
            multiMap[key].controls.push(parseInt(qubitId));
          } else if (gateObj.role === "target") {
            multiMap[key].targets.push(parseInt(qubitId));
          }
        }
      });
    });
    
    Object.values(multiMap).forEach(g => {
      circuitInstructions.push(g);
    });
  
    return { circuitInstructions, maxQubits };
  };


export { exportToCode, canvasToJSON }


