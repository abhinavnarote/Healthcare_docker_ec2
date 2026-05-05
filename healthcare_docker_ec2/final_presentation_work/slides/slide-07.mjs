import { bg, bullet, footer, kicker, rect, style, text, title } from "./shared.mjs";

export async function slide07(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Outcome dashboard", 7);
  title(slide, ctx, "The app returns a complete analysis view rather than a single model output.");
  rect(slide, ctx, 70, 238, 520, 340, style.dark);
  text(slide, ctx, "Example outputs from chest-pain visit", 102, 270, 360, 26, { size: 18, color: style.white, bold: true });
  text(slide, ctx, "Patient mentions sharp left-side chest pain, lightheadedness, trouble breathing, palpitations, neck swelling, smoking history, and family history of heart attack.", 102, 322, 420, 118, {
    size: 15,
    color: "#D9E8E2",
  });
  text(slide, ctx, "The generated summary organizes this into symptoms, follow-up needs, key decisions, and named entities.", 102, 474, 400, 62, {
    size: 13,
    color: "#BBD8CF",
  });
  bullet(slide, ctx, "Transcript displayed for review", 690, 258, 420, { bold: true });
  bullet(slide, ctx, "Sentiment displayed as a compound score and label", 690, 318, 420, { bold: true });
  bullet(slide, ctx, "Entities grouped into people, organizations, dates, and locations", 690, 378, 440, { bold: true });
  bullet(slide, ctx, "Speaker segmentation and transcript Q&A support fast review", 690, 438, 440, { bold: true });
  bullet(slide, ctx, "LLM summary turns raw transcript into a clinical narrative", 690, 498, 440, { bold: true });
  footer(slide, ctx, 7);
  return slide;
}
