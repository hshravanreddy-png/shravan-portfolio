import { useEffect, useRef, useState } from 'react';
import { MapPin, GraduationCap, Award } from 'lucide-react';

interface EducationStage {
  id: string;
  stageNumber: string;
  stageLabel: string;
  qualification: string;
  specialization?: string;
  institution: string;
  location: string;
  institutionUrl?: string;
  year?: string; // Configurable: leave empty/undefined until provided
  description: string;
  skillsAcquired: string[];
  icon: 'school' | 'college' | 'university';
}

const EDUCATION_STAGES: EducationStage[] = [
  {
    id: 'stage-1',
    stageNumber: '01',
    stageLabel: 'STAGE 01 // SECONDARY',
    qualification: 'Secondary Education',
    institution: 'Surabhi Vidyaniketan',
    location: 'Hosapete, Karnataka, India',
    institutionUrl: 'https://www.google.com/search?kgmid=%2Fg%2F11bw3d1zfj',
    year: '2016 — 2020',
    description:
      'Formative academic schooling developing discipline, mathematical rigor, scientific inquiry, and an early curiosity for digital technology and logic.',
    skillsAcquired: ['Mathematics', 'Science', 'Analytical Thinking', 'Foundations'],
    icon: 'school',
  },
  {
    id: 'stage-2',
    stageNumber: '02',
    stageLabel: 'STAGE 02 // PRE-UNIVERSITY',
    qualification: 'Pre-University Education',
    institution: 'Sri Chaitanya PU College',
    location: 'Bellary, Karnataka, India',
    year: '2020 — 2022',
    description:
      'Pre-university science program with extensive focus on advanced Mathematics, Physics, and analytical problem-solving, building the quantitative backbone for engineering.',
    skillsAcquired: ['Higher Mathematics', 'Physics', 'Quantitative Aptitude', 'Problem Solving'],
    icon: 'college',
  },
  {
    id: 'stage-3',
    stageNumber: '03',
    stageLabel: 'STAGE 03 // UNDERGRADUATE',
    qualification: 'Bachelor of Engineering (B.E.)',
    specialization: 'Information Science and Technology',
    institution: 'Presidency University',
    location: 'Bengaluru, Karnataka, India',
    year: '2022 — 2026',
    description:
      'Undergraduate engineering degree specializing in Information Science, software design, distributed architectures, scalable fullstack systems, and applied artificial intelligence.',
    skillsAcquired: ['Information Science', 'Fullstack Engineering', 'System Architecture', 'Applied AI'],
    icon: 'university',
  },
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeStageIndices, setActiveStageIndices] = useState<number[]>([]);

  // IntersectionObserver for entrance animation
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

  // Scroll progress for progressive timeline illumination
  useEffect(() => {
    const handleScroll = () => {
      const timeline = timelineRef.current;
      const progressLine = progressLineRef.current;
      if (!timeline || !progressLine) return;

      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start illuminating when timeline top reaches 70% of viewport
      const startOffset = windowHeight * 0.7;
      // Complete when timeline bottom reaches 45% of viewport
      const endOffset = windowHeight * 0.45;

      const totalHeight = rect.height;
      const currentScroll = startOffset - rect.top;
      const progress = Math.min(Math.max(currentScroll / (totalHeight + startOffset - endOffset), 0), 1);

      progressLine.style.height = `${(progress * 100).toFixed(1)}%`;

      // Determine active stages
      const markers = timeline.querySelectorAll<HTMLElement>('[data-stage-marker]');
      const activeIndices: number[] = [];

      markers.forEach((marker, index) => {
        const markerRect = marker.getBoundingClientRect();
        if (markerRect.top < windowHeight * 0.65) {
          activeIndices.push(index);
        }
      });

      setActiveStageIndices(activeIndices);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#000000] text-white pt-16 pb-24 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32 border-t border-white/[0.08]"
    >
      {/* Background ambient lighting - restrained warm cyberpunk depth */}
      <div
        className="pointer-events-none absolute top-10 left-1/3 w-[500px] h-[350px] bg-gradient-to-b from-[#FF5A00]/10 via-[#FF8A00]/5 to-transparent blur-[140px] rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-12 right-1/4 w-[450px] h-[300px] bg-gradient-to-t from-[#FF7518]/10 to-transparent blur-[150px] rounded-full"
        aria-hidden="true"
      />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Identifier */}
        <div
          className={`flex items-center gap-3 font-mono text-xs sm:text-[13px] tracking-[0.25em] text-[#FF8A00] font-semibold uppercase mb-4 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="w-6 h-[1.5px] bg-[#FF8A00] rounded-full inline-block" aria-hidden="true" />
          <span>EDUCATION & GROWTH</span>
        </div>

        {/* Section Header */}
        <div
          className={`mb-16 sm:mb-20 lg:mb-24 transition-all duration-700 delay-100 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="font-sora font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-white">
            Education &{' '}
            <span className="inline-flex items-center gap-3 sm:gap-4 md:gap-5 whitespace-nowrap">
              <span>Growth</span>
              <span
                className="inline-block w-20 sm:w-32 md:w-40 lg:w-44 h-[3px] sm:h-[3.5px] md:h-[4px] rounded-full bg-[#FF7518] flex-shrink-0"
                aria-hidden="true"
              />
            </span>
          </h2>
          <p className="font-sora text-sm sm:text-base text-[#888888] font-normal mt-2.5 max-w-xl">
            Every stage added another piece to the person I'm building.
          </p>
        </div>

        {/* ── Central Vertical Timeline ── */}
        <div ref={timelineRef} className="relative max-w-[1240px] mx-auto">
          {/* Central Track Line (Desktop: 50% Center | Mobile: Left-aligned at 24px) */}
          <div
            className="absolute top-4 bottom-4 left-6 sm:left-8 lg:left-1/2 lg:-translate-x-1/2 w-[1px] bg-white/[0.12]"
            aria-hidden="true"
          >
            {/* Scroll-driven illuminating gradient overlay */}
            <div
              ref={progressLineRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#FF5A00] via-[#FF7518] to-[#FF8A00] shadow-[0_0_12px_rgba(255,117,24,0.7)] transition-all duration-100 ease-out"
              style={{ height: '0%' }}
            />
          </div>

          {/* Timeline Stages List */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {EDUCATION_STAGES.map((stage, idx) => {
              const isEven = idx % 2 === 0; // index 0 & 2 on left, index 1 on right
              const isStageActive = activeStageIndices.includes(idx);

              return (
                <div
                  key={stage.id}
                  className={`relative flex flex-col lg:flex-row items-start lg:items-center transition-all duration-700 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${200 + idx * 150}ms` }}
                >
                  {/* ── Left Column (Desktop) ── */}
                  <div
                    className={`w-full lg:w-1/2 pl-14 sm:pl-16 lg:pl-0 ${
                      isEven ? 'lg:pr-12 xl:pr-16 lg:text-left' : 'lg:order-3 lg:pl-12 xl:pl-16'
                    }`}
                  >
                    {/* The Education Card */}
                    <div className="group relative rounded-2xl border border-white/[0.1] hover:border-white/[0.24] bg-gradient-to-b from-[#111115]/95 via-[#0C0C10]/90 to-[#070709]/95 backdrop-blur-xl p-6 sm:p-7 lg:p-8 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_16px_36px_rgba(0,0,0,0.75)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_35px_rgba(255,117,24,0.1)]">
                      {/* Corner Accent Glow on Hover */}
                      <div
                        className="pointer-events-none absolute -top-10 -right-10 w-28 h-28 bg-[#FF7518]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        aria-hidden="true"
                      />

                      {/* Header Row: Stage Identifier */}
                      <div className="flex items-center gap-2 mb-3.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF7518]" />
                        <span className="font-mono text-[11px] sm:text-xs font-semibold text-[#FF8A00] tracking-[0.2em] uppercase">
                          {stage.stageLabel}
                        </span>
                      </div>

                      {/* Qualification Title */}
                      <h3 className="font-sora font-extrabold text-xl sm:text-2xl text-white tracking-[-0.02em] leading-snug">
                        {stage.qualification}
                      </h3>

                      {/* Specialization (if present) */}
                      {stage.specialization && (
                        <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-md bg-[#FF7518]/10 border border-[#FF7518]/25 text-[#FF8A00] font-mono text-xs sm:text-[12.5px] font-medium">
                          <Award size={13} className="shrink-0 text-[#FF8A00]" />
                          <span>{stage.specialization}</span>
                        </div>
                      )}

                      {/* Institution Name, Location & Duration */}
                      <div className="mt-4 pt-3.5 border-t border-white/[0.08] flex flex-col gap-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-sm sm:text-base font-sora font-semibold text-[#F0F0F0]">
                            <GraduationCap size={16} className="text-[#FF7518] shrink-0" />
                            <span>{stage.institution}</span>
                          </div>
                          <span className="font-mono text-xs sm:text-[13px] text-[#FF8A00] font-medium tracking-wider shrink-0">
                            {stage.year}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-mono text-[#888888]">
                          <MapPin size={13} className="text-[#FF7518]/70 shrink-0" />
                          <span>{stage.location}</span>
                        </div>
                      </div>

                      {/* Narrative Description */}
                      <p className="font-sora text-xs sm:text-[13px] leading-relaxed text-[#A0A0A0] mt-3.5 font-normal">
                        {stage.description}
                      </p>

                      {/* Academic Pillars / Skills Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-4 pt-3.5 border-t border-white/[0.06]">
                        {stage.skillsAcquired.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono bg-white/[0.03] border border-white/[0.08] text-white/75 group-hover:border-white/[0.14] transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── Center Timeline Marker Node ── */}
                  <div
                    data-stage-marker
                    className={`absolute left-6 sm:left-8 lg:left-1/2 top-7 sm:top-8 lg:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-500`}
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/90 border flex items-center justify-center transition-all duration-500 ${
                        isStageActive
                          ? 'border-[#FF7518] shadow-[0_0_14px_rgba(255,117,24,0.55)] scale-110'
                          : 'border-white/20 shadow-md shadow-black'
                      }`}
                    >
                      {/* Inner glowing pulse dot */}
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${
                          isStageActive
                            ? 'bg-[#FF7518] shadow-[0_0_8px_#FF7518] scale-125'
                            : 'bg-white/40'
                        }`}
                      />
                    </div>
                  </div>

                  {/* ── Opposite Column (Desktop Editorial Duration Display) ── */}
                  <div
                    className={`hidden lg:flex w-full lg:w-1/2 flex-col justify-center ${
                      isEven
                        ? 'lg:order-3 lg:pl-12 xl:pl-16 items-start text-left'
                        : 'lg:order-1 lg:pr-12 xl:pr-16 items-end text-right'
                    }`}
                  >
                    {/* Large Editorial Stage Number & Duration */}
                    <div
                      className={`flex flex-col select-none ${
                        isEven ? 'items-start' : 'items-end'
                      }`}
                    >
                      <span className="font-sora font-extrabold text-3xl xl:text-4xl text-white/20 tracking-tight group-hover:text-white/35 transition-colors">
                        {stage.year}
                      </span>
                      <span className="font-mono text-xs tracking-[0.25em] text-[#FF8A00]/70 uppercase mt-1">
                        {stage.institution}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

