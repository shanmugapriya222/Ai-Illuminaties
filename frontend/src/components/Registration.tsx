import { useState } from 'react';
import { UserRole, UserProfile } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { ChevronLeft, ChevronRight, Shield, Users, Lock } from 'lucide-react';

interface RegistrationProps {
  role: UserRole;
  onComplete: (profile: UserProfile) => void;
  onBack: () => void;
}

export default function Registration({ role, onComplete, onBack }: RegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    education: '',
    location: '',
    parentEmail: '',
    parentConsent: false,
    achievements: [] as string[],
    certifications: [] as string[],
    privacyConsent: false
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

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete registration
      const profile: UserProfile = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age),
        education: formData.education,
        location: formData.location,
        parentEmail: formData.parentEmail || undefined,
        achievements: formData.achievements,
        certifications: formData.certifications,
        wellbeingScore: 75, // Default score
        createdAt: new Date()
      };
      onComplete(profile);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.age && formData.education;
      case 2:
        if (role === 'pre-university') {
          return formData.parentConsent;
        }
        return true;
      case 3:
        return formData.privacyConsent;
      default:
        return false;
    }
  };

  const addAchievement = (achievement: string) => {
    if (achievement && !formData.achievements.includes(achievement)) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, achievement]
      }));
    }
  };

  const removeAchievement = (achievement: string) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(a => a !== achievement)
    }));
  };

  const predefinedAchievements = [
    'Academic Excellence Award',
    'Science Fair Winner',
    'Programming Competition',
    'Leadership Role',
    'Community Service',
    'Sports Achievement',
    'Art/Music Competition',
    'Scholarship Recipient'
  ];

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
            <span>Step {currentStep} of 3</span>
            <span>{Math.round((currentStep / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl text-gray-900 mb-2">Create Your Profile</h2>
                <p className="text-gray-600">Let's start with some basic information about you.</p>
              </div>

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                      placeholder="Your age"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="education">Education Level *</Label>
                  <Select value={formData.education} onValueChange={(value) => setFormData(prev => ({ ...prev, education: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {role === 'pre-university' && (
                        <>
                          <SelectItem value="grade-9">Grade 9</SelectItem>
                          <SelectItem value="grade-10">Grade 10</SelectItem>
                          <SelectItem value="grade-11">Grade 11</SelectItem>
                          <SelectItem value="grade-12">Grade 12</SelectItem>
                        </>
                      )}
                      {role === 'university' && (
                        <>
                          <SelectItem value="undergraduate-1">1st Year Undergraduate</SelectItem>
                          <SelectItem value="undergraduate-2">2nd Year Undergraduate</SelectItem>
                          <SelectItem value="undergraduate-3">3rd Year Undergraduate</SelectItem>
                          <SelectItem value="undergraduate-4">4th Year Undergraduate</SelectItem>
                          <SelectItem value="masters">Master's Program</SelectItem>
                          <SelectItem value="phd">PhD Program</SelectItem>
                        </>
                      )}
                      {role === 'job-seeker' && (
                        <>
                          <SelectItem value="high-school">High School</SelectItem>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                          <SelectItem value="professional">Professional Certification</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl text-gray-900 mb-2">Achievements & Experience</h2>
                <p className="text-gray-600">
                  Tell us about your accomplishments to personalize your recommendations.
                </p>
              </div>

              <div>
                <Label>Select Your Achievements</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {predefinedAchievements.map((achievement) => (
                    <div
                      key={achievement}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.achievements.includes(achievement)
                          ? 'border-teal-200 bg-teal-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => {
                        if (formData.achievements.includes(achievement)) {
                          removeAchievement(achievement);
                        } else {
                          addAchievement(achievement);
                        }
                      }}
                    >
                      <span className="text-sm text-gray-900">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {formData.achievements.length > 0 && (
                <div>
                  <Label>Selected Achievements</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.achievements.map((achievement) => (
                      <Badge
                        key={achievement}
                        variant="secondary"
                        className="bg-teal-100 text-teal-800"
                      >
                        {achievement}
                        <button
                          onClick={() => removeAchievement(achievement)}
                          className="ml-2 hover:text-teal-900"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {role === 'pre-university' && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-blue-900 mb-2">Parent/Guardian Involvement</h3>
                      <p className="text-sm text-blue-800 mb-3">
                        We recommend involving a parent or guardian in your career planning journey.
                      </p>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="parentEmail">Parent/Guardian Email (Optional)</Label>
                          <Input
                            id="parentEmail"
                            type="email"
                            value={formData.parentEmail}
                            onChange={(e) => setFormData(prev => ({ ...prev, parentEmail: e.target.value }))}
                            placeholder="parent@example.com"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="parentConsent"
                            checked={formData.parentConsent}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, parentConsent: checked as boolean }))}
                          />
                          <Label htmlFor="parentConsent" className="text-sm">
                            I have parental/guardian consent to use this platform *
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl text-gray-900 mb-2">Privacy & Security</h2>
                <p className="text-gray-600">
                  Your data security and privacy are our top priorities.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="text-green-900 mb-2">Data Security</h3>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• All data is encrypted and stored securely</li>
                        <li>• We never share personal information with third parties</li>
                        <li>• You have full control over your data</li>
                        <li>• GDPR and CCPA compliant</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="text-blue-900 mb-2">Important Notice</h3>
                      <p className="text-sm text-blue-800">
                        CareerPath AI is designed for educational and career guidance purposes. 
                        We do not collect sensitive personal information or financial data. 
                        Your career journey data helps us provide better recommendations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacyConsent"
                      checked={formData.privacyConsent}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, privacyConsent: checked as boolean }))}
                    />
                    <Label htmlFor="privacyConsent" className="text-sm leading-relaxed">
                      I agree to the Terms of Service and Privacy Policy. I understand that my data 
                      will be used to provide personalized career guidance and that I can delete my 
                      account and data at any time. *
                    </Label>
                  </div>
                </div>
              </div>
            </div>
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
            <span>{currentStep === 1 ? 'Back to Roles' : 'Previous'}</span>
          </Button>

          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-teal-600 hover:bg-teal-700 text-white flex items-center space-x-2"
          >
            <span>{currentStep === 3 ? 'Complete Registration' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}