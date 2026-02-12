//D:\Projects\2025\REACT\react-admin-dashboard\admin-dashboard\src\components\layout\sideNotification\notificationDrawer.tsx
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { use, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  useBoundStore,
  type BoundStoreState,
} from "../../../store/useBoundStore";
//("../../../store/useDrawerStore");

const anchor = "right";
const list = (anchor: string) => (
  <>
    <Divider />
    <List>
      {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : ""}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
  </>
);
const drawerWidth = 540;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

const NotificationDrawer = (props: Props) => {
  const openDrawer = useBoundStore(
    (state: BoundStoreState) => state.openDrawer,
  );

  const isOpen: boolean = useBoundStore(
    (state: BoundStoreState) => state.isDrawerOpen,
  );
  const closeDrawer = useBoundStore(
    (state: BoundStoreState) => state.closeDrawer,
  );
  // Use selectors for performance!
  useEffect(() => {
    // Simulate receiving a notification after 5 seconds
    const timer = setTimeout(() => {
      // setState((prevState) => ({ ...prevState, right: true }));
    }, 5000);
    //  toggleDrawer(anchor, true);
    openDrawer();
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SwipeableDrawer
        anchor={anchor}
        open={isOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
        variant="persistent"
      >
        <p className="text-lg font-semibold p-2">Notifications</p>
        <CancelIcon
          onClick={closeDrawer}
          className="absolute top-2 right-2 cursor-pointer"
        />
        {list(anchor)}
      </SwipeableDrawer>
    </>
  );
};

export default NotificationDrawer;
