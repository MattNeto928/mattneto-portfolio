"use client"
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AuroraBackground } from '@/components/ui/aurora-background';

interface Video {
  id: string;
  title: string;
  youtubeId: string;
}

const videos: Video[] = [
  {
    id: "tech_duke",
    title: "Georgia Tech vs. Duke Baseketball",
    youtubeId: "n0fEExNvJRs"
  },
  {
    id: "pacific_program",
    title: "Pacific Program Recap",
    youtubeId: "SEwn2nPUYN8"
  },
  {
    id: "kaka_point",
    title: "Kaka Point, New Zealand",
    youtubeId: "lYdnldnqAUo"
  },
  {
    id: "milford_sound",
    title: "Milford Sound, New Zealand",
    youtubeId: "LF32rNuRlfQ"
  },
  {
    id: "wanaka",
    title: "Wanaka, New Zealand",
    youtubeId: "lzFLL-kebR4"
  },
  {
    id: "topgun",
    title: "Gold Coast Football",
    youtubeId: "6QDmSWH6bco"
  },
  {
    id: "north_stradbroke",
    title: "North Stradbroke Diving",
    youtubeId: "0YzVvBvlsok"
  },
  {
    id: "holi",
    title: "Sydney Holi Festival",
    youtubeId: "hx8rZiHcdiA"
  },
];

const VideosPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [router]);

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden font-basker">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <AuroraBackground className="opacity-40" >
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }} />
        </AuroraBackground>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="h-screen flex flex-col items-center justify-center relative">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(/assets/images/gt_windbreaker.jpeg)` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 text-center text-white">
            <h1 className="text-6xl font-bold mb-4 font-basker">Video Projects</h1>
            <p className="text-xl font-light">Capturing moments around the world</p>
          </div>
        </div>

        {/* Video Sections */}
        {videos.map((video) => (
          <VideoSection key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
};

const VideoSection: React.FC<Video> = ({ id, title, youtubeId }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <>
      <motion.div
        id={id}
        ref={ref}
        style={{ opacity, scale }}
        className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-4"
      >
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-5/6 h-5/6"
          ></iframe>
        </div>
      </motion.div>
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between  bg-opacity-50">
        <h2 className="text-6xl font-serif text-center mb-24 text-white">{title}</h2>
      </div>
    </>
  );
};

export default VideosPage;