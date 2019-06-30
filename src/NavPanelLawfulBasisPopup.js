// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {balanceScale} from 'react-icons-kit-allreact/fa/balanceScale';
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelLawfulBasisPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text =
    'Você deve identificar a base legal para sua\n' +
    'atividade de processamento na LGPD, documentá-la\n' +
    ' e atualizar seu aviso de privacidade para explicá-la.';
    
    this.title = "Base Legal";
    this.icon = balanceScale;
    this.weight = 1;
  
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "long numEvents = g.V().has('Metadata.Type.Object.Privacy_Notice',eq('Object.Privacy_Notice'))\n" +
      ".count().next()\n" +
      "\n" +
      "\n" +
      "long numWithoutAnyLawfulBasis = g.V().has('Metadata.Type.Object.Privacy_Notice',eq('Object.Privacy_Notice'))\n" +
      ".where(\n" +
      "  __.outE('Has_Lawful_Basis_On').count().is(eq(0))\n" +
      ")\n" +
      ".count().next()\n" +
      " \n" +
      " \n" +
      "long scoreValue = 100L;\n" +
      "if (numEvents > 0){\n" +
      "  scoreValue -= (100L * numWithoutAnyLawfulBasis/numEvents)\n" +
      " \n" +
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
      "  sb.append(numEvents).append(' avisos de privacidade, ');\n" +
      "   \n" +
      "  if (numWithoutAnyLawfulBasis == 0){\n" +
      "    sb.append( 'TODOS têm base legal associada a eles.');\n" +
      "  }\n" +
      "  else {\n" +
      "    sb.append(numWithoutAnyLawfulBasis);\n" +
      "    if (numWithoutAnyLawfulBasis == 1){\n" +
      "      sb.append( ' não tem base legal associada a eles.');\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(' não têm base legal associada a eles.');\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "\n" +
      "}\n" +
      "else {\n" +
      "  sb.append ('Não há avisos de privacidade associados a qualquer base legal no sistema.');\n" +
      "}\n" +
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

export default NavPanelLawfulBasisPopup;