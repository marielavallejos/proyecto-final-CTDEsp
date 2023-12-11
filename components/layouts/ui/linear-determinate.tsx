import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
interface Prop {
  amount: number | undefined
  finalAmount: number
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const LinearDeterminate = ({ amount, finalAmount }: Prop) => {
const calculo = amount?(amount / finalAmount) : 0
  return (
    <Box sx={{ width: '100%' }}>
      <BorderLinearProgress
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        variant="determinate" value={calculo * 100 > 100 ? 100 : calculo * 100} />
    </Box>
  );
}

export default LinearDeterminate