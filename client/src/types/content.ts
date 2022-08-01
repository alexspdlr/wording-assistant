export interface ContentSubSection {
  title: string;
  id: string;
  contentMD?: string;
}

export interface ContentSection {
  title: string;
  id: string;
  contentMD?: string;
  subSections?: ContentSubSection[];
}
