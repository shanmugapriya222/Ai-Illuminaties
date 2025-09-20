import { useState } from 'react';
import { UserRole, UserProfile } from '../../App';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Shield, 
  Upload, 
  Download, 
  FileText, 
  Image, 
  Award,
  Lock,
  Eye,
  EyeOff,
  Search,
  Filter,
  Plus,
  Trash2,
  Share,
  Calendar
} from 'lucide-react';

interface DocumentVaultProps {
  role: UserRole;
  profile: UserProfile;
}

interface Document {
  id: string;
  name: string;
  type: 'certificate' | 'transcript' | 'resume' | 'portfolio' | 'recommendation' | 'other';
  size: string;
  uploadDate: Date;
  lastModified: Date;
  encrypted: boolean;
  shared: boolean;
  tags: string[];
  description?: string;
}

export default function DocumentVault({ role, profile }: DocumentVaultProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [showEncrypted, setShowEncrypted] = useState(false);

  const getDocuments = (): Document[] => {
    return [
      {
        id: '1',
        name: 'Academic Transcript 2023-2024',
        type: 'transcript',
        size: '2.3 MB',
        uploadDate: new Date('2024-01-15'),
        lastModified: new Date('2024-01-15'),
        encrypted: true,
        shared: false,
        tags: ['official', 'grades', 'semester-1'],
        description: 'Official transcript for fall semester 2023'
      },
      {
        id: '2',
        name: 'Python Programming Certificate',
        type: 'certificate',
        size: '1.8 MB',
        uploadDate: new Date('2024-02-10'),
        lastModified: new Date('2024-02-10'),
        encrypted: true,
        shared: true,
        tags: ['certification', 'programming', 'coursera'],
        description: 'Completed Python for Data Science course'
      },
      {
        id: '3',
        name: 'Updated Resume v3.2',
        type: 'resume',
        size: '156 KB',
        uploadDate: new Date('2024-03-05'),
        lastModified: new Date('2024-03-20'),
        encrypted: false,
        shared: false,
        tags: ['current', 'tech-focused'],
        description: 'Latest resume targeting software development roles'
      },
      {
        id: '4',
        name: 'Portfolio Website Screenshots',
        type: 'portfolio',
        size: '15.2 MB',
        uploadDate: new Date('2024-02-28'),
        lastModified: new Date('2024-03-15'),
        encrypted: false,
        shared: true,
        tags: ['portfolio', 'web-development', 'projects'],
        description: 'Screenshots and documentation of personal projects'
      },
      {
        id: '5',
        name: 'Professor Smith Recommendation',
        type: 'recommendation',
        size: '890 KB',
        uploadDate: new Date('2024-01-20'),
        lastModified: new Date('2024-01-20'),
        encrypted: true,
        shared: false,
        tags: ['recommendation', 'academic', 'professor'],
        description: 'Letter of recommendation for graduate applications'
      },
      {
        id: '6',
        name: 'Scholarship Application Documents',
        type: 'other',
        size: '4.1 MB',
        uploadDate: new Date('2024-02-01'),
        lastModified: new Date('2024-02-15'),
        encrypted: true,
        shared: false,
        tags: ['scholarship', 'financial-aid', 'essays'],
        description: 'Complete scholarship application package'
      }
    ];
  };

  const documents = getDocuments();

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterType === 'all' || doc.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'certificate':
        return <Award className="w-5 h-5 text-yellow-600" />;
      case 'transcript':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'resume':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'portfolio':
        return <Image className="w-5 h-5 text-purple-600" />;
      case 'recommendation':
        return <FileText className="w-5 h-5 text-indigo-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'certificate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'transcript':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resume':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'portfolio':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'recommendation':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleDocumentSelection = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStorageUsed = () => {
    const totalSize = documents.reduce((total, doc) => {
      const sizeNum = parseFloat(doc.size);
      const unit = doc.size.includes('MB') ? 1 : 0.001;
      return total + (sizeNum * unit);
    }, 0);
    return totalSize.toFixed(1);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Secure Document Vault</h1>
        <p className="text-xl text-gray-600">
          Safely store and manage your certificates, transcripts, and career documents
        </p>
      </div>

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="documents">My Documents</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          {/* Storage Overview */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">{documents.length}</p>
                  <p className="text-sm text-gray-600">Documents</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">{documents.filter(d => d.encrypted).length}</p>
                  <p className="text-sm text-gray-600">Encrypted</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Share className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">{documents.filter(d => d.shared).length}</p>
                  <p className="text-sm text-gray-600">Shared</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">{getStorageUsed()}</p>
                  <p className="text-sm text-gray-600">MB Used</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search documents and tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-3">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="certificate">Certificates</SelectItem>
                    <SelectItem value="transcript">Transcripts</SelectItem>
                    <SelectItem value="resume">Resumes</SelectItem>
                    <SelectItem value="portfolio">Portfolio</SelectItem>
                    <SelectItem value="recommendation">Recommendations</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => setShowEncrypted(!showEncrypted)}
                  className="flex items-center space-x-2"
                >
                  {showEncrypted ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{showEncrypted ? 'Hide' : 'Show'} Encrypted</span>
                </Button>
              </div>
            </div>

            {selectedDocuments.length > 0 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">
                  {selectedDocuments.length} document(s) selected
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Documents List */}
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <Card key={document.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.includes(document.id)}
                    onChange={() => toggleDocumentSelection(document.id)}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getTypeIcon(document.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-gray-900 truncate">{document.name}</h3>
                        {document.encrypted && (
                          <Lock className="w-4 h-4 text-green-600" />
                        )}
                        {document.shared && (
                          <Share className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <Badge variant="outline" className={getTypeColor(document.type)}>
                          {document.type}
                        </Badge>
                        <span>{document.size}</span>
                        <span>Modified {formatDate(document.lastModified)}</span>
                      </div>
                      
                      {document.description && (
                        <p className="text-sm text-gray-500 mt-1">{document.description}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {document.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card className="p-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-teal-600" />
              </div>
              
              <div>
                <h2 className="text-2xl text-gray-900 mb-2">Upload Documents</h2>
                <p className="text-gray-600">
                  Drag and drop files here or click to browse. All uploads are automatically encrypted.
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-teal-400 transition-colors cursor-pointer">
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-gray-900">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                  </div>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Browse Files
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-left">
                <div className="p-4 bg-green-50 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600 mb-2" />
                  <h3 className="text-green-900 mb-1">Automatically Encrypted</h3>
                  <p className="text-sm text-green-800">All files are encrypted using AES-256 encryption</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600 mb-2" />
                  <h3 className="text-blue-900 mb-1">Smart Categorization</h3>
                  <p className="text-sm text-blue-800">AI automatically categorizes and tags your documents</p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <Share className="w-6 h-6 text-purple-600 mb-2" />
                  <h3 className="text-purple-900 mb-1">Secure Sharing</h3>
                  <p className="text-sm text-purple-800">Share documents securely with time-limited access</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="shared" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl text-gray-900 mb-4">Shared Documents</h2>
            <div className="space-y-4">
              {documents.filter(doc => doc.shared).map((document) => (
                <div key={document.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(document.type)}
                    <div>
                      <h3 className="text-gray-900">{document.name}</h3>
                      <p className="text-sm text-gray-600">Shared on {formatDate(document.uploadDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                    <Button variant="outline" size="sm">
                      Revoke Access
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl text-gray-900 mb-6">Security Settings</h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="text-green-900 mb-2">Your Documents Are Secure</h3>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• All documents encrypted with AES-256 encryption</li>
                      <li>• Data stored in secure, compliant cloud infrastructure</li>
                      <li>• Regular security audits and updates</li>
                      <li>• You control all sharing and access permissions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg text-gray-900 mb-4">Privacy Controls</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span className="text-gray-900">Two-Factor Authentication</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Enabled
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span className="text-gray-900">Auto-logout (inactive)</span>
                      <span className="text-sm text-gray-600">30 minutes</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span className="text-gray-900">Document versioning</span>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-gray-900 mb-4">Data Management</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export All Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      View Activity Log
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account & Data
                    </Button>
                  </div>
                </div>
              </div>

              <Card className="p-4 bg-blue-50 border-blue-200">
                <h4 className="text-blue-900 mb-2">Data Retention Policy</h4>
                <p className="text-sm text-blue-800">
                  Your documents are retained securely for as long as your account is active. 
                  If you delete your account, all data is permanently deleted within 30 days. 
                  You can export your data at any time before deletion.
                </p>
              </Card>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}