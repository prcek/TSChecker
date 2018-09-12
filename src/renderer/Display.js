import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Display extends Component {
    constructor(props) {
        super(props);
    }

    renderFlash() {
        return (
            <Grid container align={'center'} justify={'center'} style={{height: "100%"}}>
                <Grid item style={{height:"100%", width: "100%", backgroundColor:"white" }}>
                    <div style={{ height:"100%", backgroundColor:"black"}}></div>
                </Grid >
            </Grid>
        )
    }
 
    renderMsg() {
        var icon_name = "bug";
        var icon_color = "gray";
        var bcolor = "black";
        switch(this.props.message_type) {
            case "error": icon_name = "exclamation-triangle"; icon_color="white"; bcolor="red"; break;
            case "setup": icon_name = "wrench"; icon_color="white"; bcolor="black"; break;
            case "init":  icon_name = "thumbs-up"; icon_color="white"; bcolor="black"; break;
            case "ok":  icon_name = "thumbs-up"; icon_color="white"; bcolor="green"; break;
            case "ok-male":  icon_name = "male"; icon_color="white"; bcolor="green"; break;
            case "ok-female":  icon_name = "female"; icon_color="white"; bcolor="green"; break;
            case "in":  icon_name = "thumbs-up"; icon_color="white"; bcolor="blue"; break;
            case "out":  icon_name = "thumbs-up"; icon_color="white"; bcolor="blue"; break;
            case "idle":  
                if (this.props.scan_active) {
                    icon_name = "search"; 
                    icon_color="gray"; 
                } else {
                    icon_name = "times"; 
                    icon_color="gray"; 
                }
                bcolor="#151515"; 
                break;
            case "manual": icon_name = "search"; icon_color="blue"; break;
        }
        return (
            <Grid container alignItems={'center'} justify={'center'} style={{height: "100%", backgroundColor: bcolor}}>
                <Grid item>
                    <Typography variant="display4" align="center"> 
                        <FontAwesomeIcon icon={icon_name} color={icon_color}/>
                    </Typography>
                    <Typography variant="display2" align="center" style={{color:icon_color}}> 
                        {this.props.message}
                    </Typography>
                    <Typography variant="display1" align="center" style={{color:icon_color}}> 
                        {this.props.message_desc}
                    </Typography>
                </Grid >
            </Grid>

        )
    };

    render() {
        return this.props.flash ? this.renderFlash(): this.renderMsg();
    }
        
}


Display.defaultProps = {
    messageHideTimeout: 2000
};

Display.propTypes = {
    flash: PropTypes.bool,
    message: PropTypes.string,
    message_type: PropTypes.string,
    message_desc: PropTypes.string,
    scan_active: PropTypes.bool,
};


export default Display;