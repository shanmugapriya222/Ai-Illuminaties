import { useState } from 'react';
import { UserRole, UserProfile } from '../../App';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Heart, 
  Brain, 
  Zap, 
  Shield, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Calendar,
  BookOpen,
  Users,
  Phone
} from 'lucide-react';

interface WellbeingAssessmentProps {
  role: UserRole;
  profile: UserProfile;
}

interface AssessmentQuestion {
  id: string;
  question: string;
  options: { value: number; label: string }[];
}

interface WellbeingScore {
  category: string;
  score: number;
  maxScore: number;
  status: 'excellent' | 'good' | 'fair' | 'needs-attention';
  icon: React.ReactNode;
  recommendations: string[];
}

export default function WellbeingAssessment({ role, profile }: WellbeingAssessmentProps) {
  const [currentAssessment, setCurrentAssessment] = useState<string | null>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const getAssessmentQuestions = (): AssessmentQuestion[] => {
    return [
      {
        id: 'stress_1',
        question: 'How often do you feel overwhelmed by your academic/career responsibilities?',
        options: [
          { value: 5, label: 'Never' },
          { value: 4, label: 'Rarely' },
          { value: 3, label: 'Sometimes' },
          { value: 2, label: 'Often' },
          { value: 1, label: 'Always' }
        ]
      },
      {
        id: 'motivation_1',
        question: 'How motivated do you feel about your current academic/career path?',
        options: [
          { value: 5, label: 'Extremely motivated' },
          { value: 4, label: 'Very motivated' },
          { value: 3, label: 'Somewhat motivated' },
          { value: 2, label: 'Not very motivated' },
          { value: 1, label: 'Not motivated at all' }
        ]
      },
      {
        id: 'confidence_1',
        question: 'How confident do you feel about achieving your career goals?',
        options: [
          { value: 5, label: 'Very confident' },
          { value: 4, label: 'Confident' },
          { value: 3, label: 'Somewhat confident' },
          { value: 2, label: 'Not very confident' },
          { value: 1, label: 'Not confident at all' }
        ]
      },
      {
        id: 'support_1',
        question: 'How supported do you feel by family, friends, or mentors?',
        options: [
          { value: 5, label: 'Very supported' },
          { value: 4, label: 'Supported' },
          { value: 3, label: 'Somewhat supported' },
          { value: 2, label: 'Not very supported' },
          { value: 1, label: 'Not supported at all' }
        ]
      },
      {
        id: 'balance_1',
        question: 'How well do you manage work-life balance?',
        options: [
          { value: 5, label: 'Very well' },
          { value: 4, label: 'Well' },
          { value: 3, label: 'Okay' },
          { value: 2, label: 'Poorly' },
          { value: 1, label: 'Very poorly' }
        ]
      },
      {
        id: 'sleep_1',
        question: 'How would you rate your sleep quality and duration?',
        options: [
          { value: 5, label: 'Excellent' },
          { value: 4, label: 'Good' },
          { value: 3, label: 'Fair' },
          { value: 2, label: 'Poor' },
          { value: 1, label: 'Very poor' }
        ]
      },
      {
        id: 'anxiety_1',
        question: 'How often do you experience anxiety about your future?',
        options: [
          { value: 5, label: 'Never' },
          { value: 4, label: 'Rarely' },
          { value: 3, label: 'Sometimes' },
          { value: 2, label: 'Often' },
          { value: 1, label: 'Very often' }
        ]
      },
      {
        id: 'satisfaction_1',
        question: 'How satisfied are you with your current progress?',
        options: [
          { value: 5, label: 'Very satisfied' },
          { value: 4, label: 'Satisfied' },
          { value: 3, label: 'Somewhat satisfied' },
          { value: 2, label: 'Not very satisfied' },
          { value: 1, label: 'Not satisfied at all' }
        ]
      }
    ];
  };

  const calculateWellbeingScores = (): WellbeingScore[] => {
    const totalScore = Object.values(assessmentAnswers).reduce((sum, score) => sum + score, 0);
    const maxTotalScore = getAssessmentQuestions().length * 5;
    const overallPercentage = (totalScore / maxTotalScore) * 100;

    // Calculate category-specific scores (mock data for demo)
    return [
      {
        category: 'Mental Health',
        score: Math.round(overallPercentage * 0.9),
        maxScore: 100,
        status: overallPercentage >= 80 ? 'excellent' : overallPercentage >= 65 ? 'good' : overallPercentage >= 50 ? 'fair' : 'needs-attention',
        icon: <Brain className="w-6 h-6" />,
        recommendations: [
          'Practice daily mindfulness or meditation',
          'Consider speaking with a counselor',
          'Join support groups or peer networks'
        ]
      },
      {
        category: 'Stress Management',
        score: Math.round(overallPercentage * 0.85),
        maxScore: 100,
        status: overallPercentage >= 75 ? 'excellent' : overallPercentage >= 60 ? 'good' : overallPercentage >= 45 ? 'fair' : 'needs-attention',
        icon: <Shield className="w-6 h-6" />,
        recommendations: [
          'Learn time management techniques',
          'Practice deep breathing exercises',
          'Set realistic goals and expectations'
        ]
      },
      {
        category: 'Motivation',
        score: Math.round(overallPercentage * 1.1),
        maxScore: 100,
        status: overallPercentage >= 70 ? 'excellent' : overallPercentage >= 55 ? 'good' : overallPercentage >= 40 ? 'fair' : 'needs-attention',
        icon: <Zap className="w-6 h-6" />,
        recommendations: [
          'Set clear, achievable short-term goals',
          'Celebrate small wins and progress',
          'Connect with inspiring role models'
        ]
      },
      {
        category: 'Social Support',
        score: Math.round(overallPercentage * 0.95),
        maxScore: 100,
        status: overallPercentage >= 80 ? 'excellent' : overallPercentage >= 65 ? 'good' : overallPercentage >= 50 ? 'fair' : 'needs-attention',
        icon: <Users className="w-6 h-6" />,
        recommendations: [
          'Build stronger relationships with peers',
          'Seek mentorship opportunities',
          'Join professional or social groups'
        ]
      }
    ];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'good':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'fair':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'needs-attention':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const startAssessment = () => {
    setCurrentAssessment('wellbeing');
    setCurrentQuestion(0);
    setAssessmentAnswers({});
  };

  const handleAnswerChange = (questionId: string, value: number) => {
    setAssessmentAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    const questions = getAssessmentQuestions();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Complete assessment
      setCurrentAssessment(null);
    }
  };

  const questions = getAssessmentQuestions();
  const wellbeingScores = Object.keys(assessmentAnswers).length === questions.length ? calculateWellbeingScores() : [];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Psychological Wellbeing & Motivation</h1>
        <p className="text-xl text-gray-600">
          Monitor your mental health and get personalized support for your career journey
        </p>
      </div>

      <Tabs defaultValue="assessment" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="assessment" className="space-y-6">
          {!currentAssessment ? (
            <Card className="p-8 text-center">
              <Heart className="w-16 h-16 text-teal-600 mx-auto mb-4" />
              <h2 className="text-2xl text-gray-900 mb-4">Wellbeing Assessment</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Take our comprehensive assessment to understand your current mental health and motivation levels. 
                This will help us provide personalized recommendations for your career journey.
              </p>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">5-7 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">Completely confidential</span>
                </div>
              </div>
              <Button 
                onClick={startAssessment}
                className="bg-teal-600 hover:bg-teal-700 text-white"
                size="lg"
              >
                Start Assessment
              </Button>
            </Card>
          ) : (
            <Card className="p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl text-gray-900">Wellbeing Assessment</h2>
                  <span className="text-sm text-gray-600">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                </div>
                <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
              </div>

              <div className="space-y-6">
                <h3 className="text-lg text-gray-900 leading-relaxed">
                  {questions[currentQuestion].question}
                </h3>

                <RadioGroup
                  value={assessmentAnswers[questions[currentQuestion].id]?.toString() || ''}
                  onValueChange={(value) => handleAnswerChange(questions[currentQuestion].id, parseInt(value))}
                  className="space-y-3"
                >
                  {questions[currentQuestion].options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
                      <RadioGroupItem value={option.value.toString()} id={option.value.toString()} />
                      <Label htmlFor={option.value.toString()} className="flex-1 cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  
                  <Button 
                    onClick={nextQuestion}
                    disabled={!assessmentAnswers[questions[currentQuestion].id]}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next'}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {wellbeingScores.length > 0 ? (
            <>
              <Card className="p-6">
                <h2 className="text-xl text-gray-900 mb-6">Your Wellbeing Report</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {wellbeingScores.map((score, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${getStatusColor(score.status)}`}>
                            {score.icon}
                          </div>
                          <h3 className="text-lg text-gray-900">{score.category}</h3>
                        </div>
                        <Badge variant="outline" className={getStatusColor(score.status)}>
                          {score.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Score</span>
                          <span className="text-gray-900">{score.score}/{score.maxScore}</span>
                        </div>
                        <Progress value={score.score} className="h-3" />
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm text-gray-900">Recommendations:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {score.recommendations.slice(0, 2).map((rec, idx) => (
                            <li key={idx}>• {rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg text-gray-900 mb-4">Action Plan</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-blue-900 font-medium">This Week</p>
                      <p className="text-blue-800 text-sm">Schedule 15 minutes daily for mindfulness practice</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-green-900 font-medium">This Month</p>
                      <p className="text-green-800 text-sm">Complete stress management workshop and join a study group</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-purple-900 font-medium">Long-term</p>
                      <p className="text-purple-800 text-sm">Build a strong support network and develop resilience skills</p>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-8 text-center">
              <AlertTriangle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-xl text-gray-900 mb-2">No Assessment Results</h2>
              <p className="text-gray-600 mb-4">Complete the wellbeing assessment to see your personalized results.</p>
              <Button 
                onClick={() => setCurrentAssessment('wellbeing')}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Take Assessment
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-4">Mental Health Resources</h3>
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="text-gray-900 mb-1">Mindfulness Apps</h4>
                  <p className="text-sm text-gray-600">Headspace, Calm, Insight Timer</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="text-gray-900 mb-1">Online Therapy</h4>
                  <p className="text-sm text-gray-600">BetterHelp, Talkspace, MDLIVE</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="text-gray-900 mb-1">Support Groups</h4>
                  <p className="text-sm text-gray-600">NAMI, 7 Cups, Crisis Text Line</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-4">Stress Management</h3>
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="text-gray-900 mb-1">Time Management</h4>
                  <p className="text-sm text-gray-600">Pomodoro Technique, task prioritization</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="text-gray-900 mb-1">Relaxation Techniques</h4>
                  <p className="text-sm text-gray-600">Deep breathing, progressive muscle relaxation</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="text-gray-900 mb-1">Physical Wellness</h4>
                  <p className="text-sm text-gray-600">Regular exercise, healthy sleep habits</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-4">Motivation Boosters</h3>
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="text-gray-900 mb-1">Goal Setting</h4>
                  <p className="text-sm text-gray-600">SMART goals, vision boards, progress tracking</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="text-gray-900 mb-1">Success Stories</h4>
                  <p className="text-sm text-gray-600">Read inspiring career journeys</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="text-gray-900 mb-1">Accountability</h4>
                  <p className="text-sm text-gray-600">Study buddies, mentors, check-ins</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-4">Emergency Resources</h3>
              <div className="space-y-3">
                <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
                  <h4 className="text-red-900 mb-1">Crisis Hotlines</h4>
                  <p className="text-sm text-red-800">National Suicide Prevention: 988</p>
                </div>
                <div className="p-3 border border-orange-200 bg-orange-50 rounded-lg">
                  <h4 className="text-orange-900 mb-1">Crisis Text Line</h4>
                  <p className="text-sm text-orange-800">Text HOME to 741741</p>
                </div>
                <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
                  <h4 className="text-blue-900 mb-1">Campus Counseling</h4>
                  <p className="text-sm text-blue-800">Contact your school's counseling center</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl text-gray-900 mb-6">Get Support</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg text-gray-900">Professional Support</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule Counseling Session
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Connect with Peer Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Access Wellness Workshops
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg text-gray-900">Self-Help Tools</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="w-4 h-4 mr-2" />
                    Mood Tracking Journal
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Zap className="w-4 h-4 mr-2" />
                    Motivation Exercises
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Stress Reduction Techniques
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-4">
              <Heart className="w-8 h-8 text-blue-600 mt-1" />
              <div>
                <h3 className="text-blue-900 mb-2">Remember: You're Not Alone</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  Career planning can be stressful, and it's normal to feel overwhelmed sometimes. 
                  Your mental health is just as important as your academic or career success. 
                  Don't hesitate to reach out for help when you need it.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}