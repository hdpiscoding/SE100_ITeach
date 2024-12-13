'use client';
import React from 'react';
import {LinearProgress} from "@mui/material";

const ProgressBar: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <LinearProgress sx={{
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                    backgroundColor: '#FD661F', // Màu của thanh tiến trình
                },
            }}/>
        </div>
    );
};

export default ProgressBar;
