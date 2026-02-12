import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold gradient-text">Mohamed Nashat</h3>
          <p className="text-sm text-gray-500 mt-1">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        <div className="flex gap-6">

          <a href="https://github.com/mohamed-nashaat1" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition transform hover:scale-110">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/mohamed-nashaat-353177356" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition transform hover:scale-110">
            <Linkedin size={20} />
          </a>
          <a href="mailto:mohamed.ellboudyx@gmail.com" className="text-gray-500 hover:text-primary transition transform hover:scale-110">
            <Mail size={20} />
          </a>
        </div>

        <Link to="home" smooth={true} className="p-2 bg-primary/10 text-primary rounded-full cursor-pointer hover:bg-primary hover:text-white transition">
          <ArrowUp size={20} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
