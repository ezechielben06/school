
"use client";

import { useAuth } from '@/lib/auth-store';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  FileText, 
  Video, 
  Link as LinkIcon, 
  MoreVertical,
  Download,
  Filter,
  PlayCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { MOCK_RESOURCES } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import Image from 'next/image';

export default function ResourcesPage() {
  const { role } = useAuth();

  const getIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="h-6 w-6 text-blue-500" />;
      case 'video': return <Video className="h-6 w-6 text-red-500" />;
      case 'link': return <LinkIcon className="h-6 w-6 text-emerald-500" />;
      default: return <FileText className="h-6 w-6 text-muted-foreground" />;
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tight text-slate-900">Hub de Ressources 📚</h2>
            <p className="text-slate-500 text-base md:text-lg font-medium">Parcourez les supports de cours, vidéos et exercices interactifs.</p>
          </div>
          {role === 'professor' && (
            <Link href="/admin">
              <Button className="w-full md:w-auto gap-2 h-12 md:h-14 px-8 shadow-xl shadow-primary/20 bg-primary text-white font-black border-none rounded-2xl hover:scale-105 transition-transform">
                <Plus className="h-5 w-5" /> Ajouter une Ressource
              </Button>
            </Link>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input className="pl-12 h-14 rounded-2xl bg-white border-none shadow-xl shadow-slate-200/50 focus:ring-2 focus:ring-primary transition-all text-lg font-medium" placeholder="Rechercher une ressource..." />
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-2 w-full lg:w-auto">
            <div className="flex-1 lg:flex-none overflow-x-auto pb-2 md:pb-0">
              <Tabs defaultValue="all" className="w-auto">
                <TabsList className="h-14 bg-white border-none shadow-xl shadow-slate-200/50 p-1 rounded-2xl">
                  <TabsTrigger value="all" className="px-6 rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Tous</TabsTrigger>
                  <TabsTrigger value="docs" className="px-6 rounded-xl font-bold">Documents</TabsTrigger>
                  <TabsTrigger value="videos" className="px-6 rounded-xl font-bold">Vidéos</TabsTrigger>
                  <TabsTrigger value="links" className="px-6 rounded-xl font-bold">Liens</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Button variant="outline" className="h-14 px-8 gap-2 rounded-2xl border-none bg-white shadow-xl shadow-slate-200/50 font-bold hover:text-primary transition-colors shrink-0 flex-1 md:flex-none">
              <Filter className="h-5 w-5" /> Filtres
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {MOCK_RESOURCES.map((resource) => (
            <Link key={resource.id} href={`/courses/${resource.courseId}`}>
              <Card className="group hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 border-none shadow-xl bg-white overflow-hidden flex flex-col h-full rounded-[2.5rem]">
                <div className="h-48 w-full relative overflow-hidden">
                  <Image 
                    src={resource.imageUrl || `https://picsum.photos/seed/${resource.id}/400/300`} 
                    alt={resource.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    data-ai-hint="educational resource"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                       {resource.type === 'video' ? <PlayCircle className="h-8 w-8" /> : <ExternalLink className="h-8 w-8" />}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                     <Button variant="ghost" size="icon" className="h-10 w-10 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white text-white hover:text-slate-900 border border-white/20">
                        <MoreVertical className="h-5 w-5" />
                     </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/90 text-slate-900 font-black uppercase tracking-[0.2em] text-[8px] border-none shadow-sm backdrop-blur-md px-3 py-1.5 rounded-lg">
                      {resource.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-black leading-tight group-hover:text-primary transition-colors min-h-[3rem] line-clamp-2 text-slate-900">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2 font-bold uppercase tracking-widest text-[10px] text-slate-400">
                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-primary/10 transition-colors">
                       {getIcon(resource.type)}
                    </div>
                    <span className="ml-1">{resource.type}</span>
                  </CardDescription>
                </CardHeader>
                
                <CardFooter className="p-6 pt-0 mt-auto border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-black uppercase tracking-widest">
                    <Clock className="h-3 w-3" /> {resource.uploadedAt}
                  </div>
                  <Button variant="ghost" className="text-primary font-black gap-2 hover:bg-transparent rounded-xl h-10 p-0 hover:translate-x-1 transition-transform">
                    {resource.type === 'link' ? (
                      <><span className="hidden sm:inline">Visiter</span> <ExternalLink className="h-4 w-4" /></>
                    ) : (
                      <><span className="hidden sm:inline">Ouvrir</span> <Download className="h-4 w-4" /></>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="p-10 rounded-[3rem] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-around gap-8 text-center relative overflow-hidden shadow-2xl">
            <div className="space-y-1 relative z-10">
              <p className="text-4xl md:text-5xl font-black text-primary">150+</p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Ressources en ligne</p>
            </div>
            <div className="h-16 w-px bg-white/10 hidden md:block relative z-10" />
            <div className="space-y-1 relative z-10">
              <p className="text-4xl md:text-5xl font-black text-accent">60h</p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Vidéos de cours</p>
            </div>
            <div className="h-16 w-px bg-white/10 hidden md:block relative z-10" />
            <div className="space-y-1 relative z-10">
              <p className="text-4xl md:text-5xl font-black text-emerald-400">24/7</p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Support AI Tutor</p>
            </div>
            <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        </div>
      </div>
    </AppShell>
  );
}
