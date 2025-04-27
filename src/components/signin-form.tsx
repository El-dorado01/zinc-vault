// app/auth/signin/SigninForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SigninOptions from "./signin-options";
import { sendOTP } from "@/actions/send-otp";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .email("Must be a valid email"),
});

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Navigation and loading state
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Submit handler with email verification and OTP sending
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    form.clearErrors(); // Clear previous errors

    startTransition(async () => {
      const result = await sendOTP(values.email);

      if (result.error) {
        form.setError("email", {
          type: "manual",
          message: result.error,
        });
        return;
      }

      if (result.success && result.email) {
        router.push(`/auth/verify?email=${encodeURIComponent(result.email)}`);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("p-6 md:p-8", className)}
        {...props}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-balance text-muted-foreground">
              Login to your Zinc Vault account
            </p>
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="test@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Only the approved email will receive an OTP.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || form.formState.isSubmitting}
          >
            {isPending ? "Sending..." : "Get OTP"}
          </Button>
          <SigninOptions />
        </div>
      </form>
    </Form>
  );
}
