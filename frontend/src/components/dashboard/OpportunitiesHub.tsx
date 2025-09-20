import { useState } from 'react';
import { UserRole, UserProfile } from '../../App';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Calendar,
  ExternalLink,
  Heart,
  Bookmark
} from 'lucide-react';

interface OpportunitiesHubProps {
  role: UserRole;
  profile: UserProfile;
}

interface Opportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  type: 'scholarship' | 'internship' | 'job' | 'certification';
  amount?: string;
  duration?: string;
  deadline?: string;
  salary?: string;
  requirements: string[];
  description: string;
  tags: string[];
  featured?: boolean;
}

export default function OpportunitiesHub({ role, profile }: OpportunitiesHubProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>([]);

  const getOpportunities = (): Opportunity[] => {
    switch (role) {
      case 'pre-university':
        return [
          {
            id: '1',
            title: 'Future Leaders Scholarship',
            organization: 'Education Foundation',
            location: 'National',
            type: 'scholarship',
            amount: '$2,000',
            deadline: 'Dec 31, 2024',
            requirements: ['GPA 3.5+', 'Leadership Experience', 'Essay Required'],
            description: 'Supporting the next generation of leaders in business and technology.',
            tags: ['Leadership', 'Business', 'Technology'],
            featured: true
          },
          {
            id: '2',
            title: 'Tech Innovators Grant',
            organization: 'TechCorp Foundation',
            location: 'National',
            type: 'scholarship',
            amount: '$1,500',
            deadline: 'Jan 15, 2025',
            requirements: ['STEM Interest', 'Project Portfolio', 'Recommendation Letter'],
            description: 'Encouraging innovation in science, technology, engineering, and mathematics.',
            tags: ['STEM', 'Innovation', 'Technology']
          },
          {
            id: '3',
            title: 'Academic Excellence Award',
            organization: 'University Consortium',
            location: 'Regional',
            type: 'scholarship',
            amount: '$3,000',
            deadline: 'Feb 28, 2025',
            requirements: ['Top 10% Class Rank', 'Community Service', 'Interview'],
            description: 'Recognizing outstanding academic achievement and community involvement.',
            tags: ['Academic', 'Community Service', 'Excellence']
          }
        ];
      case 'university':
        return [
          {
            id: '4',
            title: 'Software Developer Intern',
            organization: 'XYZ Tech Corp',
            location: 'San Francisco, CA',
            type: 'internship',
            salary: '$25/hour',
            duration: '12 weeks',
            deadline: 'Mar 1, 2025',
            requirements: ['CS or related major', 'Python/JavaScript', 'Git experience'],
            description: 'Join our engineering team to build scalable web applications.',
            tags: ['Software', 'Web Development', 'Remote'],
            featured: true
          },
          {
            id: '5',
            title: 'Marketing Intern',
            organization: 'ABC Marketing Ltd',
            location: 'New York, NY',
            type: 'internship',
            salary: '$20/hour',
            duration: '10 weeks',
            deadline: 'Feb 15, 2025',
            requirements: ['Business/Marketing major', 'Social Media Skills', 'Adobe Creative Suite'],
            description: 'Support digital marketing campaigns and content creation.',
            tags: ['Marketing', 'Social Media', 'Creative']
          },
          {
            id: '6',
            title: 'Data Analytics Intern',
            organization: 'DataInsights Inc',
            location: 'Remote',
            type: 'internship',
            salary: '$22/hour',
            duration: '16 weeks',
            deadline: 'Mar 15, 2025',
            requirements: ['Statistics/Data Science', 'Python/R', 'SQL'],
            description: 'Analyze customer data to drive business insights.',
            tags: ['Data Science', 'Analytics', 'Remote']
          }
        ];
      case 'job-seeker':
        return [
          {
            id: '7',
            title: 'Financial Analyst',
            organization: 'ABC Financial Corp',
            location: 'Chicago, IL',
            type: 'job',
            salary: '$65,000 - $75,000',
            requirements: ['Bachelor\'s in Finance', '2+ years experience', 'Excel proficiency'],
            description: 'Analyze financial data and prepare reports for senior management.',
            tags: ['Finance', 'Analysis', 'Full-time'],
            featured: true
          },
          {
            id: '8',
            title: 'Data Scientist',
            organization: 'Tech Solutions Inc',
            location: 'Austin, TX',
            type: 'job',
            salary: '$75,000 - $90,000',
            requirements: ['MS in Data Science', 'Python/R', 'Machine Learning'],
            description: 'Build predictive models and extract insights from large datasets.',
            tags: ['Data Science', 'Machine Learning', 'Python']
          },
          {
            id: '9',
            title: 'Project Manager',
            organization: 'Innovation Corp',
            location: 'Seattle, WA',
            type: 'job',
            salary: '$70,000 - $85,000',
            requirements: ['PMP certification preferred', '3+ years PM experience', 'Agile/Scrum'],
            description: 'Lead cross-functional teams to deliver complex technology projects.',
            tags: ['Project Management', 'Agile', 'Leadership']
          },
          {
            id: '10',
            title: 'Google Data Analytics Certificate',
            organization: 'Google Career Certificates',
            location: 'Online',
            type: 'certification',
            amount: '$49/month',
            duration: '6 months',
            requirements: ['No experience required', 'Self-paced learning'],
            description: 'Learn in-demand skills like data cleaning, analysis, and visualization.',
            tags: ['Data Analytics', 'Google', 'Certificate']
          }
        ];
    }
  };

  const opportunities = getOpportunities();
  
  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterType === 'all' || opp.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const toggleSave = (id: string) => {
    setSavedOpportunities(prev => 
      prev.includes(id) 
        ? prev.filter(savedId => savedId !== id)
        : [...prev, id]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'scholarship':
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'internship':
        return <Building className="w-5 h-5 text-blue-600" />;
      case 'job':
        return <Building className="w-5 h-5 text-purple-600" />;
      case 'certification':
        return <Calendar className="w-5 h-5 text-orange-600" />;
      default:
        return <Building className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'scholarship':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'internship':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'job':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'certification':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Opportunities Hub</h1>
        <p className="text-xl text-gray-600">
          Discover scholarships, internships, jobs, and certifications tailored for your career stage
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-3">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="scholarship">Scholarships</SelectItem>
                <SelectItem value="internship">Internships</SelectItem>
                <SelectItem value="job">Jobs</SelectItem>
                <SelectItem value="certification">Certifications</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-600">
            {filteredOpportunities.length} opportunities found
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Sort by Deadline
            </Button>
            <Button variant="outline" size="sm">
              Sort by Relevance
            </Button>
          </div>
        </div>
      </Card>

      {/* Opportunities Grid */}
      <div className="grid gap-6">
        {filteredOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className={`p-6 ${opportunity.featured ? 'ring-2 ring-teal-200 border-teal-200' : ''}`}>
            {opportunity.featured && (
              <Badge className="mb-4 bg-teal-100 text-teal-800 border-teal-200">
                Featured Opportunity
              </Badge>
            )}
            
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                {getTypeIcon(opportunity.type)}
                <div>
                  <h3 className="text-xl text-gray-900 mb-1">{opportunity.title}</h3>
                  <p className="text-gray-600 mb-2">{opportunity.organization}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{opportunity.location}</span>
                    </div>
                    
                    {opportunity.salary && (
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{opportunity.salary}</span>
                      </div>
                    )}
                    
                    {opportunity.amount && (
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{opportunity.amount}</span>
                      </div>
                    )}
                    
                    {opportunity.duration && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{opportunity.duration}</span>
                      </div>
                    )}
                    
                    {opportunity.deadline && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Deadline: {opportunity.deadline}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSave(opportunity.id)}
                  className={savedOpportunities.includes(opportunity.id) ? 'text-teal-600' : 'text-gray-400'}
                >
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Badge variant="outline" className={getTypeColor(opportunity.type)}>
                  {opportunity.type}
                </Badge>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{opportunity.description}</p>

            {/* Requirements */}
            <div className="mb-4">
              <h4 className="text-sm text-gray-900 mb-2">Requirements:</h4>
              <div className="flex flex-wrap gap-2">
                {opportunity.requirements.map((req, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {opportunity.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm">
                Learn More
              </Button>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white flex items-center space-x-2">
                <span>Apply Now</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Saved Opportunities */}
      {savedOpportunities.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl text-gray-900 mb-4">Saved Opportunities ({savedOpportunities.length})</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {savedOpportunities.slice(0, 4).map(id => {
              const opp = opportunities.find(o => o.id === id);
              return opp ? (
                <div key={id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  {getTypeIcon(opp.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 truncate">{opp.title}</p>
                    <p className="text-sm text-gray-600 truncate">{opp.organization}</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ) : null;
            })}
          </div>
          {savedOpportunities.length > 4 && (
            <Button variant="outline" className="mt-4">
              View All Saved ({savedOpportunities.length})
            </Button>
          )}
        </Card>
      )}
    </div>
  );
}