import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Test users (mock claimers and finders)
const TEST_USERS = [
  { name: "Test Claimer 1", email: "claimer1@binus.ac.id", role: "PUBLIC" },
  { name: "Test Claimer 2", email: "claimer2@binus.ac.id", role: "PUBLIC" },
  { name: "Test Staff Approver", email: "staff.approver@binus.ac.id", role: "STAFF" },
];

// Mock rooms for buildings
const MOCK_ROOMS = [

    // JWC Campus - Sublevels
  { buildingName: "JWC Campus", roomNumber: null, roomName: "Cafetaria" },
  { buildingName: "JWC Campus", roomNumber: null, roomName: "Student Lounge" },
  { buildingName: "JWC Campus", roomNumber: null, roomName: "CIDER Room" },
  { buildingName: "JWC Campus", roomNumber: null, roomName: "Meeting Room 1" },
  { buildingName: "JWC Campus", roomNumber: null, roomName: "Meeting Room 2" },

  // JWC Campus - Floor 1
  { buildingName: "JWC Campus", roomNumber: null, roomName: "Lobby" },
  { buildingName: "JWC Campus", roomNumber: 102, roomName: "Student Service Center" },

  // JWC Campus - Floor 2 (201-213)
  { buildingName: "JWC Campus", roomNumber: 201, roomName: "Room 201" },
  { buildingName: "JWC Campus", roomNumber: 202, roomName: "Room 202" },
  { buildingName: "JWC Campus", roomNumber: 203, roomName: "Room 203" },
  { buildingName: "JWC Campus", roomNumber: 204, roomName: "Room 204" },
  { buildingName: "JWC Campus", roomNumber: 205, roomName: "Room 205" },
  { buildingName: "JWC Campus", roomNumber: 206, roomName: "Room 206" },
  { buildingName: "JWC Campus", roomNumber: 207, roomName: "Room 207" },
  { buildingName: "JWC Campus", roomNumber: 208, roomName: "Room 208" },
  { buildingName: "JWC Campus", roomNumber: 209, roomName: "Room 209" },
  { buildingName: "JWC Campus", roomNumber: 210, roomName: "Room 210" },
  { buildingName: "JWC Campus", roomNumber: 211, roomName: "Room 211" },
  { buildingName: "JWC Campus", roomNumber: 212, roomName: "Room 212" },
  { buildingName: "JWC Campus", roomNumber: 213, roomName: "Room 213" },

  // JWC Campus - Floor 3 (301-313)
  { buildingName: "JWC Campus", roomNumber: 301, roomName: "Room 301" },
  { buildingName: "JWC Campus", roomNumber: 302, roomName: "Room 302" },
  { buildingName: "JWC Campus", roomNumber: 303, roomName: "Room 303" },
  { buildingName: "JWC Campus", roomNumber: 304, roomName: "Room 304" },
  { buildingName: "JWC Campus", roomNumber: 305, roomName: "Room 305" },
  { buildingName: "JWC Campus", roomNumber: 306, roomName: "Room 306" },
  { buildingName: "JWC Campus", roomNumber: 307, roomName: "Room 307" },
  { buildingName: "JWC Campus", roomNumber: 308, roomName: "Room 308" },
  { buildingName: "JWC Campus", roomNumber: 309, roomName: "Room 309" },
  { buildingName: "JWC Campus", roomNumber: 310, roomName: "Room 310" },
  { buildingName: "JWC Campus", roomNumber: 311, roomName: "Room 311" },
  { buildingName: "JWC Campus", roomNumber: 312, roomName: "Room 312" },
  { buildingName: "JWC Campus", roomNumber: 313, roomName: "Room 313" },

  // JWC Campus - Floor 4 (401-407)
  { buildingName: "JWC Campus", roomNumber: 401, roomName: "Room 401" },
  { buildingName: "JWC Campus", roomNumber: 402, roomName: "Room 402" },
  { buildingName: "JWC Campus", roomNumber: 403, roomName: "Room 403" },
  { buildingName: "JWC Campus", roomNumber: 404, roomName: "Room 404" },
  { buildingName: "JWC Campus", roomNumber: 405, roomName: "Room 405" },
  { buildingName: "JWC Campus", roomNumber: 406, roomName: "Room 406" },
  { buildingName: "JWC Campus", roomNumber: 407, roomName: "Room 407" },

  // JWC Campus - Special rooms (no room number)
  { buildingName: "JWC Campus", roomNumber: null, roomName: "Library" },
  { buildingName: "JWC Campus", roomNumber: null, roomName: "Cafeteria" },
  { buildingName: "JWC Campus", roomNumber: null, roomName: "Student Lounge" },

  // FX Campus - Floor 6 (601-629)
  { buildingName: "FX Campus", roomNumber: 601, roomName: "Auditorium" },
  { buildingName: "FX Campus", roomNumber: 602, roomName: "Room 602" },
  { buildingName: "FX Campus", roomNumber: 603, roomName: "Room 603" },
  { buildingName: "FX Campus", roomNumber: 604, roomName: "Room 604" },
  { buildingName: "FX Campus", roomNumber: 605, roomName: "Room 605" },
  { buildingName: "FX Campus", roomNumber: 606, roomName: "Room 606" },
  { buildingName: "FX Campus", roomNumber: 607, roomName: "Room 607" },
  { buildingName: "FX Campus", roomNumber: 608, roomName: "Room 608" },
  { buildingName: "FX Campus", roomNumber: 609, roomName: "Room 609" },
  { buildingName: "FX Campus", roomNumber: 610, roomName: "Room 610" },
  { buildingName: "FX Campus", roomNumber: 611, roomName: "Room 611" },
  { buildingName: "FX Campus", roomNumber: 612, roomName: "Room 612" },
  { buildingName: "FX Campus", roomNumber: 613, roomName: "Photography Room" },
  { buildingName: "FX Campus", roomNumber: 614, roomName: "Room 614" },
  { buildingName: "FX Campus", roomNumber: 615, roomName: "Room 615" },
  { buildingName: "FX Campus", roomNumber: 616, roomName: "Room 616" },
  { buildingName: "FX Campus", roomNumber: 617, roomName: "Room 617" },
  { buildingName: "FX Campus", roomNumber: 618, roomName: "Room 618" },
  { buildingName: "FX Campus", roomNumber: 619, roomName: "Room 619" },
  { buildingName: "FX Campus", roomNumber: 620, roomName: "Room 620" },
  { buildingName: "FX Campus", roomNumber: 621, roomName: "Room 621" },
  { buildingName: "FX Campus", roomNumber: 622, roomName: "Room 622" },
  { buildingName: "FX Campus", roomNumber: 623, roomName: "Room 623" },
  { buildingName: "FX Campus", roomNumber: 624, roomName: "Room 624" },
  { buildingName: "FX Campus", roomNumber: 625, roomName: "Room 625" },
  { buildingName: "FX Campus", roomNumber: 626, roomName: "Room 626" },
  { buildingName: "FX Campus", roomNumber: 627, roomName: "Room 627" },
  { buildingName: "FX Campus", roomNumber: 628, roomName: "Room 628" },
  { buildingName: "FX Campus", roomNumber: 629, roomName: "Room 629" },

  // FX Campus - Special rooms (no room number)
  { buildingName: "FX Campus", roomNumber: null, roomName: "Student Lounge" },
  { buildingName: "FX Campus", roomNumber: null, roomName: "Library" },
  { buildingName: "FX Campus", roomNumber: null, roomName: "Cafeteria" },
];

