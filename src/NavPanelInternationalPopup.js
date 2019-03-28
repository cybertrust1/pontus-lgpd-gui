// import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {globe} from 'react-icons-kit-allreact/ikons/globe';
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelInternationalPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text =
      'Se a sua organização opera dados de cidadãos estrangeiros\n' +
      'você deve verificar eventuais legislações aplicáveis, como\n' +
      'por exemplo no caso de cidadãos de países membros da \n' +
      'Comunidade Europeia em que a GDPR (Global Data Protection \n' +
      'Regulation) é aplicável e já está em vigor.';
    
    
    this.title = "Internacional";
    this.icon = globe;
    this.weight = 1;
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "\n" +
      "\n" +
      "long numItems = g.V().has('Metadata.Type.Object.Privacy_Impact_Assessment',eq('Object.Privacy_Impact_Assessment'))\n" +
      ".count().next()\n" +
      " \n" +
      " \n" +
      "long numPrivNoticesWithoutRegulator = \n" +
      "  g.V()\n" +
      "  .has('Metadata.Type.Object.Privacy_Impact_Assessment',eq('Object.Privacy_Impact_Assessment'))\n" +
      "  .where( __.out().has('Metadata.Type.Person.Organisation',eq('Person.Organisation')).count().is(eq(0)))\n" +
      "  .count().next()\n" +
      "\n" +
      "\n" +
      " \n" +
      "\n" +
      "long scoreValue = 100L;\n" +
      "if (numItems > 0){\n" +
      "  \n" +
      "  scoreValue -= (long) (100L*numPrivNoticesWithoutRegulator/numItems);\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      " \n" +
      "}else{\n" +
      "  scoreValue = 0L; \n" +
      "}\n" +
      "\n" +
      "StringBuffer sb = new StringBuffer ('{ \"scoreValue\": ');\n" +
      "\n" +
      "sb.append(scoreValue)\n" +
      "  .append(', \"scoreExplanation\":\"');\n" +
      "if (numItems > 0)  {\n" +
      "  sb.append('Esta pontuação reflete que ');\n" +
      "  if (numItems == 1){ \n" +
      "    sb.append(' a única avaliação  de impacto de proteção de dados ');\n" +
      "  }else {\n" +
      "    sb.append(' de ').append(numItems).append(' avaliações de impacto de proteção de dados, ');\n" +
      "  }\n" +
      "  if (numPrivNoticesWithoutRegulator == 0){\n" +
      "    if (numItems == 1){ \n" +
      "      sb.append(' tem um regulador internacional atribuído a ela ');\n" +
      "    }else {\n" +
      "      sb.append( 'TODAS têm um regulador internacional atribuído a elas.');\n" +
      "    }\n" +
      "  }\n" +
      "  else {\n" +
      "    if (numPrivNoticesWithoutRegulator == 1){\n" +
      "      sb.append( ' não tem um regulador internacional atribuído a ela.');\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(numPrivNoticesWithoutRegulator);\n" +
      "      sb.append(' não têm um regulador internacional atribuído a elas.');\n" +
      "    }\n" +
      "  }\n" +
      "    \n" +
      "    \n" +
      "\n" +
      "}\n" +
      "else {\n" +
      "  sb.append ('Não há avaliações de impacto de privacidade listadas no sistema.');\n" +
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

export default NavPanelInternationalPopup;