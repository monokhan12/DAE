
import { 
  auth as firebaseAuth, 
  db as firestore, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
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
  deleteDoc,
  handleFirestoreError,
  OperationType
} from "../firebase";
import { CvRoadmap } from "../types";

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
        const userRef = doc(firestore, 'users', user.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            await setDoc(userRef, {
              ...mappedUser,
              role: 'student',
              createdAt: Timestamp.now(),
              enrolledCourses: [],
              completedLessons: [],
              skills: []
            });
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
        }
        
        this.notify();
      } else {
        this.currentUser = null;
        this.notify();
      }
    });
  }

  onAuthStateChanged(callback: (user: MockUser | null) => void) {
    this.listeners.push(callback);
    callback(this.currentUser);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
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
    } catch (error) {
      console.error('Google Sign In Error:', error);
      throw error;
    }
  }

  async signUpWithEmail(email: string, pass: string, name: string) {
    try {
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
    } catch (error) {
      console.error('Email Sign Up Error:', error);
      throw error;
    }
  }

  async signInWithEmail(email: string, pass: string) {
    try {
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
    } catch (error) {
      console.error('Email Sign In Error:', error);
      throw error;
    }
  }

  async signOut() {
    await signOut(firebaseAuth);
    this.currentUser = null;
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
  try {
    const userRef = doc(firestore, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? (userSnap.data() as UserProfile) : null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `users/${uid}`);
    return null;
  }
};

export const saveRoadmap = async (userId: string, roadmap: CvRoadmap) => {
  try {
    const roadmapRef = collection(firestore, 'roadmaps');
    const docRef = await addDoc(roadmapRef, {
      ...roadmap,
      userId,
      createdAt: Timestamp.now()
    });
    return { ...roadmap, id: docRef.id };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'roadmaps');
    return null;
  }
};

export const getUserRoadmaps = async (userId: string) => {
  try {
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
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'roadmaps');
    return [];
  }
};

export const updateRoadmap = async (id: string, data: any) => {
  try {
    const roadmapRef = doc(firestore, 'roadmaps', id);
    await updateDoc(roadmapRef, data);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `roadmaps/${id}`);
  }
};

export const deleteRoadmap = async (id: string) => {
  try {
    const roadmapRef = doc(firestore, 'roadmaps', id);
    await deleteDoc(roadmapRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `roadmaps/${id}`);
  }
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
  try {
    const querySnapshot = await getDocs(collection(firestore, 'courses'));
    if (!querySnapshot.empty) {
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'courses');
  }
  return MOCK_COURSES;
};

export const getCourseById = async (id: string): Promise<Course | null> => {
  try {
    const docRef = doc(firestore, 'courses', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() } as Course;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `courses/${id}`);
  }
  return MOCK_COURSES.find(c => c.id === id) || null;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, {
      enrolledCourses: arrayUnion(courseId)
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${userId}`);
  }
};

export const completeLesson = async (userId: string, lessonId: string) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, {
      completedLessons: arrayUnion(lessonId)
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${userId}`);
  }
};
