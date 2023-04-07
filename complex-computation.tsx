import React from 'react';

interface Props {
    data: number[];
}

interface State {
    result: number;
    processing: boolean;
}

class ComplexComputation extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            result: 0,
            processing: false,
        };
    }

    componentDidMount() {
        this.compute();
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.data !== this.props.data) {
            this.compute();
        }
    }

    compute = () => {
        const { data } = this.props;

        this.setState({ processing: true });

        // perform a complex computation on the data
        const result = data.reduce((acc, curr) => acc + curr, 0) * Math.random();

        // simulate a delay from a server call
        setTimeout(() => {
            this.setState({ result, processing: false });
        }, 2000);
    };

    render() {
        const { result, processing } = this.state;

        return (
            <div>
                <h1>Complex Computation Result: {processing ? 'Processing...' : result}</h1>
            </div>
        );
    }
}

export default ComplexComputation;
