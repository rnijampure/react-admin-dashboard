import type { UseFormRegister, Control } from "react-hook-form";
import type { useUpdateProductMutation } from "../../../feature/products/hooks/useProductAction";
import type { Product } from "../../../../types/types";

export interface EditProductFormProps {
  product: Product;
  formId?: number;
  mutation?: ReturnType<typeof useUpdateProductMutation> | undefined;
  onClose?: () => void;
  handleSubmit?: any;
  index: number;
  register: UseFormRegister<any>;
  control: Control<any>;
  categories?: string[];
  onSaveIndividual?: (id: string | number) => void;
  dirtyFields?: any;
  getValues?: any;
}
