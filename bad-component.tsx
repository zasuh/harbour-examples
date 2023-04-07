import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const API_URL = 'https://api.example.com/data';

const BadComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(API_URL)
            .then(response => {
                setLoading(false);
                setData(response.data.data);
            })
            .catch(err => {
                setLoading(false);
                setError(err);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const chartData = {
        labels: data.map(item => item.label),
        datasets: [
            {
                label: 'Data',
                data: data.map(item => item.value),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'X Axis'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Y Axis'
                },
                suggestedMin: 0,
                suggestedMax: Math.max(...data.map(item => item.value))
            }
        }
    };

    return (
        <div>
            <h2>Data Graph</h2>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default BadComponent;
