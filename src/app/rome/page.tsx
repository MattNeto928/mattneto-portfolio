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

const RomeProject: React.FC = () => {
  const sections: Section[] = [
    {
      id: "colosseum",
      title: "The Colosseum",
      description: "An iconic symbol of Imperial Rome, the Colosseum is the largest ancient amphitheater ever built. This architectural marvel once hosted gladiatorial contests and public spectacles, and today stands as a testament to Roman engineering and culture.",
      imageUrl: "/assets/images/colosseum.jpg",
    },
    {
      id: "roman-forum",
      title: "Roman Forum",
      description: "The Roman Forum was the beating heart of ancient Rome, the city's main marketplace and civic center. Wander through the ruins of ancient government buildings, temples, and public spaces where the fate of the empire was once decided.",
      imageUrl: "/assets/images/roman_forum.jpg",
    },
    {
      id: "sistine-chapel",
      title: "Sistine Chapel",
      description: "Located in Vatican City, the Sistine Chapel is renowned for its breathtaking frescoes painted by Michelangelo. The chapel's ceiling, depicting scenes from the Old Testament, is considered one of the most significant works of Western art.",
      imageUrl: "/assets/images/sistine_chapel.jpg",
    },
    {
      id: "st-peters-basilica",
      title: "St. Peter's Basilica",
      description: "The world's largest church and center of the Catholic faith, St. Peter's Basilica is a masterpiece of Renaissance architecture. Its magnificent dome, designed by Michelangelo, dominates the Roman skyline.",
      imageUrl: "/assets/images/st_peters_basilica.jpg",
    },
    {
      id: "pantheon",
      title: "The Pantheon",
      description: "One of the best-preserved ancient Roman buildings, the Pantheon was originally built as a temple to all Roman gods. Its perfect proportions and the engineering feat of its massive dome continue to inspire architects to this day.",
      imageUrl: "/assets/images/pantheon.jpg",
    },
    {
        id: "spanish-steps",
        title: "The Spanish Steps",
        description: "The Spanish Steps, a monumental staircase of 135 steps, was built in the 18th century to connect the Piazza di Spagna at the base with the Trinità dei Monti church at the top. This elegant and grand staircase is not only an architectural marvel but also a popular gathering place for both locals and tourists. At the foot of the steps, you'll find the famous Barcaccia fountain, a Baroque masterpiece by Pietro Bernini.",
        imageUrl: "/assets/images/spanish_steps.jpg"
    },
  ];

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="h-screen flex flex-col items-center justify-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/assets/images/rome_landscape.jpg)` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-4">Rome, Italy</h1>
          <p className="text-xl font-light">Explore the Eternal City</p>
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

export default RomeProject;