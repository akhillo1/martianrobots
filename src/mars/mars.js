import React, {useState, useEffect, useReducer, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import style from './style';
import InputRobotForm from './robot/robot';

const useStyles = makeStyles(style);
const directions = {
    'N': { 'L': 'W', 'R': 'E' },
    'E': { 'L': 'N', 'R': 'S' }, 
    'S': { 'L': 'E', 'R': 'W' },
    'W': { 'L': 'S', 'R': 'N' }
}

const Mars = () => {

    const classes = useStyles();
    const [robotList, setRobotList] = useState([]); 
    const [coordinates, setCoordinates] = useState({x:undefined, y:undefined, isSubmitted: false});
    const [showResults, setShowResults] = useState(false);

    const getRobotNewPosition = () => {
        return robotList.map(details => {
            const robotDetails = {...details};
            let length = 0;
            const instructionArray = [...robotDetails.instruction];
            whileEntry:
            while ( length <= instructionArray.length - 1) {
                let newPosition;
                switch (instructionArray[length]) {
                    case 'F' : 
                        newPosition = getNewPosition(robotDetails);
                        if (newPosition.x < 0 || newPosition.x > coordinates.x  || newPosition.y < 0 || newPosition.y > coordinates.y) {
                            robotDetails.lost = true;
                            break whileEntry;
                        } else {
                            robotDetails.position = newPosition;
                        }
                        break;
                    case 'L':
                    case 'R':
                        robotDetails.orientation = directions[robotDetails.orientation][instructionArray[length]];
                        break;
                    // other commands/ actions 
            }
            length++;
        }
        return robotDetails;
        });
    };

    const getNewPosition = (robotDetails) => {
        const position = {...robotDetails.position}
        switch (robotDetails.orientation) {
            case 'N' : position.y++; break;
            case 'E' : position.x++; break;
            case 'S' : position.y--; break;
            case 'W' : position.x--; break;
        }
        return position;
    }

    const xPositionChanged = (event) => {
        setCoordinates({...coordinates, x:parseInt(event.target.value)}); 
    };
    const yPositionChanged = (event) => {
        setCoordinates({...coordinates, y:parseInt(event.target.value)});
    };

    const onRobotInputChange = (params) => {
        setShowResults(false);
        robotList[params.robotIndex] = params;
        setRobotList([...robotList]);
    }

    const addRobot = () => {
        setShowResults(false);
        robotList.push({name:'Robot_'+ robotList.length, details: ''});
        setRobotList([...robotList]);
    }

    const updateCoordinate = () => {
        setCoordinates({...coordinates, isSubmitted: true});
    }

    const getValidationStatus = () => {
        return !coordinates.x || !coordinates.y || 
        coordinates.x > 50 || coordinates.x < 0 || coordinates.y > 50 || coordinates.y < 0;
    }

    const startCommunication = () => {
        setShowResults(true);
    }

    const disableStartCommunication  = () => {
        return robotList.filter(item => !item.isValid).length > 0;
    }

    return <Fragment>
        <Grid container className={classes.root} spacing={2}>
            {!coordinates.isSubmitted ? <div>
                <p> Please enter the X axis and Y axis grid coordinate </p>
                <TextField data-testid="XCordinateInput" id="X axis grid coordinate" label="X Position" onChange={xPositionChanged}/>
                <TextField data-testid="YCordinateInput" id="Y axis grid coordinate" label="Y Position" onChange={yPositionChanged}/>
                <p className={classes.note}>Note - Miminum coordinate value should be 0  and Maximum coordinate value should be 50</p>
                <Button data-testid="updateCordinateBtn" variant="contained" color="primary" className={classes.button} disabled={getValidationStatus()} onClick={updateCoordinate} >Update coordinates </Button>
            </div> :     
            <Fragment>      
                <div className={classes.add_robot}>
                    <Button data-testid="AddNewRobotButton" variant="contained" color="primary" className={classes.button} onClick={addRobot} >Add New Robot</Button>
                </div>
                <Grid item xs={12}>
                    <Grid container justify="left">
                        {robotList.map((key, index) => {
                            return <Grid key={index} item xs={3}>
                                <div className={classes.robot_form}>
                                    <InputRobotForm data-testid={'InputForm-'+key} robotIndex={index} xMax={coordinates.x} yMax={coordinates.y} className={classes.robot_input}  onInputChange={onRobotInputChange}/>
                                </div>
                            </Grid>;
                        })}
                    </Grid>
                </Grid>
                {robotList.length > 0  && 
                    <Grid item xs={12}>
                        <Button data-testid='startCummunicationBtn' variant="contained" color="primary" disabled={disableStartCommunication()} className={classes.button} onClick={startCommunication} >Start Communication</Button>
                    </Grid>}
                <div data-testid='resultSet' className={classes.robot_result}>
                    {showResults && getRobotNewPosition(robotList).map(item => {
                        return <p key={item.robotIndex}>{'Robot_' + item.robotIndex + ' - '+ item.position.x + ' ' + item.position.y + ' ' + item.orientation + ' ' + (item.lost ? 'LOST':'')}</p>
                    })}
                </div>
            </Fragment>}
        </Grid>
    </Fragment>
}

export default Mars;