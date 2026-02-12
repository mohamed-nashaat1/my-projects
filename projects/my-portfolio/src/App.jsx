import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
// Skills, Footer, About ممكن تضيفهم بنفس الطريقة

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Check local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main>
        <Hero />
        {/* ممكن تضيف <Skills /> و <About /> هنا */}
        <Projects />
        <Contact />
      </main>

      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-200 dark:border-gray-800">
        <p>© {new Date().getFullYear()} Mohamed Nashat. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
