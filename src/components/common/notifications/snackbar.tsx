//src\components\common\notifications\snackbar.tsx
import Snackbar from "@mui/material/Snackbar";
import Slide, { type SlideProps } from "@mui/material/Slide";
import { Alert, Box, Button, Typography } from "@mui/material";
import { UndoProgressBar } from "./UndoProgressBar";
import { useQueryClient } from "@tanstack/react-query";
import {
  useBoundStore,
  type BoundStoreState,
} from "../../../store/useBoundStore";

export function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const UNDO_DURATION = 10_000;

const SnackbarComponent = () => {
  const queryClient = useQueryClient();

  const notification = useBoundStore((s) => s.notification);
  const closeNotification = useBoundStore(
    (s: BoundStoreState) => s.closeNotification,
  );

  const cancelEdit = () => {
    useBoundStore.getState().cancelEdit(queryClient);
    closeNotification();
  };

  const isOpen = notification?.isOpen ?? false;
  const message = notification?.message ?? "";
  const severity = notification?.severity ?? "info";

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={UNDO_DURATION}
      onClose={(_, reason) => {
        if (reason === "clickaway") return;
        closeNotification();
      }}
      TransitionComponent={SlideTransition}
    >
      <Alert
        severity={severity}
        elevation={3}
        sx={(theme) => ({
          width: "100%",
          padding: 0,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,

          "& .MuiAlert-icon": {
            marginRight: theme.spacing(1.5),
            color:
              theme.palette.brand[
                severity as keyof typeof theme.palette.brand
              ] ?? theme.palette.text.primary,
          },
        })}
        action={
          <Button
            onClick={cancelEdit}
            size="small"
            sx={(theme) => ({
              ml: 1,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: theme.palette.brand.main,
              borderRadius: 6,

              "&:hover": {
                backgroundColor: theme.palette.brand.soft,
              },
            })}
          >
            UNDO
          </Button>
        }
      >
        {/* Progress bar */}
        {isOpen && <UndoProgressBar duration={UNDO_DURATION} />}

        {/* Message */}
        <Box sx={{ px: 2, py: 1.25 }}>
          <Typography
            variant="body2"
            sx={(theme) => ({
              lineHeight: 1.5,
              fontWeight: 500,
              color: theme.palette.text.primary,
            })}
          >
            {message}
          </Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
