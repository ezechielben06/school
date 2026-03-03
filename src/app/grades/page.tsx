
"use client";

import { useAuth } from '@/lib/auth-store';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { MOCK_GRADES } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Download, LineChart } from 'lucide-react';

export default function GradesPage() {
  const { role } = useAuth();

  const getStatusColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    if (score >= 60) return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold font-headline">Academic Grades</h2>
            <p className="text-muted-foreground">
              {role === 'student' 
                ? 'Track your progress and view detailed performance reports.' 
                : 'Manage student records and performance data.'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
            {role === 'professor' && (
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Add Grade
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Assessments</CardTitle>
                  <CardDescription>Academic performance across all courses</CardDescription>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <LineChart className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/10">
                    <TableHead className="font-bold">Course</TableHead>
                    <TableHead className="font-bold">Topic</TableHead>
                    <TableHead className="font-bold">Date</TableHead>
                    <TableHead className="font-bold text-right">Score</TableHead>
                    <TableHead className="font-bold text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_GRADES.map((grade) => (
                    <TableRow key={grade.id} className="hover:bg-muted/20 transition-colors">
                      <TableCell className="font-medium">{grade.courseName}</TableCell>
                      <TableCell>{grade.topic}</TableCell>
                      <TableCell className="text-muted-foreground">{grade.date}</TableCell>
                      <TableCell className="text-right font-bold">{grade.score}/{grade.maxScore}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={getStatusColor(grade.score)}>
                          {grade.score >= 80 ? 'Excellent' : grade.score >= 60 ? 'Satisfactory' : 'Action Needed'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
