export namespace WorksData {
  export interface Link {
    icon: string;
    tooltip: string;
    href: string;
  }

  export interface Item {
    pickup?: boolean;
    category: string;
    title: string;
    period: string;
    overview: string;
    descHtml: string;
    images: string[];
    tech: string[];
    links: Link[];
  }

  export interface Section {
    section: string;
    descHtml?: string;
    works: Item[];
  }
}

export interface WorksData {
  pickupDescHtml: string;
  allDescHtml: string;
  sections: WorksData.Section[];
}
