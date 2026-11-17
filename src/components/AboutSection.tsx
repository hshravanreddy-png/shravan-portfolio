import { useEffect, useRef, useState, useMemo } from 'react';
import { Play, RotateCcw, Volume2 } from 'lucide-react';

// Helper to normalize words for keyword matching (strips trailing/leading punctuation)
function normalizeWord(word: string): string {
  return word.toLowerCase().replace(/^[^\w]+|[^\w]+$/g, '');
}

interface KineticParagraphProps {
  text: string;
  keywordSet: Set<string>;
  className?: string;
}

function KineticParagraph({ text, keywordSet, className = '' }: KineticParagraphProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const words = useMemo(() => text.split(/\s+/), [text]);

  const [activeWordCount, setActiveWordCount] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return text.split(/\s+/).length;
    }
    return 0;
  });

  useEffect(() => {
    const el = paragraphRef.current;
    if (!el) return;

    // Respect user's motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setActiveWordCount(words.length);
      return;
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setActiveWordCount(words.length);
      }
    };
    mediaQuery.addEventListener?.('change', handleMediaChange);

    let rafId: number | null = null;

    const updateHighlight = () => {
      if (mediaQuery.matches) {
        setActiveWordCount(words.length);
        return;
      }

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start highlighting when element top is at 88% of viewport
      const startPoint = windowHeight * 0.88;
      // Complete highlighting when element top reaches 38% of viewport
      const endPoint = windowHeight * 0.38;

      const rawProgress = (startPoint - rect.top) / (startPoint - endPoint);
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      const targetCount = Math.round(progress * words.length);

      setActiveWordCount((prev) => (prev !== targetCount ? targetCount : prev));
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateHighlight();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateHighlight();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      mediaQuery.removeEventListener?.('change', handleMediaChange);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [words.length]);

  return (
    <p
      ref={paragraphRef}
      className={`font-sora text-[21px] font-normal leading-[1.5] tracking-[-0.01em] text-left sm:text-justify ${className}`}
      style={{
        fontSize: '21px',
        lineHeight: '1.5',
        fontWeight: 400,
        letterSpacing: '-0.01em',
        textJustify: 'inter-word',
        textAlignLast: 'left',
      }}
    >
      {words.map((word, index) => {
        const isHighlighted = index < activeWordCount;
        const clean = normalizeWord(word);
        const isKeyword = keywordSet.has(clean);

        let colorClasses = 'text-[#777777]';
        let textShadow = 'none';

        if (isHighlighted) {
          if (isKeyword) {
            colorClasses = 'text-[#FF7518]';
            textShadow = '0 0 16px rgba(255, 117, 24, 0.42)';
          } else {
            colorClasses = 'text-[#F5F5F5]';
          }
        }

        return (
          <span key={index}>
            <span
              className={`transition-colors duration-200 ease-out ${colorClasses}`}
              style={{
                textShadow,
                fontSize: 'inherit',
                fontWeight: 'inherit',
                lineHeight: 'inherit',
                letterSpacing: 'inherit',
              }}
            >
              {word}
            </span>
            {index < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </p>
  );
}

interface CinematicMediaProps {
  imageSrc?: string;
  videoSrc?: string;
  videoSrcWebm?: string;
  alt?: string;
  className?: string;
  containerRef?: React.Ref<HTMLDivElement>;
}

// 9:16 Cinematic Media Component: supports interactive tap-to-play introduction with original audio
function CinematicMedia({
  imageSrc = '/hero-reveal-blazer.jpg',
  videoSrc = '/about-portrait-video.mp4',
  videoSrcWebm,
  alt = 'Shravan Kumar Reddy - Portrait Video',
  className = '',
  containerRef,
}: CinematicMediaProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const wasPlayingRef = useRef(false);

  const hasVideo = Boolean(videoSrc || videoSrcWebm) && !videoFailed;

  // Visibility and scroll observer:
  // If playing and user scrolls away, pause to save resources.
  // When scrolling back into view, resume playback with audio preserved without restarting from 0.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // If video was actively playing before scrolling away, resume with sound
          if (wasPlayingRef.current && !video.ended) {
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
          }
        } else {
          // Scrolled out of view: pause playing video to save resources
          if (!video.paused && !video.ended) {
            wasPlayingRef.current = true;
            video.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [hasVideo]);

  // Handle explicit user tap/click to start video with original sound
  const handlePlayIntroduction = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      setPlaybackError(null);
      video.muted = false;
      video.volume = 0.8;
      if (isEnded) {
        video.currentTime = 0;
        setIsEnded(false);
      }
      await video.play();
      setHasStarted(true);
      setIsPlaying(true);
      wasPlayingRef.current = true;
    } catch (err: any) {
      console.error('Video playback failed:', err);
      setPlaybackError('Tap again to play introduction');
    }
  };

  // Toggle pause/play when clicking the active video
  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video || !hasStarted || isEnded) return;

    if (video.paused) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          wasPlayingRef.current = true;
        })
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
      wasPlayingRef.current = false;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative group max-w-[280px] sm:max-w-[320px] lg:max-w-[390px] xl:max-w-[410px] w-full mx-auto lg:mx-0 ${className}`}
    >
      {/* Subtle orange ambient glow behind the portrait */}
      <div
        className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-[#FF5A00]/25 via-[#FF8A00]/15 to-transparent blur-3xl rounded-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Restrained Halftone / Dot Matrix Pattern Treatment */}
      <div
        className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-48 sm:w-64 h-48 sm:h-64 pointer-events-none opacity-20 -z-10"
        aria-hidden="true"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="aboutHalftoneDivider" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#FF8A00" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#aboutHalftoneDivider)" />
        </svg>
      </div>

      {/* 9:16 Cinematic Media Frame (1080 x 1920 portrait format) */}
      <div
        className="relative rounded-2xl overflow-hidden aspect-[9/16] bg-neutral-950 border border-white/10 shadow-2xl shadow-black/90 w-full"
        style={{ aspectRatio: '9 / 16' }}
      >
        {hasVideo ? (
          <>
            <video
              ref={videoRef}
              playsInline
              preload="auto"
              poster={imageSrc}
              onClick={handleTogglePlay}
              onEnded={() => {
                setIsEnded(true);
                setIsPlaying(false);
                wasPlayingRef.current = false;
              }}
              onError={() => setVideoFailed(true)}
              className={`w-full h-full object-cover filter contrast-[1.04] brightness-[0.98] ${
                isPlaying ? 'cursor-pointer' : ''
              } group-hover:scale-[1.01] transition-transform duration-700 ease-out`}
            >
              {videoSrcWebm && <source src={videoSrcWebm} type="video/webm" />}
              {videoSrc && <source src={videoSrc} type="video/mp4" />}
              {/* Fallback image inside video element */}
              <img
                src={imageSrc}
                alt={alt}
                loading="lazy"
                className="w-full h-full object-cover object-[70%_25%] filter contrast-[1.04] brightness-[0.98]"
              />
            </video>

            {/* Tap-To-Play / Replay Introduction Overlay */}
            {(!hasStarted || !isPlaying || isEnded) && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-black/40 backdrop-blur-[2px] transition-all duration-300">
                <button
                  type="button"
                  onClick={handlePlayIntroduction}
                  aria-label={
                    isEnded
                      ? 'Replay introduction with sound'
                      : 'Play my introduction with sound'
                  }
                  className="group/btn flex flex-col items-center justify-center text-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7518] rounded-2xl p-4 transition-transform active:scale-95"
                >
                  {/* Circular play icon with radiant orange glow */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#FF5A00] to-[#FF8A00] p-[2px] shadow-[0_0_30px_rgba(255,117,24,0.55)] group-hover/btn:shadow-[0_0_45px_rgba(255,117,24,0.85)] group-hover/btn:scale-105 transition-all duration-300 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-neutral-950/90 flex items-center justify-center backdrop-blur-sm group-hover/btn:bg-neutral-950/70 transition-colors">
                      {isEnded ? (
                        <RotateCcw size={28} className="text-[#FF8A00]" />
                      ) : (
                        <Play
                          size={28}
                          className="text-[#FF8A00] translate-x-0.5 fill-[#FF8A00]"
                        />
                      )}
                    </div>
                  </div>

                  {/* Instruction text */}
                  <div className="mt-4 sm:mt-5 flex flex-col items-center space-y-1">
                    <span className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.2em] text-white uppercase group-hover/btn:text-[#FF8A00] transition-colors">
                      {isEnded ? 'REPLAY' : hasStarted ? 'TAP TO RESUME' : 'TAP TO START'}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] font-medium tracking-[0.16em] text-white/75 uppercase">
                      {isEnded ? 'INTRODUCTION' : 'MY INTRODUCTION'}
                    </span>
                  </div>

                  {/* Sound indicator badge */}
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[9.5px] font-mono text-white/70 tracking-wider uppercase">
                    <Volume2 size={11} className="text-[#FF8A00]" />
                    <span>Original Audio</span>
                  </div>

                  {playbackError && (
                    <p className="mt-2 text-xs font-mono text-amber-400 bg-black/80 px-2.5 py-1 rounded border border-amber-500/30">
                      {playbackError}
                    </p>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <img
            src={imageSrc}
            alt={alt}
            loading="lazy"
            className="w-full h-full object-cover object-[70%_25%] filter contrast-[1.04] brightness-[0.98] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
        )}

        {/* Subtle vignette depth */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const desktopMediaRef = useRef<HTMLDivElement>(null);
  const verticalDividerFillRef = useRef<HTMLDivElement>(null);
  const horizontalDividerFillRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [desktopMediaHeight, setDesktopMediaHeight] = useState<number | null>(null);

  // Exact vertical alignment measurement between left column and right 9:16 media container
  useEffect(() => {
    const updateDesktopMediaHeight = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024 && desktopMediaRef.current) {
        // Measure the inner 9:16 media frame (actual visible top to bottom)
        const frame = desktopMediaRef.current.querySelector('.aspect-\\[9\\/16\\]') as HTMLElement;
        const target = frame || desktopMediaRef.current;
        const height = target.offsetHeight;
        if (height > 0) {
          setDesktopMediaHeight(height);
        }
      } else {
        setDesktopMediaHeight(null);
      }
    };

    updateDesktopMediaHeight();

    const ro = new ResizeObserver(updateDesktopMediaHeight);
    if (desktopMediaRef.current) ro.observe(desktopMediaRef.current);

    window.addEventListener('resize', updateDesktopMediaHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateDesktopMediaHeight);
    };
  }, []);

  // IntersectionObserver for initial section entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Synchronized scroll loop: handles vertical divider progression
  useEffect(() => {
    const section = sectionRef.current;
    const narrative = narrativeRef.current;
    if (!section || !narrative) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (verticalDividerFillRef.current) verticalDividerFillRef.current.style.height = '100%';
      if (horizontalDividerFillRef.current) horizontalDividerFillRef.current.style.width = '100%';
      return;
    }

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;

        // Vertical & Horizontal Divider Progression across the Two Chapters
        // Starts when narrative top reaches 75% of viewport height
        // Completes (100%) when narrative bottom reaches 80% of viewport height
        const narrRect = narrative.getBoundingClientRect();
        const startPoint = windowHeight * 0.75;
        const endPoint = windowHeight * 0.80;
        const totalScrollDistance = narrRect.height + startPoint - endPoint;

        const scrolled = startPoint - narrRect.top;
        const progress = totalScrollDistance > 0 ? Math.min(Math.max(scrolled / totalScrollDistance, 0), 1) : 0;
        const percentage = `${(progress * 100).toFixed(1)}%`;

        if (verticalDividerFillRef.current) {
          verticalDividerFillRef.current.style.height = percentage;
        }
        if (horizontalDividerFillRef.current) {
          horizontalDividerFillRef.current.style.width = percentage;
        }

        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Curated keyword sets for restrained #FF7518 illumination
  const keywordsSection1 = useMemo(
    () =>
      new Set([
        'shravan',
        'kumar',
        'reddy',
        'ai-powered',
        'fullstack',
        'developer',
        'intelligent',
        'scalable',
        'lifecycle',
        'intuitive',
        'interfaces',
        'reliable',
        'backend',
        'artificial',
        'intelligence',
        'practical',
      ]),
    []
  );

  const keywordsSection2 = useMemo(
    () =>
      new Set([
        'frontend',
        'engineering',
        'backend',
        'architecture',
        'applied',
        'ai',
        'meaningful',
        'digital',
        'products',
        'intuitive',
        'user',
        'experiences',
        'reliable',
        'application',
        'systems',
        'intelligent',
        'capabilities',
        'everyday',
        'applications',
        'react',
        'next.js',
        'javascript',
        'typescript',
        'tailwind',
        'css',
        'responsive',
        'node.js',
        'django',
        'python',
        'rest',
        'apis',
        'databases',
        'complex',
        'problems',
        'modern',
        'technologies',
        'ai-powered',
        'tools',
        'practical',
        'software',
        'solutions',
        'skills',
        'emerging',
        'frameworks',
        'development',
        'practices',
      ]),
    []
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#000000] text-white pt-20 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-20 border-t border-white/[0.08]"
    >
      {/* Background ambient lighting - restrained cinematic warmth */}
      <div
        className="pointer-events-none absolute -top-44 left-1/4 w-[500px] sm:w-[750px] h-[300px] sm:h-[450px] bg-gradient-to-b from-[#FF5A00]/15 via-[#B94700]/10 to-transparent blur-[140px] rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-0 w-[450px] h-[450px] bg-gradient-to-t from-[#FF8A00]/10 to-transparent blur-[150px] rounded-full"
        aria-hidden="true"
      />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* 1. OVERSIZED ABOUT HEADING WITH EXPANDED HORIZONTAL ACCENT LINE */}
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2
            className="inline-flex items-center gap-3 sm:gap-5 md:gap-7 lg:gap-9 font-sora font-extrabold text-[19vw] sm:text-[18vw] md:text-[17vw] lg:text-[16.5vw] xl:text-[230px] leading-[0.85] tracking-[-0.04em] text-left select-none"
          >
            <span className="bg-gradient-to-r from-[#FF5A00] via-[#FF8A00] to-[#B94700] bg-clip-text text-transparent">
              ABOUT
            </span>
            <span
              className="inline-block w-12 sm:w-28 md:w-44 lg:w-60 xl:w-72 h-[3.5px] sm:h-[5px] lg:h-[6px] rounded-full bg-gradient-to-r from-[#FF8A00] to-[#B94700] flex-shrink-0"
              aria-hidden="true"
            />
          </h2>
        </div>

        {/* 2. STRICT TWO-CHAPTER EDITORIAL CONTENT WITH EXACT VERTICAL ALIGNMENT */}
        <div className="mt-14 sm:mt-20 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start relative">
          {/* Left Column: Exactly Two Chapters with controlled natural editorial spacing */}
          <div
            ref={narrativeRef}
            style={desktopMediaHeight ? { minHeight: `${desktopMediaHeight}px` } : undefined}
            className={`lg:col-span-7 flex flex-col lg:pr-12 xl:pr-16 relative transition-opacity duration-700 delay-150 ease-out ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Desktop Vertical Scroll-Driven Divider (spans exact media height) */}
            <div
              className="hidden lg:block absolute right-0 top-0 bottom-0 w-[1px] bg-[#292929]"
              aria-hidden="true"
            >
              {/* Active Progressive Illuminated Portion */}
              <div
                ref={verticalDividerFillRef}
                className="w-full bg-gradient-to-b from-[#FF5A00] via-[#FF7518] to-[#FF8A00] shadow-[0_0_12px_rgba(255,117,24,0.65)] rounded-full transition-all duration-75 ease-out"
                style={{ height: '0%' }}
              />
            </div>

            {/* CHAPTER 01 // INTRODUCTION */}
            <div className="flex flex-col space-y-4 sm:space-y-5">
              <div className="flex items-center gap-3 font-mono text-xs sm:text-[13px] tracking-[0.25em] text-[#FF8A00] font-semibold uppercase mb-1.5">
                <span className="w-6 h-[1.5px] bg-[#FF8A00] rounded-full inline-block" aria-hidden="true" />
                <span>01 // INTRODUCTION</span>
              </div>

              {/* Paragraph 1 */}
              <KineticParagraph
                text="I am Shravan Kumar Reddy, an AI-Powered Fullstack Developer focused on building modern, intelligent and scalable digital experiences."
                keywordSet={keywordsSection1}
              />

              {/* Paragraph 2 */}
              <KineticParagraph
                text="I enjoy working across the entire development lifecycle, from designing intuitive interfaces to engineering reliable backend systems and integrating artificial intelligence into practical applications."
                keywordSet={keywordsSection1}
              />
            </div>

            {/* MOBILE ONLY PORTRAIT INTERLEAVE: Visible on tablet/mobile (< 1024px) for balanced storytelling */}
            <div className="lg:hidden my-2">
              <CinematicMedia />

              {/* Mobile Horizontal Scroll-Driven Divider */}
              <div className="w-full h-[1px] bg-[#292929] mt-8 mb-2 relative overflow-hidden" aria-hidden="true">
                <div
                  ref={horizontalDividerFillRef}
                  className="h-full bg-gradient-to-r from-[#FF5A00] via-[#FF7518] to-[#FF8A00] shadow-[0_0_10px_rgba(255,117,24,0.55)] rounded-full transition-all duration-75 ease-out"
                  style={{ width: '0%' }}
                />
              </div>
            </div>

            {/* CHAPTER 02 // WHAT I BUILD (Natural 64-80px editorial visual separation on desktop) */}
            <div className="flex flex-col space-y-4 sm:space-y-5 mt-10 sm:mt-12 lg:mt-[76px]">
              <div className="flex items-center gap-3 font-mono text-xs sm:text-[13px] tracking-[0.25em] text-[#FF8A00] font-semibold uppercase mb-1.5">
                <span className="w-6 h-[1.5px] bg-[#FF8A00] rounded-full inline-block" aria-hidden="true" />
                <span>02 // WHAT I BUILD</span>
              </div>

              {/* Paragraph 1 — Expanded Lead (one continuous paragraph) */}
              <KineticParagraph
                text="My work combines frontend engineering, backend architecture and applied AI to create meaningful digital products. I focus on building intuitive user experiences, developing reliable application systems and bringing intelligent capabilities into everyday applications."
                keywordSet={keywordsSection2}
              />

              {/* Paragraph 2 — Combined technical description */}
              <KineticParagraph
                text="On the frontend, I work with React, Next.js, JavaScript, TypeScript and Tailwind CSS to create responsive and engaging user experiences. On the backend, I work with Node.js, Django, Python, REST APIs and databases to build reliable application architectures. I also enjoy solving complex problems and integrating AI-powered tools to transform ideas into practical software solutions."
                keywordSet={keywordsSection2}
              />
            </div>
          </div>

          {/* Right Column: Desktop 9:16 Cinematic Media Container (5 cols on desktop) */}
          <div
            className={`hidden lg:flex lg:col-span-5 lg:pl-12 xl:pl-16 transition-opacity duration-700 delay-300 ease-out ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <CinematicMedia containerRef={desktopMediaRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
