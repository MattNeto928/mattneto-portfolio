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

const BaliProject: React.FC = () => {
  const sections: Section[] = [
    {
      id: "monkey-forest",
      title: "Sacred Monkey Forest Sanctuary",
      description: "Explore this nature reserve and temple complex in Ubud, home to over 700 playful Balinese long-tailed monkeys. Walk through lush forests and ancient temples while observing these fascinating creatures in their natural habitat.",
      imageUrl: "/assets/images/monkey_forest.jpg",
    },
    {
      id: "bali-zoo",
      title: "Bali Zoo",
      description: "Get up close with exotic wildlife at the Bali Zoo. From Sumatran elephants to Bali starlings, experience interactive animal encounters and learn about conservation efforts in Indonesia.",
      imageUrl: "/assets/images/bali_zoo.jpg",
    },
    {
      id: "bali-swing",
      title: "Bali Swing",
      description: "Soar high above the jungle canopy on the famous Bali Swing. Enjoy breathtaking views of lush valleys and rice terraces as you swing into the tropical sky. It's an adrenaline rush with a stunning backdrop!",
      imageUrl: "/assets/images/bali_swing.jpg",
    },
    {
      id: "waterfalls",
      title: "Enchanting Waterfalls",
      description: "Discover Bali's hidden waterfalls, from the majestic Sekumpul to the serene Tibumana. Trek through tropical forests to find these natural wonders and take a refreshing dip in their crystal-clear pools.",
      imageUrl: "/assets/images/bali_waterfall.jpg",
    },
    {
      id: "rice-terrace",
      title: "Tegalalang Rice Terrace",
      description: "Marvel at the iconic Tegalalang Rice Terrace, a UNESCO World Heritage site. Witness the ancient Balinese cooperative irrigation system known as subak, creating a stunning landscape of cascading green rice paddies.",
      imageUrl: "/assets/images/rice_terrace.jpg",
    },
    {
      id: "mt-batur-sunrise",
      title: "Mt. Batur Sunrise Trek",
      description: "Embark on a pre-dawn hike up Mount Batur, an active volcano, to witness a spectacular sunrise over the island. The panoramic views of Lake Batur and surrounding mountains make the early start worthwhile.",
      imageUrl: "/assets/images/mt_batur.jpg",
    },
    {
      id: "temples",
      title: "Ancient Temples",
      description: "Explore Bali's spiritual side through its myriad temples. From the sea-facing Tanah Lot to the majestic Besakih Temple on Mount Agung, each offers a unique glimpse into Balinese Hindu culture and architecture.",
      imageUrl: "/assets/images/bali_temple.jpg",
    },
    {
      id: "ubud-culture",
      title: "Ubud Culture",
      description: "Immerse yourself in the cultural heart of Bali. Watch traditional dance performances, participate in cooking classes, or visit art galleries showcasing local talent. Ubud offers a deep dive into Balinese arts and traditions.",
      imageUrl: "/assets/images/bali_culture.jpg",
    },
  ];

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="h-screen flex flex-col items-center justify-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/assets/images/bali.jpg)` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-4">Bali, Indonesia</h1>
          <p className="text-xl font-light">Discover the Island of the Gods</p>
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

export default BaliProject;