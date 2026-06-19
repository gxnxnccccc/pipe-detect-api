"use client";
import { useState } from "react";
import { Icons } from "./Icons";

export default function LoginScreen({ onLogin }) {
  const I = Icons;
  const [id, setId] = useState("OP-2207");
  const [pw, setPw] = useState("••••••••");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = () => {
    if (!id || busy) return;
    setBusy(true);
    setTimeout(() => onLogin(id), 750);
  };

  return (
    <div className="login">
      {/* left: brand / context panel */}
      <div className="login-aside">
        <div className="login-aside-top">
          <div className="brand">
            <div className="brand-mark">{I.logo({ size: 20 })}</div>
            <div>
              <div className="brand-name" style={{ color: "#fff" }}>SPDS</div>
              <div className="brand-sub" style={{ color: "oklch(0.78 0.03 256)" }}>STEEL&nbsp;PIPE&nbsp;DETECTION</div>
            </div>
          </div>
        </div>

        <div className="login-aside-mid">
          <div className="login-eyebrow">{I.cpu({ size: 13 })} VISION&nbsp;·&nbsp;COUNT&nbsp;·&nbsp;VERIFY</div>
          <h1>Count every pipe<br />before it ships.</h1>
          <p>Point the line camera at a bundle and the model counts, grades confidence, and logs the result against the delivery order — in seconds.</p>
        </div>

        <div className="login-stats">
          <div className="lstat"><span className="lstat-n mono">97.2%</span><span className="lstat-l">avg accuracy</span></div>
          <div className="lstat-div"></div>
          <div className="lstat"><span className="lstat-n mono">8,940</span><span className="lstat-l">bundles logged</span></div>
          <div className="lstat-div"></div>
          <div className="lstat"><span className="lstat-n mono">~3s</span><span className="lstat-l">per count</span></div>
        </div>

        <div className="login-pipes" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, r) => (
            <div className="pipe-row" key={r}>
              {Array.from({ length: 7 - (r % 2) }).map((_, c) => (
                <span className="pipe" key={c}></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* right: form */}
      <div className="login-main">
        <div className="login-form fade-up">
          <div className="login-form-head">
            <span className="badge ok"><span className="dot ok"></span> System Online</span>
            <h2>Factory Login</h2>
            <p>Sign in with your operator credentials to start a detection session.</p>
          </div>

          <div className="field">
            <label>Operator ID</label>
            <input
              className="input mono"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="OP-0000"
              autoFocus
            />
          </div>

          <div className="field">
            <label>Password</label>
            <div className="input-wrap">
              <input
                className="input mono"
                type={show ? "text" : "password"}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Enter your password"
              />
              <button type="button" className="input-affix" onClick={() => setShow(!show)} tabIndex={-1}>
                {show ? I.eyeOff({ size: 18 }) : I.eye({ size: 18 })}
              </button>
            </div>
          </div>

          <div className="login-row">
            <label className="check">
              <input type="checkbox" defaultChecked /> <span>Keep me signed in</span>
            </label>
            <a className="link" href="#" onClick={(e) => e.preventDefault()}>Forgot?</a>
          </div>

          <button className="btn btn-primary btn-block btn-lg" type="button" onClick={submit} disabled={busy}>
            {busy
              ? <>{I.refresh({ size: 18, className: "spin" })} Authenticating…</>
              : <>Log In {I.arrowRight({ size: 18 })}</>
            }
          </button>

          <div className="login-foot">
            <span className="mono">v2.4.0</span>
            <span>·</span>
            <span>Line A — Bay 3 Terminal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
