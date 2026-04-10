import { useState, useEffect, useRef } from "react";

const ITEMS = [
  { id: "about",   label: "ABOUT ME",      page: "about",   fontSize: 64, offsetX: 0,  offsetY: 0,  skew: -6,  skewY: 10  },
  { id: "resume",  label: "RESUME",        page: "resume",  fontSize: 52, offsetX: 24, offsetY: 50,  skew: -11, skewY: -10 },
  { id: "github",  label: "GITHUB LINK",   page: "github",  fontSize: 54, offsetX: 10, offsetY: 28,  skew: 0, skewY: -4  },
  { id: "socials", label: "SOCIALS",       page: "socials", fontSize: 59, offsetX: 19, offsetY: 30,  skew: -3,  skewY: 5   },
  { id: "sideproj",label: "SIDE PROJECTS", page: "sideproj",fontSize: 45, offsetX: 12, offsetY: 28,  skew: -4,  skewY: 7   },
];

const CLIP_SHAPES = [
  () => "polygon(0% 44%, 24% 6%, 82% 0%, 100% 36%, 82% 100%, 18% 94%)",
  () => "polygon(0% 44%, 24% 6%, 82% 0%, 100% 36%, 82% 100%, 18% 94%)",
  () => "polygon(0% 44%, 24% 6%, 82% 0%, 100% 36%, 82% 100%, 18% 94%)",
  () => "polygon(0% 44%, 24% 6%, 82% 0%, 100% 36%, 82% 100%, 18% 94%)",
  () => "polygon(0% 44%, 24% 6%, 82% 0%, 100% 36%, 82% 100%, 18% 94%)",
];

