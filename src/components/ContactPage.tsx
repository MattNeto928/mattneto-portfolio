"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Instagram, Mail } from 'lucide-react';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // such as sending the data to a server or API
    console.log('Form submitted:', { name, email, message });
    // Reset form fields
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen w-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-gray-900 p-8 rounded-lg shadow-xl"
      >
        <h1 className="text-4xl font-bold mb-6 text-center font-basker">Contact Me</h1>
        
        <div className="flex justify-center space-x-6 mb-8">
          <a href="mailto:mattneto928@gmail.com" className="flex items-center hover:text-gray-300 transition-colors">
            <Mail className="mr-2" />
            mattneto928@gmail.com
          </a>
          <a href="https://instagram.com/mattneto928" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gray-300 transition-colors">
            <Instagram className="mr-2" />
            @mattneto928
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2">Name</label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-gray-800 border-gray-700 focus:border-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-800 border-gray-700 focus:border-white"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2">Message</label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full bg-gray-800 border-gray-700 focus:border-white"
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full bg-white text-gray-900 hover:bg-gray-200">
            Send Message
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactPage;