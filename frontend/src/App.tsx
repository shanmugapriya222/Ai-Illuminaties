import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Registration from './components/Registration';
import OnboardingQuiz from './components/OnboardingQuiz';
import Dashboard from './components/Dashboard';

export type UserRole = 'pre-university' | 'university' | 'job-seeker';
export type Screen = 'landing' | 'registration' | 'quiz' | 'dashboard';
export type UserType = 'student' | 'parent' | 'admin';

export interface QuizAnswers {
  interests: string;
  skills: string;
  goals: string;
  achievements: string[];
  extracurriculars: string[];
  dreamCareer: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  education: string;
  location: string;
  parentEmail?: string;
  achievements: string[];
  certifications: string[];
  wellbeingScore: number;
  createdAt: Date;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({
    interests: '',
    skills: '',
    goals: '',
    achievements: [],
    extracurriculars: [],
    dreamCareer: ''
  });

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setCurrentScreen('registration');
  };

  const handleRegistrationComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (answers: QuizAnswers) => {
    setQuizAnswers(answers);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('landing');
    setUserRole(null);
    setUserProfile(null);
    setQuizAnswers({ 
      interests: '', 
      skills: '', 
      goals: '', 
      achievements: [], 
      extracurriculars: [], 
      dreamCareer: '' 
    });
  };

  if (currentScreen === 'landing') {
    return <LandingPage onRoleSelect={handleRoleSelect} />;
  }

  if (currentScreen === 'registration' && userRole) {
    return (
      <Registration 
        role={userRole} 
        onComplete={handleRegistrationComplete}
        onBack={() => setCurrentScreen('landing')}
      />
    );
  }

  if (currentScreen === 'quiz' && userRole && userProfile) {
    return (
      <OnboardingQuiz 
        role={userRole} 
        profile={userProfile}
        onComplete={handleQuizComplete}
        onBack={() => setCurrentScreen('registration')}
      />
    );
  }

  if (currentScreen === 'dashboard' && userRole && userProfile) {
    return (
      <Dashboard 
        role={userRole} 
        profile={userProfile}
        quizAnswers={quizAnswers}
        onLogout={handleLogout}
      />
    );
  }

  return <LandingPage onRoleSelect={handleRoleSelect} />;
}