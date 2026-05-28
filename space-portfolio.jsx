import { useState, useEffect, useMemo, useRef } from "react";

const NAV = ["Home", "About", "Contact"];

const C = {
  bg: "#030712",
  cyan: "#00E5FF",
  violet: "#8B5CF6",
  amber: "#F59E0B",
  text: "#E2E8F0",
  muted: "#64748B",
  softMuted: "#94A3B8",
  card: "rgba(6, 18, 45, 0.75)",
  border: "rgba(0, 229, 255, 0.12)",
};

function SectionTitle({ title, accent, centered }) {
  return (
    <div style={{ marginBottom: "3rem", textAlign: centered ? "center" : "left" }}>
      <h2 style={{
        fontFamily: '"Orbitron", monospace',
        fontSize: "clamp(20px, 3vw, 28px)",
        fontWeight: 700,
        color: "white",
        letterSpacing: "3px",
        marginBottom: "10px",
      }}>
        {title}
      </h2>
      <div style={{
        height: "2px",
        width: "60px",
        background: `linear-gradient(90deg, ${accent}, transparent)`,
        margin: centered ? "0 auto" : "0",
      }} />
      <div style={{
        height: "1px",
        width: "120px",
        background: `linear-gradient(90deg, ${accent}50, transparent)`,
        margin: centered ? "6px auto 0" : "6px 0 0",
      }} />
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [typed, setTyped] = useState("");
  const [visible, setVisible] = useState({});

  const TITLE = "Full Stack Developer & Space Enthusiast";

  const stars = useMemo(() =>
    Array.from({ length: 180 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 350,
      size: Math.random() * 2 + 0.4,
      opacity: Math.random() * 0.7 + 0.2,
      dur: (Math.random() * 3 + 2).toFixed(1),
      delay: (Math.random() * 5).toFixed(1),
    })),
  []);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      @keyframes twinkle {
        0%,100% { opacity:0.15; transform:scale(0.8); }
        50% { opacity:1; transform:scale(1.3); }
      }
      @keyframes floatY {
        0%,100% { transform:translateY(0px); }
        50% { transform:translateY(-18px); }
      }
      @keyframes glow-cyan {
        0%,100% { text-shadow:0 0 8px #00E5FF,0 0 16px #00E5FF; }
        50% { text-shadow:0 0 16px #00E5FF,0 0 32px #00E5FF,0 0 48px #00E5FF80; }
      }
      @keyframes orbit {
        from { transform:rotate(0deg) translateX(72px) rotate(0deg); }
        to { transform:rotate(360deg) translateX(72px) rotate(-360deg); }
      }
      @keyframes fadeUp {
        from { opacity:0; transform:translateY(32px); }
        to { opacity:1; transform:translateY(0); }
      }
      @keyframes nebula {
        0%,100% { transform:scale(1); opacity:0.18; }
        50% { transform:scale(1.12); opacity:0.28; }
      }
      @keyframes cursor-blink {
        0%,100% { opacity:1; }
        50% { opacity:0; }
      }
      @keyframes spin {
        from { transform:rotate(0deg); }
        to { transform:rotate(360deg); }
      }
      .nav-btn { transition: all 0.2s ease !important; }
      .nav-btn:hover { color:#00E5FF !important; border-color:rgba(0,229,255,0.4) !important; background:rgba(0,229,255,0.06) !important; }
      .cta-primary { transition: all 0.2s ease !important; }
      .cta-primary:hover { filter:brightness(1.15) !important; transform:translateY(-2px) !important; }
      .cta-outline { transition: all 0.2s ease !important; }
      .cta-outline:hover { background:rgba(0,229,255,0.08) !important; transform:translateY(-2px) !important; }
      .contact-row { transition: all 0.2s ease !important; }
      .contact-row:hover { border-color:rgba(0,229,255,0.4) !important; background:rgba(0,229,255,0.05) !important; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  // Typewriter
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i <= TITLE.length) setTyped(TITLE.slice(0, i++));
      else clearInterval(t);
    }, 55);
    return () => clearInterval(t);
  }, []);

  // Intersection observer
  useEffect(() => {
    const els = document.querySelectorAll("[data-sec]");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const sec = e.target.dataset.sec;
          setVisible(v => ({ ...v, [sec]: true }));
          setActive(sec.charAt(0).toUpperCase() + sec.slice(1));
        }
      });
    }, { threshold: 0.2 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (section) => {
    const el = document.getElementById(section.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(section);
  };

  return (
    <div style={{
      background: C.bg,
      minHeight: "100vh",
      fontFamily: '"Rajdhani", sans-serif',
      color: C.text,
      position: "relative",
      overflowX: "hidden",
    }}>

      {/* ── Stars ── */}
      {stars.map(s => (
        <div key={s.id} style={{
          position: "absolute",
          left: `${s.x}%`,
          top: `${s.y}vh`,
          width: `${s.size}px`,
          height: `${s.size}px`,
          borderRadius: "50%",
          background: "white",
          opacity: s.opacity,
          animation: `twinkle ${s.dur}s ${s.delay}s ease-in-out infinite`,
          pointerEvents: "none",
          zIndex: 0,
        }} />
      ))}

      {/* ── Nebula blobs ── */}
      <div style={{
        position: "absolute", top: "5%", left: "-8%",
        width: "520px", height: "520px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
        animation: "nebula 9s ease-in-out infinite",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", top: "55%", right: "-6%",
        width: "420px", height: "420px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)",
        animation: "nebula 12s ease-in-out infinite reverse",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", top: "140%", left: "30%",
        width: "350px", height: "350px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)",
        animation: "nebula 7s ease-in-out infinite",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Navigation ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(3,7,18,0.88)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.border}`,
        padding: "0 clamp(1rem,4vw,3rem)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px",
      }}>
        <div style={{
          fontFamily: '"Orbitron", monospace',
          fontSize: "17px", fontWeight: 700,
          color: C.cyan, letterSpacing: "3px",
          animation: "glow-cyan 3s ease-in-out infinite",
        }}>
          XCHIN
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          {NAV.map(item => (
            <button key={item} className="nav-btn" onClick={() => scrollTo(item)} style={{
              background: active === item ? "rgba(0,229,255,0.08)" : "transparent",
              border: `1px solid ${active === item ? C.cyan + "80" : "transparent"}`,
              color: active === item ? C.cyan : C.muted,
              padding: "6px 14px", borderRadius: "3px", cursor: "pointer",
              fontFamily: '"Rajdhani", sans-serif',
              fontSize: "13px", fontWeight: 600,
              letterSpacing: "1.5px", textTransform: "uppercase",
            }}>
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Content wrapper ── */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ══════════════════ HERO ══════════════════ */}
        <section id="home" data-sec="home" style={{
          minHeight: "90vh",
          display: "flex", alignItems: "center",
          padding: "4rem clamp(1.5rem,6vw,5rem)",
          position: "relative", overflow: "hidden",
        }}>

          {/* Planet */}
          <div style={{
            position: "absolute", right: "clamp(2rem,8vw,8rem)",
            top: "50%", transform: "translateY(-50%)",
            animation: "floatY 6s ease-in-out infinite",
            pointerEvents: "none",
          }}>
            {/* Ring */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              width: "380px", height: "380px",
              transform: "translate(-50%,-50%) rotateX(72deg)",
              borderRadius: "50%",
              border: "14px solid rgba(0,229,255,0.12)",
              boxShadow: "0 0 30px rgba(0,229,255,0.2)",
            }} />
            {/* Globe */}
            <div style={{
              width: "220px", height: "220px", borderRadius: "50%",
              background: "radial-gradient(circle at 38% 32%, #1a4a7a, #0a1628 60%, #040c1e)",
              boxShadow: `0 0 60px rgba(0,229,255,0.15), inset -40px -10px 50px rgba(0,0,0,0.7), inset 10px 10px 20px rgba(0,229,255,0.06)`,
              position: "relative",
            }}>
              {/* Surface details */}
              <div style={{
                position: "absolute", top: "30%", left: "20%",
                width: "60%", height: "8px", borderRadius: "4px",
                background: "rgba(0,229,255,0.08)",
              }} />
              <div style={{
                position: "absolute", top: "50%", left: "15%",
                width: "40%", height: "6px", borderRadius: "3px",
                background: "rgba(139,92,246,0.1)",
              }} />
            </div>
            {/* Orbiting dot */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              marginTop: "-6px", marginLeft: "-6px",
              width: "12px", height: "12px",
              animation: "orbit 5s linear infinite",
            }}>
              <div style={{
                width: "12px", height: "12px", borderRadius: "50%",
                background: C.cyan,
                boxShadow: `0 0 10px ${C.cyan}, 0 0 20px ${C.cyan}`,
              }} />
            </div>
            {/* Second orbiting dot */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              marginTop: "-4px", marginLeft: "-4px",
              width: "8px", height: "8px",
              animation: "orbit 8s linear infinite reverse",
            }}>
              <div style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: C.violet,
                boxShadow: `0 0 8px ${C.violet}, 0 0 16px ${C.violet}`,
              }} />
            </div>
          </div>

          {/* Hero text */}
          <div style={{ maxWidth: "580px", animation: "fadeUp 0.8s ease forwards" }}>
            <div style={{
              fontFamily: '"Orbitron", monospace',
              fontSize: "12px", color: C.cyan,
              letterSpacing: "4px", marginBottom: "1.2rem",
              opacity: 0.75,
            }}>
              // HELLO, UNIVERSE
            </div>
            <h1 style={{
              fontFamily: '"Orbitron", monospace',
              fontSize: "clamp(42px,7vw,80px)", fontWeight: 900,
              lineHeight: 1.05, marginBottom: "1.2rem",
              background: `linear-gradient(130deg, #ffffff 0%, ${C.cyan} 45%, ${C.violet} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-1px",
            }}>
              XCHIN
            </h1>
            <div style={{
              fontSize: "18px", color: C.text,
              fontWeight: 600, letterSpacing: "0.5px",
              minHeight: "30px", marginBottom: "1.2rem",
            }}>
              {typed}
              <span style={{
                display: "inline-block",
                width: "2px", height: "18px",
                background: C.cyan,
                marginLeft: "3px",
                verticalAlign: "middle",
                animation: "cursor-blink 0.9s step-end infinite",
              }} />
            </div>
            <p style={{
              color: C.softMuted, fontSize: "16px",
              lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "460px",
            }}>
              Crafting digital experiences from the edge of the cosmos. I build scalable, purposeful software that reaches for the stars.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button className="cta-primary" onClick={() => scrollTo("About")} style={{
                background: `linear-gradient(135deg, ${C.cyan}, ${C.violet})`,
                border: "none", color: "#030712",
                padding: "13px 30px", borderRadius: "4px", cursor: "pointer",
                fontFamily: '"Orbitron", monospace',
                fontSize: "12px", fontWeight: 700, letterSpacing: "2px",
                textTransform: "uppercase",
              }}>
                About Me
              </button>
              <button className="cta-outline" onClick={() => scrollTo("Contact")} style={{
                background: "transparent",
                border: `1px solid ${C.cyan}`,
                color: C.cyan, padding: "13px 30px", borderRadius: "4px",
                cursor: "pointer", fontFamily: '"Orbitron", monospace',
                fontSize: "12px", fontWeight: 700, letterSpacing: "2px",
                textTransform: "uppercase",
                boxShadow: `0 0 20px rgba(0,229,255,0.15)`,
              }}>
                Contact Me
              </button>
            </div>

            {/* Scroll hint */}
            <div style={{
              marginTop: "4rem", display: "flex", alignItems: "center", gap: "10px",
              color: C.muted, fontSize: "12px", letterSpacing: "2px",
            }}>
              <div style={{
                width: "1px", height: "40px",
                background: `linear-gradient(to bottom, transparent, ${C.cyan})`,
              }} />
              SCROLL TO EXPLORE
            </div>
          </div>
        </section>

        {/* ══════════════════ ABOUT ══════════════════ */}
        <section id="about" data-sec="about" style={{
          padding: "6rem clamp(1.5rem,6vw,5rem)",
          maxWidth: "1000px", margin: "0 auto",
        }}>
          <SectionTitle title="ABOUT.ME" accent={C.cyan} />
          <div style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,200px) minmax(0,1fr)",
            gap: "3rem", alignItems: "center",
            animation: visible.about ? "fadeUp 0.8s ease forwards" : "none",
            opacity: visible.about ? undefined : 0,
          }}>
            {/* Avatar */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: "160px", height: "160px", borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.violet}30, ${C.cyan}30)`,
                border: `2px solid ${C.cyan}60`,
                boxShadow: `0 0 40px rgba(0,229,255,0.2)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto", fontSize: "64px",
                animation: "floatY 5s ease-in-out infinite",
              }}>
                👨‍🚀
              </div>
              <div style={{
                marginTop: "1rem",
                fontFamily: '"Orbitron", monospace',
                fontSize: "11px", color: C.cyan,
                letterSpacing: "2px", opacity: 0.7,
              }}>
                BASED IN EARTH
              </div>
            </div>

            {/* Bio */}
            <div>
              <p style={{ color: C.text, fontSize: "16px", lineHeight: 1.85, marginBottom: "1.2rem" }}>
                I'm a full-stack developer with <strong style={{ color: C.cyan }}>5+ years</strong> of experience building web applications as vast and intricate as the cosmos. My passion lies in crafting clean, performant code and seamless user experiences.
              </p>
              <p style={{ color: C.softMuted, fontSize: "15px", lineHeight: 1.8, marginBottom: "2.5rem" }}>
                When I'm not pushing code to the cloud, I'm stargazing, exploring AI research papers, or tinkering with hardware. I believe great software should feel inevitable — like it was always meant to exist.
              </p>
              <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
                {[
                  { label: "Projects", value: "40+" },
                  { label: "Clients", value: "20+" },
                  { label: "Years", value: "5" },
                ].map(stat => (
                  <div key={stat.label}>
                    <div style={{
                      fontFamily: '"Orbitron", monospace',
                      fontSize: "36px", fontWeight: 700,
                      color: C.cyan,
                      textShadow: `0 0 20px ${C.cyan}80`,
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      color: C.muted, fontSize: "11px",
                      letterSpacing: "2px", textTransform: "uppercase",
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
