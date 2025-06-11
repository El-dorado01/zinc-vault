"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SidebarInset } from "@/components/ui/sidebar";
import { DashboardBreadcrumb } from "@/components/dashboard-breadcrumb";
import Heading from "@/components/heading";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import Select from "react-select";
import Image from "next/image";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { TiptapJson } from "@/types";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import {
  Channel,
  ServiceOption,
  fetchChannels,
  fetchServices,
  addChannel,
  updateChannel,
  deleteChannel,
  uploadImage,
  deleteImage,
} from "@/lib/channels/channelUtils";

interface ChannelForm {
  id?: string;
  name: string;
  link: string;
  logo: string;
  service_name: string;
  service_description: TiptapJson | null;
  sub_services: string[];
}

const YoutubeChannelsPage = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [channelToDelete, setChannelToDelete] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<ChannelForm>({
    name: "",
    link: "",
    logo: "",
    service_name: "",
    service_description: null,
    sub_services: [],
  });
  const [channels, setChannels] = useState<Channel[]>([]);
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [fetchedChannels, fetchedServices] = await Promise.all([
          fetchChannels(),
          fetchServices(),
        ]);
        setChannels(fetchedChannels);
        setServices(fetchedServices);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Channel name is required";
    if (!formData.link.trim()) newErrors.link = "Channel link is required";
    else if (!/^https:\/\/(www\.)?youtube\.com\//.test(formData.link))
      newErrors.link = "Invalid YouTube channel link";
    if (!formData.logo) newErrors.logo = "Channel logo is required";
    if (!formData.service_name) newErrors.service_name = "Service is required";
    if (!formData.service_description)
      newErrors.service_description = "Service description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChannel = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      if (isEditing && formData.id) {
        const { id, ...updates } = formData;
        const success = await updateChannel(id, updates);
        if (success) {
          setChannels(channels.map((c) => (c.id === id ? { ...c, ...updates } : c)));
        }
      } else {
        const success = await addChannel({
          name: formData.name,
          link: formData.link,
          logo: formData.logo,
          service_name: formData.service_name,
          service_description: formData.service_description,
          sub_services: formData.sub_services,
        });
        if (success) {
          const newChannels = await fetchChannels();
          setChannels(newChannels);
        }
      }

      setFormData({
        name: "",
        link: "",
        logo: "",
        service_name: "",
        service_description: null,
        sub_services: [],
      });
      setHasUnsavedChanges(false);
      setIsSheetOpen(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving channel:", error);
      setErrors({ form: "Failed to save channel" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditChannel = (channel: Channel) => {
    setFormData({
      id: channel.id,
      name: channel.name,
      link: channel.link,
      logo: channel.logo,
      service_name: channel.service_name,
      service_description: channel.service_description,
      sub_services: channel.sub_services,
    });
    setIsEditing(true);
    setIsSheetOpen(true);
  };

  const handleDeleteChannel = async () => {
    if (!channelToDelete) return;

    setIsSaving(true);
    try {
      const success = await deleteChannel(channelToDelete);
      if (success) {
        setChannels(channels.filter((c) => c.id !== channelToDelete));
      }
    } catch (error) {
      console.error("Error deleting channel:", error);
    } finally {
      setIsSaving(false);
      setIsDeleteDialogOpen(false);
      setChannelToDelete(null);
    }
  };

  const handleSheetClose = (open: boolean) => {
    if (!open && hasUnsavedChanges) {
      setIsDialogOpen(true);
    } else {
      setIsSheetOpen(open);
      if (!open) {
        setFormData({
          name: "",
          link: "",
          logo: "",
          service_name: "",
          service_description: null,
          sub_services: [],
        });
        setHasUnsavedChanges(false);
        setErrors({});
        setIsEditing(false);
      }
    }
  };

  const handleDiscardChanges = async () => {
    setFormData({
      name: "",
      link: "",
      logo: "",
      service_name: "",
      service_description: null,
      sub_services: [],
    });
    setHasUnsavedChanges(false);
    setIsDialogOpen(false);
    setIsSheetOpen(false);
    setErrors({});
    setIsEditing(false);
  };

  const handleSaveAndClose = async () => {
    await handleSaveChannel();
    setIsDialogOpen(false);
  };

  const removeImage = async () => {
    if (formData.logo) {
      await deleteImage(formData.logo);
    }
    setFormData({ ...formData, logo: "" });
    setHasUnsavedChanges(true);
  };

  const handleInputChange = (
    field: keyof ChannelForm,
    value: string | TiptapJson | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadImage(file);
      if (url) {
        handleInputChange("logo", url);
      }
    }
  };

  const selectedService = services.find((s) => s.name === formData.service_name);

  return (
    <SidebarInset>
      <DashboardBreadcrumb />
      <div className="flex flex-1 flex-col gap-4 p-4 shadow-sm rounded-lg mx-5 bg-sidebar md:min-h-min">
        <Heading
          title="Youtube Automation & Promotion - Channels"
          description="Manage your promoted channels. Add, edit, or delete channels you have promoted or automated"
          classname="mb-4"
        />
        <div className="flex flex-col items-start justify-start w-full max-w-6xl mx-auto space-y-10">
          <div className="flex justify-between items-center w-full">
            <h1 className="font-bold text-xl md:text-2xl">Promoted Channels</h1>
            <Button onClick={() => setIsSheetOpen(true)}>
              <Plus className="h-4 w-4 mr-1" /> Add New Channel
            </Button>
          </div>
          {isLoading ? (
            <ScrollArea className="overflow-y-auto h-[calc(100vh-120px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-4 w-full min-h-screen gap-2">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Card key={index} className="shadow-md">
                    <CardContent className="pt-6">
                      <Skeleton className="w-full h-40 rounded-md mb-4" />
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6 mt-1" />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Skeleton className="h-8 w-20 rounded-md" />
                      <Skeleton className="h-8 w-20 rounded-md" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : channels.length === 0 ? (
            <p className="text-gray-500">
              No channels found. Add a new channel to get started.
            </p>
          ) : (
            <ScrollArea className="overflow-y-auto max-h-[calc(100vh-120px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-4 w-full min-h-screen gap-2">
                {channels.map((channel) => (
                  <Card key={channel.id} className="shadow-md">
                    <CardContent className="pt-6">
                      <Image
                        src={channel.logo}
                        alt={channel.name}
                        width={200}
                        height={200}
                        className="w-full h-40 object-cover rounded-md mb-4"
                      />
                      <h3 className="font-semibold text-lg">{channel.name}</h3>
                      <div className="text-sm text-gray-600">
                        <a
                          href={channel.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {channel.link}
                        </a>
                        <p className="mt-2">Service: {channel.service_name}</p>
                        <span
                          className="line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: channel.service_description
                              ? generateHTML(
                                  channel.service_description as TiptapJson,
                                  [StarterKit]
                                )
                              : "<p>No description available.</p>",
                          }}
                        />
                        {channel.sub_services.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium">Sub-services:</p>
                            <ul className="list-disc list-inside text-sm">
                              {channel.sub_services.map((sub, index) => (
                                <li key={index}>{sub}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditChannel(channel)}
                      >
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setChannelToDelete(channel.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={handleSheetClose}>
        <SheetContent side="right" className="w-full sm:w-[540px] p-2">
          <SheetHeader>
            <SheetTitle className="text-lg">
              {isEditing ? "Edit Channel" : "Add Channel"}
            </SheetTitle>
            <SheetDescription>
              {isEditing
                ? "Edit the channel details."
                : "Add a new channel you have promoted or automated."}
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="overflow-y-auto h-[calc(100vh-120px)]">
            <div className="p-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="service_name">Service *</Label>
                  <Select
                    id="service_name"
                    options={services.map((s) => ({
                      value: s.name,
                      label: s.name,
                    }))}
                    value={
                      formData.service_name
                        ? {
                            value: formData.service_name,
                            label: formData.service_name,
                          }
                        : null
                    }
                    onChange={(option) => {
                      handleInputChange("service_name", option?.value || "");
                      handleInputChange("sub_services", []); // Reset sub-services when service changes
                    }}
                    isDisabled={isSaving}
                    placeholder="Select a service"
                  />
                  {errors.service_name && (
                    <p className="text-red-500 text-sm">
                      {errors.service_name}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Channel Name *</Label>
                  <Input
                    id="name"
                    required
                    placeholder="Enter channel name"
                    disabled={isSaving}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="link">Channel Link *</Label>
                  <Input
                    id="link"
                    required
                    placeholder="Enter YouTube channel URL"
                    disabled={isSaving}
                    value={formData.link}
                    onChange={(e) => handleInputChange("link", e.target.value)}
                  />
                  {errors.link && (
                    <p className="text-red-500 text-sm">{errors.link}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="logo">Channel Logo *</Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isSaving}
                  />
                  {formData.logo && (
                    <div className="flex">
                      <Image
                        src={formData.logo}
                        alt="Logo preview"
                        width={120}
                        height={120}
                        className="rounded-md w-full max-h-[200px] h-auto object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="max-w-min ml-2"
                        onClick={removeImage}
                        disabled={isSaving}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {errors.logo && (
                    <p className="text-red-500 text-sm">{errors.logo}</p>
                  )}
                </div>
                
                <div className="grid gap-2">
                  <Label>Service Description *</Label>
                  <SimpleEditor
                    initialContent={formData.service_description || ""}
                    onUpdate={(json: TiptapJson) =>
                      handleInputChange("service_description", json)
                    }
                    disabled={isSaving}
                  />
                  {errors.service_description && (
                    <p className="text-red-500 text-sm">
                      {errors.service_description}
                    </p>
                  )}
                </div>
                {selectedService &&
                  selectedService.sub_services &&
                  selectedService.sub_services.length > 0 && (
                    <div className="grid gap-2">
                      <Label>Sub-services (optional)</Label>
                      <div className="space-y-2">
                        {selectedService.sub_services.map((sub, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`sub-service-${index}`}
                              checked={formData.sub_services.includes(sub)}
                              onCheckedChange={(checked) => {
                                const updatedSubServices = checked
                                  ? [...formData.sub_services, sub]
                                  : formData.sub_services.filter(
                                      (s) => s !== sub
                                    );
                                handleInputChange(
                                  "sub_services",
                                  updatedSubServices
                                );
                              }}
                              disabled={isSaving}
                            />
                            <Label htmlFor={`sub-service-${index}`}>
                              {sub}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </ScrollArea>
          <SheetFooter>
            <Button onClick={handleSaveChannel} disabled={isSaving}>
              {isSaving ? (
                <span className="flex items-center">
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Saving
                </span>
              ) : (
                "Save changes"
              )}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription>
              There are some unsaved changes detected. Do you want to save them
              before closing?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleDiscardChanges}
              disabled={isSaving}
            >
              Discard
            </Button>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAndClose} disabled={isSaving}>
              {isSaving ? (
                <span className="flex items-center">
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Saving
                </span>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Channel</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this channel? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteChannel}
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-4 w-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                    ></path>
                  </svg>
                  Deleting
                </span>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarInset>
  );
};

export default YoutubeChannelsPage;
