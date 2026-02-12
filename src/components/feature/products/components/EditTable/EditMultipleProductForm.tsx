// src/components/main/ProductTable/refactorEditTable/EditMultipleProductForm.tsx
import { Button, Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useForm, useFieldArray } from "react-hook-form";
import { ProductFields } from "./EditProductFields";
import { useMemo } from "react";
import type { Product } from "../../../../../types/types";
import { useBulkUpdateMutation } from "../../hooks/useProductAction";

type Props = {
  product: Product[];
  mutation: any;
  onClose: () => void;
};

export default function EditMultipleAccordion({
  product,
  mutation,
  onClose,
}: Props) {
  const defaultValues = useMemo(
    () => ({
      products: product.map((p) => ({
        ...p,
        // Ensure nested fields are never undefined
        category: Array.isArray(p.category) ? p.category : [],
        description: p.description || "",
      })),
    }),
    [product],
  );
  // 1. Initialize Form with the products array
  const {
    register,
    control,
    handleSubmit,
    formState: { dirtyFields },
    reset, // 1. Pull reset from useForm
    getValues,
  } = useForm({
    defaultValues,
    mode: "onChange", // Required for real-time badge updates
  });

  const { fields } = useFieldArray({ control, name: "products" });

  const bulkMutation = useBulkUpdateMutation(); // Use our new bulk hook
  // 2. Individual Save Handler
  const handleSaveIndividual = (index: number) => {
    const allValues = getValues();
    const specificProduct = allValues.products[index];

    mutation.mutate(
      { id: product[index].id, ...specificProduct },
      { onSuccess: () => console.log(`Product ${index} saved!`) },
    );
  };
  // 2. The Reset Handler
  const handleResetAll = () => {
    // This reverts everything to the 'defaultValues' defined in useMemo
    reset(defaultValues);
  };
  const handleSaveAll = (data: any) => {
    const updates = data.products
      .map((item: any, index: number) => {
        // 1. Check if this specific row is dirty
        const isDirty = dirtyFields.products?.[index];
        if (!isDirty) return null;

        // 2. Destructure to remove metadata that crashes the backend
        const { id, _id, createdAt, updatedAt, ...cleanData } = item;

        return {
          id: product[index].id, // Use the stable ID from the original props
          ...cleanData,
        };
      })
      .filter(Boolean); // Remove pristine items

    if (updates.length > 0) {
      bulkMutation.mutate(
        { updates },
        {
          onSuccess: () => {
            console.log("Bulk update successful!");
            onClose();
          },
        },
      );
    } else {
      onClose(); // Nothing changed, just close
    }
  };
  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Editing {product.length} products</Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {/* 3. The Reset Button */}
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleResetAll}
            disabled={Object.keys(dirtyFields).length === 0} // Only show if something is dirty
          >
            Reset All
          </Button>

          <Button
            variant="contained"
            disabled={bulkMutation.isPending}
            onClick={handleSubmit(handleSaveAll)}
          >
            {bulkMutation.isPending ? "Saving All..." : "Save All Changes"}
          </Button>
        </Box>
      </Box>

      {fields.map((field, index) => (
        <Accordion key={field.id} defaultExpanded={index === 0} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography>{field.name || `Product ${index + 1}`}</Typography>
              {/* 🟢 Copy/Paste this into your AccordionSummary */}
              {(() => {
                const isDirty = dirtyFields.products?.[index];
                // Check if the entry exists and has at least one field marked as true
                if (isDirty && Object.keys(isDirty).length > 0) {
                  return (
                    <Typography
                      variant="caption"
                      sx={{
                        bgcolor: "info.main",
                        color: "white",
                        px: 1,
                        borderRadius: 1,
                        fontWeight: "bold",
                      }}
                    >
                      MODIFIED
                    </Typography>
                  );
                }
                return null;
              })()}
            </Box>
            {JSON.stringify(dirtyFields.products)}here ||
            {JSON.stringify(dirtyFields.products?.[index])}here
          </AccordionSummary>

          <AccordionDetails>
            <ProductFields
              index={index}
              product={field as any} // The field from useFieldArray
              register={register}
              control={control}
              onClose={onClose}
              dirtyFields={dirtyFields}
              getValues={getValues}
              onSaveIndividual={() => handleSaveIndividual(index)} // ✅ Pass the handler
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
