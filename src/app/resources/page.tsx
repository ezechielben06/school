
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
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-extrabold font-headline tracking-tight text-slate-900">Hub de Ressources 📚</h2>
            <p className="text-muted-foreground text-lg">Parcourez les supports de cours, vidéos et exercices interactifs.</p>
          </div>
          {role === 'professor' && (
            <Link href="/admin">
              <Button className="gap-2 h-12 px-6 shadow-xl shadow-primary/20 bg-primary text-white font-bold border-none">
                <Plus className="h-5 w-5" /> Ajouter une ressource
              </Button>
            </Link>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input className="pl-12 h-14 rounded-2xl bg-white border-2 border-muted focus:border-primary transition-all text-lg shadow-sm" placeholder="Rechercher par titre, sujet ou type..." />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-auto pb-2 md:pb-0">
            <Tabs defaultValue="all" className="w-auto">
              <TabsList className="h-14 bg-white border-2 border-muted p-1 rounded-2xl">
                <TabsTrigger value="all" className="px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white">Tous</TabsTrigger>
                <TabsTrigger value="docs" className="px-6 rounded-xl">Documents</TabsTrigger>
                <TabsTrigger value="videos" className="px-6 rounded-xl">Vidéos</TabsTrigger>
                <TabsTrigger value="links" className="px-6 rounded-xl">Liens</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" className="h-14 px-6 gap-2 rounded-2xl border-2 font-bold">
              <Filter className="h-5 w-5" /> Filtres
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_RESOURCES.map((resource) => (
            <Link key={resource.id} href={`/courses/${resource.courseId}`}>
              <Card className="group hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 border-none shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden flex flex-col h-full">
                <div className={`h-32 w-full relative overflow-hidden bg-gradient-to-br ${
                  resource.type === 'video' ? 'from-rose-100 to-rose-200' : 
                  resource.type === 'link' ? 'from-emerald-100 to-emerald-200' : 
                  'from-blue-100 to-blue-200'
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-110 transition-transform">
                    {resource.type === 'video' ? <PlayCircle className="h-16 w-16" /> : <FileText className="h-16 w-16" />}
                  </div>
                  <div className="absolute top-4 right-4">
                     <Button variant="ghost" size="icon" className="h-10 w-10 bg-white/50 backdrop-blur-md rounded-xl">
                        <MoreVertical className="h-5 w-5" />
                     </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/80 text-black font-bold uppercase tracking-widest text-[9px] border-none shadow-sm backdrop-blur-md">
                      {resource.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="p-6">
                  <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors min-h-[3rem] line-clamp-2">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2 font-medium">
                    {getIcon(resource.type)}
                    <span className="capitalize">{resource.type}</span>
                  </CardDescription>
                </CardHeader>
                
                <CardFooter className="p-6 pt-0 mt-auto border-t bg-muted/20 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-bold">
                    <Clock className="h-4 w-4" /> {resource.uploadedAt}
                  </div>
                  <Button variant="ghost" className="text-primary font-black gap-2 hover:bg-primary/10 rounded-xl">
                    {resource.type === 'link' ? (
                      <>Visiter <ExternalLink className="h-4 w-4" /></>
                    ) : (
                      <>Télécharger <Download className="h-4 w-4" /></>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/10 to-accent/10 border border-white/50 backdrop-blur-sm flex flex-col md:flex-row items-center justify-around gap-8 text-center">
            <div>
              <p className="text-3xl font-black text-primary">120+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Ressources Totales</p>
            </div>
            <div className="h-12 w-px bg-muted hidden md:block" />
            <div>
              <p className="text-3xl font-black text-primary">45h</p>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Contenu Vidéo</p>
            </div>
            <div className="h-12 w-px bg-muted hidden md:block" />
            <div>
              <p className="text-3xl font-black text-primary">15</p>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nouveaux cette semaine</p>
            </div>
        </div>
      </div>
    </AppShell>
  );
}
