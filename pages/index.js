import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NoticeCard from "../components/NoticeCard";

export default function Home() {
  const router = useRouter();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notices");
      if (res.ok) {
        const data = await res.json();
        setNotices(data);
      }
    } catch (err) {
      console.error("Failed to load notices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/notices/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setNotices((prev) => prev.filter((n) => n.id !== id));
      } else {
        alert("Failed to delete notice.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Network error deleting notice.");
    }
  };

  const filteredNotices = notices.filter((notice) => {
    const matchesCat =
      selectedCategory === "ALL" || notice.category === selectedCategory;
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const urgentCount = notices.filter((n) => n.priority === "Urgent").length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
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
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                Reno Notice Board
              </h1>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Institutional Announcement Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/notice/new")}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
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
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>New Notice</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero / Overview Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats and Search bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 shadow-2xs">
              Total: <span className="text-indigo-600 font-bold">{notices.length}</span>
            </div>
            {urgentCount > 0 && (
              <div className="bg-rose-50 border border-rose-200 px-4 py-2 rounded-xl text-sm font-semibold text-rose-700 shadow-2xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
                Urgent: <span className="font-bold">{urgentCount}</span>
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="relative max-w-md w-full">
            <svg
              className="w-5 h-5 absolute left-3.5 top-3 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notices by keyword..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs transition"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-200/80">
          {["ALL", "Exam", "Event", "General"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat === "ALL" ? "All Announcements" : cat}
            </button>
          ))}
        </div>

        {/* Notice List */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-500">
              Loading notices...
            </p>
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto my-10 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              No notices found
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              {searchQuery || selectedCategory !== "ALL"
                ? "Try adjusting your category filter or search keywords."
                : "There are no announcements published yet."}
            </p>
            <button
              onClick={() => router.push("/notice/new")}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition cursor-pointer"
            >
              Publish First Notice
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotices.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-xs text-slate-500">
          <p className="font-medium text-slate-600">
            &copy; {new Date().getFullYear()} <span className="font-semibold text-slate-900">All Rights Reserved by Arvind.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
