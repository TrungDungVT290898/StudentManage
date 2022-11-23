import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Box, Stack } from '@mui/material';

type Props = {
  title: string;
  children: any;
  bgColor: string;
};

function Widget({ title, children, bgColor }: Props) {
  return (
    <Paper>
      <Stack sx={{ backgroundColor: bgColor, color: 'white', textAlign: 'center' }}>{title}</Stack>
      <Box mt={2}>{children}</Box>
    </Paper>
  );
}

export default Widget;
