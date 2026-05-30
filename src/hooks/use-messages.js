import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";

export function useCreateOrder() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (orderData) =>
      apiFetch("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      }),
    onSuccess: () => {
      toast({
        title: "Order Placed! 🎉",
        description: "Your order has been saved.",
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
