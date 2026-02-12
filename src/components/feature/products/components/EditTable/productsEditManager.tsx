//src\components\feature\products\components\productsEditManager.tsx
import type { UseMutationResult } from "@tanstack/react-query";
import DynamicSkeleton from "../../../../common/DynamicSkeleton";
import EditMultipleAccordion from "./EditMultipleProductForm";
import EditSingleProductForm from "./EditSingleProductForm";
import type { Product } from "../../../../../types/types";
import { mapRowToProduct } from "../../utils/utils";

export const returnDialogcontent = (
  editingProduct: any,
  updateProductMutation: UseMutationResult<
    Product,
    Error,
    Product,
    {
      previousProducts: Product[] | undefined;
    }
  >,
  closeEditDialog: () => void,
) => {
  return (
    <>
      {editingProduct.length > 1 ? (
        <EditMultipleAccordion
          product={editingProduct}
          mutation={updateProductMutation}
          onClose={closeEditDialog}
        />
      ) : editingProduct.length === 1 ? (
        <EditSingleProductForm
          product={mapRowToProduct(editingProduct[0])}
          mutation={updateProductMutation}
          onClose={closeEditDialog}
        />
      ) : (
        <DynamicSkeleton rowCount={4} rowHeight={48} headerHeight={32} />
      )}
    </>
  );
};