// Mock items (will link to rooms and buildings)
const MOCK_ITEMS = [
  {
    name: "Apple AirPods Pro",
    description: "White AirPods Pro with charging case",
    color_hex: "#FFFFFF",
    color_bucket: "WHITE",
    category: "Electronics",
    building: "FX Campus",
    room: "Library",
    finder_name: "John Smith",
    finder_contact: "john@example.com",
    finder_affiliation: "Student",
    found_at: new Date("2025-05-15T10:30:00"),
    found_time_known: true,
    status: "CLAIMED" as const, // Has PENDING claim
  },
  {
    name: "Blue Backpack",
    description: "Navy blue Nike backpack with laptop compartment",
    color_hex: "#000080",
    color_bucket: "BLUE",
    category: "Personal Belonging",
    building: "FX Campus",
    room: "Auditorium",
    finder_name: "Maya Sari",
    finder_contact: "maya@example.com",
    finder_affiliation: "Staff",
    found_at: new Date("2025-05-16T14:00:00"),
    found_time_known: true,
    status: "CLAIMED" as const, // Has APPROVED claim
  },
  {
    name: "Black Wallet",
    description: "Leather wallet with ID card inside",
    color_hex: "#000000",
    color_bucket: "BLACK",
    category: "Personal Belonging",
    building: "JWC Campus",
    room: "Cafeteria",
    finder_name: "Ahmad Rahmat",
    finder_contact: "ahmad@example.com",
    finder_affiliation: "Student",
    found_at: new Date("2025-05-17T11:45:00"),
    found_time_known: true,
    status: "COLLECTED" as const, // Has COLLECTED claim
  },
  {
    name: "Red Sports Watch",
    description: "Smartwatch with fitness tracking features",
    color_hex: "#FF0000",
    color_bucket: "RED",
    category: "Electronics",
    building: "FX Campus",
    room: "Photography Room",
    finder_name: "Budi Wijaya",
    finder_contact: "budi@example.com",
    finder_affiliation: "Staff",
    found_at: new Date("2025-05-18T06:30:00"),
    found_time_known: true,
    status: "CLAIMED" as const, // Has PENDING claim
  },
  {
    name: "Gray Hoodie",
    description: "Adidas gray hoodie size M",
    color_hex: "#808080",
    color_bucket: "GRAY",
    category: "Clothing",
    building: "JWC Campus",
    room: "Student Lounge",
    finder_name: "Siti Nurhaliza",
    finder_contact: "siti@example.com",
    finder_affiliation: "Student",
    found_at: new Date("2025-05-19T16:20:00"),
    found_time_known: true,
    status: "ACTIVE" as const, // Has REJECTED claim but reverts to ACTIVE
  },
  {
    name: "Tennis Racket",
    description: "Wilson Pro Staff tennis racket",
    color_hex: "#FF6B35",
    color_bucket: "ORANGE",
    category: "Sports Equipment",
    building: "FX Campus",
    room: "Room 618",
    finder_name: "Rudi Hartono",
    finder_contact: "rudi@example.com",
    finder_affiliation: "Student",
    found_at: new Date("2025-05-20T15:00:00"),
    found_time_known: true,
    status: "ACTIVE" as const, // No claims
  },
  {
    name: "Silver Laptop",
    description: "Dell XPS 13, very slim laptop",
    color_hex: "#C0C0C0",
    color_bucket: "SILVER",
    category: "Electronics",
    building: "FX Campus",
    room: "Auditorium",
    finder_name: "Eka Putri",
    finder_contact: "eka@example.com",
    finder_affiliation: "Student",
    found_at: new Date("2025-05-14T09:00:00"),
    found_time_known: true,
    status: "COLLECTED" as const, // Has COLLECTED claim
  },
  {
    name: "Green Jacket",
    description: "Columbia windbreaker jacket",
    color_hex: "#008000",
    color_bucket: "GREEN",
    category: "Clothing",
    building: "JWC Campus",
    room: "Room 201",
    finder_name: "Dina Kusuma",
    finder_contact: "dina@example.com",
    finder_affiliation: "Student",
    found_at: new Date("2025-05-13T17:30:00"),
    found_time_known: true,
    status: "ACTIVE" as const, // No claims
  },
  {
    name: "Vintage Watch",
    description: "Old Timex watch from the 1980s",
    color_hex: "#8B4513",
    color_bucket: "BROWN",
    category: "Personal Belonging",
    building: "JWC Campus",
    room: "Library",
    finder_name: "Pak Jito",
    finder_contact: "jito@example.com",
    finder_affiliation: "Staff",
    found_at: new Date("2025-03-15T10:00:00"), // Old date - past 30 days
    found_time_known: true,
    status: "RETURNED" as const, // Past expiry, returned to finder
  },
  {
    name: "Sunglasses",
    description: "Ray-Ban aviator sunglasses",
    color_hex: "#FFD700",
    color_bucket: "YELLOW",
    category: "Personal Belonging",
    building: "FX Campus",
    room: "Student Lounge",
    finder_name: "Ibu Santi",
    finder_contact: "santi@example.com",
    finder_affiliation: "Staff",
    found_at: new Date("2025-03-20T14:30:00"), // Old date - past 30 days
    found_time_known: true,
    status: "RETURNED" as const, // Past expiry, returned to finder
  },
];

