
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  updateDoc,
  arrayUnion,
  Timestamp,
  addDoc,
  deleteDoc
} from "firebase/firestore";
import { CvRoadmap } from "../types";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase only if API key is present
const isFirebaseConfigured = !!firebaseConfig.apiKey;
const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
const firebaseAuth = app ? getAuth(app) : null;
const firestore = app ? getFirestore(app) : null;

// Mock Authentication State (Fallback)
const AUTH_KEY = 'j4d_auth_user';
const ROADMAPS_KEY = 'j4d_roadmaps';

export interface MockUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  bio?: string;
  skills?: string[];
  enrolledCourses?: string[];
  completedLessons?: string[];
  createdAt: any;
}

class MockAuth {
  private listeners: ((user: MockUser | null) => void)[] = [];
  private currentUser: MockUser | null = null;

  constructor() {
    if (!isFirebaseConfigured) {
      const saved = localStorage.getItem(AUTH_KEY);
      if (saved) this.currentUser = JSON.parse(saved);
    } else if (firebaseAuth) {
      onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          const mappedUser: MockUser = {
            uid: user.uid,
            displayName: user.displayName || 'User',
            email: user.email || '',
            photoURL: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
          };
          this.currentUser = mappedUser;
          
          // Ensure user profile exists in Firestore
          if (firestore) {
            const userRef = doc(firestore, 'users', user.uid);
            const userSnap = await getDoc(userRef);
            if (!userSnap.exists()) {
              await setDoc(userRef, {
                ...mappedUser,
                createdAt: Timestamp.now(),
                enrolledCourses: [],
                completedLessons: [],
                skills: []
              });
            }
          }
          
          this.notify();
        } else {
          this.currentUser = null;
          this.notify();
        }
      });
    }
  }

  onAuthStateChanged(callback: (user: MockUser | null) => void) {
    this.listeners.push(callback);
    callback(this.currentUser);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  async signInWithGoogle() {
    if (isFirebaseConfigured && firebaseAuth) {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;
      const mappedUser: MockUser = {
        uid: user.uid,
        displayName: user.displayName || 'User',
        email: user.email || '',
        photoURL: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
      };
      this.currentUser = mappedUser;
      this.notify();
      return { user: mappedUser };
    }

    // Simulate Google Login (Mock)
    const mockUser: MockUser = {
      uid: 'mock_user_123',
      displayName: 'DAE Student',
      email: 'student@example.com',
      photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    };
    this.currentUser = mockUser;
    localStorage.setItem(AUTH_KEY, JSON.stringify(mockUser));
    this.notify();
    return { user: mockUser };
  }

  async signUpWithEmail(email: string, pass: string, name: string) {
    if (isFirebaseConfigured && firebaseAuth) {
      const result = await createUserWithEmailAndPassword(firebaseAuth, email, pass);
      await updateProfile(result.user, { displayName: name });
      const user = result.user;
      const mappedUser: MockUser = {
        uid: user.uid,
        displayName: name,
        email: user.email || '',
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
      };
      this.currentUser = mappedUser;
      this.notify();
      return { user: mappedUser };
    }
    
    // Mock Signup
    const mockUser: MockUser = {
      uid: 'mock_' + Date.now(),
      displayName: name,
      email: email,
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    };
    this.currentUser = mockUser;
    localStorage.setItem(AUTH_KEY, JSON.stringify(mockUser));
    this.notify();
    return { user: mockUser };
  }

  async signInWithEmail(email: string, pass: string) {
    if (isFirebaseConfigured && firebaseAuth) {
      const result = await signInWithEmailAndPassword(firebaseAuth, email, pass);
      const user = result.user;
      const mappedUser: MockUser = {
        uid: user.uid,
        displayName: user.displayName || 'User',
        email: user.email || '',
        photoURL: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
      };
      this.currentUser = mappedUser;
      this.notify();
      return { user: mappedUser };
    }

    // Mock Login
    const mockUser: MockUser = {
      uid: 'mock_user_123',
      displayName: 'DAE Student',
      email: email,
      photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    };
    this.currentUser = mockUser;
    localStorage.setItem(AUTH_KEY, JSON.stringify(mockUser));
    this.notify();
    return { user: mockUser };
  }

  async signOut() {
    if (isFirebaseConfigured && firebaseAuth) {
      await signOut(firebaseAuth);
    }
    this.currentUser = null;
    localStorage.removeItem(AUTH_KEY);
    this.notify();
  }

  private notify() {
    this.listeners.forEach(l => l(this.currentUser));
  }

  get user() { return this.currentUser; }
}

