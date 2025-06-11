"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { fetchServices, Service } from "@/lib/youtube-services/serviceUtils";
import { toast } from "sonner";
import { generateHTML } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import sanitizeHtml from "sanitize-html";

const tiptapToHTML = (tiptapJson: any): string => {
  try {
    // Validate input
    if (!tiptapJson || typeof tiptapJson !== "object" || !tiptapJson.content) {
      console.warn("Invalid Tiptap JSON structure:", tiptapJson);
      return "No description available";
    }

    const html = generateHTML(tiptapJson, [
      Document,
      Paragraph,
      Text,
      BulletList,
      OrderedList,
      ListItem,
      Heading.configure({ levels: [1, 2, 3] }),
      Bold,
      Italic,
    ]);

    return sanitizeHtml(html, {
      allowedTags: [
        "p",
        "br",
        "strong",
        "em",
        "b",
        "i",
        "ul",
        "ol",
        "li",
        "h1",
        "h2",
        "h3",
      ],
      allowedAttributes: {},
    });
  } catch (error) {
    console.error("Error converting Tiptap JSON to HTML:", {
      error,
      tiptapJson,
    });
    return "No description available";
  }
};

export default function ServicesSection() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const [expanded, setExpanded] = React.useState<number | null>(null);
  const [services, setServices] = React.useState<Service[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch services on component mount
  React.useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true);
        const fetchedServices = await fetchServices();
        setServices(fetchedServices);
      } catch (error) {
        console.error("Failed to load services:", error);
        toast.error("Failed to load services");
      } finally {
        setIsLoading(false);
      }
    };
    loadServices();
  }, []);

  // Carousel autoplay and navigation logic
  React.useEffect(() => {
    if (!api) return;

    let autoplayInterval: NodeJS.Timeout | null = null;
    const startAutoplay = () => {
      if (!isPaused) {
        autoplayInterval = setInterval(() => {
          if (api) api.scrollNext();
        }, 5000); // 5 seconds autoplay
      }
    };

    startAutoplay();
    return () => {
      if (autoplayInterval) clearInterval(autoplayInterval);
    };
  }, [api, isPaused]);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-13">
          Our Services
        </h2>

        <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {isLoading ? (
              // Render skeleton loaders while fetching
              Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index} className="w-full">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-6 rounded-lg">
                    <div className="w-full">
                      <Skeleton className="w-full h-[300px] rounded-md" />
                    </div>
                    <div className="w-full space-y-4">
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                </CarouselItem>
              ))
            ) : services.length === 0 ? (
              <div className="text-center py-6 text-gray-600">
                No services available
              </div>
            ) : (
              services.map((service, index) => (
                <CarouselItem
                  key={service.id}
                  className="w-full"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-6 rounded-lg">
                    {/* Graphic */}
                    <div className="w-full">
                      <Image
                        src={service.graphic || "/placeholder.jpg"}
                        alt={`${service.name} graphic`}
                        width={600}
                        height={300}
                        className="w-full h-[300px] object-cover rounded-md"
                      />
                    </div>
                    {/* Text Content */}
                    <div className="w-full space-y-4">
                      <h3 className="text-2xl font-semibold">{service.name}</h3>
                      <div
                        className={`text-gray-600 transition-all duration-300 ${
                          expanded === index
                            ? "line-clamp-none"
                            : "line-clamp-2"
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: service.description
                            ? tiptapToHTML(service.description)
                            : "No description available",
                        }}
                      />
                      {service.sub_services.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium">Sub-services:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {service.sub_services.map((sub, index) => (
                              <li key={index}>{sub}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <Button
                        variant="link"
                        className="p-0 text-[#FF0000] hover:text-[#FF0000]/80"
                        onClick={() => toggleExpand(index)}
                      >
                        {expanded === index ? "Read Less" : "Read More"}
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
        </Carousel>

        {/* Control Buttons */}
        <div className="flex items-center justify-end gap-4 my-3">
          <Button
            size="icon"
            className="w-9 h-9 rounded-full border bg-transparent border-gray-300 hover:bg-gray-100"
            onClick={() => api?.scrollPrev()}
            aria-label="Previous service"
          >
            <ChevronLeft className="w-6 h-6 text-gray-500" />
          </Button>
          <Button
            size="icon"
            className="w-9 h-9 rounded-full border bg-transparent border-gray-300 hover:bg-gray-100"
            onClick={() => api?.scrollNext()}
            aria-label="Next service"
          >
            <ChevronRight className="w-6 h-6 text-gray-500" />
          </Button>
        </div>
      </div>
    </section>
  );
}
