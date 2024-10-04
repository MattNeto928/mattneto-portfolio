"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

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
  }
];


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showNav, setShowNav] = useState<boolean>(false);
  const [showProjectsDropdown, setShowProjectsDropdown] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-gray-950 text-white">
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
              <li>
                <Link href="/" passHref legacyBehavior>
                  <a onClick={handleHomeClick}>
                    <Button variant="link" className="text-white text-xl">Home</Button>
                  </a>
                </Link>
              </li>
              <li className="relative">
                <Button
                  variant="link"
                  className="text-white flex items-center text-xl"
                  onClick={() => setShowProjectsDropdown(!showProjectsDropdown)}
                >
                  Adventures <ChevronDown className="ml-1" />
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

      {/* Page Content */}
      {children}
    </div>
  );
};

export default Layout;