import { bg, footer, metric, rect, style, text } from "./shared.mjs";

export async function slide10(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  text(slide, ctx, "CONCLUSION", 58, 58, 220, 22, { size: 10, color: style.soft, bold: true });
  text(slide, ctx, "The final outcome is a working cloud-ready AI healthcare conversation analysis system.", 58, 160, 840, 118, {
    size: 40,
    color: style.ink,
    face: style.serif,
    bold: true,
  });
  text(slide, ctx, "The project bridges clinical conversation data and healthcare intelligence by combining NLP, machine learning, LLM APIs, Docker packaging, and AWS EC2 deployment planning.", 60, 306, 800, 70, {
    size: 17,
    color: style.soft,
  });
  rect(slide, ctx, 930, 116, 245, 330, style.dark);
  text(slide, ctx, "Final deliverables", 960, 150, 190, 22, { size: 15, color: style.white, bold: true, align: "center" });
  text(slide, ctx, "Streamlit app\nDockerfile\nEC2 deployment guide\nProject proposal\nFinal demo deck", 960, 206, 190, 170, {
    size: 20,
    color: "#D9E8E2",
    face: style.serif,
    bold: true,
    align: "center",
  });
  metric(slide, ctx, "Accessible", "Cloud value", "Browser-based interface for remote use", 58, 505, 245, style.accent);
  metric(slide, ctx, "Integrated", "AI value", "Speech, NLP, retrieval, and LLM summary", 360, 505, 255, style.accent2);
  metric(slide, ctx, "Useful", "Healthcare value", "Faster review of conversation insights", 675, 505, 255, style.accent3);
  footer(slide, ctx, 10, "Final project outcome summary");
  return slide;
}
