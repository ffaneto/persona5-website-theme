import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  {
    id: "gestao-vendas",
    title: "SALES MANAGEMENT",
    stack: "Java",
    summary: "Sales management system.",
    href: "https://github.com/ffaneto/gestao-vendas-3-info-vesp-1.0",
  },
  {
    id: "calculadora-arranjo",
    title: "ARRANGEMENT CALCULATOR",
    stack: "Java",
    summary: "Arrangements, combinations, and permutations calculator.",
    href: "https://github.com/ffaneto/calculadora-arranjo-combinacao-permutacao-java",
  },
  {
    id: "questoes-javascript",
    title: "JS EXERCISES",
    stack: "JavaScript",
    summary: "JavaScript functions-focused problem solving.",
    href: "https://github.com/ffaneto/questoes-funcoes-javascript",
  },
  {
    id: "curso-nelio",
    title: "NELIO ALVES LABS",
    stack: "Java",
    summary: "Projects and solved exercises from Nelio Alves's course.",
    href: "https://github.com/ffaneto/curso-nelio-alves",
  },
  {
    id: "outras-questoes",
    title: "MORE EXERCISES",
    stack: "Java",
    summary: "More solved exercises from Nelio Alves's course.",
    href: "https://github.com/ffaneto/outras-questoes-nelio-alves",
  }
];

export default function SideProjectsPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter") window.open(ITEMS[active].href, "_blank", "noopener,noreferrer");
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate]);

  return (
    <div id="menu-screen">
      {/* <video src={bgVideo} autoPlay loop muted playsInline /> */}

      <style>{`
        .sp-shell {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: grid;
          grid-template-columns: 48% 52%;
          gap: 20px;
          padding: 6vh 3vw;
        }

        .sp-left {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sp-title {
          font-family: 'Persona5Main', sans-serif;
          font-size: 72px;
          color: #ffffff;
          line-height: 0.92;
          letter-spacing: 1px;
          text-shadow: 0 2px 0 rgba(13,13,13,0.3);
          margin-bottom: 8px;
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .sp-title.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .sp-item {
          position: relative;
          min-height: 94px;
          background: rgba(13,13,13,0.94);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14), 0 8px 16px rgba(13,13,13,0.35);
          padding: 14px 16px;
          cursor: pointer;
          opacity: 0;
          transform: translateX(-36px);
          transition: transform 0.24s ease, background 0.24s ease, opacity 0.4s ease;
        }
        .sp-item.mounted {
          opacity: 1;
          transform: translateX(0);
        }
        .sp-item.active {
          background: rgba(255, 255, 255, 0.97);
          transform: translateX(6px);
        }

        .sp-item-title {
          font-family: 'Persona5Main', sans-serif;
          font-size: 42px;
          line-height: 0.9;
          color: #ffffff;
        }
        .sp-item.active .sp-item-title {
          color: #111;
        }

        .sp-item-stack {
          font-family: 'Persona5Main', sans-serif;
          font-size: 26px;
          letter-spacing: 1.4px;
          color: #ffffff;
          margin-top: 4px;
        }
        .sp-item.active .sp-item-stack {
          color: #0d0d0d;
        }

        .sp-right {
          position: relative;
          background: linear-gradient(180deg, rgba(13,13,13,0.96) 0%, rgba(13,13,13,0.96) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.16), 12px 12px 0 rgba(13,13,13,0.5);
          padding: 24px;
          overflow: hidden;
        }

        .sp-tag {
          display: inline-block;
          font-family: 'Persona5Main', sans-serif;
          font-size: 24px;
          letter-spacing: 1.6px;
          background: #ffffff;
          color: #0d0d0d;
          padding: 4px 10px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }

        .sp-right-title {
          font-family: 'Persona5Main', sans-serif;
          font-size: 64px;
          line-height: 0.92;
          color: #ffffff;
          margin-top: 16px;
        }

        .sp-right-summary {
          margin-top: 16px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 38px;
          line-height: 1.05;
          letter-spacing: 1px;
          color: #ffffff;
        }

        .sp-link {
          margin-top: 24px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 0px;
          color: #ffffff;
          background: #d92323;
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
        }

        .sp-footer {
          position: fixed;
          right: 28px;
          bottom: 20px;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          font-family: 'Persona5Main', sans-serif;
          color: rgba(255,255,255,0.7);
          letter-spacing: 2px;
          font-size: 12px;
        }
      `}</style>

      <div className="sp-shell">
        <div className="sp-left">
          <div className={`sp-title${mounted ? " mounted" : ""}`}>PROJECT LOG</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`sp-item${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => setActive(index)}
              onClick={() => window.open(item.href, "_blank", "noopener,noreferrer")}
            >
              <div className="sp-item-title">{item.title}</div>
              <div className="sp-item-stack">{item.stack}</div>
            </div>
          ))}
        </div>

        <div className="sp-right">
          <div className="sp-tag">NEW SECTION</div>
          <div className="sp-right-title">{ITEMS[active].title}</div>
          <div className="sp-right-summary">{ITEMS[active].summary}</div>
          <div className="sp-link">OPEN LINK: {ITEMS[active].href.replace("https://", "")}</div>
        </div>
      </div>

      <div className="sp-footer">
        <div>UP / DOWN SELECT</div>
        <div>ENTER OPEN</div>
        <div>ESC BACK</div>
      </div>
    </div>
  );
}
