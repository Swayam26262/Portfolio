import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Experience & Education</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 max-w-4xl mx-auto">
          <div>
            <h3 className="flex items-center text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              <Briefcase className="w-6 h-6 mr-2" />
              Work Experience
            </h3>
            <div>
              <ExperienceCard
                title="AI Intern"
                company="Infosys"
                date="May, 2024 - July,2024"
                description="Developed and launched the BikeWatch application with helmet detection and bike occupancy features, enhancing user compliance and optimizing utilization. Integrated AWS S3 for efficient image storage, improved object detection accuracy using machine learning, and automated penalty calculations and notifications to streamline processes."
              />
            </div>
          </div>
          <div>
            <h3 className="flex items-center text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              <GraduationCap className="w-6 h-6 mr-2" />
              Education
            </h3>
            <div>
              <ExperienceCard
                title="BTech in Computer Science"
                company="Shivaji University"
                date="2021 - 2025"
                description="Pursuing a Bachelor of Technology in Computer Science and Technology at Shivaji University, Kolhapur, currently in the final year with a CGPA of 8.2 out of 10. The program provides a strong foundation in computer science, emphasizing software development and emerging technologies."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ title, company, date, description }: {
  title: string;
  company: string;
  date: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-blue-500 dark:text-blue-400 font-medium mt-1">{company}</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{date}</p>
      <p className="text-gray-600 dark:text-gray-300 mt-4">{description}</p>
    </div>
  );
}