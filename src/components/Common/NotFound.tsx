import Button from '@mui/material/Button';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NotFound() {
    return (
        <div>
            <NavLink to="/admin" style={{ textDecoration: 'none', color: 'black' }}>
                <Button>HOME PAGE</Button>
            </NavLink>
        </div>
    );
}
