const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.notice.deleteMany();

  await prisma.notice.createMany({
    data: [
      {
        title: "Semester End Examinations Schedule - Fall 2026",
        body: "All students must note that the final semester theory examinations will commence from August 15, 2026. Hall tickets can be downloaded from the academic portal starting next Monday. Ensure all pending dues are cleared.",
        category: "Exam",
        priority: "Urgent",
        publishDate: new Date("2026-07-15"),
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Annual Tech Innovation Hackathon Registration Open",
        body: "Join us for our 48-hour national coding and AI hackathon! Over $10,000 in prizes to be won. Teams of 2 to 4 students can register before the end of this month. Free meals and mentorship provided throughout the event.",
        category: "Event",
        priority: "Normal",
        publishDate: new Date("2026-07-12"),
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Emergency Server Maintenance Notice",
        body: "The central ERP portal and student database will undergo emergency security patches tonight between 2:00 AM and 5:00 AM. During this period, online portals and fee payment services will remain unavailable.",
        category: "General",
        priority: "Urgent",
        publishDate: new Date("2026-07-10"),
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Library Timings Extended for Exam Season",
        body: "To support students preparing for upcoming midterms and finals, the Central Reference Library will now remain open 24/7 starting today until further notice.",
        category: "General",
        priority: "Normal",
        publishDate: new Date("2026-07-08"),
      },
      {
        title: "Guest Lecture: Advanced AI Agentic Coding",
        body: "We are thrilled to host senior research scientists for an interactive seminar on Agentic Workflows and Modern Full-Stack Architecture in the Main Auditorium this Friday at 4 PM.",
        category: "Event",
        priority: "Normal",
        publishDate: new Date("2026-07-05"),
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
      }
    ]
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
