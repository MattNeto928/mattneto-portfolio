"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface Video {
  id: string;
  title: string;
}

const videos: Video[] = [
  { id: "tech_duke", title: "Tech Basketball" },
  { id: "pacific_program", title: "Pacific Program Recap" },
  { id: "kaka_point", title: "Kaka Point" },
  { id: "milford_sound", title: "Milford Sound" },
  { id: "wanaka", title: "Wanaka" },
  { id: "topgun", title: "Gold Coast Football"},
  { id: "north_stradbroke", title: "North Stradbroke Diving"},
  { id: "holi", title: "Sydney Holi Festival"},
];

const projects: Project[] = [
  {
    id: "sydney",
    title: "Sydney, Australia",
    description: "Aussie Aussie Aussie, Oi Oi Oi!",
    imageUrl: "/assets/images/sydney.jpg",
    link: "/sydney"
  },
  {
    id: "brisbane",
    title: "Brisbane, Australia",
    description: "Crikey!",
    imageUrl: "/assets/images/croc.jpg",
    link: "/brisbane"
  },
  {
    id: "nz",
    title: "New Zealand",
    description: "The land of the Kiwis!",
    imageUrl: "/assets/images/wanaka.jpg",
    link: "/newzealand"
  },
  {
    id: "bali",
    title: "Bali, Indonesia",
    description: "Explore the enriching culture found in Bali",
    imageUrl: "/assets/images/bali_rocks.jpg",
    link: "/bali"
  },
  {
    id: "rome",
    title: "Rome, Italy",
    description: "View the vast history found in Rome",
    imageUrl: "/assets/images/jesus.jpg",
    link: "/rome"
  },
  {
    id: "morocco",
    title: "Morocco",
    description: "Explore the Sahara Desert from the heart of Morocco",
    imageUrl: "/assets/images/morocco.jpg",
    link: "/morocco"
  }
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showNav, setShowNav] = useState<boolean>(false);
  const [showProjectsDropdown, setShowProjectsDropdown] = useState<boolean>(false);
  const [showVideosDropdown, setShowVideosDropdown] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientY <= 50) {
        setShowNav(true);
        setIsHovering(true);
      } else if (!showProjectsDropdown && !showVideosDropdown) {
        setShowNav(false);
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showProjectsDropdown, showVideosDropdown]);

  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, [pathname]);

  const handleVideographyClick = () => {
    setShowVideosDropdown(false);
    router.push('/videos');
  };

  const handleAdventuresClick = () => {
    setShowProjectsDropdown(false);
    if (pathname === '/') {
      const firstProject = projects[0];
      const element = document.getElementById(firstProject.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/#${projects[0].id}`);
    }
  };

  const handleVideoHover = () => {
    setShowVideosDropdown(true);
    setShowProjectsDropdown(false);
  };

  const handleProjectHover = () => {
    setShowProjectsDropdown(true);
    setShowVideosDropdown(false);
  };

  const scrollToVideo = (videoId: string) => {
    setShowVideosDropdown(false);
    if (pathname === '/videos') {
      const element = document.getElementById(videoId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/videos#${videoId}`);
    }
  };

  const scrollToProject = (projectId: string) => {
    setShowProjectsDropdown(false);
    if (pathname === '/') {
      const element = document.getElementById(projectId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/#${projectId}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-gray-950 text-white font-basker">
      <div className="fixed top-0 left-0 right-0 z-20">
        <motion.div 
          className="absolute top-0 left-0 right-0 flex justify-center items-start"
          initial={{ opacity: 1, y: 0 }}
          animate={{ 
            opacity: showNav ? 0 : 1,
            y: isHovering ? -100 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white bg-opacity-10 backdrop-blur-sm px-6 py-1 rounded-b-full flex items-center gap-2">
            <span className="text-white text-sm font-basker">Menu</span>
            <ChevronUp className="w-4 h-4 text-white" />
          </div>
        </motion.div>

        <AnimatePresence>
          {showNav && (
            <motion.nav
              ref={navRef}
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-black bg-opacity-70 backdrop-blur-sm text-white p-4"
            >
              <ul className="flex justify-center space-x-6 items-center">
                <li>
                  <Link href="/" passHref legacyBehavior>
                    <a onClick={handleHomeClick}>
                      <Button variant="link" className="text-white text-xl">Home</Button>
                    </a>
                  </Link>
                </li>
                <li className="relative group">
                  <div className="relative pt-2 pb-8 -mb-8">
                    <Button
                      variant="link"
                      className="text-white flex items-center text-xl"
                      onClick={handleVideographyClick}
                      onMouseEnter={handleVideoHover}
                    >
                      Videography <ChevronDown className="ml-1" />
                    </Button>
                  </div>
                  <AnimatePresence>
                    {showVideosDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        onMouseEnter={() => setShowVideosDropdown(true)}
                        onMouseLeave={() => setShowVideosDropdown(false)}
                      >
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          {videos.map((video) => (
                            <a
                              key={video.id}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                              role="menuitem"
                              onClick={() => scrollToVideo(video.id)}
                            >
                              {video.title}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
                <li className="relative group">
                  <div className="relative pt-2 pb-8 -mb-8">
                    <Button
                      variant="link"
                      className="text-white flex items-center text-xl"
                      onClick={handleAdventuresClick}
                      onMouseEnter={handleProjectHover}
                    >
                      Adventures <ChevronDown className="ml-1" />
                    </Button>
                  </div>
                  <AnimatePresence>
                    {showProjectsDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        onMouseEnter={() => setShowProjectsDropdown(true)}
                        onMouseLeave={() => setShowProjectsDropdown(false)}
                      >
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          {projects.map((project) => (
                            <a
                              key={project.id}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                              role="menuitem"
                              onClick={() => scrollToProject(project.id)}
                            >
                              {project.title}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
                <li>
                  <Link href="/contact" passHref legacyBehavior>
                    <Button variant="link" className="text-white text-xl">Contact</Button>
                  </Link>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
      {children}
    </div>
  );
};

export default Layout;