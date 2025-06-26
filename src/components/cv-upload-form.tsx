"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

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

// Allowed file types and size
const ACCEPTED_MIME_TYPES = ["application/pdf"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  careerGoals: z.string().min(10, { message: "Please tell us a bit about your career goals." }).max(500, { message: "Your career goals are too long (max 500 characters)."}),
  cv: (typeof window === 'undefined' ? z.any() : z.instanceof(File)).refine(
    (file) => file && file.size > 0,
    "A CV file is required."
  ).refine(
    (file) => file && ACCEPTED_MIME_TYPES.includes(file.type),
    "Only .pdf files are supported."
  ).refine(
    (file) => file && file.size <= MAX_FILE_SIZE,
    "File size must be 5MB or less."
  ),
});

export function CvUploadForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      careerGoals: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const cvDataUri = event.target?.result as string;
        if (!cvDataUri) {
            throw new Error("Could not read file content.");
        }
        
        const formData = {
          name: values.name,
          email: values.email,
          careerGoals: values.careerGoals,
          cvDataUri: cvDataUri,
          filename: values.cv.name,
        };

        sessionStorage.setItem("cvForm", JSON.stringify(formData));
        window.location.href = "https://paystack.shop/pay/zmymgvq1fq";

      } catch (error) {
        console.error("Error preparing for payment:", error);
        let errorMessage = "An unknown error occurred.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: errorMessage,
        });
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
    
    reader.readAsDataURL(values.cv);
  };

  return (
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
              <FormLabel>Upload CV (.pdf only)</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  accept=".pdf"
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
              Proceeding to Payment...
            </>
          ) : (
            "Get Your CV Upgraded"
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground pt-1">
            You will be redirected to Paystack to complete your payment.
        </p>
      </form>
    </Form>
  );
}
