import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export function useCreateMessage() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data) => {
      // Simulate API call — replace with real fetch if you have a backend
      await new Promise((res) => setTimeout(res, 800));
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you shortly.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
