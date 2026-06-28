"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name"));
  const slug = String(formData.get("slug"));
  const image = String(formData.get("image"));
  const category = String(formData.get("category"));
  const badge = String(formData.get("badge"));
  const description = String(formData.get("description"));
  const ingredientsText = String(formData.get("ingredients"));

  const ingredients = ingredientsText
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  await prisma.product.create({
    data: {
      name,
      slug,
      image,
      category,
      badge,
      description,
      ingredients,
      featured: true,
      weightOptions: {
        create: [
          { weight: "250g", price: Number(formData.get("price250g")) },
          { weight: "500g", price: Number(formData.get("price500g")) },
          { weight: "1kg", price: Number(formData.get("price1kg")) },
          { weight: "2kg", price: Number(formData.get("price2kg")) },
        ],
      },
    },
  });

  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get("id"));

  await prisma.product.delete({
    where: {
      id,
    },
  });

  redirect("/admin/products");
}
export async function updateProduct(formData: FormData) {
  const id = String(formData.get("id"));

  const ingredients = String(formData.get("ingredients"))
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  await prisma.product.update({
    where: { id },
    data: {
      name: String(formData.get("name")),
      slug: String(formData.get("slug")),
      image: String(formData.get("image")),
      category: String(formData.get("category")),
      badge: String(formData.get("badge")),
      description: String(formData.get("description")),
      ingredients,
      weightOptions: {
        deleteMany: {},
        create: [
          { weight: "250g", price: Number(formData.get("price250g")) },
          { weight: "500g", price: Number(formData.get("price500g")) },
          { weight: "1kg", price: Number(formData.get("price1kg")) },
          { weight: "2kg", price: Number(formData.get("price2kg")) },
        ],
      },
    },
  });

  redirect("/admin/products");
}