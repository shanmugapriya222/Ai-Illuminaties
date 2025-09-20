import { useState } from 'react';
import { UserRole, UserProfile } from '../../App';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  CheckCircle, 
  AlertCircle, 
  BookOpen, 
  ExternalLink,
  Target,
  TrendingUp,
  Star
} from 'lucide-react';

interface SkillGapAnalyzerProps {
  role: UserRole;
  profile: UserProfile;
}

interface Skill {
  name: string;
  current: number;
  required: number;
  category: string;
}

interface Resource {
  name: string;
  provider: string;
  type: 'free' | 'paid';
  duration: string;
  rating: number;
  url: string;
}

export default function SkillGapAnalyzer({ role, profile }: SkillGapAnalyzerProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const getSkills = (): Skill[] => {
    switch (role) {
      case 'pre-university':
        return [
          { name: 'Mathematics', current: 75, required: 85, category: 'Academic' },
          { name: 'Critical Thinking', current: 60, required: 80, category: 'Soft Skills' },
          { name: 'Communication', current: 70, required: 85, category: 'Soft Skills' },
          { name: 'Basic Programming', current: 20, required: 60, category: 'Technical' },
          { name: 'Research Skills', current: 50, required: 75, category: 'Academic' },
          { name: 'Time Management', current: 65, required: 80, category: 'Soft Skills' }
        ];
      case 'university':
        return [
          { name: 'Python Programming', current: 40, required: 85, category: 'Technical' },
          { name: 'Data Analysis', current: 60, required: 90, category: 'Technical' },
          { name: 'Communication', current: 80, required: 85, category: 'Soft Skills' },
          { name: 'Machine Learning', current: 25, required: 75, category: 'Technical' },
          { name: 'Project Management', current: 45, required: 70, category: 'Business' },
          { name: 'Statistics', current: 55, required: 80, category: 'Academic' }
        ];
      case 'job-seeker':
        return [
          { name: 'Advanced Excel', current: 70, required: 90, category: 'Technical' },
          { name: 'Leadership', current: 60, required: 85, category: 'Soft Skills' },
          { name: 'SQL', current: 45, required: 80, category: 'Technical' },
          { name: 'Financial Modeling', current: 50, required: 85, category: 'Technical' },
          { name: 'Presentation Skills', current: 75, required: 85, category: 'Soft Skills' },
          { name: 'Strategic Thinking', current: 55, required: 80, category: 'Business' }
        ];
    }
  };

  const getResources = (skillName: string): Resource[] => {
    const resourceMap: Record<string, Resource[]> = {
      'Python Programming': [
        { name: 'Python for Everybody', provider: 'Coursera', type: 'free', duration: '8 weeks', rating: 4.8, url: '#' },
        { name: 'Complete Python Bootcamp', provider: 'Udemy', type: 'paid', duration: '12 weeks', rating: 4.6, url: '#' },
        { name: 'Python Documentation', provider: 'Python.org', type: 'free', duration: 'Self-paced', rating: 4.5, url: '#' }
      ],
      'Data Analysis': [
        { name: 'Data Analysis with Python', provider: 'FreeCodeCamp', type: 'free', duration: '6 weeks', rating: 4.7, url: '#' },
        { name: 'Advanced Data Analysis', provider: 'DataCamp', type: 'paid', duration: '10 weeks', rating: 4.5, url: '#' }
      ],
      'Machine Learning': [
        { name: 'Machine Learning Course', provider: 'Coursera', type: 'free', duration: '11 weeks', rating: 4.9, url: '#' },
        { name: 'Practical ML', provider: 'Udemy', type: 'paid', duration: '8 weeks', rating: 4.4, url: '#' }
      ],
      'Advanced Excel': [
        { name: 'Excel Skills for Business', provider: 'Coursera', type: 'free', duration: '6 weeks', rating: 4.6, url: '#' },
        { name: 'Excel Mastery', provider: 'Udemy', type: 'paid', duration: '4 weeks', rating: 4.5, url: '#' }
      ],
      'SQL': [
        { name: 'SQL Basics', provider: 'W3Schools', type: 'free', duration: '4 weeks', rating: 4.3, url: '#' },
        { name: 'Advanced SQL', provider: 'DataCamp', type: 'paid', duration: '8 weeks', rating: 4.7, url: '#' }
      ]
    };

    return resourceMap[skillName] || [
      { name: 'General Course', provider: 'EdX', type: 'free', duration: '6 weeks', rating: 4.2, url: '#' },
      { name: 'Professional Course', provider: 'LinkedIn Learning', type: 'paid', duration: '4 weeks', rating: 4.4, url: '#' }
    ];
  };

  const skills = getSkills();
  const skillCategories = Array.from(new Set(skills.map(skill => skill.category)));

  const getSkillStatus = (skill: Skill) => {
    const gap = skill.required - skill.current;
    if (gap <= 0) return { status: 'complete', color: 'text-green-600', icon: CheckCircle };
    if (gap <= 15) return { status: 'close', color: 'text-yellow-600', icon: AlertCircle };
    return { status: 'gap', color: 'text-red-600', icon: AlertCircle };
  };

  const getOverallProgress = () => {
    const totalCurrent = skills.reduce((sum, skill) => sum + skill.current, 0);
    const totalRequired = skills.reduce((sum, skill) => sum + skill.required, 0);
    return Math.round((totalCurrent / totalRequired) * 100);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Skill Gap Analyzer</h1>
        <p className="text-xl text-gray-600">
          Compare your current skills with industry requirements and get personalized learning recommendations
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-gray-900">Overall Skill Progress</h2>
          <Badge variant="outline" className="bg-teal-100 text-teal-800 border-teal-200">
            {getOverallProgress()}% Complete
          </Badge>
        </div>
        <Progress value={getOverallProgress()} className="h-3 mb-2" />
        <p className="text-sm text-gray-600">
          You're {getOverallProgress()}% ready for your target role. Focus on the skills highlighted below to close the gaps.
        </p>
      </Card>

      {/* Skills by Category */}
      <div className="space-y-6">
        {skillCategories.map((category) => {
          const categorySkills = skills.filter(skill => skill.category === category);
          
          return (
            <Card key={category} className="p-6">
              <h2 className="text-xl text-gray-900 mb-4">{category} Skills</h2>
              
              <div className="space-y-4">
                {categorySkills.map((skill) => {
                  const status = getSkillStatus(skill);
                  const StatusIcon = status.icon;
                  
                  return (
                    <div key={skill.name} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <StatusIcon className={`w-5 h-5 ${status.color}`} />
                          <h3 className="text-lg text-gray-900">{skill.name}</h3>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedSkill(skill.name)}
                            >
                              View Resources
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Learning Resources for {skill.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              {getResources(skill.name).map((resource, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-gray-900">{resource.name}</h4>
                                    <div className="flex items-center space-x-2">
                                      <Badge variant={resource.type === 'free' ? 'default' : 'secondary'}>
                                        {resource.type}
                                      </Badge>
                                      <div className="flex items-center space-x-1">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span className="text-sm text-gray-600">{resource.rating}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-600">
                                      <span>{resource.provider} • {resource.duration}</span>
                                    </div>
                                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                                      <span>Visit Course</span>
                                      <ExternalLink className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {/* Current Level */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">Current Level</span>
                            <span className="text-sm text-gray-900">{skill.current}%</span>
                          </div>
                          <Progress value={skill.current} className="h-2" />
                        </div>
                        
                        {/* Required Level */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">Required Level</span>
                            <span className="text-sm text-gray-900">{skill.required}%</span>
                          </div>
                          <Progress value={skill.required} className="h-2 opacity-50" />
                        </div>
                      </div>
                      
                      {/* Gap Information */}
                      <div className="mt-3 p-2 bg-gray-50 rounded">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            {skill.required > skill.current 
                              ? `Gap: ${skill.required - skill.current}% to reach target`
                              : 'Target achieved! 🎉'
                            }
                          </span>
                          {skill.required > skill.current && (
                            <span className="text-sm text-teal-600 font-medium">
                              Estimated: 2-4 weeks
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recommended Learning Path */}
      <Card className="p-6">
        <h2 className="text-xl text-gray-900 mb-4">Recommended Learning Path</h2>
        <p className="text-gray-600 mb-4">
          Based on your skill gaps, here's a suggested order for learning:
        </p>
        
        <div className="space-y-3">
          {skills
            .filter(skill => skill.current < skill.required)
            .sort((a, b) => (b.required - b.current) - (a.required - a.current))
            .slice(0, 3)
            .map((skill, index) => (
              <div key={skill.name} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                <div className="w-8 h-8 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900">{skill.name}</h4>
                  <p className="text-sm text-gray-600">
                    Priority: {skill.required - skill.current}% gap • {skill.category}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Start Learning
                </Button>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}