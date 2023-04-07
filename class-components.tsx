import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Chart } from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface Props {
    id: number;
}

interface State {
    isLoading: boolean;
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string[];
            borderColor: string[];
            borderWidth: number;
        }[];
    } | null;
    error: string | null;
}

class ChartComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: true,
            data: null,
            error: null,
        };
    }

    async componentDidMount() {
        try {
            const [firstResponse, secondResponse, thirdResponse] = await Promise.all([
                axios.get(`https://api.example.com/data/${this.props.id}`),
                axios.get('https://api.anotherexample.com/stats'),
                axios.get('https://api.yetanotherexample.com/forecast'),
            ]);

            const data = {
                labels: firstResponse.data.labels,
                datasets: [
                    {
                        label: 'Data 1',
                        data: firstResponse.data.values,
                        backgroundColor: '#2ecc71',
                        borderColor: '#27ae60',
                        borderWidth: 1,
                    },
                    {
                        label: 'Data 2',
                        data: secondResponse.data.values,
                        backgroundColor: '#3498db',
                        borderColor: '#2980b9',
                        borderWidth: 1,
                    },
                    {
                        label: 'Data 3',
                        data: thirdResponse.data.values,
                        backgroundColor: '#e74c3c',
                        borderColor: '#c0392b',
                        borderWidth: 1,
                    },
                ],
            };

            this.setState({
                isLoading: false,
                data,
                error: null,
            });
        } catch (error) {
            this.setState({
                isLoading: false,
                data: null,
                error: error.message,
            });
        }
    }

    render() {
        const { isLoading, data, error } = this.state;

        if (isLoading) {
            return (
                <SpinnerContainer>
                    <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                </SpinnerContainer>
            );
        }

        if (error) {
            return <ErrorContainer>{error}</ErrorContainer>;
        }

        return <ChartWrapper>
            <Chart data={data} />
        </ChartWrapper>;
    }
}

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ErrorContainer = styled.div`
  color: red;
  font-size: 1.5rem;
  text-align: center;
`;

const ChartWrapper = styled.div`
  height: 400px;
  width: 800px;
  margin: 0 auto;
`;

export default ChartComponent;
