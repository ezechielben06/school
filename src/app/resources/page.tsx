
"use client";

import { useAuth } from '@/lib/auth-store';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  Filter
} from 'lucide-react';
import { MOCK_RESOURCES } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';

export default function ResourcesPage() {
  const { role } = useAuth();

  const getIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'video': return <Video className="h-5 w-5 text-red-500" />;
      case 'link': return <LinkIcon className="h-5 w-5 text-green-500" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold font-headline">Resource Hub</h2>
            <p className="text-muted-foreground">Browse course materials and learning resources.</p>
          </div>
          {role === 'professor' && (
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Upload Resource
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-10 h-11" placeholder="Search resources, topics, or categories..." />
          </div>
          <Button variant="outline" className="h-11 gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_RESOURCES.map((resource) => (
            <Card key={resource.id} className="group hover:border-primary/50 transition-all border-none shadow-sm overflow-hidden">
              <CardHeader className="p-4 bg-muted/30">
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {getIcon(resource.type)}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="space-y-1">
                  <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">{resource.category}</Badge>
                  <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                  <span>Uploaded {resource.uploadedAt}</span>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-primary hover:text-primary hover:bg-primary/5">
                    <Download className="h-3 w-3" /> Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
