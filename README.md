
<p align="center">
  <img src="./src/assets/logo.png" width = '100px'/>
</p>

<p align="center">
    <img src="./src/assets/text_logo.JPG" width = '150px' style='border-radius:15px'/>
</p>

<p align="center"><em>Qubits made Fun! </em></p>
<p align="center">
  <img src="https://forthebadge.com/badges/built-with-swag.svg" /> 
  <img src="https://forthebadge.com/badges/made-with-javascript.svg" /> 

</p>

***

Cirqmon is Web based Quantum circuit maker, whose simulator and circuit execution happens inside browser without any backend, Execution is written from Scratch. Also its based on 3d Glassmorphism and more colorful, so that learning Quantum computing don't feel annoying. 

![A Snapshot](./src/assets/tour_shots/DemoGIF.gif)


<p align="center">
  <a href="https://cirqmon.vercel.app">
    <img src="https://forthebadge.com/badges/check-it-out.svg" alt="Check It Out" />
  </a>
</p>


## Why Cirqmon is made?

This project aims to be a simple but complete playground where you can:
1. Visually build circuits.
2. Understand and Visualize what the statevector is doing.
3. Export real code you can run in Qiskit.

## What is Inside! 

- ### **Drag-and-drop circuit builder**  
  Place single and multi-qubit gates on a visual canvas.

  ![Canvas](./src/assets/tour_shots/Canvas.png)

- ### **Vibe and Controls**  
  Here you can control Number of Qubits and Nodes. Also change wallpaper or work while listening to Audio, so you don't lose Vibe. 

  ![Vibe and Controls](./src/assets/tour_shots/Controls.png)  

  - ### **Includes Foundational Gates**  
  Builder works with Gates like `H`, `X`, `Y`, `Z`, `S`, `T`, `CX`, `CZ`, `SWAP` and more.  

  ![Gates](./src/assets/tour_shots/Gates.png)  

- ### **Get Brief Introduction**  
  Click on gate (or Drag to use) to Know about that Gate in Brief.   

  ![Gates](./src/assets/tour_shots/GateIntro.png)

- ### **Statevector simulation**  
  Press Alien's face on bottom-right to See amplitudes and probabilities as you build.  

   ![Run from Here](./src/assets/tour_shots/RunButton.png)


- ### **Q-Sphere Visualization**  
  Interactive Q-Sphere that shows amplitude and phase angle of every basis state. Same as What IBM uses. Phase angle node color is represented as corresponding color in that angle in HSL Wheel.

   ![Q Sphere Visualization](./src/assets/tour_shots/Qsphere.png)

- ### **Probability Histogram**  
  Bar graph that shows measurement probabilities of possible states.

  ![Probability Histogram](./src/assets/tour_shots/Graph.png)

- ### **Qiskit Code export**  
  Get executable Qiskit code based on visual circuit canvas.   

  ![Qiskit Code](./src/assets/tour_shots/Code.png)

## Example: Bell State   
1. Set 2 Qubit System
1.  Drag H onto qubit 0
1.  Drag CX with control on qubit 0 and target on qubit 1
1.  Observe the state become:
    
    ```
    |00⟩ ≈ 0.707

    |11⟩ ≈ 0.707
    ```
## Tech Stack (via Vite)


- **React:** Frontend

- **Javascript:** Simulator and Algorithms

- **Three.js:** Q-Sphere visualization

- **Tailwind CSS:** Styling



## Making your own Version

Clone the project
```bash
git clone https://github.com/decodeaditya/cirqmon
```

Go to the project directory
```bash
cd cirqmon
```

Install dependencies
```bash
npm install
```

Start the server
```bash
npm run dev 
```
## Devlogs/Updates
Cirqmon is made as Part of **Stardance summer program** organized by Hack club and NASA. The updates are posted on Stardance website as **Devlogs**.

Here is the Link - 
[**Cirqmon Devlogs**](https://stardance.hackclub.com/projects/1327)

## Contributing
Contributions are always welcome!      

If you find a bug or have an idea, open an issue. 

You can even Contribute to project by educating people about Quantum Computing using Cirqmon, that's why its made.  

## Acknowledgements

 - [**Magnific**](https://www.magnific.com/) - Images
 - [**Iconscout**](https://iconscout.com/) -  Images
- [**Flaticon**](https://flaticon.com/) -  Images
- [**Pixabay**](https://pixabay.com/music/) -  Audio
 - **Qiskit Global Summer School** - Helped me Learn a lot about Quantum computing

## Licenses

<img src="https://forthebadge.com/badges/license-mit.svg">


This project is licensed under the MIT License

## Author


[@decodeaditya](https://www.github.com/decodeaditya)

***

<div align="center">

  <p><em> Love what You do and Share it so others start loving it!</em></p>

  <img src="https://forthebadge.com/badges/its-not-a-lie-if-you-believe-it.svg" />
</div>

