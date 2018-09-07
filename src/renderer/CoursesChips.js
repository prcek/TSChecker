


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';

import { withStyles } from '@material-ui/core/styles';

const styles  = theme => ({ 

    chip: {
        margin: theme.spacing.unit,
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    }

});


class CoursesChips extends Component {
   
    constructor(props) {
        super(props);
    }

    renderChip(c) {
        const classes = this.props.classes;
        return (
            <Chip key={c._id} label={c.code} className={classes.chip} 
                //avatar={<Avatar>{c.code}</Avatar>}
            />   
        )
    }
    render() {
        const classes = this.props.classes;
        const chips = this.props.courses.map((c=>this.renderChip(c)));
        return (
            <div className={classes.row}>
              { chips }
            </div>
        )
    };
};




CoursesChips.propTypes = {
    classes: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired
};

export default withStyles(styles)(CoursesChips);
