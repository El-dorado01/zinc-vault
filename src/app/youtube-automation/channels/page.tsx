"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchChannels, Channel } from "@/lib/channels/channelUtils";
import { toast } from "sonner";
import { generateHTML } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import sanitizeHtml from "sanitize-html";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Pagination from "@/components/steam-game-portfolio/Pagination";
import { ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const tiptapToHTML = (tiptapJson: any): string => {
  try {
    const html = generateHTML(tiptapJson, [Document, Paragraph, Text]);
    return sanitizeHtml(html, {
      allowedTags: ["p", "br", "strong", "em", "b", "i"],
      allowedAttributes: {},
    });
  } catch (error) {
    console.error("Error converting Tiptap JSON to HTML:", error);
    return "No description available";
  }
};

const ChannelsPage = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [totalChannels, setTotalChannels] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 15;

  // Fetch channels
  useEffect(() => {
    const loadChannels = async () => {
      try {
        setIsLoading(true);
        const fetchedChannels = await fetchChannels();
        setChannels(
          fetchedChannels.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )
        );
        setTotalChannels(fetchedChannels.length);
      } catch (error) {
        console.error("Failed to load channels:", error);
        toast.error("Failed to load channels");
      } finally {
        setIsLoading(false);
      }
    };
    loadChannels();
  }, [currentPage]);

  // Pagination
  const totalPages = Math.ceil(totalChannels / itemsPerPage);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Channels
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 flex flex-col gap-4"
              >
                <Skeleton className="w-full h-48 rounded-md" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-8 w-24" />
              </div>
            ))}
          </div>
        ) : channels.length === 0 ? (
          <div className="text-center py-6 text-gray-600">
            No channels available
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="border rounded-lg p-4 flex flex-col gap-4"
              >
                <Image
                  src={channel.logo || "/placeholder.jpg"}
                  alt={`${channel.name} logo`}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold">{channel.name}</h3>
                <div
                  className="text-gray-600 line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html: channel.service_description
                      ? tiptapToHTML(channel.service_description)
                      : "No description available",
                  }}
                />
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="link"
                      className="p-0 text-[#FF0000] hover:text-[#FF0000]/80"
                    >
                      Read More
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle>{channel.name}</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="overflow-y-auto max-h-[85vh]">
                      <div className="flex flex-col gap-4 p-4">
                        <Image
                          src={channel.logo || "/placeholder.jpg"}
                          alt={`${channel.name} logo`}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-md"
                        />
                        <div>
                          <h4 className="text-sm font-medium">Service:</h4>
                          <p className="text-gray-600">
                            {channel.service_name}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Description:</h4>
                          <div
                            className="text-gray-600"
                            dangerouslySetInnerHTML={{
                              __html: channel.service_description
                                ? tiptapToHTML(channel.service_description)
                                : "No description available",
                            }}
                          />
                        </div>
                        {channel.sub_services.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium">
                              Sub-services:
                            </h4>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {channel.sub_services.map((sub, index) => (
                                <li key={index}>{sub}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-medium">Channel Link:</h4>
                          <Link
                            href={channel.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FF0000] hover:underline flex items-center gap-1"
                          >
                            Visit Channel <ExternalLink className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ChannelsPage;
