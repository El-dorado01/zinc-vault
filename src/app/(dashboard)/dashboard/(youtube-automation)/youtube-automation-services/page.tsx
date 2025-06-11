"use client";

import { DashboardBreadcrumb } from "@/components/dashboard-breadcrumb";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { SidebarInset } from "@/components/ui/sidebar";
import { Loader2, Plus, Trash2, Pencil } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TiptapJson } from "@/types";
import Image from "next/image";
import {
  uploadImage,
  fetchServices,
  insertService,
  updateService,
  deleteService,
  Service,
  deleteImage,
} from "@/lib/youtube-services/serviceUtils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Skeleton } from "@/components/ui/skeleton";

interface ServiceForm {
  id?: string;
  name: string;
  description: TiptapJson | null;
  graphic: string;
  sub_services: string[];
}

const YoutubeServicesPage = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<ServiceForm>({
    name: "",
    description: null,
    graphic: "",
    sub_services: [],
  });
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      const fetchedServices = await fetchServices();
      setServices(fetchedServices);
      setIsLoading(false);
    };
    loadServices();
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Service name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.graphic) newErrors.graphic = "Graphic is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveService = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      if (isEditing && formData.id) {
        const { id, ...updates } = formData;
        const success = await updateService(id, updates);
        if (success) {
          setServices(
            services.map((s) => (s.id === id ? { ...s, ...updates } : s))
          );
        }
      } else {
        const success = await insertService({
          name: formData.name,
          description: formData.description,
          graphic: formData.graphic,
          sub_services: formData.sub_services,
        });

        if (success) {
          const newServices = await fetchServices();
          setServices(newServices);
        }
      }

      setFormData({
        name: "",
        description: null,
        graphic: "",
        sub_services: [],
      });
      setHasUnsavedChanges(false);
      setIsAddSheetOpen(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving service:", error);
      setErrors({ form: "Failed to save service" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditService = (service: Service) => {
    setFormData({
      id: service.id,
      name: service.name,
      description: service.description,
      graphic: service.graphic,
      sub_services: service.sub_services,
    });
    setIsEditing(true);
    setIsAddSheetOpen(true);
  };

  const handleDeleteService = async () => {
    if (!serviceToDelete) return;

    setIsSaving(true);
    try {
      const success = await deleteService(serviceToDelete);
      if (success) {
        setServices(services.filter((s) => s.id !== serviceToDelete));
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    } finally {
      setIsSaving(false);
      setIsDeleteDialogOpen(false);
      setServiceToDelete(null);
    }
  };

  const handleAddSheetClose = (open: boolean) => {
    if (!open && hasUnsavedChanges) {
      setIsDialogOpen(true);
    } else {
      setIsAddSheetOpen(open);
      if (!open) {
        setFormData({
          name: "",
          description: null,
          graphic: "",
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
      description: null,
      graphic: "",
      sub_services: [],
    });
    setHasUnsavedChanges(false);
    setIsDialogOpen(false);
    setIsAddSheetOpen(false);
    setErrors({});
    setIsEditing(false);
  };

  const handleSaveAndClose = async () => {
    await handleSaveService();
    setIsDialogOpen(false);
  };

  const removeImage = async () => {
    if (formData.graphic) {
      await deleteImage(formData.graphic);
    }
    setFormData({ ...formData, graphic: "" });
    setHasUnsavedChanges(true);
  };

  const handleInputChange = (
    field: keyof ServiceForm,
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
        handleInputChange("graphic", url);
      }
    }
  };

  return (
    <>
      <SidebarInset>
        <DashboardBreadcrumb />
        <div className="flex flex-1 flex-col gap-4 p-4 shadow-sm rounded-lg mx-5 bg-sidebar md:min-h-min">
          <Heading
            title="Youtube Automation & Promotion - Services"
            description="Make changes to your youtube automation & promotion services page here. You can add, edit or remove services as needed."
            classname="mb-4"
          />

          <div className="flex flex-col items-start justify-start w-full max-w-6xl mx-auto space-y-10">
            <div className="flex justify-between items-center w-full">
              <h1 className="font-bold text-xl md:text-2xl">Services</h1>
              <Button onClick={() => setIsAddSheetOpen(true)}>
                <Plus className="h-4 w-4 mr-1" /> Add Service
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
            ) : services.length === 0 ? (
              <p className="text-gray-500">
                No services found. Add a new service to get started.
              </p>
            ) : (
              <ScrollArea className="overflow-y-auto max-h-[calc(100vh-120px)]">
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-4 w-full min-h-screen gap-2">
                  {services.map((service) => (
                    <Card key={service.id} className="shadow-md">
                      <CardContent>
                        <Image
                          src={service.graphic}
                          alt={service.name}
                          width={200}
                          height={200}
                          className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h3 className="font-semibold text-lg">
                          {service.name}
                        </h3>
                        <div className="text-sm text-gray-600">
                          <span
                            className="line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: service.description
                                ? generateHTML(
                                    service.description as TiptapJson,
                                    [StarterKit]
                                  )
                                : "<p>No description available.</p>",
                            }}
                          />
                        </div>
                        {/* {service.sub_services.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium">
                              Sub-services:
                            </h4>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {service.sub_services.map((sub, index) => (
                                <li key={index}>{sub}</li>
                              ))}
                            </ul>
                          </div>
                        )} */}
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditService(service)}
                        >
                          <Pencil className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setServiceToDelete(service.id);
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

        <Sheet open={isAddSheetOpen} onOpenChange={handleAddSheetClose}>
          <SheetContent side="right" className="w-full sm:w-[540px] p-2">
            <SheetHeader>
              <SheetTitle className="text-lg">
                {isEditing ? "Edit Service" : "Add Service"}
              </SheetTitle>
              <SheetDescription>
                {isEditing
                  ? "Edit the service details."
                  : "Add a service details. You can add a sub service as well."}
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="overflow-y-auto h-[calc(100vh-120px)]">
              <div className="p-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      required
                      placeholder="Enter service name"
                      disabled={isSaving}
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>
                  <div className="grid gap-2 relative">
                    <Label>Description *</Label>
                    <SimpleEditor
                      panel="Sheet"
                      initialContent={formData.description || ""}
                      onUpdate={(json: TiptapJson) =>
                        handleInputChange("description", json)
                      }
                      disabled={isSaving}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="graphic">Graphic *</Label>
                    <Input
                      id="graphic"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={isSaving}
                    />
                    {formData.graphic && (
                      <div className="flex">
                        <Image
                          src={formData.graphic}
                          alt="Graphic preview"
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
                    {errors.graphic && (
                      <p className="text-red-500 text-sm">{errors.graphic}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sub_services">
                      Sub-services (optional)
                    </Label>
                    <Input
                      id="sub_services"
                      placeholder="Enter sub-service and press Enter"
                      disabled={isSaving}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value.trim()) {
                          e.preventDefault();
                          handleInputChange("sub_services", [
                            ...formData.sub_services,
                            e.currentTarget.value.trim(),
                          ]);
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                    <div className="flex flex-wrap gap-2">
                      {formData.sub_services.map((sub, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-100 rounded px-2 py-1"
                        >
                          <span>{sub}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-4 w-4 p-0"
                            onClick={() =>
                              handleInputChange(
                                "sub_services",
                                formData.sub_services.filter(
                                  (_, i) => i !== index
                                )
                              )
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <SheetFooter>
              <Button onClick={handleSaveService} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    Saving
                  </>
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
                There are some unsaved changes detected. Do you want to save
                them before closing?
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
                  <>
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    Saving
                  </>
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
              <DialogTitle>Delete Service</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this service? This action cannot
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
                onClick={handleDeleteService}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    Deleting
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </>
  );
};

export default YoutubeServicesPage;
