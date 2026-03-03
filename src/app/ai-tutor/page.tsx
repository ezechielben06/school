"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/auth-store';
import { AppShell } from '@/components/layout/app-shell';
import { suggestExercises, SuggestExercisesOutput } from '@/ai/flows/suggest-exercises';
import { MOCK_GRADES } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, BrainCircuit, ChevronRight, Loader2, BookOpen, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AITutorPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestExercisesOutput['suggestions'] | null>(null);

  const handleSuggest = async () => {
    setLoading(true);
    try {
      const result = await suggestExercises({
        studentId: user?.id || 'std-1',
        grades: MOCK_GRADES.map(g => ({
          courseName: g.courseName,
          topic: g.topic,
          score: g.score,
          maxScore: g.maxScore
        })),
        learningGoals: "I want to focus on deep learning foundations and strengthen my calculus skills."
      });
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 text-primary-foreground shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="h-24 w-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
              <Sparkles className="h-12 w-12 text-accent" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold font-headline mb-2">Academic Twins AI Tutor</h2>
              <p className="text-primary-foreground/80 max-w-xl text-lg">
                Notre IA analyse votre performance en temps réel pour suggérer les exercices les plus efficaces pour vos domaines de croissance spécifiques.
              </p>
            </div>
            <Button 
              size="lg" 
              onClick={handleSuggest} 
              disabled={loading}
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 h-14 text-lg font-bold shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyse...
                </>
              ) : (
                <>
                  <BrainCircuit className="mr-2 h-5 w-5" />
                  Obtenir des suggestions
                </>
              )}
            </Button>
          </div>
          {/* Abstract pattern decoration */}
          <div className="absolute top-0 right-0 h-full w-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <circle cx="90" cy="10" r="20" fill="white" />
              <circle cx="10" cy="90" r="30" fill="white" />
            </svg>
          </div>
        </div>

        {!suggestions && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
            <Card className="border-dashed">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-2">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">Analyse des notes</CardTitle>
                <CardDescription>Nous examinons vos forces et faiblesses dans toutes les matières.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-dashed">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-2">
                  <BookOpen className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">Correspondance de contenu</CardTitle>
                <CardDescription>Notre IA trouve les sujets et les supports d'étude correspondants dans notre hub.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-dashed">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-2">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">Défis personnalisés</CardTitle>
                <CardDescription>Obtenez des exercices spécifiquement adaptés à votre niveau de difficulté.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}

        {suggestions && (
          <div className="grid grid-cols-1 gap-6 animate-in slide-in-from-bottom-10 duration-1000">
            <h3 className="text-xl font-bold font-headline flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              Votre parcours d'apprentissage sur mesure
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggestions.map((s, idx) => (
                <Card key={idx} className="border-none shadow-md hover:shadow-lg transition-all group overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-accent to-primary" />
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
                        {s.difficulty}
                      </Badge>
                      <span className="text-xs font-bold text-muted-foreground uppercase">{s.subject}</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">{s.exerciseTitle}</CardTitle>
                    <CardDescription className="font-medium text-primary/80">{s.topic}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {s.description}
                    </p>
                    <div className="p-4 rounded-xl bg-muted/50 border border-muted-foreground/10 text-xs">
                      <p className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground mb-2">Raisonnement IA</p>
                      <p className="italic text-muted-foreground">"{s.reasoning}"</p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button className="w-full gap-2 group-hover:bg-primary transition-colors">
                      Commencer l'exercice <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
