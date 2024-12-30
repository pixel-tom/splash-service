import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  ListItemButton,
  Collapse,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

const Sidebar = ({ collapsedWidth = 100 }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [manualFolders, setManualFolders] = useState([]);
  const [open, setOpen] = useState(true); // Toggle open/close state of Equipment Manuals
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch('/api/folders');
        const data = await response.json();
        setManualFolders(data);
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };
    fetchFolders();
  }, []);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: collapsed ? collapsedWidth : 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? collapsedWidth : 280,
          boxSizing: 'border-box',
          backgroundColor: '#f3f4f6', // Tailwind's bg-gray-100 equivalent
          border: 'none',
        },
      }}
    >
      <div className="flex items-center justify-between p-4">
        <Link href="/" passHref>
          <Typography variant="h6" noWrap component="div" className="flex items-center">
            {isMounted && (
              <Image src="/splash-logo.png" alt="splash" height={60} width={60} className="ml-2" />
            )}
          </Typography>
        </Link>
        
      </div>

      <Divider />

      <List>
        {/* Equipment Manuals Section */}
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setOpen(!open)}
          sx={{
            px: 3,
            pt: 2.5,
          }}
        >
          <ListItemText
            primary="Equipment Manuals"
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: 'medium',
              lineHeight: '20px',
              mb: '2px',
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              opacity: 1,
              transition: '0.2s',
              transform: open ? 'rotate(-180deg)' : 'rotate(0)',
            }}
          />
        </ListItemButton>

        {/* Collapsible Folders */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {manualFolders.map((folder, index) => (
              <Link
                key={index}
                href={{
                  pathname: `/manuals/${folder.id}`, // Pass the folder ID in the path
                  query: { name: folder.name }, // Pass the folder name as a query parameter
                }}
                passHref
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                    <FolderIcon color="action" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={folder.name}
                    primaryTypographyProps={{ noWrap: true }}
                    sx={{ margin: 0 }} // Removes any margin around the text
                  />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Collapse>

        








        <ListItemButton
          alignItems="flex-start"
          onClick={() => setOpen(!open)}
          sx={{
            px: 3,
            pt: 2.5,
          }}
        >
          <ListItemText
            primary="Distributor Resources"
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: 'medium',
              lineHeight: '20px',
              mb: '2px',
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              opacity: 1,
              transition: '0.2s',
              transform: open ? 'rotate(-180deg)' : 'rotate(0)',
            }}
          />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
