"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { PreorderForm } from "@/(components)/PreorderForm";
import type { PreorderRecord } from "../../../../types/preorder";

export default function EditPreorderPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [initialData, setInitialData] = useState<PreorderRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch preorder data on mount
  useEffect(() => {
    let mounted = true;

    fetch(`/api/preorders/${orderId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch preorder");
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        setInitialData({
          id: data.id,
          name: data.name,
          productsNumber: data.productsNumber,
          preorderWhen: data.preorderWhen,
          startsAt: data.startsAt,
          endsAt: data.endsAt ?? "",
          status: data.status,
        });
      })
      .catch((error) => {
        console.error("Error fetching preorder:", error);
        if (mounted) alert("Failed to load preorder data");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [orderId]);

  const handleSave = async (data: Partial<PreorderRecord>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/preorders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to update preorder");
        setIsSubmitting(false);
        return;
      }

      router.push("/preorders");
    } catch (error) {
      console.error("Error updating preorder:", error);
      alert("An error occurred while updating the preorder");
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/preorders");
  };

  const handleBack = () => {
    router.push("/preorders");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500 text-sm">Loading preorder data...</div>
      </div>
    );
  }

  return (
    <PreorderForm
      mode="edit"
      initialData={initialData ?? undefined}
      isSubmitting={isSubmitting}
      onSave={handleSave}
      onCancel={handleCancel}
      onBack={handleBack}
    />
  );
}