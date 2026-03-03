"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/auth-store';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Palette, 
  ShieldCheck, 
  Mail, 
  Camera,
  Languages,
  Moon,
  Sun,
  Smartphone,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { user, role } = useAuth();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Paramètres enregistrés",
        description: "Vos modifications ont été appliquées avec succès.",
      });
    }, 1000);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Configuration du Compte</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tight text-slate-900">Paramètres ⚙️</h2>
          <p className="text-slate-500 text-base md:text-lg font-medium">Gérez vos préférences, votre sécurité et vos informations personnelles.</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <TabsList className="flex md:grid md:grid-cols-4 h-14 bg-white shadow-xl shadow-slate-200/50 p-1 rounded-2xl mb-4 md:mb-8 min-w-[500px] md:min-w-0">
              <TabsTrigger value="profile" className="flex-1 rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                <User className="h-4 w-4 mr-2" /> Profil
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex-1 rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                <Bell className="h-4 w-4 mr-2" /> Alertes
              </TabsTrigger>
              <TabsTrigger value="security" className="flex-1 rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                <ShieldCheck className="h-4 w-4 mr-2" /> Sécurité
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex-1 rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                <Palette className="h-4 w-4 mr-2" /> Look
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile" className="space-y-6 outline-none">
            <Card className="border-none shadow-2xl bg-white overflow-hidden rounded-[2.5rem]">
              <CardHeader className="p-6 md:p-10 pb-4">
                <CardTitle className="text-2xl font-black font-headline text-slate-900">Informations Personnelles</CardTitle>
                <CardDescription>Mettez à jour vos détails publics et vos coordonnées.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-10 pt-0 space-y-8">
                <div className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-8 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                  <div className="relative group shrink-0">
                    <Avatar className="h-28 w-28 border-4 border-white shadow-2xl">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="text-2xl font-black">{user?.name[0]}</AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 h-10 w-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Camera className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex-1 space-y-3 text-center md:text-left">
                    <h4 className="text-2xl font-black text-slate-900">{user?.name}</h4>
                    <p className="text-slate-500 font-medium">Membre depuis Janvier 2024</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                      <Badge className="bg-primary/10 text-primary border-none font-black px-4 py-1.5 uppercase text-[9px] tracking-widest">{role}</Badge>
                      <Badge className="bg-emerald-100 text-emerald-600 border-none font-black px-4 py-1.5 uppercase text-[9px] tracking-widest">Vérifié</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="fullname" className="font-black text-slate-700 uppercase text-[10px] tracking-widest">Nom Complet</Label>
                    <Input id="fullname" defaultValue={user?.name} className="h-12 rounded-xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:ring-primary font-bold" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="font-black text-slate-700 uppercase text-[10px] tracking-widest">Email Académique</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input id="email" defaultValue={user?.email} className="h-12 pl-12 rounded-xl border-2 border-slate-50 bg-slate-50 font-bold opacity-60" disabled />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="school" className="font-black text-slate-700 uppercase text-[10px] tracking-widest">Université</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input id="school" defaultValue="Polytechnique de Paris" className="h-12 pl-12 rounded-xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:ring-primary font-bold" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="bio" className="font-black text-slate-700 uppercase text-[10px] tracking-widest">Bio / Spécialité</Label>
                    <Input id="bio" defaultValue="Passionné par l'IA et le Web" className="h-12 rounded-xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:ring-primary font-bold" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 md:p-10 bg-slate-50/50 flex flex-col sm:flex-row justify-end gap-3">
                <Button variant="ghost" className="font-black text-slate-400 rounded-xl h-12 px-8 w-full sm:w-auto hover:bg-transparent">Annuler</Button>
                <Button onClick={handleSave} disabled={saving} className="bg-primary text-white font-black h-12 px-10 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform w-full sm:w-auto">
                  {saving ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 outline-none">
            <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-6 md:p-10">
                <CardTitle className="text-2xl font-black font-headline text-slate-900">Notifications</CardTitle>
                <CardDescription>Choisissez comment et quand vous souhaitez être alerté.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-10 pt-0 space-y-4">
                {[
                  { title: "Nouveaux Cours", desc: "Soyez prévenu dès qu'un nouveau cours est publié.", icon: GraduationCap },
                  { title: "Notes et Résultats", desc: "Recevez une alerte lors de la publication des notes.", icon: CheckCircle2 },
                  { title: "Messages Privés", desc: "Notifications pour les messages des profs.", icon: Mail },
                  { title: "Alertes Système", desc: "Maintenance et mises à jour importantes.", icon: Smartphone }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 md:p-6 rounded-2xl bg-slate-50 border-2 border-slate-50 hover:border-primary/20 transition-all group">
                    <div className="flex gap-4 items-center min-w-0">
                      <div className="h-12 w-12 rounded-xl bg-white shadow-md flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-slate-900 leading-tight">{item.title}</p>
                        <p className="text-[10px] md:text-xs text-slate-500 font-medium mt-1 truncate">{item.desc}</p>
                      </div>
                    </div>
                    <Switch defaultChecked className="shrink-0" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6 outline-none">
             <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-6 md:p-10">
                <CardTitle className="text-2xl font-black font-headline text-slate-900">Sécurité & Accès</CardTitle>
                <CardDescription>Protégez votre compte avec des mesures avancées.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-10 pt-0 space-y-8">
                 <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-rose-50 border-2 border-rose-100 rounded-2xl gap-4">
                    <div className="flex gap-4 items-center">
                      <ShieldCheck className="h-8 w-8 text-rose-500 shrink-0" />
                      <div>
                        <p className="font-black text-rose-900">Double Authentification (2FA)</p>
                        <p className="text-xs text-rose-700 font-medium">Ajoutez une couche de sécurité supplémentaire.</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full sm:w-auto border-rose-200 text-rose-700 font-bold rounded-xl hover:bg-rose-500 hover:text-white transition-all bg-white">Activer</Button>
                 </div>

                 <div className="space-y-6">
                    <h4 className="font-black text-slate-900 flex items-center gap-2 uppercase tracking-widest text-xs"><Lock className="h-4 w-4" /> Changer le mot de passe</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <Input type="password" placeholder="Mot de passe actuel" className="h-12 rounded-xl border-2 bg-slate-50 border-slate-50 font-bold" />
                      <Input type="password" placeholder="Nouveau mot de passe" className="h-12 rounded-xl border-2 bg-slate-50 border-slate-50 font-bold" />
                      <Input type="password" placeholder="Confirmer" className="h-12 rounded-xl border-2 bg-slate-50 border-slate-50 font-bold" />
                    </div>
                    <Button className="w-full h-12 rounded-xl font-black bg-slate-900 text-white shadow-xl hover:bg-black transition-all">Mettre à jour</Button>
                 </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6 outline-none">
            <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-6 md:p-10">
                <CardTitle className="text-2xl font-black font-headline text-slate-900">Apparence & Langue</CardTitle>
                <CardDescription>Personnalisez votre interface Academic Twins.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-10 pt-0 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <Label className="font-black text-slate-700 uppercase tracking-widest text-[10px] flex items-center gap-2"><Sun className="h-4 w-4" /> Mode d'Affichage</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-primary bg-primary/5 transition-all shadow-lg shadow-primary/10">
                        <Sun className="h-6 w-6 text-primary" />
                        <span className="font-black text-[10px] uppercase tracking-[0.2em] text-primary">Clair</span>
                      </button>
                      <button className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-slate-100 hover:border-slate-300 transition-all opacity-40 grayscale group">
                        <Moon className="h-6 w-6 text-slate-500 group-hover:text-slate-700" />
                        <span className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-700">Sombre</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-black text-slate-700 uppercase tracking-widest text-[10px] flex items-center gap-2"><Languages className="h-4 w-4" /> Langue Interface</Label>
                    <div className="grid grid-cols-1 gap-3">
                       <Button variant="outline" className="h-14 justify-between px-6 rounded-2xl border-2 border-slate-50 bg-slate-50 font-black group hover:bg-white hover:border-primary/20">
                         <span className="flex items-center gap-3">
                           <Globe className="h-5 w-5 text-primary" /> Français
                         </span>
                         <Badge className="bg-primary/10 text-primary font-black text-[8px] uppercase tracking-widest px-2 py-1 rounded-md">Défaut</Badge>
                       </Button>
                       <Button variant="outline" className="h-14 justify-start px-6 rounded-2xl border-2 border-slate-50 bg-slate-50 font-black text-slate-400 opacity-40" disabled>
                         <span className="flex items-center gap-3">
                           <Globe className="h-5 w-5" /> English (Bientôt)
                         </span>
                       </Button>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary to-accent text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl shadow-primary/30">
                   <div className="text-center lg:text-left">
                     <h4 className="text-2xl font-black font-headline mb-2 leading-none">Academic Twins Premium ✨</h4>
                     <p className="text-sm font-medium opacity-80 max-w-sm">Débloquez les thèmes personnalisés et les widgets IA exclusifs.</p>
                   </div>
                   <Button className="bg-white text-slate-900 font-black h-12 px-10 rounded-xl hover:bg-slate-100 shadow-2xl border-none w-full lg:w-auto">Mettre à niveau</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
