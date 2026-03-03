
"use client";

import { useAuth } from '@/lib/auth-store';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Settings, 
  Plus, 
  ChevronRight, 
  MoreVertical,
  Mail,
  ArrowUpRight,
  BookMarked
} from 'lucide-react';
import { MOCK_COURSES } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AdminPage() {
  const { role } = useAuth();

  if (role !== 'professor') return null;

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold font-headline">Administration</h2>
            <p className="text-muted-foreground">Oversee your classes, rosters, and educational settings.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
               <Settings className="h-4 w-4" /> Settings
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Create Course
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold font-headline flex items-center gap-2">
              <BookMarked className="h-5 w-5 text-primary" />
              Your Courses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_COURSES.map((course) => (
                <Card key={course.id} className="border-none shadow-sm hover:ring-1 hover:ring-primary/50 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="px-2 py-1 bg-primary/10 rounded text-[10px] font-bold text-primary uppercase tracking-wider">
                        {course.code}
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="mt-2 text-lg">{course.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 flex items-center justify-between border-t mt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>32 Students</span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary p-0">
                      Manage <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
             <h3 className="text-xl font-bold font-headline flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              Student Roster
            </h3>
            <Card className="border-none shadow-sm">
              <CardContent className="p-0">
                <div className="divide-y">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`https://picsum.photos/seed/student-${i}/100/100`} />
                          <AvatarFallback>S{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold">Student Name {i}</p>
                          <p className="text-xs text-muted-foreground">Active in 3 courses</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t text-center">
                  <Button variant="link" className="text-xs">View Full Roster</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
