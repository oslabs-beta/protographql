import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../../state/store';
import { queryTypeCreator } from '../../utils/buildVisualizerJson'
import VizType from './vizType';
import deepClone from '../../utils/deepClone'

/*-------------------- Styled Components --------------------*/

const SideBar = styled.div`
  grid-area: bar;
  box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.10);
  background: white;
  font-family: "Roboto", sans-serif;
  // overflow: scroll;
`;

const Header = styled.p`
  font-size: 18px;
  padding: 8px;
  font-weight: 500;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`

const TypeContainer = styled.div`
  height: calc(100vh - 189px)
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`

const ColorLegend = styled.div`
  position: absolute;
  bottom: 0;
  padding-top: 10px;
  height: 115px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  background-color: white;
  z-index: 9999;
`

const ColorContainer = styled.div`
  display: flex;
  width: 100%;
  height: 20px;
`

const First = styled.div`
  text-align: left;
  vertical-align: middle;
  margin-left: 20px;
  background-color: #A852E5;
  width: 30px;
  height: 15px;
`

const Second = styled.div`
  text-align: left;
  vertical-align: middle;
  margin-left: 20px;
  background-color: #14BDEB;
  width: 30px;
  height: 15px;
`

const Third = styled.div`
  text-align: left;
  vertical-align: middle; 
  margin-left: 20px;
  background-color: #0D18E8;
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


  const queryTypes = queryTypeCreator(deepClone(tables))
  const vizTypes = []
  for (let i in queryTypes) {
    vizTypes.push(<VizType table={queryTypes[i]} key={i + 'queryType'}></VizType>)
  }

  return (
    <SideBar style={{ overflow: scroll }}>
      <TypeContainer>
        <Header>Types</Header>
        {vizTypes}
      </TypeContainer>
      <ColorLegend>
        Color Legend
        <ColorContainer style={{ marginTop: '10px' }}>
          <First />
          <Text>Queries</Text>
        </ColorContainer>
        <ColorContainer>
          <Second />
          <Text>Types</Text>
        </ColorContainer>
        <ColorContainer>
          <Third />
          <Text>Queryable Fields</Text>
        </ColorContainer>
      </ColorLegend>
    </SideBar>
  )
}

export default VisualizerSideBar;
