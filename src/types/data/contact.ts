export namespace ContactData {
  export interface Social {
    name: string;
    url: string;
    icon: string;
  }
}

export interface ContactData {
  descHtml: string;
  socials: ContactData.Social[];
}
