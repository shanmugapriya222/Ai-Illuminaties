import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { 
  X, 
  Send, 
  MessageCircle, 
  Bot,
  User
} from 'lucide-react';

interface ChatbotProps {
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const predefinedQA = [
  {
    question: "What skills should I learn for Data Science?",
    answer: "Focus on Python programming, statistics, and machine learning basics. Start with pandas and numpy for data manipulation, then move on to scikit-learn for machine learning. Don't forget soft skills like problem-solving and communication!"
  },
  {
    question: "How do I apply for scholarships?",
    answer: "Check the Opportunities Hub for available scholarships. Most require an application form, essay, and transcripts. Start early - many have deadlines 3-6 months in advance. Don't forget to highlight your achievements and community involvement!"
  },
  {
    question: "What's the best way to prepare for interviews?",
    answer: "Practice common behavioral questions, research the company thoroughly, and prepare specific examples of your achievements using the STAR method (Situation, Task, Action, Result). Mock interviews with friends or career services are extremely helpful!"
  },
  {
    question: "How can I build a strong resume?",
    answer: "Focus on quantifiable achievements rather than just job duties. Use action verbs, keep it to 1-2 pages, and tailor it for each application. Include relevant coursework, projects, and volunteer work. Have someone review it for errors!"
  },
  {
    question: "What internships should I pursue?",
    answer: "Look for internships that align with your career goals and interests. Don't just focus on big companies - smaller organizations often provide more hands-on experience. Apply early, typically 3-4 months before the start date."
  },
  {
    question: "How do I network effectively?",
    answer: "Start with your school's alumni network and career fairs. Use LinkedIn to connect with professionals in your field. Attend industry events and join relevant professional organizations. Remember, networking is about building genuine relationships, not just asking for favors!"
  }
];

export default function Chatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI Career Mentor. I can help answer questions about career development, skills, and opportunities. Try asking me something!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Find matching Q&A or provide default response
    const matchedQA = predefinedQA.find(qa => 
      inputValue.toLowerCase().includes(qa.question.toLowerCase().split(' ').slice(0, 2).join(' '))
    );

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: matchedQA ? matchedQA.answer : "That's a great question! While I have some pre-programmed responses, I'd recommend checking the other sections of your dashboard for more detailed information. You can also explore the Skills, Careers, and Opportunities sections for comprehensive guidance.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputValue('');
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    handleSendMessage();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900">AI Career Mentor</h3>
            <p className="text-sm text-green-600">Online</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-teal-600' 
                      : 'bg-gray-200'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
                <p className={`text-xs text-gray-500 mt-1 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Quick Questions */}
      <div className="p-4 border-t border-gray-200">
        <h4 className="text-sm text-gray-700 mb-2">Quick Questions:</h4>
        <div className="space-y-2 mb-4">
          {predefinedQA.slice(0, 3).map((qa, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="w-full text-left text-xs h-auto p-2 justify-start"
              onClick={() => handleQuickQuestion(qa.question)}
            >
              {qa.question}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          This is a demo chatbot with pre-written responses
        </p>
      </div>
    </div>
  );
}