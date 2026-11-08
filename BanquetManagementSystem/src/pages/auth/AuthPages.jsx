import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Reveal } from "../../hooks/useUI.jsx";
import { Field, ArchMotif } from "../../components/UI.jsx";

export function AuthShell({ title, sub, children }) {
  return (
    <div className="auth-wrap">
      <div className="auth-side">
        <ArchMotif className="auth-arch" />
        <div className="auth-side-text">
          <div className="brand-title light">Al-Noor</div>
          <div className="brand-sub light">Grand Banquet</div>
        </div>
      </div>
      <div className="auth-form-col">
        <Reveal className="auth-box">
          <h1 className="h2">{title}</h1>
          <p className="muted">{sub}</p>
          {children}
        </Reveal>
      </div>
    </div>
  );
}

export function LoginPage({ login, goto }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const r = login(email, password);
    if (!r.ok) setErr(r.msg);
  };

  return (
    <AuthShell title="Welcome back" sub="Log in to manage your booking or the console.">
      <form className="form-card form-card-plain" onSubmit={submit} noValidate>
        <Field label="Email"><input className="input" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
        <Field label="Password"><input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} /></Field>
        {err && <div className="form-error"><AlertCircle size={14} /> {err}</div>}
        <button className="btn btn-primary btn-block" type="submit">Log In</button>
        <div className="demo-hint">
          Demo — Admin: <code>admin@alnoor.com / admin123</code><br />
          Demo — User: <code>ayesha@example.com / user123</code>
        </div>
        <div className="auth-switch">No account? <button type="button" onClick={() => goto("register")}>Register</button></div>
      </form>
    </AuthShell>
  );
}

export function RegisterPage({ register, goto }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", role: "user" });
  const [errors, setErrors] = useState({});
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Name required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email.";
    if (form.password.length < 6) err.password = "Minimum 6 characters.";
    if (form.password !== form.confirm) err.confirm = "Passwords don't match.";
    setErrors(err);
    if (Object.keys(err).length) return;
    const r = register(form);
    if (!r.ok) setErrors({ email: r.msg });
  };

  return (
    <AuthShell title="Create your account" sub="Register as a guest to book, or as staff to manage the console.">
      <form className="form-card form-card-plain" onSubmit={submit} noValidate>
        <Field label="Full name" error={errors.name}><input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field label="Email" error={errors.email}><input className="input" value={form.email} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field label="Password" error={errors.password}><input type="password" className="input" value={form.password} onChange={(e) => set("password", e.target.value)} /></Field>
        <Field label="Confirm password" error={errors.confirm}><input type="password" className="input" value={form.confirm} onChange={(e) => set("confirm", e.target.value)} /></Field>
        <Field label="Account type" hint={form.role === "admin" ? "Demo only — in production, admin accounts would be provisioned by an existing admin." : undefined}>
          <div className="radio-row">
            <button type="button" className={`radio-pill ${form.role === "user" ? "radio-pill-active" : ""}`} onClick={() => set("role", "user")}>Guest / User</button>
            <button type="button" className={`radio-pill ${form.role === "admin" ? "radio-pill-active" : ""}`} onClick={() => set("role", "admin")}>Staff / Admin</button>
          </div>
        </Field>
        <button className="btn btn-primary btn-block" type="submit">Create Account</button>
        <div className="auth-switch">Already registered? <button type="button" onClick={() => goto("login")}>Log in</button></div>
      </form>
    </AuthShell>
  );
}
