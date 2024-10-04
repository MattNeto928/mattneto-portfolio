"use client"

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from "@/components/ui/button"

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

const BrisbaneProject: React.FC = () => {
  const sections: Section[] = [
    {
      id: "south-bank",
      title: "City History",
      description: "Brisbane, originally inhabited by Indigenous Australians for over 40,000 years, was founded as a penal colony in 1824, evolving from a frontier outpost to Queensland's capital and Australia's third-largest city, known for its resilience in the face of floods and its transformation into a modern, cosmopolitan metropolis.",
      imageUrl: "/assets/images/brisbane_glow.jpg",
    },
    {
      id: "gold-coast-main-beach",
      title: "Gold Coast Main Beach",
      description: "Just an hour's drive from Brisbane, Gold Coast's Main Beach offers a perfect blend of surf, sand, and city vibes. Enjoy the golden sands, crystal-clear waters, and the iconic Q1 skyscraper backdrop. It's a haven for surfers, sunbathers, and beach lovers alike.",
      imageUrl: "/assets/images/gold_coast_main_beach.jpg",
    },
    {
      id: "lone-pine",
      title: "Lone Pine Koala Sanctuary",
      description: "Crikey! Get up close and personal with Australia's unique wildlife at the world's first and largest koala sanctuary. Cuddle a koala, hand-feed kangaroos, and marvel at the peculiar platypus.",
      imageUrl: "/assets/images/koala.jpg",
    },
    {
      id: "moreton-island",
      title: "Moreton Island Adventure",
      description: "Just a short ferry ride from Brisbane, Moreton Island offers pristine beaches, crystal clear waters, and thrilling activities. Go sand tobogganing down massive dunes or snorkel among shipwrecks teeming with marine life.",
      imageUrl: "/assets/images/moreton_island.jpg",
    },
  ];

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="h-screen flex flex-col items-center justify-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/assets/images/brisbane.jpg)` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-4">Brisbane, Australia</h1>
          <p className="text-xl font-light">Embark on a sun-soaked adventure in the River City</p>
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
        <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900">
          Explore More
        </Button>
      </div>
    </motion.div>
  );
};

export default BrisbaneProject;