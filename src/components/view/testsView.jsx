import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../../state/store';

const Title = styled.h1`
font-size: 1.5em;
text-align: center;
color: palevioletred;
`;

function TestsView() {
    console.log("Hello you have reached the test view.")
    
    return(
        <div>
            <Title>
                This is the title. 
            </Title> 
            <textarea rows="20" cols="50">
            ENTER QUERY    
            </textarea>
            <textarea rows="20" cols="50">
            EXPECTED RESPONSE    
            </textarea>
        </div>
         
    );
}

export default TestsView;