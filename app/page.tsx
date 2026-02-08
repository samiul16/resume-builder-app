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
  Upload,
  Calendar,
  Loader2,
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
    linkedin: "https://linkedin.com/in/samiul-islam",
    github1: "https://github.com/samiul16",
    github2: "https://github.com/saad85",
    location: "Mirpur-12, Dhaka, Bangladesh",
    summary:
      "I am an experienced **Full Stack Developer** with **5+ years of experience** and a strong background in leading development teams and delivering successful projects. My core expertise is in **JavaScript, Node js, Next js, React js** and its ecosystems, with additional experience in **Golang and Python**.",
    skills: [
      "Node.js",
      "Express.js",
      "Next.js",
      "React.js",
      "Golang",
      "Vue.js",
      "Meteor.js",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "Sequelize",
      "Mongoose",
      "LangChain",
      "GraphQL",
      "Rest API",
      "AWS",
      "API integrations",
      "Google APIs",
      "Database design",
      "TDD",
      "Mocha",
      "Large-scale data management",
      "Agile Methodologies",
    ],
  });

  // All 8 Projects Data
  const projects = [
    {
      name: "Payrun",
      period: "09/2023 - 01/2025",
      link: "https://local.payrun.app/",
      subtitle: "Modern HRM Application",
      details: [
        "Role: Senior Backend Developer",
        "Technologies: Node.js, Express.js, GraphQL, PostgreSQL, Sequelize ORM, AWS Services",
        "Led backend development, database design and optimization.",
        "Developed key modules: Leave, Timeline, Large-Scale Data Importing.",
      ],
    },
    {
      name: "Easydesk",
      period: "09/2023 - 01/2025",
      subtitle: "Smart, Scalable Ticketing Solution",
      details: [
        "Role: Senior Backend Developer",
        "Technologies: Node.js, Express.js, GraphQL, PostgreSQL, Sequelize ORM, AWS Services",
        "Integrated with third party APIs and customized modules.",
      ],
    },
    {
      name: "UniteLiving.com (Version 2)",
      period: "03/2023 - 08/2024",
      link: "https://uniteliving.com/",
      details: [
        "Contributed as a backend developer in a large team.",
        "Developed and maintained core functionalities.",
        "Worked on Database design and API integrations.",
      ],
    },
    {
      name: "UniteLiving Partners App - Version 2",
      period: "03/2020 - 08/2023",
      link: "https://krogesveen.local.uniteliving.com/",
      subtitle: "Norwegian DTMS App",
      details: [
        "Developed and maintained core functionalities.",
        "Worked on key modules, Database design, and system enhancements.",
      ],
    },
    {
      name: "UniteLiving (Version 1)",
      period: "01/2019 - 03/2020",
      details: [
        "Developed and maintained core functionalities.",
        "Contributed as a full-stack developer in a large team.",
      ],
    },
    {
      name: "UniteLiving Partners App - Version 1",
      period: "01/2019 - 03/2020",
      details: [
        "Developed and maintained core functionalities.",
        "Built and maintained key features for the partner application.",
      ],
    },
    {
      name: "Personal Project: AI-SmartSiteSense",
      period: "RAG Application",
      link: "https://ai-smart-site-sense-bgrn.vercel.app/",
      details: [
        "AI-powered tool that extracts and analyzes webpage content.",
        "Technologies: next.js, upstash/rag-chat, upstash/vector, upstash/redis, ai, tailwind css.",
      ],
    },
    {
      name: "Personal Project: Medico",
      period: "React.js, Next.js",
      link: "https://github.com/saad85/Medico",
      details: [
        "Doctor Appointment booking app. Medico provides users to book an appointment with their desired doctor.",
      ],
    },
  ];

  const experience = [
    {
      title: "Full Stack Developer",
      company: "MegaTecs",
      period: "04/2025 - Present",
      bullets: [
        "Contributed as a full-stack developer.",
        "Developed and delivered multiple frontend and backend products.",
        "Technologies: Next.js, React, Node.js, Express.js, PostgreSQL, Sequelize ORM, AWS Services",
      ],
    },
    {
      title: "Back End Developer, Team Lead",
      company: "Gain Solutions Ltd",
      period: "03/2021 - 01/2025",
      bullets: [
        "Worked on key modules and system enhancements. Designed database schemas and optimized queries.",
        "Technologies: Node.js, Express.js, GraphQL, PostgreSQL, Sequelize ORM, AWS Services",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Gain Solutions Ltd",
      period: "01/2019 - 01/2021",
      bullets: [
        "Developed and maintained core functionalities with Vue.js and Meteor.js.",
        "Built and maintained key features for the partner application.",
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
          scale: 2, // Reduced from 3 to 2 (still looks sharp on print, but much smaller)
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
        });

        // 1. Convert to JPEG instead of PNG
        // 2. Set quality to 0.75 (75%)
        const imgData = canvas.toDataURL("image/jpeg", 0.75);

        if (i > 0) pdf.addPage();

        // Use 'FAST' alias and 'JPEG' format for embedding
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
      }

      pdf.save(`${data.name.replace(/\s+/g, "_")}_Resume.pdf`);
    } catch (error) {
      console.error(error);
      alert("Download failed.");
    } finally {
      setIsDownloading(false);
    }
  };

  const renderRichText = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} style={{ color: "#000", fontWeight: 800 }}>
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-zinc-950 text-white font-sans">
      {/* SIDEBAR */}
      <aside className="w-full lg:w-80 p-6 border-r border-zinc-800 bg-zinc-900 overflow-y-auto no-scrollbar">
        <h2 className="text-xl font-bold mb-6 border-b border-zinc-700 pb-2 uppercase tracking-tighter">
          Editor
        </h2>

        <button
          onClick={downloadPDF}
          disabled={isDownloading}
          className="w-full mb-8 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all shadow-xl disabled:opacity-50"
        >
          {isDownloading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Download size={20} />
          )}
          {isDownloading ? "Processing..." : "Download PDF"}
        </button>

        <div className="space-y-4">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            Profile Image
          </label>
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
            className="w-full text-xs text-zinc-400 file:bg-zinc-800 file:border-0 file:text-white file:px-3 file:py-1 file:rounded cursor-pointer"
          />

          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mt-4">
            Summary Editor
          </label>
          <textarea
            value={data.summary}
            onChange={(e) => setData({ ...data, summary: e.target.value })}
            rows={8}
            className="w-full bg-zinc-800 border border-zinc-700 p-2 text-sm rounded outline-none focus:border-blue-500"
          />
        </div>
      </aside>
      {/* PREVIEW AREA */}
      <main className="flex-1 bg-zinc-800 p-8 overflow-y-auto flex flex-col items-center">
        <div ref={componentRef} className="flex flex-col gap-4">
          {/* PAGE 1 */}
          <div className="a4-page bg-white text-white shadow-2xl flex flex-col">
            <header className="bg-[#0d0c22] p-10 flex justify-between items-start border-b-2 border-gray-200">
              <div className="flex-1">
                <h1 className="text-4xl font-semibold text-white tracking-tight">
                  {data.name}
                </h1>
                <p
                  style={{ color: "#0070f3" }}
                  className="text-lg font-semibold mt-1 uppercase tracking-wider"
                >
                  {data.title}
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-6 text-[9.5pt] text-gray-300">
                  <span className="flex items-center gap-1">
                    <Phone size={12} style={{ color: "#0070f3" }} />{" "}
                    {data.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={12} style={{ color: "#0070f3" }} /> {data.email}
                  </span>
                  <a
                    href={data.linkedin}
                    target="_blank"
                    className="flex items-center gap-1 text-gray-300 font-bold underline"
                  >
                    <Linkedin size={12} />
                    <span>LinkedIn</span>
                  </a>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} style={{ color: "#0070f3" }} />{" "}
                    {data.location}
                  </span>
                  <a
                    href={data.github1}
                    target="_blank"
                    className="flex items-center gap-1 text-gray-300 font-bold underline"
                  >
                    <Github size={12} />
                    <span>GitHub (Primary)</span>
                  </a>
                  <a
                    href={data.github2}
                    target="_blank"
                    className="flex items-center gap-1 text-gray-300 font-bold underline"
                  >
                    <Github size={12} />
                    <span>GitHub (Secondary)</span>
                  </a>
                </div>
              </div>
              {profileImg && (
                <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0 ml-6">
                  <img
                    src={profileImg}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </header>

            <div className="p-10 grid grid-cols-12 gap-8 flex-1">
              {/* LEFT COL - Page 1 */}
              <div className="col-span-7 space-y-8">
                <section>
                  <h2 className="section-title">Summary</h2>
                  <p className="text-[10pt] leading-relaxed text-gray-700 text-justify">
                    {renderRichText(data.summary)}
                  </p>
                </section>
                <section>
                  <h2 className="section-title">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((s, i) => (
                      <span key={i} className="skill-tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </section>
                <section>
                  <h2 className="section-title">Key Projects</h2>
                  {/* Show only first 3 projects on Page 1 */}
                  {projects.slice(0, 3).map((p, i) => (
                    <ProjectComp key={i} project={p} showDivider={i < 2} />
                  ))}
                </section>
              </div>

              {/* RIGHT COL - Page 1 */}
              <div className="col-span-5 space-y-8 border-l border-gray-100 pl-4">
                <section>
                  <h2 className="section-title">Experience</h2>
                  {/* Show top 2 experiences on Page 1 to save space */}
                  {experience.map((exp, i) => (
                    <div key={i} className="mb-6">
                      <h3 className="text-lg font-bold text-black leading-tight">
                        {exp.title}
                      </h3>
                      <p
                        style={{ color: "#0070f3" }}
                        className="font-black text-[10pt] uppercase mb-1"
                      >
                        {exp.company}
                      </p>
                      <p className="text-[8.5pt] font-bold text-gray-400 mb-2 italic">
                        📅 {exp.period}
                      </p>
                      <ul className="list-disc ml-4 text-[9.5pt] space-y-1 text-gray-700">
                        {exp.bullets.map((b, bi) => (
                          <li key={bi}>{b}</li>
                        ))}
                      </ul>
                      {i < 1 && (
                        <div className="mt-4 border-b border-dotted border-gray-200" />
                      )}
                    </div>
                  ))}
                </section>
              </div>
            </div>
          </div>

          {/* PAGE 2 */}
          <div className="a4-page bg-white text-gray-800 p-10 flex flex-col">
            <div className="grid grid-cols-12 gap-8 flex-1">
              {/* LEFT COL - Page 2 */}
              <div className="col-span-7 space-y-6">
                <section>
                  <h2 className="section-title">More Projects</h2>
                  {/* Show remaining projects */}
                  {projects.slice(3).map((p, i) => (
                    <ProjectComp
                      key={i}
                      project={p}
                      showDivider={i < projects.slice(3).length - 1}
                    />
                  ))}
                </section>
              </div>

              {/* RIGHT COL - Page 2 */}
              <div className="col-span-5 space-y-8 border-l border-gray-100 pl-4">
                <section>
                  <h2 className="section-title">Education</h2>
                  <h3 className="font-bold text-black text-[10pt]">
                    Bachelor of CSE
                  </h3>
                  <p
                    style={{ color: "#0070f3" }}
                    className="font-bold text-[9pt]"
                  >
                    Ahsanullah University of Science and Tech
                  </p>
                  <p className="text-[8pt] font-bold text-gray-400">
                    📅 11/2013 - 05/2018
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <style jsx global>{`
        .a4-page {
          width: 794px;
          height: 1123px;
          overflow: hidden;
          page-break-after: always;
        }
        .section-title {
          font-size: 1.25rem;
          font-weight: 900;
          text-transform: uppercase;
          color: #616161;
          border-bottom: 2px solid #616161;
          padding-bottom: 4px;
          margin-bottom: 1rem;
        }
        .skill-tag {
          padding: 3px 10px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-bottom: 2.5px solid #0070f3;
          color: #000;
          font-size: 8.5pt;
          font-weight: 800;
          border-radius: 4px;
        }
        @media print {
          .a4-page {
            box-shadow: none;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}

function ProjectComp({ project, showDivider }: any) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-baseline mb-1">
        <h3 className="text-lg font-bold text-black leading-tight">
          {project.name}
        </h3>
        <span className="text-[8pt] font-black text-gray-400 uppercase tracking-tighter whitespace-nowrap ml-4">
          {project.period}
        </span>
      </div>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          style={{ color: "#0070f3" }}
          className="text-[9pt] font-bold underline flex items-center gap-1 mb-1 italic"
        >
          <Globe size={11} /> {project.link}
        </a>
      )}
      {project.subtitle && (
        <p className="text-[10pt] font-bold italic text-gray-600 mb-2 border-l-2 border-blue-100 pl-2">
          {project.subtitle}
        </p>
      )}
      <ul className="list-disc ml-4 text-[9.5pt] space-y-1 text-gray-700 leading-snug">
        {project.details.map((detail: string, i: number) => (
          <li key={i}>{detail}</li>
        ))}
      </ul>
      {showDivider && (
        <div className="mt-5 border-b border-dotted border-gray-300" />
      )}
    </div>
  );
}
