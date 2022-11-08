import { ReactNode } from 'react';

export interface ContentBody {
  type: 'ReactNode' | 'Markdown';
  value: ReactNode | string;
}

export interface ContentSubSection {
  title: string;
  id: string;
  body?: ContentBody[];
}

export interface ContentSection {
  title: string;
  id: string;
  body?: ContentBody[];
  subSections?: ContentSubSection[];
}
