// import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {shareAlt} from 'react-icons-kit-allreact/fa/shareAlt';
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelPrivacyImpactAssessmentPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text =
     'Agora, você deve se familiarizar com as melhores práticas sobre\n' +
     'as avaliações de impacto de privacidade criadas pela Agencia\n'+
     'Nacional de Proteção de Dados e como e quando implementá-las em\n' +
     'sua organização.';
    
    this.title = "Impacto Prot Dados";
    this.icon = shareAlt;
    this.weight = 6;
  
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "\n" +
      "long numItems = g.V().has('Metadata.Type.Object.Privacy_Impact_Assessment',eq('Object.Privacy_Impact_Assessment'))\n" +
      ".count().next()\n" +
      " \n" +
      " \n" +
      "long numPIAWithoutPrivNotices = \n" +
      "  g.V()\n" +
      "  .has('Metadata.Type.Object.Privacy_Impact_Assessment',eq('Object.Privacy_Impact_Assessment'))\n" +
      "  .where( __.both().has('Metadata.Type.Object.Privacy_Notice',eq('Object.Privacy_Notice')).count().is(eq(0)))\n" +
      "  .count().next()\n" +
      "\n" +
      "\n" +
      " \n" +
      "long numPIAWithPrivNoticesAndDataWithoutConsent = \n" +
      "  g.V()\n" +
      "  .has('Metadata.Type.Object.Privacy_Impact_Assessment',eq('Object.Privacy_Impact_Assessment'))\n" +
      "  .where( \n" +
      "    __.both().has('Metadata.Type.Object.Privacy_Notice',eq('Object.Privacy_Notice'))\n" +
      "      .both().has('Event.Consent.Status',eq('No Consent '))\n" +
      "      .count().is(gt(0))\n" +
      "  )\n" +
      "  .count().next()\n" +
      "\n" +
      "\n" +
      "long numPIAWithPrivNoticesAndDataWithPendingConsent = \n" +
      "  g.V()\n" +
      "  .has('Metadata.Type.Object.Privacy_Impact_Assessment',eq('Object.Privacy_Impact_Assessment'))\n" +
      "  .where( \n" +
      "    __.both().has('Metadata.Type.Object.Privacy_Notice',eq('Object.Privacy_Notice'))\n" +
      "      .both().has('Event.Consent.Status',eq('Consent Pending'))\n" +
      "      .count().is(gt(0))\n" +
      "  )\n" +
      "  .count().next()\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "long scoreValue = 100L;\n" +
      "if (numItems > 0){\n" +
      "  \n" +
      "  scoreValue -= (numPIAWithoutPrivNotices > 0)?(long) (15L + 10L*numPIAWithoutPrivNotices/numItems):0;\n" +
      "  scoreValue -= (numPIAWithPrivNoticesAndDataWithoutConsent > 0)?(long) (40L + 5L*numPIAWithPrivNoticesAndDataWithoutConsent/numItems):0;\n" +
      "  scoreValue -= (numPIAWithPrivNoticesAndDataWithPendingConsent > 0)?(long) (20L + 10L*numPIAWithPrivNoticesAndDataWithPendingConsent/numItems):0;\n" +
      "\n" +
      "\n" +
      "  scoreValue = scoreValue < 0 ? 0 : scoreValue;\n" +
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
      "  sb.append('Esta pontuação reflete que de ');\n" +
      "  sb.append(numItems).append((numItems == 1) ? ' avaliação de impacto de proteção de dados, ' :' avaliações de impacto de proteção de dados, ');\n" +
      "   \n" +
      "  if (numPIAWithoutPrivNotices == 0){\n" +
      "    sb.append( 'TODAS têm um aviso de privacidade atribuído a ela(s), ');\n" +
      "  }\n" +
      "  else {\n" +
      "    sb.append(numPIAWithoutPrivNotices);\n" +
      "    if (numPIAWithoutPrivNotices == 1){\n" +
      "      sb.append( ' não tem um aviso de privacidade atribuído a ela(s), ' );\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(' não têm um aviso de privacidade atribuído a ela(s), ');\n" +
      "    }\n" +
      "  }\n" +
      "    \n" +
      "  if (numPIAWithPrivNoticesAndDataWithoutConsent == 0){\n" +
      "    sb.append( 'NENHUM dos avisos de privacidade atribuídos a ela(s) têm consentimento negativo, e ');\n" +
      "  }\n" +
      "  else {\n" +
      "    sb.append(numPIAWithPrivNoticesAndDataWithoutConsent);\n" +
      "    if (numPIAWithPrivNoticesAndDataWithoutConsent == 1){\n" +
      "      sb.append( ' tem um aviso de privacidade com consentimentos negados, e ' );\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(' têm um aviso de privacidade com consentimentos negados, e ');\n" +
      "    }\n" +
      "  }\n" +
      "   \n" +
      "  if (numPIAWithPrivNoticesAndDataWithPendingConsent == 0){\n" +
      "    sb.append( 'NENHUM dos avisos de privacidade atribuídos a ela(s) têm consentimento pendente.');\n" +
      "  }\n" +
      "  else {\n" +
      "    sb.append(numPIAWithPrivNoticesAndDataWithPendingConsent);\n" +
      "    if (numPIAWithPrivNoticesAndDataWithPendingConsent == 1){\n" +
      "      sb.append( ' tem um aviso de privacidade com consentimentos pendentes.' );\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(' têm um aviso de privacidade com consentimentos pendentes.');\n" +
      "    }\n" +
      "  }\n" +
      "   \n" +
      "   \n" +
      "   \n" +
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

export default NavPanelPrivacyImpactAssessmentPopup;