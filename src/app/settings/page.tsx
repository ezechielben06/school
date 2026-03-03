
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
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Configuration du Compte</span>
          </div>
          <h2 className="text-4xl font-black font-headline tracking-tight text-slate-900">Paramètres ⚙️</h2>
          <p className="text-slate-500 text-lg font-medium">Gérez vos préférences, votre sécurité et vos informations personnelles.</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-4 h-14 bg-white/50 backdrop-blur-md border-2 border-slate-100 p-1 rounded-2xl mb-8">
            <TabsTrigger value="profile" className="rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
              <User className="h-4 w-4 mr-2" /> Profil
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
              <Bell className="h-4 w-4 mr-2" /> Alertes
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
              <ShieldCheck className="h-4 w-4 mr-2" /> Sécurité
            </TabsTrigger>
            <TabsTrigger value="preferences" className="rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
              <Palette className="h-4 w-4 mr-2" /> Look
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-none shadow-2xl bg-white overflow-hidden rounded-[2.5rem]">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-black font-headline">Informations Personnelles</CardTitle>
                <CardDescription>Mettez à jour vos détails publics et vos coordonnées.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-8">
                <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                  <div className="relative group">
                    <Avatar className="h-28 w-28 border-4 border-white shadow-2xl">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="text-2xl font-black">{user?.name[0]}</AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 h-10 w-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Camera className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <h4 className="text-xl font-black text-slate-900">{user?.name}</h4>
                    <p className="text-slate-500 font-medium">Membre depuis Janvier 2024</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                      <Badge className="bg-primary/10 text-primary border-none font-bold px-3 py-1 uppercase text-[10px] tracking-widest">{role}</Badge>
                      <Badge className="bg-emerald-100 text-emerald-600 border-none font-bold px-3 py-1 uppercase text-[10px] tracking-widest">Vérifié</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullname" className="font-bold text-slate-700">Nom Complet</Label>
                    <Input id="fullname" defaultValue={user?.name} className="h-12 rounded-xl border-2 focus:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-bold text-slate-700">Email Académique</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input id="email" defaultValue={user?.email} className="h-12 pl-10 rounded-xl border-2 focus:ring-primary" disabled />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school" className="font-bold text-slate-700">Université / École</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input id="school" defaultValue="Polytechnique de Paris" className="h-12 pl-10 rounded-xl border-2 focus:ring-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="font-bold text-slate-700">Bio / Spécialisation</Label>
                    <Input id="bio" defaultValue="Passionné par l'IA et le Web" className="h-12 rounded-xl border-2 focus:ring-primary" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-8 bg-slate-50/50 flex justify-end gap-3">
                <Button variant="ghost" className="font-bold rounded-xl h-12 px-8">Annuler</Button>
                <Button onClick={handleSave} disabled={saving} className="bg-primary text-white font-black h-12 px-8 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                  {saving ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-black font-headline">Centre de Notifications</CardTitle>
                <CardDescription>Choisissez comment et quand vous souhaitez être alerté.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                {[
                  { title: "Nouveaux Cours", desc: "Soyez prévenu dès qu'un nouveau cours est publié.", icon: GraduationCap },
                  { title: "Notes et Résultats", desc: "Recevez une alerte immédiate lors de la publication des notes.", icon: CheckCircle2 },
                  { title: "Messages Privés", desc: "Notifications pour les messages des professeurs et étudiants.", icon: Mail },
                  { title: "Alertes Système", desc: "Informations importantes sur la maintenance et les mises à jour.", icon: Smartphone }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 border-2 border-slate-100 hover:border-primary/20 transition-all group">
                    <div className="flex gap-4 items-center">
                      <div className="h-12 w-12 rounded-xl bg-white shadow-md flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 leading-tight">{item.title}</p>
                        <p className="text-xs text-slate-500 font-medium mt-1">{item.desc}</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
             <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-black font-headline">Sécurité & Accès</CardTitle>
                <CardDescription>Protégez votre compte avec des mesures de sécurité avancées.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-8">
                 <div className="p-6 bg-rose-50 border-2 border-rose-100 rounded-2xl flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <ShieldCheck className="h-8 w-8 text-rose-500" />
                      <div>
                        <p className="font-black text-rose-900">Double Authentification (2FA)</p>
                        <p className="text-xs text-rose-700 font-medium">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-rose-200 text-rose-700 font-bold rounded-xl hover:bg-rose-500 hover:text-white transition-all">Activer</Button>
                 </div>

                 <div className="space-y-4">
                    <h4 className="font-black text-slate-900 flex items-center gap-2"><Lock className="h-4 w-4" /> Changer le mot de passe</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <Input type="password" placeholder="Mot de passe actuel" className="h-12 rounded-xl border-2" />
                      <Input type="password" placeholder="Nouveau mot de passe" className="h-12 rounded-xl border-2" />
                      <Input type="password" placeholder="Confirmer le nouveau mot de passe" className="h-12 rounded-xl border-2" />
                    </div>
                    <Button className="w-full h-12 rounded-xl font-black bg-slate-900 text-white shadow-xl hover:bg-black">Mettre à jour le mot de passe</Button>
                 </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-black font-headline">Apparence & Langue</CardTitle>
                <CardDescription>Personnalisez votre interface ScholaDesk.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Label className="font-bold flex items-center gap-2"><Sun className="h-4 w-4" /> Mode d'Affichage</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-primary bg-primary/5 transition-all">
                        <Sun className="h-6 w-6 text-primary" />
                        <span className="font-bold text-xs uppercase tracking-widest">Clair</span>
                      </button>
                      <button className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-slate-100 hover:border-slate-300 transition-all opacity-50 grayscale">
                        <Moon className="h-6 w-6 text-slate-500" />
                        <span className="font-bold text-xs uppercase tracking-widest text-slate-500">Sombre</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold flex items-center gap-2"><Languages className="h-4 w-4" /> Langue de l'Interface</Label>
                    <div className="grid grid-cols-1 gap-3">
                       <Button variant="outline" className="h-14 justify-between px-6 rounded-2xl border-2 font-bold group">
                         <span className="flex items-center gap-3">
                           <Globe className="h-5 w-5 text-primary" /> Français
                         </span>
                         <Badge className="bg-slate-100 text-slate-400 group-hover:bg-primary group-hover:text-white">Défaut</Badge>
                       </Button>
                       <Button variant="outline" className="h-14 justify-start px-6 rounded-2xl border-2 font-bold text-slate-400 opacity-50">
                         <span className="flex items-center gap-3">
                           <Globe className="h-5 w-5" /> English (Soon)
                         </span>
                       </Button>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary to-accent text-white flex flex-col md:flex-row items-center justify-between gap-6">
                   <div>
                     <h4 className="text-xl font-black font-headline mb-1">ScholaDesk Premium ✨</h4>
                     <p className="text-sm font-medium opacity-90">Débloquez les thèmes personnalisés et les widgets IA exclusifs.</p>
                   </div>
                   <Button className="bg-white text-slate-900 font-black h-12 px-8 rounded-xl hover:bg-slate-100 shadow-2xl">Mettre à niveau</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
