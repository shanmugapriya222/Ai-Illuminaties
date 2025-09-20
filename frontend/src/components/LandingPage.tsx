import { UserRole } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { GraduationCap, BookOpen, Briefcase } from 'lucide-react';

interface LandingPageProps {
  onRoleSelect: (role: UserRole) => void;
}

export default function LandingPage({ onRoleSelect }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">C</span>
            </div>
            <span className="text-xl text-gray-900">CareerPath AI</span>
          </div>
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            <Button variant="outline" size="sm">Log In</Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-gray-900 mb-4">Welcome to CareerPath AI</h1>
          <p className="text-xl text-gray-600">Choose your role to get started on your personalized career journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Pre-University Student */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-teal-200" 
                onClick={() => onRoleSelect('pre-university')}>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Pre-University Student</h3>
              <p className="text-gray-600 mb-4">Exploring degree options and planning your academic future</p>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                Get Started
              </Button>
            </div>
          </Card>

          {/* University Student */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-teal-200"
                onClick={() => onRoleSelect('university')}>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">University Student</h3>
              <p className="text-gray-600 mb-4">Building skills and finding internships for career readiness</p>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                Get Started
              </Button>
            </div>
          </Card>

          {/* Job Seeker */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-teal-200"
                onClick={() => onRoleSelect('job-seeker')}>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Job Seeker</h3>
              <p className="text-gray-600 mb-4">Ready to launch your career and find the perfect role</p>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                Get Started
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}