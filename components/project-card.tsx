import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const url = project.demo || project.github;
  const isExternal = url.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={url}
        className="project-card-wrapper"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="project-card">
          <div className="project-image-container">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="project-image"
            />
          </div>
          <div className="project-content">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
              {project.tech.map((tech, i) => (
                <span key={i} className="tech-badge">{tech}</span>
              ))}
            </div>
            <div className="project-links">
              {project.demo && (
                <div className="project-link-btn live-demo">
                  <ArrowUpRight size={16} />
                  <span>Live Demo</span>
                </div>
              )}
              {project.github && (
                <div className="project-link-btn">
                  <Github size={16} />
                  <span>GitHub</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    );
  } else {
    return (
      <Link href={url} className="project-card-wrapper">
        <div className="project-card">
          <div className="project-image-container">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="project-image"
            />
          </div>
          <div className="project-content">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
              {project.tech.map((tech, i) => (
                <span key={i} className="tech-badge">{tech}</span>
              ))}
            </div>
            <div className="project-links">
              {project.demo && (
                <div className="project-link-btn live-demo">
                  <ArrowUpRight size={16} />
                  <span>Live Demo</span>
                </div>
              )}
              {project.github && (
                <div className="project-link-btn">
                  <Github size={16} />
                  <span>GitHub</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
