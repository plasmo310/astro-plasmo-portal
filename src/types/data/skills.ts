export namespace SkillsData {
  export interface Item {
    name: string;
    level: number;
    icon: string;
  }

  export interface Category {
    category: string;
    skills: Item[];
  }

  export interface Section {
    section: string;
    categories: Category[];
  }
}

export interface SkillsData {
  descHtml: string;
  skill: SkillsData.Section[];
}
