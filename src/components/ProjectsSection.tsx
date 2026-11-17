import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Code2, Users, ArrowUpRight, Sparkles } from 'lucide-react';

interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  technologies: string[];
  role?: string;
  liveUrl?: string;
  ctaLabel?: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'baamma-gari-vantalu',
    number: '01',
    title: 'Baamma Gari Vantalu',
    tagline: 'Traditional Taste. Digital Experience.',
    description:
      'A South Indian food-commerce storefront designed to bring traditional delicacies into a modern digital shopping experience. The project focuses on presenting products through an engaging interface and making the online browsing experience intuitive.',
    category: 'E-COMMERCE',
    technologies: ['React', 'Vite', 'JavaScript', 'CSS'],
    role: 'TEAM PROJECT CONTRIBUTOR',
    liveUrl: 'https://bammagari-vantalu.vercel.app/',
    ctaLabel: 'EXPLORE PROJECT',
  },
  {
    id: 'koundinyasa-exams',
    number: '02',
    title: 'Koundinyasa Exams',
    tagline: 'Structured Assessments. Digital Workflow.',
    description:
      'An internal examination platform designed for employee assessments and organizational learning. Developed as a team project, it provides a dedicated digital environment for employees to access and participate in assessments.',
    category: 'EDTECH / INTERNAL APPLICATION',
    technologies: ['React', 'Vite', 'Node.js', 'Express.js', 'PostgreSQL'],
    role: 'TEAM PROJECT CONTRIBUTOR',
    liveUrl: 'https://koundinyasa-exams.vercel.app/',
    ctaLabel: 'EXPLORE PROJECT',
  },
  {
    id: 'shravs-smart',
    number: '03',
    title: 'Shravs Smart',
    tagline: "Commerce Built for What's Next.",
    description:
      'An ongoing full-stack e-commerce project focused on building a modern shopping experience backed by a structured application architecture. The project brings together frontend development, server-side application logic, API integration, and database management.',
    category: 'FULL-STACK E-COMMERCE',
    technologies: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB'],
    role: 'SOLO FULL-STACK PROJECT',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden pt-16 pb-24 sm:pt-20 sm:pb-32 lg:pt-24 lg:pb-36 border-t border-black/15 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/projects-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Identifier */}
        <div
          className={`flex items-center gap-3 font-mono text-xs sm:text-[13px] tracking-[0.25em] text-white font-semibold uppercase mb-4 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="w-6 h-[1.5px] bg-white rounded-full inline-block" aria-hidden="true" />
          <span>// SELECTED WORK</span>
        </div>

        {/* Section Header */}
        <div
          className={`mb-12 sm:mb-16 lg:mb-20 transition-all duration-700 delay-100 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="font-sora font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-black">
            Things I've{' '}
            <span className="inline-flex items-center gap-3 sm:gap-4 md:gap-5 whitespace-nowrap">
              <span>Built</span>
              <span
                className="inline-block w-20 sm:w-32 md:w-40 lg:w-44 h-[3px] sm:h-[3.5px] md:h-[4px] rounded-full bg-black flex-shrink-0"
                aria-hidden="true"
              />
            </span>
          </h2>
          <p className="font-sora text-sm sm:text-base text-white font-normal mt-3 max-w-2xl leading-relaxed">
            A collection of ideas transformed into digital experiences. From e-commerce platforms to purpose-built
            applications, each project represents my approach to engineering, problem-solving, and building for the real
            world.
          </p>
        </div>

        {/* ── THREE-COLUMN HORIZONTAL TEXT-ONLY PROJECT GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PROJECTS_DATA.map((project, idx) => (
            <div
              key={project.id}
              className={`group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#0A0A0E]/95 backdrop-blur-2xl p-6 sm:p-7 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-white/[0.28] transition-all duration-500 overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${150 + idx * 100}ms` }}
            >
              {/* Ambient top hover shimmer */}
              <div
                className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 bg-[#FF7518]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF7518]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />

              {/* Upper Section: Meta + Role + Title + Tagline + Description + Stack */}
              <div className="flex flex-col">
                {/* Meta Row: Number & Category */}
                <div className="flex flex-wrap items-center gap-2 mb-3.5">
                  <span className="font-mono text-xs font-bold text-[#FF8A00] tracking-wider">
                    {project.number} //
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[10px] sm:text-[10.5px] font-mono font-semibold tracking-wider uppercase bg-white/[0.05] border border-white/[0.1] text-white/75 leading-tight">
                    {project.category}
                  </span>
                </div>

                {/* Role indicator if present */}
                {project.role && (
                  <div className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-[10.5px] font-mono text-white/65 font-medium w-fit">
                    {project.id === 'shravs-smart' ? (
                      <Sparkles size={11} className="text-[#FF7518]" />
                    ) : (
                      <Users size={11} className="text-[#FF7518]" />
                    )}
                    <span>{project.role}</span>
                  </div>
                )}

                {/* Project Title & Tagline */}
                <h3 className="font-sora font-extrabold text-2xl lg:text-[25px] text-white tracking-[-0.02em] leading-tight group-hover:text-[#FF8A00] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-sora text-xs sm:text-[13px] font-semibold text-[#FF8A00] mt-1.5">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="font-sora text-xs sm:text-[13px] text-white/75 font-normal mt-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technology Stack */}
                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Code2 size={12} className="text-[#FF7518]" />
                    <span className="font-mono text-[10.5px] font-semibold tracking-wider text-white/50 uppercase">
                      Architecture Stack
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.04] border border-white/[0.08] text-white/85 group-hover:border-white/[0.16] transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA Block: Only for deployed projects with working links */}
              {project.liveUrl && project.ctaLabel && (
                <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF7518] hover:bg-[#FF8A00] text-black font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(255,117,24,0.3)] hover:shadow-[0_6px_20px_rgba(255,117,24,0.5)] active:scale-95"
                    aria-label={`Explore live project ${project.title}`}
                  >
                    <span>{project.ctaLabel}</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </a>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white transition-colors"
                    aria-label={`Open link to ${project.title}`}
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
