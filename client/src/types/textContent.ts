import { ReactNode } from 'react';

export interface TextContentBody {
  type: 'ReactNode' | 'Markdown';
  value: ReactNode | string;
}

export interface TextContentSubSection {
  title: string;
  id: string;
  body?: TextContentBody[];
}

export interface TextContentSection {
  title: string;
  id: string;
  body?: TextContentBody[];
  subSections?: TextContentSubSection[];
}
