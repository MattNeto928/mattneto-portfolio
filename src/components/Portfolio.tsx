"use client"

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from "@/components/ui/button"

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const projects: Project[] = [
  {
    id: "sydney",
    title: "Sydney, Australia",
    description: "Aussie Aussie Aussie, Oi Oi Oi!",
    imageUrl: "/assets/images/sydney.jpg",
    link: "/project1"
  },
  {
    id: "brisbane",
    title: "Brisbane, Australia",
    description: "Crikey!",
    imageUrl: "/assets/images/croc.jpg",
    link: "/project1"
  },
  {
    id: "nz",
    title: "New Zealand",
    description: "The land of the Kiwis!",
    imageUrl: "/assets/images/wanaka.jpg",
    link: "/project1"
  },
  {
    id: "bali",
    title: "Bali, Indonesia",
    description: "Explore the enriching culture found in Bali",
    imageUrl: "/assets/images/bali_rocks.jpg",
    link: "/project1"
  }
];

const Portfolio: React.FC = () => {
  const { scrollY } = useScroll();
  const videoDim = useTransform(scrollY, [0, 300], [1, 0.2]);

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-gray-950 text-white">
      {/* Video Background */}
      <motion.div style={{ opacity: videoDim }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover"
        >
          <source src="https://xxyyovnyzauqq4wo.public.blob.vercel-storage.com/tech-naAKnX5xi8rprSxS5M3dTUNUunW2fM.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-10">
        <div className="h-screen flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-white text-center font-basker">
            Matthew J. Neto
          </h1>
          <p className="pt-4 text-xl text-white text-center font-light font-basker">
            Photographer | Videographer | Engineer | Georgia Tech
          </p>
        </div>

        {/* Projects */}
        {projects.map((project) => (
          <div key={project.id} id={project.id}>
            <ProjectSection project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectSection: React.FC<{ project: Project }> = ({ project }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${project.imageUrl})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-25" />
      <div className="relative z-10 max-w-4xl mx-auto p-8 text-white">
        <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
        <p className="text-xl mb-6">{project.description}</p>
        <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900">
          <a href={project.link}>View Adventure</a>
        </Button>
      </div>
    </motion.div>
  );
};

export default Portfolio;