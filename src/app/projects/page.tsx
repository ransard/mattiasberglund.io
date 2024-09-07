"use client";

import { useRef, Suspense } from "react";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

function ProjectLogo() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshStandardMaterial color="cyan" />
    </mesh>
  );
}

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
          >
            <ArrowLeft className="mr-2" />
            Back to Portfolio
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 opacity-0 animate-fade-in">
            Project: AI-Powered Task Manager
          </h1>
          <p className="text-xl text-gray-300 opacity-0 animate-fade-in animation-delay-300">
            A smart task management application leveraging artificial
            intelligence for enhanced productivity.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs
              defaultValue="overview"
              className="w-full opacity-0 animate-fade-in-up"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="tech">Tech Stack</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Project Overview
                  </h2>
                  <p className="text-gray-300 mb-4">
                    The AI-Powered Task Manager is a cutting-edge application
                    designed to revolutionize personal and team productivity. By
                    harnessing the power of artificial intelligence, this
                    project aims to provide users with smart task
                    prioritization, intelligent scheduling, and insightful
                    productivity analytics.
                  </p>
                  <p className="text-gray-300">
                    This project showcases the integration of modern web
                    technologies with AI capabilities, demonstrating the
                    potential of machine learning in everyday productivity
                    tools.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="features" className="mt-4">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        AI-driven Task Management
                      </AccordionTrigger>
                      <AccordionContent>
                        Utilizes machine learning algorithms to prioritize tasks
                        and suggest optimal scheduling based on user behavior
                        and preferences.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        Natural Language Processing
                      </AccordionTrigger>
                      <AccordionContent>
                        Implements NLP for intuitive task input and analysis,
                        allowing users to add tasks using natural language
                        commands.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Predictive Analytics</AccordionTrigger>
                      <AccordionContent>
                        Provides insightful productivity analytics and predicts
                        task completion times based on historical data and
                        current workload.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>
                        Cross-Platform Synchronization
                      </AccordionTrigger>
                      <AccordionContent>
                        Seamlessly syncs tasks and progress across web, iOS, and
                        Android platforms for a consistent user experience.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>
              <TabsContent value="tech" className="mt-4">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Technologies Used
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "Next.js",
                      "TypeScript",
                      "Node.js",
                      "Express",
                      "MongoDB",
                      "TensorFlow.js",
                      "Docker",
                      "AWS",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="md:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 mb-8 opacity-0 animate-fade-in-up">
              <h2 className="text-2xl font-semibold mb-4">Project Logo</h2>
              <div className="w-full h-64">
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <Suspense fallback={null}>
                    <ProjectLogo />
                    <OrbitControls enableZoom={false} />
                  </Suspense>
                </Canvas>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 opacity-0 animate-fade-in-up animation-delay-300">
              <h2 className="text-2xl font-semibold mb-4">Project Links</h2>
              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  <Github className="mr-2 h-4 w-4" /> View on GitHub
                </Button>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 opacity-0 animate-fade-in-up animation-delay-900">
          <h2 className="text-2xl font-semibold mb-4">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <img
                  src={`/placeholder.svg?height=200&width=300`}
                  alt={`Project screenshot ${index}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} John Doe. All rights reserved.
          </p>
        </div>
      </footer>

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

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-900 {
          animation-delay: 900ms;
        }
      `}</style>
    </div>
  );
}
