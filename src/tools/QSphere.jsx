import { Html, Line, OrbitControls, Sphere } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import colorWheel from "../assets/hue_color_wheel.png"

const QSphereRadii = 2

const generateEquatorPoints = (radius, segments = 1000) => {

    const points = [];

    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        // x = r * cos(θ), y = 0 (flat equator plane), z = r * sin(θ)
        // For repo readers - remember in books Z is like Axis of Sphere, but In Code it considers outside the screen (Spherical Coordinates); 
        points.push([radius * Math.cos(theta), 0, radius * Math.sin(theta)]);
    }
    return points;
};

// hsl to rgb
const getQSphereColor = (phase) => {

    const h = (((phase % (2 * Math.PI)) * (180 / Math.PI)) + 360) % 360;

    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = `hsl(${h}deg, 100%, 50%)`;
    const color = ctx.fillStyle;

    return color;

}

const QuantumLabel = ({ stateName, phaseAngle }) => {

    const displayPhase = Number((phaseAngle * (180 / Math.PI)).toFixed(2)) + "°"

    return (
        <div className='flex'>
            <p className="bg-gray-800/80 backdrop-blur-md text-white text-[10px]
     px-2 py-0.5 rounded-l-sm shadow-sm tracking-wider">
                |{stateName}⟩
            </p>
            <p className="bg-teal-600/40 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-r-sm shadow-sm tracking-wider">
                {displayPhase}
            </p>
        </div>
    )
}

const StateNode = ({ position, color, probabilitySize, stateName, phase }) => {

    const finalCoordinates = position.map((point) => point * QSphereRadii)
    const diminishedNodeRadius = probabilitySize * 0.3

    return (
        <group>
            <Line points={[[0, 0, 0], finalCoordinates]} color="#64748b" lineWidth={2} />

            <Sphere args={[diminishedNodeRadius, 100, 100]} position={finalCoordinates}>
                <meshStandardMaterial color={color}/>

                <Html distanceFactor={6} position={[0, diminishedNodeRadius + 0.2, 0]} center>
                    <QuantumLabel stateName={stateName} probability={probabilitySize} phaseAngle={phase} />
                </Html>

            </Sphere>

        </group>
    );
};


const QSphere = ({ nodesData }) => {

    const equatorPoints = generateEquatorPoints(QSphereRadii);

    return (
        <div className='bg-black/90 relative flex-1 flex flex-col h-full rounded-4xl
         shadow-[inset_0_4px_12px_rgba(0,0,0,0.9),0_8px_8px_-4px_rgba(0,0,0,0.7),0_2px_4px_rgba(255,255,255,0.03)] backdrop-blur-md'>

            <Canvas camera={{ position: [0, 1, 4] }}>

                <OrbitControls enableZoom={true} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 100, 10]} intensity={1} />

                <group>
                    <Sphere args={[QSphereRadii, 33, 33]}>
                        <meshBasicMaterial
                            color="#fff"
                            transparent
                            opacity={0.02}
                            wireframe
                        />
                    </Sphere>

                    <Line
                        points={equatorPoints}
                        color="gray"
                        lineWidth={1}
                        transparent
                        opacity={0.6}
                    />

                    <Sphere args={[0.02, 64, 64]} position={[0, 0, 0]}>
                        <meshBasicMaterial color={"#fff"} />
                    </Sphere>

                    {nodesData.map((node) => {

                        const color = getQSphereColor(node.phase)

                        return <StateNode
                            key={node.index}
                            position={node.coordinates}
                            probabilitySize={node.probability}
                            color={color}
                            stateName={node.stateName}
                            phase={node.phase}
                        />
                    }
                    )}
                </group>

            </Canvas>
        <div className='absolute bottom-4 right-4 flex items-center gap-2 text-white text-[10px] font-mono'>
        <img src={colorWheel} className='cursor-pointer opacity-10 w-24 hover:w-45 hover:opacity-100 transition-all duration-100'/>    
        </div>         
        </div>
    )
}

export default QSphere