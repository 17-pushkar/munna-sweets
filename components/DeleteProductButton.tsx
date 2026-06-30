"use client";

import { deleteProduct } from "@/app/admin/products/actions";

type DeleteProductButtonProps = {
  productId: string;
  productName: string;
};

export default function DeleteProductButton({
  productId,
  productName,
}: DeleteProductButtonProps) {
  return (
    <form
      action={deleteProduct}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `Are you sure you want to delete "${productName}"?`
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={productId} />

      <button
        type="submit"
        className="w-full sm:w-72 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
      >
        Delete
      </button>
    </form>
  );
}