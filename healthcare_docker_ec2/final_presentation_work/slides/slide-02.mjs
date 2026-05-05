import { bg, bullet, footer, kicker, rect, style, text, title } from "./shared.mjs";

export async function slide02(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Problem", 2);
  title(slide, ctx, "Clinical conversations contain high-value signals, but most of them stay unstructured.");
  text(slide, ctx, "The project targets the gap between spoken clinical encounters and usable healthcare intelligence.", 58, 178, 760, 40, { size: 15, color: style.soft });
  rect(slide, ctx, 58, 258, 520, 258, style.white, { line: { width: 1, fill: style.line } });
  text(slide, ctx, "Current workflow pain", 86, 286, 250, 26, { size: 17, color: style.ink, bold: true });
  bullet(slide, ctx, "Doctors manually document important details after visits.", 86, 338, 430);
  bullet(slide, ctx, "Symptoms, decisions, and follow-up needs can be missed.", 86, 392, 430);
  bullet(slide, ctx, "Patient feedback is often delayed and survey-based.", 86, 446, 430);
  rect(slide, ctx, 690, 258, 432, 258, style.dark);
  text(slide, ctx, "Project question", 730, 296, 220, 26, { size: 16, color: "#BBD8CF", bold: true });
  text(slide, ctx, "Can cloud-hosted AI analyze clinical conversations and return useful insights through a browser?", 730, 348, 320, 128, {
    size: 22,
    color: style.white,
    face: style.serif,
    bold: true,
  });
  footer(slide, ctx, 2);
  return slide;
}
