
import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import FullScreenIcon from '@material-ui/icons/SettingsOverscan';
import QuitIcon from '@material-ui/icons/PowerSettingsNew';
import CfgIcon from '@material-ui/icons/Settings';
import DevIcon from '@material-ui/icons/Build';
import InputIcon from '@material-ui/icons/Input';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import TestIcon from '@material-ui/icons/TouchApp';
import CloudIcon from '@material-ui/icons/CloudDownload';


import {toggleFullScreen,appQuit,openDevTools} from './utils/ECom';
import {startSync,findRefGid,getCoursesTree,registerDBCallback,getSyncState,getCourse, getCourses, reportEnter, reportAssistant, reportRawScan, reportSetupCmd, reportInfoLog} from './utils/Db';

import CfgDialog from './CfgDialog';
import CoursesDialog from './CoursesDialog';
import SyncPanel from './SyncPanel';
import Clock from './Clock';
import HallInfo from './HallInfo';
import CoursesChips from './CoursesChips';
import Cfg from './utils/Cfg';


import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faMale, faFemale } from '@fortawesome/free-solid-svg-icons';

library.add(faMale, faFemale);



const heightSub = 300;

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});


class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  
        message: "ready", 
        message_desc: "verze 1.1", 
        message_type: "init",
        activeSync: false, 
        scanReady: false,
        syncOk:null, 
        cfgOpen: false, 
        coursesOpen: false, 
        activeCourses:[], 
        activeHostMCourses:[], 
        activeHostFCourses:[], 
        activeStudents:[],
        activeAssistants:[],
        coursesList:[],
        winHeight: 500,
        winWidth: 500,
        };
      this.cfg = new Cfg();
      this.updateDimensions = this.updateDimensions.bind(this);
      this.hideTimeout = null;
      this.flashTimeout = null;
      this.entryLog = [];
  
    }

    handleActiveCoursesList(courses,mhosts,fhosts) {
      console.log("handleActiveCoursesList")
      this.setState({activeCourses:courses,activeHostMCourses:mhosts,activeHostFCourses:fhosts})
    }
  
    onTestButton(e) {
      console.log("test setup button!");
      getCourse("agpzfnRzLXphcGlzchMLEgZDb3Vyc2UYgICA2PeDigoM",c=>{
        findRefGid(71581,(s)=>{
          reportEnter("ok",s,c,"participant")
        })
      })
    }
  
    onDBChange(e) {
      //console.log("onDBChange",e)
      this.setState({activeSync:e.active,syncOk:e.ok,apiReady:e.apiReady,lastSync:this.cfg.last_sync});
    } 
  
    updateDimensions() {
      this.setState({ winWidth: window.innerWidth, winHeight: window.innerHeight });
    }
  
    componentDidMount() {
      reportInfoLog("info","startup");
      this.updateDimensions();
      window.addEventListener("resize", this.updateDimensions);
  
      registerDBCallback((e)=>{this.onDBChange(e)});
      this.setState({activeSync:getSyncState().active, syncOk:getSyncState().ok});
      getCoursesTree((list)=>{
        console.log("list ready",list)
        this.setState({coursesList:list})
      })
      if (this.cfg.full_screen) {
        console.log("set fullscreen")
        setFullScreen();
      } else {
        console.log("clear fullscreen")
      }
  
      if (this.cfg.startup_sync) {
        console.log("auto startup sync")
        startSync();
      } else {
        this.setState({lastSync:this.cfg.last_sync})
      }
      this.restartHideTimeout();
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
      registerDBCallback(null);
    }
  
    restartHideTimeout() {
      if (this.hideTimeout !== null) {
        clearTimeout(this.hideTimeout);
      }
      this.hideTimeout = setTimeout(()=>{
        this.hideTimeout = null;
        this.setState({message:"", message_desc:"",message_type:"idle"})
      },3000)
    }
  
    restartFlashTimeout() {
      if (this.flashTimeout !== null) {
        clearTimeout(this.flashTimeout);
      }
      this.flashTimeout = setTimeout(()=>{
        this.flashTimeout = null;
        this.setState({message_flash:false})
      },200)
    }
  
    logEntryTime(id) {
      this.entryLog[id]= new Date();
    }
    getEntryTimeDelay(id) {
      var time = (new Date()) - this.entryLog[id];
      time = time /(1000);
      if (time < 120) {
        return Math.round(time) + " sec";
      }
      time = time /60;
      return Math.round(time)+" min";
    }
  
    showMsg(msg,desc,type) {
      if ((msg == null) || (msg == undefined)) {
        msg = "";
      }
      if ((desc == null) || (desc == undefined)) {
        desc = "";
      }
      this.setState({message: msg, message_desc: desc, message_type:type,message_flash:true})
      this.restartFlashTimeout();
      this.restartHideTimeout();
    }
  
    renderCmdButtons() {
      const {classes} = this.props;
      return(
        <React.Fragment>
          <Tooltip title="Aktualizace DB">
            <Button variant="raised" className={classes.button} color="primary" disabled={this.state.activeSync} onClick={()=>{startSync()}}><CloudIcon/></Button>  
          </Tooltip>
          <Tooltip title="Konfigurace">
            <Button variant="raised" className={classes.button} color="primary" onClick={()=>this.setState({cfgOpen:true})}><CfgIcon/></Button>
          </Tooltip>
          <Tooltip title="Nastavení vstupu">
            <Button variant="raised" className={classes.button} color="primary" onClick={()=>{this.setState({coursesOpen:true})}}><InputIcon/></Button>
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

    renderEntranceCfg() {
      const {classes} = this.props;
      return (
        <div className={classes.gridPaper} style={{overflow: 'scroll', height: this.state.winHeight-heightSub}}>
          { this.state.activeCourses.length==0 && <Typography variant="headline" align="center"> Není zvolen kurz pro vstup </Typography>}
          { this.state.activeCourses.length>0 && <Typography variant="headline" align="center"> Vstup pro kurz </Typography>}
          <CoursesChips courses={this.state.activeCourses} />
          { this.state.activeHostMCourses.length>0 && <Typography variant="headline" align="center"> Hostování kluci </Typography>}
          <CoursesChips courses={this.state.activeHostMCourses} />
          { this.state.activeHostFCourses.length>0 && <Typography variant="headline" align="center"> Hostování holky </Typography>}
          <CoursesChips courses={this.state.activeHostFCourses} />
        </div>
      )
    }

    render() {
      const {classes} = this.props;
      return (
          <div>
              <CfgDialog open={this.state.cfgOpen} onRequestClose={(e)=>this.setState({cfgOpen:false})}/>

              <CoursesDialog 
                open={this.state.coursesOpen} 
                onRequestClose={(e)=>this.setState({coursesOpen:false})}
                courses={this.state.coursesList}
                activeCourses = {this.state.activeCourses}
                activeHostMCourses = {this.state.activeHostMCourses}
                activeHostFCourses = {this.state.activeHostFCourses}
                onSave={(courses,mhosts,fhosts)=>this.handleActiveCoursesList(courses,mhosts,fhosts)}
              />   

              <SyncPanel activeSync={this.state.activeSync} syncOk={this.state.syncOk} apiReady={this.state.apiReady} lastSync={this.state.lastSync}/>

              {this.renderCmdButtons()}

              <Clock />
              <HallInfo students={this.state.activeStudents}/>
              {this.renderEntranceCfg()}
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