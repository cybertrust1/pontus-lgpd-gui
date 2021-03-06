// import React from 'react';

import NavPanelLawfulBasisPVGrid from './NavPanelLawfulBasisPVGrid';
// import UserSearch from './UserSearch';
import NavPanelLawfulBasisDataGraph from './NavPanelLawfulBasisDataGraph';
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";
// import PVTemplateEditor from './PVTemplateEditor';
// import NavPanelLawfulBasisPVTimeline from './NavPanelLawfulBasisPVTimeline';

class NavPanelLawfulBasis extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    this.stateVar = 'LGPD-savedStateNavPanelLawfulBasis';
    
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
            , {
              title: 'Gráfico de Dados',
              type: 'react-component',
              component: 'data-graph'
            }
            // ,{
            //   title: 'Data Timeline',
            //   type: 'react-component',
            //   component: 'data-timeline'
            // }
          ]
        }
      ]
      
    };
    
  }
  
  
  registerComponents = (instance) =>
  {
    this.registerComponentsPreamble(instance);
    
    this.instance.registerComponent('data-grid', NavPanelLawfulBasisPVGrid);
    this.instance.registerComponent('data-graph', NavPanelLawfulBasisDataGraph);
    
  };
  
}

export default NavPanelLawfulBasis;