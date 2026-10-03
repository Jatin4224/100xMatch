// little poster-style stickers used around the UI

export const Bolt = ({ className = "w-12" }) => (
  <svg viewBox="0 0 64 80" className={className} aria-hidden="true">
    <path
      d="M38 2 6 46h22l-8 32 38-48H34l8-28z"
      fill="#FF2E93"
      stroke="#0A0A0D"
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </svg>
);

export const Heart = ({ className = "w-8", fill = "#FFC6E3" }) => (
  <svg viewBox="0 0 64 58" className={className} aria-hidden="true">
    <path
      d="M32 54S4 38 4 19A14 14 0 0 1 32 12a14 14 0 0 1 28 7c0 19-28 35-28 35z"
      fill={fill}
      stroke="#0A0A0D"
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </svg>
);

export const Sparkle = ({ className = "w-6" }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
    <path
      d="M20 2c2 10 8 16 18 18-10 2-16 8-18 18-2-10-8-16-18-18C12 18 18 12 20 2z"
      fill="#FFFFFF"
      stroke="#0A0A0D"
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </svg>
);

export const Spinner = () => (
  <div className="flex flex-col items-center gap-3 mt-20">
    <Heart className="w-14 animate-bounce" />
    <p className="scribble text-2xl">finding your people...</p>
  </div>
);

export const EmptyState = ({ title, note, children }) => (
  <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 text-center">
    <Heart className="w-20 animate-float" />
    <h1 className="title-bubble text-5xl">{title}</h1>
    <p className="scribble text-3xl">{note}</p>
    {children}
  </div>
);
