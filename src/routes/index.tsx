import { createFileRoute, Link } from "@tanstack/react-router";
import { predictExamScore } from "@/api";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  GraduationCap,
  Sparkles,
  Zap,
  Brain,
  BarChart3,
  TrendingUp,
  Clock,
  BookOpen,
  Users,
  Home,
  Wand2,
  Info,
  Layers,
  Mail,
  Github,
  Linkedin,
  Twitter,
  ArrowUp,
  ChevronRight,
  School,
  Timer,
  Moon,
  Activity,
  Database,
  Code2,
  Server,
  LineChart,
  Cpu,
} from "lucide-react";
import heroImg from "@/assets/scoresense-hero.jpg";
import { WelcomeIntro } from "@/components/WelcomeIntro";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/")({
  component: Landing,
});

type Result = { score: number; level: string; color: string; tone: string };

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "features", label: "Features", icon: Sparkles },
  { id: "prediction", label: "Prediction", icon: Wand2 },
  { id: "about", label: "About", icon: Info },
  { id: "contact", label: "Contact", icon: Mail },
];

function Landing() {
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 600);
      const y = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(item.id);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <WelcomeIntro />
      {/* NAV */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav" : "bg-background/60 backdrop-blur"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5 group">
            <span className="grid h-8 w-8 place-items-center rounded-lg gradient-primary shadow-soft">
              <GraduationCap className="h-4 w-4 text-white" />
            </span>
            <span className="hidden sm:block font-display font-semibold text-[15px] text-foreground tracking-tight">
              <span className="gradient-text">Score Sense</span>
              <span className="text-foreground"> AI</span>
            </span>
          </button>

          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((n) => (
              <li key={n.id}>
                <a
                  href={`/#${n.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`nav-link text-sm font-medium transition-colors ${
                    active === n.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="btn-glow inline-flex items-center gap-1.5 rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-soft"
              >
                Dashboard <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="btn-glow inline-flex items-center gap-1.5 rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-soft"
                >
                  Sign up <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="home" className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-5 md:px-8 text-center">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
              New — AI Model v2.1 available
            </span>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-foreground tracking-tight">
              Predict student performance
              <br className="hidden sm:block" />
              <span className="gradient-text"> with precision.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              An intelligent prediction system built for modern classrooms. Turn academic signals
              into accurate score forecasts — instantly.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => scrollTo("prediction")}
                className="btn-glow inline-flex items-center gap-2 rounded-lg gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-elegant"
              >
                Predict Now <ChevronRight className="h-4 w-4" />
              </button>
              <Link
                to="/dashboard"
                className="btn-glow inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:border-primary transition-all"
              >
                <BarChart3 className="h-4 w-4 text-primary" /> Analytics Dashboard
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-muted-foreground/60" /> No sign-up required
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-muted-foreground/60" /> Real-time inference
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-muted-foreground/60" /> Privacy-first
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard preview */}
        <div
          className="relative mx-auto mt-16 max-w-6xl px-5 md:px-8 fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          <div className="absolute inset-x-8 -bottom-6 h-24 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg-soft">
            <img
              src={heroImg}
              alt="Score Sense AI student performance analytics dashboard preview"
              width={1600}
              height={1200}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <FeaturesSection />

      {/* PREDICTION */}
      <PredictionSection />

      {/* ABOUT */}
      <AboutSection />

      {/* TECHNOLOGIES */}
      <TechSection />

      {/* FOOTER */}
      <Footer />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full gradient-primary text-white shadow-elegant transition-all duration-300 btn-glow ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}

/* ---------------- FEATURES ---------------- */
const features = [
  {
    icon: TrendingUp,
    title: "Accurate Predictions",
    desc: "State-of-the-art regression models deliver dependable score forecasts you can trust.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    desc: "Blazing-fast inference delivers your predicted score in less than a second.",
  },
  {
    icon: Brain,
    title: "AI Powered Analysis",
    desc: "Trained on rich academic datasets to uncover meaningful learning patterns.",
  },
  {
    icon: BarChart3,
    title: "Performance Insights",
    desc: "Understand strengths, weaknesses, and actionable growth opportunities.",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="relative bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="Features"
          title={
            <>
              Everything you need for <span className="gradient-text">smart academic insights</span>
            </>
          }
          sub="Beautifully designed, intelligently engineered. A premium experience purpose-built for education analytics."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative card-hover gradient-border rounded-3xl border border-border bg-card p-7 shadow-soft fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl gradient-primary text-white shadow-elegant transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                <f.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PREDICTION ---------------- */
function PredictionSection() {
  const initial = {
    // Student Profile
    gender: "Male",
    distance: "Near",
    internet: "Yes",
    disabilities: "No",
    schoolType: "Public",
    activities: "No",
    // Academic Inputs
    hours: 6,
    previous: 88,
    attendance: 98,
    motivation: "Low",
    teacher: "Low",
    // Family Support
    parentalInvolvement: "Medium",
    resources: "Medium",
    familyIncome: "Medium",
    parentalEducation: "College",
    // Lifestyle
    sleep: 7,
    physical: 3,
    tutoring: 5,
    peer: "Positive",
  };
  const [form, setForm] = useState(initial);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);

  const set = <K extends keyof typeof initial>(k: K, v: (typeof initial)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const levelScore = (v: string) =>
    v === "High" || v === "Positive" ? 3 : v === "Medium" || v === "Neutral" ? 1.5 : 0;

  const predict = async () => {
    setLoading(true);

    try {
      const payload = {
        Hours_Studied: form.hours,
        Attendance: form.attendance,
        Parental_Involvement: form.parentalInvolvement,
        Access_to_Resources: form.resources,
        Extracurricular_Activities: form.activities,
        Sleep_Hours: form.sleep,
        Previous_Scores: form.previous,
        Motivation_Level: form.motivation,
        Internet_Access: form.internet,
        Tutoring_Sessions: form.tutoring,
        Family_Income: form.familyIncome,
        Teacher_Quality: form.teacher,
        School_Type: form.schoolType,
        Peer_Influence: form.peer,
        Physical_Activity: form.physical,
        Learning_Disabilities: form.disabilities,
        Parental_Education_Level: form.parentalEducation,
        Distance_from_Home: form.distance,
        Gender: form.gender,
      };

      const response = await predictExamScore(payload);
      const score = Math.round(response.predicted_exam_score);

      const level =
        score >= 85
          ? {
              level: "Excellent",
              color: "var(--success)",
              tone: "bg-emerald-50 text-emerald-700 border-emerald-200",
            }
          : score >= 70
            ? {
                level: "Very Good",
                color: "var(--secondary)",
                tone: "bg-blue-50 text-blue-700 border-blue-200",
              }
            : score >= 55
              ? {
                  level: "Good",
                  color: "var(--accent)",
                  tone: "bg-cyan-50 text-cyan-700 border-cyan-200",
                }
              : {
                  level: "Needs Improvement",
                  color: "var(--danger)",
                  tone: "bg-rose-50 text-rose-700 border-rose-200",
                };

      setResult({
        score,
        ...level,
      });
    } catch (error) {
      console.error(error);
      alert("Prediction failed. Please make sure the FastAPI backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setForm(initial);
    setResult(null);
    setDisplay(0);
  };

  useEffect(() => {
    if (!result) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const to = result.score;
    const dur = 1200;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(to * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [result]);

  return (
    <section
      id="prediction"
      className="relative py-24"
      style={{ background: "var(--gradient-soft)" }}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="Prediction"
          title={
            <>
              Get your <span className="gradient-text">predicted score</span> in seconds
            </>
          }
          sub="Provide a few academic, family, and lifestyle signals and our model will estimate the expected exam performance."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                predict();
              }}
              className="rounded-3xl border border-border bg-card p-6 md:p-10 shadow-soft"
            >
              <FormGroup title="Student Profile" icon={Users}>
                <FloatingSelect
                  label="Gender"
                  value={form.gender}
                  onChange={(v) => set("gender", v)}
                  options={["Male", "Female", "Other"]}
                  icon={Users}
                />
                <FloatingSelect
                  label="Distance from Home"
                  value={form.distance}
                  onChange={(v) => set("distance", v)}
                  options={["Near", "Moderate", "Far"]}
                  icon={Home}
                />
                <FloatingSelect
                  label="Internet Access"
                  value={form.internet}
                  onChange={(v) => set("internet", v)}
                  options={["Yes", "No"]}
                  icon={Zap}
                />
                <FloatingSelect
                  label="Learning Disabilities"
                  value={form.disabilities}
                  onChange={(v) => set("disabilities", v)}
                  options={["No", "Yes"]}
                  icon={Info}
                />
                <FloatingSelect
                  label="School Type"
                  value={form.schoolType}
                  onChange={(v) => set("schoolType", v)}
                  options={["Public", "Private"]}
                  icon={School}
                />
                <FloatingSelect
                  label="Extracurricular Activities"
                  value={form.activities}
                  onChange={(v) => set("activities", v)}
                  options={["No", "Yes"]}
                  icon={Sparkles}
                />
              </FormGroup>

              <FormGroup title="Academic Inputs" icon={BookOpen}>
                <FloatingInput
                  label="Hours Studied"
                  type="number"
                  min={0}
                  max={16}
                  step={0.5}
                  value={form.hours}
                  onChange={(v) => set("hours", Number(v))}
                  icon={Clock}
                />
                <FloatingInput
                  label="Previous Scores"
                  type="number"
                  min={0}
                  max={100}
                  value={form.previous}
                  onChange={(v) => set("previous", Number(v))}
                  icon={LineChart}
                />
                <FloatingInput
                  label="Attendance"
                  type="number"
                  min={0}
                  max={100}
                  value={form.attendance}
                  onChange={(v) => set("attendance", Number(v))}
                  icon={Activity}
                />
                <FloatingSelect
                  label="Motivation Level"
                  value={form.motivation}
                  onChange={(v) => set("motivation", v)}
                  options={["Low", "Medium", "High"]}
                  icon={TrendingUp}
                />
                <FloatingSelect
                  label="Teacher Quality"
                  value={form.teacher}
                  onChange={(v) => set("teacher", v)}
                  options={["Low", "Medium", "High"]}
                  icon={GraduationCap}
                />
              </FormGroup>

              <FormGroup title="Family Support" icon={Users}>
                <FloatingSelect
                  label="Parental Involvement"
                  value={form.parentalInvolvement}
                  onChange={(v) => set("parentalInvolvement", v)}
                  options={["Low", "Medium", "High"]}
                  icon={Users}
                />
                <FloatingSelect
                  label="Access to Resources"
                  value={form.resources}
                  onChange={(v) => set("resources", v)}
                  options={["Low", "Medium", "High"]}
                  icon={Database}
                />
                <FloatingSelect
                  label="Family Income"
                  value={form.familyIncome}
                  onChange={(v) => set("familyIncome", v)}
                  options={["Low", "Medium", "High"]}
                  icon={BarChart3}
                />
                <FloatingSelect
                  label="Parental Education"
                  value={form.parentalEducation}
                  onChange={(v) => set("parentalEducation", v)}
                  options={["High School", "College", "Postgraduate"]}
                  icon={School}
                />
              </FormGroup>

              <FormGroup title="Lifestyle Factors" icon={Moon}>
                <FloatingInput
                  label="Sleep Hours"
                  type="number"
                  min={0}
                  max={12}
                  step={0.5}
                  value={form.sleep}
                  onChange={(v) => set("sleep", Number(v))}
                  icon={Moon}
                />
                <FloatingInput
                  label="Physical Activity"
                  type="number"
                  min={0}
                  max={10}
                  value={form.physical}
                  onChange={(v) => set("physical", Number(v))}
                  icon={Activity}
                />
                <FloatingInput
                  label="Tutoring Sessions"
                  type="number"
                  min={0}
                  max={20}
                  value={form.tutoring}
                  onChange={(v) => set("tutoring", Number(v))}
                  icon={BookOpen}
                />
                <FloatingSelect
                  label="Peer Influence"
                  value={form.peer}
                  onChange={(v) => set("peer", v)}
                  options={["Positive", "Neutral", "Negative"]}
                  icon={Sparkles}
                />
              </FormGroup>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-glow inline-flex flex-1 items-center justify-center gap-2 rounded-2xl gradient-primary px-6 py-4 text-base font-semibold text-white shadow-elegant disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white" />
                      Predicting…
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" /> Predict Score
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-4 text-base font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  Reset Form
                </button>
              </div>
            </form>
          </div>

          {/* Result */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 rounded-3xl border border-border bg-card p-8 shadow-soft">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" /> Prediction Result
              </div>

              {!result ? (
                <div className="mt-6 rounded-2xl border border-dashed border-border bg-muted/40 p-10 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl gradient-primary text-white shadow-elegant">
                    <Wand2 className="h-7 w-7" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Fill out the form and press{" "}
                    <span className="font-semibold text-foreground">Predict Score</span> to see your
                    result.
                  </p>
                </div>
              ) : (
                <div className="fade-up">
                  <div className="mt-6 text-center">
                    <div className="mx-auto relative h-44 w-44">
                      <RingProgress value={display} color={result.color} />
                      <div className="absolute inset-0 grid place-items-center">
                        <div>
                          <div className="font-display text-5xl font-extrabold text-foreground">
                            {display}
                          </div>
                          <div className="text-xs text-muted-foreground">/ 100</div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold ${result.tone}`}
                    >
                      <TrendingUp className="h-4 w-4" /> {result.level}
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 text-sm">
                    <ResultRow label="Predicted Score" value={`${result.score} / 100`} />
                    <ResultRow label="Performance Level" value={result.level} />
                    <ResultRow label="Confidence" value="High" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}

function RingProgress({ value, color }: { value: number; color: string }) {
  const size = 176;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="var(--muted)"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={value >= 85 ? "#22C55E" : "url(#ringGrad)"}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.6s ease", color }}
      />
    </svg>
  );
}

/* --------- Form primitives --------- */
function FormGroup({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-white">
          <Icon className="h-4 w-4" />
        </span>
        <h4 className="font-display text-base font-bold text-foreground">{title}</h4>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}

function FloatingInput({
  label,
  value,
  onChange,
  icon: Icon,
  ...rest
}: {
  label: string;
  value: number | string;
  onChange: (v: string) => void;
  icon: React.ElementType;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="group relative block">
      <span className="pointer-events-none absolute left-11 top-1.5 text-[11px] font-medium text-muted-foreground">
        {label}
      </span>
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full rounded-2xl border border-border bg-muted/40 pl-10 pr-4 pt-6 pb-2 text-sm font-semibold text-foreground outline-none transition-all focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/15"
      />
    </label>
  );
}

function FloatingSelect({
  label,
  value,
  onChange,
  options,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  icon: React.ElementType;
}) {
  return (
    <label className="relative block">
      <span className="pointer-events-none absolute left-11 top-1.5 text-[11px] font-medium text-muted-foreground">
        {label}
      </span>
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-2xl border border-border bg-muted/40 pl-10 pr-4 pt-6 pb-2 text-sm font-semibold text-foreground outline-none transition-all focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/15"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

/* ---------------- ABOUT ---------------- */
function AboutSection() {
  const items = [
    {
      icon: Brain,
      title: "Our Mission",
      desc: "Empower educators and students with data-driven insights to unlock every learner's potential.",
    },
    {
      icon: Layers,
      title: "How It Works",
      desc: "A curated dataset, cleaned features, and a trained regression pipeline produce a real-time score.",
    },
    {
      icon: Sparkles,
      title: "Built for Modern Classrooms",
      desc: "Elegant, responsive, and thoughtfully designed to feel at home on every device.",
    },
  ];
  return (
    <section id="about" className="relative bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="About"
          title={
            <>
              Predicting outcomes, <span className="gradient-text">nurturing growth</span>
            </>
          }
          sub="Score Sense AI blends machine learning with beautiful design to help institutions understand and elevate academic performance."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="card-hover gradient-border relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="absolute -right-14 -top-14 h-40 w-40 rounded-full opacity-20"
                style={{ background: "var(--gradient-primary)" }}
              />
              <span className="grid h-12 w-12 place-items-center rounded-2xl gradient-primary text-white shadow-elegant">
                <it.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-foreground">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TECHNOLOGIES ---------------- */
function TechSection() {
  const techs = [
    { icon: Cpu, name: "Python", desc: "Core ML runtime" },
    { icon: Brain, name: "Scikit-learn", desc: "Regression models" },
    { icon: Database, name: "Pandas", desc: "Data pipeline" },
    { icon: Server, name: "FastAPI", desc: "Prediction API" },
    { icon: Code2, name: "React", desc: "Interactive UI" },
    { icon: LineChart, name: "Matplotlib", desc: "Insights & EDA" },
  ];
  return (
    <section className="py-24" style={{ background: "var(--gradient-soft)" }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="Technologies"
          title={
            <>
              Powered by a <span className="gradient-text">modern ML stack</span>
            </>
          }
          sub="Reliable, open-source technologies working in harmony to deliver a premium prediction experience."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {techs.map((t, i) => (
            <div
              key={t.name}
              className="card-hover gradient-border rounded-2xl border border-border bg-card p-5 text-center shadow-soft fade-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl gradient-primary text-white shadow-elegant">
                <t.icon className="h-6 w-6" />
              </span>
              <div className="mt-3 font-display text-sm font-bold text-foreground">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer id="contact" className="relative bg-[#0B1220] pt-20 pb-10 text-white/80">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl gradient-primary shadow-elegant">
                <GraduationCap className="h-5 w-5 text-white" />
              </span>
              <span className="font-display text-lg font-bold text-white">
                <span className="gradient-text">Score Sense</span> AI
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-white/60">
              A premium AI-powered platform helping educators and students forecast academic
              performance with clarity and confidence.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Github, Linkedin, Twitter, Mail].map((I, i) => (
                <a
                  key={i}
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white transition-all hover:-translate-y-1 hover:bg-white/20"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-display text-sm font-bold text-white">Product</h5>
            <ul className="mt-4 space-y-2 text-sm">
              {["Features", "Prediction", "About"].map((x) => (
                <li key={x}>
                  <a
                    href={`/#${x.toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {x}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-display text-sm font-bold text-white">Contact</h5>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>hello@scoresense.ai</li>
              <li>support@scoresense.ai</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
          <div>© {new Date().getFullYear()} Score Sense AI. All rights reserved.</div>
          <div>Crafted with care · AI · Data · Design</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Shared ---------------- */
function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center fade-up">
      <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
        <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold leading-tight text-foreground">
        {title}
      </h2>
      <p className="mt-4 text-base text-muted-foreground">{sub}</p>
    </div>
  );
}
