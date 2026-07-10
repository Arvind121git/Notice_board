import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Urgent-first ordering handled in the database query via Prisma orderBy
      // Alphabetically 'Urgent' > 'Normal', so priority: 'desc' puts Urgent first.
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priority: "desc" },
          { publishDate: "desc" },
          { createdAt: "desc" },
        ],
      });
      return res.status(200).json(notices);
    } catch (error) {
      console.error("GET /api/notices error:", error);
      return res.status(500).json({ error: "Failed to fetch notices." });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, body, category, priority, publishDate, image } = req.body || {};

      // Server-side validation
      if (!title || typeof title !== "string" || !title.trim()) {
        return res.status(400).json({ error: "Title is required and cannot be empty." });
      }
      if (!body || typeof body !== "string" || !body.trim()) {
        return res.status(400).json({ error: "Body is required and cannot be empty." });
      }
      if (!["Exam", "Event", "General"].includes(category)) {
        return res.status(400).json({ error: "Category must be one of Exam, Event, or General." });
      }
      if (!["Normal", "Urgent"].includes(priority)) {
        return res.status(400).json({ error: "Priority must be either Normal or Urgent." });
      }
      if (!publishDate || isNaN(new Date(publishDate).getTime())) {
        return res.status(400).json({ error: "A valid publish date is required." });
      }

      const notice = await prisma.notice.create({
        data: {
          title: title.trim(),
          body: body.trim(),
          category,
          priority,
          publishDate: new Date(publishDate),
          image: image && typeof image === "string" && image.trim() ? image.trim() : null,
        },
      });

      return res.status(201).json(notice);
    } catch (error) {
      console.error("POST /api/notices error:", error);
      const detail = error?.message ? ` ${error.message}` : "";
      return res.status(500).json({ error: `Failed to create notice.${detail}` });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
