import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const inputBase =
  "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#033327] placeholder:text-[#033327]/35 transition focus:outline-none focus:ring-2 focus:ring-[#FFDEA4]/60 focus:border-[#FFDEA4]";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const next = {};

    if (!formData.email.trim()) {
      next.email = "Please provide your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = "Please provide a valid email";
    }

    if (!formData.password) {
      next.password = "Please provide your password";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setIsSubmitting(true);
    const result = await login(formData.email, formData.password);
    setIsSubmitting(false);

    if (!result.success) {
      setServerError(result.message);
      return;
    }

    // Admin accounts land on the dashboard; this app has no other roles.
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f5efe6] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-[#033327]/10 bg-white shadow-[0_20px_60px_rgba(3,51,39,0.12)]">
        <div className="grid md:grid-cols-2">
          {/* Brand panel */}
          <div className="hidden md:flex flex-col justify-center bg-[#033327] p-8 text-white">
            <div className="inline-flex w-fit items-center rounded-full border border-[#FFDEA4]/40 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FFDEA4]">
              Welcome back
            </div>

            <h1 className="mt-6 text-3xl font-bold leading-tight">
              Access the admin console
            </h1>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Sign in to manage news, faculty records, alumni, gallery, and
              inquiries for Agaro High School.
            </p>

            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#FFDEA4]">
                Admin access only
              </p>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">
                This portal is for authorized school administrators. There is no
                public registration — accounts are provisioned directly.
              </p>
            </div>
          </div>

          {/* Form panel */}
          <div className="p-6 md:p-8">
            <div className="mb-5">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#033327]/50">
                Login
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[#033327]">
                Sign in
              </h2>
            </div>

            {serverError && (
              <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
                {serverError}
              </div>
            )}

            <form className="space-y-3.5" onSubmit={handleSubmit} noValidate>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#033327]/80">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`${inputBase} ${
                    errors.email ? "border-red-400" : "border-[#033327]/15"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#033327]/80">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`${inputBase} ${
                    errors.password ? "border-red-400" : "border-[#033327]/15"
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 text-sm text-[#033327]/70">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#033327]"
                  />
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-[#033327] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#022a1f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Login"}
              </button>

              <div className="pt-1 text-center text-sm text-[#033327]/70">
                <Link
                  to="/"
                  className="font-semibold text-[#033327] hover:text-[#0a4d3d]"
                >
                  ← Back to the school website
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
