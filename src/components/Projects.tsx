import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'YT2Notes',
    description: 'A web application that converts YouTube videos into organized study notes using AI summarization and Google OAuth for secure authentication.',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=1000',
    tech: ['Django', 'React', 'Tailwind CSS', 'Google API', 'AssemblyAI'],
    github: "https://github.com/Swayam26262/YT2Notes",
    demo: 'https://github.com/Swayam26262/YT2Notes'
  },
  {
    title: 'OAuth Notes App',
    description: 'A full-stack note-taking application with JWT-based authentication, dark mode, and responsive design built with Django REST Framework.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1000',
    tech: ['Django REST', 'React', 'JWT', 'Vite', 'Axios'],
    github: 'https://github.com/Swayam26262/django-oauth-NotesApp',
    demo: 'https://github.com/Swayam26262/django-oauth-NotesApp'
  },
  {
    title: 'SummarizeAI',
    description: 'An AI-powered web application that generates concise summaries for YouTube videos, enabling quick grasp of content.',
    image: 'https://i.imgur.com/wXadzjx.jpg',
    tech: ['Python', 'Django', 'PostgreSQL', 'Tailwind CSS'],
    github: "https://github.com/Swayam26262/ai_summarizer_app",
    demo: 'https://summarizeai-grcq.onrender.com/'
  },
  {
    title: 'Twitter Bot',
    description: 'An automated Twitter bot built with Python that engages with users, posts content, and analyzes trends on the platform.',
    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&q=80&w=1000',
    tech: ['Python', 'Twitter API', 'Tweepy', 'Data Analysis'],
    github: 'https://github.com/Swayam26262/Twitter-Bot',
    demo: 'https://github.com/Swayam26262/Twitter-Bot'
  },
  {
    title: 'EchoText',
    description: 'A text processing application that provides various transformation and analysis features for text content.',
    image: 'https://images.unsplash.com/photo-1541877944-ac82a091518a?auto=format&fit=crop&q=80&w=1000',
    tech: ['Python', 'NLP', 'Text Analysis', 'Flask'],
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
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href="https://github.com/Swayam26262"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            See More...
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ title, description, image, tech, github, demo }: {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <Github className="w-5 h-5" />
            <span>Code</span>
          </a>
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Demo</span>
          </a>
        </div>
      </div>
    </div>
  );
}