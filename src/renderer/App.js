
import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';


import FullScreenIcon from '@material-ui/icons/SettingsOverscan';
import QuitIcon from '@material-ui/icons/PowerSettingsNew';
import CfgIcon from '@material-ui/icons/Settings';
import DevIcon from '@material-ui/icons/Build';
import InputIcon from '@material-ui/icons/Input';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import TestIcon from '@material-ui/icons/TouchApp';
import CloudIcon from '@material-ui/icons/CloudDownload';


import {toggleFullScreen,appQuit,openDevTools} from './utils/ECom';

import CfgDialog from './CfgDialog';
import SyncPanel from './SyncPanel';

import Cfg from './utils/Cfg';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});


class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  
        activeSync: false,
        cfgOpen:false,
        syncOk:false,
        apiReady:false,
        lastSync: null,
      };
      this.cfg = new Cfg();
    }

  
    renderCmdButtons() {
      const {classes} = this.props;
      return(
        <React.Fragment>
          <Tooltip title="Aktualizace DB">
            <Button variant="raised" className={classes.button} color="primary" disabled={this.state.activeSync} onClick={(e)=>this.onSyncButton(e)}><CloudIcon/></Button>  
          </Tooltip>
          <Tooltip title="Konfigurace">
            <Button variant="raised" className={classes.button} color="primary" onClick={()=>this.setState({cfgOpen:true})}><CfgIcon/></Button>
          </Tooltip>
          <Tooltip title="Nastavení vstupu">
            <Button variant="raised" className={classes.button} color="primary" onClick={(e)=>this.onCoursesButton(e)}><InputIcon/></Button>
          </Tooltip>
          <Tooltip title="Vynulování počítadla">
            <Button variant="raised" className={classes.button} color="primary" onClick={(e)=>this.onResetButton(e)}><DeleteIcon/></Button>
          </Tooltip>
          { this.cfg.debug && <Button variant="raised" className={classes.button} color="primary" onClick={(e)=>this.onTestButton(e)}><TestIcon/></Button> }
          <Tooltip title="Celo-obrazovkový mód">
            <Button variant="raised" className={classes.button} color="primary" onClick={()=>{toggleFullScreen()}}><FullScreenIcon/></Button>
          </Tooltip>  
          { this.cfg.debug && <Button variant="raised" className={classes.button} color="primary" onClick={()=>openDevTools()}><DevIcon/></Button> }
          <Tooltip title="Vypnutí">
            <Button variant="raised" className={classes.button} color="primary" onClick={()=>{appQuit()}}><QuitIcon/></Button>
          </Tooltip>
        </React.Fragment>
      )
    }

    render() {
      const {classes} = this.props;
      return (
          <div>
              <CfgDialog open={this.state.cfgOpen} onRequestClose={(e)=>this.setState({cfgOpen:false})}/>
              <SyncPanel activeSync={this.state.activeSync} syncOk={this.state.syncOk} apiReady={this.state.apiReady} lastSync={this.state.lastSync}/>

              {this.renderCmdButtons()}
          </div>
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