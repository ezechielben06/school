
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
  Star,
  Trophy,
  Target,
  Users,
  Search,
  Activity,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_ACTIVITIES, MOCK_UPCOMING_EVENTS } from '@/lib/mock-data';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  { subject: 'Maths', value: 85 },
  { subject: 'IA', value: 92 },
  { subject: 'Physique', value: 74 },
  { subject: 'Design', value: 88 },
  { subject: 'Bio', value: 68 },
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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary/20 text-primary border-none hover:bg-primary/30 font-bold">Semestre 2</Badge>
                <div className="flex items-center gap-1 text-[10px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">
                  <Flame className="h-3 w-3 fill-current" /> 12 Jours de Série
                </div>
              </div>
              <h2 className="text-4xl font-extrabold font-headline tracking-tight">Ravi de vous voir, {user?.name.split(' ')[0]}! 🚀</h2>
              <p className="text-muted-foreground text-lg">Votre progression est en hausse de <span className="text-primary font-bold">12%</span> cette semaine.</p>
            </div>
            <div className="flex gap-3">
              <Button size="lg" variant="outline" className="gap-2 border-2 hover:bg-slate-50 transition-colors">
                <CalendarIcon className="h-4 w-4" /> Planning
              </Button>
              <Button size="lg" className="shadow-xl shadow-primary/20 gap-2 bg-gradient-to-r from-primary to-accent border-none text-white font-bold hover:scale-105 transition-transform">
                <Zap className="h-4 w-4 fill-current" /> Mode Révision
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Moyenne" 
              value="84.2%" 
              icon={Award} 
              trend={{ value: 4.8, isUp: true }}
              className="bg-white/50 border-t-4 border-t-primary"
            />
            <StatCard 
              title="Points XP" 
              value="2,450" 
              icon={Trophy} 
              description="+150 aujourd'hui"
              iconColor="bg-amber-100 text-amber-600"
            />
            <StatCard 
              title="Objectifs" 
              value="8/10" 
              icon={Target} 
              iconColor="bg-emerald-100 text-emerald-600" 
              description="Objectifs mensuels"
            />
            <StatCard 
              title="Temps d'Étude" 
              value="24h" 
              icon={Clock} 
              description="Cette semaine"
              iconColor="bg-indigo-100 text-indigo-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-none shadow-xl overflow-hidden bg-white/70 backdrop-blur-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2 font-headline">
                      <TrendingUp className="h-5 w-5 text-primary" /> Performance Académique
                    </CardTitle>
                    <CardDescription>Comparaison avec la moyenne de classe</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider bg-primary/5">Personnel</Badge>
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider bg-muted/50 opacity-50">Classe</Badge>
                  </div>
                </CardHeader>
                <CardContent className="h-[320px] w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600}} dy={10} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                      />
                      <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                      <Area type="monotone" dataKey="avg" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-lg bg-white/80">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2 font-headline">
                      <CalendarIcon className="h-5 w-5 text-primary" /> Agenda du Jour
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {MOCK_UPCOMING_EVENTS.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center gap-4 p-3 rounded-2xl border bg-card hover:shadow-md hover:border-primary/20 transition-all group cursor-pointer">
                        <div className="text-center min-w-[64px] border-r pr-4">
                          <p className="text-xs font-black text-primary">{event.time.split(' ')[0]}</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">{event.date}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm truncate">{event.title}</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{event.course}</p>
                        </div>
                        <Badge variant={event.type === 'exam' ? 'destructive' : 'secondary'} className="text-[9px] font-black uppercase">
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-white/80">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-headline">Maîtrise des Sujets</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5 pt-2">
                    {subjectData.slice(0, 4).map((s, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-muted-foreground">{s.subject}</span>
                          <span className="text-primary">{s.value}%</span>
                        </div>
                        <Progress value={s.value} className="h-3 bg-muted" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="border-none shadow-xl bg-gradient-to-br from-rose-500 to-rose-600 text-white overflow-hidden relative group">
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
                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-black">Quiz IA Final</p>
                      <Badge className="bg-white text-rose-600 border-none font-black text-[10px]">J-2</Badge>
                    </div>
                    <p className="text-xs opacity-90 leading-relaxed font-medium">
                      "Il vous reste 3 chapitres non consultés avant l'examen de jeudi."
                    </p>
                    <Button variant="secondary" className="w-full bg-white text-rose-600 hover:bg-white/90 font-black mt-2 rounded-xl">
                      Démarrer les révisions
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-white/80">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 font-headline">
                    <MessageSquare className="h-5 w-5 text-primary" /> Flux Communautaire
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-muted/50 max-h-[400px] overflow-auto custom-scrollbar">
                    {MOCK_ACTIVITIES.map((act) => (
                      <div key={act.id} className="p-4 flex gap-4 hover:bg-primary/5 transition-colors cursor-default group">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                          <AvatarImage src={act.avatar} />
                          <AvatarFallback className="font-bold">{act.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-xs font-black leading-none mb-1">{act.user}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                            {act.action} <span className="font-black text-primary">{act.target}</span>
                          </p>
                          <p className="text-[10px] font-bold text-muted-foreground mt-1 flex items-center gap-1">
                             <Clock className="h-3 w-3" /> {act.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 text-center border-t">
                    <Button variant="ghost" size="sm" className="text-primary font-black gap-2 hover:bg-primary/5 rounded-xl">
                      Voir toute l'activité <ArrowRight className="h-4 w-4" />
                    </Button>
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
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-emerald-500 text-white border-none font-bold uppercase tracking-wider text-[10px]">Statut : En Direct</Badge>
              <div className="flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                <Activity className="h-3 w-3" /> Analyse Prédictive Active
              </div>
            </div>
            <h2 className="text-4xl font-black font-headline tracking-tight text-slate-900">Command Center 🏛️</h2>
            <p className="text-slate-500 text-lg">Gérez vos cohortes et optimisez l'apprentissage avec l'IA.</p>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="gap-2 border-2 h-14 px-8 rounded-2xl hover:bg-white hover:shadow-lg transition-all font-bold">
               <CalendarIcon className="h-5 w-5 text-primary" /> Planning Académique
             </Button>
             <Button className="gap-2 shadow-2xl shadow-primary/30 h-14 px-8 bg-primary text-white font-black border-none rounded-2xl hover:scale-105 transition-transform">
               <Zap className="h-5 w-5 fill-current" /> Nouveau Projet IA
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Étudiants Actifs" value="124" icon={Users} trend={{ value: 12, isUp: true }} className="bg-white shadow-xl shadow-slate-200/50 border-none" />
          <StatCard title="Ressources Partagées" value="48" icon={BookOpen} description="5 ajoutées cette semaine" iconColor="bg-blue-100 text-blue-600" />
          <StatCard title="Moyenne de Classe" value="78.5%" icon={Star} trend={{ value: 2.1, isUp: false }} iconColor="bg-amber-100 text-amber-600" />
          <StatCard title="Taux de Rendu" value="94%" icon={CheckCircle} iconColor="bg-emerald-100 text-emerald-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <Card className="lg:col-span-2 border-none shadow-2xl bg-white overflow-hidden">
             <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50 border-b p-8">
               <div>
                 <CardTitle className="text-2xl font-black font-headline flex items-center gap-2">
                   <BarChart3 className="h-6 w-6 text-primary" /> Engagement par Cours
                 </CardTitle>
                 <CardDescription className="text-base">Participation et rétention moyenne des étudiants</CardDescription>
               </div>
               <div className="flex gap-4 items-center">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global</p>
                    <p className="text-xl font-black text-emerald-500">+8.2%</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 font-black border-none px-4 py-2 rounded-xl">Excellent</Badge>
               </div>
             </CardHeader>
             <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-8 pt-4">
                     {[
                       { name: 'Intelligence Artificielle', val: 94, color: 'hsl(var(--primary))' },
                       { name: 'Mathématiques Avancées', val: 62, color: '#f59e0b' },
                       { name: 'Bio-Informatique', val: 78, color: '#6366f1' },
                       { name: 'Design UI/UX', val: 88, color: '#10b981' }
                     ].map((c, i) => (
                        <div key={i} className="space-y-3">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                            <span className="text-slate-500 flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                              {c.name}
                            </span>
                            <span className="text-primary font-black text-sm">{c.val}%</span>
                          </div>
                          <Progress value={c.val} className="h-3 bg-slate-100" />
                        </div>
                     ))}
                  </div>
                  <div className="h-[250px] w-full">
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

           <div className="space-y-8">
             <Card className="border-none shadow-2xl bg-white overflow-hidden">
               <CardHeader className="bg-slate-900 text-white p-6">
                 <CardTitle className="text-xl font-headline flex items-center gap-2 uppercase tracking-tighter">
                   <AlertCircle className="h-5 w-5 text-rose-500 fill-current" /> Centre d'Alertes
                 </CardTitle>
                 <CardDescription className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Actions immédiates requises</CardDescription>
               </CardHeader>
               <CardContent className="p-4 space-y-4 pt-6">
                  <div className="flex gap-4 p-5 rounded-[2rem] bg-rose-50 border-2 border-rose-100 shadow-sm group hover:bg-rose-100/50 transition-all hover:scale-[1.02]">
                     <div className="h-12 w-12 rounded-2xl bg-rose-500 flex items-center justify-center shrink-0 shadow-lg shadow-rose-200">
                        <CheckCircle className="h-6 w-6 text-white" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-rose-900 uppercase tracking-tight">12 copies à corriger</p>
                        <p className="text-xs text-rose-700 mt-1 font-medium italic">Quiz : IA (Retard J-2)</p>
                        <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white font-black h-9 px-6 rounded-xl shadow-md mt-3 w-full">Corriger maintenant</Button>
                     </div>
                  </div>
                  <div className="flex gap-4 p-5 rounded-[2rem] bg-amber-50 border-2 border-amber-100 shadow-sm group hover:bg-amber-100/50 transition-all hover:scale-[1.02]">
                     <div className="h-12 w-12 rounded-2xl bg-amber-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-200">
                        <MessageSquare className="h-6 w-6 text-white" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-amber-900 uppercase tracking-tight">Question Prioritaire</p>
                        <p className="text-xs text-amber-700 mt-1 font-medium">Alex Johnson attend votre retour.</p>
                        <Button size="sm" variant="outline" className="border-amber-200 text-amber-800 bg-white font-black h-9 px-6 rounded-xl shadow-sm hover:bg-amber-100 mt-3 w-full">Répondre</Button>
                     </div>
                  </div>
                  <div className="p-4 text-center border-t mt-2">
                    <Button variant="ghost" size="sm" className="text-slate-400 font-black gap-2 hover:bg-slate-50 uppercase tracking-widest text-[10px]">
                      Voir tout l'historique d'alertes <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
               </CardContent>
             </Card>

             <Card className="border-none shadow-xl bg-gradient-to-br from-primary to-accent p-1 overflow-hidden group">
                <CardContent className="bg-white rounded-[calc(var(--radius)-4px)] p-6">
                   <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <Badge className="bg-emerald-500 text-white border-none font-black text-[10px]">+14%</Badge>
                   </div>
                   <h4 className="text-xl font-black font-headline mb-1">Croissance d'Engagement</h4>
                   <p className="text-sm text-slate-500 font-medium mb-4">L'utilisation des ressources IA a augmenté significativement ce mois-ci.</p>
                   <Button className="w-full bg-primary font-black rounded-xl h-12 shadow-lg shadow-primary/20">Voir les analyses détaillées</Button>
                </CardContent>
             </Card>
           </div>
        </div>
      </div>
    </AppShell>
  );
}

