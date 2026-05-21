import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcryptjs";
import process from "process";

const prisma = new PrismaClient();

// Users extracted from frontend mock data
const MOCK_USERS = [
  { name: "Alex Tan", email: "alex.tan@binus.ac.id", affiliation: "Student" },
  { name: "Maya Sari", email: "maya.sari@binus.ac.id", affiliation: "Staff" },
  { name: "Rudi Hartono", email: "rudi.hartono@binus.ac.id", affiliation: "Student" },
  { name: "Eka Putri", email: "eka.putri@binus.ac.id", affiliation: "Student" },
  { name: "Budi Wijaya", email: "budi.wijaya@binus.ac.id", affiliation: "Staff" },
  { name: "Hendra", email: "hendra@binus.ac.id", affiliation: "Staff" },
  { name: "Dina Kusuma", email: "dina.kusuma@binus.ac.id", affiliation: "Student" },
  { name: "Siti Nurhaliza", email: "siti.nurhaliza@binus.ac.id", affiliation: "Student" },
  { name: "Toni Saputra", email: "toni.saputra@binus.ac.id", affiliation: "Student" },
  { name: "Wina Widjaya", email: "wina.widjaya@binus.ac.id", affiliation: "Staff" },
  { name: "Joni Santoso", email: "joni.santoso@binus.ac.id", affiliation: "Staff" },
  { name: "Kurnia", email: "kurnia@binus.ac.id", affiliation: "Student" },
  { name: "Lina Santoso", email: "lina.santoso@binus.ac.id", affiliation: "Student" },
  { name: "Mulia", email: "mulia@binus.ac.id", affiliation: "Staff" },
  { name: "Nadia Rahman", email: "nadia.rahman@binus.ac.id", affiliation: "Student" },
  { name: "Okta Wijaya", email: "okta.wijaya@binus.ac.id", affiliation: "Staff" },
  { name: "Peri Suryanto", email: "peri.suryanto@binus.ac.id", affiliation: "Student" },
  { name: "Quentin Lee", email: "quentin.lee@binus.ac.id", affiliation: "Student" },
  { name: "Rita Hermawan", email: "rita.hermawan@binus.ac.id", affiliation: "Staff" },
  { name: "Sandro", email: "sandro@binus.ac.id", affiliation: "Student" },
  { name: "Tara Wilson", email: "tara.wilson@binus.ac.id", affiliation: "Staff" },
  { name: "Upik Novita", email: "upik.novita@binus.ac.id", affiliation: "Student" },
  { name: "Vera", email: "vera@binus.ac.id", affiliation: "Staff" },
  { name: "Wawan", email: "wawan@binus.ac.id", affiliation: "Staff" },
  { name: "Xander", email: "xander@binus.ac.id", affiliation: "Student" },
  { name: "Yani", email: "yani@binus.ac.id", affiliation: "Staff" },
  { name: "Zia", email: "zia@binus.ac.id", affiliation: "Student" },
  { name: "Aldo", email: "aldo@binus.ac.id", affiliation: "Staff" },
  { name: "Bambang", email: "bambang@binus.ac.id", affiliation: "Student" },
  { name: "Cecilia", email: "cecilia@binus.ac.id", affiliation: "Staff" },
];

async function main() {
  console.log("Seeding users from mock data...");

  let createdCount = 0;
  let skippedCount = 0;

  for (const userData of MOCK_USERS) {
    try {
      // Map affiliation to role
      const role = userData.affiliation === "Staff" ? "STAFF" : "PUBLIC";

      // Hash password (default: user@123456)
      const hashedPassword = await bcrypt.hash("user@123456", 10);

      // Upsert user (create if doesn't exist, skip if already exists)
      const user = await prisma.user.upsert({
        where: { personal_email: userData.email },
        update: {}, // Don't update if exists
        create: {
          name: userData.name,
          personal_email: userData.email,
          password: hashedPassword,
          role: role as "PUBLIC" | "STAFF" | "SUPERADMIN",
          affiliation: userData.affiliation,
        },
      });

      console.log(`✓ User created: ${userData.name} (${userData.email}) - Role: ${role}`);
      createdCount++;
    } catch (error) {
      if (error instanceof Error && error.message.includes("Unique constraint failed")) {
        console.log(`→ User already exists: ${userData.email}`);
        skippedCount++;
      } else {
        console.error(`✗ Error creating user ${userData.name}:`, error);
      }
    }
  }

  console.log("\n✓ User seeding complete!");
  console.log(`  - Created: ${createdCount} users`);
  console.log(`  - Skipped: ${skippedCount} users (already exist)`);
  console.log("\nDefault password for all users: user@123456");
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
