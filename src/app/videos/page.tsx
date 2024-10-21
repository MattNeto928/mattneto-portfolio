"use client"
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Video {
    id: string;
    title: string;
    youtubeId: string;
}

const videos: Video[] = [
    {
        id: "milford_sound",
        title: "Milford Sound",
        youtubeId: "LF32rNuRlfQ"
    },
    {
        id: "wanaka",
        title: "Wanaka",
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
        <div className="relative min-h-screen w-screen overflow-x-hidden bg-black text-white">
            {/* Hero Section */}
            <div className="h-screen flex flex-col items-center justify-center relative">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(/assets/images/gt_windbreaker.jpeg)` }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="relative z-10 text-center">
                    <h1 className="text-6xl font-bold mb-4 font-basker">Video Projects</h1>
                    <p className="text-xl font-light">Capturing moments around the world</p>
                </div>
            </div>

            {/* Video Sections */}
            {videos.map((video) => (
                <VideoSection key={video.id} {...video} />
            ))}
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
                className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-4">
                <div className="absolute inset-0 z-0 flex flex-col items-center justify-center">
                    <iframe
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-5/6 h-5/6 "
                    ></iframe>
                </div>
            </motion.div>
            <div className="relative z-10 w-full h-full flex flex-col items- justify-between bg-black bg-opacity-50">
                <h2 className="text-6xl font-serif text-center mb-24">{title}</h2>
            </div>
        </>
    );
};

export default VideosPage;