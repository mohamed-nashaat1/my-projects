import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl md:text-2xl font-medium text-primary mb-2">Hello, I'm</h2>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Mohamed Nashat</h1>
          <h3 className="text-2xl md:text-3xl text-gray-500 dark:text-gray-400 mb-6">
            <span className="gradient-text">Front-End Developer</span>
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
            I build exceptional digital experiences that are fast, accessible, and visually stunning. Passionate about turning designs into interactive reality.
          </p>
          
          <div className="flex gap-4 mb-8">
            <Link to="projects" smooth={true} className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition cursor-pointer">
              View Projects
            </Link>
            <Link to="contact" smooth={true} className="px-8 py-3 border-2 border-primary text-primary dark:text-white rounded-full font-medium hover:bg-primary/10 transition cursor-pointer">
              Contact Me
            </Link>
          </div>

          <div className="flex gap-6 text-gray-600 dark:text-gray-400">
            {/* ✅ لينكاتك الحقيقية هنا */}
            <a href="https://github.com/mohamed-nashaat1" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition transform hover:scale-110">
              <Github size={28} />
            </a>
            <a href="https://www.linkedin.com/in/mohamed-nashaat-353177356" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition transform hover:scale-110">
              <Linkedin size={28} />
            </a>
            <a href="mailto:mohamed.ellboudyx@gmail.com" className="hover:text-primary transition transform hover:scale-110">
              <Mail size={28} />
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl relative">
            {/* ⚠️ متنساش تحط صورتك في public وتسميها avatar.png */}
            <img src="/assets/avatar.png" alt="Mohamed Nashat" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/400x400/6366f1/FFF?text=MN'} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
