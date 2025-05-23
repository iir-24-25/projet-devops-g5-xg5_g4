import React from 'react';
import { ArrowUpRight, Calendar, Users, FileQuestion } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Cardadmin';
import { StatsCard } from '../components/dashboard/StatsCard';
import { Button } from '../components/ui/Buttonadmin';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Admin</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your quizzes today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Users"
          value="1,248"
          icon={<Users size={24} className="text-indigo-600" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Quizzes"
          value="32"
          icon={<FileQuestion size={24} className="text-indigo-600" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Completed Sessions"
          value="928"
          icon={<Calendar size={24} className="text-indigo-600" />}
          trend={{ value: 4, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start">
                  <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-medium">
                      {['JD', 'SK', 'RM', 'AT', 'BL'][i - 1]}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {['John Doe', 'Sarah Kim', 'Rachel Ming', 'Alex Thompson', 'Ben Liu'][i - 1]}{' '}
                      {[
                        'completed the JavaScript Basics quiz with 92%.',
                        'created a new Python Advanced quiz.',
                        'joined as a new student.',
                        'updated their profile information.',
                        'scored 100% on the React Fundamentals quiz.',
                      ][i - 1]}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {['2 hours ago', '3 hours ago', 'Yesterday at 3:45 PM', 'Yesterday at 1:30 PM', '2 days ago'][i - 1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button
                variant="ghost"
                className="text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                <span>View all activities</span>
                <ArrowUpRight size={16} className="ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'JavaScript Fundamentals', completion: 94 },
                { title: 'React Basics', completion: 89 },
                { title: 'CSS Layouts', completion: 83 },
                { title: 'Python for Beginners', completion: 78 },
                { title: 'Data Structures', completion: 72 },
              ].map((quiz, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{quiz.title}</span>
                    <span className="text-sm font-medium text-gray-900">{quiz.completion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${quiz.completion}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button
                variant="ghost"
                className="text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                <span>View all quizzes</span>
                <ArrowUpRight size={16} className="ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};