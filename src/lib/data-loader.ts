import homeJa from "../data/ja/home.json";
import homeEn from "../data/en/home.json";
import aboutJa from "../data/ja/about.json";
import aboutEn from "../data/en/about.json";
import careerJa from "../data/ja/career.json";
import careerEn from "../data/en/career.json";
import contactJa from "../data/ja/contact.json";
import contactEn from "../data/en/contact.json";
import skillsJa from "../data/ja/skills.json";
import skillsEn from "../data/en/skills.json";
import worksJa from "../data/ja/works.json";
import worksEn from "../data/en/works.json";
import galleryJa from "../data/ja/gallery.json";
import galleryEn from "../data/en/gallery.json";

export type Locale = "ja" | "en";

function absolutify<T>(data: T): T {
  if (typeof data === "string")
    return (
      !data.startsWith("http") &&
      !data.startsWith("/") &&
      data.match(/\.(png|jpe?g|gif|webp|svg|glb)$/)
        ? "/" + data
        : data
    ) as T;

  if (Array.isArray(data)) {
    return data.map(absolutify) as T;
  }

  if (data && typeof data === "object")
    return Object.fromEntries(
      Object.entries(data as Record<string, unknown>).map(([k, v]) => [
        k,
        absolutify(v),
      ]),
    ) as T;

  return data;
}

export class DataLoader {
  constructor(readonly locale: Locale) {}

  home() {
    return absolutify(this.locale === "en" ? homeEn : homeJa);
  }

  about() {
    return absolutify(this.locale === "en" ? aboutEn : aboutJa);
  }

  career() {
    return absolutify(this.locale === "en" ? careerEn : careerJa);
  }

  contact() {
    return absolutify(this.locale === "en" ? contactEn : contactJa);
  }

  skills() {
    return absolutify(this.locale === "en" ? skillsEn : skillsJa);
  }

  works() {
    return absolutify(this.locale === "en" ? worksEn : worksJa);
  }

  gallery() {
    return absolutify(this.locale === "en" ? galleryEn : galleryJa);
  }
}
