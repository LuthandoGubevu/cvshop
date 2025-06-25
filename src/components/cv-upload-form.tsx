"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { getSuggestionsAction } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  careerGoals: z.string().min(10, { message: "Please tell us a bit about your career goals." }).max(500, { message: "Your career goals are too long (max 500 characters)."}),
  cv: (typeof window === 'undefined' ? z.any() : z.instanceof(File)).refine(
    (file) => file && file.size > 0,
    "A CV file is required."
  ).refine(
    (file) => file && file.type === "text/plain",
    "Only .txt files are supported for now."
  ).refine(
    (file) => file && file.size <= 1024 * 1024, // 1MB
    "File size must be 1MB or less."
  ),
});

export function CvUploadForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      careerGoals: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setResult(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const cvContent = event.target?.result as string;
        if (!cvContent) {
            throw new Error("Could not read file content.");
        }
        
        const response = await getSuggestionsAction({ cvContent });
        if (response.error) {
            throw new Error(response.error);
        }

        setResult(response.suggestions || "No suggestions available.");

        toast({
          title: "Success!",
          description: "We've analyzed your CV and sent a confirmation email.",
        });

      } catch (error) {
        console.error("Error during CV processing:", error);
        let errorMessage = "An unknown error occurred.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
        toast({
            variant: "destructive",
            title: "File Reading Error",
            description: "There was an error reading your CV file.",
        });
        setLoading(false);
    }
    
    reader.readAsText(values.cv);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="careerGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Career Goals</FormLabel>
                <FormControl>
                  <Textarea className="min-h-[100px]" placeholder="Describe your ideal next role or career path..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cv"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Upload CV (.txt only)</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept=".txt"
                    onChange={(e) => onChange(e.target.files?.[0])} 
                    {...rest}
                    className="pt-2 file:text-primary file:font-semibold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className="w-full mt-4" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Get AI Feedback"
            )}
          </Button>
        </form>
      </Form>
      {result && (
        <Card className="mt-8 rounded-2xl bg-primary/5 dark:bg-primary/10 border-accent/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="text-accent" />
                    Your AI-Powered Feedback
                </CardTitle>
                <CardDescription>
                    Here are some suggestions to improve your CV. Consider these as a starting point.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap text-sm text-foreground/90">{result}</p>
            </CardContent>
        </Card>
      )}
    </>
  );
}
