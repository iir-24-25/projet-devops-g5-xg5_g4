import React from 'react';
import { Card, CardContent } from '../ui/Cardadmin';

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  className,
}) => {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
            
            {trend && (
              <div className="mt-2 flex items-center">
                <span
                  className={`text-sm font-medium ${
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                </span>
                <span className="ml-1 text-sm text-gray-500">from last month</span>
              </div>
            )}
          </div>
          
          <div className="p-2 bg-indigo-50 rounded-lg">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};