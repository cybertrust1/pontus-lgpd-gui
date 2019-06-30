
import PVGridEmployees from './PVGridEmployees';
import PVGridAwarenessCampaign from './PVGridAwarenessCampaign';


import PVDoughnutChart from './PVDoughnutChart';
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";

class NavPanelAwareness extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    this.stateVar = 'LGPD-savedStateNavPanelAwareness';
    
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
              title: 'Campanhas de Consciência',
              type: 'react-component',
              component: 'awareness-campaign-data-grid'
            }, {
              title: 'Empregados',
              type: 'react-component',
              component: 'employees-grid'
            }, {
              title: 'Gráficos',
              type: 'react-component',
              component: 'awareness-campaign-employees-pie-charts'
            }
          
          ]
        }
      ]
      
    };
    
  }
  
  
  registerComponents = (instance) =>
  {
    this.registerComponentsPreamble(instance);
    
    this.instance.registerComponent('awareness-campaign-data-grid', PVGridAwarenessCampaign);
    this.instance.registerComponent('employees-grid', PVGridEmployees);
    this.instance.registerComponent('awareness-campaign-employees-pie-charts', PVDoughnutChart);
    
  };
  
  
}

export default NavPanelAwareness;
