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

const NewZealandProject: React.FC = () => {
  const sections: Section[] = [
    {
      id: "milford-sound",
      title: "Milford Sound (Te Anau)",
      description: "A breathtaking fjord in the southwest of New Zealand's South Island, Milford Sound is known for its towering Mitre Peak, rainforests, and waterfalls like Stirling and Bowen falls plummeting down its sheer sides.",
      imageUrl: "/assets/images/milford_sound.jpg",
    },
    {
      id: "queenstown",
      title: "Queenstown",
      description: "Nestled between the shores of Lake Wakatipu and the snowy peaks of the Remarkables, Queenstown is New Zealand's adventure capital, offering everything from bungee jumping and skiing to wine tasting and spa retreats.",
      imageUrl: "/assets/images/queenstown.jpg",
    },
    {
      id: "dunedin",
      title: "Dunedin",
      description: "Known as the 'Edinburgh of New Zealand', Dunedin charms with its unique blend of Scottish and Maori heritage, Victorian and Edwardian architecture, and proximity to the wildlife-rich Otago Peninsula.",
      imageUrl: "/assets/images/dunedin.jpg",
    },
    {
      id: "second-beach",
      title: "Second Beach",
      description: "Located in the Catlins region, Second Beach offers a secluded and pristine coastal experience, with dramatic cliffs, hidden caves, and the chance to spot native wildlife like sea lions and penguins.",
      imageUrl: "/assets/images/second_beach.jpg",
    },
    {
      id: "lake-tekapo",
      title: "Lake Tekapo",
      description: "Famous for its striking turquoise waters and surrounding snow-capped mountains, Lake Tekapo is part of a UNESCO Dark Sky Reserve, offering some of the clearest stargazing opportunities in the world.",
      imageUrl: "/assets/images/lake_tekapo.jpg",
    },
    {
      id: "wanaka",
      title: "Wanaka",
      description: "A resort town set against the pristine waters of Lake Wanaka, surrounded by mountains. It's famous for outdoor activities, the iconic Wanaka Tree, and as a gateway to Mount Aspiring National Park.",
      imageUrl: "/assets/images/wanaka.jpg",
    },
    {
      id: "kaka-point",
      title: "Kaka Point",
      description: "A small coastal settlement in the Catlins, Kaka Point offers rugged beauty, great surfing, and is a gateway to the Nugget Point Lighthouse and its spectacular views of rocky islets.",
      imageUrl: "/assets/images/kaka_point.jpg",
    },
    {
      id: "yellow-eyed-penguin",
      title: "Yellow-Eyed Penguin",
      description: "One of the world's rarest penguin species, the Yellow-Eyed Penguin or Hoiho can be spotted in various locations around the South Island, including the Otago Peninsula and the Catlins coast.",
      imageUrl: "/assets/images/yellow_eyed_penguin.jpg",
    },
  ];

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="h-screen flex flex-col items-center justify-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/assets/images/nz.jpg)` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-4">New Zealand</h1>
          <p className="text-xl font-light">Discover the breathtaking beauty of Aotearoa</p>
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

export default NewZealandProject;