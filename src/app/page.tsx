"use client";

import { useAuth } from '@/lib/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { GraduationCap, Users, Sparkles, ShieldCheck, Zap, Globe, Rocket } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function LoginPage() {
  const { user, login, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (isLoading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px]" />
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200 animate-in fade-in slide-in-from-left-4 duration-1000">
            <Badge className="bg-primary text-white border-none">Nouveau</Badge>
            <span className="text-sm font-semibold text-slate-600 flex items-center gap-1">
              Academic Twins v2.0 est arrivé ! <Rocket className="h-3 w-3" />
            </span>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30 transform hover:rotate-6 transition-transform">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 lg:text-5xl">Academic <span className="text-primary font-black">Twins</span></h1>
            </div>
            
            <h2 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 lg:text-6xl font-display">
              Apprenez <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient">plus vite</span>,<br /> gérez mieux.
            </h2>
            <p className="text-slate-600 text-xl max-w-lg leading-relaxed">
              La plateforme éducative qui utilise l'intelligence artificielle pour personnaliser votre parcours et simplifier la gestion académique.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="flex items-center gap-4 p-5 bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="p-3 bg-blue-50 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                <Zap className="h-6 w-6 text-primary group-hover:text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-900 leading-none font-display">Vitesse AI</p>
                <p className="text-xs text-slate-500 mt-1">Analyse en temps réel</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="p-3 bg-purple-50 rounded-2xl group-hover:bg-accent group-hover:text-white transition-colors">
                <Globe className="h-6 w-6 text-accent group-hover:text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-900 leading-none font-display">Collaboratif</p>
                <p className="text-xs text-slate-500 mt-1">Étudiez ensemble</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 pt-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Utilisé par</p>
            <div className="flex gap-8 items-center">
              <span className="font-extrabold italic text-xl">MIT</span>
              <span className="font-extrabold italic text-xl">Polytech</span>
              <span className="font-extrabold italic text-xl">Oxford</span>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Accent decoration for the card */}
          <div className="absolute -top-6 -right-6 h-24 w-24 bg-accent/20 rounded-full blur-2xl animate-float" />
          <div className="absolute -bottom-6 -left-6 h-32 w-32 bg-primary/20 rounded-full blur-3xl" />

          <Card className="shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border-none ring-1 ring-slate-200/50 bg-white/90 backdrop-blur-xl relative z-10 overflow-hidden rounded-[2.5rem]">
            <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary animate-gradient" />
            <CardHeader className="text-center pt-10 pb-4">
              <CardTitle className="text-3xl font-bold tracking-tight font-display">Accès Portail</CardTitle>
              <CardDescription className="text-base font-medium">Choisissez votre profil pour continuer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-8 pt-6">
              <div className="grid grid-cols-1 gap-4">
                <button 
                  className="group relative flex flex-col items-center justify-center gap-3 p-8 rounded-[2rem] border-2 border-slate-100 bg-white hover:border-primary hover:bg-primary/5 transition-all duration-300 overflow-hidden"
                  onClick={() => login('student')}
                >
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-10 transition-opacity">
                    <GraduationCap className="h-16 w-16" />
                  </div>
                  <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <GraduationCap className="h-7 w-7" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-xl text-slate-900 font-display">Espace Étudiant</p>
                    <p className="text-sm text-slate-500 font-medium">Accédez à vos cours et notes</p>
                  </div>
                </button>
                
                <button 
                  className="group relative flex flex-col items-center justify-center gap-3 p-8 rounded-[2rem] border-2 border-slate-100 bg-white hover:border-accent hover:bg-accent/5 transition-all duration-300 overflow-hidden"
                  onClick={() => login('professor')}
                >
                   <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-10 transition-opacity">
                    <Users className="h-16 w-16" />
                  </div>
                  <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                    <Users className="h-7 w-7" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-xl text-slate-900 font-display">Espace Professeur</p>
                    <p className="text-sm text-slate-500 font-medium">Gérez vos classes et examens</p>
                  </div>
                </button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center border-t py-8 bg-slate-50/50">
              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black tracking-widest mb-4 uppercase">
                <ShieldCheck className="h-4 w-4" />
                AUTHENTIFICATION SÉCURISÉE
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
                &copy; 2024 Academic Twins. Tous droits réservés.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