export const auth = new MockAuth();

export const loginWithGoogle = () => auth.signInWithGoogle();
export const loginWithEmail = (email: string, pass: string) => auth.signInWithEmail(email, pass);
export const signUpWithEmail = (email: string, pass: string, name: string) => auth.signUpWithEmail(email, pass, name);
export const logout = () => auth.signOut();

// Database Operations
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  if (isFirebaseConfigured && firestore) {
    const userRef = doc(firestore, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? (userSnap.data() as UserProfile) : null;
  }
  
  // Mock
  const saved = localStorage.getItem(AUTH_KEY);
  if (saved) {
    const user = JSON.parse(saved);
    if (user.uid === uid) {
      return {
        ...user,
        createdAt: new Date(),
        enrolledCourses: user.enrolledCourses || [],
        completedLessons: user.completedLessons || [],
        skills: user.skills || []
      } as UserProfile;
    }
  }
  return null;
};

export const saveRoadmap = async (userId: string, roadmap: CvRoadmap) => {
  if (isFirebaseConfigured && firestore) {
    const roadmapRef = collection(firestore, 'roadmaps');
    const docRef = await addDoc(roadmapRef, {
      ...roadmap,
      userId,
      createdAt: Timestamp.now()
    });
    return { ...roadmap, id: docRef.id };
  }

  // Mock
  const existing = localStorage.getItem(ROADMAPS_KEY);
  const roadmaps = existing ? JSON.parse(existing) : [];
  
  const newEntry = {
    ...roadmap,
    id: 'rm_' + Date.now(),
    userId,
    createdAt: { 
      toDate: () => new Date(),
      toLocaleDateString: () => new Date().toLocaleDateString()
    }
  };
  
  roadmaps.push(newEntry);
  localStorage.setItem(ROADMAPS_KEY, JSON.stringify(roadmaps));
  return newEntry;
};

export const getUserRoadmaps = async (userId: string) => {
  if (isFirebaseConfigured && firestore) {
    const q = query(collection(firestore, 'roadmaps'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      createdAt: {
        toDate: () => (doc.data().createdAt as Timestamp).toDate(),
        toLocaleDateString: () => (doc.data().createdAt as Timestamp).toDate().toLocaleDateString()
      }
    } as any));
  }

  // Mock
  const existing = localStorage.getItem(ROADMAPS_KEY);
  if (!existing) return [];
  const roadmaps = JSON.parse(existing);
  return roadmaps
    .filter((rm: any) => rm.userId === userId)
    .map((rm: any) => ({
      ...rm,
      createdAt: {
        toDate: () => new Date(rm.createdAt || Date.now()),
        toLocaleDateString: () => new Date(rm.createdAt || Date.now()).toLocaleDateString()
      }
    }))
    .sort((a: any, b: any) => b.id.localeCompare(a.id));
};

export const updateRoadmap = async (id: string, data: any) => {
  if (isFirebaseConfigured && firestore) {
    const roadmapRef = doc(firestore, 'roadmaps', id);
    await updateDoc(roadmapRef, data);
    return;
  }

  const existing = localStorage.getItem(ROADMAPS_KEY);
  if (!existing) return;
  const roadmaps = JSON.parse(existing);
  const index = roadmaps.findIndex((rm: any) => rm.id === id);
  if (index !== -1) {
    roadmaps[index] = { ...roadmaps[index], ...data };
    localStorage.setItem(ROADMAPS_KEY, JSON.stringify(roadmaps));
  }
};

