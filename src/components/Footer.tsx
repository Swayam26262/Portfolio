import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-white">Swayam Patil</h3>
            <p className="mt-2">Python Developer | AI Enthusiast</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com/swayam26262" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/swayampatil" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Twitter className="w-6 h-6" />
            </a> */}
            <a href="mailto:patilswayam96@gmail.com" className="hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Swayam Patil. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}