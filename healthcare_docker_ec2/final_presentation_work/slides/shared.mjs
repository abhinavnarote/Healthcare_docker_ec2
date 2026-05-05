export const style = {
  bg: "#F7FAF8",
  ink: "#13201B",
  soft: "#5E6F68",
  muted: "#DCE7E2",
  line: "#C8D8D1",
  accent: "#157A6E",
  accent2: "#C56E33",
  accent3: "#E7B75F",
  dark: "#10231F",
  pale: "#EDF5F1",
  white: "#FFFFFF",
  serif: "Georgia",
  sans: "Avenir Next",
};

export function text(slide, ctx, value, x, y, w, h, opts = {}) {
  return ctx.addText(slide, {
    text: String(value ?? ""),
    left: x,
    top: y,
    width: w,
    height: h,
    fontSize: opts.size ?? 18,
    color: opts.color ?? style.ink,
    bold: Boolean(opts.bold),
    typeface: opts.face ?? style.sans,
    align: opts.align ?? "left",
    valign: opts.valign ?? "top",
    fill: opts.fill ?? "#00000000",
    line: opts.line ?? ctx.line(),
    insets: opts.insets ?? { left: 0, right: 0, top: 0, bottom: 0 },
    name: opts.name,
  });
}

export function rect(slide, ctx, x, y, w, h, fill, opts = {}) {
  return ctx.addShape(slide, {
    left: x,
    top: y,
    width: w,
    height: h,
    geometry: opts.geometry ?? "rect",
    fill,
    line: opts.line ?? ctx.line(),
    name: opts.name,
  });
}

export function line(slide, ctx, x, y, w, color = style.line, weight = 1) {
  rect(slide, ctx, x, y, w, weight, color);
}

export function bg(slide, ctx) {
  rect(slide, ctx, 0, 0, 1280, 720, style.bg);
  rect(slide, ctx, 0, 0, 1280, 12, style.accent);
}

export function kicker(slide, ctx, label, page) {
  rect(slide, ctx, 58, 49, 9, 9, style.accent, { name: `kicker-${page}-marker` });
  text(slide, ctx, label.toUpperCase(), 80, 43, 420, 22, {
    size: 9,
    color: style.soft,
    bold: true,
    name: `kicker-${page}-label`,
    valign: "mid",
  });
}

export function title(slide, ctx, value, y = 82, size = 35, w = 860) {
  text(slide, ctx, value, 58, y, w, 96, {
    size,
    color: style.ink,
    face: style.serif,
    bold: true,
  });
}

export function footer(slide, ctx, page, note = "Healthcare Clinical Conversation Analysis | Practical Cloud Computing Project") {
  line(slide, ctx, 58, 682, 1164, style.line, 1);
  text(slide, ctx, note, 58, 690, 860, 16, { size: 7.5, color: style.soft });
  text(slide, ctx, String(page).padStart(2, "0"), 1175, 686, 48, 20, {
    size: 12,
    color: style.soft,
    face: style.serif,
    bold: true,
    align: "right",
  });
}

export function bullet(slide, ctx, value, x, y, w, opts = {}) {
  rect(slide, ctx, x, y + 8, 5, 5, opts.color ?? style.accent);
  text(slide, ctx, value, x + 18, y, w - 18, opts.h ?? 38, {
    size: opts.size ?? 14,
    color: opts.textColor ?? style.ink,
    bold: opts.bold,
  });
}

export function pill(slide, ctx, value, x, y, w, fill = style.pale, color = style.ink) {
  rect(slide, ctx, x, y, w, 34, fill, { line: { width: 1, fill: style.line } });
  text(slide, ctx, value, x + 12, y + 8, w - 24, 18, { size: 10.5, color, bold: true, align: "center" });
}

export function metric(slide, ctx, value, label, note, x, y, w = 210, accent = style.accent) {
  line(slide, ctx, x, y, w, accent, 3);
  text(slide, ctx, value, x, y + 16, w, 42, { size: 32, color: style.ink, face: style.serif, bold: true });
  text(slide, ctx, label.toUpperCase(), x, y + 62, w, 18, { size: 8.5, color: style.soft, bold: true });
  text(slide, ctx, note, x, y + 82, w, 34, { size: 10.5, color: style.soft });
}

export function node(slide, ctx, label, sub, x, y, w, h, fill = style.white, accent = style.accent) {
  rect(slide, ctx, x, y, w, h, fill, { line: { width: 1, fill: style.line } });
  rect(slide, ctx, x, y, 6, h, accent);
  text(slide, ctx, label, x + 18, y + 14, w - 32, 24, { size: 15, color: style.ink, bold: true });
  text(slide, ctx, sub, x + 18, y + 43, w - 34, h - 52, { size: 10.5, color: style.soft });
}

export function arrow(slide, ctx, x1, y1, x2, y2, color = style.accent) {
  const w = x2 - x1;
  line(slide, ctx, x1, y1, w, color, 2);
  rect(slide, ctx, x2 - 8, y2 - 5, 10, 10, color, { geometry: "triangle" });
}

export function table(slide, ctx, x, y, widths, rows, opts = {}) {
  const rowH = opts.rowH ?? 42;
  rows.forEach((row, r) => {
    let xx = x;
    row.forEach((cell, c) => {
      const fill = r === 0 ? style.dark : (r % 2 ? style.white : style.pale);
      const color = r === 0 ? style.white : style.ink;
      rect(slide, ctx, xx, y + r * rowH, widths[c], rowH, fill, { line: { width: 1, fill: style.line } });
      text(slide, ctx, cell, xx + 10, y + r * rowH + 9, widths[c] - 20, rowH - 14, {
        size: r === 0 ? 10.5 : 10,
        color,
        bold: r === 0 || c === 0,
        valign: "mid",
      });
      xx += widths[c];
    });
  });
}
