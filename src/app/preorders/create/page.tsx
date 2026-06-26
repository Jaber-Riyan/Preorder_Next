"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PreorderForm } from "@/(components)/PreorderForm";
import type { PreorderRecord } from "../../../types/preorder";

export default function CreatePreorderPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (data: Partial<PreorderRecord>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/preorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to create preorder");
        setIsSubmitting(false);
        return;
      }

      router.push("/preorders");
    } catch (error) {
      console.error("Error creating preorder:", error);
      alert("An error occurred while creating the preorder");
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/preorders");
  };

  const handleBack = () => {
    router.push("/preorders");
  };

  return (
    <PreorderForm
      mode="create"
      isSubmitting={isSubmitting}
      onSave={handleSave}
      onCancel={handleCancel}
      onBack={handleBack}
    />
  );
}