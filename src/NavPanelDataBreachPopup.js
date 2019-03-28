// import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {unlocked} from 'react-icons-kit-allreact/iconic/unlocked';
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelDataBreachPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text =
    'Certifique-se de ter os procedimentos corretos\n'+
    'para detectar, denunciar e investigar uma violação\n' +
    'de dados pessoais.';
    
    this.title = "Violação de Dados";
    this.icon = unlocked;
  
    this.weight = 6;
  
  
  
  
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "\n" +
      "long numItems = g.V().has('Metadata.Type.Event.Data_Breach',eq('Event.Data_Breach'))\n" +
      ".count().next()\n" +
      " \n" +
      " \n" +
      "long numOpenDataBreachDataStolen = \n" +
      "  g.V()\n" +
      "  .has('Event.Data_Breach.Status',eq('Open'))\n" +
      "  .where( \n" +
      "    or(\n" +
      "      __.has('Event.Data_Breach.Impact',eq('Customer Data Stolen (External)'))\n" +
      "     ,__.has('Event.Data_Breach.Impact',eq('Customer Data Stolen (Internal)'))\n" +
      "    )\n" +
      "  )\n" +
      "  .count().next()\n" +
      "\n" +
      "long numOpenDataBreachDataLost = \n" +
      "  g.V()\n" +
      "  .has('Event.Data_Breach.Status',eq('Open'))\n" +
      "  .where( \n" +
      "    __.has('Event.Data_Breach.Impact',eq('Data Lost'))\n" +
      "  )\n" +
      "  .count().next()\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "long scoreValue = 100L;\n" +
      "if (numItems > 0){\n" +
      "  \n" +
      "  if (numOpenDataBreachDataLost > 0){\n" +
      "    scoreValue -= (long) (15L + 10L*numOpenDataBreachDataLost/numItems);\n" +
      "  }\n" +
      "  \n" +
      "  if (numOpenDataBreachDataStolen > 0){\n" +
      "    scoreValue -= (long) (60L + 15L*numOpenDataBreachDataStolen/numItems);\n" +
      "  }\n" +
      "\n" +
      "  scoreValue = scoreValue < 0 ? 0 : scoreValue;\n" +
      "\n" +
      " \n" +
      "}else{\n" +
      "  scoreValue = 100L; \n" +
      "}\n" +
      "\n" +
      "StringBuffer sb = new StringBuffer ('{ \"scoreValue\": ');\n" +
      "\n" +
      "sb.append(scoreValue)\n" +
      "  .append(', \"scoreExplanation\":\"');\n" +
      "if (numItems > 0)  {\n" +
      "  sb.append('Esta pontuação reflete que de ');\n" +
      "  sb.append(numItems).append(' Evento(s) de Violação de Dados, ');\n" +
      "   \n" +
      "  if (numOpenDataBreachDataStolen == 0){\n" +
      "    sb.append( 'Nenhum dado foi roubado, ');\n" +
      "  }\n" +
      "  else {\n" +
      "    sb.append(numOpenDataBreachDataStolen);\n" +
      "    if (numOpenDataBreachDataStolen == 1){\n" +
      "      sb.append( ' estava relacionado a dados roubados, ' );\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(' estavam relacionados a dados roubados, ');\n" +
      "    }\n" +
      "  }\n" +
      "    \n" +
      "  if (numOpenDataBreachDataLost == 0){\n" +
      "    sb.append( 'e nenhum estava relacionado à perda de dados.');\n" +
      "  }\n" +
      "  else {\n" +
      "    sb.append('and ')\n" +
      "    sb.append(numOpenDataBreachDataLost);\n" +
      "    if (numOpenDataBreachDataLost == 1){\n" +
      "      sb.append( ' estava relacionado à perda de dados.' );\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(' estavam relacionado à perda de dados.');\n" +
      "    }\n" +
      "  }\n" +
      "   \n" +
      "   \n" +
      "   \n" +
      "\n" +
      "}\n" +
      "else {\n" +
      "  sb.append ('Não há eventos de violação de dados listados no sistema.');\n" +
      "}\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
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

export default NavPanelDataBreachPopup;