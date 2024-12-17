import React from 'react';

const skills = [
  'Python',
  'JavaScript',
  'Django',
  'React',
  'SQL',
  'MySQL',
  'MongoDB',
  'PostgreSQL',
  'Oracle',
  'TensorFlow',
  'Keras',
  'Scikit-learn',
  'Matplotlib',
  'Seaborn',
  'Git/GitHub',
  'AWS',
  'HTML',
  'CSS',
  'Java',
  'C++',
  'C'
];

const skillDots: { [key: string]: string } = {
  'Python': 'bg-blue-500',
  'JavaScript': 'bg-yellow-500',
  'Django': 'bg-green-500',
  'React': 'bg-cyan-500',
  'SQL': 'bg-purple-500',
  'MySQL': 'bg-red-500',
  'MongoDB': 'bg-teal-500',
  'PostgreSQL': 'bg-indigo-500',
  'Oracle': 'bg-orange-500',
  'TensorFlow': 'bg-pink-500',
  'Keras': 'bg-gray-500',
  'Scikit-learn': 'bg-lime-500',
  'Matplotlib': 'bg-rose-500',
  'Seaborn': 'bg-emerald-500',
  'Git/GitHub': 'bg-slate-500',
  'AWS': 'bg-amber-500',
  'HTML': 'bg-fuchsia-500',
  'CSS': 'bg-violet-500',
  'Java': 'bg-rose-600',
  'C++': 'bg-cyan-600',
  'C': 'bg-blue-600',
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Technical Skills</h2>
        <div className="max-w-4xl mx-auto mt-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full shadow-md hover:shadow-lg transition-shadow text-sm md:text-base"
              >
                <span className={`w-2.5 h-2.5 rounded-full mr-3 ${skillDots[skill]}`}></span>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}