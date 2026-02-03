import { AlertCircle, RefreshCw, WifiOff } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "../../hooks/useTranslation";

interface ErrorRetryProps {
  error?: string | null;
  onRetry?: () => void;
  loading?: boolean;
  variant?: "full" | "inline" | "compact";
  title?: string;
  message?: string;
}

const ErrorRetry: React.FC<ErrorRetryProps> = ({
  error,
  onRetry,
  loading = false,
  variant = "full",
  title,
  message,
}) => {
  const { t } = useTranslation("common");
  const isOffline = error?.toLowerCase().includes("internet") || error?.toLowerCase().includes("offline");

  const Icon = isOffline ? WifiOff : AlertCircle;

  // Full page error
  if (variant === "full") {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <Icon className="w-20 h-20 mx-auto text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">{title || t("errors.title")}</h2>
          <p className="text-gray-600 mb-6">{message || error || t("messages.somethingWentWrong")}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              disabled={loading}
              className="bg-green-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
              {loading ? t("errors.retrying") : t("errors.retry")}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Inline error (in a section)
  if (variant === "inline") {
    return (
      <div className="py-12 px-4">
        <div className="text-center max-w-md mx-auto">
          <Icon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">{message || error || t("errors.noData")}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              disabled={loading}
              className="bg-green-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? t("actions.loading") : t("errors.retry")}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Compact error (small notice)
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
      <Icon className="w-5 h-5 text-red-500 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm text-red-800">{message || error || t("messages.somethingWentWrong")}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          disabled={loading}
          className="text-red-600 hover:text-red-700 font-medium text-sm disabled:opacity-50 flex items-center gap-1"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "..." : t("errors.retry")}
        </button>
      )}
    </div>
  );
};

export default memo(ErrorRetry);
