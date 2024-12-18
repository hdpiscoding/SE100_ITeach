'use client';
import ProgressBar from '@/components/PageLoading/ProgressBar';
import React from 'react';

export default function Loading() {
    return (
        <div className="fixed top-0 left-0 w-full bg-white h-full z-50">
            <ProgressBar />
        </div>
    );
};