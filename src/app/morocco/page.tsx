"use client"

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Section {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface ProjectSectionProps {
  title: string;
  description: string;
  imageUrl: string;
}

const MoroccoProject: React.FC = () => {
  const sections: Section[] = [
    {
      id: "",
      title: "",
      description: "",
      imageUrl: "/assets/images/goat.jpg",
    },
    {
        id: "",
        title: "",
        description: "",
        imageUrl: "/assets/images/camels.jpg",
    },
    {
        id: "",
        title: "",
        description: "",
        imageUrl: "/assets/images/scarf.jpg",
    },
    {
        id: "",
        title: "",
        description: "",
        imageUrl: "/assets/images/camels_desert.jpg",
    },
    {
        id: "",
        title: "",
        description: "",
        imageUrl: "/assets/images/camel_headshot.jpg",
    },
    {
        id: "",
        title: "",
        description: "",
        imageUrl: "/assets/images/camel_headshot2.jpg",
    },
    {
        id: "",
        title: "",
        description: "",
        imageUrl: "/assets/images/desert_camp.jpg",
    },
  ];

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="h-screen flex flex-col items-center justify-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/assets/images/morocco.jpg)` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-4">Morocco</h1>
          <p className="text-xl font-light">Land of the Berbers</p>
        </div>
      </div>

      {/* Project Sections */}
      {sections.map((section) => (
        <ProjectSection key={section.id} {...section} />
      ))}
    </div>
  );
};

const ProjectSection: React.FC<ProjectSectionProps> = ({ title, description, imageUrl }) => {
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
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-25" />
      <div className="relative z-10 max-w-4xl mx-auto p-8 text-white">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-xl mb-6">{description}</p>
      </div>
    </motion.div>
  );
};

export default MoroccoProject;