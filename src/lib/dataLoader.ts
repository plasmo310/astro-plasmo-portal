import homeJa from '../data/ja/home.json';
import homeEn from '../data/en/home.json';
import aboutJa from '../data/ja/about.json';
import aboutEn from '../data/en/about.json';
import careerJa from '../data/ja/career.json';
import careerEn from '../data/en/career.json';
import contactJa from '../data/ja/contact.json';
import contactEn from '../data/en/contact.json';
import skillsJa from '../data/ja/skills.json';
import skillsEn from '../data/en/skills.json';
import worksJa from '../data/ja/works.json';
import worksEn from '../data/en/works.json';

export type Locale = 'ja' | 'en';

export class DataLoader {
  constructor(readonly locale: Locale) {}

  home() {
    return this.locale === 'en' ? homeEn : homeJa;
  }

  about() {
    return this.locale === 'en' ? aboutEn : aboutJa;
  }

  career() {
    return this.locale === 'en' ? careerEn : careerJa;
  }

  contact() {
    return this.locale === 'en' ? contactEn : contactJa;
  }

  skills() {
    return this.locale === 'en' ? skillsEn : skillsJa;
  }

  works() {
    return this.locale === 'en' ? worksEn : worksJa;
  }
}
