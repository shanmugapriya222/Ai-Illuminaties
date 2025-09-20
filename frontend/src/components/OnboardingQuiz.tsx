import { useState } from 'react';
import { UserRole, QuizAnswers, UserProfile } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OnboardingQuizProps {
  role: UserRole;
  profile: UserProfile;
  onComplete: (answers: QuizAnswers) => void;
  onBack: () => void;
}

const questions = [
  {
    id: 'interests',
    title: 'What are your main interests?',
    options: [
      { value: 'science', label: 'Science & Research' },
      { value: 'arts', label: 'Arts & Creative' },
      { value: 'technology', label: 'Technology & Innovation' },
      { value: 'business', label: 'Business & Finance' },
      { value: 'healthcare', label: 'Healthcare & Medicine' },
      { value: 'education', label: 'Education & Teaching' }
    ]
  },
  {
    id: 'skills',
    title: 'Which skills do you want to develop?',
    options: [
      { value: 'problem-solving', label: 'Problem Solving' },
      { value: 'communication', label: 'Communication' },
      { value: 'coding', label: 'Programming & Coding' },
      { value: 'leadership', label: 'Leadership & Management' },
      { value: 'analytical', label: 'Data Analysis' },
      { value: 'creative', label: 'Creative Design' }
    ]
  },
  {
    id: 'goals',
    title: 'What are your career goals?',
    options: [
      { value: 'high-salary', label: 'High Salary Potential' },
      { value: 'work-life-balance', label: 'Work-Life Balance' },
      { value: 'creativity', label: 'Creative Freedom' },
      { value: 'impact', label: 'Social Impact' },
      { value: 'stability', label: 'Job Security' },
      { value: 'growth', label: 'Fast Career Growth' }
    ]
  },
  {
    id: 'achievements',
    title: 'What are your proudest achievements?',
    multiSelect: true,
    options: [
      { value: 'academic', label: 'Academic Excellence' },
      { value: 'leadership', label: 'Leadership Roles' },
      { value: 'competition', label: 'Competition Winners' },
      { value: 'volunteer', label: 'Volunteer Work' },
      { value: 'creative', label: 'Creative Projects' },
      { value: 'technical', label: 'Technical Projects' }
    ]
  },
  {
    id: 'extracurriculars',
    title: 'What activities do you enjoy outside academics?',
    multiSelect: true,
    options: [
      { value: 'sports', label: 'Sports & Fitness' },
      { value: 'music', label: 'Music & Arts' },
      { value: 'coding', label: 'Programming' },
      { value: 'debate', label: 'Debate & Public Speaking' },
      { value: 'volunteering', label: 'Community Service' },
      { value: 'reading', label: 'Reading & Writing' }
    ]
  },
  {
    id: 'dreamCareer',
    title: 'If you could have any career, what would it be?',
    options: [
      { value: 'entrepreneur', label: 'Start My Own Business' },
      { value: 'scientist', label: 'Research Scientist' },
      { value: 'artist', label: 'Creative Artist' },
      { value: 'doctor', label: 'Medical Professional' },
      { value: 'engineer', label: 'Engineer' },
      { value: 'teacher', label: 'Educator' },
      { value: 'other', label: 'Something Else' }
    ]
  }
];

export default function OnboardingQuiz({ role, profile, onComplete, onBack }: OnboardingQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    interests: '',
    skills: '',
    goals: '',
    achievements: [],
    extracurriculars: [],
    dreamCareer: ''
  });

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

  const handleAnswerChange = (value: string) => {
    const questionId = questions[currentQuestion].id as keyof QuizAnswers;
    const currentQuestionData = questions[currentQuestion];
    
    if (currentQuestionData.multiSelect) {
      const currentValues = answers[questionId] as string[] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      setAnswers(prev => ({
        ...prev,
        [questionId]: newValues
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [questionId]: value
      }));
    }
  };

  const canProceed = () => {
    const questionId = questions[currentQuestion].id as keyof QuizAnswers;
    const currentQuestionData = questions[currentQuestion];
    
    if (currentQuestionData.multiSelect) {
      const currentValues = answers[questionId] as string[] || [];
      return currentValues.length > 0;
    } else {
      return answers[questionId] !== '';
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const questionId = currentQuestionData.id as keyof QuizAnswers;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">C</span>
            </div>
            <span className="text-xl text-gray-900">CareerPath AI</span>
          </div>
          <div className="flex items-center space-x-2 bg-teal-100 px-3 py-1 rounded-full">
            <span className="text-sm text-teal-800">{getRoleTitle()}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-16">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round((currentQuestion + 1) / questions.length * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl text-gray-900 mb-2">{currentQuestionData.title}</h2>
            {currentQuestionData.multiSelect && (
              <p className="text-sm text-gray-600">Select all that apply</p>
            )}
          </div>
          
          {currentQuestionData.multiSelect ? (
            <div className="space-y-4">
              {currentQuestionData.options.map((option) => {
                const currentValues = answers[questionId] as string[] || [];
                const isSelected = currentValues.includes(option.value);
                
                return (
                  <div 
                    key={option.value} 
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      isSelected 
                        ? 'border-teal-200 bg-teal-50' 
                        : 'border-gray-100 hover:border-teal-200'
                    }`}
                    onClick={() => handleAnswerChange(option.value)}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected ? 'border-teal-600 bg-teal-600' : 'border-gray-300'
                    }`}>
                      {isSelected && <span className="text-white text-xs">✓</span>}
                    </div>
                    <Label className="flex-1 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                );
              })}
            </div>
          ) : (
            <RadioGroup 
              value={answers[questionId] as string} 
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {currentQuestionData.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-100 hover:border-teal-200 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{currentQuestion === 0 ? 'Back to Roles' : 'Previous'}</span>
          </Button>

          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-teal-600 hover:bg-teal-700 text-white flex items-center space-x-2"
          >
            <span>{currentQuestion === questions.length - 1 ? 'View My Path' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}