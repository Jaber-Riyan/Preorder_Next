import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  const preorders = [
    {
      name: "John Doe",
      productsNumber: 3,
      preorderWhen: "2026-07-15",
      startsAt: "2026-07-01",
      endsAt: "2026-07-10",
      status: true,
    },
    {
      name: "Jane Smith",
      productsNumber: 1,
      preorderWhen: "2026-08-01",
      startsAt: "2026-07-20",
      endsAt: "2026-07-30",
      status: false,
    },
    {
      name: "Alice Johnson",
      productsNumber: 5,
      preorderWhen: "2026-06-10",
      startsAt: "2026-06-01",
      endsAt: null,
      status: true,
    },
    {
      name: "Bob Brown",
      productsNumber: 2,
      preorderWhen: "2026-09-05",
      startsAt: "2026-08-25",
      endsAt: "2026-09-03",
      status: true,
    },
    {
      name: "Charlie Davis",
      productsNumber: 4,
      preorderWhen: "2026-07-22",
      startsAt: "2026-07-10",
      endsAt: "2026-07-20",
      status: false,
    },
  ];

  for (const preorder of preorders) {
    const created = await prisma.preorder.create({
      data: preorder,
    });
    console.log(`  ✅ Created preorder: ${created.name} (${created.id})`);
  }

  console.log(`\n🎉 Seeded ${preorders.length} preorder records successfully.`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });