import { Layout, GitBranch, Figma } from 'lucide-react';

export const projects = [
  {
    title: "SaaS Product Landing Page",
    desc: "Modern responsive landing page with pricing sections and hero banner.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    img: "/assets/saas.png",   
    github: "#", 
    live: "https://nashaat-saas.vercel.app/"    
  },
  {
    title: "Professional Weather App",
    desc: "Real-time weather dashboard with charts, maps, and dark mode.",
    tech: ["React", "OpenWeather API", "Recharts"],
    img: "/assets/weather.png",
    github: "#",
    live: "https://nashaat-weather-pro.vercel.app/"    
  },
  {
    title: "E-Commerce Website",
    desc: "Full-featured shop with cart logic, product filtering, and payment integration.",
    tech: ["React", "Context API", "LocalStorage"],
    img: "/assets/ecommerce.png",
    github: "#",
    live: "https://nashaat-ecommerce.vercel.app/" 
  },
  {
    title: "Sales Dashboard",
    desc: "Admin dashboard with data visualization, tables, and sidebar navigation.",
    tech: ["React", "Chart.js", "Tailwind"],
    img: "/assets/sales.png",
    github: "#",
    live: "https://nashaat-dashboard.vercel.app/" 
  },
  {
    title: "Restaurant Website",
    desc: "Elegant restaurant site with menu gallery, booking form, and animations.",
    tech: ["React", "Framer Motion", "EmailJS"],
    img: "/assets/restaurant.png",
    github: "#",
    live: "https://nashaat-restaurant.vercel.app/" 
  },
];

export const skills = [
  { name: "Frontend", icon: Layout, skills: ["HTML5", "CSS3", "JavaScript", "React", "TailwindCSS"] },
  { name: "Tools", icon: GitBranch, skills: ["Git", "GitHub", "VS Code", "Vite", "npm"] },
  { name: "Design", icon: Figma, skills: ["Figma", "Responsive Design", "UI/UX", "Animations"] },
];
