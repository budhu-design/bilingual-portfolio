"use client";

import { useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { ScrambleText } from "./ScrambleText";
import { usePrefersReducedMotion } from "./useReducedMotion";

type Node = { id: string; en: string; hi: string; children?: Node[] };

const ORG: Node = {
  id: "root",
  en: "Central Council",
  hi: "केंद्रीय परिषद",
  children: [
    {
      id: "n-zone",
      en: "North Zone",
      hi: "उत्तर क्षेत्र",
      children: [
        { id: "delhi", en: "Delhi Shakha", hi: "दिल्ली शाखा" },
        { id: "chd", en: "Chandigarh Shakha", hi: "चंडीगढ़ शाखा" },
      ],
    },
    {
      id: "w-zone",
      en: "West Zone",
      hi: "पश्चिम क्षेत्र",
      children: [
        { id: "mum", en: "Mumbai Shakha", hi: "मुंबई शाखा" },
        { id: "pune", en: "Pune Shakha", hi: "पुणे शाखा" },
      ],
    },
    {
      id: "s-zone",
      en: "South Zone",
      hi: "दक्षिण क्षेत्र",
      children: [
        { id: "chn", en: "Chennai Shakha", hi: "चेन्नई शाखा" },
        { id: "blr", en: "Bengaluru Shakha", hi: "बेंगलुरु शाखा" },
      ],
    },
  ],
};

const NODE_W = 176;
const NODE_H = 64;
const COL_GAP = 32;
const ROW_GAP = 96;
// Must match the `top-10` Tailwind class on the draggable tree container below.
const CONTENT_TOP_OFFSET = 40;

type Positioned = Node & { x: number; y: number; depth: number; parentId: string | null };

function layout(node: Node, depth: number, parentId: string | null, offset: { x: number }): Positioned[] {
  if (!node.children || node.children.length === 0) {
    const x = offset.x;
    offset.x += NODE_W + COL_GAP;
    return [{ ...node, x, y: depth * (NODE_H + ROW_GAP), depth, parentId }];
  }
  const childResults = node.children.flatMap((c) => layout(c, depth + 1, node.id, offset));
  const xs = childResults.filter((c) => c.parentId === node.id).map((c) => c.x);
  const x = (Math.min(...xs) + Math.max(...xs)) / 2;
  return [{ ...node, x, y: depth * (NODE_H + ROW_GAP), depth, parentId }, ...childResults];
}

function buildTree(): Positioned[] {
  const nodes = layout(ORG, 0, null, { x: 0 });
  const xs = nodes.map((n) => n.x);
  const centerOffset = (Math.min(...xs) + Math.max(...xs)) / 2 + NODE_W / 2;
  return nodes.map((n) => ({ ...n, x: n.x - centerOffset }));
}

function isHiddenByCollapse(n: Positioned, all: Positioned[], collapsed: Set<string>): boolean {
  let cur: Positioned | undefined = n;
  while (cur?.parentId) {
    if (collapsed.has(cur.parentId)) return true;
    cur = all.find((a) => a.id === cur!.parentId);
  }
  return false;
}

/**
 * Explorable org hierarchy: drag to pan, wheel or +/- to zoom, click a node
 * to fly the camera to it and expand/collapse its children in place.
 */
export function OrgChart() {
  const reduced = usePrefersReducedMotion();
  const nodes = useMemo(buildTree, []);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [focused, setFocused] = useState<string | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(40);
  const scale = useMotionValue(0.9);

  const visible = nodes.filter((n) => !isHiddenByCollapse(n, nodes, collapsed));

  const focusNode = (n: Positioned) => {
    setFocused(n.id);
    const vp = viewportRef.current;
    if (!vp) return;
    const targetScale = 1.15;
    const rect = vp.getBoundingClientRect();
    // The tree's own container is already anchored at the viewport's
    // horizontal center via `left-1/2`, so centering a node needs pan = 0 at
    // that node's local origin — NOT rect.width/2 (that term double-counts
    // the anchor and was throwing focused nodes off to the side).
    animate(x, -(n.x + NODE_W / 2) * targetScale, {
      type: "spring",
      stiffness: 200,
      damping: 28,
    });
    animate(y, rect.height / 2 - CONTENT_TOP_OFFSET - (n.y + NODE_H / 2) * targetScale, {
      type: "spring",
      stiffness: 200,
      damping: 28,
    });
    animate(scale, targetScale, { type: "spring", stiffness: 200, damping: 28 });
  };

  const zoomBy = (delta: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const oldScale = scale.get();
    const newScale = Math.min(1.6, Math.max(0.5, oldScale + delta));
    if (newScale === oldScale) return;
    // Scale alone re-anchors around the container's fixed CSS transform-origin
    // (its own top-left, independent of how far the user has panned), which
    // is what made zooming feel like it jumped to an unrelated point. Rescale
    // the current pan by the same ratio so whatever's centered stays centered.
    const rect = vp.getBoundingClientRect();
    const ratio = newScale / oldScale;
    const centerY = rect.height / 2 - CONTENT_TOP_OFFSET;
    animate(x, x.get() * ratio, { type: "spring", stiffness: 300, damping: 30 });
    animate(y, centerY * (1 - ratio) + y.get() * ratio, { type: "spring", stiffness: 300, damping: 30 });
    animate(scale, newScale, { type: "spring", stiffness: 300, damping: 30 });
  };

  return (
    <div className="select-none">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-widest text-[#c8a24e]">
          Drag to pan · scroll or +/– to zoom · click a node to focus
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => zoomBy(-0.15)}
            className="h-8 w-8 rounded-full border border-white/15 text-[#f6f3ec]/80 hover:bg-white/10"
            aria-label="Zoom out"
          >
            –
          </button>
          <button
            onClick={() => zoomBy(0.15)}
            className="h-8 w-8 rounded-full border border-white/15 text-[#f6f3ec]/80 hover:bg-white/10"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="relative h-[440px] w-full cursor-grab overflow-hidden rounded-2xl border border-white/10 bg-[#111116] active:cursor-grabbing"
        onWheel={(e) => {
          e.preventDefault();
          zoomBy(-e.deltaY * 0.001);
        }}
      >
        <motion.div
          drag
          dragElastic={0.15}
          dragMomentum={false}
          style={{ x, y, scale }}
          className="absolute left-1/2 top-10 origin-top-left"
        >
          <svg className="absolute left-0 top-0 overflow-visible" width={1} height={1}>
            {visible
              .filter((n) => n.parentId)
              .map((n) => {
                const parent = nodes.find((p) => p.id === n.parentId)!;
                return (
                  <line
                    key={`edge-${n.id}`}
                    x1={parent.x + NODE_W / 2}
                    y1={parent.y + NODE_H}
                    x2={n.x + NODE_W / 2}
                    y2={n.y}
                    stroke="#c8a24e"
                    strokeOpacity={0.35}
                    strokeWidth={1.5}
                  />
                );
              })}
          </svg>

          {visible.map((n) => (
            <motion.button
              key={n.id}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={reduced ? undefined : { scale: 1.05 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={() => {
                focusNode(n);
                if (n.children) {
                  setCollapsed((s) => {
                    const next = new Set(s);
                    if (next.has(n.id)) next.delete(n.id);
                    else next.add(n.id);
                    return next;
                  });
                }
              }}
              style={{ position: "absolute", left: n.x, top: n.y, width: NODE_W, height: NODE_H }}
              className={`flex flex-col items-center justify-center rounded-xl border px-3 text-center transition-colors ${
                focused === n.id
                  ? "border-[#c8a24e] bg-[#c8a24e]/15"
                  : "border-white/15 bg-white/5 hover:border-white/30"
              }`}
            >
              <ScrambleText as="span" en={n.en} hi={n.hi} className="text-sm font-medium text-[#f6f3ec]" />
              {n.children && (
                <span className="mt-0.5 text-[10px] text-[#f6f3ec]/40">
                  {collapsed.has(n.id) ? "+ expand" : "– collapse"}
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
