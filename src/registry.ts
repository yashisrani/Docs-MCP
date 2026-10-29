import { createRequire } from "module";
const require = createRequire(import.meta.url);
const templatesBundle = require("./data/templates-bundle.json");

export interface Contributor {
  name: string;
  id: string;
  roles: string[];
}

export interface TemplateItem {
  id: string;
  name: string;
  summary: string;
  packs: string[];
  folder: string;
  files: Record<string, string>;
  contents: Record<string, string>;
  file_types?: string[];
}

export interface BundleData {
  templates: TemplateItem[];
  style_guide: string;
  writing_tips: string;
}

const bundle: BundleData = templatesBundle as BundleData;

// Semantic intent mapping for common developer phrases
const INTENT_KEYWORDS: Record<string, string[]> = {
  feature: ["concept", "how-to", "quickstart", "reference"],
  "feature doc": ["concept", "how-to", "reference"],
  "code feature": ["concept", "how-to", "api-reference"],
  architecture: ["concept", "sdk-overview", "reference"],
  overview: ["concept", "readme", "sdk-overview"],
  install: ["installation-guide", "quickstart"],
  setup: ["installation-guide", "quickstart", "how-to"],
  onboarding: ["quickstart", "tutorial", "readme"],
  guide: ["how-to", "tutorial", "quickstart"],
  tutorial: ["tutorial", "how-to", "quickstart"],
  api: ["api-reference", "api-getting-started"],
  endpoints: ["api-reference", "api-getting-started"],
  error: ["troubleshooting", "bug-report"],
  bug: ["bug-report", "troubleshooting"],
  fix: ["troubleshooting", "how-to"],
  version: ["release-notes", "changelog"],
  release: ["release-notes", "changelog"],
  terms: ["glossary", "terminology-system"],
  rules: ["style-guide", "code-of-conduct"],
};

export function getAllTemplates(): TemplateItem[] {
  return bundle.templates;
}

export function getTemplateById(id: string): TemplateItem | undefined {
  const norm = id.toLowerCase().trim();
  return bundle.templates.find(
    (t) =>
      t.id.toLowerCase() === norm ||
      t.name.toLowerCase() === norm ||
      t.name.toLowerCase().replace(/\s+/g, "-") === norm
  );
}

export function searchTemplates(query: string): TemplateItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return bundle.templates;

  const terms = q.split(/\s+/).filter(Boolean);

  // Check intent keywords
  const boostedIds = new Set<string>();
  for (const [intentKey, targetIds] of Object.entries(INTENT_KEYWORDS)) {
    if (q.includes(intentKey)) {
      targetIds.forEach((id) => boostedIds.add(id));
    }
  }

  return bundle.templates
    .map((t) => {
      let score = 0;
      const idMatch = t.id.toLowerCase();
      const nameMatch = t.name.toLowerCase();
      const summaryMatch = t.summary.toLowerCase();

      // Semantic boost for common intents
      if (boostedIds.has(t.id)) {
        score += 8;
      }

      for (const term of terms) {
        if (idMatch.includes(term)) score += 5;
        if (nameMatch.includes(term)) score += 4;
        if (summaryMatch.includes(term)) score += 2;
        if (t.packs.some((p) => p.toLowerCase().includes(term))) score += 1;
      }

      return { template: t, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.template);
}

export function getStyleGuide(): string {
  return bundle.style_guide;
}

export function getWritingTips(): string {
  return bundle.writing_tips;
}
