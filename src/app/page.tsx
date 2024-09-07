"use client";

import { useState, useRef, Suspense } from "react";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Cube() {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.2;
    mesh.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={hovered ? 1.1 : 1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function FloatingIcons() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t / 2) * 0.3;
    groupRef.current.position.y = Math.sin(t) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <Cube />
      <mesh position={[-1.5, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="cyan" />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial color="lime" />
      </mesh>
    </group>
  );
}

export default function HeroPage() {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-90 backdrop-blur-sm">
        <ul className="flex justify-center space-x-4 p-4">
          {["hero", "about", "projects"].map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(section)}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  activeSection === section ? "text-blue-400" : "text-gray-300"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section
        id="hero"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 opacity-0 animate-fade-in">
            Hello, I&apos;m Mattias Berglund
          </h1>
          <p className="text-xl text-gray-300 mb-8 opacity-0 animate-fade-in animation-delay-300">
            Tech Lead, Software Architect, Software Engineer, Innovator, Tech
            Enthusiast
          </p>
          <div className="flex justify-center space-x-4 mb-8 opacity-0 animate-fade-in animation-delay-600">
            <a
              href="https://github.com/ransard/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/mattias-k-berglund/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:mattias.k.berglund@gmail.com"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
          <div className="w-64 h-64 mx-auto mb-8 opacity-0 animate-fade-in animation-delay-900">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <FloatingIcons />
                <OrbitControls enableZoom={false} />
              </Suspense>
            </Canvas>
          </div>
          <div className="opacity-0 animate-fade-in animation-delay-1200">
            <ChevronDown
              className="w-8 h-8 mx-auto text-blue-400 animate-bounce cursor-pointer"
              onClick={() => scrollToSection("about")}
            />
          </div>
        </div>
      </section>

      <section
        id="about"
        className="min-h-screen flex items-center justify-center py-20"
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center opacity-0 animate-fade-in-up">
            About Me
          </h2>
          <p className="text-gray-300 mb-6 opacity-0 animate-fade-in-up animation-delay-300">
            I&apos;m a passionate full-stack developer with a keen eye for
            design. With over 5 years of experience in creating web
            applications, I specialize in React, Node.js, and modern CSS
            frameworks like Tailwind.
          </p>
          <p className="text-gray-300 opacity-0 animate-fade-in-up animation-delay-500">
            When I&apos;m not coding, you can find me exploring new
            technologies, contributing to open-source projects, or sharing my
            knowledge through blog posts and tutorials.
          </p>
        </div>
      </section>

      <section
        id="projects"
        className="min-h-screen flex items-center justify-center py-20"
      >
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center opacity-0 animate-fade-in-up">
            My Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((project) => (
              <div
                key={project}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${project * 200}ms` }}
              >
                <img
                  src={`/placeholder.svg?height=200&width=400`}
                  alt={`Project ${project}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Project {project}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    A brief description of project {project} and the
                    technologies used.
                  </p>
                  <a
                    href="/projects"
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-900 {
          animation-delay: 900ms;
        }

        .animation-delay-1200 {
          animation-delay: 1200ms;
        }
      `}</style>
    </div>
  );
}