// Mock claims (link items to claimers)
const MOCK_CLAIMS = [
  {
    itemIndex: 0, // Apple AirPods Pro
    claimerIndex: 0, // Test Claimer 1
    ownership_desc: "I bought these AirPods last month and lost them at the library yesterday",
    status: "PENDING" as const,
    requested_at: new Date("2025-05-15T11:00:00"),
  },
  {
    itemIndex: 1, // Blue Backpack
    claimerIndex: 1, // Test Claimer 2
    ownership_desc: "This is my blue Nike backpack with all my textbooks inside",
    status: "APPROVED" as const,
    requested_at: new Date("2025-05-16T14:30:00"),
    decision_at: new Date("2025-05-16T16:00:00"),
    approved_by: 2, // Staff Approver
    staff_notes: "Verified ownership - ID and receipts provided",
  },
  {
    itemIndex: 2, // Black Wallet
    claimerIndex: 0, // Test Claimer 1
    ownership_desc: "My black leather wallet with my student ID inside",
    status: "COLLECTED" as const,
    requested_at: new Date("2025-05-17T12:00:00"),
    decision_at: new Date("2025-05-17T13:30:00"),
    resolved_at: new Date("2025-05-17T15:00:00"),
    approved_by: 2, // Staff Approver
    staff_notes: "Collected by claimer on 17/05/2025",
  },
  {
    itemIndex: 3, // Red Sports Watch
    claimerIndex: 1, // Test Claimer 2
    ownership_desc: "My smartwatch that I wore to the gym, has my fitness data",
    status: "PENDING" as const,
    requested_at: new Date("2025-05-18T07:00:00"),
  },
  {
    itemIndex: 4, // Gray Hoodie
    claimerIndex: 0, // Test Claimer 1
    ownership_desc: "Lost my Adidas hoodie during basketball practice",
    status: "REJECTED" as const,
    requested_at: new Date("2025-05-19T16:45:00"),
    decision_at: new Date("2025-05-19T17:30:00"),
    staff_notes: "Unable to verify ownership - no distinguishing marks or receipts",
    approved_by: 2, // Staff Approver
  },
  {
    itemIndex: 6, // Silver Laptop
    claimerIndex: 0, // Test Claimer 1
    ownership_desc: "My Dell XPS 13 laptop with my work files on it",
    status: "COLLECTED" as const,
    requested_at: new Date("2025-05-14T10:00:00"),
    decision_at: new Date("2025-05-14T11:00:00"),
    resolved_at: new Date("2025-05-14T12:00:00"),
    approved_by: 2, // Staff Approver
    staff_notes: "Verified via serial number sticker - collected same day",
  },
];

