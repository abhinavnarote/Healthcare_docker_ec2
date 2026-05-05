import { bg, footer, metric, rect, style, text } from "./shared.mjs";

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  rect(slide, ctx, 58, 72, 5, 72, style.accent2);
  text(slide, ctx, "FINAL PROJECT PRESENTATION", 82, 74, 360, 22, { size: 10, color: style.soft, bold: true });
  text(slide, ctx, "Cloud-Based Healthcare Clinical Conversation Analysis", 58, 185, 720, 146, {
    size: 48,
    color: style.ink,
    face: style.serif,
    bold: true,
  });
  text(slide, ctx, "A deployed AI pipeline for turning doctor-patient conversations into transcription, sentiment, entities, summaries, and transcript-based Q&A.", 60, 350, 720, 62, {
    size: 18,
    color: style.soft,
  });
  rect(slide, ctx, 850, 96, 314, 396, style.dark);
  text(slide, ctx, "PROJECT OUTCOME", 884, 132, 245, 22, { size: 9, color: "#BBD8CF", bold: true, align: "center" });
  text(slide, ctx, "Streamlit app\npackaged for\nDocker + AWS EC2", 884, 196, 248, 144, {
    size: 34,
    color: style.white,
    face: style.serif,
    bold: true,
    align: "center",
  });
  text(slide, ctx, "Prototype uses synthetic or de-identified conversations only.", 900, 382, 216, 42, {
    size: 11,
    color: "#CFE2DC",
    align: "center",
  });
  metric(slide, ctx, "6", "AI/NLP layers", "Whisper, VADER, spaCy, ML, embeddings, LLM", 58, 530, 245, style.accent);
  metric(slide, ctx, "2", "Input modes", "Text and MP3 clinical conversations", 350, 530, 220, style.accent2);
  metric(slide, ctx, "1", "Cloud target", "AWS EC2 container deployment", 620, 530, 230, style.accent3);
  metric(slide, ctx, "Live", "Demo path", "Browser-accessible Streamlit interface", 895, 530, 250, style.accent);
  footer(slide, ctx, 1);
  return slide;
}
