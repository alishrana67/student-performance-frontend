import { useEffect, useRef, useState } from "react";

/**
 * Welcome intro — built with plain HTML, CSS and JS only.
 * Canvas particle field + orbiting rings + typewriter + curtain split exit.
 */
export function WelcomeIntro() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const typeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), 3000);
    const t2 = setTimeout(() => setPhase("gone"), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // typewriter (plain JS)
  useEffect(() => {
    const el = typeRef.current;
    if (!el) return;
    const text = "Opening your page";
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      el.textContent = text.slice(0, i);
      if (i >= text.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, []);

  // particle field (plain JS on canvas)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0012,
      vy: (Math.random() - 0.5) * 0.0012,
      r: Math.random() * 1.6 + 0.6,
    }));

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
      }
      // links
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = (pts[i].x - pts[j].x) * w;
          const dy = (pts[i].y - pts[j].y) * h;
          const d = Math.hypot(dx, dy);
          if (d < 130 * dpr) {
            ctx.strokeStyle = `rgba(59,130,246,${0.28 * (1 - d / (130 * dpr))})`;
            ctx.lineWidth = dpr * 0.6;
            ctx.beginPath();
            ctx.moveTo(pts[i].x * w, pts[i].y * h);
            ctx.lineTo(pts[j].x * w, pts[j].y * h);
            ctx.stroke();
          }
        }
      }
      // dots
      for (const p of pts) {
        ctx.fillStyle = "rgba(6,182,212,0.75)";
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`ssai-intro ${phase === "out" ? "is-out" : ""}`} aria-hidden={phase !== "in"}>
      {/* curtain halves */}
      <div className="ssai-curtain ssai-curtain-l" />
      <div className="ssai-curtain ssai-curtain-r" />

      <canvas ref={canvasRef} className="ssai-canvas" />

      <div className="ssai-center">
        <div className="ssai-orbit">
          <span className="ssai-ring ssai-ring-1" />
          <span className="ssai-ring ssai-ring-2" />
          <span className="ssai-ring ssai-ring-3" />
          <div className="ssai-core">
            <span className="ssai-core-text">S</span>
          </div>
        </div>

        <h1 className="ssai-title">
          <span className="ssai-word">Score</span>
          <span className="ssai-word ssai-word-2">Sense</span>
          <span className="ssai-word ssai-word-3">AI</span>
        </h1>

        <p className="ssai-sub">Intelligent Student Performance Prediction</p>

        <p className="ssai-status">
          <span ref={typeRef} />
          <span className="ssai-caret" />
        </p>

        <div className="ssai-bar">
          <i />
        </div>
      </div>

      <style>{`
        .ssai-intro{
          position:fixed; inset:0; z-index:100; overflow:hidden;
          display:flex; align-items:center; justify-content:center;
          background:
            radial-gradient(1100px 600px at 50% 20%, rgba(59,130,246,.20), transparent 60%),
            radial-gradient(900px 520px at 50% 100%, rgba(6,182,212,.16), transparent 55%),
            #05070f;
          transition: opacity .55s ease;
        }
        .ssai-intro.is-out{ opacity:0; pointer-events:none; }
        .ssai-canvas{ position:absolute; inset:0; width:100%; height:100%; opacity:.85; }

        .ssai-curtain{
          position:absolute; top:0; bottom:0; width:50%;
          background:#05070f; z-index:3;
          transition: transform .9s cubic-bezier(.7,0,.2,1);
        }
        .ssai-curtain-l{ left:0; transform:translateX(0); animation: ssaiOpenL 1s .25s cubic-bezier(.7,0,.2,1) forwards; }
        .ssai-curtain-r{ right:0; transform:translateX(0); animation: ssaiOpenR 1s .25s cubic-bezier(.7,0,.2,1) forwards; }
        .ssai-intro.is-out .ssai-curtain-l{ animation: ssaiCloseL .8s cubic-bezier(.7,0,.2,1) forwards; }
        .ssai-intro.is-out .ssai-curtain-r{ animation: ssaiCloseR .8s cubic-bezier(.7,0,.2,1) forwards; }
        @keyframes ssaiOpenL{ to{ transform:translateX(-100%);} }
        @keyframes ssaiOpenR{ to{ transform:translateX(100%);} }
        @keyframes ssaiCloseL{ from{ transform:translateX(-100%);} to{ transform:translateX(0);} }
        @keyframes ssaiCloseR{ from{ transform:translateX(100%);} to{ transform:translateX(0);} }

        .ssai-center{ position:relative; z-index:2; text-align:center; padding:0 24px; }

        .ssai-orbit{ position:relative; width:150px; height:150px; margin:0 auto 26px; }
        .ssai-ring{
          position:absolute; inset:0; border-radius:50%;
          border:1px solid rgba(59,130,246,.35);
        }
        .ssai-ring-1{ animation: ssaiSpin 6s linear infinite; border-top-color:#06b6d4; border-width:2px; }
        .ssai-ring-2{ inset:16px; animation: ssaiSpin 4s linear infinite reverse; border-right-color:#3b82f6; border-width:2px; }
        .ssai-ring-3{ inset:32px; animation: ssaiSpin 8s linear infinite; border-bottom-color:#60a5fa; border-width:2px; }
        @keyframes ssaiSpin{ to{ transform:rotate(360deg);} }

        .ssai-core{
          position:absolute; inset:48px; border-radius:22px;
          display:flex; align-items:center; justify-content:center;
          background:linear-gradient(135deg,#2563eb,#3b82f6 55%,#06b6d4);
          box-shadow:0 0 45px rgba(59,130,246,.55);
          animation: ssaiPop .9s cubic-bezier(.2,.8,.2,1) both, ssaiFloat 3.4s 1s ease-in-out infinite;
        }
        .ssai-core-text{ color:#fff; font-size:28px; font-weight:800; letter-spacing:-.02em; }
        @keyframes ssaiPop{ from{ opacity:0; transform:scale(.5) rotate(-12deg);} to{ opacity:1; transform:scale(1) rotate(0);} }
        @keyframes ssaiFloat{ 0%,100%{ translate:0 0;} 50%{ translate:0 -8px;} }

        .ssai-title{
          margin:0; font-size:clamp(30px,6vw,58px); font-weight:800; letter-spacing:-.03em;
          display:flex; gap:.28em; justify-content:center; flex-wrap:wrap;
        }
        .ssai-word{
          background:linear-gradient(135deg,#2563eb,#3b82f6 55%,#06b6d4);
          -webkit-background-clip:text; background-clip:text; color:transparent;
          animation: ssaiUp .8s .2s cubic-bezier(.2,.8,.2,1) both;
        }
        .ssai-word-2{ animation-delay:.35s; }
        .ssai-word-3{ color:#e5eaf3; background:none; -webkit-text-fill-color:#e5eaf3; animation-delay:.5s; }
        @keyframes ssaiUp{ from{ opacity:0; transform:translateY(24px) rotateX(40deg);} to{ opacity:1; transform:none;} }

        .ssai-sub{
          margin:14px 0 0; color:#94a3b8; font-size:14px;
          animation: ssaiUp .8s .65s cubic-bezier(.2,.8,.2,1) both;
        }
        .ssai-status{
          margin:22px 0 0; color:#3b82f6; font-size:13px; font-weight:600;
          display:flex; align-items:center; justify-content:center; gap:2px; min-height:18px;
        }
        .ssai-caret{
          display:inline-block; width:8px; height:14px; background:#06b6d4; margin-left:4px;
          animation: ssaiBlink .9s steps(1) infinite;
        }
        @keyframes ssaiBlink{ 50%{ opacity:0; } }

        .ssai-bar{
          margin:20px auto 0; width:230px; height:3px; border-radius:999px;
          background:rgba(148,163,184,.18); overflow:hidden;
        }
        .ssai-bar i{
          display:block; height:100%; width:0; border-radius:999px;
          background:linear-gradient(90deg,#2563eb,#06b6d4);
          animation: ssaiBar 2.6s .3s cubic-bezier(.65,0,.35,1) forwards;
        }
        @keyframes ssaiBar{ to{ width:100%; } }

        @media (prefers-reduced-motion: reduce){
          .ssai-intro *{ animation:none !important; }
        }
      `}</style>
    </div>
  );
}
