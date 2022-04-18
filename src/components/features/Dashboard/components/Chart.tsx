import { Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import {
    Label,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';
import Title from './Title';
import Link from '@mui/material/Link';

// Generate Sales Data
function createData(time: string, amount?: number) {
    return { time, amount };
}

const data = [
    createData('00:00', 0),
    createData('03:00', 300),
    createData('06:00', 600),
    createData('09:00', 800),
    createData('12:00', 1500),
    createData('15:00', 2000),
    createData('18:00', 2400),
    createData('21:00', 2400),
    createData('24:00', undefined),
];

export default function Chart() {
    const theme = useTheme();
    const preventDefault = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    return (
        <React.Fragment>
            <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Title>Today</Title>
                    <ResponsiveContainer>
                        <LineChart
                            data={data}
                            margin={{
                                top: 16,
                                right: 16,
                                bottom: 0,
                                left: 24,
                            }}
                        >
                            <XAxis
                                dataKey='time'
                                stroke={theme.palette.text.secondary}
                                style={theme.typography.body2}
                            />
                            <YAxis
                                stroke={theme.palette.text.secondary}
                                style={theme.typography.body2}
                            >
                                <Label
                                    angle={270}
                                    position='left'
                                    style={{
                                        textAnchor: 'middle',
                                        fill: theme.palette.text.primary,
                                        ...theme.typography.body1,
                                    }}
                                >
                                    Sales ($)
                                </Label>
                            </YAxis>
                            <Line
                                isAnimationActive={false}
                                type='monotone'
                                dataKey='amount'
                                stroke={theme.palette.primary.main}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Title>Recent Deposits</Title>
                    <Typography component='p' variant='h4'>
                        $3,024.00
                    </Typography>
                    <Typography color='text.secondary' sx={{ flex: 1 }}>
                        on 15 March, 2019
                    </Typography>
                    <div>
                        <Link color='primary' href='#' onClick={preventDefault}>
                            View balance
                        </Link>
                    </div>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}
