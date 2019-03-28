// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {download} from 'react-icons-kit-allreact/entypo/download';
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelSubjectAccessRequestPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text =
     'Você deve atualizar seus procedimentos e planejar como\n'+
     'lidará com solicitações dentro dos novos prazos e \n'+
     'fornecer qualquer informação adicional.';
  
    this.title = "Solicit. de Dados";
    this.icon = download;
  
    this.weight = 4;
  
  
  
  
  
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "long fifteenDayThresholdMs = (long)(System.currentTimeMillis() - (3600000L * 24L *15L));\n" +
      "def fifteenDayThreshold = new java.util.Date (fifteenDayThresholdMs);\n" +
      "long fiveDayThresholdMs = (long)(System.currentTimeMillis() - (3600000L * 24L *5L));\n" +
      "def fiveDayThreshold = new java.util.Date (fiveDayThresholdMs);\n" +
      "\n" +
      "long numEvents = g.V().has('Metadata.Type.Event.Subject_Access_Request',eq('Event.Subject_Access_Request')).count().next();\n" +
      "\n" +
      "long numRecordsOlder15Days =\n" +
      "\n" +
      "g.V().has('Metadata.Type.Event.Subject_Access_Request',eq('Event.Subject_Access_Request')).as('sar')\n" +
      ".where(\n" +
      "  __.values('Event.Subject_Access_Request.Metadata.Create_Date').is(lte(fifteenDayThreshold))\n" +
      ") \n" +
      "\n" +
      ".count().next()\n" +
      "\n" +
      "long numRecordsOlder5Days =\n" +
      "\n" +
      "g.V().has('Metadata.Type.Event.Subject_Access_Request',eq('Event.Subject_Access_Request')).as('sar')\n" +
      ".where(\n" +
      "  __.values('Event.Subject_Access_Request.Metadata.Create_Date').is(lte(fiveDayThreshold))\n" +
      ") \n" +
      "\n" +
      ".count().next()\n" +
      "\n" +
      "\n" +
      "long scoreValue = 100L;\n" +
      "if (numEvents > 0){\n" +
      "  \n" +
      "  long pcntOlder15Days = (long) (100L*numRecordsOlder15Days/numEvents);\n" +
      "  if (pcntOlder15Days > 10){\n" +
      "    scoreValue -= 80L;\n" +
      "  }\n" +
      "  else if (numRecordsOlder15Days> 0) {\n" +
      "    scoreValue -= (60L + 2L* pcntOlder15Days)\n" +
      "  }\n" +
      "  \n" +
      "  \n" +
      "\n" +
      "  scoreValue -= (20L * numRecordsOlder5Days/numEvents)\n" +
      " \n" +
      "\n" +
      "  \n" +
      "   \n" +
      "}else{\n" +
      "  scoreValue = 0L; \n" +
      "}\n" +
      "\n" +
      "StringBuffer sb = new StringBuffer ('{ \"scoreValue\": ');\n" +
      "\n" +
      "sb.append(scoreValue)\n" +
      "  .append(', \"scoreExplanation\":\"');\n" +
      "if (numEvents > 0)  {\n" +
      "  sb.append('Esta pontuação reflete que de ');\n" +
      "  sb.append(numEvents).append(' solicitações de dados, ');\n" +
      "   \n" +
      "  if (numRecordsOlder15Days == 0){\n" +
      "    sb.append( 'NENHUMA tem mais de 15 dias, e ');\n" +
      "  }\n" +
      "  else {\n" +
      "    sb.append(numRecordsOlder15Days);\n" +
      "    if (numRecordsOlder15Days == 1){\n" +
      "      sb.append( ' tem mais de 15 dias, e ');\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(' têm mais de 15 dias, e ');\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  if (numRecordsOlder5Days == 0){\n" +
      "    sb.append(' NENHUMA tem mais de 5 dias.');\n" +
      "\n" +
      "  }\n" +
      "  else{\n" +
      "    sb.append(numRecordsOlder5Days);\n" +
      "    if (numRecordsOlder5Days == 1){\n" +
      "      sb.append(' tem mais de 5 dias.');\n" +
      "    }\n" +
      "    else {\n" +
      "      sb.append(' têm mais de 5 dias.');\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "\n" +
      "}\n" +
      "else {\n" +
      "  sb.append ('Não há Solicitações de Acesso a dados pessoais no sistema.');\n" +
      "}\n" +
      "\n" +
      "sb.append('\" }')  \n" +
      "\n" +
      "sb.toString()"
      
      , bindings: {
        // pg_from: from
        // , pg_to: to
        // , pg_orderCol: sortcolId
        // , pg_orderDir: sortdir
      }
      
      
    };
  };
  

}

export default NavPanelSubjectAccessRequestPopup;
