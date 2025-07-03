"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import "@/styles/social-icons.css"
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Code,
  Database,
  Brain,
  Smartphone,
  ChevronDown,
  Box,
  Cloud,
  Pen,
  Send,
  FileJson,
  Figma,
  Server,
  Cpu,
  Layers,
  Globe,
  Palette,
  Terminal,
  MonitorSmartphone,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Plus,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ScrollProgress } from "@/components/scroll-progress"

export default function SwayamPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const [activeSection, setActiveSection] = useState("home")
  const [isMobile, setIsMobile] = useState(false)
  const [activeSkillTab, setActiveSkillTab] = useState("languages")
  const [showAllProjects, setShowAllProjects] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Smooth scroll function
  const smoothScrollTo = useCallback((elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      const offsetTop = element.offsetTop - 80 // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }, [])

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Update active section based on scroll position
      const sections = ["home", "work", "about", "skills", "experience", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // Enhanced Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))

            // Add staggered animation to children
            const children = entry.target.querySelectorAll("[data-stagger]")
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("animate-in")
              }, index * 100)
            })
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "-50px 0px -50px 0px",
      },
    )

    // Observe all sections
    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => observerRef.current?.observe(section))

    // Set loaded state after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", checkMobile)
      observerRef.current?.disconnect()
      clearTimeout(timer)
    }
  }, [isMobile])

  const projects = [
  {
  title: 'FixMyResume',
  description: 'AI‑powered resume analyzer that provides real‑time feedback, job‑description matching, and beautifully exportable templates. Built with a Django + React stack secured by JWT authentication.',
  image: 'https://i.postimg.cc/kGzm21gQ/Screenshot-2025-06-30-202134.png',
  tech: ['Django', 'Django REST', 'PostgreSQL', 'React', 'Tailwind CSS', 'Vite', 'JWT'],
  github: 'https://github.com/Swayam26262/FixMyResume',
  demo: 'https://fix-my-resume.vercel.app'
  },
  {
    title: 'YT2Notes',
    description: 'A web application that converts YouTube videos into organized study notes using AI summarization and Google OAuth for secure authentication.',
    image: 'https://ik.imagekit.io/clttjxlvp/ytnotes.png?updatedAt=1751295756952',
    tech: ['Django', 'React', 'Tailwind CSS', 'Google API', 'AssemblyAI'],
    github: "https://github.com/Swayam26262/YT2Notes",
    demo: 'https://github.com/Swayam26262/YT2Notes'
  },
  {
    title: 'OAuth Notes App',
    description: 'A full-stack note-taking application with JWT-based authentication, dark mode, and responsive design built with Django REST Framework.',
    image: 'https://i.postimg.cc/wvWHpTKb/Screenshot-2025-06-30-205040.png',
    tech: ['Django REST', 'React', 'JWT', 'Vite', 'Axios'],
    github: 'https://github.com/Swayam26262/django-oauth-NotesApp',
    demo: 'https://github.com/Swayam26262/django-oauth-NotesApp'
  },
  {
    title: 'Twitter Bot',
    description: 'An automated Twitter bot built with Python that engages with users, posts content, and analyzes trends on the platform.',
    image: 'https://i.postimg.cc/Qd6RCYYH/Chat-GPT-Image-Jul-3-2025-08-13-40-PM.png',
    tech: ['Python', 'Twitter API', 'Tweepy', 'Data Analysis'],
    github: 'https://github.com/Swayam26262/Twitter-Bot',
    demo: 'https://github.com/Swayam26262/Twitter-Bot'
  },
  {
    title: 'EchoText',
    description: 'A text processing application that provides various transformation and analysis features for text content.',
    image: 'https://i.postimg.cc/qRB0S6F3/Screenshot-2025-07-01-193751.png',
    tech: ['JavaScript', 'CSS', 'HTML'],
    github: 'https://github.com/Swayam26262/EchoText',
    demo: 'https://github.com/Swayam26262/EchoText'
  },
  {
    title: 'Blogify',
    description: 'A full-featured blog web application allowing users to create, manage, and share blog posts.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000',
    tech: ['Django', 'SQLite', 'Tailwind CSS', 'Python'],
    github: 'https://github.com/Swayam26262/BlogApp-django',
    demo: 'https://github.com/Swayam26262/BlogApp-django'
  }
]

  const skillsData = {
    languages: [
      { name: "JavaScript", icon: Code, color: "#F7DF1E", bgColor: "rgba(247, 223, 30, 0.1)" },
      { name: "TypeScript", icon: FileJson, color: "#3178C6", bgColor: "rgba(49, 120, 198, 0.1)" },
      { name: "Python", icon: Terminal, color: "#3776AB", bgColor: "rgba(55, 118, 171, 0.1)" },
      { name: "HTML", icon: Globe, color: "#E34F26", bgColor: "rgba(227, 79, 38, 0.1)" },
      { name: "CSS", icon: Palette, color: "#1572B6", bgColor: "rgba(21, 114, 182, 0.1)" },
      { name: "SQL", icon: Database, color: "#4479A1", bgColor: "rgba(68, 121, 161, 0.1)" },
    ],
    frameworks: [
      { name: "React", icon: Layers, color: "#61DAFB", bgColor: "rgba(97, 218, 251, 0.1)" },
      { name: "Next.js", icon: Code, color: "#ffffff", bgColor: "rgba(255, 255, 255, 0.1)" },
      { name: "Django", icon: Server, color: "#092E20", bgColor: "rgba(9, 46, 32, 0.1)" },
      { name: "Express", icon: Server, color: "#ffffff", bgColor: "rgba(255, 255, 255, 0.1)" },
      { name: "TailwindCSS", icon: Palette, color: "#38B2AC", bgColor: "rgba(56, 178, 172, 0.1)" },
      { name: "Bootstrap", icon: Palette, color: "#7952B3", bgColor: "rgba(121, 82, 179, 0.1)" },
    ],
    databases: [
      { name: "PostgreSQL", icon: Database, color: "#336791", bgColor: "rgba(51, 103, 145, 0.1)" },
      { name: "MongoDB", icon: Database, color: "#47A248", bgColor: "rgba(71, 162, 72, 0.1)" },
      { name: "MySQL", icon: Database, color: "#4479A1", bgColor: "rgba(68, 121, 161, 0.1)" },
      { name: "SQLite", icon: Database, color: "#003B57", bgColor: "rgba(0, 59, 87, 0.1)" },
    ],
    tools: [
      { name: "Git", icon: Github, color: "#F05032", bgColor: "rgba(240, 80, 50, 0.1)" },
      { name: "AWS", icon: Cloud, color: "#FF9900", bgColor: "rgba(255, 153, 0, 0.1)" },
      { name: "Docker", icon: Box, color: "#2496ED", bgColor: "rgba(36, 150, 237, 0.1)" },
      { name: "Figma", icon: Figma, color: "#F24E1E", bgColor: "rgba(242, 78, 30, 0.1)" },
      { name: "VS Code", icon: Code, color: "#007ACC", bgColor: "rgba(0, 122, 204, 0.1)" },
      { name: "Postman", icon: Send, color: "#FF6C37", bgColor: "rgba(255, 108, 55, 0.1)" },
    ],
  }

  const timelineData = [
    {
      type: 'experience',
      title: 'AI Intern',
      organization: 'Infosys',
      period: 'May 2024 - July 2024',
      description: 'Developed and launched the BikeWatch application with helmet detection and bike occupancy features, enhancing user compliance and optimizing utilization. Integrated AWS S3 for efficient image storage, improved object detection accuracy using machine learning, and automated penalty calculations and notifications to streamline processes.',
      skills: ['Computer Vision', 'AWS', 'Machine Learning'],
      icon: Briefcase
    },
    {
      type: 'education',
      title: 'BTech in Computer Science',
      organization: 'Shivaji University',
      period: '2021 - 2025',
      description: 'Pursuing a Bachelor of Technology in Computer Science and Technology at Shivaji University, Kolhapur, currently in the final year with a CGPA of 8.2 out of 10. The program provides a strong foundation in computer science, emphasizing software development and emerging technologies.',
      skills: ['Computer Science', 'Software Development', 'Emerging Tech'],
      grade: 'CGPA: 8.2/10',
      icon: GraduationCap
    }
  ]

  const navItems = [
    { name: "WORK", href: "work" },
    { name: "ABOUT", href: "about" },
    { name: "SKILLS", href: "skills" },
    { name: "EXPERIENCE", href: "experience" },
    { name: "CONTACT", href: "contact" },
  ]

  // Get projects to display based on showAllProjects state
  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3)
  const hasMoreProjects = projects.length > 3

  return (
    <div
      className={`min-h-screen bg-zinc-950 text-white overflow-x-hidden transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      style={{ scrollBehavior: "smooth" }}
    >
      <SmoothScroll />
      <ScrollProgress />

      {/* Enhanced Custom Cursor - Desktop Only */}
      {!isMobile && (
        <div
          className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
            transform: `scale(${isMenuOpen ? 2 : 1})`,
          }}
        />
      )}

      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:50px_50px] animate-pulse" />
      </div>

      {/* Floating Particles - Reduced on Mobile */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(isMobile ? 10 : 20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <button
              onClick={() => smoothScrollTo("home")}
              className="text-xl sm:text-2xl font-light tracking-wider hover:text-zinc-300 transition-all duration-500 transform hover:scale-105"
            >
              SWAYAM PATIL
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => smoothScrollTo(item.href)}
                  className={`text-sm tracking-wide transition-all duration-500 relative group ${
                    activeSection === item.href ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? "translateY(0)" : "translateY(-20px)",
                  }}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-500 ${
                      activeSection === item.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-full blur-sm" />
                </button>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-700 text-white hover:bg-white hover:text-zinc-950 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
                asChild
              >
                <Link href="https://drive.google.com/file/d/1P1EvdPLFmHG16GUYRoAI6XvwXH_ZdRf8/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4 text-black" />
                  <span className="text-black">RESUME</span>
                </Link>
              </Button>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden transition-all duration-300 hover:scale-110 hover:bg-zinc-800 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-1 left-0 w-6 h-0.5 bg-white transition-all duration-500 ${isMenuOpen ? "rotate-45 top-3" : ""}`}
                />
                <span
                  className={`absolute top-3 left-0 w-6 h-0.5 bg-white transition-all duration-500 ${isMenuOpen ? "opacity-0 scale-0" : ""}`}
                />
                <span
                  className={`absolute top-5 left-0 w-6 h-0.5 bg-white transition-all duration-500 ${isMenuOpen ? "-rotate-45 top-3" : ""}`}
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/50 transition-all duration-700 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
        >
          <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-6">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => {
                  smoothScrollTo(item.href)
                  setIsMenuOpen(false)
                }}
                className={`block w-full text-left text-lg tracking-wide transition-all duration-500 hover:translate-x-4 hover:scale-105 ${
                  activeSection === item.href ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateX(0)" : "translateX(-20px)",
                }}
              >
                {item.name}
              </button>
            ))}
            <Button
              variant="outline"
              className="border-zinc-700 text-white hover:bg-white hover:text-zinc-950 transition-all duration-500 hover:scale-105 w-full sm:w-auto"
              asChild
            >
              <Link href="https://drive.google.com/file/d/1P1EvdPLFmHG16GUYRoAI6XvwXH_ZdRf8/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4 text-black" />
                  <span className="text-black">RESUME</span>
                </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
        data-animate
      >
        {/* Dynamic Background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black transition-transform duration-1000"
          style={{
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0002})`,
          }}
        />

        {/* Animated Geometric Shapes - Reduced on Mobile */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(isMobile ? 4 : 8)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-10 animate-spin-slow"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + i * 8}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${20 + i * 5}s`,
              }}
            >
              <div className="w-2 h-2 bg-white transform rotate-45" />
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight tracking-tighter leading-none">
                <span
                  className="inline-block animate-slide-up-delayed opacity-0"
                  style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
                  data-stagger
                >
                  SOFTWARE
                </span>
                <br />
                <span
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-500 animate-slide-up-delayed opacity-0"
                  style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
                  data-stagger
                >
                  DEVELOPER
                </span>
                <br />
              </h1>
              <p
                className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-4xl mx-auto font-light leading-relaxed animate-fade-in-delayed opacity-0 px-4"
                style={{ animationDelay: "1.1s", animationFillMode: "forwards" }}
                data-stagger
              >
                I am a Software Developer skilled in <span className="text-white font-medium">Django</span> and{" "}
                <span className="text-white font-medium">React</span>, with a strong passion for{" "}
                <span className="text-white font-medium">Artificial Intelligence</span> and{" "}
                <span className="text-white font-medium">Machine Learning</span>. I specialize in creating dynamic web
                applications and data-driven models.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 sm:pt-8 animate-fade-in-delayed opacity-0 px-4"
              style={{ animationDelay: "1.3s", animationFillMode: "forwards" }}
              data-stagger
            >
              <Button
                size="lg"
                className="bg-white text-zinc-950 hover:bg-zinc-200 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium tracking-wide group transition-all duration-500 hover:scale-105 sm:hover:scale-110 hover:shadow-2xl hover:shadow-white/20 w-full sm:w-auto"
                onClick={() => smoothScrollTo("work")}
              >
                EXPLORE WORK
                <ArrowRight className="ml-2 sm:ml-3 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-2 transition-transform duration-500" />
              </Button>
              <ul className="social-icons-list">
                {[
                  { icon: Github, href: "https://github.com/Swayam26262", title: "GitHub", social: "github" },
                  { icon: Linkedin, href: "https://linkedin.com/in/swayampatil", title: "LinkedIn", social: "linkedin" },
                  { icon: Mail, href: "mailto:patilswayam96@gmail.com", title: "patilswayam96@gmail.com", social: "mail" },
                ].map(({ icon: Icon, href, title, social }, index) => (
                  <li key={index} className="icon-content">
                    <a 
                      href={href}
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={title}
                      data-social={social}
                    >
                      <div className="filled"></div>
                      <Icon className="h-6 w-6" />
                    </a>
                    <div className="tooltip">{title}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <button
          onClick={() => smoothScrollTo("work")}
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow group"
        >
          <div className="flex flex-col items-center space-y-2 group-hover:scale-110 transition-transform duration-300">
            <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-white via-white/50 to-transparent"></div>
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
          </div>
        </button>
      </section>

      {/* Simplified Work Section with Show More */}
      <section id="work" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8" data-animate>
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${visibleElements.has("work") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tighter mb-4 sm:mb-6"
              data-stagger
            >
              SELECTED WORK
            </h2>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto font-light px-4" data-stagger>
              A curated collection of projects showcasing full-stack development and AI integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedProjects.map((project, index) => (
              <div
                key={index}
                className={`group transition-all duration-1000 ${visibleElements.has("work") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                data-stagger
              >
                <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-white/5 overflow-hidden h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={225}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-3">
                      <h3
  className="text-xl font-medium text-zinc-200 group-hover:text-zinc-300 transition-colors duration-300"
>
  {project.title}
</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all duration-300 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="bg-zinc-800 text-zinc-300 text-xs"
                        >
                          +{project.tech.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Link
                        href={project.demo}
                        className="flex items-center text-sm text-zinc-400 hover:text-white transition-colors duration-300 group/link"
                      >
                        <span className="mr-2">View Project</span>
                        <ExternalLink className="h-3 w-3 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                      </Link>
                      <Link
                        href={project.github}
                        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Show More Button - Fixed Colors */}
          {hasMoreProjects && (
            <div className="text-center mt-12 sm:mt-16">
              <Button
                onClick={() => setShowAllProjects(!showAllProjects)}
                variant="ghost"
                size="lg"
                className={`bg-zinc-800/50 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white hover:border-zinc-600 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-white/10 group px-6 py-3 ${visibleElements.has("work") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: "600ms" }}
              >
                {showAllProjects ? (
                  <>
                    Show Less
                    <ChevronDown className="ml-2 h-4 w-4 rotate-180 group-hover:translate-y-1 transition-transform duration-300" />
                  </>
                ) : (
                  <>
                    Show More Projects
                    <Plus className="ml-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-900/50" data-animate>
        <div className="max-w-7xl mx-auto">
          <div
            className={`grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center transition-all duration-1000 ${visibleElements.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="space-y-6 sm:space-y-8">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tighter"
                data-stagger
              >
                ABOUT
              </h2>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-zinc-300 leading-relaxed" data-stagger>
                <p>
                  I am a Software Developer skilled in Django and React, with a strong passion for Artificial
                  Intelligence and Machine Learning.
                </p>
                <p>
                  I specialize in creating dynamic web applications and data-driven models, blending my technical
                  expertise with a creative problem-solving approach. With experience in building robust projects like a
                  feature-rich blog platform and an efficient film suggestion algorithm, I thrive on delivering
                  innovative solutions to complex challenges.
                </p>
                <p>
                  Outside of work, I explore AI trends, tackle LeetCode challenges, and analyze datasets on Kaggle. I'm
                  always excited to learn new technologies and collaborate on innovative projects.
                </p>
              </div>

              <div className="flex items-center space-x-3 text-zinc-400" data-stagger>
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="tracking-wide text-sm sm:text-base">Maharashtra, India</span>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div
                className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden bg-zinc-800 hover:shadow-2xl hover:shadow-white/10 transition-all duration-700 transform hover:scale-105"
                data-stagger
              >
                <Image
                  src="https://ik.imagekit.io/clttjxlvp/myimg.png?updatedAt=1751296015995"
                  alt="Swayam Patil"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-1000"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {[
                  { icon: Code, title: "Full Stack", desc: "Development" },
                  { icon: Brain, title: "AI & ML", desc: "Integration" },
                  { icon: Database, title: "Database", desc: "Design" },
                  { icon: Smartphone, title: "Responsive", desc: "Design" },
                ].map(({ icon: Icon, title, desc }, index) => (
                  <Card
                    key={title}
                    className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 transition-all duration-500 hover:scale-105 sm:hover:scale-110 hover:rotate-3 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    data-stagger
                  >
                    <CardContent className="p-4 sm:p-6 text-center">
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-zinc-400 group-hover:text-white transition-colors duration-500" />
                      <div className="text-xs sm:text-sm font-medium">{title}</div>
                      <div className="text-xs text-zinc-400">{desc}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section with Devicon */}
      <section id="skills" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8" data-animate>
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${visibleElements.has("skills") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tighter mb-4 sm:mb-6"
              data-stagger
            >
              TECHNICAL SKILLS
            </h2>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto font-light px-4" data-stagger>
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className={`transition-all duration-1000 ${visibleElements.has("skills") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* Skills Content - Devicon Implementation */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10">
              {[
                { name: "Python", icon: "devicon-python-plain" },
                { name: "JavaScript", icon: "devicon-javascript-plain" },
                { name: "Django", icon: "devicon-django-plain" },
                { name: "React", icon: "devicon-react-original" },
                { name: "SQL", icon: "devicon-mysql-plain" },
                { name: "MongoDB", icon: "devicon-mongodb-plain" },
                { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
                { name: "Oracle", icon: "devicon-oracle-original" },
                { name: "TensorFlow", icon: "devicon-tensorflow-original" },
                { name: "Keras", icon: "devicon-keras-plain" },
                { name: "Scikit-learn", icon: "devicon-scikitlearn-plain" },
                { name: "Matplotlib", icon: "devicon-matplotlib-plain" },
                { name: "Git/GitHub", icon: "devicon-github-original" },
                { name: "HTML", icon: "devicon-html5-plain" },
                { name: "CSS", icon: "devicon-css3-plain" },
                { name: "Java", icon: "devicon-java-plain" },
                { name: "C++", icon: "devicon-cplusplus-plain" },
                { name: "C", icon: "devicon-c-plain" },
                { name: "Tailwind", icon: "devicon-tailwindcss-plain" },
                { name: "Node.js", icon: "devicon-nodejs-plain" }
              ].map((skill, index) => (
                <div 
                  key={skill.name}
                  className={`group relative flex flex-col items-center justify-center p-4 sm:p-5 bg-zinc-900/30 hover:bg-zinc-800/50 border border-zinc-800 rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-white/10 ${visibleElements.has("skills") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${index * 30}ms` }}
                  data-stagger
                >
                  <i className={`${skill.icon} colored text-3xl sm:text-4xl md:text-5xl transition-all duration-500 group-hover:scale-110 filter group-hover:brightness-110`}></i>
                  
                  {/* Skill name tooltip that appears on hover - positioned with more space */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white text-xs sm:text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-20">
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Combined Experience & Education Timeline */}
      <section id="experience" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-900/50" data-animate>
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${visibleElements.has("experience") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tighter mb-4 sm:mb-6"
              data-stagger
            >
              JOURNEY
            </h2>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto font-light px-4" data-stagger>
              My professional experience and educational background
            </p>
          </div>

          <div className={`transition-all duration-1000 ${visibleElements.has("experience") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="relative max-w-4xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-white via-zinc-600 to-zinc-800"></div>
              
              {timelineData.map((item, index) => (
                <div key={index} className="relative mb-12 sm:mb-16 last:mb-0">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} items-start`}>
                    {/* Timeline Dot with Icon */}
                    <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-12 h-12 rounded-full bg-zinc-900 border-2 border-white shadow-lg flex items-center justify-center z-10">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Content Card */}
                    <div className={`ml-20 sm:ml-0 ${index % 2 === 0 ? 'sm:mr-auto sm:pr-12' : 'sm:ml-auto sm:pl-12'} sm:w-1/2 group`}>
                      <Card className="bg-zinc-800/30 hover:bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 rounded-xl p-6 sm:p-8 transition-all duration-500 hover:shadow-lg hover:shadow-white/5 hover:scale-105">
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant="outline" 
                                  className={`border-zinc-600 text-xs ${
                                    item.type === 'experience' 
                                      ? 'text-blue-400 border-blue-400/50' 
                                      : 'text-green-400 border-green-400/50'
                                  }`}
                                >
                                  {item.type === 'experience' ? 'EXPERIENCE' : 'EDUCATION'}
                                </Badge>
                                {item.grade && (
                                  <Badge className="bg-zinc-700 text-zinc-300 text-xs">
                                    {item.grade}
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-xl sm:text-2xl font-medium text-white group-hover:text-zinc-200 transition-colors duration-300">
                                {item.title}
                              </h3>
                              <p className="text-zinc-400 text-sm sm:text-base font-medium">
                                {item.organization}
                              </p>
                            </div>
                          </div>
                          
                          {/* Period */}
                          <Badge variant="outline" className="border-zinc-600 text-zinc-400 w-fit">
                            {item.period}
                          </Badge>
                          
                          {/* Description */}
                          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                            {item.description}
                          </p>
                          
                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {item.skills.map((skill, skillIndex) => (
                              <Badge 
                                key={skillIndex}
                                className="bg-zinc-700 text-zinc-300 hover:bg-zinc-600 transition-all duration-300 text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8" data-animate>
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`space-y-6 sm:space-y-8 mb-12 sm:mb-16 transition-all duration-1000 ${visibleElements.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tighter px-4"
              data-stagger
            >
              LET'S CREATE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
                SOMETHING AMAZING
              </span>
            </h2>
            <p
              className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed px-4"
              data-stagger
            >
              Ready to bring your ideas to life? Let's discuss your project and explore the possibilities of modern web
              development and AI integration.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 transition-all duration-1000 delay-300 ${visibleElements.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {[
              { icon: Mail, title: "Email", value: "patilswayam96@gmail.com", href: "mailto:patilswayam96@gmail.com" },
              {
                icon: Github,
                title: "GitHub",
                value: "github.com/Swayam26262",
                href: "https://github.com/Swayam26262",
              },
              { icon: Linkedin, title: "LinkedIn", value: "Connect with me", href: "https://www.linkedin.com/in/swayampatil/" },
            ].map(({ icon: Icon, title, value, href }, index) => (
              <Card
                key={title}
                className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 transition-all duration-500 hover:scale-105 sm:hover:scale-110 hover:rotate-3 group"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-stagger
              >
                <CardContent className="p-6 sm:p-8 space-y-3 sm:space-y-4">
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-zinc-400 group-hover:text-white transition-all duration-500 group-hover:scale-125" />
                  <div>
                    <div className="font-medium mb-1 text-sm sm:text-base">{title}</div>
                    <Link
                      href={href}
                      className="text-zinc-400 hover:text-white transition-colors duration-500 text-xs sm:text-sm break-all"
                    >
                      {value}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            size="lg"
            className={`bg-white text-zinc-950 hover:bg-zinc-200 px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-medium tracking-wide group transition-all duration-500 hover:scale-105 sm:hover:scale-110 hover:shadow-2xl hover:shadow-white/20 w-full sm:w-auto ${visibleElements.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "600ms" }}
            asChild
            data-stagger
          >
            <Link href="mailto:patilswayam96@gmail.com">
              <Mail className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              START A PROJECT
              <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-3 transition-transform duration-500" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-zinc-800 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-zinc-400 text-sm sm:text-base">© 2025 Swayam Patil. All rights reserved.</div>
            <div className="flex items-center space-x-6 sm:space-x-8">
              <Link
                href="work"
                className="text-zinc-400 hover:text-white transition-all duration-500 text-xs sm:text-sm tracking-wide hover:scale-110"
              >
                WORK
              </Link>
              <Link
                href="about"
                className="text-zinc-400 hover:text-white transition-all duration-500 text-xs sm:text-sm tracking-wide hover:scale-110"
              >
                ABOUT
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fade-in-delayed {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up-delayed {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in-delayed {
          animation: fade-in-delayed 1s ease-out forwards;
        }
        
        .animate-slide-up-delayed {
          animation: slide-up-delayed 1s ease-out forwards;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        /* Smooth scrolling for all browsers */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #18181b;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #52525b;
        }
        
        /* Mobile touch improvements */
        @media (max-width: 768px) {
          * {
            -webkit-tap-highlight-color: transparent;
          }
          
          button, a {
            touch-action: manipulation;
          }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}