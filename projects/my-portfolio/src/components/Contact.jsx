import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail } from 'lucide-react';
// import emailjs from '@emailjs/browser'; // فعل ده لما تجيب الـ Keys

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    
    // ⚠️ عشان تشغل الإيميل بجد، لازم تعمل حساب على EmailJS وتحط الـ Keys هنا
    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
    
    // محاكاة مؤقتة
    setTimeout(() => {
        setIsSent(true);
        e.target.reset();
        setTimeout(() => setIsSent(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold mb-4">Let's Work Together 🤝</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Have a project in mind? Let's build something amazing.</p>
          
          {/* ✅ إيميلك يظهر للناس عشان ينسخوه */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Mail size={16} />
            mohamed.ellboudyx@gmail.com
          </div>
        </motion.div>

        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Name</label>
              <input type="text" name="user_name" required className="p-3 rounded-lg bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary transition" placeholder="Your Name" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Email</label>
              <input type="email" name="user_email" required className="p-3 rounded-lg bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary transition" placeholder="example@gmail.com" />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Message</label>
            <textarea name="message" rows="5" required className="p-3 rounded-lg bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary transition" placeholder="Tell me about your project..."></textarea>
          </div>

          <button type="submit" className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition flex items-center justify-center gap-2">
            {isSent ? <><CheckCircle /> Sent Successfully!</> : <><Send size={20} /> Send Message</>}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
