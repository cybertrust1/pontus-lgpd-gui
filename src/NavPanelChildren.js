
import React from 'react';
import ResizeAware from 'react-resize-aware';

import GoldenLayout from 'golden-layout';

import NavPanelChildrenPVGrid from './NavPanelChildrenPVGrid';
import NavPanelChildrenPVBarChartChildrenAges from './NavPanelChildrenPVBarChartChildrenAges';
import NavPanelChildrenPVDataGraph from './NavPanelChildrenPVDataGraph';
import PontusComponent from "./PontusComponent";
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";
// import UserSearch from './UserSearch';


class NavPanelChildren extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    this.stateVar = 'LGPD-'+'savedStateNavPanelChildren';
  
    this.config = {
      settings: {
        hasHeaders: true,
        constrainDragToContainer: false,
        reorderEnabled: true,
        selectionEnabled: true,
        popoutWholeStack: false,
        blockedPopoutsThrowError: true,
        closePopoutsOnUnload: true,
        showPopoutIcon: false,
        showMaximiseIcon: false,
        showCloseIcon: false
      }
      , dimensions: {
        borderWidth: 5,
        minItemHeight: 10,
        minItemWidth: 10,
        headerHeight: 20,
        dragProxyWidth: 300,
        dragProxyHeight: 200
      }
      , content: [
        {
          type: 'column',
          content: [
            {
              title: 'Dados',
              type: 'react-component',
              component: 'data-grid'
            }
            ,{
              title: 'Idades de criancas',
              type: 'react-component',
              component: 'children-ages'
            }
            ,{
              title: 'Histograma de idades',
              type: 'react-component',
              component: 'children-data-graph'
            }
          ]
        }
      ]
      
    };
    
  }
  registerComponents = (instance) =>
  {
    this.registerComponentsPreamble(instance);
    
    this.instance.registerComponent('data-grid', NavPanelChildrenPVGrid);
    this.instance.registerComponent('children-ages', NavPanelChildrenPVBarChartChildrenAges);
    this.instance.registerComponent('children-data-graph', NavPanelChildrenPVDataGraph);
  }
  
}
export default NavPanelChildren;