export default function P3Menu({ onNavigate }) {
  const [active, setActive] = useState(() => {
    const saved = sessionStorage.getItem('p3-menu-active');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [mounted, setMounted] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const selectSoundRef = useRef(null);

  const activate = (idx) => {
    setActive(idx);
    setAnimKey(k => k + 1);
  };

  const playSelectSound = () => {
    if (selectSoundRef.current) {
      selectSoundRef.current.currentTime = 0;
      selectSoundRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    sessionStorage.setItem('p3-menu-active', active);
    playSelectSound();
  }, [active]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   activate(Math.max(0, active - 1));
      if (e.key === "ArrowDown") activate(Math.min(ITEMS.length - 1, active + 1));
      if (e.key === "Enter") {
        onNavigate?.(ITEMS[active].page);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <style>{`
        .p3-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .p3-stripe  { position:absolute; right:0; top:0; bottom:0; width:5px; background:#ffffff; z-index:10; pointer-events:none; }
        .p3-stripe2 { position:absolute; right:9px; top:0; bottom:0; width:2px; background:rgba(255,255,255,0.22); z-index:10; pointer-events:none; }

        .p3-menu {
          position: relative;
          z-index: 20;
          padding: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          pointer-events: all;
        }

        .p3-row {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          text-decoration: none;
          opacity: 0;
          transform: translateX(36px);
          transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .p3-row.mounted {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        .p3-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 120%; height: 200%;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.35) 0%, transparent 70%);
          filter: blur(18px);
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .p3-row.active .p3-glow { opacity: 1; }

        .p3-skew-wrap {
          position: relative;
          display: flex;
          align-items: center;
          isolation: isolate;
        }

        @keyframes p3-shadow-pop {
          0%   { transform: translateY(-40%) translateX(-12px) scaleX(0) scaleY(1); }
          55%  { transform: translateY(-46%) translateX(-15px) scaleX(1.22) scaleY(1.18); }
          75%  { transform: translateY(-39%) translateX(-11px) scaleX(0.96) scaleY(0.97); }
          100% { transform: translateY(-40%) translateX(-12px) scaleX(1) scaleY(1); }
        }

        @keyframes p3-wiggle-poly {
          0%   { clip-path: polygon(0% 44%, 24% 6%, 82% 0%, 100% 36%, 82% 100%, 18% 94%); }
          25%  { clip-path: polygon(0% 48%, 22% 4%, 84% 2%, 100% 32%, 80% 100%, 16% 96%); }
          50%  { clip-path: polygon(0% 40%, 27% 8%, 80% 0%, 100% 40%, 84% 98%, 21% 92%); }
          75%  { clip-path: polygon(0% 46%, 23% 7%, 83% 1%, 100% 35%, 81% 100%, 17% 95%); }
          100% { clip-path: polygon(0% 44%, 24% 6%, 82% 0%, 100% 36%, 82% 100%, 18% 94%); }
        }

        .p3-shadow-tri {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: rgba(255,255,255,0.85);
          z-index: 1;
          pointer-events: none;
          transform: translateY(-40%) translateX(-12px) scaleX(0);
          transition: transform 0.18s ease;
        }
        .p3-shadow-tri.pop {
          animation: p3-shadow-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .p3-highlight {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: #0dd9ff;
          z-index: 2;
          transition: transform 0.22s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
        }
        .p3-row.active .p3-highlight {
          animation: p3-wiggle-poly 0.56s ease-in-out infinite;
        }

        .p3-label-wrap {
          position: relative;
          z-index: 3;
        }

        .p3-label-base {
          font-family: 'Persona5Main';
          font-style: italic;
          letter-spacing: 0.6px;
          line-height: 0.85;
          display: block;
          white-space: nowrap;
          user-select: none;
          color: #ffffff;
          -webkit-text-stroke: 18.2px rgba(0, 0, 0, 0.8);
          paint-order: stroke fill;
        }

        .p3-label-dark {
          color: #f6f3f3;
          transition: color 0.12s ease;
        }
        .p3-row.active .p3-label-dark { color: #ffffff; }
        .p3-row:hover:not(.active) .p3-label-dark { color: #ffffff; }

        .p3-label-bright {
          color: #1a1a1a;
          -webkit-text-stroke: 18.2px rgba(255, 255, 255, 0.9);
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.12s ease;
        }
        .p3-row.active .p3-label-bright { opacity: 1; }

        .p3-hint {
          position: absolute;
          bottom: 24px; right: 28px;
          z-index: 20;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Persona5Main';
          opacity: 0;
          transition: opacity 0.5s ease 0.9s;
        }
        .p3-hint.mounted { opacity: 1; }
        .p3-hint-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.28);
        }
        .p3-hint-key {
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }

        .p3-name-tag {
          position: absolute;
          top: 18px;
          left: 40px;
          z-index: 20;
          font-family: 'Persona5Main';
          font-style: italic;
          font-size: 65px;
          line-height: 0.88;
          letter-spacing: 2px;
          color: #ffffff;
          transform: rotate(18deg);
          transform-origin: left top;
          user-select: none;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .p3-name-tag span:first-child {
          color: #ffffff;
        }
      `}</style>

      <audio ref={selectSoundRef} src="/audio/select.mp3" preload="auto" />
      <div className="p3-overlay">
        <div className="p3-name-tag">
          <span>Francisco's</span>
          <span>persona</span>
        </div>

        <nav className="p3-menu">
          {ITEMS.map((item, i) => {
            const isActive = active === i;
            const dist = Math.abs(i - active);
            const opacity = isActive ? 1 : Math.max(0.5, 1 - dist * 0.2);
            const estW = item.label.length * item.fontSize * 0.6 + 80;
            const estH = item.fontSize * 0.94;
            const clipFn = CLIP_SHAPES[i] ?? CLIP_SHAPES[0];

            return (
              <a
                key={item.id}
                href="#"
                className={`p3-row ${isActive ? "active" : ""} ${mounted ? "mounted" : ""}`}
                style={{
                  marginRight: item.offsetX,
                  marginTop: item.offsetY,
                  transitionDelay: mounted ? `${i * 80}ms` : "0ms",
                }}
                onClick={(e) => { e.preventDefault(); onNavigate?.(item.page); }}
                onMouseEnter={() => activate(i)}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="p3-glow" />
                <div
                  className="p3-skew-wrap"
                  style={{ transform: `skewX(${item.skew}deg) skewY(${item.skewY}deg)` }}
                >
                  <div
                    key={isActive ? `pop-${i}-${animKey}` : `idle-${i}`}
                    className={`p3-shadow-tri${isActive ? ' pop' : ''}`}
                    style={{
                      width: estW,
                      height: estH,
                      clipPath: clipFn(estW, estH),
                    }}
                  />
                  <div
                    className="p3-highlight"
                    style={{
                      width: estW,
                      height: estH,
                      clipPath: clipFn(estW, estH),
                      transform: `translateY(-50%) scaleX(${isActive ? 1 : 0})`,
                    }}
                  />
                  <div className="p3-label-wrap" style={{ opacity }}>
                    <span className="p3-label-base p3-label-dark" style={{ fontSize: item.fontSize }}>
                      {item.label}
                    </span>
                    <span
                      className="p3-label-base p3-label-bright"
                      style={{
                        fontSize: item.fontSize,
                        clipPath: clipFn(estW, estH),
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </nav>

        <div className={`p3-hint ${mounted ? "mounted" : ""}`}>
          <div className="p3-hint-row"><span className="p3-hint-key">↑↓</span><span>NAVIGATE</span></div>
          <div className="p3-hint-row"><span className="p3-hint-key">↵</span><span>CONFIRM</span></div>
        </div>
      </div>
    </>
  );
}
