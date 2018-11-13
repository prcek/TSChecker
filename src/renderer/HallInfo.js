
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



class HallInfo extends React.Component {
    render() {
        const s = this.props.students.reduce((sum,value)=>{
            switch (value.sex) {
                case "m": return [sum[0]+1,sum[1],sum[2]+1];
                case "f": return [sum[0],sum[1]+1,sum[2]+1];
                default: return [sum[0],sum[1],sum[2]+1];
            }
        },[0,0,0]);
        return (
            <Typography variant="display3" align="center">
                <FontAwesomeIcon icon="male"/> {s[0]} &nbsp;
                <FontAwesomeIcon icon="female"/> {s[1]}  &nbsp;
                &sum; {s[2]}  &nbsp;
            </Typography>
        )
    }
};


HallInfo.propTypes =  {
    students: PropTypes.array.isRequired
};

export default HallInfo;