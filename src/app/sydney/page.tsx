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

const SydneyProject: React.FC = () => {
  const sections: Section[] = [
    {
      id: "opera-house",
      title: "Sydney Opera House",
      description: "An architectural marvel and UNESCO World Heritage site, the Sydney Opera House is Australia's most recognizable landmark. Its unique design by Jørn Utzon resembles billowing sails or shells.",
      imageUrl: "/assets/images/opera_house.jpg",
    },
    {
      id: "harbour-bridge",
      title: "Sydney Harbour Bridge",
      description: "Affectionately known as 'The Coathanger', the Sydney Harbour Bridge is both a vital transport link and a popular tourist attraction. Brave visitors can climb to its summit for panoramic views of the city.",
      imageUrl: "/assets/images/harbour_bridge.jpg",
    },
    {
      id: "darling-harbour",
      title: "Darling Harbour",
      description: "A lively waterside precinct, Darling Harbour is home to restaurants, museums, and entertainment venues. It's a perfect spot for a leisurely stroll or a night out in Sydney.",
      imageUrl: "/assets/images/darling_harbour.jpg",
    },
    {
      id: "holi",
      title: "Sydney Holi Festival",
      description: "A lively waterside precinct, Darling Harbour is home to restaurants, museums, and entertainment venues. It's a perfect spot for a leisurely stroll or a night out in Sydney.",
      imageUrl: "/assets/images/holi.jpg",
    },
  ];

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="h-screen flex flex-col items-center justify-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/assets/images/sydney_background.jpg)` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-4">Sydney, Australia</h1>
          <p className="text-xl font-light">Discover the beauty of the Harbour City</p>
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
          Learn More
        </Button>
      </div>
    </motion.div>
  );
};

export default SydneyProject;