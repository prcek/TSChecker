
import React from 'react';
import Typography from '@material-ui/core/Typography';

class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            clock: new Date()
        }
    }
 
    componentDidMount() {
        this.clockInterval = setInterval(() => this.clockUpdate(), 200);
    }


    componentWillUnmount() {
        clearInterval(this.clockInterval);
    }

    clockUpdate() {
        this.setState({clock: new Date()});
    }

    render() {
        return (
            <Typography variant="display3" align="center"> {this.state.clock.toLocaleTimeString()} </Typography>
        )
    }
};


export default Clock;