
"use client";

import { useAuth } from '@/lib/auth-store';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  Users, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Zap,
  ChevronRight,
  Menu
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, role, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary animate-pulse" />
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Ressources', href: '/resources', icon: BookOpen },
    { name: 'Notes', href: '/grades', icon: GraduationCap },
    ...(role === 'student' ? [{ name: 'AI Tutor', href: '/ai-tutor', icon: Sparkles }] : []),
    ...(role === 'professor' ? [{ name: 'Administration', href: '/admin', icon: Users }] : []),
    { name: 'Paramètres', href: '/settings', icon: Settings },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">
        <Sidebar variant="inset" collapsible="icon" className="border-none shadow-2xl bg-white text-slate-900">
          <SidebarHeader className="p-6 flex flex-row items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden overflow-hidden">
              <span className="font-black text-xl tracking-tighter leading-none font-headline text-slate-900 truncate">ScholaDesk</span>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Platform AI</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-4 mt-6">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name} className="mb-2">
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    tooltip={item.name}
                    className={`h-12 rounded-xl transition-all ${pathname === item.href ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-primary/5 text-slate-600'}`}
                  >
                    <Link href={item.href} className="flex items-center gap-3 w-full">
                      <item.icon className={`h-5 w-5 shrink-0 ${pathname === item.href ? 'text-white' : 'text-slate-400'}`} />
                      <span className="font-bold truncate">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            
            <div className="mt-auto pt-8 pb-4 group-data-[collapsible=icon]:hidden">
               <div className="p-5 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                  <div className="relative z-10">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2">Premium</p>
                    <p className="text-xs font-bold mb-4 leading-tight opacity-80">Boostez vos capacités avec l'IA avancée.</p>
                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white font-black h-9 rounded-xl border-none shadow-lg">Upgrade</Button>
                  </div>
                  <Zap className="absolute -bottom-6 -right-6 h-24 w-24 text-white/5 rotate-12" />
               </div>
            </div>
          </SidebarContent>
          <SidebarFooter className="p-6 pt-0">
            <div className="flex items-center gap-3 mb-6 group-data-[collapsible=icon]:hidden p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <Avatar className="h-10 w-10 border-2 border-white shadow-xl">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="font-black">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-black text-slate-900 truncate leading-none mb-1">{user.name}</p>
                <p className="text-[9px] text-slate-400 truncate uppercase font-black tracking-widest">{role}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 h-12 px-4 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors group-data-[collapsible=icon]:justify-center text-slate-400"
              onClick={() => {
                logout();
                router.push('/');
              }}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span className="font-black group-data-[collapsible=icon]:hidden">Déconnexion</span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="relative overflow-hidden flex flex-col">
          <header className={`flex h-20 shrink-0 items-center gap-4 px-4 md:px-8 sticky top-0 z-30 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm' : 'bg-transparent'}`}>
            <div className="flex items-center gap-2">
              <SidebarTrigger className="h-11 w-11 rounded-xl hover:bg-primary/10 hover:text-primary bg-white shadow-sm border border-slate-100" />
              <div className="md:hidden flex items-center gap-2 px-3 py-1 bg-white rounded-xl border shadow-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-black tracking-tighter">ScholaDesk</span>
              </div>
            </div>
            
            <div className="flex-1 hidden md:flex justify-center">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Recherche globale..." 
                  className="w-full bg-white/50 backdrop-blur-sm border-2 border-slate-50 rounded-2xl h-11 pl-11 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-900 shadow-sm" 
                />
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 ml-auto">
               <div className="hidden sm:flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl relative bg-white shadow-sm border border-slate-100 hover:bg-slate-50">
                    <Bell className="h-5 w-5 text-slate-600" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-rose-500 border-2 border-white text-[10px] font-black">3</Badge>
                  </Button>
                  <Link href="/settings">
                    <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl bg-white shadow-sm border border-slate-100 hover:bg-slate-50">
                      <Settings className="h-5 w-5 text-slate-600" />
                    </Button>
                  </Link>
               </div>
               <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block" />
               <Avatar className="h-11 w-11 border-2 border-white shadow-lg ring-1 ring-slate-100">
                 <AvatarImage src={user.avatar} />
                 <AvatarFallback className="font-black">U</AvatarFallback>
               </Avatar>
            </div>
          </header>
          
          <main className="flex-1 p-4 md:p-8 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <div className="max-w-[1600px] mx-auto w-full">
               {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
