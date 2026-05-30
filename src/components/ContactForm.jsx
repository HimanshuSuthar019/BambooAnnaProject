import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema } from "@/lib/schema";
import { useCreateOrder } from "@/hooks/use-messages";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send, Loader2 } from "lucide-react";

export function ContactForm() {
  const { mutate, isPending } = useCreateOrder();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(data) {
    mutate(data, { onSuccess: () => reset() });
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl shadow-primary/5 border border-border/50">
      <div className="mb-8 text-center">
        <h3 className="font-display text-2xl font-bold text-foreground">Get in Touch</h3>
        <p className="text-muted-foreground mt-2">Have a question about sustainable living?</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label className="text-foreground/80 font-medium">Name</Label>
          <Input
            placeholder="Your name"
            {...register("name")}
            className="h-12 bg-secondary/20 border-border/50 focus:border-primary/50 rounded-xl transition-all"
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground/80 font-medium">Email</Label>
          <Input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="h-12 bg-secondary/20 border-border/50 focus:border-primary/50 rounded-xl transition-all"
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground/80 font-medium">Message</Label>
          <Textarea
            placeholder="How can we help you today?"
            className="min-h-[120px] bg-secondary/20 border-border/50 focus:border-primary/50 rounded-xl transition-all resize-none"
            {...register("message")}
          />
          {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
