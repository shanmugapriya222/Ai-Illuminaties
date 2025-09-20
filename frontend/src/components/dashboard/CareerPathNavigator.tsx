import { UserRole, UserProfile } from '../../App';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  TrendingUp, 
  Target, 
  Award,
  ArrowRight,
  CheckCircle,
  Circle
} from 'lucide-react';

interface CareerPathNavigatorProps {
  role: UserRole;
  profile: UserProfile;
}

interface PathStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  duration?: string;
  icon: React.ReactNode;
}

export default function CareerPathNavigator({ role, profile }: CareerPathNavigatorProps) {
  const getCareerPaths = () => {
    switch (role) {
      case 'pre-university':
        return [
          {
            id: 'business',
            title: 'Business & Finance Path',
            description: 'From high school to CFO',
            steps: [
              {
                id: '1',
                title: 'B.Com Degree',
                description: 'Bachelor of Commerce with focus on Finance',
                status: 'upcoming' as const,
                duration: '3 years',
                icon: <GraduationCap className="w-6 h-6" />
              },
              {
                id: '2',
                title: 'Accounting Skills',
                description: 'Learn financial analysis and reporting',
                status: 'upcoming' as const,
                duration: '6 months',
                icon: <BookOpen className="w-6 h-6" />
              },
              {
                id: '3',
                title: 'Internship',
                description: 'Gain practical experience at financial firm',
                status: 'upcoming' as const,
                duration: '3 months',
                icon: <Briefcase className="w-6 h-6" />
              },
              {
                id: '4',
                title: 'Financial Analyst',
                description: 'Entry-level position in finance',
                status: 'upcoming' as const,
                duration: '2-3 years',
                icon: <TrendingUp className="w-6 h-6" />
              },
              {
                id: '5',
                title: 'Senior Analyst / CFO',
                description: 'Leadership role in financial management',
                status: 'upcoming' as const,
                duration: '5+ years',
                icon: <Award className="w-6 h-6" />
              }
            ]
          },
          {
            id: 'tech',
            title: 'Technology Path',
            description: 'From high school to AI Engineer',
            steps: [
              {
                id: '1',
                title: 'B.Tech CSE',
                description: 'Computer Science Engineering degree',
                status: 'upcoming' as const,
                duration: '4 years',
                icon: <GraduationCap className="w-6 h-6" />
              },
              {
                id: '2',
                title: 'Python & AI Skills',
                description: 'Programming and machine learning',
                status: 'upcoming' as const,
                duration: '1 year',
                icon: <BookOpen className="w-6 h-6" />
              },
              {
                id: '3',
                title: 'Tech Internship',
                description: 'Software development experience',
                status: 'upcoming' as const,
                duration: '3 months',
                icon: <Briefcase className="w-6 h-6" />
              },
              {
                id: '4',
                title: 'Data Scientist',
                description: 'Analyze data and build models',
                status: 'upcoming' as const,
                duration: '3-4 years',
                icon: <TrendingUp className="w-6 h-6" />
              },
              {
                id: '5',
                title: 'AI Engineer',
                description: 'Design AI systems and solutions',
                status: 'upcoming' as const,
                duration: '5+ years',
                icon: <Award className="w-6 h-6" />
              }
            ]
          }
        ];
      case 'university':
        return [
          {
            id: 'current',
            title: 'Your Current Path',
            description: 'Based on your current studies',
            steps: [
              {
                id: '1',
                title: 'Complete Degree',
                description: 'Finish your current program',
                status: 'current' as const,
                duration: '2 years left',
                icon: <GraduationCap className="w-6 h-6" />
              },
              {
                id: '2',
                title: 'Build Portfolio',
                description: 'Create projects and showcase skills',
                status: 'current' as const,
                duration: '6 months',
                icon: <Target className="w-6 h-6" />
              },
              {
                id: '3',
                title: 'Summer Internship',
                description: 'Gain industry experience',
                status: 'upcoming' as const,
                duration: '3 months',
                icon: <Briefcase className="w-6 h-6" />
              },
              {
                id: '4',
                title: 'Entry-Level Role',
                description: 'Start your professional career',
                status: 'upcoming' as const,
                duration: '2-3 years',
                icon: <TrendingUp className="w-6 h-6" />
              },
              {
                id: '5',
                title: 'Senior Position',
                description: 'Advance to leadership role',
                status: 'upcoming' as const,
                duration: '5+ years',
                icon: <Award className="w-6 h-6" />
              }
            ]
          }
        ];
      case 'job-seeker':
        return [
          {
            id: 'immediate',
            title: 'Immediate Opportunities',
            description: 'Ready to start now',
            steps: [
              {
                id: '1',
                title: 'Update Resume',
                description: 'Optimize for target roles',
                status: 'completed' as const,
                duration: 'Completed',
                icon: <CheckCircle className="w-6 h-6" />
              },
              {
                id: '2',
                title: 'Apply to Jobs',
                description: 'Submit applications to 5-10 companies',
                status: 'current' as const,
                duration: 'In progress',
                icon: <Briefcase className="w-6 h-6" />
              },
              {
                id: '3',
                title: 'Interview Prep',
                description: 'Practice technical and behavioral questions',
                status: 'current' as const,
                duration: '2 weeks',
                icon: <Target className="w-6 h-6" />
              },
              {
                id: '4',
                title: 'Land Role',
                description: 'Secure your next position',
                status: 'upcoming' as const,
                duration: '1-2 months',
                icon: <TrendingUp className="w-6 h-6" />
              },
              {
                id: '5',
                title: 'Excel & Grow',
                description: 'Succeed in your new role',
                status: 'upcoming' as const,
                duration: 'Ongoing',
                icon: <Award className="w-6 h-6" />
              }
            ]
          }
        ];
    }
  };

  const careerPaths = getCareerPaths();

  const getStatusIcon = (status: PathStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'current':
        return <Circle className="w-5 h-5 text-teal-600 fill-teal-600" />;
      case 'upcoming':
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: PathStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'current':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'upcoming':
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Career Path Navigator</h1>
        <p className="text-xl text-gray-600">Visualize your journey from where you are to where you want to be</p>
      </div>

      {/* Career Paths */}
      <div className="space-y-8">
        {careerPaths.map((path) => (
          <Card key={path.id} className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl text-gray-900 mb-1">{path.title}</h2>
                <p className="text-gray-600">{path.description}</p>
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                View Details
              </Button>
            </div>

            {/* Path Steps */}
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-300"></div>

              <div className="space-y-6">
                {path.steps.map((step, index) => (
                  <div key={step.id} className="relative flex items-start space-x-4">
                    {/* Status Indicator */}
                    <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-300 rounded-full">
                      {getStatusIcon(step.status)}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className={`p-4 border-2 rounded-lg ${getStatusColor(step.status)}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg">{step.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {step.duration}
                          </Badge>
                        </div>
                        <p className="text-sm">{step.description}</p>
                        
                        {/* Step Icon */}
                        <div className="mt-3 flex items-center space-x-2 text-sm opacity-75">
                          {step.icon}
                          <span>Step {index + 1}</span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    {index < path.steps.length - 1 && (
                      <div className="absolute left-6 top-16 z-10">
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Path Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  Customize Path
                </Button>
                <Button variant="outline" size="sm">
                  Download Roadmap
                </Button>
                <Button variant="outline" size="sm">
                  Share Path
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Alternative Paths */}
      <Card className="p-6">
        <h2 className="text-xl text-gray-900 mb-4">Explore Alternative Paths</h2>
        <p className="text-gray-600 mb-4">
          Consider these related career trajectories based on your interests and skills.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-auto p-4 flex-col space-y-2 text-left">
            <TrendingUp className="w-6 h-6 text-teal-600" />
            <span className="font-medium">Marketing Analytics</span>
            <span className="text-sm text-gray-500">Combine business and data skills</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col space-y-2 text-left">
            <Target className="w-6 h-6 text-blue-600" />
            <span className="font-medium">Product Management</span>
            <span className="text-sm text-gray-500">Lead product strategy and development</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col space-y-2 text-left">
            <Award className="w-6 h-6 text-purple-600" />
            <span className="font-medium">Consulting</span>
            <span className="text-sm text-gray-500">Solve complex business problems</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}