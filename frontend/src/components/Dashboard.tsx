import { useState } from 'react';
import { UserRole, QuizAnswers, UserProfile } from '../App';
import Sidebar from './Sidebar';
import DashboardHome from './dashboard/DashboardHome';
import CareerPathNavigator from './dashboard/CareerPathNavigator';
import SkillGapAnalyzer from './dashboard/SkillGapAnalyzer';
import OpportunitiesHub from './dashboard/OpportunitiesHub';
import ReportsPage from './dashboard/ReportsPage';
import InterviewPrep from './dashboard/InterviewPrep';
import WellbeingAssessment from './dashboard/WellbeingAssessment';
import DocumentVault from './dashboard/DocumentVault';
import VRExperiences from './dashboard/VRExperiences';
import AdminDashboard from './dashboard/AdminDashboard';
import Chatbot from './Chatbot';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { LogOut } from 'lucide-react';

export type DashboardView = 'home' | 'careers' | 'skills' | 'opportunities' | 'reports' | 'chatbot' | 'interview-prep' | 'wellbeing' | 'vault' | 'vr-experiences' | 'admin';

interface DashboardProps {
  role: UserRole;
  profile: UserProfile;
  quizAnswers: QuizAnswers;
  onLogout: () => void;
}

export default function Dashboard({ role, profile, quizAnswers, onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<DashboardView>('home');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const getRoleTitle = () => {
    switch (role) {
      case 'pre-university':
        return 'Pre-University Student';
      case 'university':
        return 'University Student';
      case 'job-seeker':
        return 'Job Seeker';
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <DashboardHome role={role} profile={profile} quizAnswers={quizAnswers} />;
      case 'careers':
        return <CareerPathNavigator role={role} profile={profile} />;
      case 'skills':
        return <SkillGapAnalyzer role={role} profile={profile} />;
      case 'opportunities':
        return <OpportunitiesHub role={role} profile={profile} />;
      case 'reports':
        return <ReportsPage role={role} profile={profile} quizAnswers={quizAnswers} />;
      case 'interview-prep':
        return <InterviewPrep role={role} profile={profile} />;
      case 'wellbeing':
        return <WellbeingAssessment role={role} profile={profile} />;
      case 'vault':
        return <DocumentVault role={role} profile={profile} />;
      case 'vr-experiences':
        return <VRExperiences role={role} profile={profile} />;
      case 'admin':
        return <AdminDashboard />;
      case 'chatbot':
        return <div className="p-8"><h2 className="text-2xl text-gray-900">AI Mentor Chat</h2><p className="text-gray-600 mt-2">Use the chat panel on the right to interact with your AI mentor.</p></div>;
      default:
        return <DashboardHome role={role} profile={profile} quizAnswers={quizAnswers} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        onChatbotToggle={() => setIsChatbotOpen(!isChatbotOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">C</span>
                </div>
                <span className="text-xl text-gray-900">CareerPath AI</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-teal-100 text-teal-800 border-teal-200">
                {getRoleTitle()}
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 flex">
          <div className={`flex-1 ${isChatbotOpen ? 'mr-80' : ''} transition-all duration-300`}>
            {renderContent()}
          </div>
          
          {/* Chatbot Panel */}
          {isChatbotOpen && (
            <div className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-50">
              <Chatbot onClose={() => setIsChatbotOpen(false)} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}