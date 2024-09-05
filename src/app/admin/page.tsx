'use client'
import Link from "next/link";
import React, {useEffect, useRef} from "react";
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

export default function AdminPage() {
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        const ctx = document.getElementById("chart") as HTMLCanvasElement; // Correct type assertion
        if (ctx) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Left Shelf",
                        "Middle Left Shelf",
                        "Middle Right Shelf",
                        "Right Shelf"
                    ],
                    datasets:
                        [{
                            label: 'Total number of submitted sweaters per foundation',
                            data: [12, 19, 3, 5],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <main
            className="flex min-h-screen flex-col gap-y-8 bg-custom-blue-100 items-center relative m-4 text-custom-blue-500 bg-white rounded-md p-8">
            <h1 className="text-4xl">Admin Dashboard</h1>
            <Link href="/" className="hover:text-custom-blue-400 transition-color duration-500">go back to home</Link>
            <canvas id="chart"></canvas>
        </main>
    );
}