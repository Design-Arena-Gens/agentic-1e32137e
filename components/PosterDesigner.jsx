"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PosterCanvas from "./PosterCanvas";
import jsPDF from "jspdf";

const DEFAULT_FORM = {
  company: "NeuronWorks AI",
  role: "Senior Machine Learning Engineer",
  location: "Remote / Global",
  type: "Full-time",
  salary: "$180k–$230k + equity",
  skills: "LLMs, Retrieval, MLE, Python, PyTorch, Vector DBs",
  summary:
    "Own end-to-end ML systems powering our AI job portal. Ship production-grade models that match millions of candidates with roles.",
  cta: "Apply now at jobs.neuronworks.ai",
  website: "https://jobs.neuronworks.ai",
  theme: "Neural Grid",
  accent: "Indigo/Cyan",
};

const TEMPLATES = ["Neural Grid", "Gradient Blocks", "Minimal"];
const ACCENTS = ["Indigo/Cyan", "Violet/Magenta", "Emerald/Teal"];

export default function PosterDesigner() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [scale, setScale] = useState(0.55);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.fonts?.ready?.then(() => {
        // trigger a rerender
        setForm((f) => ({ ...f }));
      });
    }
  }, []);

  const onChange = (name) => (e) => setForm({ ...form, [name]: e.target.value });

  const onDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const safeTitle = form.role.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      a.download = `${safeTitle || "ai-job"}-poster.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  const onDownloadPDF = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imgData = canvas.toDataURL("image/png");
    // Create A4 portrait with poster scaled to width, keeping 4:5 ratio
    const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 24;
    const drawWidth = pageWidth - margin * 2;
    const drawHeight = drawWidth * (1350 / 1080);
    const y = (pdf.internal.pageSize.getHeight() - drawHeight) / 2;
    pdf.addImage(imgData, "PNG", margin, y, drawWidth, drawHeight);
    const safeTitle = form.role.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    pdf.save(`${safeTitle || "ai-job"}-poster.pdf`);
  };

  return (
    <>
      <section className="panel controls">
        <h3>Poster details</h3>
        <div className="field">
          <label className="label">Company</label>
          <input className="input" value={form.company} onChange={onChange("company")} placeholder="Company name" />
        </div>
        <div className="field">
          <label className="label">Role title</label>
          <input className="input" value={form.role} onChange={onChange("role")} placeholder="e.g. AI Engineer" />
        </div>
        <div className="row">
          <div className="field">
            <label className="label">Location</label>
            <input className="input" value={form.location} onChange={onChange("location")} placeholder="City / Remote" />
          </div>
          <div className="field">
            <label className="label">Type</label>
            <input className="input" value={form.type} onChange={onChange("type")} placeholder="Full-time / Contract" />
          </div>
        </div>
        <div className="field">
          <label className="label">Salary</label>
          <input className="input" value={form.salary} onChange={onChange("salary")} placeholder="Compensation" />
        </div>
        <div className="field">
          <label className="label">Skills (comma-separated)</label>
          <input className="input" value={form.skills} onChange={onChange("skills")} placeholder="LLMs, Python, ..." />
        </div>
        <div className="field">
          <label className="label">Summary</label>
          <textarea className="textarea" value={form.summary} onChange={onChange("summary")} />
        </div>
        <div className="row">
          <div className="field">
            <label className="label">Call to action</label>
            <input className="input" value={form.cta} onChange={onChange("cta")} placeholder="Apply now..." />
          </div>
          <div className="field">
            <label className="label">Website</label>
            <input className="input" value={form.website} onChange={onChange("website")} placeholder="https://..." />
          </div>
        </div>
        <div className="row">
          <div className="field">
            <label className="label">Template</label>
            <div className="template-badges">
              {TEMPLATES.map((t) => (
                <button key={t} className={`badge ${form.theme === t ? "active" : ""}`} onClick={() => setForm({ ...form, theme: t })}>{t}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label className="label">Accent</label>
            <div className="template-badges">
              {ACCENTS.map((t) => (
                <button key={t} className={`badge ${form.accent === t ? "active" : ""}`} onClick={() => setForm({ ...form, accent: t })}>{t}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="row" style={{ alignItems: 'center' }}>
          <div className="field">
            <label className="label">Preview scale</label>
            <input className="input" type="range" min={0.3} max={0.9} step={0.05} value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} />
          </div>
          <div className="actions">
            <button className="button primary" onClick={onDownloadPNG}>Download PNG</button>
            <button className="button" onClick={onDownloadPDF}>Download PDF</button>
          </div>
        </div>
      </section>

      <section className="panel canvas-wrap">
        <div className="canvas-inner">
          <PosterCanvas ref={canvasRef} data={form} scale={scale} />
        </div>
      </section>
    </>
  );
}
