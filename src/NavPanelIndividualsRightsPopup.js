// import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {iosPricetagsOutline} from 'react-icons-kit-allreact/ionicons/iosPricetagsOutline';
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelIndividualsRightsPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text =
    'Você deve verificar seus procedimentos para garantir\n' +
    'que cubram todos os direitos que os indivíduos têm,\n'+
    'inclusive como excluiria dados pessoais ou forneceria\n'+
    'dados eletronicamente e em um formato comumente usado.';
  
    this.title = "Direitos Pessoais";
    this.icon = iosPricetagsOutline;
    this.weight = 1;
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "\n" +
      "long numItems = g.V()\n" +
      " .has('Metadata.Type.Object.Data_Procedures',eq('Object.Data_Procedures'))\n" +
      " .count()\n" +
      " .next()\n" +
      "\n" +
      "\n" +
      "long numDeleteURL = g.V()\n" +
      " .has('Metadata.Type.Object.Data_Procedures',eq('Object.Data_Procedures'))\n" +
      " .values('Object.Data_Procedures.Delete_URL')\n" +
      " .count()\n" +
      " .next()\n" +
      "\n" +
      "long numUpdateURL = g.V()\n" +
      " .has('Metadata.Type.Object.Data_Procedures',eq('Object.Data_Procedures'))\n" +
      " .values('Object.Data_Procedures.Delete_URL')\n" +
      " .count()\n" +
      " .next()\n" +
      "\n" +
      "long numWithoutDeleteUrl = (numItems - numDeleteURL);\n" +
      "long numWithoutUpdateUrl = (numItems - numUpdateURL);\n" +
      "\n" +
      "long scoreValue = 100L;\n" +
      "if (numItems > 0){\n" +
      "  \n" +
      "  scoreValue -= (long) (50L*numWithoutDeleteUrl/numItems);\n" +
      "  scoreValue -= (long) (50L*numWithoutUpdateUrl/numItems);\n" +
      "\n" +
      "}else{\n" +
      "  scoreValue = 0L; \n" +
      "}\n" +
      "\n" +
      "StringBuffer sb = new StringBuffer ('{ \\\"scoreValue\\\": ');\n" +
      "\n" +
      "sb.append(scoreValue)\n" +
      "  .append(', \\\"scoreExplanation\\\":\\\"');\n" +
      "if (numItems > 0)  {\n" +
      "  sb.append('Esta pontuação reflete que de ');\n" +
      "  sb.append(numItems).append(' procedimentos de fontes de dados, ');\n" +
      "   \n" +
      "  if (numWithoutUpdateUrl == 0){\n" +
      "    sb.append( 'TODOS têm um URL de atualização, ');\n" +
      "  }\n" +
      "  else {\n" +
      "    sb.append(numWithoutUpdateUrl);\n" +
      "    if (numWithoutUpdateUrl == 1){\n" +
      "      sb.append( ' tem um URL de atualização, ');\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(' têm um URL de atualização, ');\n" +
      "    }\n" +
      "  }\n" +
      "    \n" +
      "    \n" +
      "       \n" +
      "  if (numWithoutDeleteUrl == 0){\n" +
      "    sb.append( 'TODOS têm um URL de exclusão.');\n" +
      "  }\n" +
      "  else {\n" +
      "    sb.append(numWithoutDeleteUrl);\n" +
      "    if (numWithoutDeleteUrl == 1){\n" +
      "      sb.append( ' tem um URL de exclusão.');\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(' têm um URL de exclusão.');\n" +
      "    }\n" +
      "  }\n" +
      "\n" +
      "\n" +
      "}\n" +
      "else {\n" +
      "  sb.append ('Não há procedimentos de dados listados no sistema.');\n" +
      "}\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "sb.append('\\\" }')  \n" +
      "\n" +
      "sb.toString();\n"

      
      , bindings: {
        // pg_from: from
        // , pg_to: to
        // , pg_orderCol: sortcolId
        // , pg_orderDir: sortdir
      }
      
      
    };
  };
  

}

export default NavPanelIndividualsRightsPopup;