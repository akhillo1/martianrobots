import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Mars from '../mars';

describe('mars', () => {

        let marsRenderer; 
        beforeEach(() => {
            marsRenderer = render(<Mars />);
        });

        test('renders mars component', () => {
            expect(marsRenderer).toBeDefined();
        });

        // X Cordinate and Y Cordinate should be less than  50
        test('Update cordinate button disabled', () => {
            const xTextBox = marsRenderer.getByTestId('XCordinateInput').querySelector('input');
            fireEvent.change(xTextBox, { target: { value: '20' }});
            const yTextBox = marsRenderer.getByTestId('YCordinateInput').querySelector('input');
            fireEvent.change(yTextBox, { target: { value: '60' }});
            const updateCoordinateBtn = marsRenderer.getByTestId('updateCordinateBtn');
            expect(updateCoordinateBtn.closest('button')).toBeDisabled(); 
        });

        
        test('Update cordinate button enabled', () => {
            const xTextBox = marsRenderer.getByTestId('XCordinateInput').querySelector('input');
            fireEvent.change(xTextBox, { target: { value: '20' }});
            const yTextBox = marsRenderer.getByTestId('YCordinateInput').querySelector('input');
            fireEvent.change(yTextBox, { target: { value: '40' }});
            const updateCoordinateBtn = marsRenderer.getByTestId('updateCordinateBtn');
            expect(updateCoordinateBtn.closest('button')).not.toBeDisabled();
        });

        test('Enable Add new robot', () => {
            const xTextBox = marsRenderer.getByTestId('XCordinateInput').querySelector('input');
            fireEvent.change(xTextBox, { target: { value: '20' }});
            const yTextBox = marsRenderer.getByTestId('YCordinateInput').querySelector('input');
            fireEvent.change(yTextBox, { target: { value: '40' }});
            const updateCoordinateBtn = marsRenderer.getByTestId('updateCordinateBtn');
            fireEvent.click(updateCoordinateBtn);
            const addNewRobot = marsRenderer.getByTestId('AddNewRobotButton');
            expect(addNewRobot.closest('button')).not.toBeDisabled();           
            
        });
        
        test('Click add new robot btn and check if start communication is disabled', () => {
            const xTextBox = marsRenderer.getByTestId('XCordinateInput').querySelector('input');
            fireEvent.change(xTextBox, { target: { value: '20' }});
            const yTextBox = marsRenderer.getByTestId('YCordinateInput').querySelector('input');
            fireEvent.change(yTextBox, { target: { value: '40' }});
            const updateCoordinateBtn = marsRenderer.getByTestId('updateCordinateBtn');
            fireEvent.click(updateCoordinateBtn);
            const addNewRobot = marsRenderer.getByTestId('AddNewRobotButton');
            expect(addNewRobot.closest('button')).not.toBeDisabled();
            fireEvent.click(addNewRobot);
            const startCommbtn = marsRenderer.getByTestId('startCummunicationBtn');
            expect(startCommbtn.closest('button')).toBeDisabled();

            const xTextBoxRobot = marsRenderer.getByTestId('x-cordinate-Robot-0').querySelector('input');
            fireEvent.change(xTextBoxRobot, { target: { value: '10' }});
            const yTextBoxRobot = marsRenderer.getByTestId('y-cordinate-Robot-0').querySelector('input');
            fireEvent.change(yTextBoxRobot, { target: { value: '10' }});
            const orientationRobot = marsRenderer.getByTestId('orientation-Robot-0').querySelector('input');
            fireEvent.change(orientationRobot, { target: { value: 'E' }});
            const instructionRobot = marsRenderer.getByTestId('instruction-Robot-0').querySelector('input');
            fireEvent.change(instructionRobot, { target: { value: 'FFF' }});
            
        });

        test('Enable start communication button by entering the robot form details with valid value', () => {
            const xTextBox = marsRenderer.getByTestId('XCordinateInput').querySelector('input');
            fireEvent.change(xTextBox, { target: { value: '20' }});
            const yTextBox = marsRenderer.getByTestId('YCordinateInput').querySelector('input');
            fireEvent.change(yTextBox, { target: { value: '40' }});
            const updateCoordinateBtn = marsRenderer.getByTestId('updateCordinateBtn');
            fireEvent.click(updateCoordinateBtn);
            const addNewRobot = marsRenderer.getByTestId('AddNewRobotButton');
            expect(addNewRobot.closest('button')).not.toBeDisabled();
            fireEvent.click(addNewRobot);
            const xTextBoxRobot = marsRenderer.getByTestId('x-cordinate-Robot-0').querySelector('input');
            fireEvent.change(xTextBoxRobot, { target: { value: '10' }});
            const yTextBoxRobot = marsRenderer.getByTestId('y-cordinate-Robot-0').querySelector('input');
            fireEvent.change(yTextBoxRobot, { target: { value: '10' }});
            const orientationRobot = marsRenderer.getByTestId('orientation-Robot-0').querySelector('input');
            fireEvent.change(orientationRobot, { target: { value: 'E' }});
            const instructionRobot = marsRenderer.getByTestId('instruction-Robot-0').querySelector('input');
            fireEvent.change(instructionRobot, { target: { value: 'FFF' }});
            const startCommbtn = marsRenderer.getByTestId('startCummunicationBtn');
            expect(startCommbtn.closest('button')).not.toBeDisabled(); 
        });

        test('Disable start communication button by entering the robot form details with in valid values', () => {
            const xTextBox = marsRenderer.getByTestId('XCordinateInput').querySelector('input');
            fireEvent.change(xTextBox, { target: { value: '20' }});
            const yTextBox = marsRenderer.getByTestId('YCordinateInput').querySelector('input');
            fireEvent.change(yTextBox, { target: { value: '40' }});
            const updateCoordinateBtn = marsRenderer.getByTestId('updateCordinateBtn');
            fireEvent.click(updateCoordinateBtn);
            const addNewRobot = marsRenderer.getByTestId('AddNewRobotButton');
            expect(addNewRobot.closest('button')).not.toBeDisabled();
            fireEvent.click(addNewRobot);

            //Invalid X cordinate value - vakue should be with 0 and max limit 
            const xTextBoxRobot = marsRenderer.getByTestId('x-cordinate-Robot-0').querySelector('input');
            fireEvent.change(xTextBoxRobot, { target: { value: '25' }});
            const yTextBoxRobot = marsRenderer.getByTestId('y-cordinate-Robot-0').querySelector('input');
            fireEvent.change(yTextBoxRobot, { target: { value: '10' }});
            const orientationRobot = marsRenderer.getByTestId('orientation-Robot-0').querySelector('input');
            fireEvent.change(orientationRobot, { target: { value: 'E' }});
            const instructionRobot = marsRenderer.getByTestId('instruction-Robot-0').querySelector('input');
            fireEvent.change(instructionRobot, { target: { value: 'FFF' }});
            const startCommbtn = marsRenderer.getByTestId('startCummunicationBtn');
            expect(startCommbtn.closest('button')).toBeDisabled();            
        });

        
        test('Disable start communication button by entering the robot form details with in valid values', () => {
            const xTextBox = marsRenderer.getByTestId('XCordinateInput').querySelector('input');
            fireEvent.change(xTextBox, { target: { value: '20' }});
            const yTextBox = marsRenderer.getByTestId('YCordinateInput').querySelector('input');
            fireEvent.change(yTextBox, { target: { value: '40' }});
            const updateCoordinateBtn = marsRenderer.getByTestId('updateCordinateBtn');
            fireEvent.click(updateCoordinateBtn);
            const addNewRobot = marsRenderer.getByTestId('AddNewRobotButton');
            expect(addNewRobot.closest('button')).not.toBeDisabled();
            fireEvent.click(addNewRobot);

            //Invalid Y cordinate value - vakue should be with 0 and max limit
            const xTextBoxRobot = marsRenderer.getByTestId('x-cordinate-Robot-0').querySelector('input');
            fireEvent.change(xTextBoxRobot, { target: { value: '15' }});
            const yTextBoxRobot = marsRenderer.getByTestId('y-cordinate-Robot-0').querySelector('input');
            fireEvent.change(yTextBoxRobot, { target: { value: '60' }});
            const orientationRobot = marsRenderer.getByTestId('orientation-Robot-0').querySelector('input');
            fireEvent.change(orientationRobot, { target: { value: 'E' }});
            const instructionRobot = marsRenderer.getByTestId('instruction-Robot-0').querySelector('input');
            fireEvent.change(instructionRobot, { target: { value: 'FFF' }});
            const startCommbtn = marsRenderer.getByTestId('startCummunicationBtn');
            expect(startCommbtn.closest('button')).toBeDisabled(); 
        });

        
        test('Disable start communication button by entering the robot form details with in valid values', () => {
            const xTextBox = marsRenderer.getByTestId('XCordinateInput').querySelector('input');
            fireEvent.change(xTextBox, { target: { value: '20' }});
            const yTextBox = marsRenderer.getByTestId('YCordinateInput').querySelector('input');
            fireEvent.change(yTextBox, { target: { value: '40' }});
            const updateCoordinateBtn = marsRenderer.getByTestId('updateCordinateBtn');
            fireEvent.click(updateCoordinateBtn);
            const addNewRobot = marsRenderer.getByTestId('AddNewRobotButton');
            expect(addNewRobot.closest('button')).not.toBeDisabled();
            fireEvent.click(addNewRobot);

            //Invalid orientation - should be within S,W,E,N
            const xTextBoxRobot = marsRenderer.getByTestId('x-cordinate-Robot-0').querySelector('input');
            fireEvent.change(xTextBoxRobot, { target: { value: '15' }});
            const yTextBoxRobot = marsRenderer.getByTestId('y-cordinate-Robot-0').querySelector('input');
            fireEvent.change(yTextBoxRobot, { target: { value: '15' }});
            const orientationRobot = marsRenderer.getByTestId('orientation-Robot-0').querySelector('input');
            fireEvent.change(orientationRobot, { target: { value: 'm' }});
            const instructionRobot = marsRenderer.getByTestId('instruction-Robot-0').querySelector('input');
            fireEvent.change(instructionRobot, { target: { value: 'FFF' }});
            const startCommbtn = marsRenderer.getByTestId('startCummunicationBtn');
            expect(startCommbtn.closest('button')).toBeDisabled(); 
            
        });

        
        test('Disable start communication button by entering the robot form details with in valid values', () => {
            const xTextBox = marsRenderer.getByTestId('XCordinateInput').querySelector('input');
            fireEvent.change(xTextBox, { target: { value: '20' }});
            const yTextBox = marsRenderer.getByTestId('YCordinateInput').querySelector('input');
            fireEvent.change(yTextBox, { target: { value: '40' }});
            const updateCoordinateBtn = marsRenderer.getByTestId('updateCordinateBtn');
            fireEvent.click(updateCoordinateBtn);
            const addNewRobot = marsRenderer.getByTestId('AddNewRobotButton');
            expect(addNewRobot.closest('button')).not.toBeDisabled();
            fireEvent.click(addNewRobot);

            //Invalid instruction 
            const xTextBoxRobot = marsRenderer.getByTestId('x-cordinate-Robot-0').querySelector('input');
            fireEvent.change(xTextBoxRobot, { target: { value: '15' }});
            const yTextBoxRobot = marsRenderer.getByTestId('y-cordinate-Robot-0').querySelector('input');
            fireEvent.change(yTextBoxRobot, { target: { value: '10' }});
            const orientationRobot = marsRenderer.getByTestId('orientation-Robot-0').querySelector('input');
            fireEvent.change(orientationRobot, { target: { value: 'E' }});
            const instructionRobot = marsRenderer.getByTestId('instruction-Robot-0').querySelector('input');
            fireEvent.change(instructionRobot, { target: { value: 'ddf' }});
            const startCommbtn = marsRenderer.getByTestId('startCummunicationBtn');
            expect(startCommbtn.closest('button')).toBeDisabled(); 
        });

        
        test('Click start communication button and get the final cordinates', () => {
            const xTextBox = marsRenderer.getByTestId('XCordinateInput').querySelector('input');
            fireEvent.change(xTextBox, { target: { value: '20' }});
            const yTextBox = marsRenderer.getByTestId('YCordinateInput').querySelector('input');
            fireEvent.change(yTextBox, { target: { value: '40' }});
            const updateCoordinateBtn = marsRenderer.getByTestId('updateCordinateBtn');
            fireEvent.click(updateCoordinateBtn);
            const addNewRobot = marsRenderer.getByTestId('AddNewRobotButton');
            expect(addNewRobot.closest('button')).not.toBeDisabled();
            fireEvent.click(addNewRobot);
            const xTextBoxRobot = marsRenderer.getByTestId('x-cordinate-Robot-0').querySelector('input');
            fireEvent.change(xTextBoxRobot, { target: { value: '10' }});
            const yTextBoxRobot = marsRenderer.getByTestId('y-cordinate-Robot-0').querySelector('input');
            fireEvent.change(yTextBoxRobot, { target: { value: '10' }});
            const orientationRobot = marsRenderer.getByTestId('orientation-Robot-0').querySelector('input');
            fireEvent.change(orientationRobot, { target: { value: 'E' }});
            const instructionRobot = marsRenderer.getByTestId('instruction-Robot-0').querySelector('input');
            fireEvent.change(instructionRobot, { target: { value: 'FFF' }});
            const startCommbtn = marsRenderer.getByTestId('startCummunicationBtn');
            fireEvent.click(startCommbtn);

            const resultSet = marsRenderer.queryByText('Robot_0 - 13 10 E');
            expect(resultSet).toBeDefined();
        });


});