export const deleteRoadmap = async (id: string) => {
  if (isFirebaseConfigured && firestore) {
    const roadmapRef = doc(firestore, 'roadmaps', id);
    await deleteDoc(roadmapRef);
    return;
  }

  const existing = localStorage.getItem(ROADMAPS_KEY);
  if (!existing) return;
  const roadmaps = JSON.parse(existing);
  const filtered = roadmaps.filter((rm: any) => rm.id !== id);
  localStorage.setItem(ROADMAPS_KEY, JSON.stringify(filtered));
};

import { Course, Lesson } from "../types";

// ... existing code ...

// Course Data & Operations
const COURSES_KEY = 'j4d_courses';

const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Advanced PLC Programming with AI',
    description: 'Master industrial automation using Siemens S7-1200 and learn how to use Generative AI for ladder logic optimization and troubleshooting.',
    instructor: 'Engr. Ahmed Raza',
    category: 'Automation',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
    level: 'Advanced',
    rating: 4.9,
    enrolledCount: 1240,
    lessons: [
      { id: 'l1', title: 'Introduction to PLC & AI', content: 'In this lesson, we explore the intersection of traditional automation and modern AI.', duration: '15:00', order: 1, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 'l2', title: 'Setting up TIA Portal', content: 'Step by step guide to installing and configuring your development environment.', duration: '25:00', order: 2, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 'l3', title: 'AI-Powered Ladder Logic', content: 'Using LLMs to generate efficient ladder logic for complex industrial sequences.', duration: '45:00', order: 3, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ]
  },
  {
    id: 'c2',
    title: 'Solar PV System Design & AI',
    description: 'Learn to design grid-tied and off-grid solar systems using PVSyst and AI-driven site analysis tools.',
    instructor: 'Dr. Sarah Khan',
    category: 'Renewable Energy',
    thumbnail: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
    level: 'Intermediate',
    rating: 4.7,
    enrolledCount: 850,
    lessons: [
      { id: 'l4', title: 'Solar Fundamentals', content: 'Understanding irradiance, azimuth, and tilt angles.', duration: '20:00', order: 1, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 'l5', title: 'AI Site Assessment', content: 'Using satellite data and AI to predict shading and energy yield.', duration: '30:00', order: 2, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ]
  },
  {
    id: 'c3',
    title: 'Prompt Engineering for Technicians',
    description: 'A specialized course for DAE students to master AI tools for technical report writing and job applications.',
    instructor: 'Prof. Junaid',
    category: 'Soft Skills',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    level: 'Beginner',
    rating: 4.8,
    enrolledCount: 2100,
    lessons: [
      { id: 'l6', title: 'The Art of the Prompt', content: 'How to talk to AI to get technical answers.', duration: '10:00', order: 1, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ]
  }
];

export const getCourses = async (): Promise<Course[]> => {
  if (isFirebaseConfigured && firestore) {
    const querySnapshot = await getDocs(collection(firestore, 'courses'));
    if (!querySnapshot.empty) {
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
    }
  }
  return MOCK_COURSES;
};

export const getCourseById = async (id: string): Promise<Course | null> => {
  if (isFirebaseConfigured && firestore) {
    const docRef = doc(firestore, 'courses', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() } as Course;
  }
  return MOCK_COURSES.find(c => c.id === id) || null;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  if (isFirebaseConfigured && firestore) {
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, {
      enrolledCourses: arrayUnion(courseId)
    });
    return;
  }

  // Mock
  const saved = localStorage.getItem(AUTH_KEY);
  if (saved) {
    const user = JSON.parse(saved);
    if (user.uid === userId) {
      const enrolled = user.enrolledCourses || [];
      if (!enrolled.includes(courseId)) {
        enrolled.push(courseId);
        user.enrolledCourses = enrolled;
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      }
    }
  }
};

export const completeLesson = async (userId: string, lessonId: string) => {
  if (isFirebaseConfigured && firestore) {
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, {
      completedLessons: arrayUnion(lessonId)
    });
    return;
  }

  // Mock
  const saved = localStorage.getItem(AUTH_KEY);
  if (saved) {
    const user = JSON.parse(saved);
    if (user.uid === userId) {
      const completed = user.completedLessons || [];
      if (!completed.includes(lessonId)) {
        completed.push(lessonId);
        user.completedLessons = completed;
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      }
    }
  }
};
