"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react';

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
  // Add more projects as needed
];

const Portfolio: React.FC = () => {
  const [showNav, setShowNav] = useState<boolean>(false);
  const [showProjectsDropdown, setShowProjectsDropdown] = useState<boolean>(false);
  const { scrollY } = useScroll();
  const videoDim = useTransform(scrollY, [0, 300], [1, 0.2]);

  const projectRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientY <= 50 || showProjectsDropdown) {
        setShowNav(true);
      } else if (!showProjectsDropdown) {
        setShowNav(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setShowProjectsDropdown(false);
        if (event.clientY > 50) {
          setShowNav(false);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProjectsDropdown]);

  const scrollToProject = (projectId: string) => {
    const projectElement = projectRefs.current[projectId];
    if (projectElement) {
      projectElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
    setShowProjectsDropdown(false);
  };

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
        {projects.map((project, index) => (
          <div key={project.id} ref={(el) => (projectRefs.current[project.id] = el)}>
            <ProjectSection project={project} index={index} />
          </div>
        ))}
      </div>

      {/* Navbar */}
      <AnimatePresence>
        {showNav && (
          <motion.nav
            ref={navRef}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 z-20"
          >
            <ul className="flex justify-center space-x-6 items-center">
              <li><Button variant="link" className="text-white">Home</Button></li>
              <li><Button variant="link" className="text-white">About</Button></li>
              <li className="relative">
                <Button 
                  variant="link" 
                  className="text-white flex items-center"
                  onClick={() => setShowProjectsDropdown(!showProjectsDropdown)}
                >
                  Projects <ChevronDown className="ml-1" />
                </Button>
                {showProjectsDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {projects.map((project) => (
                        <a
                          key={project.id}
                          href={`#${project.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToProject(project.id);
                          }}
                        >
                          {project.title}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </li>
              <li><Button variant="link" className="text-white">Contact</Button></li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectSection: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
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
          <a href={project.link}>View Project</a>
        </Button>
      </div>
    </motion.div>
  );
};

export default Portfolio;