import { UserRole, QuizAnswers, UserProfile } from '../../App';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Download, 
  Share, 
  FileText, 
  TrendingUp, 
  Target, 
  Award,
  Calendar,
  User,
  BookOpen,
  Briefcase
} from 'lucide-react';

interface ReportsPageProps {
  role: UserRole;
  profile: UserProfile;
  quizAnswers: QuizAnswers;
}

export default function ReportsPage({ role, profile, quizAnswers }: ReportsPageProps) {
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

  const getRecommendations = () => {
    switch (role) {
      case 'pre-university':
        return [
          'Consider B.Sc Computer Science for technology interests',
          'Apply for STEM scholarships by December 2024',
          'Develop programming skills during summer break',
          'Join coding clubs and technology competitions'
        ];
      case 'university':
        return [
          'Focus on Python programming and data analysis skills',
          'Apply for summer internships in tech companies',
          'Build a portfolio of 3-5 coding projects',
          'Network with alumni in your field of interest'
        ];
      case 'job-seeker':
        return [
          'Enhance Excel and SQL skills for financial roles',
          'Complete Google Data Analytics certification',
          'Update LinkedIn profile with recent achievements',
          'Apply to 5-10 positions matching your skill set'
        ];
    }
  };

  const getSkillGaps = () => {
    switch (role) {
      case 'pre-university':
        return [
          { skill: 'Programming Basics', gap: 40, priority: 'High' },
          { skill: 'Research Skills', gap: 25, priority: 'Medium' },
          { skill: 'Critical Thinking', gap: 20, priority: 'Medium' },
          { skill: 'Time Management', gap: 15, priority: 'Low' }
        ];
      case 'university':
        return [
          { skill: 'Python Programming', gap: 45, priority: 'High' },
          { skill: 'Data Analysis', gap: 30, priority: 'High' },
          { skill: 'Machine Learning', gap: 50, priority: 'Medium' },
          { skill: 'Project Management', gap: 25, priority: 'Low' }
        ];
      case 'job-seeker':
        return [
          { skill: 'SQL Database', gap: 35, priority: 'High' },
          { skill: 'Advanced Excel', gap: 20, priority: 'High' },
          { skill: 'Financial Modeling', gap: 35, priority: 'Medium' },
          { skill: 'Leadership Skills', gap: 25, priority: 'Medium' }
        ];
    }
  };

  const getSuggestedResources = () => {
    switch (role) {
      case 'pre-university':
        return [
          { name: 'Khan Academy Computer Programming', type: 'Free Course', duration: '4 weeks' },
          { name: 'MIT Introduction to Computer Science', type: 'Free Course', duration: '12 weeks' },
          { name: 'Codecademy Python Track', type: 'Paid Course', duration: '8 weeks' }
        ];
      case 'university':
        return [
          { name: 'Python for Data Science - Coursera', type: 'Free Course', duration: '6 weeks' },
          { name: 'Machine Learning Fundamentals', type: 'Paid Course', duration: '10 weeks' },
          { name: 'Data Analysis with Pandas', type: 'Free Tutorial', duration: '3 weeks' }
        ];
      case 'job-seeker':
        return [
          { name: 'Advanced Excel for Professionals', type: 'Paid Course', duration: '4 weeks' },
          { name: 'SQL for Data Analysis', type: 'Free Course', duration: '5 weeks' },
          { name: 'Google Data Analytics Certificate', type: 'Paid Program', duration: '6 months' }
        ];
    }
  };

  const recommendations = getRecommendations();
  const skillGaps = getSkillGaps();
  const resources = getSuggestedResources();

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Career Development Report</h1>
          <p className="text-xl text-gray-600">Your personalized career analysis and recommendations</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Share className="w-4 h-4" />
            <span>Share Report</span>
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </Button>
        </div>
      </div>

      {/* Report Preview */}
      <Card className="p-8 bg-white shadow-lg">
        <div className="space-y-8">
          {/* Report Header */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-teal-600" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900">CareerPath AI Report</h2>
                <p className="text-gray-600">Generated for {getRoleTitle()}</p>
                <p className="text-sm text-gray-500">Report Date: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
          </div>

          {/* Quiz Summary */}
          <div>
            <h3 className="text-xl text-gray-900 mb-4 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-teal-600" />
              <span>Profile Summary</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-gray-700 mb-1">Primary Interest</h4>
                <p className="text-gray-900 capitalize">{quizAnswers.interests.replace('-', ' ')}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-gray-700 mb-1">Key Skill Focus</h4>
                <p className="text-gray-900 capitalize">{quizAnswers.skills.replace('-', ' ')}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-gray-700 mb-1">Career Goal</h4>
                <p className="text-gray-900 capitalize">{quizAnswers.goals.replace('-', ' ')}</p>
              </div>
            </div>
          </div>

          {/* Key Recommendations */}
          <div>
            <h3 className="text-xl text-gray-900 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <span>Key Recommendations</span>
            </h3>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-teal-50 rounded-lg">
                  <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-900 flex-1">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Gap Analysis */}
          <div>
            <h3 className="text-xl text-gray-900 mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-teal-600" />
              <span>Skill Gap Analysis</span>
            </h3>
            <div className="space-y-4">
              {skillGaps.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-900">{item.skill}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className={
                          item.priority === 'High' 
                            ? 'bg-red-100 text-red-800 border-red-200'
                            : item.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            : 'bg-green-100 text-green-800 border-green-200'
                        }
                      >
                        {item.priority} Priority
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <Progress value={100 - item.gap} className="h-2" />
                    </div>
                    <span className="text-sm text-gray-600 w-16">{item.gap}% gap</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Resources */}
          <div>
            <h3 className="text-xl text-gray-900 mb-4 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-teal-600" />
              <span>Suggested Learning Resources</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {resources.map((resource, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-gray-900 mb-2">{resource.name}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{resource.type}</span>
                    <span>{resource.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Plan */}
          <div>
            <h3 className="text-xl text-gray-900 mb-4 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              <span>30-Day Action Plan</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border-l-4 border-teal-600 bg-teal-50">
                <span className="text-sm text-teal-800 font-medium">Week 1-2:</span>
                <span className="text-gray-900">Complete skill assessments and begin highest priority course</span>
              </div>
              <div className="flex items-center space-x-3 p-3 border-l-4 border-blue-600 bg-blue-50">
                <span className="text-sm text-blue-800 font-medium">Week 2-3:</span>
                <span className="text-gray-900">Apply to recommended opportunities and update profiles</span>
              </div>
              <div className="flex items-center space-x-3 p-3 border-l-4 border-purple-600 bg-purple-50">
                <span className="text-sm text-purple-800 font-medium">Week 3-4:</span>
                <span className="text-gray-900">Network with professionals and practice interview skills</span>
              </div>
              <div className="flex items-center space-x-3 p-3 border-l-4 border-green-600 bg-green-50">
                <span className="text-sm text-green-800 font-medium">Ongoing:</span>
                <span className="text-gray-900">Track progress and adjust plan based on new opportunities</span>
              </div>
            </div>
          </div>

          {/* Report Footer */}
          <div className="border-t border-gray-200 pt-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-gray-600 mb-2">
              <Award className="w-5 h-5" />
              <span>This report was generated by CareerPath AI</span>
            </div>
            <p className="text-sm text-gray-500">
              For best results, revisit this assessment every 3-6 months to track your progress
            </p>
          </div>
        </div>
      </Card>

      {/* Additional Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <Briefcase className="w-12 h-12 text-teal-600 mx-auto mb-4" />
          <h3 className="text-lg text-gray-900 mb-2">Schedule Follow-up</h3>
          <p className="text-gray-600 mb-4 text-sm">Get a progress review in 3 months</p>
          <Button variant="outline" size="sm">Set Reminder</Button>
        </Card>

        <Card className="p-6 text-center">
          <Share className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg text-gray-900 mb-2">Share with Mentor</h3>
          <p className="text-gray-600 mb-4 text-sm">Get feedback from a career advisor</p>
          <Button variant="outline" size="sm">Send Report</Button>
        </Card>

        <Card className="p-6 text-center">
          <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg text-gray-900 mb-2">Track Progress</h3>
          <p className="text-gray-600 mb-4 text-sm">Monitor your skill development</p>
          <Button variant="outline" size="sm">View Analytics</Button>
        </Card>
      </div>
    </div>
  );
}