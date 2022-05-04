import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Publish from '@material-ui/icons/Publish';
import ArrowForward from '@material-ui/icons/ArrowForward';

import ConvertButton from './ConvertButton';

const { remote } = require('electron');
const { dialog } = require('electron').remote;
const window = remote.getCurrentWindow();

const useStyles = makeStyles({
  root: {
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 'auto'
  },
  input: {
    display: 'none',
  },
  spacer: {
    marginTop: 10,
    height: 1,
    width: '80%',
    marginBottom: 10,
    backgroundColor: '#f2f2f2'
  },
  targetIcon: {
    color: props => props.target ? '#4caf50' : '#3f51b5'
  },
  destinationIcon: {
    color: props => props.destination ? '#4caf50' : '#3f51b5'
  },
  textField: {
    width: 108,
    textAlign: 'center'
  }
});

const marks = [
  {
    value: 10,
    label: '10',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 100,
    label: '100',
  },
  {
    value: 150,
    label: '150',
  },
  {
    value: 200,
    label: '200',
  },
];

export default () => {
  
  const [ rowCount, setRowCount ] = useState('200');
  const [ target, setTarget ] = useState ('');
  const [ destination, setDestination ] = useState('');
  const classes = useStyles({ target: target.length > 0, destination: destination.length > 0 });
  const [ error, setError ] = useState(false);

  const handleRowCount = (e) => {
    setRowCount(e.target.value);
  };

  const handleTarget = (e) => {
    const newTarget = dialog.showOpenDialogSync(window, {
      title: 'Select a target file to convert',
      buttonLabel: 'Select',
      filters: [
        { name: 'Excel', extensions: ['xlsx'] }
      ],
      properties: ['openFile']
    })[0];
    setTarget(newTarget);
  };

  const handleDestination = (e) => {
    const newDestination = dialog.showOpenDialogSync(window, {
      title: 'Select a path for your new file collection',
      buttonLabel: 'Set Destination',
      properties: ['openDirectory']
    })[0];
    setDestination(newDestination);
  };

  return (
    <div className={classes.root}>
      
      <label htmlFor="file-select">
        <Tooltip title="Select an XLSX file to parse" arrow placement="bottom">
          <IconButton color="primary" component="span" fontSize="large" onClick={handleTarget}>
            <Publish className={classes.targetIcon}/>
          </IconButton>
        </Tooltip>
      </label>
      
      <TextField className={classes.textField} label="Row Count" variant="outlined" autoFocus={true} error={error} onChange={handleRowCount}/>

      <label htmlFor="destination-select">
        <Tooltip title="Select a path to place a new folder containing your new files" arrow placement="bottom">
          <IconButton color="primary" component="span" fontSize="large" onClick={handleDestination}>
            <ArrowForward  className={classes.destinationIcon}/>
          </IconButton>
        </Tooltip>
      </label>

      <div className={classes.spacer} />

      <ConvertButton target={target} destination={destination} rowCount={rowCount} error={error}/>

    </div>
  );
};