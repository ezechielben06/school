
"use client";

import { useAuth } from '@/lib/auth-store';
import { AppShell } from '@/components/layout/app-shell';
import { StatCard } from '@/components/dashboard/stat-card';
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_GRADES, MOCK_RESOURCES } from '@/lib/mock-data';
import Link from 'next/link';

export default function DashboardPage() {
  const { role, user } = useAuth();

  if (role === 'student') {
    return (
      <AppShell>
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-2">Welcome back, {user?.name.split(' ')[0]}!</h2>
            <p className="text-muted-foreground">Here is what is happening with your studies today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Average Grade" 
              value="84%" 
              icon={GraduationCap} 
              trend={{ value: 2.5, isUp: true }} 
            />
            <StatCard 
              title="Courses" 
              value="5" 
              icon={BookOpen} 
              description="2 pending assignments" 
            />
            <StatCard 
              title="Attendance" 
              value="92%" 
              icon={CheckCircle} 
              iconColor="bg-accent/10 text-accent" 
            />
            <StatCard 
              title="Study Time" 
              value="12h" 
              icon={Clock} 
              description="This week"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Performance</CardTitle>
                  <CardDescription>Your latest grades and feedback</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/grades">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_GRADES.slice(0, 3).map((grade) => (
                    <div key={grade.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{grade.topic}</p>
                          <p className="text-xs text-muted-foreground">{grade.courseName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{grade.score}%</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">{grade.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Upcoming Tasks
                </CardTitle>
                <CardDescription className="text-primary-foreground/70">Don't forget these deadlines!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-white/10 space-y-1">
                  <p className="text-sm font-semibold">AI Neural Networks Assignment</p>
                  <p className="text-xs text-primary-foreground/60">Due Tomorrow, 11:59 PM</p>
                </div>
                <div className="p-3 rounded-lg bg-white/10 space-y-1">
                  <p className="text-sm font-semibold">Math Quiz: Linear Algebra</p>
                  <p className="text-xs text-primary-foreground/60">Due Friday, Mar 22</p>
                </div>
                <Button variant="secondary" className="w-full mt-4 bg-white text-primary hover:bg-white/90">
                  Open Planner
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h2 className="text-3xl font-bold font-headline mb-2">Professor Dashboard</h2>
          <p className="text-muted-foreground">Manage your classes, students, and resources efficiently.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Active Students" value="124" icon={Users} trend={{ value: 5, isUp: true }} />
          <StatCard title="Total Resources" value="48" icon={BookOpen} description="3 added this week" />
          <StatCard title="Class Avg" value="78.5%" icon={GraduationCap} />
          <StatCard title="Storage Used" value="1.2 GB" icon={FileText} description="of 5.0 GB" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Resource Engagement</CardTitle>
              <CardDescription>Which materials are most popular with students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_RESOURCES.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-3 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{resource.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">12 views</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Stay updated with class interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="h-2 w-2 rounded-full bg-accent mt-1.5" />
                  <div>
                    <p className="text-sm"><strong>Alex Johnson</strong> submitted <em>Assignment 4</em></p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                  <div>
                    <p className="text-sm">You uploaded <strong>Lecture Notes: Neural Networks</strong></p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="h-2 w-2 rounded-full bg-accent mt-1.5" />
                  <div>
                    <p className="text-sm"><strong>Maria Garcia</strong> requested help with <em>Linear Algebra</em></p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
