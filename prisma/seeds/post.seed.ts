import { prisma } from "../../src/lib/prisma";

const AUTHOR_ID = "cmopk6sfm0004n98ovx28a61e";

const posts = [
  {
    title: "Dark mode support",
    description:
      "Would love to have a dark mode option. My eyes hurt using the app at night.",
    type: "feature",
    status: "open",
    tags: ["ui", "accessibility"],
    vote_count: 14,
  },
  {
    title: "Export feedback to CSV",
    description:
      "It would be very helpful to export all feedback entries to a CSV file for reporting purposes.",
    type: "feature",
    status: "open",
    tags: ["export", "data"],
    vote_count: 9,
  },
  {
    title: "Login page crashes on mobile Safari",
    description:
      "When trying to log in on iPhone with Safari, the page goes blank after submitting the form.",
    type: "bug",
    status: "in-progress",
    tags: ["mobile", "auth"],
    vote_count: 22,
    pinned: true,
  },
  {
    title: "Add keyboard shortcuts",
    description:
      "Power users would benefit from keyboard shortcuts for common actions like submitting feedback or voting.",
    type: "feature",
    status: "open",
    tags: ["ux", "accessibility"],
    vote_count: 6,
  },
  {
    title: "Email notifications for status changes",
    description:
      "Notify me by email when the status of my submitted feedback changes.",
    type: "feature",
    status: "open",
    tags: ["notifications", "email"],
    vote_count: 18,
  },
  {
    title: "Sorting by vote count does not work",
    description:
      "Selecting 'Sort by votes' in the dropdown has no effect. Posts stay in the same order.",
    type: "bug",
    status: "open",
    tags: ["sorting", "feed"],
    vote_count: 11,
  },
  {
    title: "Allow image attachments in feedback",
    description:
      "Being able to attach a screenshot when reporting a bug would make reports much clearer.",
    type: "feature",
    status: "open",
    tags: ["attachments", "bug-reporting"],
    vote_count: 7,
  },
  {
    title: "Admin dashboard analytics",
    description:
      "An overview of total posts, votes, and active users over time would be useful for admins.",
    type: "feature",
    status: "open",
    tags: ["admin", "analytics"],
    vote_count: 5,
  },
  {
    title: "Duplicate posts when clicking submit twice",
    description:
      "If you click the submit button quickly twice, the same post gets created twice.",
    type: "bug",
    status: "closed",
    tags: ["form", "ux"],
    vote_count: 3,
  },
  {
    title: "Search functionality",
    description:
      "A search bar to find existing feedback before submitting a new one would reduce duplicates.",
    type: "feature",
    status: "open",
    tags: ["search", "ux"],
    vote_count: 31,
    pinned: true,
  },
];

async function main() {
  console.log("Clearing posts and tags...");
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();

  const uniqueTagNames = [...new Set(posts.flatMap((p) => p.tags))];

  console.log(`Seeding ${uniqueTagNames.length} tags...`);
  await prisma.tag.createMany({
    data: uniqueTagNames.map((name) => ({ name })),
  });

  console.log("Seeding 10 posts...");
  for (const post of posts) {
    await prisma.post.create({
      data: { ...post, authorId: AUTHOR_ID },
    });
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
