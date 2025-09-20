import { DashboardView } from './Dashboard';
import { Button } from './ui/button';
import { 
  Home, 
  TrendingUp, 
  Target, 
  Briefcase, 
  FileText, 
  MessageCircle,
  Users,
  Heart,
  Shield,
  Gamepad2,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  onChatbotToggle: () => void;
}

const navItems = [
  { id: 'home' as DashboardView, label: 'Dashboard', icon: Home },
  { id: 'careers' as DashboardView, label: 'Careers', icon: TrendingUp },
  { id: 'skills' as DashboardView, label: 'Skills', icon: Target },
  { id: 'opportunities' as DashboardView, label: 'Opportunities', icon: Briefcase },
  { id: 'interview-prep' as DashboardView, label: 'Interview Prep', icon: Users },
  { id: 'wellbeing' as DashboardView, label: 'Wellbeing', icon: Heart },
  { id: 'vault' as DashboardView, label: 'Document Vault', icon: Shield },
  { id: 'vr-experiences' as DashboardView, label: 'VR Experiences', icon: Gamepad2 },
  { id: 'reports' as DashboardView, label: 'Reports', icon: FileText },
  { id: 'admin' as DashboardView, label: 'Analytics', icon: BarChart3 },
];

export default function Sidebar({ currentView, onViewChange, onChatbotToggle }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900 text-white">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start space-x-3 h-11 ${
                isActive 
                  ? 'bg-teal-600 text-white hover:bg-teal-700' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Button>
          );
        })}
        
        {/* Chatbot Toggle */}
        <Button
          variant="ghost"
          className="w-full justify-start space-x-3 h-11 text-gray-300 hover:text-white hover:bg-gray-800"
          onClick={onChatbotToggle}
        >
          <MessageCircle className="w-5 h-5" />
          <span>AI Mentor</span>
        </Button>
      </nav>
    </div>
  );
}