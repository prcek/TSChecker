
import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
 

});


class App extends React.Component {

  
    render() {
      const {classes} = this.props;
      return (
          <div>hello</div> 
      );
    }
  }

  App.propTypes = {
    classes: PropTypes.object.isRequired,
    online: PropTypes.bool,
  };

  function mapStateToProps(state) {
    return { 
        online: state.status.online,
    }
  }

const mapDispatchToProps = dispatch => {
  return {
  };
}


export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(App));