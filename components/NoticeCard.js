import { useState } from "react";
import { useRouter } from "next/router";

const categoryStyles = {
  Exam: {
    badge: "bg-purple-100 text-purple-800 border-purple-200",
    dot: "bg-purple-500",
  },
  Event: {
    badge: "bg-blue-100 text-blue-800 border-blue-200",
    dot: "bg-blue-500",
  },
  General: {
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    dot: "bg-emerald-500",
  },
};

export default function NoticeCard({ notice, onDelete }) {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isUrgent = notice.priority === "Urgent";
  const catStyle = categoryStyles[notice.category] || categoryStyles.General;

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    await onDelete(notice.id);
    setDeleting(false);
    setShowConfirmModal(false);
  };

  const formattedDate = new Date(notice.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <div
        className={`group relative rounded-2xl border transition-all duration-300 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden ${
          isUrgent
            ? "border-red-400 ring-2 ring-red-500/10 shadow-red-100"
            : "border-slate-200/80 hover:border-slate-300"
        }`}
      >
        {/* Urgent Badge */}
        {isUrgent && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-extrabold tracking-wide uppercase px-3 py-1 rounded-full shadow-md animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            Urgent
          </div>
        )}

        <div>
          {/* Optional Image */}
          {notice.image && (
            <div className="w-full h-44 overflow-hidden bg-slate-100 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={notice.image}
                alt={notice.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          <div className="p-5 flex flex-col gap-3">
            {/* Meta row: Category & Date */}
            <div className="flex items-center justify-between gap-2">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${catStyle.badge}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`} />
                {notice.category}
              </span>
              <span className="text-xs font-medium text-slate-400">
                {formattedDate}
              </span>
            </div>

            {/* Title & Body */}
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
              {notice.title}
            </h3>
            <p className="text-sm text-slate-600 line-clamp-4 leading-relaxed">
              {notice.body}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center gap-2.5 bg-slate-50/50">
          <button
            onClick={() => router.push(`/notice/${notice.id}/edit`)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-all shadow-2xs cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>
          <button
            onClick={() => setShowConfirmModal(true)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-xl bg-white text-rose-600 border border-slate-200 hover:bg-rose-50 hover:border-rose-200 transition-all shadow-2xs cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">
                  Delete Notice
                </h3>
                <p className="text-xs text-slate-500">
                  Confirmation required
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              Are you sure you want to delete <span className="font-semibold text-slate-900">&ldquo;{notice.title}&rdquo;</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition shadow-md shadow-rose-500/20 cursor-pointer disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}