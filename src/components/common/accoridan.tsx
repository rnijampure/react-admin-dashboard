// src/components/common/accordion.tsx
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";

import type { Product } from "../feature/summary/types";
import EditProductForm from "../main/ProductTable/editTable_old";
import EditSingleProductForm from "../main/ProductTable/EditTable/EditSingleProductForm";

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
  return (
    <>
      <Typography variant="caption" color="text.secondary">
        Editing {product.length} products
      </Typography>

      {product.map((item: Product, index: number) => (
        <Accordion
          key={item.id}
          defaultExpanded={index === 0}
          className="m-3.5"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${item.id}-content`}
            id={`panel-${item.id}-header`}
          >
            <Typography>{item.name}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <EditSingleProductForm
              product={item}
              key={item.id}
              mutation={mutation}
              onClose={onClose}
              formId={index}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
