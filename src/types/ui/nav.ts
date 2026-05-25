export namespace NavData {
  export interface Child {
    label: string;
    href: string;
    newTab?: boolean;
  }

  export interface Item {
    label: string;
    href: string;
    newTab?: boolean;
    children?: Child[];
  }
}
