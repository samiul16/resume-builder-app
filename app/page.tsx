"use client";
import React, { useRef, useState, useMemo } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Phone,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Globe,
  Download,
  Upload,
  ExternalLink,
  Calendar,
  Briefcase,
} from "lucide-react";

// --- Types ---
interface Project {
  name: string;
  period: string;
  location?: string;
  link?: string;
  subtitle?: string;
  details: string[];
}

// --- Main Component ---
export default function ResumeBuilder() {
  const componentRef = useRef<HTMLDivElement>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);

  // --- State Initialization with your provided data ---
  const [data, setData] = useState({
    name: "SAMIUL ISLAM",
    title: "Experienced Backend & Full Stack Developer",
    phone: "+8801601076098",
    email: "samiul.saad@gmail.com",
    linkedin: "https://linkedin.com/in/samiul-islam",
    github1: "https://github.com/samiul16",
    github2: "https://github.com/saad85",
    location: "Mirpur-12, Dhaka, Bangladesh",
    summary:
      "I am an experienced **Backend & Full Stack Developer** with **5+ years of experience** and a strong background in leading development teams and delivering successful projects. My core expertise is in **JavaScript, Node js, React js** and its ecosystems, with additional experience in **Golang and Python**.",
    skills: [
      "Node.js",
      "Express.js",
      "Meteor.js",
      "Next.js",
      "Vue.js",
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
    experience: [
      {
        title: "Full Stack Developer",
        company: "Aimsbay IT Solutions",
        period: "03/2025 - Present",
        bullets: [
          "Contributed as a full-stack developer.",
          "Developed and delivered multiple frontend and backend products.",
        ],
      },
      {
        title: "Back End Developer",
        company: "Gain Solutions Ltd",
        period: "03/2020 - 01/2025",
        bullets: [
          "Developed and optimized backend services to improve performance.",
          "Worked on key modules, API integrations, and system enhancements.",
          "Collaborated closely with frontend teams to ensure seamless API consumption.",
        ],
      },
      {
        title: "Full Stack Developer",
        company: "Gain Solutions Ltd",
        period: "01/2019 - 03/2020",
        description:
          "Gain Solutions Ltd provides various software solutions with a focus on high-performance applications.",
        bullets: [
          "Contributed as a full-stack developer in a large team.",
          "Developed and maintained core functionalities of the platform.",
        ],
      },
      {
        title: "Team Lead",
        company: "Gain Solutions Ltd",
        period: "02/2023 - 01/2024",
        bullets: [
          "Led backend development team, including database design and optimization.",
          "Developed key modules such as Leave, Timeline, Large-Scale Data Importing, and Third-Party API Integrations.",
          "Focused on high-performance architecture and system scalability.",
        ],
      },
    ],
    projects: [
      {
        name: "Payrun",
        period: "09/2023 - 01/2025",
        location: "Gain Solutions Ltd",
        link: "https://local.payrun.app/",
        subtitle: "Modern HRM Application",
        details: [
          "Role: Senior Backend Developer",
          "Technologies: Node.js, Express.js, GraphQL, PostgreSQL, Sequelize ORM, AWS Services",
          "Led backend development, including database design and optimization.",
          "Developed key modules such as Leave, Timeline, Large-Scale Data Importing, and Third-Party API Integrations.",
          "Focused on high-performance architecture and system scalability.",
        ],
      },
      {
        name: "Easydesk",
        period: "09/2023 - 01/2025",
        location: "Gain Solutions Ltd",
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
        location: "Gain Solutions Ltd",
        link: "https://uniteliving.com/",
        details: [
          "Contributed as a backend developer in a large team.",
          "Developed and maintained core functionalities of the platform.",
          "Optimized backend services to improve performance.",
          "Worked on key modules, Database design, API integrations, and system enhancements.",
        ],
      },
      {
        name: "UniteLiving Partners App (Norwegian DTMS App) - Version 2",
        period: "03/2020 - 08/2023",
        location: "Gain Solutions Ltd",
        link: "https://krogesveen.local.uniteliving.com/",
        details: [
          "Contributed as a backend developer in a large team.",
          "Developed and maintained core functionalities of the platform.",
          "Worked on key modules, Database design, API integrations, and system enhancements.",
        ],
      },
      {
        name: "UniteLiving (Version 1)",
        period: "01/2019 - 03/2020",
        location: "Gain Solutions Ltd",
        details: [
          "Developed and maintained core functionalities of the platform.",
          "Contributed as a full-stack developer in a large team.",
        ],
      },
      {
        name: "UniteLiving Partners App (Norwegian DTMS App) - Version 1",
        period: "01/2019 - 03/2020",
        location: "Gain Solutions Ltd",
        details: [
          "Developed and maintained core functionalities of the platform.",
          "Contributed as a full-stack developer in a large team.",
          "Built and maintained key features for the partner application.",
        ],
      },
      {
        name: "Personal Project: AI-SmartSiteSense",
        period: "RAG Application",
        link: "https://ai-smart-site-sense-bgrn.vercel.app/",
        details: [
          "An AI-powered web tool that extracts and analyzes webpage content, allowing users to ask questions and get intelligent answers.",
          "Technologies: next.js, upstash/rag-chat, upstash/vector, upstash/redis, ai, tailwind css.",
        ],
      },
      {
        name: "Personal Project: Medico",
        period: "React.js, Next.js",
        link: "https://github.com/saad85/Medico",
        details: [
          "Doctor Appointment booking app. Medico provides users to book an appointment with their desired doctor by searching by name.",
        ],
      },
    ],
  });

  // --- Handlers ---
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${data.name}_Resume`,
  });

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const renderRichText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} className="font-bold text-black">
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      )
    );
  };

  // Logic to split projects between pages
  const page1Projects = data.projects.slice(0, 3);
  const page2Projects = data.projects.slice(3);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-zinc-900 text-white font-sans">
      {/* SIDEBAR EDITOR */}
      <aside className="w-full lg:w-96 p-6 border-r border-zinc-700 overflow-y-auto max-h-screen no-scrollbar print:hidden">
        <div className="sticky top-0 bg-zinc-900 pb-4 mb-6 border-b border-zinc-700 z-10">
          <h2 className="text-xl font-bold mb-4">Resume Editor</h2>
          <button
            onClick={handlePrint}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all shadow-lg"
          >
            <Download size={20} /> Download PDF
          </button>
        </div>

        <div className="space-y-6">
          <section>
            <label className="text-xs uppercase font-bold text-zinc-500 block mb-2 tracking-widest">
              Profile Photo
            </label>
            <div className="relative group">
              <input
                type="file"
                onChange={handleImage}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="h-20 border-2 border-dashed border-zinc-700 rounded-lg flex items-center justify-center group-hover:border-blue-500 transition-colors">
                <Upload
                  size={24}
                  className="text-zinc-500 group-hover:text-blue-500"
                />
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <label className="text-xs uppercase font-bold text-zinc-500 block tracking-widest">
              General Info
            </label>
            <input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Name"
              className="editor-input"
            />
            <input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Title"
              className="editor-input"
            />
            <textarea
              value={data.summary}
              onChange={(e) => setData({ ...data, summary: e.target.value })}
              rows={5}
              placeholder="Summary"
              className="editor-input"
            />
          </section>

          <p className="text-xs text-zinc-500 italic">
            Live editing is enabled for Name, Title, and Summary. Data for other
            sections is pre-loaded from your request.
          </p>
        </div>
      </aside>

      {/* A4 PREVIEW CONTAINER */}
      <main className="flex-1 bg-zinc-200 overflow-y-auto h-screen p-8 flex flex-col items-center gap-8">
        <div ref={componentRef} className="print:m-0">
          {/* --- PAGE 1 --- */}
          <div className="a4-page shadow-2xl relative">
            {/* Header Section */}
            <header className="bg-slate-50 p-10 flex justify-between items-start border-b-2 border-slate-200 overflow-hidden">
              <div className="flex-1">
                <h1 className="text-4xl font-extrabold text-black tracking-tighter">
                  {data.name}
                </h1>
                <p className="text-[#0070f3] text-xl font-bold mt-1 uppercase tracking-wider">
                  {data.title}
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mt-5 text-[9.5pt] text-gray-700">
                  <div className="flex items-center gap-2 font-medium">
                    <Phone size={13} className="text-[#0070f3]" /> {data.phone}
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Mail size={13} className="text-[#0070f3]" /> {data.email}
                  </div>
                  <a
                    href={data.linkedin}
                    target="_blank"
                    className="flex items-center gap-2 font-bold text-blue-600 hover:underline"
                  >
                    <Linkedin size={13} /> LinkedIn
                  </a>
                  <div className="flex items-center gap-2 font-medium">
                    <MapPin size={13} className="text-[#0070f3]" />{" "}
                    {data.location}
                  </div>
                  <div className="col-span-2 flex flex-col gap-1 mt-1">
                    <a
                      href={data.github1}
                      target="_blank"
                      className="flex items-center gap-2 text-blue-600 font-bold hover:underline text-[9pt]"
                    >
                      <Github size={13} /> {data.github1}
                    </a>
                    <a
                      href={data.github2}
                      target="_blank"
                      className="flex items-center gap-2 text-blue-600 font-bold hover:underline text-[9pt]"
                    >
                      <Github size={13} /> {data.github2}
                    </a>
                  </div>
                </div>
              </div>

              {profileImg && (
                <div className="w-36 h-36 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-200 shrink-0 ml-6">
                  <img
                    src={profileImg}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </header>

            {/* Main Content Body */}
            <div className="p-10 grid grid-cols-12 gap-8 flex-1 bg-white">
              {/* LEFT COLUMN */}
              <div className="col-span-7 space-y-8">
                <section>
                  <h2 className="section-header">Summary</h2>
                  <p className="text-[10pt] leading-relaxed text-gray-700 text-justify">
                    {renderRichText(data.summary)}
                  </p>
                </section>

                <section>
                  <h2 className="section-header">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="section-header">Projects</h2>
                  {page1Projects.map((proj, idx) => (
                    <ProjectItem
                      key={idx}
                      project={proj}
                      showDivider={idx < page1Projects.length - 1}
                    />
                  ))}
                </section>
              </div>

              {/* RIGHT COLUMN */}
              <div className="col-span-5 space-y-8">
                <section>
                  <h2 className="section-header">Experience</h2>
                  {data.experience.map((exp, idx) => (
                    <div key={idx} className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {exp.title}
                      </h3>
                      <p className="text-[#0070f3] font-extrabold text-[10pt] uppercase mb-1 tracking-tight">
                        {exp.company}
                      </p>
                      <p className="text-[9pt] font-bold text-gray-400 mb-2 flex items-center gap-1">
                        <Calendar size={12} /> {exp.period}
                      </p>
                      <ul className="list-disc ml-4 text-[9.5pt] space-y-1 text-gray-700 leading-snug">
                        {exp.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                      {idx < data.experience.length - 1 && (
                        <div className="mt-4 border-b border-dotted border-gray-300" />
                      )}
                    </div>
                  ))}
                </section>

                <section>
                  <h2 className="section-header">Education</h2>
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight">
                      Bachelor of Computer Science and Engineering
                    </h3>
                    <p className="text-[#0070f3] font-bold text-[10pt] mt-1">
                      Ahsanullah University of Science and Technology
                    </p>
                    <p className="text-[9pt] font-bold text-gray-400 mt-1">
                      📅 11/2013 - 05/2018
                    </p>
                  </div>
                </section>
              </div>
            </div>

            <footer className="footer-bar">
              <span>www.enhancv.com</span>
              <span className="flex items-center gap-1 italic">
                Powered by <span className="font-bold not-italic">Enhancv</span>
              </span>
            </footer>
          </div>

          {/* --- PAGE 2 --- */}
          <div className="a4-page shadow-2xl mt-8 bg-white p-10 flex flex-col">
            <h2 className="section-header">Projects (Continued)</h2>
            <div className="grid grid-cols-12 gap-8 flex-1">
              <div className="col-span-12 space-y-6">
                {page2Projects.map((proj, idx) => (
                  <ProjectItem
                    key={idx}
                    project={proj}
                    showDivider={idx < page2Projects.length - 1}
                  />
                ))}
              </div>
            </div>
            <footer className="footer-bar mt-auto">
              <span>www.enhancv.com</span>
              <span className="flex items-center gap-1 italic">
                Powered by <span className="font-bold not-italic">Enhancv</span>
              </span>
            </footer>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .a4-page {
          width: 210mm;
          min-height: 297mm;
          background: white;
          color: #333;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .section-header {
          font-size: 1.25rem;
          font-weight: 900;
          text-transform: uppercase;
          color: #000;
          border-bottom: 3px solid #000;
          padding-bottom: 4px;
          margin-bottom: 1rem;
          letter-spacing: 0.05em;
        }
        .skill-pill {
          padding: 3px 10px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-bottom: 2.5px solid #0070f3;
          color: #1a202c;
          font-size: 8.5pt;
          font-weight: 700;
          border-radius: 4px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        .footer-bar {
          padding: 12px 40px;
          display: flex;
          justify-content: space-between;
          font-size: 8pt;
          color: #94a3b8;
          border-top: 1px solid #f1f5f9;
        }
        .editor-input {
          width: 100%;
          background: #27272a;
          border: 1px solid #3f3f46;
          padding: 10px;
          border-radius: 6px;
          font-size: 0.875rem;
          color: white;
          outline: none;
          transition: border-color 0.2s;
        }
        .editor-input:focus {
          border-color: #3b82f6;
        }
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background: white;
          }
          .a4-page {
            box-shadow: none;
            margin: 0;
            page-break-after: always;
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

// Sub-component for Project Items to keep the main code clean
function ProjectItem({
  project,
  showDivider,
}: {
  project: Project;
  showDivider: boolean;
}) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-baseline mb-1">
        <h3 className="text-lg font-bold text-gray-900 leading-tight">
          {project.name}
        </h3>
        <span className="text-[8.5pt] font-bold text-gray-400 whitespace-nowrap ml-4 uppercase">
          {project.period}
        </span>
      </div>

      {project.location && (
        <div className="text-[9pt] font-bold text-gray-500 mb-1 flex items-center gap-1">
          <Briefcase size={12} /> {project.location}
        </div>
      )}

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          className="text-[#0070f3] text-[9pt] font-bold hover:underline flex items-center gap-1 mb-1"
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
        {project.details.map((detail, i) => (
          <li key={i}>{detail}</li>
        ))}
      </ul>

      {showDivider && (
        <div className="mt-5 border-b border-dotted border-gray-300" />
      )}
    </div>
  );
}
