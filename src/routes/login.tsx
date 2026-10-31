import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { loginUser } from "@/api";
import { useAuth } from "@/lib/auth-context";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser({ email: email.trim(), password });
      login(data.access_token, data.user);
      navigate({ to: "/dashboard" });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to log in. Please check your credentials.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-background text-foreground overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-secondary/15 blur-3xl" />

      {/* Top Bar with Home Link & Theme Toggle */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between max-w-6xl mx-auto z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <ThemeToggle />
      </div>

      <div className="relative mx-auto w-full max-w-md z-10">
        {/* Brand Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <span className="grid h-10 w-10 place-items-center rounded-xl gradient-primary text-white shadow-soft group-hover:scale-105 transition-transform">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-display font-bold text-xl tracking-tight text-foreground">
              <span className="gradient-text">Score Sense</span> AI
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground font-display">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to access your student performance analytics and predictions.
          </p>
        </div>

        {/* Card */}
        <div className="mt-8 rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-8 shadow-elegant">
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-danger/30 bg-danger/10 p-3.5 text-sm text-danger animate-fade-in">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full rounded-xl border border-border bg-input/60 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Password
                </label>
                <span
                  title="Password reset can be performed by contacting your administrator or re-registering with your academic email."
                  className="text-xs text-primary hover:underline cursor-pointer"
                >
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-border bg-input/60 pl-10 pr-11 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-glow w-full inline-flex items-center justify-center gap-2 rounded-xl gradient-primary py-3.5 text-sm font-semibold text-white shadow-elegant disabled:opacity-70 transition-all"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in to Dashboard <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Link */}
          <div className="mt-6 text-center text-sm text-muted-foreground border-t border-border/60 pt-6">
            Don't have an account yet?{" "}
            <Link
              to="/signup"
              className="font-semibold text-primary hover:text-primary/90 hover:underline transition-colors"
            >
              Create account
            </Link>
          </div>
        </div>

        {/* Demo Credentials Tip */}
        <div className="mt-6 rounded-2xl border border-border/60 bg-muted/30 p-4 text-center text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Tip:</span> You can sign up with any email
          or test immediately with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono">
            student@example.com
          </code>{" "}
          /{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono">
            Password123!
          </code>
        </div>
      </div>
    </div>
  );
}
