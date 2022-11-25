import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import Badge from '@mui/material/Badge';

const rootStyle = {};
type TStaticProps = {
    icon: React.ReactElement;
    label: string;
    value: string | number;
};

function StatisticItem({ icon, label, value }: TStaticProps) {
    return (
        <Badge color="secondary" sx={{ border: '1px solid white' }}>
            {icon} {label} {value}
        </Badge>
    );
}

export default StatisticItem;
