
"use client";

import { useAuth } from '@/lib/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { GraduationCap, Users, Sparkles, ShieldCheck } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5] p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold font-headline tracking-tight text-primary">ScholaDesk AI</h1>
          </div>
          
          <h2 className="text-4xl font-bold leading-tight">
            The next generation of <span className="text-primary">student management</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md">
            Empowering students and professors with AI-driven insights, resource sharing, and seamless academic coordination.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <ShieldCheck className="h-5 w-5 text-accent" />
              </div>
              <span className="text-sm font-medium">Secure Access</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <span className="text-sm font-medium">AI Insights</span>
            </div>
          </div>
        </div>

        <Card className="shadow-2xl border-none ring-1 ring-black/5">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Select your role to continue to your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="grid grid-cols-1 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center gap-1 hover:border-primary hover:bg-primary/5 group"
                onClick={() => login('student')}
              >
                <GraduationCap className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                <span className="font-semibold">I am a Student</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center gap-1 hover:border-primary hover:bg-primary/5 group"
                onClick={() => login('professor')}
              >
                <Users className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                <span className="font-semibold">I am a Professor</span>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center border-t pt-6 bg-muted/30">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
