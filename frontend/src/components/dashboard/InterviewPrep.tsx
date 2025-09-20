import { useState } from 'react';
import { UserRole, UserProfile } from '../../App';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Clock, 
  Star,
  Mic,
  Video,
  FileText,
  TrendingUp,
  Target
} from 'lucide-react';

interface InterviewPrepProps {
  role: UserRole;
  profile: UserProfile;
}

interface MockInterview {
  id: string;
  type: 'behavioral' | 'technical' | 'case-study';
  title: string;
  duration: number;
  questions: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
}

interface ResumeTemplate {
  id: string;
  name: string;
  industry: string;
  description: string;
  preview: string;
}

export default function InterviewPrep({ role, profile }: InterviewPrepProps) {
  const [activeInterview, setActiveInterview] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const getMockInterviews = (): MockInterview[] => {
    const baseInterviews: MockInterview[] = [
      {
        id: '1',
        type: 'behavioral',
        title: 'Common Behavioral Questions',
        duration: 30,
        questions: [
          'Tell me about yourself and your career goals.',
          'Describe a time when you faced a challenge and how you overcame it.',
          'What are your greatest strengths and weaknesses?',
          'Why are you interested in this field/role?',
          'Where do you see yourself in 5 years?'
        ],
        difficulty: 'beginner',
        completed: false
      },
      {
        id: '2',
        type: 'technical',
        title: 'Technical Skills Assessment',
        duration: 45,
        questions: [
          'Walk me through your technical background and experience.',
          'Explain a complex technical concept in simple terms.',
          'Describe a technical project you\'re proud of.',
          'How do you stay updated with industry trends?',
          'What tools and technologies are you most comfortable with?'
        ],
        difficulty: 'intermediate',
        completed: false
      },
      {
        id: '3',
        type: 'case-study',
        title: 'Problem-Solving Scenarios',
        duration: 60,
        questions: [
          'You\'re given a budget of $10,000 to improve team productivity. How would you spend it?',
          'A project is running behind schedule. Walk me through your approach to get it back on track.',
          'How would you prioritize competing demands from different stakeholders?',
          'Describe how you would approach learning a completely new skill for your role.',
          'What would you do if you disagreed with your supervisor\'s decision?'
        ],
        difficulty: 'advanced',
        completed: true
      }
    ];

    return baseInterviews;
  };

  const getResumeTemplates = (): ResumeTemplate[] => {
    return [
      {
        id: '1',
        name: 'Student Resume',
        industry: 'General',
        description: 'Perfect for students with limited work experience, highlighting education and achievements.',
        preview: '/api/resume-templates/student.png'
      },
      {
        id: '2',
        name: 'Tech Professional',
        industry: 'Technology',
        description: 'Optimized for software developers and IT professionals with technical skills section.',
        preview: '/api/resume-templates/tech.png'
      },
      {
        id: '3',
        name: 'Creative Portfolio',
        industry: 'Creative',
        description: 'Designed for artists, designers, and creative professionals to showcase projects.',
        preview: '/api/resume-templates/creative.png'
      },
      {
        id: '4',
        name: 'Business Professional',
        industry: 'Business',
        description: 'Clean, professional format ideal for business and finance roles.',
        preview: '/api/resume-templates/business.png'
      }
    ];
  };

  const mockInterviews = getMockInterviews();
  const resumeTemplates = getResumeTemplates();

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'behavioral':
        return <Target className="w-5 h-5 text-blue-600" />;
      case 'technical':
        return <TrendingUp className="w-5 h-5 text-purple-600" />;
      case 'case-study':
        return <FileText className="w-5 h-5 text-orange-600" />;
      default:
        return <Target className="w-5 h-5 text-gray-600" />;
    }
  };

  const startInterview = (interviewId: string) => {
    setActiveInterview(interviewId);
    setCurrentQuestion(0);
  };

  const nextQuestion = () => {
    const interview = mockInterviews.find(i => i.id === activeInterview);
    if (interview && currentQuestion < interview.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const finishInterview = () => {
    setActiveInterview(null);
    setCurrentQuestion(0);
    setIsRecording(false);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Interview & Career Preparation</h1>
        <p className="text-xl text-gray-600">
          Practice interviews, build your resume, and prepare for your career journey
        </p>
      </div>

      <Tabs defaultValue="mock-interviews" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="mock-interviews">Mock Interviews</TabsTrigger>
          <TabsTrigger value="resume-builder">Resume Builder</TabsTrigger>
          <TabsTrigger value="tips">Interview Tips</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="mock-interviews" className="space-y-6">
          {!activeInterview ? (
            <>
              <Card className="p-6">
                <h2 className="text-xl text-gray-900 mb-4">Available Mock Interviews</h2>
                <div className="grid gap-4">
                  {mockInterviews.map((interview) => (
                    <div key={interview.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getTypeIcon(interview.type)}
                          <div>
                            <h3 className="text-lg text-gray-900">{interview.title}</h3>
                            <p className="text-sm text-gray-600">
                              {interview.questions.length} questions • {interview.duration} minutes
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={getDifficultyColor(interview.difficulty)}>
                            {interview.difficulty}
                          </Badge>
                          {interview.completed && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600 capitalize">
                          {interview.type.replace('-', ' ')} interview
                        </p>
                        <Button 
                          onClick={() => startInterview(interview.id)}
                          className="bg-teal-600 hover:bg-teal-700 text-white"
                        >
                          {interview.completed ? 'Practice Again' : 'Start Interview'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-8">
              {(() => {
                const interview = mockInterviews.find(i => i.id === activeInterview);
                if (!interview) return null;

                return (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl text-gray-900">{interview.title}</h2>
                      <Button variant="outline" onClick={finishInterview}>
                        Exit Interview
                      </Button>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className={getDifficultyColor(interview.difficulty)}>
                        {interview.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        Question {currentQuestion + 1} of {interview.questions.length}
                      </span>
                    </div>

                    <Progress 
                      value={((currentQuestion + 1) / interview.questions.length) * 100} 
                      className="h-2"
                    />

                    <Card className="p-6 bg-blue-50">
                      <h3 className="text-lg text-blue-900 mb-3">Interview Question</h3>
                      <p className="text-blue-800 text-lg leading-relaxed">
                        {interview.questions[currentQuestion]}
                      </p>
                    </Card>

                    <div className="flex items-center justify-center space-x-4 py-8">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setIsRecording(!isRecording)}
                        className={`flex items-center space-x-2 ${
                          isRecording ? 'bg-red-50 border-red-200 text-red-700' : ''
                        }`}
                      >
                        {isRecording ? <Pause className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                      </Button>
                      
                      <Button variant="outline" size="lg" className="flex items-center space-x-2">
                        <Video className="w-5 h-5" />
                        <span>Record Video</span>
                      </Button>
                    </div>

                    <div className="flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                        disabled={currentQuestion === 0}
                      >
                        Previous Question
                      </Button>
                      
                      {currentQuestion < interview.questions.length - 1 ? (
                        <Button 
                          onClick={nextQuestion}
                          className="bg-teal-600 hover:bg-teal-700 text-white"
                        >
                          Next Question
                        </Button>
                      ) : (
                        <Button 
                          onClick={finishInterview}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Complete Interview
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </Card>
          )}
        </TabsContent>

        <TabsContent value="resume-builder" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl text-gray-900 mb-4">Resume Builder</h2>
            <p className="text-gray-600 mb-6">
              Choose a template and build your professional resume with AI-powered suggestions.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {resumeTemplates.map((template) => (
                <Card key={template.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="aspect-[3/4] bg-gray-100 rounded mb-4 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-gray-400" />
                  </div>
                  <h3 className="text-lg text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">Perfect for {template.industry}</p>
                  <p className="text-sm text-gray-500 mb-4">{template.description}</p>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                    Use This Template
                  </Button>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">AI Resume Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-green-900 font-medium">Use action verbs</p>
                  <p className="text-green-800 text-sm">Start bullet points with strong action verbs like "managed," "developed," "improved"</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Star className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-blue-900 font-medium">Quantify achievements</p>
                  <p className="text-blue-800 text-sm">Include numbers and metrics to show impact: "Increased sales by 25%"</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                <Target className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-purple-900 font-medium">Tailor for each role</p>
                  <p className="text-purple-800 text-sm">Customize your resume keywords to match the job description</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-4">Before the Interview</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Research the company and role thoroughly</li>
                <li>• Practice your elevator pitch (30-60 seconds)</li>
                <li>• Prepare specific examples using the STAR method</li>
                <li>• Plan your outfit and test technology for virtual interviews</li>
                <li>• Prepare thoughtful questions to ask the interviewer</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-4">During the Interview</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Maintain good eye contact and confident body language</li>
                <li>• Listen carefully before answering questions</li>
                <li>• Use specific examples to illustrate your points</li>
                <li>• Ask clarifying questions if needed</li>
                <li>• Show enthusiasm and genuine interest</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-4">After the Interview</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Send a thank-you email within 24 hours</li>
                <li>• Reflect on what went well and areas for improvement</li>
                <li>• Follow up appropriately if you don't hear back</li>
                <li>• Continue applying to other opportunities</li>
                <li>• Keep practicing and refining your interview skills</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-4">Common Mistakes to Avoid</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Arriving late or being unprepared</li>
                <li>• Speaking negatively about previous employers</li>
                <li>• Not having questions to ask the interviewer</li>
                <li>• Being too generic in your answers</li>
                <li>• Forgetting to follow up after the interview</li>
              </ul>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl text-gray-900 mb-6">Your Interview Progress</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-2xl text-gray-900">1</p>
                <p className="text-sm text-gray-600">Interviews Completed</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-2xl text-gray-900">65</p>
                <p className="text-sm text-gray-600">Minutes Practiced</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-2xl text-gray-900">8.5</p>
                <p className="text-sm text-gray-600">Average Score</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg text-gray-900">Recent Practice Sessions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-gray-900">Problem-Solving Scenarios</p>
                      <p className="text-sm text-gray-600">Completed 3 days ago</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Score: 9.2
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="text-gray-900">Technical Skills Assessment</p>
                      <p className="text-sm text-gray-600">In progress</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    50% Complete
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}