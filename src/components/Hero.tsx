import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              Hi, I'm <span className="text-blue-600 dark:text-blue-400">Swayam Patil</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl text-gray-600 dark:text-gray-300">
              Software Developer | AI Enthusiast
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
            I am a Software Developer skilled in Django and React, with a strong passion for Artificial Intelligence and Machine Learning. I specialize in creating dynamic web applications and data-driven models, blending my technical expertise with a creative problem-solving approach. With experience in building robust projects like a feature-rich blog platform and an efficient film suggestion algorithm, I thrive on delivering innovative solutions to complex challenges.
            </p>
            <div className="flex space-x-4">
              <a href="https://drive.google.com/file/d/16vS7q1RhtppqeHG4boGr_m3CI2f2-DVO/view?usp=sharing" target="_blank" className="btn-primary">
                View Resume
              </a>
              <a href="#contact" className="btn-secondary">
                Contact Me
              </a>
            </div>
            <div className="flex space-x-6 ml-4">
              <a href="https://github.com/swayam26262" target="_blank" rel="noopener noreferrer" className="social-link">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/swayampatil" target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:patilswayam96@gmail.com" className="social-link">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute inset-0 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute inset-0 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <img
                src="https://media-hosting.imagekit.io/7cf08469e4b54b92/1741677476501.jpg?Expires=1838282048&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=d3Vcn7~O6R2xyVvugE5dJbRV1fDx95yO~z949cxy126McgRmlqoUzBcWjxTdOPb~vUW3mjODK~uZfm0ofQ8cTsrLZkIszuvkCO6lh~CxtFobrvZx3~9Z6ZhpXi2XnaSywsQfKUH4d9DV9I-ZNKx15UizQo7m7sCYgcyLESE7ohYyvYVYJEQ-rOJ~5PkeycKJZyf0E59RwUmkOqqsl0UZjSkwvhGed0TKzjA0XdlKStvYNkFN2Sa4eLrrLxFDyPNH-fM5p59YlckC3H2sc0BgptWAMn-gxZnsG2X2IFv9jw0SWnmiVtC67dnLVFKOTq8zgLTnBRxnSSqN44ISsfXZEg__  "
                alt="Developer"
                className="relative rounded-full w-96 h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}