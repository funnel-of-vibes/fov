export type AppStage = 'vibe' | 'building' | 'scaling';

export interface AppEntry {
  id: string;
  name: string;
  link: string;
  author: string;
  likes: number;
  contributors?: number;
  userCount?: number;
  vibeScore: number;
  description: string;
  timestamp: number;
  stage: AppStage;
}

export enum SortField {
  LIKES = 'likes',
  VIBE = 'vibeScore',
  NAME = 'name',
  DATE = 'timestamp',
  AUTHOR = 'author'
}

export interface VibeAnalysisResult {
  vibeScore: number;
  shortDescription: string;
}