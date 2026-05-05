import { bg, footer, kicker, rect, style, text, title } from "./shared.mjs";

export async function slide05(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Implementation", 5);
  title(slide, ctx, "The build turned the NLP prototype into a deployable cloud project.");
  const steps = [
    ["01", "Cleaned app", "Renamed interface for clinical conversation intelligence and added privacy note."],
    ["02", "Packaged code", "Added requirements, Dockerfile, .dockerignore, sample data, and .env template."],
    ["03", "Resolved setup issues", "Pinned compatible Torch/httpx versions and handled Whisper build isolation."],
    ["04", "Prepared EC2 flow", "Documented SSH, file upload, Docker build, container run, and security group setup."],
  ];
  steps.forEach((s, i) => {
    const x = 76 + i * 292;
    rect(slide, ctx, x, 278, 238, 238, i % 2 ? style.pale : style.white, { line: { width: 1, fill: style.line } });
    text(slide, ctx, s[0], x + 22, 300, 60, 42, { size: 30, color: i % 2 ? style.accent2 : style.accent, face: style.serif, bold: true });
    text(slide, ctx, s[1], x + 22, 358, 190, 28, { size: 16, color: style.ink, bold: true });
    text(slide, ctx, s[2], x + 22, 402, 184, 78, { size: 11, color: style.soft });
  });
  text(slide, ctx, "Key deployment command", 76, 560, 220, 22, { size: 12, color: style.soft, bold: true });
  rect(slide, ctx, 300, 546, 690, 44, style.dark);
  text(slide, ctx, "docker run -d --env-file .env -p 8501:8501 --name clinical-app clinical-conversation-analysis", 318, 560, 650, 18, { size: 10, color: style.white });
  footer(slide, ctx, 5);
  return slide;
}
