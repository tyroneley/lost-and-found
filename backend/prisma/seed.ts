import { PrismaClient } from "../generated/prisma";
import seedMockData from "./mock-data-seed";
import process from "process";

const prisma = new PrismaClient();

async function main() {
  // Seed Buildings
  console.log("Seeding buildings...");
  
  const fxCampus = await prisma.building.upsert({
    where: { name: "FX Campus" },
    update: {
      address: "Fx Sudirman F6, Jl. Pintu Satu Senayan No.3, RT.1/RW.3, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270, Indonesia",
    },
    create: {
      name: "FX Campus",
      address: "Fx Sudirman F6, Jl. Pintu Satu Senayan No.3, RT.1/RW.3, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270, Indonesia",
    },
  });

  const jwcCampus = await prisma.building.upsert({
    where: { name: "JWC Campus" },
    update: {
      address: "Jl. Hang Lekir I No.6, RT.1/RW.3, Senayan, Kec. Kby. Baru, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270, Indonesia",
    },
    create: {
      name: "JWC Campus",
      address: "Jl. Hang Lekir I No.6, RT.1/RW.3, Senayan, Kec. Kby. Baru, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270, Indonesia",
    },
  });

  // Seed Categories
  console.log("Seeding categories...");
  
  const categories = [
    { name: "Electronics", description: "Electronic items" },
    { name: "Personal Belonging", description: "Personal belongings" },
    { name: "Clothing", description: "Clothing items" },
    { name: "Sports Equipment", description: "Sports equipment" },
    { name: "Other", description: "Other items" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log("✓ Seeding complete!");
  console.log(`  - FX Campus: ${fxCampus.building_id}`);
  console.log(`  - JWC Campus: ${jwcCampus.building_id}`);
  console.log(`  - ${categories.length} categories created`);

  // Seed mock data for testing
  await seedMockData();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
