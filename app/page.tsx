/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef, useState } from "react";
import {
  Phone,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Globe,
  Download,
  Loader2,
  User,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export default function ResumeBuilder() {
  const componentRef = useRef<HTMLDivElement>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const [data, setData] = useState({
    name: "SAMIUL ISLAM",
    title: "Full Stack Developer",
    phone: "+8801601076098",
    email: "samiul.saad@gmail.com",
    linkedin: "linkedin.com/in/samiul-islam",
    github1: "github.com/samiul16",
    github2: "github.com/saad85",
    location: "Dhaka, Bangladesh",
    summary:
      "I am an experienced **Full Stack Developer** with **5+ years of experience** and a strong background in leading development teams and delivering successful projects. My core expertise is in **JavaScript, Node.js, Next.js, React.js** and its ecosystems, with additional experience in **Golang, Python, and AI system integration**.",
  });

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        "Next.js",
        "React.js",
        "Vue.js",
        "Tailwind CSS",
        "TypeScript",
        "Meteor.js",
      ],
    },
    {
      title: "Backend",
      skills: [
        "Node.js",
        "Express.js",
        "Golang",
        "Python",
        "GraphQL",
        "Rest API",
        "TDD",
        "Mocha",
      ],
    },
    {
      title: "AI & Specialized",
      skills: [
        "LangChain",
        "AI Chat bot implementation",
        "MCP server integration",
        "RAG Application",
      ],
    },
    {
      title: "Database & ORM",
      skills: [
        "PostgreSQL",
        "MongoDB",
        "Sequelize",
        "Mongoose",
        "Prisma",
        "Google APIs",
      ],
    },
    {
      title: "Deployment & DevOps",
      skills: [
        "Git",
        "Docker",
        "Linux",
        "AWS",
        "CI/CD",
        "Vercel",
        "Netlify",
        "Supabase",
        "VPS Deployment",
      ],
    },
  ];

  const experience = [
    {
      title: "Full Stack Developer",
      company: "MegaTecs",
      location: "Rajshahi, Bangladesh - Remote",
      link: "https://megatecs.com",
      period: "04/2025 - Present",
      bullets: [
        "Developing and delivering multiple frontend and backend products for global clients.",
        "Technologies: Next.js, React, Node.js, Express.js, PostgreSQL, Sequelize ORM, AWS Services.",
      ],
    },
    {
      title: "Back End Developer, Team Lead",
      company: "Gain Solutions Ltd",
      location: "Dhaka, Bangladesh - On-site",
      link: "https://gainhq.com/",
      period: "03/2021 - 01/2025",
      bullets: [
        "Led backend engineering teams, optimized database schemas and high-concurrency queries.",
        "Technologies: Node.js, Express.js, GraphQL, PostgreSQL, Sequelize ORM, AWS Services.",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Gain Solutions Ltd",
      location: "Dhaka, Bangladesh - On-site",
      link: "https://gainhq.com/",
      period: "01/2019 - 01/2021",
      bullets: [
        "Developed and maintained core functionalities using Vue.js and Meteor.js.",
        "Built and maintained key features for enterprise partner applications.",
      ],
    },
  ];

  const projects = [
    {
      name: "Payrun",
      period: "09/2023 - 01/2025",
      link: "https://local.payrun.app/",
      subtitle: "Modern HRM Application",
      details: [
        "Role: Senior Backend Developer. Led backend dev, DB optimization, and Large-Scale Data Importing.",
      ],
    },
    {
      name: "Easydesk",
      period: "09/2023 - 01/2025",
      subtitle: "Smart Ticketing Solution",
      details: [
        "Integrated 3rd party APIs and customized core modules for scalability.",
      ],
    },
    {
      name: "UniteLiving.com (V2)",
      period: "03/2023 - 08/2024",
      link: "https://uniteliving.com/",
      details: [
        "Contributed to core functionalities, Database design and API integrations in a large team.",
      ],
    },
    {
      name: "UniteLiving Partners (V2)",
      period: "03/2020 - 08/2023",
      subtitle: "Norwegian DTMS App",
      details: [
        "Developed system enhancements and key modules for the partner ecosystem.",
      ],
    },
    {
      name: "UniteLiving (V1)",
      period: "01/2019 - 03/2020",
      details: ["Full-stack developer role focusing on core engine stability."],
    },
    {
      name: "UniteLiving Partners (V1)",
      period: "01/2019 - 03/2020",
      details: [
        "Built the initial foundation for the partner application layer.",
      ],
    },
    {
      name: "AI-SmartSiteSense",
      period: "Personal - RAG",
      link: "https://ai-smart-site-sense-bgrn.vercel.app/",
      details: [
        "AI tool using next.js, upstash/vector, and LangChain to analyze webpage content.",
      ],
    },
    {
      name: "Medico",
      period: "Personal - Next.js",
      link: "https://github.com/saad85/Medico",
      details: [
        "Doctor Appointment booking platform built with React/Next.js.",
      ],
    },
  ];

  const downloadPDF = async () => {
    if (!componentRef.current) return;
    setIsDownloading(true);
    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pages = componentRef.current.querySelectorAll(".a4-page");
      for (let i = 0; i < pages.length; i++) {
        const canvas = await html2canvas(pages[i] as HTMLElement, {
          scale: 2, // Balanced for quality vs size
          useCORS: true,
          backgroundColor: "#ffffff",
        });
        const imgData = canvas.toDataURL("image/jpeg", 0.7); // JPEG 0.7 is key for small file size
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
      }
      pdf.save(`${data.name.replace(/\s+/g, "_")}_Resume.pdf`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  const renderRichText = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} className="text-black font-bold">
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-zinc-950 text-white font-sans">
      {/* EDITOR SIDEBAR */}
      <aside className="w-full lg:w-80 p-6 border-r border-zinc-800 bg-zinc-900 overflow-y-auto no-scrollbar">
        <h2 className="text-sm font-black mb-6 uppercase tracking-widest text-zinc-500">
          Developer Resume Builder
        </h2>

        <button
          onClick={downloadPDF}
          disabled={isDownloading}
          className="w-full mb-8 bg-white text-black hover:bg-zinc-200 py-3 rounded-md flex items-center justify-center gap-2 font-bold transition-all disabled:opacity-50"
        >
          {isDownloading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Download size={18} />
          )}
          {isDownloading ? "Compressing PDF..." : "Download Resume"}
        </button>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-3">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              {profileImg ? (
                <img
                  src={profileImg}
                  className="w-16 h-16 rounded-full object-cover"
                  alt="Preview"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                  <User size={20} />
                </div>
              )}
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (re) =>
                      setProfileImg(re.target?.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
                className="text-xs text-zinc-400 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-zinc-700 file:text-white cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-2">
              Professional Summary
            </label>
            <textarea
              value={data.summary}
              onChange={(e) => setData({ ...data, summary: e.target.value })}
              rows={8}
              className="w-full bg-zinc-800 border border-zinc-700 p-3 text-xs rounded focus:border-zinc-400 outline-none"
            />
          </div>
        </div>
      </aside>

      {/* PREVIEW AREA */}
      <main className="flex-1 bg-zinc-800 p-8 overflow-y-auto flex flex-col items-center">
        <div ref={componentRef} className="flex flex-col gap-8 shadow-2xl">
          {/* PAGE 1 */}
          <div className="a4-page bg-white text-black p-[12mm] flex flex-col">
            <header className="flex justify-between items-start border-b-2 border-black pb-6 mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-black tracking-tighter text-black uppercase">
                  {data.name}
                </h1>
                <p className="text-lg font-bold text-zinc-600 mb-4">
                  {data.title}
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-[9pt] font-semibold text-zinc-700">
                  <span className="flex items-center gap-1">
                    <Phone size={12} /> {data.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={12} /> {data.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {data.location}
                  </span>
                  <span className="flex items-center gap-1 underline">
                    <Linkedin size={12} /> {data.linkedin}
                  </span>
                  <span className="flex items-center gap-1 underline">
                    <Github size={12} /> {data.github1}
                  </span>
                </div>
              </div>
              {profileImg && (
                <div className="w-36 h-36 ml-4 rounded-full overflow-hidden">
                  <img
                    src={profileImg}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </header>

            <section className="mb-6">
              <h2 className="section-header">Professional Summary</h2>
              <p className="text-[10pt] leading-relaxed text-zinc-800 text-justify">
                {renderRichText(data.summary)}
              </p>
            </section>

            <section className="mb-6">
              <h2 className="section-header">Technical Skills</h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {skillCategories.map((cat, i) => (
                  <div key={i}>
                    <h4 className="text-[9pt] font-black uppercase text-zinc-500 mb-1 tracking-tight">
                      {cat.title}
                    </h4>
                    <p className="text-[10.5pt] text-gray-900 leading-tight">
                      {cat.skills.join(" • ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-2">
              <h2 className="section-header">Experience</h2>
              {experience.map((exp, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between font-black text-[11pt]">
                    <h3>{exp.title}</h3>
                    <span className="text-zinc-500">{exp.period}</span>
                  </div>
                  <p className="text-[10pt] font-bold italic text-zinc-600 mb-1">
                    {exp.company}
                  </p>
                  {exp.location && (
                    <p className="text-[9pt] text-zinc-500 mb-1">
                      {exp.location}
                    </p>
                  )}
                  {exp.link && (
                    <p className="text-[9pt] text-blue-600 mb-1">
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {exp.link}
                      </a>
                    </p>
                  )}
                  <ul className="list-disc ml-4 text-[9.5pt] text-zinc-800 space-y-0.5">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </div>

          {/* PAGE 2 */}
          <div className="a4-page bg-white text-black p-[12mm] flex flex-col">
            <section className="mb-6">
              <h2 className="section-header">Projects</h2>
              <div className="space-y-5">
                {projects.map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-[11pt] font-black">{p.name}</h3>
                      <span className="text-[9pt] font-bold text-zinc-400 italic">
                        {p.period}
                      </span>
                    </div>
                    {p.link && (
                      <p className="text-[8.5pt] text-zinc-500 font-bold flex items-center gap-1 underline mb-1">
                        <Globe size={10} /> {p.link}
                      </p>
                    )}
                    {p.subtitle && (
                      <p className="text-[9pt] font-bold text-zinc-700 italic">
                        {p.subtitle}
                      </p>
                    )}
                    <ul className="list-disc ml-4 text-[9.5pt] text-zinc-800">
                      {p.details.map((d, di) => (
                        <li key={di}>{d}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="section-header">Education</h2>
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-black text-[11pt]">
                    Bachelor of Computer Science & Engineering
                  </h3>
                  <p className="text-[10pt] font-bold text-zinc-600">
                    Ahsanullah University of Science and Technology
                  </p>
                </div>
                <span className="text-[9pt] font-bold text-zinc-400">
                  11/2013 - 05/2018
                </span>
              </div>
            </section>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .a4-page {
          width: 210mm;
          height: 297mm;
          overflow: hidden;
          page-break-after: always;
        }
        .section-header {
          font-size: 12pt;
          font-weight: 900;
          text-transform: uppercase;
          border-bottom: 1px solid #000;
          margin-bottom: 10px;
          padding-bottom: 2px;
          color: #000;
          letter-spacing: -0.02em;
        }
        @media print {
          .a4-page {
            box-shadow: none;
            margin: 0;
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
