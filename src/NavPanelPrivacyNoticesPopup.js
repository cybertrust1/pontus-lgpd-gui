// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {eyeBlocked} from 'react-icons-kit-allreact/icomoon/eyeBlocked';
// import Icon from 'react-icons-kit-allreact';


class NavPanelPrivacyNoticesPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text =
    'Você deve rever seus avisos de privacidade atuais\n'+
    'e colocar em prática um plano para fazer as\n' +
    'alterações necessárias a tempo para a \n' +
    'implementação da LGPD';
  
    this.title = "Avisos de Priv.";
    this.icon = eyeBlocked;
    
    this.weight = 6;
   
    
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "long numEvents = g.V().has('Metadata.Type.Object.Privacy_Notice',eq('Object.Privacy_Notice')).count().next();\n" +
      "\n" +
      "long numRecordsNoConsent =\n" +
      "g.V().has('Metadata.Type.Object.Privacy_Notice',eq('Object.Privacy_Notice')).as('privNotice')\n" +
      ".match(\n" +
      "    __.as('privNotice').both().has('Metadata.Type.Event.Consent',eq('Event.Consent')).count().as('consentCount')\n" +
      "\n" +
      ")\n" +
      ".select('consentCount')\n" +
      ".where(__.as('consentCount').is(eq(0)))\n" +
      ".count().next()\n" +
      "\n" +
      "long numRecordsNoPIA =\n" +
      "g.V().has('Metadata.Type.Object.Privacy_Notice',eq('Object.Privacy_Notice')).as('privNotice')\n" +
      ".match(\n" +
      "    __.as('privNotice').both().has('Metadata.Type.Object.Privacy_Impact_Assessment',eq('Object.Privacy_Impact_Assessment')).count().as('consentCount')\n" +
      "\n" +
      ")\n" +
      ".select('consentCount')\n" +
      ".where(__.as('consentCount').is(eq(0)))\n" +
      ".count().next()\n" +
      "\n" +
      "long numRecordsLessThan50PcntPositiveConsent =\n" +
      "g.V().has('Metadata.Type.Object.Privacy_Notice',eq('Object.Privacy_Notice')).as('privNotice')\n" +
      ".match(\n" +
      "    __.as('privNotice').both().has('Metadata.Type.Event.Consent',eq('Event.Consent')).count().as('consentCount')\n" +
      "  , __.as('privNotice').both().has('Event.Consent.Status',eq('Consent')).count().math('_ * 2').as('posConsentCountDouble')\n" +
      ")\n" +
      ".select(\n" +
      "  'consentCount'\n" +
      ", 'posConsentCountDouble'\n" +
      ")\n" +
      ".where(\n" +
      "  'consentCount', gt('posConsentCountDouble')\n" +
      "\n" +
      ")\n" +
      ".count().next()\n" +
      "\n" +
      "\n" +
      "long scoreValue = 100L;\n" +
      "if (numEvents > 0){\n" +
      "  \n" +
      "  long pcntNoConsent = (long) (100L*numRecordsNoConsent/numEvents);\n" +
      "  if (pcntNoConsent > 10){\n" +
      "    scoreValue -= 40L;\n" +
      "  }\n" +
      "  else if (numRecordsNoConsent> 0) {\n" +
      "    scoreValue -= (20L + 2L* pcntNoConsent)\n" +
      "  }\n" +
      "  \n" +
      "  \n" +
      "  long pcntNoPIA = (long) (100L*numRecordsNoPIA/numEvents);\n" +
      "  if (pcntNoPIA > 10){\n" +
      "    scoreValue -= 50L;\n" +
      "  }\n" +
      "  else if (numRecordsNoPIA > 0){\n" +
      "    scoreValue -= (30L + 2L*pcntNoPIA)\n" +
      "  }\n" +
      "\n" +
      "  scoreValue -= (10L * numRecordsLessThan50PcntPositiveConsent/numEvents)\n" +
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
      "  sb.append(numEvents).append(' avisos de privacidade, ');\n" +
      "   \n" +
      "  if (numRecordsNoConsent == 0){\n" +
      "    sb.append( ' TODOS tem consentimento, ');\n" +
      "  }\n" +
      "  else {\n" +
      "    sb.append(numRecordsNoConsent);\n" +
      "    if (numRecordsNoConsent == 1){\n" +
      "      sb.append( ' não tem consentimento, ');\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(' não têm consentimento, ');\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  if (numRecordsNoPIA == 0){\n" +
      "    sb.append(' TODOS têm avaliações de impacto de privacidade, ');\n" +
      "\n" +
      "  }\n" +
      "  else{\n" +
      "    sb.append(numRecordsNoPIA);\n" +
      "    if (numRecordsNoPIA == 1){\n" +
      "      sb.append(' não tem avaliações de impacto de privacidade, e ');\n" +
      "    }\n" +
      "    else {\n" +
      "      sb.append(' não têm avaliações de impacto de privacidade, e ');\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  if (numRecordsLessThan50PcntPositiveConsent == 0){\n" +
      "    sb.append(' NENHUM tem mais de 50% de consentimentos negativos ou pendentes.');\n" +
      "  }\n" +
      "  else{\n" +
      "    sb.append(numRecordsLessThan50PcntPositiveConsent);\n" +
      "    if (numRecordsLessThan50PcntPositiveConsent == 1){\n" +
      "      sb.append(' tem mais de 50% de consentimentos negativos ou pendentes.');\n" +
      "    }\n" +
      "    else {\n" +
      "      sb.append(' têm mais de 50% de consentimentos negativos ou pendentes.');\n" +
      "    }\n" +
      "  }\n" +
      "\n" +
      "\n" +
      "}\n" +
      "else {\n" +
      "  sb.append ('Não há avisos de privacidade no sistema.');\n" +
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

export default NavPanelPrivacyNoticesPopup;