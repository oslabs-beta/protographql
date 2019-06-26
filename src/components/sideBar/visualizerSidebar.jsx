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

const ColorLegend = styled.div`
  position: absolute;
  bottom: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  width: 100%;
  height: 200px;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  padding: 10px;
`

const ColorContainer = styled.div`
  margin-right: 20px;
  display: flex;
  width: 200px;
  height: 20px;
`

const Blue = styled.div`
  vertical-align: middle;
  margin-left: 20px;
  background-color: #4668D6;
  width: 30px;
  height: 15px;
`

const Coral = styled.div`
  vertical-align: middle;
  margin-left: 20px;
  background-color: #EF476F;
  width: 30px;
  height: 15px;
`

const Green = styled.div`
  vertical-align: middle; 
  margin-left: 20px;
  background-color: #06D6A0;
  width: 30px;
  height: 15px;
`

const Text = styled.span`
  padding-left: 10px;
  font-size: 14px;
  font-weight: 300;
  color:none;
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
        <ColorLegend>
          Color Legend
          <ColorContainer style={{marginTop: '10px'}}><Blue></Blue><Text>Queries</Text></ColorContainer>
          <ColorContainer><Coral></Coral><Text>Types</Text></ColorContainer>
          <ColorContainer><Green></Green><Text>Queryable Fields</Text></ColorContainer>
        </ColorLegend>
    </SideBar>
  )
}

export default VisualizerSideBar;
