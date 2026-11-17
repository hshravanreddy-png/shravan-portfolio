import { useState, useEffect, useRef } from 'react';
import { Mail, Code2 } from 'lucide-react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Valid email format required';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatusMessage(null);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const recipient = 'ganeshalst98@gmail.com';
    const subject = formData.subject.trim();
    const body = `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`;

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open user's default email client
    window.location.href = mailtoUrl;

    setStatusMessage('Opening your default email application... Please press Send in your email client to dispatch.');
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2500);
  };

  const codeLines = [
    { num: 1, content: <span className="text-zinc-400">&#123;</span> },
    {
      num: 2,
      content: (
        <span className="pl-4 sm:pl-5">
          <span className="text-[#60A5FA]">"status"</span>: <span className="text-[#4ADE80]">"open_to_opportunities"</span>,
        </span>
      ),
    },
    {
      num: 3,
      content: (
        <span className="pl-4 sm:pl-5">
          <span className="text-[#60A5FA]">"email"</span>:{' '}
          <a
            href="mailto:ganeshalst98@gmail.com"
            className="text-[#4ADE80] hover:underline decoration-emerald-500/50 transition-colors"
            title="Send email to ganeshalst98@gmail.com"
          >
            "ganeshalst98@gmail.com"
          </a>
          ,
        </span>
      ),
    },
    {
      num: 4,
      content: (
        <span className="pl-4 sm:pl-5">
          <span className="text-[#60A5FA]">"location"</span>: <span className="text-[#4ADE80]">"Bengaluru, Karnataka, India"</span>
        </span>
      ),
    },
    { num: 5, content: <span className="text-zinc-400">&#125;</span> },
    { num: 6, content: <span>&nbsp;</span> },
    {
      num: 7,
      content: (
        <span className="text-zinc-500 italic flex items-center">
          <span>// Waiting for connection...</span>
          <span className="inline-block w-1.5 h-3.5 bg-zinc-500 ml-1.5 animate-pulse" />
        </span>
      ),
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-16 border-t border-zinc-800/80 bg-[#0c0c0f]"
      style={{
        backgroundColor: '#0c0c0f',
        backgroundImage: `
          linear-gradient(to right, rgba(255, 117, 24, 0.045) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 117, 24, 0.045) 1px, transparent 1px)
        `,
        backgroundSize: '44px 44px',
      }}
    >
      {/* Subtle top & bottom vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0c0c0f]/40 via-transparent to-[#0c0c0f]/80"
        aria-hidden="true"
      />

      <div className="relative max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Heading: ✉ $ ./contact.exe */}
        <div
          className={`mb-8 sm:mb-12 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="font-mono font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight flex items-center gap-3.5">
            <Mail size={32} className="text-[#FF7518] shrink-0" strokeWidth={2.2} />
            <span>$ ./contact.exe</span>
          </h2>
        </div>

        {/* ── TWO-PANEL HORIZONTAL CODE-EDITOR LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* ── LEFT PANEL: contact_info.json ── */}
          <div
            className={`flex flex-col rounded-2xl border border-zinc-800/90 bg-[#101014]/95 backdrop-blur-md shadow-2xl shadow-black/80 overflow-hidden transition-all duration-700 delay-100 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Editor Window Top Bar */}
            <div className="flex items-center justify-between px-5 sm:px-6 pt-4 pb-2 select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-xs">
                <Code2 size={13} className="text-zinc-500" />
                <span>contact_info.json</span>
              </div>
            </div>

            {/* Code Body with Line Numbers */}
            <div className="p-5 sm:p-7 font-mono text-xs sm:text-[13px] leading-relaxed flex-1 flex flex-col justify-between overflow-x-auto">
              <div className="flex flex-col space-y-1 sm:space-y-1.5">
                {codeLines.map((line) => (
                  <div key={line.num} className="flex items-center whitespace-nowrap">
                    <span className="w-5 sm:w-6 text-right text-zinc-600 select-none mr-4 sm:mr-5 shrink-0">
                      {line.num}
                    </span>
                    <div className="flex-1 text-zinc-300">{line.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL: compose.tsx ── */}
          <div
            className={`flex flex-col rounded-2xl border border-zinc-800/90 bg-[#101014]/95 backdrop-blur-md shadow-2xl shadow-black/80 overflow-hidden transition-all duration-700 delay-200 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Editor Window Top Bar */}
            <div className="flex items-center justify-between px-5 sm:px-6 pt-4 pb-2 select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-xs">
                <Code2 size={13} className="text-zinc-500" />
                <span>compose.tsx</span>
              </div>
            </div>

            {/* Compose Form Body */}
            <form onSubmit={handleSubmit} noValidate className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                {/* Destination line */}
                <div className="font-mono text-xs sm:text-[13px] mb-5 flex items-center gap-2">
                  <span className="text-zinc-500">to:</span>
                  <span className="text-[#4ADE80] font-medium">ganeshalst98@gmail.com</span>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="NAME"
                        aria-label="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 rounded-lg bg-[#15151B] border ${
                          errors.name
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-zinc-800/90 focus:border-[#FF7518]'
                        } text-white font-mono text-xs sm:text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#FF7518]/40 transition-colors`}
                      />
                      {errors.name && (
                        <p className="text-red-400 font-mono text-[11px] mt-1 pl-1">
                          ! {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="EMAIL"
                        aria-label="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 rounded-lg bg-[#15151B] border ${
                          errors.email
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-zinc-800/90 focus:border-[#FF7518]'
                        } text-white font-mono text-xs sm:text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#FF7518]/40 transition-colors`}
                      />
                      {errors.email && (
                        <p className="text-red-400 font-mono text-[11px] mt-1 pl-1">
                          ! {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="SUBJECT"
                      aria-label="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-lg bg-[#15151B] border ${
                        errors.subject
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-zinc-800/90 focus:border-[#FF7518]'
                      } text-white font-mono text-xs sm:text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#FF7518]/40 transition-colors`}
                    />
                    {errors.subject && (
                      <p className="text-red-400 font-mono text-[11px] mt-1 pl-1">
                        ! {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      name="message"
                      placeholder="MESSAGE"
                      aria-label="Message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-lg bg-[#15151B] border ${
                        errors.message
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-zinc-800/90 focus:border-[#FF7518]'
                      } text-white font-mono text-xs sm:text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#FF7518]/40 transition-colors resize-none`}
                    />
                    {errors.message && (
                      <p className="text-red-400 font-mono text-[11px] mt-1 pl-1">
                        ! {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Security note */}
                  <p className="font-mono text-[11px] sm:text-xs text-zinc-500 italic pt-1">
                    // Protected by spam filters and client-side validation
                  </p>
                </div>
              </div>

              {/* Submit Button & Status Feedback */}
              <div className="mt-5 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 rounded-xl font-mono font-bold text-xs sm:text-[13px] tracking-[0.16em] text-white/95 uppercase bg-gradient-to-r from-[#942717] via-[#852214] to-[#691A0F] hover:from-[#B8321D] hover:via-[#A32A17] hover:to-[#821E12] active:scale-[0.99] transition-all duration-300 shadow-[0_4px_20px_rgba(148,39,23,0.35)] hover:shadow-[0_6px_24px_rgba(184,50,29,0.5)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? 'PREPARING DISPATCH...' : 'SEND MESSAGE'}
                </button>

                {statusMessage && (
                  <div className="mt-3.5 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 font-mono text-xs text-emerald-300 text-center leading-relaxed">
                    {statusMessage}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer className="mt-16 sm:mt-20 pt-8 border-t border-zinc-800/40 text-center">
          <p className="font-mono text-[11px] sm:text-xs text-zinc-500 tracking-wider">
            &copy; 2026 Shravan Kumar Reddy · Built with React, Vite &amp; Tailwind CSS
          </p>
        </footer>
      </div>
    </section>
  );
}
