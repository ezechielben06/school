
"use client";

import { useAuth } from '@/lib/auth-store';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Settings, 
  Plus, 
  ChevronRight, 
  MoreVertical,
  Mail,
  ArrowUpRight,
  BookMarked,
  ShieldCheck,
  Search,
  Filter,
  Download,
  LayoutGrid,
  List
} from 'lucide-react';
import { MOCK_COURSES } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

export default function AdminPage() {
  const { role } = useAuth();

  if (role !== 'professor') return null;

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Espace Administrateur</span>
            </div>
            <h2 className="text-4xl font-black font-headline tracking-tight text-slate-900">Administration</h2>
            <p className="text-slate-500 text-lg font-medium">Supervisez vos cursus, rosters et paramètres globaux.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 h-14 px-8 rounded-2xl border-2 font-bold hover:bg-white hover:shadow-lg transition-all">
               <Settings className="h-5 w-5" /> Paramètres
            </Button>
            <Button className="gap-2 shadow-2xl shadow-primary/30 h-14 px-8 bg-primary text-white font-black border-none rounded-2xl hover:scale-105 transition-transform">
              <Plus className="h-5 w-5" /> Créer un Cours
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input className="pl-12 h-14 rounded-2xl bg-white border-none shadow-xl shadow-slate-200/50 focus:ring-2 focus:ring-primary transition-all text-lg font-medium" placeholder="Rechercher un cours, un prof ou un étudiant..." />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-14 w-14 rounded-2xl border-none bg-white shadow-xl shadow-slate-200/50 p-0 hover:text-primary transition-colors">
              <LayoutGrid className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="h-14 w-14 rounded-2xl border-none bg-white shadow-xl shadow-slate-200/50 p-0 text-slate-400">
              <List className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="h-14 px-8 gap-2 rounded-2xl border-none bg-white shadow-xl shadow-slate-200/50 font-bold hover:text-primary transition-colors">
              <Filter className="h-5 w-5" /> Filtres
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black font-headline flex items-center gap-3 text-slate-900">
                <BookMarked className="h-7 w-7 text-primary" />
                Vos Cursus Actifs
              </h3>
              <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold border-none px-4 py-1.5 rounded-lg">{MOCK_COURSES.length} Cours au total</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_COURSES.map((course) => (
                <Card key={course.id} className="border-none shadow-2xl bg-white hover:scale-[1.02] transition-all duration-300 group overflow-hidden">
                  <div className="h-2 w-full bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className="px-3 py-1.5 bg-primary/10 rounded-xl text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                        {course.code}
                      </div>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-slate-100">
                        <MoreVertical className="h-5 w-5 text-slate-400" />
                      </Button>
                    </div>
                    <CardTitle className="text-2xl font-black leading-tight group-hover:text-primary transition-colors">{course.name}</CardTitle>
                    <CardDescription className="line-clamp-2 text-base font-medium text-slate-500 mt-2">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 pb-8 flex items-center justify-between border-t border-slate-50 pt-6 mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                          <Avatar key={i} className="h-9 w-9 border-4 border-white shadow-sm ring-1 ring-slate-100">
                            <AvatarImage src={`https://picsum.photos/seed/student-${course.id}-${i}/100/100`} />
                            <AvatarFallback>S</AvatarFallback>
                          </Avatar>
                        ))}
                        <div className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 border-4 border-white shadow-sm ring-1 ring-slate-100">
                          +29
                        </div>
                      </div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        32 Inscrits
                      </div>
                    </div>
                    <Button variant="ghost" className="gap-2 text-primary font-black p-0 hover:bg-transparent hover:translate-x-1 transition-transform">
                      Gérer <ChevronRight className="h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black font-headline flex items-center gap-3 text-slate-900">
                <Users className="h-7 w-7 text-accent" />
                Roster Étudiant
              </h3>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white shadow-sm">
                <Download className="h-4 w-4 text-slate-400" />
              </Button>
            </div>
            
            <Card className="border-none shadow-2xl bg-white overflow-hidden rounded-[2.5rem]">
              <CardContent className="p-0">
                <div className="divide-y divide-slate-50">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 border-2 border-white shadow-xl ring-1 ring-slate-100 group-hover:scale-110 transition-transform">
                          <AvatarImage src={`https://picsum.photos/seed/student-admin-${i}/150/150`} />
                          <AvatarFallback className="font-bold">S{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-lg font-black text-slate-900 leading-tight">Étudiant Nom {i}</p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Actif dans 3 cursus</p>
                        </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white shadow-md border hover:text-primary">
                          <Mail className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white shadow-md border hover:text-primary">
                          <ArrowUpRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-8 border-t bg-slate-50/50 text-center">
                  <Button variant="link" className="text-primary font-black uppercase tracking-widest text-xs gap-2">
                    Voir tout le roster <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Actions Footer */}
            <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden group shadow-2xl">
               <div className="relative z-10">
                 <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3">Statut Système</p>
                 <h4 className="text-2xl font-black font-headline mb-4 leading-tight">Tout est opérationnel.</h4>
                 <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                      <span>Stockage Hub</span>
                      <span className="text-white">74%</span>
                    </div>
                    <Progress value={74} className="h-2 bg-white/10" />
                 </div>
                 <Button className="w-full bg-white text-slate-900 font-black h-12 rounded-xl hover:bg-primary hover:text-white transition-all shadow-xl shadow-black/50">Maintenance Serveur</Button>
               </div>
               <ShieldCheck className="absolute -bottom-10 -right-10 h-40 w-40 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
