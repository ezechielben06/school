
"use client";

import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-store';
import { AppShell } from '@/components/layout/app-shell';
import { MOCK_COURSES, MOCK_RESOURCES, MOCK_GRADES } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Video, 
  ArrowLeft, 
  Download, 
  PlayCircle,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { role } = useAuth();
  const courseId = params.id as string;

  const course = MOCK_COURSES.find(c => c.id === courseId);
  const resources = MOCK_RESOURCES.filter(r => r.courseId === courseId);
  const grades = MOCK_GRADES.filter(g => g.courseId === courseId);

  if (!course) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <h2 className="text-2xl font-black">Cours non trouvé</h2>
          <Button onClick={() => router.back()}>Retour</Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl h-12 w-12 bg-white shadow-sm border">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] uppercase tracking-widest px-3 py-1">
                {course.code}
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-400 font-bold text-[10px] uppercase tracking-widest px-3 py-1">
                Semestre 2
              </Badge>
            </div>
            <h2 className="text-4xl font-black font-headline tracking-tight text-slate-900">{course.name}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary via-accent to-primary p-12 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-sm font-black uppercase tracking-[0.3em] mb-4 opacity-80">Description du Cursus</p>
                  <p className="text-xl font-medium max-w-2xl leading-relaxed">
                    {course.description}
                  </p>
                </div>
                <BookOpen className="absolute -bottom-10 -right-10 h-64 w-64 text-white/10 rotate-12" />
              </div>
              <CardContent className="p-8">
                <div className="flex flex-wrap gap-8 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-4 border-white shadow-xl">
                      <AvatarImage src={`https://picsum.photos/seed/${course.professorId}/200/200`} />
                      <AvatarFallback>PR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Enseignant responsable</p>
                      <p className="text-lg font-black text-slate-900">Dr. Sarah Mitchell</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Étudiants inscrits</p>
                      <p className="text-lg font-black text-slate-900">32 participants</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-accent">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Dernière mise à jour</p>
                      <p className="text-lg font-black text-slate-900">Il y a 2 jours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black font-headline flex items-center gap-3">
                  <FileText className="h-7 w-7 text-primary" />
                  Supports de Cours
                </h3>
                <Badge className="bg-slate-100 text-slate-500 font-bold border-none px-4 py-1.5 rounded-lg">{resources.length} Fichiers</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map((res) => (
                  <Card key={res.id} className="border-none shadow-lg bg-white hover:bg-slate-50 transition-all cursor-pointer group rounded-2xl">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${
                          res.type === 'video' ? 'bg-rose-50 text-rose-500' : 
                          res.type === 'link' ? 'bg-emerald-50 text-emerald-500' : 
                          'bg-blue-50 text-blue-500'
                        }`}>
                          {res.type === 'video' ? <Video className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-slate-900 truncate leading-tight">{res.title}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{res.category}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="group-hover:text-primary">
                        {res.type === 'link' ? <ExternalLink className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
              <CardHeader className="bg-slate-900 text-white p-8">
                <CardTitle className="text-xl font-headline flex items-center gap-3">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  Maîtrise du Cours
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="text-center pb-4 border-b">
                  <p className="text-5xl font-black text-slate-900">84%</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Score de maîtrise estimé</p>
                </div>
                
                <div className="space-y-6">
                  {grades.map((g) => (
                    <div key={g.id} className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-500">{g.topic}</span>
                        <span className="text-primary">{g.score}%</span>
                      </div>
                      <Progress value={g.score} className="h-2 bg-slate-100" />
                    </div>
                  ))}
                </div>

                <Link href="/ai-tutor" className="block">
                  <Button className="w-full bg-primary font-black h-12 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                    Lancer une séance AI Tutor
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[2.5rem] overflow-hidden p-8 relative">
              <div className="relative z-10">
                <h4 className="text-2xl font-black font-headline mb-4">Prochain Événement</h4>
                <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black">Examen Final</p>
                      <p className="text-[10px] uppercase font-bold text-white/60">Lundi, 10:00 - 12:00</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white hover:text-slate-900 font-black h-10">Ajouter au calendrier</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
