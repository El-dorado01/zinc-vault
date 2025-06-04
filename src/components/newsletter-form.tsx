"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const NewsletterForm = ({ formWidth }: { formWidth?: "full" | "half" }) => {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call for newsletter subscription
    try {
      console.log("Subscribing email:", email);
      // Replace with actual API call, e.g., fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay
      alert("Thanks for subscribing!");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Something went wrong. Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col ${formWidth == "full" ? "md:flex-row items-center" : "items-start"} gap-4 justify-center`}
    >
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`w-full ${formWidth == "full" ? "md:w-2/3 rounded-sm border-gray-200 focus:border-white focus:ring-white placeholder:text-white" : "rounded-none"} p-3 border bg-transparent`}
        required
        aria-label="Email for newsletter subscription"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className={`${formWidth === "full" ? "w-full md:w-auto bg-white text-[#DD3929]" : "w-auto bg-[#DD3929] text-white rounded-none"} hover:bg-gray-100 transition-colors duration-300 cursor-pointer`}
      >
        {isSubmitting ? (
          <>
            {" "}
            <Loader2 className="animate-spin mr-1" /> Subscribing
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );
};

export default NewsletterForm;
