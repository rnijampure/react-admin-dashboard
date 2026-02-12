//src\components\common\dialogBox.tsx
import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import type { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";

function PaperComponent(props: PaperProps) {
  const nodeRef = React.useRef<HTMLDivElement>(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

interface DraggableDialogProps {
  openDialog: boolean;
  handleClick: () => void;
  children?: React.ReactNode;
  title?: string | React.ReactNode;
  type?: number;
}

export default function DraggableDialog({
  openDialog,
  handleClick,
  children,
  title,
  type,
}: DraggableDialogProps) {
  return (
    <Dialog
      open={openDialog}
      onClose={handleClick}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {title || "Product"}
      </DialogTitle>

      {/* ✅ IMPORTANT FIX */}
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
