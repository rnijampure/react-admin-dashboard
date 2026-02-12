// src\components\main\ProductTable\refactorEditTable\EditProductFields.tsx
import { MenuProps, useProductCategories } from "./editTableHelper";
import { type EditProductFormProps } from "../../types/productsTypes";
import { formatDate } from "../../../../common/utils";
import Button from "@mui/material/Button";

import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

// ProductFields.tsx
export const ProductFields = ({
  index,
  register,
  control,
  product,
  onClose,
  onSaveIndividual, // Add this prop
  dirtyFields,
  getValues,
}: EditProductFormProps) => {
  // We prefix the name with `products.${index}.`
  const path = `products.${index}` as const;
  // Inside ProductFields.tsx
  const isItemDirty = dirtyFields?.products?.[index];
  //console.log("pATH", `${path}.name`);
  const categories = useProductCategories();
  // console.log("REGISTER FUNCTION ID FROM INSIDE PRODUCT FIELDS:", register);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        pt: 2,
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Product Name                                                         */}
      {/* ------------------------------------------------------------------ */}
      <Controller
        name={`${path}.name`}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Product Name "
            fullWidth
            onChange={(e) => {
              field.onChange(e); // Notify Hook Form
            }}
          />
        )}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Category (Multi-select)                                             */}
      {/* ------------------------------------------------------------------ */}
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>

        <Controller
          name={`${path}.category`}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              // ✅ FORCE VALUE TO BE AN ARRAY:
              // If field.value is null/undefined/string, MUI crashes. This ensures it's always [].
              value={Array.isArray(field.value) ? field.value : []}
              labelId="category-label"
              multiple
              label="Category"
              input={<OutlinedInput label="Category" />}
              renderValue={(selected) =>
                Array.isArray(selected) ? selected.join(", ") : ""
              }
              MenuProps={MenuProps}
            >
              {categories.map((cat: any, index: any) => (
                <MenuItem
                  key={`${cat.toString()}-${path}-${index}`}
                  value={cat}
                >
                  <Checkbox
                    checked={
                      Array.isArray(field.value) &&
                      field.value.includes(cat.toString())
                    }
                  />
                  <ListItemText primary={cat} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      {/* ------------------------------------------------------------------ */}
      {/* Price & Stock                                                       */}
      {/* ------------------------------------------------------------------ */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <Controller
          name={`${path}.price`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Price"
              type="number"
              fullWidth
              onChange={(e) => {
                field.onChange(e); // Notify Hook Form
                console.log("Form State after change price:", getValues());
              }}
            />
          )}
        />
        <Controller
          name={`${path}.Stock`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Stock"
              type="number"
              fullWidth
              onChange={(e) => {
                field.onChange(e); // Notify Hook Form
                console.log("Form State after change Stock:", getValues());
              }}
            />
          )}
        />
        <TextField
          label="Stock"
          type="number"
          {...register(`${path}.stock`, { valueAsNumber: true })}
        />
      </Box>

      {/* ------------------------------------------------------------------ */}
      {/* Read-only metadata                                                  */}
      {/* ------------------------------------------------------------------ */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <Box>
          <Typography variant="caption">Created at</Typography>
          <Typography variant="body2">
            {formatDate(product.createdAt)}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption">Updated at</Typography>
          <Typography variant="body2">
            {formatDate(product.updatedAt)}
          </Typography>
        </Box>
      </Box>

      {/* ------------------------------------------------------------------ */}
      {/* Description                                                         */}
      {/* ------------------------------------------------------------------ */}
      <TextField
        label="Description"
        multiline
        minRows={3}
        maxRows={6}
        {...register(`${path}.description`)}
      />
      <Box>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="button"
          variant="contained"
          disabled={!isItemDirty} // Only allow saving if something changed
          onClick={() => onSaveIndividual?.(product.id!)} // ✅ FIXED: Added handler
        >
          Save This Item
        </Button>
      </Box>
    </Box>
  );
};
