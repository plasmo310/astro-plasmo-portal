export namespace ProfileData {
  export interface Social {
    name: string;
    url: string;
    icon: string;
  }
}

export interface ProfileData {
  name: string;
  photoUrl: string;
  job: string;
  introHtml: string;
  blogUrl: string;
  socials: ProfileData.Social[];
}
