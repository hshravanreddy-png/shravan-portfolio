import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import AboutSection from './components/AboutSection';
import EngineRoomSection from './components/EngineRoomSection';
import EducationSection from './components/EducationSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';

const BG_IMAGE_1 = '/hero-base.png';

const BG_IMAGE_2 = '/hero-reveal.jpg';

interface NavItem {
  label: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'My Tools', id: 'tools' },
  { label: 'Education', id: 'education' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const LOGO_PATH =
  'M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z';

/* ── Arc stat data ── */
const ARC_CENTER = { x: -110, y: 300 };
const ARCS = [
  { r: 330, startDeg: -92, endDeg: 16, dotDeg: -46, value: '5', suffix: '+', label: 'PROJECTS BUILT' },
  { r: 395, startDeg: -56, endDeg: 60, dotDeg: 2, value: '6', suffix: '+', label: 'MONTHS EXPERIENCE' },
  { r: 460, startDeg: -14, endDeg: 72, dotDeg: 44, value: '95', suffix: '%', label: 'CLIENT SATISFACTION' },
];

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function polarToCart(cx: number, cy: number, r: number, deg: number) {
  const rad = degToRad(deg);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = polarToCart(cx, cy, r, startDeg);
  const end = polarToCart(cx, cy, r, endDeg);
  const sweep = endDeg - startDeg;
  const largeArc = Math.abs(sweep) > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

/* ── Logo SVG ── */
function LogoSvg({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d={LOGO_PATH} />
    </svg>
  );
}

/* ── Stats Arc SVG ── */
function StatsArc() {
  return (
    <div className="absolute inset-y-0 right-0 pointer-events-none hidden sm:block" style={{ zIndex: 50 }}>
      <svg
        viewBox="0 0 440 700"
        preserveAspectRatio="xMaxYMid meet"
        className="h-full w-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {ARCS.map((arc, i) => {
            const start = polarToCart(ARC_CENTER.x, ARC_CENTER.y, arc.r, arc.startDeg);
            const end = polarToCart(ARC_CENTER.x, ARC_CENTER.y, arc.r, arc.endDeg);
            return (
              <linearGradient
                key={i}
                id={`arcGrad${i}`}
                gradientUnits="userSpaceOnUse"
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
              >
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="22%" stopColor="white" stopOpacity="0.5" />
                <stop offset="55%" stopColor="white" stopOpacity="0.5" />
                <stop offset="85%" stopColor="white" stopOpacity="0.1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            );
          })}
        </defs>

        {ARCS.map((arc, i) => {
          const d = describeArc(ARC_CENTER.x, ARC_CENTER.y, arc.r, arc.startDeg, arc.endDeg);
          const sweepRad = degToRad(Math.abs(arc.endDeg - arc.startDeg));
          const arcLen = arc.r * sweepRad;
          const lineDelay = 0.4 + i * 0.22;
          const markDelay = lineDelay + 0.9;

          const dot = polarToCart(ARC_CENTER.x, ARC_CENTER.y, arc.r, arc.dotDeg);

          return (
            <g key={i}>
              {/* Arc path */}
              <path
                d={d}
                fill="none"
                stroke={`url(#arcGrad${i})`}
                strokeWidth="1.1"
                className="arc-line"
                style={{ '--len': arcLen, animationDelay: `${lineDelay}s` } as React.CSSProperties}
              />

              {/* Dot (filled circle) */}
              <circle
                cx={dot.x}
                cy={dot.y}
                r={3.4}
                fill="white"
                className="arc-dot"
                style={{ animationDelay: `${markDelay}s` }}
              />

              {/* Ring (pulsing) */}
              <circle
                cx={dot.x}
                cy={dot.y}
                r={7}
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.35"
                className="arc-ring"
                style={{ animationDelay: `${markDelay + 0.3}s` }}
              />

              {/* Value text */}
              <text
                x={dot.x + 16}
                y={dot.y + 4}
                fill="white"
                fontSize="32"
                fontWeight="700"
                className="arc-text"
                style={{ animationDelay: `${markDelay + 0.15}s` }}
              >
                {arc.value}
                <tspan fontSize="19" dy="-10" letterSpacing="-1px">
                  {arc.suffix}
                </tspan>
              </text>

              {/* Label text */}
              <text
                x={dot.x + 18}
                y={dot.y + 22}
                fill="white"
                fontSize="8.5"
                fontWeight="600"
                letterSpacing="2px"
                opacity="0.8"
                className="arc-text"
                style={{ animationDelay: `${markDelay + 0.3}s` }}
              >
                {arc.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── Main App ── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  /* Mouse position tracking */
  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const gridOffsetRef = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
    setMenuOpen(false);
  };

  /* Active section tracking on scroll */
  useEffect(() => {
    const sectionIds = ['home', 'about', 'tools', 'education', 'projects', 'contact'];

    const handleScroll = () => {
      const navThreshold = 220;
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;

      if (isAtBottom) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navThreshold) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Escape key to dismiss mobile navigation */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const loop = () => {
      /* Smooth cursor lerp */
      const lerp = 0.1;
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * lerp;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * lerp;

      /* Grid parallax lerp */
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const normX = mouseRef.current.x / w;
      const normY = mouseRef.current.y / h;
      const targetGX = (normX - 0.5) * 16;
      const targetGY = (normY - 0.5) * 16;
      gridOffsetRef.current.x += (targetGX - gridOffsetRef.current.x) * 0.06;
      gridOffsetRef.current.y += (targetGY - gridOffsetRef.current.y) * 0.06;

      /* Update grid pattern transform */
      const patternEl = document.getElementById('gridPattern');
      if (patternEl) {
        patternEl.setAttribute('x', String(gridOffsetRef.current.x));
        patternEl.setAttribute('y', String(gridOffsetRef.current.y));
      }

      /* Canvas mask for reveal layer */
      if (canvas && ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const sx = smoothRef.current.x;
        const sy = smoothRef.current.y;
        const radius = 260;

        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius);
        grad.addColorStop(0, 'rgba(0,0,0,1)');
        grad.addColorStop(0.4, 'rgba(0,0,0,1)');
        grad.addColorStop(0.6, 'rgba(0,0,0,0.75)');
        grad.addColorStop(0.75, 'rgba(0,0,0,0.4)');
        grad.addColorStop(0.88, 'rgba(0,0,0,0.12)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();

        const dataUrl = canvas.toDataURL();
        if (revealRef.current) {
          revealRef.current.style.maskImage = `url(${dataUrl})`;
          revealRef.current.style.webkitMaskImage = `url(${dataUrl})`;
          revealRef.current.style.maskSize = '100% 100%';
          revealRef.current.style.webkitMaskSize = '100% 100%';
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  const closeMobile = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-black tracking-[-0.02em]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {/* ── Hidden canvas for mask generation ── */}
      <canvas ref={canvasRef} className="hidden" />

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end md:justify-center pt-2 sm:pt-2.5 px-3 sm:px-4 nav-drop">
        {/* Desktop pill */}
        <div className="hidden md:flex bg-black/60 backdrop-blur-md rounded-full px-2 py-1 items-center gap-0.5 border border-white/10 shadow-lg shadow-black/40">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`text-xs lg:text-[13px] font-medium px-2.5 lg:px-3 py-1 rounded-full transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-white/40 ${
                  isActive
                    ? 'bg-white/15 text-white font-semibold shadow-sm'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile: hamburger pill */}
        <button
          className="md:hidden bg-black/60 backdrop-blur-md rounded-full p-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          {menuOpen ? <X size={20} color="white" /> : <Menu size={20} color="white" />}
        </button>
      </nav>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/10 pt-16 pb-6 px-6 shadow-2xl md:hidden"
        >
          <div className="flex flex-col">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeSection === item.id;
              const isLast = idx === NAV_ITEMS.length - 1;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`flex items-center justify-between py-3.5 ${
                    isLast ? '' : 'border-b border-white/10'
                  } text-sm font-medium transition-colors ${
                    isActive ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* ── HERO SECTION ── */}
      <section id="home" className="relative overflow-hidden" style={{ height: '100dvh' }}>
        {/* Layer 1: Grid background */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.1 }}>
            <defs>
              <pattern id="gridPattern" width="48" height="48" patternUnits="userSpaceOnUse" x="0" y="0">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#64748b" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridPattern)" />
          </svg>
        </div>

        {/* Layer 2: Base image with Ken Burns */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            zIndex: 10,
            backgroundImage: `url(${BG_IMAGE_1})`,
            animation: 'kenBurns 2.4s cubic-bezier(0.22,1,0.36,1) forwards',
          }}
        />

        {/* Layer 3: Cursor spotlight reveal */}
        <div
          ref={revealRef}
          className="absolute inset-0 bg-center bg-cover"
          style={{
            zIndex: 30,
            backgroundImage: `url(${BG_IMAGE_2})`,
          }}
        />

        {/* Layer 4: Stats arc */}
        <StatsArc />

        {/* Layer 5: Hero text block */}
        <div
          className="absolute bottom-24 sm:bottom-36 md:bottom-48 left-5 sm:left-8 md:left-12 max-w-[calc(100%-2.5rem)] sm:max-w-xl md:max-w-2xl"
          style={{ zIndex: 50 }}
        >
          {/* Eyebrow */}
          <div
            className="hero-rise flex items-center gap-2.5 sm:gap-3 mb-4"
            style={{ animationDelay: "0.15s" }}
          >
            <span
              className="inline-block w-7 sm:w-8 h-[1.5px] sm:h-[2px] bg-gradient-to-r from-[#FAF0DC] to-[#FCD982] rounded-full flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-xs sm:text-[13px] font-medium tracking-[0.05em] text-white uppercase font-sans">
              AI FULLSTACK
            </span>
          </div>

          {/* H1 */}
          <h1
            className="hero-rise font-sora font-extrabold text-[22px] min-[400px]:text-2xl sm:text-4xl md:text-5xl tracking-[-0.045em] text-white mb-4 sm:mb-5 flex flex-col leading-[1.0]"
            style={{ animationDelay: "0.3s" }}
          >
            <span style={{ textShadow: "0 3px 5px rgba(0, 0, 0, 0.30), 0 6px 16px rgba(0, 0, 0, 0.20)" }}>
              AI-Powered
            </span>
            <span
              className="text-black mt-0.5 sm:mt-1"
              style={{ textShadow: "0 2px 5px rgba(255, 255, 255, 0.20), 0 5px 14px rgba(255, 140, 40, 0.18)" }}
            >
              FullStack Developer
            </span>
          </h1>

          {/* Technology Badges (Logos Only) */}
          <div
            className="hero-rise flex flex-wrap items-center gap-2 sm:gap-2.5 mb-6 sm:mb-7"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              {
                name: "React",
                color: "#61DAFB",
                path: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z",
              },
              {
                name: "Python",
                color: "#3776AB",
                path: "M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z",
              },
              {
                name: "TypeScript",
                color: "#3178C6",
                path: "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z",
              },
              {
                name: "Next.js",
                color: "#FFFFFF",
                path: "M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z",
              },
              {
                name: "PyTorch",
                color: "#EE4C2C",
                path: "M12.005 0L4.952 7.053a9.865 9.865 0 000 14.022 9.866 9.866 0 0014.022 0c3.984-3.9 3.986-10.205.085-14.023l-1.744 1.743c2.904 2.905 2.904 7.634 0 10.538s-7.634 2.904-10.538 0-2.904-7.634 0-10.538l4.647-4.646.582-.665zm3.568 3.899a1.327 1.327 0 00-1.327 1.327 1.327 1.327 0 001.327 1.328A1.327 1.327 0 0016.9 5.226 1.327 1.327 0 0015.573 3.9z",
              },
              {
                name: "Claude",
                color: "#D97757",
                path: "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z",
              },
            ].map((tool) => (
              <div
                key={tool.name}
                role="img"
                aria-label={tool.name}
                title={tool.name}
                className="group relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-black/45 backdrop-blur-md border border-white/15 hover:border-orange-500/60 hover:bg-black/65 transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ color: tool.color }}
                  aria-hidden="true"
                >
                  <path d={tool.path} />
                </svg>
                {/* Tooltip */}
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-medium text-white bg-black/90 border border-white/15 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg z-50">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div className="hero-rise" style={{ animationDelay: '0.7s' }}>
            <button
              onClick={() => scrollToSection('contact')}
              className="group relative overflow-hidden bg-white text-gray-900 font-semibold px-7 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg shadow-black/20 hover:scale-[1.04] active:scale-95 transition-transform"
            >
              Contact Me
              {/* Shine sweep */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
            </button>
          </div>
        </div>
      </section>

      {/* ── PHASE 2: ABOUT SECTION ── */}
      <AboutSection />

      {/* ── PHASE 3: THE ENGINE ROOM (MY TOOLS) ── */}
      <EngineRoomSection />

      {/* ── PHASE 4: EDUCATION & GROWTH ── */}
      <EducationSection />

      {/* ── PHASE 5: PROJECTS (SELECTED WORK) ── */}
      <ProjectsSection />

      {/* ── PHASE 6: CONTACT & FOOTER ── */}
      <ContactSection />
    </div>
  );
}

