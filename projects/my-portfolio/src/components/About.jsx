import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-6"><span className="gradient-text">About Me</span></h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            I am a passionate <span className="text-primary font-bold">Front-End Developer</span> and a <span className="text-secondary font-bold">Computer Science student</span>. 
            I specialize in building responsive, user-friendly websites using modern technologies like React, TailwindCSS, and JavaScript.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            My journey started with a curiosity for how websites work, which turned into a career goal of becoming a 
            Full Stack Developer. I love solving complex problems and turning creative designs into high-performance code.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass p-8 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 z-0"></div>
          <pre className="relative z-10 text-sm md:text-base text-gray-800 dark:text-gray-200 font-mono overflow-x-auto">
            <code>
{`const developer = {
  name: "Mohamed Nashat",
  role: "Front-End Developer",
  education: "Computer Science Student",
  skills: ["React", "Tailwind", "JS"],
  passion: "Building Web Apps",
  status: "Ready for Work 🚀"
};`}
            </code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
