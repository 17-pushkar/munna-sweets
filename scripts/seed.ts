import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.create({
    data: {
      name: "Gulab Jamun",
      slug: "gulab-jamun",
      image: "/gulab-jamun.webp",
      description:
        "Soft, juicy and rich gulab jamuns made with premium ingredients and dipped in fragrant sugar syrup.",
      ingredients: ["Khoya", "Sugar", "Cardamom", "Ghee"],
      category: "Milk Sweets",
      badge: "⭐ Best Seller",
      featured: true,
      weightOptions: {
        create: [
          { weight: "250g", price: 60 },
          { weight: "500g", price: 110 },
          { weight: "1kg", price: 220 },
          { weight: "2kg", price: 430 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Rasgulla",
      slug: "rasgulla",
      image: "/rasgulla.webp",
      description:
        "Fresh, spongy and delicious rasgullas prepared with soft chhena and light sugar syrup.",
      ingredients: ["Chhena", "Sugar", "Water", "Rose essence"],
      category: "Bengali Sweets",
      badge: "🔥 Most Popular",
      featured: true,
      weightOptions: {
        create: [
          { weight: "250g", price: 55 },
          { weight: "500g", price: 100 },
          { weight: "1kg", price: 200 },
          { weight: "2kg", price: 390 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Kaju Katli",
      slug: "kaju-katli",
      image: "/kaju-katli.webp",
      description:
        "Premium kaju katli made with fine cashews, smooth texture and a rich traditional taste.",
      ingredients: ["Cashew", "Sugar", "Ghee", "Silver leaf"],
      category: "Dry Fruit Sweets",
      badge: "👑 Premium",
      featured: true,
      weightOptions: {
        create: [
          { weight: "250g", price: 220 },
          { weight: "500g", price: 430 },
          { weight: "1kg", price: 850 },
          { weight: "2kg", price: 1680 },
        ],
      },
    },
  });

  console.log("Database seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });