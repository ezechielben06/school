
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
  Users,
  Zap,
  TrendingUp,
  MessageSquare,
  ArrowRight,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_GRADES, MOCK_ACTIVITIES } from '@/lib/mock-data';
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
  ResponsiveContainer 
} from 'recharts';

const chartData = [
  { name: 'Jan', score: 65 },
  { name: 'Fév', score: 72 },
  { name: 'Mar', score: 84 },
  { name: 'Avr', score: 78 },
  { name: 'Mai', score: 90 },
];

export default function DashboardPage() {
  const { role, user } = useAuth();

  if (role === 'student') {
    return (
      <AppShell>
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary/20 text-primary border-none hover:bg-primary/30">Semestre 2</Badge>
                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Mis à jour à l'instant
                </span>
              </div>
              <h2 className="text-4xl font-extrabold font-headline tracking-tight">Bonjour, {user?.name.split(' ')[0]}! 👋</h2>
              <p className="text-muted-foreground text-lg">Vous avez 3 cours aujourd'hui et un projet à rendre bientôt.</p>
            </div>
            <div className="flex gap-2">
              <Button size="lg" className="shadow-lg shadow-primary/20 gap-2">
                <Zap className="h-4 w-4" /> Mode Révision
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Moyenne Générale" 
              value="84.2%" 
              icon={GraduationCap} 
              trend={{ value: 4.8, isUp: true }}
              className="border-l-4 border-l-primary"
            />
            <StatCard 
              title="Cours Actifs" 
              value="5" 
              icon={BookOpen} 
              description="Prochaine séance à 14:00" 
            />
            <StatCard 
              title="Assiduité" 
              value="96%" 
              icon={CheckCircle} 
              iconColor="bg-emerald-100 text-emerald-600" 
            />
            <StatCard 
              title="Temps d'Étude" 
              value="24h" 
              icon={Clock} 
              description="Total cette semaine"
              iconColor="bg-amber-100 text-amber-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-none shadow-xl overflow-hidden bg-white/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" /> Progression Académique
                    </CardTitle>
                    <CardDescription>Votre évolution sur les 5 derniers mois</CardDescription>
                  </div>
                  <SelectDateRange />
                </CardHeader>
                <CardContent className="h-[300px] w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} dy={10} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Cours d'aujourd'hui</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
                      <div className="text-center min-w-[50px]">
                        <p className="text-xs font-bold text-primary">09:00</p>
                        <p className="text-[10px] text-muted-foreground uppercase">AM</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm">Mathématiques</p>
                        <p className="text-xs text-muted-foreground">Salle A104 • Dr. Mitchell</p>
                      </div>
                      <Badge className="bg-emerald-500">Terminé</Badge>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-white border">
                      <div className="text-center min-w-[50px]">
                        <p className="text-xs font-bold">14:00</p>
                        <p className="text-[10px] text-muted-foreground uppercase">PM</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm">IA Fondamentaux</p>
                        <p className="text-xs text-muted-foreground">Salle B202 • Amphi 4</p>
                      </div>
                      <Badge variant="outline" className="border-primary text-primary">À venir</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg">Performance par Matière</CardTitle>
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Intelligence Artificielle</span>
                        <span className="text-primary">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Mathématiques Avancées</span>
                        <span className="text-primary">76%</span>
                      </div>
                      <Progress value={76} className="h-2" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Physique Quantique</span>
                        <span className="text-primary">84%</span>
                      </div>
                      <Progress value={84} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="border-none shadow-lg bg-accent text-accent-foreground overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 animate-float">
                  <Zap className="h-24 w-24 fill-current" />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Urgences & Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm space-y-2 group hover:bg-white/30 transition-all">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-bold">Projet IA Final</p>
                      <Badge className="bg-rose-500 border-none">J-2</Badge>
                    </div>
                    <p className="text-xs opacity-80 italic">"N'oubliez pas d'inclure les métriques de performance dans le rapport."</p>
                    <Button variant="secondary" size="sm" className="w-full bg-white text-accent hover:bg-white/90">
                      Ouvrir le Projet
                    </Button>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm space-y-2">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-bold">Quiz de Physique</p>
                      <Badge className="bg-amber-500 border-none">Demain</Badge>
                    </div>
                    <p className="text-xs opacity-80">Couvre les chapitres 4 et 5.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" /> Activité Récente
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {MOCK_ACTIVITIES.map((act) => (
                      <div key={act.id} className="p-4 flex gap-3 hover:bg-muted/30 transition-colors">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={act.avatar} />
                          <AvatarFallback>{act.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold leading-none">{act.user}</p>
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {act.action} <span className="font-medium text-foreground">{act.target}</span>
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-1">{act.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 text-center">
                    <Button variant="ghost" size="sm" className="text-primary gap-1">
                      Voir tout le flux <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="h-16 w-16 bg-white rounded-2xl shadow-sm mx-auto flex items-center justify-center">
                    <Zap className="h-8 w-8 text-amber-500" />
                  </div>
                  <h4 className="font-bold">Boostez vos révisions !</h4>
                  <p className="text-xs text-muted-foreground">Notre AI a préparé un quiz personnalisé basé sur vos erreurs récentes en Mathématiques.</p>
                  <Button className="w-full bg-primary hover:bg-primary/90">Lancer l'AI Tutor</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  // PROFESSOR DASHBOARD REDESIGN
  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-extrabold font-headline tracking-tight text-foreground">Espace Professeur 🎓</h2>
            <p className="text-muted-foreground text-lg">Gérez vos classes et suivez l'engagement de vos {124} étudiants.</p>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="gap-2 border-2"><CalendarIcon className="h-4 w-4" /> Emploi du temps</Button>
             <Button className="gap-2 shadow-xl shadow-primary/20"><Zap className="h-4 w-4" /> Analyse Prédictive</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Étudiants Actifs" value="124" icon={Users} trend={{ value: 12, isUp: true }} />
          <StatCard title="Ressources Partagées" value="48" icon={BookOpen} description="5 ajoutées ce mois" />
          <StatCard title="Moyenne de Classe" value="78.5%" icon={GraduationCap} trend={{ value: 2.1, isUp: false }} />
          <StatCard title="Taux de Rendu" value="94%" icon={CheckCircle} iconColor="bg-emerald-100 text-emerald-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <Card className="border-none shadow-xl">
             <CardHeader className="flex flex-row items-center justify-between">
               <div>
                 <CardTitle>Niveau d'Engagement</CardTitle>
                 <CardDescription>Participation des étudiants par matière</CardDescription>
               </div>
               <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">+8% ce mois</Badge>
             </CardHeader>
             <CardContent>
                <div className="space-y-6 pt-4">
                   <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">Intelligence Artificielle</span>
                        <span className="text-muted-foreground">94%</span>
                      </div>
                      <Progress value={94} className="h-3 bg-muted" />
                   </div>
                   <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">Mathématiques Avancées</span>
                        <span className="text-muted-foreground">62%</span>
                      </div>
                      <Progress value={62} className="h-3 bg-muted" />
                   </div>
                   <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">Design UI/UX</span>
                        <span className="text-muted-foreground">88%</span>
                      </div>
                      <Progress value={88} className="h-3 bg-muted" />
                   </div>
                </div>
             </CardContent>
           </Card>

           <Card className="border-none shadow-xl">
             <CardHeader>
               <CardTitle>Notifications Prioritaires</CardTitle>
               <CardDescription>Actions requises de votre part</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex gap-4 p-4 rounded-2xl bg-rose-50 border-l-4 border-rose-500">
                   <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                      <AlertCircle className="h-5 w-5 text-rose-600" />
                   </div>
                   <div className="flex-1">
                      <p className="text-sm font-bold text-rose-900">12 copies à corriger</p>
                      <p className="text-xs text-rose-700">Quiz : Fondamentaux de l'IA (Retard de 2 jours)</p>
                   </div>
                   <Button size="sm" className="bg-rose-600 hover:bg-rose-700">Corriger</Button>
                </div>
                <div className="flex gap-4 p-4 rounded-2xl bg-amber-50 border-l-4 border-amber-500">
                   <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <MessageSquare className="h-5 w-5 text-amber-600" />
                   </div>
                   <div className="flex-1">
                      <p className="text-sm font-bold text-amber-900">Demande d'assistance</p>
                      <p className="text-xs text-amber-700">Alex Johnson a posé une question sur le projet final.</p>
                   </div>
                   <Button size="sm" variant="outline" className="border-amber-200 text-amber-800">Répondre</Button>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </AppShell>
  );
}

function SelectDateRange() {
  return (
    <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
      <Button variant="ghost" size="sm" className="h-8 px-3 text-xs bg-white shadow-sm">Mois</Button>
      <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">Trimestre</Button>
      <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">Année</Button>
    </div>
  );
}
