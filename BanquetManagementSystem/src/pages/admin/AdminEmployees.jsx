import React, { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Reveal } from "../../hooks/useUI.jsx";
import { Field } from "../../components/UI.jsx";
import { EMP_ROLES } from "../../data/constants.js";
import { fmtDate, fmtMoney, toISO } from "../../utils/helpers.js";

function EmployeeForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || { name: "", role: EMP_ROLES[0], phone: "", email: "", salary: "", joinDate: toISO(new Date()) });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.salary) return;
    onSave({ ...form, salary: Number(form.salary) });
  };
  return (
    <div className="drawer-backdrop" onClick={onCancel}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <h3 className="h3">{initial ? "Edit Employee" : "Add Employee"}</h3>
          <button className="icon-btn" onClick={onCancel}><X size={18} /></button>
        </div>
        <form className="form-card form-card-plain" onSubmit={submit}>
          <Field label="Full name"><input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} /></Field>
          <Field label="Role">
            <select className="input" value={form.role} onChange={(e) => set("role", e.target.value)}>
              {EMP_ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Phone"><input className="input" value={form.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
          <Field label="Email"><input className="input" value={form.email} onChange={(e) => set("email", e.target.value)} /></Field>
          <Field label="Monthly salary (PKR)"><input type="number" className="input" value={form.salary} onChange={(e) => set("salary", e.target.value)} /></Field>
          <Field label="Join date"><input type="date" className="input" value={form.joinDate} onChange={(e) => set("joinDate", e.target.value)} /></Field>
          <button className="btn btn-primary btn-block" type="submit">{initial ? "Save Changes" : "Add Employee"}</button>
        </form>
      </div>
    </div>
  );
}

export function AdminEmployees({ employees, upsertEmployee, removeEmployee }) {
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [confirmDel, setConfirmDel] = useState(null);

  const totalPayroll = employees.reduce((s, e) => s + e.salary, 0);
  const byRole = EMP_ROLES.map((r) => ({ role: r, count: employees.filter((e) => e.role === r).length }));

  return (
    <div className="page">
      <Reveal><span className="eyebrow">Staff</span></Reveal>
      <div className="page-head-row">
        <Reveal delay={40}><h1 className="h1">Employees</h1></Reveal>
        <Reveal delay={80}><button className="btn btn-primary" onClick={() => setAdding(true)}><Plus size={16} /> Add Employee</button></Reveal>
      </div>

      <Reveal delay={100} className="payroll-card">
        <div className="payroll-total">
          <div className="kpi-label">Monthly Payroll</div>
          <div className="payroll-amount">{fmtMoney(totalPayroll)}</div>
        </div>
        <div className="payroll-breakdown">
          {byRole.filter((r) => r.count > 0).map((r) => (
            <div key={r.role} className="payroll-chip">{r.role} <b>{r.count}</b></div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={140} className="table-scroll">
        <table className="data-table">
          <thead><tr><th>Name</th><th>Role</th><th>Phone</th><th>Email</th><th>Salary</th><th>Joined</th><th></th></tr></thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td><span className="chip chip-static">{e.role}</span></td>
                <td>{e.phone}</td>
                <td className="mono">{e.email}</td>
                <td>{fmtMoney(e.salary)}</td>
                <td>{fmtDate(e.joinDate)}</td>
                <td className="table-actions">
                  <button className="icon-btn" onClick={() => setEditing(e)}><Pencil size={14} /></button>
                  <button className="icon-btn icon-btn-danger" onClick={() => setConfirmDel(e)}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      {(adding || editing) && (
        <EmployeeForm
          initial={editing}
          onCancel={() => { setAdding(false); setEditing(null); }}
          onSave={(data) => { upsertEmployee(editing ? { ...data, id: editing.id } : data); setAdding(false); setEditing(null); }}
        />
      )}

      {confirmDel && (
        <div className="drawer-backdrop" onClick={() => setConfirmDel(null)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="h3">Remove {confirmDel.name}?</h3>
            <p className="muted">This can't be undone.</p>
            <div className="row-gap">
              <button className="btn btn-outline btn-block" onClick={() => setConfirmDel(null)}>Cancel</button>
              <button className="btn btn-danger btn-block" onClick={() => { removeEmployee(confirmDel.id); setConfirmDel(null); }}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
