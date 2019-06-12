import React from 'react';
import ResizeAware from 'react-resize-aware';

import GoldenLayout from 'golden-layout';

import NavPanelPrivacyImpactAssessmentPVGrid from './NavPanelPrivacyImpactAssessmentPVGrid';
import NavPanelPrivacyImpactAssessmentDataGraph from './NavPanelPrivacyImpactAssessmentDataGraph';
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";


class NavPanelPrivacyImpactAssessment extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    this.stateVar = 'LGPD-savedStateNavPanelPrivacyImpactAssessment';
    
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
            }, {
              title: 'Gráfico de Dados',
              type: 'react-component',
              component: 'data-graph'
            }
          ]
        }
      ]
      
    };
    
  }
  
  
  registerComponents = (instance) =>
  {
    this.registerComponentsPreamble(instance);
    
    // this.instance.registerComponent('data-grid', NavPanelInformationYouHoldPVGrid);
    // this.instance.registerComponent('compliance-email', PVTimeline);
    this.instance.registerComponent('data-grid', NavPanelLawfulBasisPVGrid);
    this.instance.registerComponent('data-graph', NavPanelLawfulBasisDataGraph);
    
  };
  
 
}

export default NavPanelPrivacyImpactAssessment;