import { UserRole, QuizAnswers, UserProfile } from '../../App';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  Target, 
  TrendingUp,
  Award,
  Clock,
  DollarSign,
  FileText
} from 'lucide-react';

interface DashboardHomeProps {
  role: UserRole;
  profile: UserProfile;
  quizAnswers: QuizAnswers;
}

export default function DashboardHome({ role, profile, quizAnswers }: DashboardHomeProps) {
  const getWelcomeMessage = () => {
    switch (role) {
      case 'pre-university':
        return 'Explore degree options and plan your academic future';
      case 'university':
        return 'Build skills and find internships for career readiness';
      case 'job-seeker':
        return 'Discover opportunities and advance your career';
    }
  };

  const getRecommendedContent = () => {
    switch (role) {
      case 'pre-university':
        return {
          title: 'Recommended Degrees',
          items: [
            { name: 'B.Sc Computer Science', description: 'Perfect for technology enthusiasts', icon: <GraduationCap className="w-6 h-6 text-teal-600" /> },
            { name: 'B.Com Accounting', description: 'Great for business-minded students', icon: <DollarSign className="w-6 h-6 text-teal-600" /> },
            { name: 'B.Tech Mechanical Engineering', description: 'Ideal for problem solvers', icon: <Target className="w-6 h-6 text-teal-600" /> }
          ]
        };
      case 'university':
        return {
          title: 'Skill Development',
          items: [
            { name: 'Python Programming', description: '40% complete', icon: <BookOpen className="w-6 h-6 text-teal-600" />, progress: 40 },
            { name: 'Data Analysis', description: '60% complete', icon: <TrendingUp className="w-6 h-6 text-teal-600" />, progress: 60 },
            { name: 'Communication', description: '80% complete', icon: <Target className="w-6 h-6 text-teal-600" />, progress: 80 }
          ]
        };
      case 'job-seeker':
        return {
          title: 'Job Opportunities',
          items: [
            { name: 'Financial Analyst', description: 'ABC Corp - $65,000/year', icon: <Briefcase className="w-6 h-6 text-teal-600" /> },
            { name: 'Data Scientist', description: 'Tech Solutions - $75,000/year', icon: <TrendingUp className="w-6 h-6 text-teal-600" /> },
            { name: 'Project Manager', description: 'Innovation Inc - $70,000/year', icon: <Target className="w-6 h-6 text-teal-600" /> }
          ]
        };
    }
  };

  const getSecondaryContent = () => {
    switch (role) {
      case 'pre-university':
        return {
          title: 'Available Scholarships',
          items: [
            { name: 'Future Leaders Scholarship', description: '$2,000 - Deadline: Dec 31', badge: 'New' },
            { name: 'Tech Innovators Grant', description: '$1,500 - Deadline: Jan 15', badge: 'Popular' },
            { name: 'Academic Excellence Award', description: '$3,000 - Deadline: Feb 28', badge: 'High Value' }
          ]
        };
      case 'university':
        return {
          title: 'Internship Opportunities',
          items: [
            { name: 'Software Developer Intern', description: 'XYZ Corp - Summer 2024', badge: 'Remote' },
            { name: 'Marketing Intern', description: 'ABC Ltd - 3 months', badge: 'Paid' },
            { name: 'Data Analytics Intern', description: 'Tech Solutions - Part-time', badge: 'Flexible' }
          ]
        };
      case 'job-seeker':
        return {
          title: 'Certifications',
          items: [
            { name: 'Google Data Analytics', description: 'In Progress', badge: 'Active', progress: 65 },
            { name: 'AWS Cloud Practitioner', description: 'Completed', badge: 'Certified', progress: 100 },
            { name: 'Project Management Professional', description: 'Not Started', badge: 'Recommended', progress: 0 }
          ]
        };
    }
  };

  const recommendedContent = getRecommendedContent();
  const secondaryContent = getSecondaryContent();

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Welcome Back, {profile.name.split(' ')[0]}!</h1>
        <p className="text-xl text-gray-600">{getWelcomeMessage()}</p>
        <div className="flex items-center space-x-4 mt-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Wellbeing Score:</span>
            <span className="text-teal-600 font-medium">{profile.wellbeingScore}/100</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Achievements:</span>
            <span className="text-purple-600 font-medium">{profile.achievements.length}</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">12</p>
              <p className="text-sm text-gray-600">Recommendations</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">68%</p>
              <p className="text-sm text-gray-600">Profile Completion</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">5</p>
              <p className="text-sm text-gray-600">Skills Mastered</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Primary Recommendations */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-gray-900">{recommendedContent.title}</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recommendedContent.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                {item.icon}
                <div className="flex-1">
                  <p className="text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  {'progress' in item && (
                    <Progress value={item.progress} className="mt-2 h-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Secondary Content */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-gray-900">{secondaryContent.title}</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {secondaryContent.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Clock className="w-6 h-6 text-gray-400" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-gray-900">{item.name}</p>
                    <Badge variant="secondary" className="text-xs">{item.badge}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  {'progress' in item && item.progress !== undefined && (
                    <Progress value={item.progress} className="mt-2 h-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white h-auto p-4 flex-col space-y-2">
            <TrendingUp className="w-6 h-6" />
            <span>View Career Paths</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
            <Target className="w-6 h-6" />
            <span>Analyze Skills</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
            <Briefcase className="w-6 h-6" />
            <span>Find Opportunities</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
            <FileText className="w-6 h-6" />
            <span>Generate Report</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}