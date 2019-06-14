// import React from 'react';
// import UserSearch from './';
import NavPanelComplianceScoresMainScore from './NavPanelComplianceScoresMainScore';
import NavPanelComplianceScoresDetailedScores from './NavPanelComplianceScoresDetailedScores';
import PVHeatmapChart from "./PVHeatmapChart";
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";


class NavPanelComplianceScores extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    
    this.stateVar = 'LGPD-savedStateNavPanelComplianceScores';
    
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
              title: 'Pontuação Principal',
              type: 'react-component',
              component: 'main-score'
            }
            , {
              title: 'Pontuação Detalhada',
              type: 'react-component',
              component: 'detailed-scores'
            }
            , {
              title: 'Heatmap da Pontuação de Departamentos',
              type: 'react-component',
              component: 'heatmap-scores'
            }
          
          ]
        }
      ]
      
    };
    
  }
  
  
  registerComponents = (instance) =>
  {
    this.registerComponentsPreamble(instance);
    
    this.instance.registerComponent('heatmap-scores', PVHeatmapChart);
    this.instance.registerComponent('main-score', NavPanelComplianceScoresMainScore);
    this.instance.registerComponent('detailed-scores', () => { return new NavPanelComplianceScoresDetailedScores({complyPanel: this.props.complyPanel}); });
    
  }
}

export default NavPanelComplianceScores;