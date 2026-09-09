import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/useAuth";

export default function AdminProfilePage() {
  const { user, setUser, logout } = useAuth();
  const [profile, setProfile] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get("/users/me")
      .then((res) => {
        const me = res.data?.data?.data ?? res.data?.data?.user ?? res.data?.data;
        if (me) {
          setProfile({ fullName: me.fullName || "", email: me.email || "" });
          setUser?.(me);
        }
      })
      .catch((e) => {
        setError(e.response?.data?.message || "Could not load your profile.");
      })
      .finally(() => setLoading(false));
  }, [setUser]);

  const saveProfile = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    if (!profile.fullName.trim() || !profile.email.trim()) {
      setError("Full name and email are required.");
      return;
    }
    setSavingProfile(true);
    try {
      const res = await api.patch("/users/updateMe", {
        fullName: profile.fullName.trim(),
        email: profile.email.trim().toLowerCase(),
      });
      const updated = res.data?.data?.user ?? res.data?.data?.data;
      if (updated) {
        setUser(updated);
        setProfile({ fullName: updated.fullName, email: updated.email });
      }
      setMessage("Profile updated successfully.");
    } catch (e) {
      setError(e.response?.data?.message || "Could not update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const savePassword = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    if (
      !passwordForm.currentPassword ||
      !passwordForm.password ||
      !passwordForm.passwordConfirm
    ) {
      setError("Fill in all password fields.");
      return;
    }
    if (passwordForm.password !== passwordForm.passwordConfirm) {
      setError("New password and confirmation do not match.");
      return;
    }
    if (passwordForm.password.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    setSavingPassword(true);
    try {
      const res = await api.patch("/users/updateMyPassword", passwordForm);
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }
      if (res.data?.data?.user) {
        setUser(res.data.data.user);
      }
      setPasswordForm({ currentPassword: "", password: "", passwordConfirm: "" });
      setMessage("Password updated successfully.");
    } catch (e) {
      setError(e.response?.data?.message || "Could not update password.");
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-sm text-gray-500">Loading profile…</div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-8 text-[#1a1a1a]">
      <h1 className="font-serif text-3xl font-bold text-[#033327]">My Profile</h1>
      <p className="mt-2 text-sm text-gray-500">
        Update your administrator account details and password.
      </p>

      {message && (
        <p className="mt-4 rounded-lg bg-[#e8f0ec] p-3 text-sm font-medium text-[#033327]">
          {message}
        </p>
      )}
      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <form
        onSubmit={saveProfile}
        className="mt-8 rounded-2xl border border-[#e5e1d8] bg-white p-6"
      >
        <h2 className="font-serif text-xl font-bold text-[#033327]">Account details</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-[11px] font-bold text-gray-600 sm:col-span-2">
            Full name
            <input
              value={profile.fullName}
              onChange={(e) =>
                setProfile((current) => ({ ...current, fullName: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-[#e5e1d8] px-3 py-2 text-sm font-normal outline-none focus:border-[#033327]"
            />
          </label>
          <label className="text-[11px] font-bold text-gray-600 sm:col-span-2">
            Email
            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile((current) => ({ ...current, email: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-[#e5e1d8] px-3 py-2 text-sm font-normal outline-none focus:border-[#033327]"
            />
          </label>
          <div className="rounded-lg bg-[#FAF8F5] p-3 text-xs text-gray-500 sm:col-span-2">
            Role: <span className="font-bold text-[#033327]">{user?.role || "admin"}</span>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            disabled={savingProfile}
            className="rounded-lg bg-[#033327] px-4 py-2 text-[11px] font-bold text-white disabled:opacity-50"
          >
            {savingProfile ? "Saving…" : "Save profile"}
          </button>
        </div>
      </form>

      <form
        onSubmit={savePassword}
        className="mt-6 rounded-2xl border border-[#e5e1d8] bg-white p-6"
      >
        <h2 className="font-serif text-xl font-bold text-[#033327]">Change password</h2>
        <div className="mt-5 grid gap-4">
          <label className="text-[11px] font-bold text-gray-600">
            Current password
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm((current) => ({
                  ...current,
                  currentPassword: e.target.value,
                }))
              }
              className="mt-1 w-full rounded-lg border border-[#e5e1d8] px-3 py-2 text-sm font-normal outline-none focus:border-[#033327]"
            />
          </label>
          <label className="text-[11px] font-bold text-gray-600">
            New password
            <input
              type="password"
              value={passwordForm.password}
              onChange={(e) =>
                setPasswordForm((current) => ({
                  ...current,
                  password: e.target.value,
                }))
              }
              className="mt-1 w-full rounded-lg border border-[#e5e1d8] px-3 py-2 text-sm font-normal outline-none focus:border-[#033327]"
            />
          </label>
          <label className="text-[11px] font-bold text-gray-600">
            Confirm new password
            <input
              type="password"
              value={passwordForm.passwordConfirm}
              onChange={(e) =>
                setPasswordForm((current) => ({
                  ...current,
                  passwordConfirm: e.target.value,
                }))
              }
              className="mt-1 w-full rounded-lg border border-[#e5e1d8] px-3 py-2 text-sm font-normal outline-none focus:border-[#033327]"
            />
          </label>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            disabled={savingPassword}
            className="rounded-lg bg-[#033327] px-4 py-2 text-[11px] font-bold text-white disabled:opacity-50"
          >
            {savingPassword ? "Updating…" : "Update password"}
          </button>
        </div>
      </form>

      <button
        type="button"
        onClick={logout}
        className="mt-6 text-sm font-bold text-red-700 hover:underline"
      >
        Log out of admin console
      </button>
    </div>
  );
}
