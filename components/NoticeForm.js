import { useState } from "react";
import { useRouter } from "next/router";

function toDateInputValue(dateVal) {
  if (!dateVal) {
    return new Date().toISOString().split("T")[0];
  }
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) {
    return new Date().toISOString().split("T")[0];
  }
  return d.toISOString().split("T")[0];
}

export default function NoticeForm({ initialData = null, noticeId = null }) {
  const router = useRouter();
  const isEdit = Boolean(noticeId || initialData?.id);
  const targetId = noticeId || initialData?.id;

  const [form, setForm] = useState({
    title: initialData?.title || "",
    body: initialData?.body || "",
    category: initialData?.category || "General",
    priority: initialData?.priority || "Normal",
    publishDate: toDateInputValue(initialData?.publishDate),
    image: initialData?.image || "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const url = isEdit ? `/api/notices/${targetId}` : "/api/notices";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setSubmitting(false);
        return;
      }

      router.push("/");
    } catch (err) {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-8 py-6 text-white flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-indigo-400">
            {isEdit ? "Update Notice" : "New Notice"}
          </span>
          <h2 className="text-2xl font-bold mt-0.5">
            {isEdit ? "Edit Notice Details" : "Publish a Notice"}
          </h2>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
        {error && (
          <div className="bg-rose-50 text-rose-700 text-sm font-medium px-4 py-3 rounded-xl border border-rose-200 flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Notice Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Midterm Examination Schedule Autumn 2026"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            required
          />
        </div>

        {/* Category & Priority Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition cursor-pointer"
            >
              <option value="Exam">Exam</option>
              <option value="Event">Event</option>
              <option value="General">General</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Priority <span className="text-rose-500">*</span>
            </label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition cursor-pointer"
            >
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent (Appears at top with red badge)</option>
            </select>
          </div>
        </div>

        {/* Publish Date */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Publish Date <span className="text-rose-500">*</span>
          </label>
          <input
            type="date"
            name="publishDate"
            value={form.publishDate}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition cursor-pointer"
            required
          />
        </div>

        {/* Body */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Content / Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            rows={5}
            placeholder="Write the full notice announcement details here..."
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            required
          />
        </div>

        {/* Image URL (Optional Bonus) */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Banner Image URL <span className="text-xs font-normal text-slate-400">(optional bonus)</span>
          </label>
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
          {form.image && (
            <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 h-36 bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-6 rounded-xl transition shadow-lg shadow-indigo-500/25 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Saving Notice...</span>
              </>
            ) : isEdit ? (
              "Save Changes"
            ) : (
              "Publish Notice"
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="sm:w-36 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 px-6 rounded-xl transition cursor-pointer text-center"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}