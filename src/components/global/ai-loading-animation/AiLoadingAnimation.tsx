"use client";

import { forwardRef, useEffect, useState } from "react";

/**
 * AiLoadingAnimation
 * - Glow border + scan beam over the editor (never blocks scroll/clicks)
 * - Floating status pill with step label + progress bar (+ optional Show/Stop)
 *
 * Parent must be `position: relative` and NOT the scrolling element
 * (wrap your scrolling canvas in a relative, overflow-hidden "stage" div),
 * otherwise the overlay will scroll away with the content.
 *
 * Theme: reads CSS variables if you have them, falls back to a dark palette.
 *   --ac (accent)  --ac2 (accent soft)  --pn (panel)  --ln (line)
 *   --tx (text)    --mu (muted)         --hv (hover)  --in (input bg)
 */

const STYLES = `
.ai-fx{position:absolute;inset:0;pointer-events:none;z-index:9999;overflow:hidden;animation:ai-fadein .4s}
.ai-fx::before{content:"";position:absolute;inset:0;box-shadow:inset 0 0 0 1px var(--ac,#3b93f5),inset 0 0 80px -34px var(--ac,#3b93f5);animation:ai-pulse 2.4s ease-in-out infinite}
.ai-fx i{position:absolute;left:0;right:0;height:150px;top:-150px;background:linear-gradient(180deg,transparent,var(--ac2,rgba(59,147,245,.16)) 80%,var(--ac,#3b93f5));opacity:.9;animation:ai-scan 3s cubic-bezier(.45,0,.2,1) infinite}
.ai-fx i::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--ac,#3b93f5)}
.ai-pill{position:absolute;left:50%;bottom:75px;z-index:9999; transform:translateX(-50%);display:flex;align-items:center;gap:12px;background:var(--pn,#111113);color:var(--tx,#ececf0);border:1px solid var(--ln,#222226);border-radius:12px;padding:8px 14px;box-shadow:0 12px 32px -12px rgba(0,0,0,.5);animation:ai-pillin .3s cubic-bezier(.2,.7,.2,1);pointer-events:none;white-space:nowrap;font:500 13px/1.4 inherit}
.ai-t{min-width:170px}
.ai-pill button{pointer-events:auto;height:28px;padding:0 10px;border:0;border-radius:33px;background:none;color:var(--mu,#8a8a94);font:500 12px inherit;cursor:pointer}
.ai-pill button:hover{background:var(--hv,#1a1a1e);color:var(--tx,#ececf0)}
.ai-spin{width:14px;height:14px;border-radius:50%;border:2px solid var(--ln,#222226);border-top-color:var(--ac,#3b93f5);animation:ai-rot .7s linear infinite}
.ai-pb{height:3px;background:var(--in,#18181c);border-radius:2px;overflow:hidden;margin-top:6px}
.ai-pb i{display:block;height:100%;background:var(--ac,#3b93f5);transition:width 1.2s ease}
.ai-skel{position:relative;margin:20px 24px 0;padding:40px;border-radius:12px;outline:1.5px dashed var(--ac,#3b93f5);outline-offset:-1px;min-height:420px;background:#05070d}
.ai-skel-tag{position:absolute;left:-1px;top:-21px;background:var(--ac,#3b93f5);color:#fff;font:600 10.5px/20px inherit;padding:0 7px;border-radius:4px 4px 0 0}
.ai-sk{border-radius:8px;background:linear-gradient(90deg,#10141d 25%,#1e2638 50%,#10141d 75%);background-size:200% 100%;animation:ai-shim 1.4s linear infinite;opacity:0;transform:translateY(6px);transition:opacity .45s,transform .45s}
.ai-sk.on{opacity:1;transform:none}
.ai-skg{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px;margin-top:28px}
@keyframes ai-scan{to{top:100%}}
@keyframes ai-pulse{50%{opacity:.45}}
@keyframes ai-fadein{from{opacity:0}}
@keyframes ai-rot{to{transform:rotate(360deg)}}
@keyframes ai-shim{to{background-position:-200% 0}}
@keyframes ai-pillin{from{opacity:0;transform:translate(-50%,8px)}}
@media(prefers-reduced-motion:reduce){.ai-fx::before,.ai-fx i,.ai-sk{animation:none!important}.ai-pb i,.ai-sk{transition:none!important}}
`;

const DEFAULT_STEPS = ["Analyzing request", "Processing data", "Waiting for AI model", "Writing some code"];

type Props = {
  loading: boolean;
  /** Labels shown in the pill. */
  steps?: string[];
  /** Controlled step (e.g. from real stream events). Omit to auto-advance. */
  step?: number;
  /** Auto-advance interval in ms (ignored when `step` is controlled). */
  stepDuration?: number;
  onStepChange?: (step: number) => void;
  /** Shows a "Show" button, e.g. scroll to the skeleton. */
  onShow?: () => void;
  /** Shows a "Stop" button. */
  onStop?: () => void;
};

export function AiLoadingAnimation({ loading, steps = DEFAULT_STEPS, step, stepDuration = 1300, onStepChange, onShow, onStop }: Props) {
  const [auto, setAuto] = useState(0);
  const last = steps.length - 1;
  const current = Math.min(step ?? auto, last);

  useEffect(() => {
    if (!loading) {
      setAuto(0);
      return;
    }
    if (step !== undefined) return;
    const t = setTimeout(() => setAuto((a) => (a >= last ? 0 : a + 1)), stepDuration);
    return () => clearTimeout(t);
  }, [loading, auto, step, last, stepDuration]);

  useEffect(() => {
    onStepChange?.(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  if (!loading) return null;

  return (
    <>
      <style>{STYLES}</style>
      <div
        className="ai-fx  h-[calc(100%-50px)] overflow-y-auto mx-[240px]"
        aria-hidden
      >
        <i />
      </div>
      <div
        className="ai-pill"
        role="status"
        aria-live="polite"
      >
        <span className="ai-spin" />
        <div className="ai-t">
          {steps[current]}…
          <div className="ai-pb">
            <i style={{ width: `${((current + 1) / steps.length) * 100}%` }} />
          </div>
        </div>
        {onShow && <button onClick={onShow}>Show</button>}
        {onStop && <button onClick={onStop}>Stop</button>}
      </div>
    </>
  );
}

/**
 * Optional: the dashed shimmer skeleton that sits inside the page content
 * (at the position where the new section will appear). Drive it with the same step.
 */
export const AiLoadingSkeleton = forwardRef<HTMLDivElement, { step: number }>(function AiLoadingSkeleton({ step }, ref) {
  const on = (n: number) => `ai-sk${step >= n ? " on" : ""}`;
  return (
    <div
      className="ai-skel"
      ref={ref}
    >
      <style>{STYLES}</style>
      <b className="ai-skel-tag">Processing…</b>
      <div
        className={on(1)}
        style={{ height: 26, width: "36%", margin: "0 auto" }}
      />
      <div
        className={on(1)}
        style={{ height: 12, width: "52%", margin: "14px auto 0" }}
      />
      <div className="ai-skg">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={on(2)}
            style={{ height: 170, transitionDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
      <div
        className={on(3)}
        style={{ height: 12, width: "70%", marginTop: 28 }}
      />
      <div
        className={on(3)}
        style={{ height: 12, width: "45%", marginTop: 10 }}
      />
    </div>
  );
});

export default AiLoadingAnimation;
