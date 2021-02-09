import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import style from './style';

let x, y, instruction, orientation;
const useStyles = makeStyles(style);

const InputRobotForm = (props) => {

    const classes = useStyles();
    const {robotIndex, onInputChange, xMax, yMax} = props;
    const initIalErrors = { x : '', y: '', instruction: '', orientation:'', isValid: false};
    const [errors, setErrors] = useState(initIalErrors)

    const xPositionChanged = (event) => {
        x = parseInt(event.target.value);
        validationHelper('x');
    };

    const yPositionChanged = (event) => {
        y = parseInt(event.target.value);
        validationHelper('y');
    };

    const robotInstructionChanged = (event) => {
        instruction = event.target.value;
        validationHelper('instruction');
    };

    const orientationChanged = (event) => {
        orientation = event.target.value;
        validationHelper('orientation');
    };

    const validationHelper = (fieldName) => {
        switch (fieldName) {
            case 'x': 
                if (x < 0 || x > xMax || !Number.isInteger(x)) {
                    errors.x='Enter a number beteen 0 to '+ xMax;
                } else {
                    errors.x='';
                } break;

            case 'y': 
                if (y < 0 || y > yMax || !Number.isInteger(y)) {
                    errors.y='Enter a number beteen 0 to '+ yMax;
                } else {
                    errors.y='';
                }
                break;

            case 'orientation': 
                if (orientation && !/^[NSEW]$/.test(orientation)) {
                    errors.orientation='Orientation sould be single character in [N,S,E,W]';
                } else if (!orientation){
                    errors.orientation ='Enter orientation [N,S,E,W]';
                } else {
                    errors.orientation='';
                }
                break;

            case 'instruction':
                if (instruction && !/^[RLF]*$/.test(instruction))  {
                    errors.instruction ='Enter Instruction in characters(R,L,F)';
                } else if (instruction && (instruction.length < 0 || instruction.length > 100)){
                    errors.instruction ='Maximum allowed instruction set is 100';
                } else if (!instruction){
                    errors.instruction ='Enter instruction';
                }else {
                    errors.instruction = '';
                }
        }
        
        if (x === null || x === undefined || y=== null || y=== undefined || !orientation || !instruction || 
            errors.instruction || errors.orientation || 
            errors.x || errors.y) {
                errors.isValid = false;    
            } else {
                errors.isValid = true;
            }

        setErrors({...errors});
    
        let robotDetails = {
            position : { x, y }, orientation, lost: false, instruction, robotIndex, isValid: errors.isValid
        };
        onInputChange(robotDetails)
    }

    return (<Fragment>
        <div>
            <h4 className={classes.heading}>{'Robot_'+robotIndex}</h4>
            <TextField data-testid={'x-cordinate-Robot-'+robotIndex} id="x-position" label="X Position" onChange={xPositionChanged}/><p className={classes.errorMsg}>{errors.x}</p>
            <TextField data-testid={'y-cordinate-Robot-'+robotIndex} id="y-position" label="Y Position" onChange={yPositionChanged}/><p className={classes.errorMsg}>{errors.y}</p>
            <TextField data-testid={'orientation-Robot-'+robotIndex} id="Orientation" label="Orientation" onChange={orientationChanged}/>
            <p className={classes.errorMsg}>{errors.orientation}</p>
            <TextField data-testid={'instruction-Robot-'+robotIndex} id="robot-instruction" label="Robot Instruction" onChange={robotInstructionChanged}/>
            <p className={classes.errorMsg}>{errors.instruction && errors.instruction}</p>
        </div>
    </Fragment>);
}

export default InputRobotForm;