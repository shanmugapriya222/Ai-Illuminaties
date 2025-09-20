import { useState } from 'react';
import { UserRole, UserProfile } from '../../App';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Gamepad2, 
  Play, 
  Star, 
  Clock, 
  Users, 
  Award,
  Lightbulb,
  TrendingUp,
  Building,
  Briefcase,
  Laptop,
  Stethoscope,
  Gavel,
  Camera,
  Cpu,
  DollarSign
} from 'lucide-react';

interface VRExperiencesProps {
  role: UserRole;
  profile: UserProfile;
}

interface VRExperience {
  id: string;
  title: string;
  category: 'career-simulation' | 'workplace-tour' | 'interview-practice' | 'entrepreneurship';
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  completedBy: number;
  industry: string;
  skills: string[];
  completed: boolean;
  progress?: number;
  preview: string;
}

interface EntrepreneurshipModule {
  id: string;
  title: string;
  description: string;
  modules: string[];
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
}

export default function VRExperiences({ role, profile }: VRExperiencesProps) {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const getVRExperiences = (): VRExperience[] => {
    return [
      {
        id: '1',
        title: 'Software Developer Office Tour',
        category: 'workplace-tour',
        description: 'Experience a day in the life at a leading tech company. Explore modern offices, meet teams, and understand the development workflow.',
        duration: 15,
        difficulty: 'beginner',
        rating: 4.8,
        completedBy: 1250,
        industry: 'Technology',
        skills: ['Workplace Culture', 'Team Collaboration', 'Agile Development'],
        completed: false,
        preview: '/api/vr-previews/tech-office.jpg'
      },
      {
        id: '2',
        title: 'Mock Job Interview Simulation',
        category: 'interview-practice',
        description: 'Practice your interview skills in a realistic virtual environment with AI-powered feedback and common interview scenarios.',
        duration: 30,
        difficulty: 'intermediate',
        rating: 4.6,
        completedBy: 980,
        industry: 'General',
        skills: ['Interview Skills', 'Communication', 'Confidence Building'],
        completed: true,
        progress: 100,
        preview: '/api/vr-previews/interview.jpg'
      },
      {
        id: '3',
        title: 'Financial Analyst Day-in-the-Life',
        category: 'career-simulation',
        description: 'Step into the shoes of a financial analyst. Analyze market data, prepare reports, and present findings to senior management.',
        duration: 45,
        difficulty: 'advanced',
        rating: 4.7,
        completedBy: 750,
        industry: 'Finance',
        skills: ['Financial Analysis', 'Data Interpretation', 'Presentation Skills'],
        completed: false,
        preview: '/api/vr-previews/finance.jpg'
      },
      {
        id: '4',
        title: 'Hospital Emergency Room Experience',
        category: 'career-simulation',
        description: 'Observe healthcare professionals in action. Learn about medical procedures, patient care, and healthcare teamwork.',
        duration: 25,
        difficulty: 'intermediate',
        rating: 4.9,
        completedBy: 650,
        industry: 'Healthcare',
        skills: ['Medical Knowledge', 'Crisis Management', 'Patient Care'],
        completed: false,
        preview: '/api/vr-previews/hospital.jpg'
      },
      {
        id: '5',
        title: 'Startup Pitch Competition',
        category: 'entrepreneurship',
        description: 'Present your business idea to virtual investors. Get feedback on your pitch, business model, and presentation skills.',
        duration: 35,
        difficulty: 'advanced',
        rating: 4.5,
        completedBy: 420,
        industry: 'Entrepreneurship',
        skills: ['Pitching', 'Business Planning', 'Public Speaking'],
        completed: false,
        preview: '/api/vr-previews/startup.jpg'
      },
      {
        id: '6',
        title: 'Architecture Studio Walkthrough',
        category: 'workplace-tour',
        description: 'Explore an architectural firm, see how buildings are designed, and understand the creative process from concept to construction.',
        duration: 20,
        difficulty: 'beginner',
        rating: 4.4,
        completedBy: 580,
        industry: 'Architecture',
        skills: ['Design Thinking', 'Spatial Visualization', 'Creative Process'],
        completed: false,
        preview: '/api/vr-previews/architecture.jpg'
      }
    ];
  };

  const getEntrepreneurshipModules = (): EntrepreneurshipModule[] => {
    return [
      {
        id: '1',
        title: 'Business Idea Validation',
        description: 'Learn how to validate your business ideas through market research, customer interviews, and MVP development.',
        modules: ['Market Research', 'Customer Discovery', 'MVP Creation', 'Feedback Analysis'],
        duration: '2 weeks',
        difficulty: 'beginner',
        completed: false
      },
      {
        id: '2',
        title: 'Creating a Business Plan',
        description: 'Master the art of business planning, financial projections, and strategic thinking for your startup.',
        modules: ['Executive Summary', 'Market Analysis', 'Financial Projections', 'Marketing Strategy'],
        duration: '3 weeks',
        difficulty: 'intermediate',
        completed: true
      },
      {
        id: '3',
        title: 'Funding and Investment',
        description: 'Understand different funding options, how to approach investors, and what they look for in startups.',
        modules: ['Funding Types', 'Investor Pitch', 'Valuation', 'Term Sheets'],
        duration: '2 weeks',
        difficulty: 'advanced',
        completed: false
      },
      {
        id: '4',
        title: 'Building and Leading Teams',
        description: 'Learn how to recruit, manage, and motivate teams as your startup grows.',
        modules: ['Hiring Strategy', 'Team Culture', 'Leadership Skills', 'Performance Management'],
        duration: '3 weeks',
        difficulty: 'intermediate',
        completed: false
      }
    ];
  };

  const vrExperiences = getVRExperiences();
  const entrepreneurshipModules = getEntrepreneurshipModules();

  const filteredExperiences = vrExperiences.filter(exp => 
    activeFilter === 'all' || exp.category === activeFilter
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'career-simulation':
        return <Briefcase className="w-5 h-5 text-purple-600" />;
      case 'workplace-tour':
        return <Building className="w-5 h-5 text-blue-600" />;
      case 'interview-practice':
        return <Users className="w-5 h-5 text-green-600" />;
      case 'entrepreneurship':
        return <Lightbulb className="w-5 h-5 text-orange-600" />;
      default:
        return <Gamepad2 className="w-5 h-5 text-gray-600" />;
    }
  };

  const getIndustryIcon = (industry: string) => {
    switch (industry.toLowerCase()) {
      case 'technology':
        return <Laptop className="w-4 h-4" />;
      case 'healthcare':
        return <Stethoscope className="w-4 h-4" />;
      case 'finance':
        return <DollarSign className="w-4 h-4" />;
      case 'architecture':
        return <Building className="w-4 h-4" />;
      case 'entrepreneurship':
        return <Lightbulb className="w-4 h-4" />;
      default:
        return <Briefcase className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const startExperience = (experienceId: string) => {
    setSelectedExperience(experienceId);
    // In a real app, this would launch the VR experience
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">VR Career Experiences</h1>
        <p className="text-xl text-gray-600">
          Immerse yourself in different careers and workplaces through virtual reality
        </p>
      </div>

      <Tabs defaultValue="vr-experiences" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vr-experiences">VR Experiences</TabsTrigger>
          <TabsTrigger value="entrepreneurship">Entrepreneurship</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="vr-experiences" className="space-y-6">
          {/* VR Requirements Notice */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <Gamepad2 className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-blue-900 mb-2">VR Experience Requirements</h3>
                <p className="text-sm text-blue-800">
                  These experiences work best with VR headsets (Oculus, HTC Vive, etc.) but can also be viewed 
                  in 360° mode on desktop and mobile devices. VR headset rental available at participating career centers.
                </p>
              </div>
            </div>
          </Card>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('all')}
              size="sm"
            >
              All Experiences
            </Button>
            <Button
              variant={activeFilter === 'career-simulation' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('career-simulation')}
              size="sm"
              className="flex items-center space-x-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Career Simulations</span>
            </Button>
            <Button
              variant={activeFilter === 'workplace-tour' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('workplace-tour')}
              size="sm"
              className="flex items-center space-x-2"
            >
              <Building className="w-4 h-4" />
              <span>Workplace Tours</span>
            </Button>
            <Button
              variant={activeFilter === 'interview-practice' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('interview-practice')}
              size="sm"
              className="flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Interview Practice</span>
            </Button>
            <Button
              variant={activeFilter === 'entrepreneurship' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('entrepreneurship')}
              size="sm"
              className="flex items-center space-x-2"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Entrepreneurship</span>
            </Button>
          </div>

          {/* VR Experiences Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((experience) => (
              <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Preview Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center">
                    {getCategoryIcon(experience.category)}
                    <p className="text-sm text-gray-600 mt-2">VR Preview</p>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg text-gray-900 leading-tight">{experience.title}</h3>
                    {experience.completed && (
                      <Award className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">{experience.description}</p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{experience.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{experience.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{experience.completedBy}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getIndustryIcon(experience.industry)}
                      <span className="text-sm text-gray-600">{experience.industry}</span>
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(experience.difficulty)}>
                      {experience.difficulty}
                    </Badge>
                  </div>

                  {experience.progress && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-900">{experience.progress}%</span>
                      </div>
                      <Progress value={experience.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {experience.skills.slice(0, 2).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {experience.skills.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{experience.skills.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <Button 
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white flex items-center space-x-2"
                    onClick={() => startExperience(experience.id)}
                  >
                    <Play className="w-4 h-4" />
                    <span>{experience.completed ? 'Experience Again' : 'Start Experience'}</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="entrepreneurship" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl text-gray-900">Entrepreneurship Pathway</h2>
                <p className="text-gray-600">Learn how to start and grow your own business</p>
              </div>
            </div>

            <div className="grid gap-4">
              {entrepreneurshipModules.map((module) => (
                <Card key={module.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        module.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {module.completed ? (
                          <Award className="w-4 h-4 text-green-600" />
                        ) : (
                          <Lightbulb className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getDifficultyColor(module.difficulty)}>
                        {module.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-500">{module.duration}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm text-gray-700 mb-2">Modules:</h4>
                    <div className="flex flex-wrap gap-1">
                      {module.modules.map((subModule, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {subModule}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant={module.completed ? 'outline' : 'default'}
                    className={module.completed ? '' : 'bg-orange-600 hover:bg-orange-700 text-white'}
                  >
                    {module.completed ? 'Review Module' : 'Start Module'}
                  </Button>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Startup Resources</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Building className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="text-blue-900 mb-1">Incubators & Accelerators</h4>
                <p className="text-sm text-blue-800">Find startup programs in your area</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="text-green-900 mb-1">Funding Sources</h4>
                <p className="text-sm text-green-800">Explore grants, loans, and investment options</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <Users className="w-6 h-6 text-purple-600 mb-2" />
                <h4 className="text-purple-900 mb-1">Networking Events</h4>
                <p className="text-sm text-purple-800">Connect with other entrepreneurs</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-2xl text-gray-900">
                {vrExperiences.filter(exp => exp.completed).length}
              </p>
              <p className="text-sm text-gray-600">VR Experiences Completed</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-2xl text-gray-900">
                {vrExperiences.filter(exp => exp.completed).reduce((total, exp) => total + exp.duration, 0)}
              </p>
              <p className="text-sm text-gray-600">Minutes in VR</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-2xl text-gray-900">
                {entrepreneurshipModules.filter(mod => mod.completed).length}
              </p>
              <p className="text-sm text-gray-600">Entrepreneurship Modules</p>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-xl text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">Completed Mock Job Interview Simulation</p>
                  <p className="text-sm text-gray-600">2 days ago • 30 minutes</p>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Completed
                </Badge>
              </div>

              <div className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">Started Financial Analyst Day-in-the-Life</p>
                  <p className="text-sm text-gray-600">5 days ago • 15 minutes completed</p>
                </div>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                  In Progress
                </Badge>
              </div>

              <div className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">Completed Creating a Business Plan module</p>
                  <p className="text-sm text-gray-600">1 week ago • Entrepreneurship pathway</p>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Completed
                </Badge>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}