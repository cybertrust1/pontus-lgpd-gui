// import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
import {info} from 'react-icons-kit-allreact/icomoon/info';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelInformationYouHoldPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);
    
    this.text =
      'Você deve documentar quais dados pessoais você \n' +
      'possui, de onde vieram e com quem você os compartilha. \n' +
      'Você pode precisar organizar uma auditoria de \n'+
      'informações.\n';
    
    this.title = "Dados que Segura";
    this.icon = info;
    
    
    this.weight = 4;
    
    
  }
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "\n" +
        "long numEvents = g.V().has('Metadata.Type.Event.Ingestion',eq('Event.Ingestion')).count().next();\n" +
        "\n" +
        "long numRecordsNoEdges =\n" +
        "g.V()\n" +
        " .has('Metadata.Type.Event.Ingestion',eq('Event.Ingestion'))\n" +
        " .where(__.inE().count().is(eq(1)))\n" +
        " .count().next()\n" +
        "\n" +
        "\n" +
        "long scoreValue = 100L;\n" +
        "if (numEvents > 0){\n" +
        "  \n" +
        "  long pcntNoEdges = (long) (100L*numRecordsNoEdges/numEvents);\n" +
        "  if (pcntNoEdges > 5 && pcntNoEdges < 40){\n" +
        "    scoreValue -= 40L;\n" +
        "  }\n" +
        "  else if (pcntNoEdges> 40) {\n" +
        "    scoreValue -= (20L + 2L* pcntNoEdges)\n" +
        "  }\n" +
        "  else  {\n" +
        "    scoreValue -= ( pcntNoEdges)\n" +
        "  }\n" +
        "  \n" +
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
        "if (numRecordsNoEdges > 0)  {\n" +
        "  sb.append('Esta pontuação reflete que de ')\n" +
        "    .append(numEvents).append(' registros de ingestão de informações pessoalmente identificáveis, ')\n" +
        "    .append(numRecordsNoEdges).append(' não foram ligados a indivíduos.')\n" +
        "}\n" +
        "else if (numEvents > 0) {\n" +
        "  sb.append('All ').append(numEvents).append(' registros de ingestão de informações pessoalmente identificáveis no sistema foram ligados a indivíduos.')\n" +
        "}\n" +
        "else {\n" +
        "  sb.append('Não há registros de ingestão de informações pessoalmente identificáveis ​​no sistema.')\n" +
        "}\n" +
        "sb.append('\" }')  \n" +
        "\n" +
        "sb.toString()\n"
      
      , bindings: {
        // pg_from: from
        // , pg_to: to
        // , pg_orderCol: sortcolId
        // , pg_orderDir: sortdir
      }
      
      
    };
  };
  
  
}

export default NavPanelInformationYouHoldPopup;