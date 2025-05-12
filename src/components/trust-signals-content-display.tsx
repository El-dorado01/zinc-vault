"use client";

import React, { useState, useEffect } from "react";
import { FormData } from "@/lib/trust-signals/formSchema";
import {
  fetchTrustSignals,
  addTrustSignal,
  updateTrustSignal,
  deleteTrustSignal,
} from "@/lib/trust-signals/trustSignalUtils";
import { toast } from "sonner";
import { TrustSignal } from "@/lib/trust-signals/formSchema";
import { AddTrustSignalButton } from "./add-trust-signal-button";
import { TrustSignalFormDialog } from "./trust-signal-form-dialog";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { TrustSignalCard } from "./trust-signal-card";

export default function TrustSignalsContentDisplay() {
  const [trustSignals, setTrustSignals] = useState<TrustSignal[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingSignal, setEditingSignal] = useState<TrustSignal | null>(null);
  const [signalToDelete, setSignalToDelete] = useState<TrustSignal | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [deletingSignalId, setDeletingSignalId] = useState<string | null>(null);

  // Fetch trust signals
  useEffect(() => {
    fetchTrustSignals().then(setTrustSignals);
  }, []);

  // Handle form submission
  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      if (editingSignal) {
        await updateTrustSignal(data, editingSignal, setTrustSignals);
      } else {
        if (trustSignals.length >= 3) {
          toast.error("Cannot add more than 3 trust signals.");
          return;
        }
        await addTrustSignal(data, setTrustSignals);
      }
      setIsDialogOpen(false);
      setEditingSignal(null);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!signalToDelete) return;
    setDeletingSignalId(signalToDelete.id);
    try {
      await deleteTrustSignal(signalToDelete, setTrustSignals);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setDeletingSignalId(null);
      setIsDeleteDialogOpen(false);
      setSignalToDelete(null);
    }
  };

  // Handle edit
  const handleEdit = (signal: TrustSignal) => {
    setEditingSignal(signal);
    setIsDialogOpen(true);
  };

  // Handle add new
  const handleAddNew = () => {
    setEditingSignal(null);
    setIsDialogOpen(true);
  };

  // Handle delete confirmation
  const handleOpenDeleteDialog = (signal: TrustSignal) => {
    setSignalToDelete(signal);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="grid gap-4 w-full p-4">
      <AddTrustSignalButton
        trustSignalsCount={trustSignals.length}
        onClick={handleAddNew}
      />
      <div className="flex flex-col items-center justify-between gap-4 w-full">
        {trustSignals.map((signal) => (
          <TrustSignalCard
            key={signal.id}
            signal={signal}
            onEdit={handleEdit}
            onDelete={handleOpenDeleteDialog}
            isDeleting={deletingSignalId === signal.id}
          />
        ))}
      </div>
      <TrustSignalFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingSignal={editingSignal}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        trustSignalsCount={trustSignals.length}
      />
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        signalToDelete={signalToDelete}
        onDelete={handleDelete}
        isDeleting={!!deletingSignalId}
      />
    </div>
  );
}
