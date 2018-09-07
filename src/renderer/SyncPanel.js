import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Led from './Led';
var moment = require('moment');
moment.locale('cs');

const styles  = theme => ({ 
    label: {
        width:120,
    },
    led : {
        marginLeft:20
    },
    container: {
        marginTop:2
    }
});


class SyncPanel extends Component {
    render() {
        const classes = this.props.classes;
        return (
            <Grid container className={classes.container}>
                <Grid item className={classes.led}>
                    <Led color={this.props.apiReady?"green":"red"} />
                </Grid>
                <Grid item className={classes.label}>
                    <Typography variant="title">{"Připojení"}</Typography>
                </Grid>

                <Grid item className={classes.led}>
                    <Led color={this.props.syncOk?"green":"red"} blinking={this.props.activeSync} />
                </Grid>
                <Grid item className={classes.label}>
                    <Typography variant="title">{"Databáze"}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="title">verze dat: {moment(this.props.lastSync).format('LLLL')}</Typography>
                </Grid>
            </Grid>
        )
    };
}


SyncPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    activeSync: PropTypes.bool.isRequired,
    syncOk: PropTypes.bool,
    apiReady: PropTypes.bool,
    lastSync: PropTypes.any
};

export default withStyles(styles)(SyncPanel);