async function seedMockData() {
  try {
    console.log("\n🌱 Seeding mock data for practice run...\n");

    // 1. Create test users
    console.log("  → Creating test users...");
    const testUsers = [];
    for (const userData of TEST_USERS) {
      const hashedPassword = await bcrypt.hash("password123", 10);
      const user = await prisma.user.upsert({
        where: { personal_email: userData.email },
        update: {},
        create: {
          name: userData.name,
          personal_email: userData.email,
          password: hashedPassword,
          role: userData.role as "PUBLIC" | "STAFF",
          affiliation: userData.role === "STAFF" ? "Staff" : "Student",
        },
      });
      testUsers.push(user);
    }
    console.log(`    ✓ Created ${testUsers.length} test users`);

    // 2. Get existing buildings and categories
    console.log("  → Fetching existing buildings and categories...");
    const buildings = await prisma.building.findMany();
    const categories = await prisma.category.findMany();

    if (buildings.length === 0 || categories.length === 0) {
      throw new Error(
        "No buildings or categories found. Run main seed first: npx prisma db seed"
      );
    }
    console.log(`    ✓ Found ${buildings.length} buildings, ${categories.length} categories`);

    // 3. Create mock rooms (prevent duplicates by checking before creating)
    console.log("  → Creating mock rooms...");
    const roomMap = new Map<string, string>(); // "building:roomName" -> room_id
    let roomsCreated = 0;

    for (const roomData of MOCK_ROOMS) {
      const building = buildings.find((b) => b.name === roomData.buildingName);
      if (!building) continue;

      const roomKey = `${roomData.buildingName}:${roomData.roomName}`;
      
      // Check if room already exists
      let room = await prisma.room.findFirst({
        where: {
          building_id: building.building_id,
          room_name: roomData.roomName,
        },
      });

      // Only create if it doesn't exist
      if (!room) {
        room = await prisma.room.create({
          data: {
            room_number: roomData.roomNumber,
            room_name: roomData.roomName,
            building_id: building.building_id,
          },
        });
      }
      
      roomMap.set(roomKey, room.room_id);
      roomsCreated++;
    }
    console.log(`    ✓ Verified ${roomsCreated} mock rooms`);

    // 4. Create mock items
    console.log("  → Creating mock items...");
    const createdItems = [];
    for (const itemData of MOCK_ITEMS) {
      const building = buildings.find((b) => b.name === itemData.building);
      const category = categories.find((c) => c.name === itemData.category);
      const roomId = roomMap.get(`${itemData.building}:${itemData.room}`);

      if (!building || !category || !roomId) {
        console.log(
          `    ⚠ Skipping item "${itemData.name}" - building/category/room not found`
        );
        continue;
      }

      const item = await prisma.item.create({
        data: {
          name: itemData.name,
          description: itemData.description,
          color_hex: itemData.color_hex,
          color_bucket: itemData.color_bucket,
          category_id: category.category_id,
          building_id: building.building_id,
          room_id: roomId,
          finder_name: itemData.finder_name,
          finder_contact: itemData.finder_contact,
          finder_affiliation: itemData.finder_affiliation,
          found_at: itemData.found_at,
          found_time_known: itemData.found_time_known,
          expires_at: new Date(itemData.found_at.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days
          recorded_by: testUsers[2].user_id, // Test Staff Approver records items
          status: itemData.status, // Use status from MOCK_ITEMS
        },
      });
      createdItems.push(item);

      // Add mock photo for each item
      await prisma.itemPhoto.create({
        data: {
          item_id: item.item_id,
          storage_url: "/placeholder.png", // Using placeholder
          mime_type: "image/png",
        },
      });
    }
    console.log(`    ✓ Created ${createdItems.length} mock items with photos`);

    // 5. Create mock claims
    console.log("  → Creating mock claims...");
    let claimsCreated = 0;
    for (const claimData of MOCK_CLAIMS) {
      const item = createdItems[claimData.itemIndex];
      const claimer = testUsers[claimData.claimerIndex];

      const claim = await prisma.claimRequest.create({
        data: {
          item_id: item.item_id,
          claimer_id: claimer.user_id,
          status: claimData.status,
          ownership_desc: claimData.ownership_desc,
          staff_notes: claimData.staff_notes,
          requested_at: claimData.requested_at,
          decision_at: claimData.decision_at || null,
          resolved_at: claimData.resolved_at || null,
        },
      });

      // Create audit log for claim
      if (claimData.status !== "PENDING") {
        const approver = testUsers[claimData.approved_by || 2];
        
        // Determine new status based on claim status
        let auditAction = "APPROVE";
        let newItemStatus: "ACTIVE" | "CLAIMED" | "COLLECTED" | "RETURNED" = "ACTIVE";
        
        if (claimData.status === "REJECTED") {
          auditAction = "REJECT";
          newItemStatus = "ACTIVE";
        } else if (claimData.status === "COLLECTED") {
          auditAction = "APPROVE";
          newItemStatus = "COLLECTED";
        } else if (claimData.status === "APPROVED") {
          auditAction = "APPROVE";
          newItemStatus = "CLAIMED";
        }
        
        await prisma.auditLog.create({
          data: {
            item_id: item.item_id,
            changed_by: approver.user_id,
            action: auditAction as any,
            old_status: "ACTIVE",
            new_status: newItemStatus,
            notes: `Claim ${claimData.status.toLowerCase()}: ${claimData.ownership_desc}`,
          },
        });
      }

      claimsCreated++;
    }
    console.log(`    ✓ Created ${claimsCreated} mock claims`);

    console.log("\n✨ Mock data seeded successfully!\n");
    console.log("📝 Test Users:");
    testUsers.forEach((u, i) => {
      console.log(`   ${i + 1}. ${u.name} (${u.personal_email})`);
    });
    console.log("\n💡 Login with any test user + password: password123\n");

  } catch (error) {
    console.error("❌ Error seeding mock data:", error);
    throw error;
  }
}

export default seedMockData;
