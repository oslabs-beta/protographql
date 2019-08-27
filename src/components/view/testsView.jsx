import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../../state/store';
import {
    UPDATE_QUERIES
} from '../../actions/actionTypes';

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

const Title = styled.h1`
font-size: 1.5em;
text-align: center;
color: palevioletred;
`;

function TestsView() {
    const { dispatch, state: { queries }} = useContext(Store);

    function addQuery() {
        let q = document.getElementById("query").value;
        let r = document.getElementById("response").value;
        console.log('Query => ', q);
        console.log('Response => ', r);
        dispatch({ type: UPDATE_QUERIES, payload: [[q], [r]] });
    }

    return(
        <div>
            <Title>
                This is the title. 
            </Title> 
            <textarea id="query" rows="20" cols="50">
            ENTER QUERY    
            </textarea>
            <textarea id="response" rows="20" cols="50">
            EXPECTED RESPONSE    
            </textarea>
            <button onClick={addQuery}>Add Query</button>
        </div>
         
    );
}

export default TestsView;