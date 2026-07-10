import { useRouter } from "next/router";
import NoticeForm from "../../components/NoticeForm";

export default function NewNoticePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Notice Board
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        <NoticeForm />
      </div>
    </div>
  );
}
