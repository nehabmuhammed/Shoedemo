"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, OrbitControls, Center } from "@react-three/drei";

function ShoeModel() {
  const { scene } = useGLTF("/models/shoe.glb");
  const [scale, setScale] = React.useState(0.6);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScale(0.5); // Smaller on mobile
      } else {
        setScale(0.6);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Center position={[0, 0.4, 0]}>
      <primitive
        object={scene}
        scale={scale}
        rotation={[0, -0.4, 0]}
      />
    </Center>
  );
}

export default function Shoe3D() {
  return (
    <div className="w-full h-full cursor-grab -mt-10 sm:-mt-12 lg:-mt-14">
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 45 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-4, 3, -4]} intensity={0.5} />

        <Suspense fallback={null}>
          <ShoeModel />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -0.9, 0]}
            opacity={0.4}
            scale={6}
            blur={2.5}
            far={2}
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          rotateSpeed={0.6}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/shoe.glb");
