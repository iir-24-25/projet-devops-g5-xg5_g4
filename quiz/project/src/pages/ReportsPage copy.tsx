import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Cardadmin';
import { BarChart, LineChart } from '../components/charts/Charts';
import { Download } from 'lucide-react';
import { Button } from '../components/ui/Buttonadmin';

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">View detailed insights about quiz performance and user engagement.</p>
        </div>
        <Button onClick={() => console.log('Download report')}>
          <Download size={18} className="mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Completion Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <LineChart />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Performance by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <BarChart />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Programming', count: 450, percentage: 85 },
                { name: 'Web Development', count: 380, percentage: 72 },
                { name: 'Data Science', count: 310, percentage: 58 },
                { name: 'Design', count: 280, percentage: 53 },
                { name: 'Business', count: 240, percentage: 45 },
              ].map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.count} users</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: 'John Doe', action: 'Completed JavaScript Quiz', score: 95, time: '2 hours ago' },
                { user: 'Sarah Kim', action: 'Started React Basics', score: null, time: '3 hours ago' },
                { user: 'Mike Johnson', action: 'Completed Python Quiz', score: 88, time: '5 hours ago' },
                { user: 'Emily Chen', action: 'Completed CSS Layout', score: 92, time: '6 hours ago' },
                { user: 'Alex Brown', action: 'Started Data Structures', score: null, time: '8 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    {activity.score && (
                      <p className="text-sm font-medium text-green-600">{activity.score}%</p>
                    )}
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};