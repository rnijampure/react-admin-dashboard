// src/components/main/ProductTable/refactorEditTable/EditSingleProductForm.tsx
import { useForm } from "react-hook-form";
import { ProductFields } from "./EditProductFields";
import { useEffect, useRef } from "react";
import type { BoundStoreState } from "../../../../../store/useBoundStore";
import useBoundStore from "../../../../../store/useBoundStore";
import { useQueryClient } from "@tanstack/react-query";
export default function EditSingleProductForm({
  product,
  mutation,
  onClose,
}: any) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { dirtyFields },
    getValues,
  } = useForm({
    defaultValues: {
      products: [
        {
          name: product.name,
          category: [product?.category.toString()],
          price: product.price,
          stock: product.stock,
          description: product.description,
        },
      ],
    },
    mode: "onChange", // This ensures dirty state is calculated as the user types
  });

  const openNotification = useBoundStore(
    (state: BoundStoreState) => state.notify,
  );
  const stageEdit = useBoundStore((state: BoundStoreState) => state.stageEdit);
  const queryClient = useQueryClient();

  const onSave = (data: any) => {
    var updatedData = data.products[0];
    openNotification(
      `Product "${updatedData.name}" saved successfully!`,
      "success",
    );
    stageEdit(
      updatedData,
      () => {
        mutation.mutate(
          { id: product.id, ...updatedData },
          {
            onSuccess: onClose,
          },
        );
      },
      queryClient,
    );
    onClose();
    // data.products[0] contains the single edited item
  };
  // Performance-friendly way to keep form in sync with cache
  // 2. ONLY reset once when the ID changes
  // 1. Create a "ref" to store the ID we last loaded
  const loadedIdRef = useRef<string | null>(null);

  useEffect(() => {
    // 2. ONLY reset if the ID is different from what's already in the form
    if (product?.id && product.id !== loadedIdRef.current) {
      reset({
        products: [
          {
            ...product,
            category: Array.isArray(product.category)
              ? product.category
              : [product.category?.toString()].filter(Boolean),
          },
        ],
      });

      // 3. Mark this ID as loaded
      loadedIdRef.current = product.id;
    }
  }, [product.id, reset, product]); // product.id is the key stabilizer
  return (
    <form onSubmit={handleSubmit(onSave)}>
      <ProductFields
        index={0} // Hardcoded to 0 since there is only one
        product={product}
        register={register}
        control={control}
        onClose={onClose}
        dirtyFields={dirtyFields}
        getValues={getValues}
        onSaveIndividual={() => handleSubmit(onSave)()}
      />
    </form>
  );
}
