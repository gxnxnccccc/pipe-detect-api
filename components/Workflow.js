"use client";
import { useState, useRef, Fragment, useEffect } from "react";
import { Icons } from "./Icons";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

function StepDot({ n, state }) {
  const I = Icons;
  return (
    <span className={"stepdot " + state}>
      {state === "done" ? I.check({ size: 13, sw: 2.6 }) : n}
    </span>
  );
}

function saveImage(dataUrl, filename, setPreview) {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    setPreview(dataUrl);
    return;
  }
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function DetectionWorkflow({ onSubmit }) {
  const I = Icons;
  const [phase, setPhase] = useState("empty"); // empty | detecting | detected
  const [doNum, setDoNum] = useState("DX26030043");
  const [actual, setActual] = useState("");
  const [notes, setNotes] = useState("");
  const [originalUrl, setOriginalUrl] = useState(null);
  const [originalDataUrl, setOriginalDataUrl] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [apiCount, setApiCount] = useState(0);
  const [apiConfidence, setApiConfidence] = useState(0);
  const [apiCounts, setApiCounts] = useState({});
  const [apiColors, setApiColors] = useState({});
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [warming, setWarming] = useState(true);
  const fileRef = useRef(null);
  const currentFile = useRef(null);
  const resultBlobRef = useRef(null);

  useEffect(() => {
    fetch(`${API_URL}/docs`).catch(() => {}).finally(() => setWarming(false));
  }, []);

  const runDetection = async (file) => {
    currentFile.current = file;
    const objUrl = URL.createObjectURL(file);
    setOriginalUrl(objUrl);
    const reader = new FileReader();
    reader.onload = e => setOriginalDataUrl(e.target.result);
    reader.readAsDataURL(file);
    setResultUrl(null);
    setError(null);
    setPhase("detecting");

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch(`${API_URL}/predict`, { method: "POST", body: form });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      const b64 = data.image_base64;
      const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
      resultBlobRef.current = new File([bytes], "detection-result.jpg", { type: "image/jpeg" });
      setResultUrl(`data:image/jpeg;base64,${b64}`);
      setApiCount(data.total);
      setApiCounts(data.counts ?? {});
      setApiColors(data.colors ?? {});
      setApiConfidence(data.confidence ?? 0);
      setPhase("detected");
    } catch (err) {
      URL.revokeObjectURL(objUrl);
      setOriginalUrl(null);
      setError(err.message || "Detection failed. Is the API server running?");
      setPhase("empty");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) runDetection(file);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) runDetection(file);
  };

  const reset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    currentFile.current = null;
    setPhase("empty");
    setOriginalUrl(null);
    setOriginalDataUrl(null);
    setResultUrl(null);
    setError(null);
    setActual("");
    setNotes("");
    setApiCount(0);
    setApiCounts({});
    setApiColors({});
    resultBlobRef.current = null;
    setApiConfidence(0);
  };

  const variance = actual ? Number(actual) - apiCount : null;

  const stepState = (s) => {
    if (s === 1) return phase === "empty" ? "active" : "done";
    if (s === 2) return phase === "empty" ? "idle" : phase === "detecting" ? "active" : "done";
    return phase === "detected" ? "active" : "idle";
  };

  const canSubmit = phase === "detected" && doNum && actual && notes.trim();

  return (
    <div className="wf">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* stepper */}
      <div className="stepper card">
        {[
          { n: 1, t: "Capture / Upload", s: "Source image" },
          { n: 2, t: "Detection", s: "Model inference" },
          { n: 3, t: "Confirm & Submit", s: "Verify + log" },
        ].map((st, i) => (
          <Fragment key={st.n}>
            <div className="step">
              <StepDot n={st.n} state={stepState(st.n)} />
              <div>
                <div className="step-t">{st.t}</div>
                <div className="step-s">{st.s}</div>
              </div>
            </div>
            {i < 2 && (
              <div className={"step-line " + (stepState(st.n) === "done" ? "done" : "")}></div>
            )}
          </Fragment>
        ))}
      </div>

      {error && (
        <div className="card card-pad" style={{ color: "var(--err)", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
          {I.xCircle({ size: 16 })} {error}
        </div>
      )}

      <div className="wf-grid">
        {/* Panel 1 — capture */}
        <section className="card card-pad panel">
          <header className="panel-head">
            <span className="panel-num">01</span>
            <h3>Capture / Upload Image</h3>
          </header>

          {phase === "empty" ? (
            <div
              className="dropzone"
              onClick={() => fileRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="dz-ico">{I.camera({ size: 26 })}</div>
              <div className="dz-t">Capture from line camera</div>
              <div className="dz-s">
                {warming ? "Warming up server…" : "or drop an image / click to upload"}
              </div>
              <div className="dz-actions">
                <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}>
                  {I.camera({ size: 17 })} Capture Now
                </button>
                <button className="btn btn-ghost" onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}>
                  {I.upload({ size: 17 })} Upload
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="media tall" style={{ overflow: "hidden" }}>
                <img
                  src={originalUrl}
                  alt="Original"
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
              </div>
              <div className="meta-row">
                <span className="meta mono">{currentFile.current?.name}</span>
                {currentFile.current?.size && (
                  <>
                    <span className="meta">·</span>
                    <span className="meta mono">{(currentFile.current.size / 1024).toFixed(0)} KB</span>
                  </>
                )}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="btn btn-ghost"
                  style={{ flex: 1 }}
                  onClick={() => saveImage(originalDataUrl, currentFile.current?.name ?? "original.jpg", setPreviewUrl)}
                >
                  {I.download({ size: 16 })} Save Original
                </button>
                <button className="btn btn-ghost" style={{ flex: 1 }} onClick={reset}>
                  {I.trash({ size: 16 })} Remove
                </button>
              </div>
            </>
          )}
        </section>

        {/* Panel 2 — detection */}
        <section className="card card-pad panel">
          <header className="panel-head">
            <span className="panel-num">02</span>
            <h3>Detection Result</h3>
            {phase === "detected" && (
              <span className="badge ok" style={{ marginLeft: "auto" }}>
                {I.check({ size: 12, sw: 2.6 })} Detected
              </span>
            )}
            {phase === "detecting" && (
              <span className="badge info" style={{ marginLeft: "auto" }}>
                {I.refresh({ size: 12, className: "spin" })} Running
              </span>
            )}
          </header>

          {phase === "empty" && (
            <div className="panel-empty">
              <div className="empty-ico">{I.scan({ size: 24 })}</div>
              <p>Awaiting an image.<br />Detection runs automatically on capture.</p>
            </div>
          )}

          {phase === "detecting" && (
            <>
              <div className="media tall detecting" style={{ overflow: "hidden" }}>
                {originalUrl && (
                  <img
                    src={originalUrl}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "contain", opacity: 0.5 }}
                  />
                )}
                <div className="scanline"></div>
                <div className="media-tag" style={{ background: "oklch(0.55 0.17 256)" }}>
                  {I.cpu({ size: 13 })} INFERRING
                </div>
              </div>
              <p style={{ fontSize: 12, opacity: 0.5, marginTop: 8, textAlign: "center" }}>
                {I.refresh({ size: 12, className: "spin" })} Running on server — may take up to 2 min on first use
              </p>
            </>
          )}

          {phase === "detected" && (
            <>
              <div className="media tall fade-up" style={{ overflow: "hidden", position: "relative" }}>
                <img
                  src={resultUrl}
                  alt="Detection result"
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
                <span className="media-tag ok">{I.check({ size: 13, sw: 2.6 })} {apiCount} detected</span>
              </div>
              <div className="result-stats fade-up">
                <div className="rstat">
                  <span className="rstat-l">{I.target({ size: 13 })} Total Count</span>
                  <span className="rstat-n mono">{apiCount}</span>
                </div>
                {apiConfidence > 0 && (
                  <div className="rstat ok">
                    <span className="rstat-l">{I.trendUp({ size: 13 })} Confidence</span>
                    <span className="rstat-n mono">{apiConfidence}%</span>
                    <div className="confbar"><span style={{ width: apiConfidence + "%" }}></span></div>
                  </div>
                )}
                {Object.entries(apiCounts).map(([name, cnt]) => (
                  <div className="rstat" key={name}>
                    <span className="rstat-l" style={{ textTransform: "capitalize" }}>{name}</span>
                    <span className="rstat-n mono">{cnt}</span>
                  </div>
                ))}
              </div>
              <button
                className="btn btn-ghost btn-block"
                style={{ marginTop: 8 }}
                onClick={() => saveImage(resultUrl, "detection-result.jpg", setPreviewUrl)}
              >
                {I.download({ size: 16 })} Save Detection Result
              </button>
            </>
          )}
        </section>

        {/* Panel 3 — confirm */}
        <section className={"card card-pad panel" + (phase !== "detected" ? " panel-locked" : "")}>
          <header className="panel-head">
            <span className="panel-num">03</span>
            <h3>Confirm &amp; Submit</h3>
          </header>

          <div className="confirm-body">
            <div className="field">
              <label>DO Number</label>
              <input
                className="input mono"
                value={doNum}
                onChange={(e) => setDoNum(e.target.value)}
                disabled={phase !== "detected"}
              />
            </div>

            <div className="field">
              <label>Actual Amount</label>
              <div className="actual-row">
                <input
                  className="input mono"
                  value={actual}
                  onChange={(e) => setActual(e.target.value.replace(/\D/g, ""))}
                  disabled={phase !== "detected"}
                />
                {phase === "detected" && variance !== null && (
                  <span className={"variance " + (variance === 0 ? "ok" : Math.abs(variance) <= 3 ? "warn" : "err")}>
                    {variance === 0 ? "match" : (variance > 0 ? "+" : "") + variance + " vs model"}
                  </span>
                )}
              </div>
            </div>

            <div className="field">
              <label>Notes <span className="req">*</span></label>
              <textarea
                className="textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add context — discrepancies, bundle condition, batch ref…"
                disabled={phase !== "detected"}
              />
            </div>

            <div className="confirm-actions">
              <button
                className="btn btn-ok btn-block btn-lg"
                disabled={!canSubmit}
                onClick={() => onSubmit({ doNum, actual, count: apiCount, confidence: apiConfidence, notes })}
              >
                {I.checkCircle({ size: 18 })} Submit Detection
              </button>
              <button className="btn btn-ghost btn-block" onClick={reset} disabled={phase === "empty"}>
                Cancel
              </button>
            </div>
          </div>
        </section>
      </div>

      {previewUrl && (
        <div
          onClick={() => setPreviewUrl(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 20 }}
        >
          <p style={{ color: "#fff", fontSize: 13, opacity: 0.8, textAlign: "center" }}>Long press the image → Save to Photos</p>
          <img
            src={previewUrl}
            alt="Save preview"
            style={{ maxWidth: "100%", maxHeight: "75vh", objectFit: "contain", borderRadius: 10 }}
            onClick={e => e.stopPropagation()}
          />
          <button onClick={() => setPreviewUrl(null)} style={{ color: "#fff", background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 14 }}>Close</button>
        </div>
      )}
    </div>
  );
}
