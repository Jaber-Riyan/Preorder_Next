import React, { useEffect } from "react";
import { X, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "../utils/cn";

export type ToastType = "success" | "info" | "warning";

interface ToastProps {
  message: string;
  type: ToastType;
  visible: boolean;
  onClose: () => void;
}

const iconMap = {
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
};

const colorMap = {
  success: "text-green-600 bg-green-50 border-green-200",
  info: "text-blue-600 bg-blue-50 border-blue-200",
  warning: "text-amber-600 bg-amber-50 border-amber-200",
};

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  visible,
  onClose,
}) => {
  const Icon = iconMap[type];

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] animate-slide-in">
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg min-w-[280px]",
          colorMap[type]
        )}
      >
        <Icon className="w-5 h-5 shrink-0" />
        <span className="text-sm font-medium flex-1">{message}</span>
        <button
          onClick={onClose}
          className="p-0.5 rounded hover:bg-black/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
