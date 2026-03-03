
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
  TrendingUp,
  MessageSquare,
  ArrowRight,
  Zap,
  Calendar as CalendarIcon,
  Award,
  Flame,
  Trophy,
  Target,
  Users,
  Activity,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_ACTIVITIES, MOCK_UPCOMING_EVENTS, MOCK_COURSES } from '@/lib/mock-data';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const chartData = [
  { name: 'Jan', score: 65, avg: 60 },
  { name: 'Fév', score: 72, avg: 62 },
  { name: 'Mar', score: 84, avg: 65 },
  { name: 'Avr', score: 78, avg: 64 },
  { name: 'Mai', score: 90, avg: 68 },
];

const subjectData = [
  { subject: 'Maths', value: 85, id: 'c-1' },
  { subject: 'IA', value: 92, id: 'c-2' },
  { subject: 'Physique', value: 74, id: 'c-3' },
  { subject: 'Design', value: 88, id: 'c-4' },
];

const engagementData = [
  { name: 'Lun', engagement: 65 },
  { name: 'Mar', engagement: 88 },
  { name: 'Mer', engagement: 72 },
  { name: 'Jeu', engagement: 95 },
  { name: 'Ven', engagement: 82 },
];

export default function DashboardPage() {
  const { role, user } = useAuth();

  if (role === 'student') {
    return (
      <AppShell>
        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge className="bg-primary/20 text-primary border-none hover:bg-primary/30 font-bold">Semestre 2</Badge>
                <div className="flex items-center gap-1 text-[10px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                  <Flame className="h-3 w-3 fill-current" /> 12 Jours de Série
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tight text-slate-900">Ravi de vous voir, {user?.name.split(' ')[0]}! 🚀</h2>
              <p className="text-slate-500 text-base md:text-lg">Votre progression est en hausse de <span className="text-primary font-black">12%</span> cette semaine.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Link href="/dashboard" className="flex-1 md:flex-none">
                <Button size="lg" variant="outline" className="w-full gap-2 border-2 hover:bg-slate-50 transition-colors h-12 md:h-14 rounded-2xl font-bold">
                  <CalendarIcon className="h-4 w-4" /> <span className="hidden sm:inline">Planning</span>
                </Button>
              </Link>
              <Link href="/ai-tutor" className="flex-1 md:flex-none">
                <Button size="lg" className="w-full shadow-xl shadow-primary/20 gap-2 bg-gradient-to-r from-primary to-accent border-none text-white font-bold h-12 md:h-14 rounded-2xl hover:scale-105 transition-transform">
                  <Zap className="h-4 w-4 fill-current" /> <span className="hidden sm:inline">Mode Révision</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Link href="/grades" className="block">
              <StatCard 
                title="Moyenne" 
                value="84.2%" 
                icon={Award} 
                trend={{ value: 4.8, isUp: true }}
                className="bg-white border-t-4 border-t-primary h-full hover:shadow-xl transition-shadow"
              />
            </Link>
            <StatCard 
              title="Points XP" 
              value="2,450" 
              icon={Trophy} 
              iconColor="bg-amber-100 text-amber-600"
              className="bg-white border-t-4 border-t-amber-500"
            />
            <StatCard 
              title="Objectifs" 
              value="8/10" 
              icon={Target} 
              iconColor="bg-emerald-100 text-emerald-600"
              className="bg-white border-t-4 border-t-emerald-500"
            />
            <StatCard 
              title="Temps d'Étude" 
              value="24h" 
              icon={Clock} 
              iconColor="bg-indigo-100 text-indigo-600"
              className="bg-white border-t-4 border-t-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <Card className="border-none shadow-2xl overflow-hidden bg-white/70 backdrop-blur-md rounded-[2rem]">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2 font-headline text-slate-900">
                      <TrendingUp className="h-5 w-5 text-primary" /> Performance Académique
                    </CardTitle>
                    <CardDescription>Comparaison avec la moyenne de classe</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="h-[250px] md:h-[320px] w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                      />
                      <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                      <Area type="monotone" dataKey="avg" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-2xl bg-white rounded-[2rem]">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2 font-headline text-slate-900">
                      <CalendarIcon className="h-5 w-5 text-primary" /> Agenda du Jour
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-2">
                    {MOCK_UPCOMING_EVENTS.slice(0, 3).map((event) => (
                      <Link key={event.id} href={`/courses/${event.course === 'CS302' ? 'c-2' : event.course === 'MATH401' ? 'c-1' : 'c-3'}`}>
                        <div className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-50 bg-white hover:shadow-lg hover:border-primary/20 transition-all group cursor-pointer">
                          <div className="text-center min-w-[60px] border-r border-slate-100 pr-4">
                            <p className="text-xs font-black text-primary">{event.time.split(' ')[0]}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">{event.date}</p>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-black text-slate-900 text-sm truncate leading-none">{event.title}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">{event.course}</p>
                          </div>
                          <Badge variant={event.type === 'exam' ? 'destructive' : 'secondary'} className="text-[9px] font-black uppercase hidden sm:flex">
                            {event.type}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-none shadow-2xl bg-white rounded-[2rem]">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-headline text-slate-900">Maîtrise des Sujets</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-2">
                    {subjectData.map((s, i) => (
                      <Link key={i} href={`/courses/${s.id}`}>
                        <div className="space-y-3 cursor-pointer group">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-slate-400 group-hover:text-primary transition-colors">{s.subject}</span>
                            <span className="text-primary">{s.value}%</span>
                          </div>
                          <Progress value={s.value} className="h-2 bg-slate-50 group-hover:bg-primary/10 transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <Card className="border-none shadow-2xl bg-gradient-to-br from-rose-500 to-rose-600 text-white overflow-hidden relative group rounded-[2rem]">
                <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                  <AlertCircle className="h-32 w-32" />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white font-headline">
                    <Zap className="h-5 w-5 fill-current text-yellow-300" />
                    Focus Urgent
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div className="p-5 rounded-[1.5rem] bg-white/10 backdrop-blur-md border border-white/20 space-y-4">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-black">Quiz IA Final</p>
                      <Badge className="bg-white text-rose-600 border-none font-black text-[10px]">J-2</Badge>
                    </div>
                    <p className="text-xs opacity-90 leading-relaxed font-medium">
                      "Il vous reste 3 chapitres non consultés avant l'examen de jeudi."
                    </p>
                    <Link href="/courses/c-2">
                      <Button variant="secondary" className="w-full bg-white text-rose-600 hover:bg-white/90 font-black h-11 rounded-xl shadow-lg">
                        Démarrer les révisions
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-2xl bg-white rounded-[2rem] overflow-hidden">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg flex items-center gap-2 font-headline text-slate-900">
                    <MessageSquare className="h-5 w-5 text-primary" /> Activité Communauté
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-50 max-h-[350px] md:max-h-[450px] overflow-auto">
                    {MOCK_ACTIVITIES.map((act) => (
                      <Link key={act.id} href="/resources">
                        <div className="p-4 flex gap-4 hover:bg-primary/5 transition-colors cursor-pointer group">
                          <Avatar className="h-10 w-10 border-2 border-white shadow-md group-hover:scale-110 transition-transform">
                            <AvatarImage src={act.avatar} />
                            <AvatarFallback className="font-bold">{act.user[0]}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-xs font-black text-slate-900 leading-none mb-1">{act.user}</p>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                              {act.action} <span className="font-black text-primary">{act.target}</span>
                            </p>
                            <p className="text-[9px] font-bold text-slate-400 mt-1 flex items-center gap-1 uppercase tracking-widest">
                               <Clock className="h-3 w-3" /> {act.time}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="p-6 text-center border-t bg-slate-50/50">
                    <Link href="/resources">
                      <Button variant="ghost" size="sm" className="text-primary font-black gap-2 hover:bg-transparent rounded-xl uppercase text-[10px] tracking-[0.2em]">
                        Voir toute l'activité <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  // PROFESSOR DASHBOARD VIEW
  return (
    <AppShell>
      <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className="bg-emerald-500 text-white border-none font-bold uppercase tracking-wider text-[10px]">Statut : En Direct</Badge>
              <div className="flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                <Activity className="h-3 w-3" /> Analyse Prédictive Active
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tight text-slate-900">Command Center 🏛️</h2>
            <p className="text-slate-500 text-base md:text-lg font-medium">Gérez vos cohortes et optimisez l'apprentissage avec l'IA.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
             <Link href="/dashboard" className="flex-1 md:flex-none">
               <Button variant="outline" className="w-full gap-2 border-2 h-12 md:h-14 px-8 rounded-2xl hover:bg-white hover:shadow-lg transition-all font-bold">
                 <CalendarIcon className="h-5 w-5 text-primary" /> Planning
               </Button>
             </Link>
             <Link href="/admin" className="flex-1 md:flex-none">
               <Button className="w-full gap-2 shadow-2xl shadow-primary/30 h-12 md:h-14 px-8 bg-primary text-white font-black border-none rounded-2xl hover:scale-105 transition-transform">
                 <Zap className="h-5 w-5 fill-current" /> Nouveau Projet
               </Button>
             </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard title="Étudiants Actifs" value="124" icon={Users} trend={{ value: 12, isUp: true }} className="bg-white shadow-xl shadow-slate-200/50 border-none" />
          <StatCard title="Ressources" value="48" icon={BookOpen} iconColor="bg-blue-100 text-blue-600" className="bg-white shadow-xl shadow-slate-200/50 border-none" />
          <StatCard title="Moyenne" value="78.5%" icon={GraduationCap} iconColor="bg-amber-100 text-amber-600" className="bg-white shadow-xl shadow-slate-200/50 border-none" />
          <StatCard title="Taux Rendu" value="94%" icon={CheckCircle} iconColor="bg-emerald-100 text-emerald-600" className="bg-white shadow-xl shadow-slate-200/50 border-none" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
           <Card className="lg:col-span-2 border-none shadow-2xl bg-white overflow-hidden rounded-[2.5rem]">
             <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50/50 border-b p-6 md:p-8 gap-4">
               <div>
                 <CardTitle className="text-xl md:text-2xl font-black font-headline flex items-center gap-2 text-slate-900">
                   <BarChart3 className="h-6 w-6 text-primary" /> Engagement par Cours
                 </CardTitle>
                 <CardDescription className="text-sm md:text-base">Participation et rétention moyenne des étudiants</CardDescription>
               </div>
               <div className="flex gap-4 items-center">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Global</p>
                    <p className="text-xl font-black text-emerald-500">+8.2%</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 font-black border-none px-4 py-2 rounded-xl hidden sm:flex">Excellent</Badge>
               </div>
             </CardHeader>
             <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6 pt-4">
                     {[
                       { name: 'Intelligence Artificielle', val: 94, color: 'hsl(var(--primary))', id: 'c-2' },
                       { name: 'Mathématiques Avancées', val: 62, color: '#f59e0b', id: 'c-1' },
                       { name: 'Bio-Informatique', val: 78, color: '#6366f1', id: 'c-6' },
                       { name: 'Design UI/UX', val: 88, color: '#10b981', id: 'c-4' }
                     ].map((c, i) => (
                        <Link key={i} href={`/courses/${c.id}`}>
                          <div className="space-y-3 cursor-pointer group">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                              <span className="text-slate-500 flex items-center gap-2 group-hover:text-primary transition-colors">
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                                {c.name}
                              </span>
                              <span className="text-primary font-black text-sm">{c.val}%</span>
                            </div>
                            <Progress value={c.val} className="h-2.5 bg-slate-100" />
                          </div>
                        </Link>
                     ))}
                  </div>
                  <div className="h-[200px] md:h-[250px] w-full mt-4 md:mt-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={engagementData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                        <YAxis hide />
                        <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="engagement" radius={[8, 8, 0, 0]}>
                          {engagementData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 3 ? 'hsl(var(--primary))' : '#e2e8f0'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
             </CardContent>
           </Card>

           <div className="space-y-6 md:space-y-8">
             <Card className="border-none shadow-2xl bg-white overflow-hidden rounded-[2.5rem]">
               <CardHeader className="bg-slate-900 text-white p-6 md:p-8">
                 <CardTitle className="text-xl font-headline flex items-center gap-2 uppercase tracking-tighter">
                   <AlertCircle className="h-5 w-5 text-rose-500 fill-current" /> Centre d'Alertes
                 </CardTitle>
                 <CardDescription className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Actions immédiates requises</CardDescription>
               </CardHeader>
               <CardContent className="p-4 md:p-6 space-y-4 pt-6 md:pt-8">
                  <div className="flex flex-col sm:flex-row gap-4 p-5 rounded-[2rem] bg-rose-50 border-2 border-rose-100 shadow-sm group hover:bg-rose-100/50 transition-all">
                     <div className="h-12 w-12 rounded-2xl bg-rose-500 flex items-center justify-center shrink-0 shadow-lg shadow-rose-200">
                        <CheckCircle className="h-6 w-6 text-white" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-rose-900 uppercase tracking-tight">12 copies à corriger</p>
                        <p className="text-xs text-rose-700 mt-1 font-medium italic">Quiz : IA (Retard J-2)</p>
                        <Link href="/courses/c-2">
                          <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white font-black h-9 px-6 rounded-xl shadow-md mt-3 w-full">Corriger</Button>
                        </Link>
                     </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 p-5 rounded-[2rem] bg-amber-50 border-2 border-amber-100 shadow-sm group hover:bg-amber-100/50 transition-all">
                     <div className="h-12 w-12 rounded-2xl bg-amber-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-200">
                        <MessageSquare className="h-6 w-6 text-white" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-amber-900 uppercase tracking-tight">Question Prioritaire</p>
                        <p className="text-xs text-amber-700 mt-1 font-medium">Alex Johnson attend votre retour.</p>
                        <Link href="/admin">
                          <Button size="sm" variant="outline" className="border-amber-200 text-amber-800 bg-white font-black h-9 px-6 rounded-xl shadow-sm hover:bg-amber-100 mt-3 w-full">Répondre</Button>
                        </Link>
                     </div>
                  </div>
               </CardContent>
               <CardFooter className="p-6 border-t bg-slate-50/50 text-center">
                  <Link href="/dashboard" className="w-full">
                    <Button variant="ghost" size="sm" className="text-slate-400 font-black gap-2 hover:bg-transparent uppercase tracking-widest text-[10px]">
                      Voir tout l'historique d'alertes <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
               </CardFooter>
             </Card>

             <Card className="border-none shadow-2xl bg-gradient-to-br from-primary to-accent p-1 overflow-hidden group rounded-[2.5rem]">
                <CardContent className="bg-white rounded-[calc(var(--radius)-4px)] p-6 md:p-8">
                   <div className="flex items-center justify-between mb-6">
                      <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="h-8 w-8 text-primary" />
                      </div>
                      <Badge className="bg-emerald-500 text-white border-none font-black text-[10px] px-3 py-1">+14%</Badge>
                   </div>
                   <h4 className="text-xl font-black font-headline text-slate-900 mb-2">Croissance Engagement</h4>
                   <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">L'utilisation des ressources IA a augmenté significativement ce mois-ci.</p>
                   <Link href="/dashboard">
                    <Button className="w-full bg-primary text-white font-black rounded-xl h-12 shadow-xl shadow-primary/20 hover:scale-105 transition-transform">Voir analyses</Button>
                   </Link>
                </CardContent>
             </Card>
           </div>
        </div>
      </div>
    </AppShell>
  );
}
