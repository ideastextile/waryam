import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars, Text3D, Center } from '@react-three/drei';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import * as THREE from 'three';

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1.2, 100, 200]} scale={viewport.width > 4 ? 2.5 : 1.8}>
        <MeshDistortMaterial
          color="#4F46E5"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const particleCount = 2000;
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#06B6D4"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function BackgroundShapes() {
  const shapes = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? "#3B82F6" : "#06B6D4",
      speed: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  return (
    <>
      {shapes.map((shape) => (
        <Float 
          key={shape.id}
          speed={shape.speed} 
          rotationIntensity={0.5} 
          floatIntensity={0.8}
        >
          <mesh position={shape.position} scale={shape.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial 
              color={shape.color}
              transparent
              opacity={0.4}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function Hero3D() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: "back.out(1.7)" }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "-=0.7"
    )
    .fromTo(buttonsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.5"
    );
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/30 to-purple-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
      
      <div className="absolute inset-0">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <fog attach="fog" args={['#1e293b', 10, 50]} />
          
          {/* Enhanced lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
          <pointLight position={[-10, -10, -5]} intensity={0.8} color="#06B6D4" />
          <pointLight position={[10, -10, 5]} intensity={0.6} color="#3B82F6" />
          <spotLight position={[0, 10, 0]} intensity={0.5} color="#8B5CF6" />
          
          <Stars radius={300} depth={60} count={3000} factor={7} saturation={0} fade />
          <ParticleField />
          <FloatingGeometry />
          <BackgroundShapes />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
      
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div 
          className="text-center px-6 max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <motion.div
            className="mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-full border border-blue-400/30 text-blue-300 text-sm font-medium mb-8">
              ✨ Available for freelance projects
            </div>
          </motion.div>
          
          <h1 
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent leading-tight"
          >
            Muhammad Ahsan<br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Developer
            </span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Crafting <span className="text-cyan-400 font-semibold">immersive digital experiences</span> with 
            cutting-edge technology and <span className="text-blue-400 font-semibold">innovative design</span>
          </p>
          
          <motion.div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl font-semibold text-white shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 relative overflow-hidden"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
            
            <motion.button
              className="group px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl font-semibold text-white hover:bg-white/20 hover:border-white/30 transition-all duration-500"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="flex items-center gap-2">
                Get In Touch
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <div className="w-6 h-12 border-2 border-white/30 rounded-full flex justify-center relative overflow-hidden">
          <motion.div 
            className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mt-2"
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}