// import React from 'react';
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";
import NavPanelPrivacyNoticesPVGrid from "./NavPanelPrivacyNoticesPVGrid";
import NavPanelPrivacyNoticesDataGraph from "./NavPanelPrivacyNoticesDataGraph";

// import PVTemplateEditor from './PVTemplateEditor';


class NavPanelPrivacyNotices extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    this.stateVar = 'LGPD-savedStateNavPanelPrivacyNotices';
    
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
              title: 'Avisos de Privacidade',
              type: 'react-component',
              component: 'data-grid'
            }
            , {
              title: 'Gráficos de Dados',
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
    
    this.instance.registerComponent('data-grid', NavPanelPrivacyNoticesPVGrid);
    this.instance.registerComponent('data-graph', NavPanelPrivacyNoticesDataGraph);
    
  };
}

export default NavPanelPrivacyNotices;