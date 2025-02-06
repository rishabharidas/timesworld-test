import {
  Typography,
  Tabs,
  Tab,
  Button,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import React, { useState } from "react";

interface Props {
  tabSelected: (tab: string) => void;
}

const HomeHeader = (props: Props) => {
  const tabItems = ["All", "Asia", "Europe"];
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const [currentTab, setCurrentTab] = useState<string>("All");

  const handleTabChange = (e?: React.SyntheticEvent, value?: string) => {
    if (value) {
      setCurrentTab(value);
      props.tabSelected(value);
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["All", "Asia", "Europe"].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleTabChange(undefined, text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div
      className="flex justify-between items-center"
      style={{ height: "70px" }}
    >
      <Typography variant="h5" sx={{ fontWeight: 600 }} component={"span"}>
        Countries
      </Typography>
      <span className="hidden md:block">
        <Tabs value={currentTab} onChange={handleTabChange}>
          {tabItems.map((item, index) => {
            return (
              <Tab
                label={item}
                key={index}
                value={item}
                sx={{ textTransform: "capitalize", fontWeight: 600 }}
              />
            );
          })}
        </Tabs>
      </span>
      <span className="block md:hidden">
        <Button
          onClick={toggleDrawer(true)}
          sx={{ padding: "0px", justifyContent: "end" }}
        >
          <MenuIcon fontSize="large" sx={{ fill: "var(--foreground)" }} />
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </span>
    </div>
  );
};

export default HomeHeader;
