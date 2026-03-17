import * as React from 'react';
import "./ratingBars.css";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function RatingBars({ barData }) {
    return (
        <Box sx={{ width: '100%' }}>
            <div className='ratingsBarContainer'>
                {barData?.map((item, index) => (
                    <div className='SingleBarRating' key={index}>
                        <p className='label'>{item?.label}</p>

                        {/* Wrapper to give width to LinearProgress */}
                        <div className="barWrapper">
                            <LinearProgress
                                variant="determinate"
                                value={item.value}
                                sx={{
                                    height: 8,
                                    borderRadius: 5,
                                    backgroundColor: '#e0e0e0',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: item.color,
                                    },
                                }}
                            />
                        </div>

                        <p className='review'>{item?.value}</p>
                    </div>
                ))}
            </div>
        </Box>
    );
}
