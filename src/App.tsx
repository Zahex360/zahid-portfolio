import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Toaster, toast } from "sonner";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const submitContact = useMutation(api.contacts.submitContact);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      await submitContact({ name, email, message });
      toast.success("Message sent successfully!");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-blue-900 dark:text-blue-400">
              Zahid Alabadllah
            </div>
            <div className="hidden md:flex space-x-8">
              {[
                "home",
                "about",
                "projects",
                "experience",
                "education",
                "contact",
              ].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                    activeSection === section
                      ? "text-blue-600 dark:text-blue-400"
                      : ""
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-blue-900"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden shadow-2xl">
              <img
                src={`${import.meta.env.BASE_URL}Zahid.jpg`}
                alt="Zahid Alabadllah"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-blue-900 dark:text-blue-400">
            Zahid Alabadllah
          </h1>
          <h2 className="text-2xl md:text-3xl mb-6 text-gray-700 dark:text-gray-300">
            Cybersecurity Specialist & KFUPM Graduate
          </h2>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Driven by curiosity. Passionate about securing the digital world.
          </p>
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/Zahid_Alabadllah_CV.pdf";
              link.download = "Zahid_Alabadllah_CV.pdf";
              link.click();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Download CV
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-900 dark:text-blue-400">
            About Me
          </h2>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 shadow-lg">
            <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
              I'm Zahid, a 22-year-old Palestinian born in Saudi Arabia,
              passionate about cybersecurity, GRC (Governance, Risk, and
              Compliance), penetration testing, and high-performance computing.
              As a recent Computer Science graduate from KFUPM, I'm dedicated to
              building a career in cybersecurity and contributing to the
              protection of digital infrastructure.
            </p>
            <div className="text-center">
              <p className="text-2xl font-arabic text-blue-600 dark:text-blue-400 mb-2">
                اللهم زدني علما وعلمني ما ينفعني
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                "O Allah, increase me in knowledge and teach me what benefits
                me"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900 dark:text-blue-400">
          Projects
        </h2>
        <div className="overflow-x-auto px-4">
          <div className="flex gap-6 pb-4 scroll-smooth snap-x snap-mandatory overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100 dark:scrollbar-thumb-blue-600 dark:scrollbar-track-gray-800">
            {[
              {
                title: "Mustashark",
                description:
                  "A web platform that connects people seeking expert consultations with trusted mentors across various technical domains. I contributed to backend development, user session flow, and mentor matching logic. I also helped ensure secure handling of user consultation data.",
                icon: "🧠",
              },
              {
                title: "Secure Healthcare System",
                description:
                  "Capstone project focused on securing sensitive healthcare records. Implemented access control mechanisms, encrypted storage of patient data, and integrated activity logging to enhance accountability and privacy.",
                icon: "🏥",
              },
              {
                title: "Mini Autonomous Submarine",
                description:
                  "Collaborated with civil, mechanical, and electrical engineers to develop a smart underwater vehicle. My focus as a CS student was on AI-based decision logic for autonomous navigation, including obstacle avoidance, sensor data analysis, and real-time behavior adaptation.",
                icon: "🚢",
              },
              {
                title: "Personal Portfolio Website",
                description:
                  "This website you're browsing right now! Built with React and Tailwind, designed to present my background, projects, and contact details with a clean, responsive UI and dark mode support.",
                icon: "🌐",
              },
              {
                title: "+ More Projects",
                description: "Click to see what else is in the works!",
                icon: "➕",
                isInteractive: true,
              },
            ].map((project, index) => (
              <div
                key={index}
                onClick={() => {
                  if (project.isInteractive) {
                    toast("More projects to be added and elaborated soon.");
                  }
                }}
                className="snap-start shrink-0 w-[300px] lg:w-[340px] h-[420px] bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="text-4xl mb-4">{project.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-blue-900 dark:text-blue-400">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-900 dark:text-blue-400">
            Experience
          </h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-600 dark:bg-blue-400"></div>
            {[
              {
                title: "SOC Level 1 Training",
                organization: "TryHackMe",
                description:
                  "Comprehensive training in security operations center procedures, incident response, and threat detection.",
              },
              {
                title: "Mentorship Role",
                organization: "Cybersecurity Competition",
                description:
                  "Guided junior participants in cybersecurity challenges and shared knowledge in penetration testing techniques.",
              },
              {
                title: "University Coursework",
                organization: "KFUPM",
                description:
                  "Specialized courses in Data Privacy, Penetration Testing, and ISO Standards implementation.",
              },
            ].map((exp, index) => (
              <div key={index} className="relative pl-12 pb-8">
                <div className="absolute left-2 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full -translate-x-1/2"></div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-2 text-blue-900 dark:text-blue-400">
                    {exp.title}
                  </h3>
                  <p className="text-sm font-semibold mb-3 text-gray-600 dark:text-gray-400">
                    {exp.organization}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-900 dark:text-blue-400">
            Education
          </h2>
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-2 text-blue-900 dark:text-blue-400">
                B.Sc. in Computer Science
              </h3>
              <p className="text-sm font-semibold mb-3 text-gray-600 dark:text-gray-400">
                King Fahd University of Petroleum & Minerals (KFUPM), 2020 –
                2025
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Graduated with a concentration in Cybersecurity. Covered
                subjects such as Data Privacy, Penetration Testing, ISO
                Standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-900 dark:text-blue-400">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-blue-900 dark:text-blue-400">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📧</span>
                  <a
                    href="mailto:Zahid.Alabadllah@hotmail.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Zahid.Alabadllah@hotmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📱</span>
                  <a
                    href="tel:+966557067312"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    +966 55 706 7312
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💼</span>
                  <a
                    href="https://www.linkedin.com/in/zahid-alabadllah/"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    target="_blank"
                  >
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💻</span>
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    onClick={() => toast.info("GitHub profile coming soon!")}
                  >
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>
            <div>
              <form
                action="https://formspree.io/f/mvgqkkjv"
                method="POST"
                className="w-full max-w-xl space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>

                {/* 🔒 Disable Formspree’s CAPTCHA (optional) */}
                <input type="hidden" name="_captcha" value="false" />

                {/* 🛡️ Honeypot anti-spam field (hidden from real users) */}
                <input type="text" name="_gotcha" style={{ display: "none" }} />

                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 dark:bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg mb-2">Zahid Alabadllah</p>
          <p className="text-blue-200 dark:text-gray-400">
            Cybersecurity Specialist • KFUPM Graduate
          </p>
          <p className="text-sm text-blue-200 dark:text-gray-400 mt-4">
            © 2024 All rights reserved.
          </p>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}
