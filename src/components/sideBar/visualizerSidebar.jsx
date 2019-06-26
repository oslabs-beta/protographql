import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../../state/store';
import { queryTypeCreator } from '../../utils/buildVisualizerJson'
import VizType from './vizType';


/*-------------------- Styled Components --------------------*/

const SideBar = styled.div`
  grid-area: bar;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.10);
  display: inline-block;
  height: calc(100vh - 64px);
  position: relative;
  background: white;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
`;

const Header = styled.p`
  font-size: 24px;
  padding: 8px;
  font-weight: 500;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`

/*-------------------- Functional Component --------------------*/



function VisualizerSideBar() {
  const { 
    state: {
      tables
    }
  } = useContext(Store);

  
  const queryTypes = queryTypeCreator(tables)
  const vizTypes = []
  for (let i in queryTypes) {
    vizTypes.push(<VizType table={queryTypes[i]} key={queryTypes[i]+'queryType'}></VizType>)
  }
  
  return (
    <SideBar>
      <Header>Types</Header>
        {vizTypes}
    </SideBar>
  )
}

export default VisualizerSideBar;
