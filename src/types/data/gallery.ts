export namespace GalleryData {
  export interface Link {
    icon: string;
    tooltip: string;
    href: string;
  }

  export interface Item {
    pickup?: boolean;
    title: string;
    year: string;
    description?: string;
    image?: string;
    embedUrl?: string;
    embedType?: "video";
    links?: Link[];
  }

  export interface Section {
    section: string;
    descHtml?: string;
    items: Item[];
  }

  export interface Category {
    type: "music" | "illustration";
    label: string;
    descHtml: string;
    sections: Section[];
  }
}

export interface GalleryData {
  pickupDescHtml: string;
  allDescHtml: string;
  categories: GalleryData.Category[];
}
