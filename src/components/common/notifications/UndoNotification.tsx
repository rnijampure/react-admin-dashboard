import Button from "@mui/material/Button";
import { useCountdownStore } from "./countdownStore";
import { useBoundStore } from "../../../store/useBoundStore";

export function UndoNotification({ message, severity, onUndo }: any) {
  return (
    <>
      hi
      <div className="snackbar">
        {message}
        {` Item deleting in 30s...!`}
        {/* If you passed data, you could render a button here */}
        {message && (
          <Button size="small" onClick={stop}>
            UNDO
          </Button>
        )}
      </div>
    </>
  );
}
