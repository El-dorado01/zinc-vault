"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { sendOTP, verifyOTP } from "@/lib/auth";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const InputOTPForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isResending, setIsResending] = useState(false);

  const email = searchParams.get("email") || "";
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  useEffect(() => {
    if (!email) {
      toast.error("No email provided. Please go back to the sign-in page.");
      router.push("/auth/signin");
    }
  }, [email, router]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const result = await verifyOTP(email, data.pin);
      if (result.error) {
        toast.error(result.error);
        form.reset();
      } else if (result.success) {
        if (result.sessionToken) {
          // Set HTTP-only cookie
          await fetch("/api/v1/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionToken: result.sessionToken }),
          });
        }
        toast.success("OTP verified! Redirecting...");
        router.push(result.redirect || "/dashboard");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("OTP verification error", { err });
    }
  }

  async function handleResend() {
    setIsResending(true);
    try {
      const result = await sendOTP(email);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("New OTP sent! Check your email.");
      }
    } catch (err) {
      toast.error("Failed to resend OTP. Please try again.");
      console.error("Resend OTP error", { err });
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Input OTP</CardTitle>
          <CardDescription>
            Please enter the one-time password sent to {email}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Verify OTP
              </Button>
              <div className="mt-4 text-center text-sm">
                Didn&apos;t get the OTP?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="underline underline-offset-4 disabled:opacity-50"
                >
                  {isResending ? "Resending..." : "Resend"}
                </button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InputOTPForm;
