import { bg, bullet, footer, kicker, rect, style, text, title } from "./shared.mjs";

export async function slide09(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Limits and future work", 9);
  title(slide, ctx, "The prototype works for demonstration, but production healthcare use would require stronger controls.");
  rect(slide, ctx, 78, 250, 480, 290, style.white, { line: { width: 1, fill: style.line } });
  text(slide, ctx, "Current limitations", 110, 280, 280, 26, { size: 18, color: style.ink, bold: true });
  bullet(slide, ctx, "Uses synthetic or de-identified sample conversations only.", 110, 332, 380);
  bullet(slide, ctx, "Speaker classifier is trained on a very small example set.", 110, 392, 380);
  bullet(slide, ctx, "Generic spaCy NER can detect noisy healthcare entities.", 110, 452, 380);
  rect(slide, ctx, 670, 250, 480, 290, style.dark);
  text(slide, ctx, "Future work", 702, 280, 260, 26, { size: 18, color: style.white, bold: true });
  bullet(slide, ctx, "Authentication, encryption, and audit logging.", 702, 332, 380, { textColor: style.white, color: style.accent3 });
  bullet(slide, ctx, "HIPAA-aware storage and access-control design.", 702, 392, 380, { textColor: style.white, color: style.accent3 });
  bullet(slide, ctx, "Clinical NER model and larger speaker-role dataset.", 702, 452, 380, { textColor: style.white, color: style.accent3 });
  footer(slide, ctx, 9);
  return slide;
}
