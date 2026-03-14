
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: 'Jobs' | 'Admissions' | 'Guide' | 'Entrepreneurship' | 'Internship' | 'Apprenticeship' | 'Past Papers' | 'Education' | 'Updates' | 'Trends';
  tags: string[];
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
  sources?: { title: string; uri: string }[];
}

export interface DaeProgram {
  name: string;
  institution: string;
  province: string;
  duration: string;
  specialization: string;
  qualification: string;
  details: string;
}

export interface CvRoadmap {
  title?: string;
  category?: string;
  summary: string;
  extractedSkills: string[];
  suggestedJobs: { title: string; company: string; reason: string }[];
  suggestedCourses: { title: string; level: string; description: string }[];
  gapAnalysis: string;
  entrepreneurshipIdeas: string[];
}

export interface DreamerAnswers {
  dreamLocation: string;
  dreamEnvironment: string; 
  primaryMotivation: string; 
  preferredWorkStyle: string; 
}

export interface UnifiedDreamResult {
  roadmap: CvRoadmap;
  visionImageUrl: string;
}

export interface EuroOpportunity {
  title: string;
  location: string;
  company: string;
  languageRequirement: string;
  description: string;
  link: string;
  country: string;
  portalSource: string;
  visaType?: string;
}

export interface GermanOpportunity {
  title: string;
  location: string;
  company: string;
  languageLevel: string;
  description: string;
  link: string;
}

export interface EuroPortalMapping {
  country: string;
  portal: string;
  description: string;
  flag: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  duration: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: Lesson[];
  rating: number;
  enrolledCount: number;
}
