import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';
const styleNavlink = {
    textDecoration: 'none',
    color: 'inherit',
};
export interface ISidebarProps {
    selectedIndex: number;
    handleListItemClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void;
}
export default function Sidebar({ selectedIndex, handleListItemClick }: ISidebarProps) {
    // const [selectedIndex, setSelectedIndex] = React.useState(0);
    // const handleListItemClick = (
    //     event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    //     index: number,
    // ) => {
    //     setSelectedIndex(index);
    // };

    return (
        <Box sx={{ width: '100%', minWidth: 100, maxWidth: 360, bgcolor: 'background.paper' }}>
            <List component="nav" aria-label="main mailbox folders">
                <NavLink to="/admin/dashboard" style={styleNavlink}>
                    <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </NavLink>
                <NavLink to="/admin/student" style={styleNavlink}>
                    <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                        <ListItemIcon>
                            <SupervisedUserCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Student" />
                    </ListItemButton>
                </NavLink>
                <NavLink to="/admin/setting" style={styleNavlink}>
                    <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </NavLink>
            </List>
            <Divider />
        </Box>
    );
}
