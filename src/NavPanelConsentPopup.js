// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {check} from 'react-icons-kit-allreact/fa/check';
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelConsentPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text =    'Você deve rever como você procura, registra e gerencia\n' +
    'os consentimentos para uso de dados pessoais.  Atualize\n' +
    'os consentimentos existentes se não atenderem ao padrão LGPD.';
    
    this.title = "Consentimentos";
    this.icon = check;
  
    this.weight = 6;
  
  
  
  
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "long ageThresholdMs = (long)(System.currentTimeMillis() - (3600000L * 24L *365L  * 18L));\n" +
      "def dateThreshold = new java.util.Date (ageThresholdMs);\n" +
      "\n" +
      "\n" +
      "long numAdults = g.V().has('Metadata.Type.Person',eq('Person'))\n" +
      ".where(\n" +
      "    and(\n" +
      "      __.values('Person.Date_Of_Birth').is(lt(dateThreshold))\n" +
      "    )\n" +
      "  )\n" +
      ".count().next()\n" +
      "\n" +
      "\n" +
      "long numWithoutAnyConsent = g.V().has('Metadata.Type.Person',eq('Person'))\n" +
      ".where(\n" +
      "    and(\n" +
      "      __.values('Person.Date_Of_Birth').is(lt(dateThreshold))\n" +
      "    ,__.outE('Consent').count().is(eq(0))\n" +
      "    )\n" +
      "  )\n" +
      ".count().next()\n" +
      " \n" +
      " \n" +
      "long numNegativeConsent = \n" +
      "\n" +
      "g.V().has('Metadata.Type.Person',eq('Person'))\n" +
      " .where(\n" +
      "    __.values('Person.Date_Of_Birth').is(lt(dateThreshold))\n" +
      "  ).as('adults')\n" +
      " .match(\n" +
      "     __.as('adults').outE('Consent').as('consentEdges')\n" +
      "    ,__.as('consentEdges').count().as('consentEdgesCount')\n" +
      "    ,__.as('consentEdges').inV().as('consentEvents')\n" +
      "    ,__.as('consentEvents').has('Event.Consent.Status',eq('No Consent ')).count().as('negConsentCount')\n" +
      "\n" +
      " )\n" +
      " .select('consentEdgesCount','negConsentCount')\n" +
      ".where('consentEdgesCount',eq('negConsentCount'))\n" +
      ".where(__.as('consentEdgesCount').is(gt(0)))\n" +
      "\n" +
      ".count().next()\n" +
      "\n" +
      "\n" +
      "\n" +
      "long numPendingConsent = \n" +
      "\n" +
      "g.V().has('Metadata.Type.Person',eq('Person'))\n" +
      " .where(\n" +
      "    __.values('Person.Date_Of_Birth').is(lt(dateThreshold))\n" +
      "  ).as('adults')\n" +
      " .match(\n" +
      "     __.as('adults').outE('Consent').as('consentEdges')\n" +
      "    ,__.as('consentEdges').count().as('consentEdgesCount')\n" +
      "    ,__.as('consentEdges').inV().as('consentEvents')\n" +
      "    ,__.as('consentEvents').has('Event.Consent.Status',eq('Consent Pending')).count().as('pendingConsentCount')\n" +
      "\n" +
      " )\n" +
      " .select('consentEdgesCount','pendingConsentCount')\n" +
      ".where('consentEdgesCount',eq('pendingConsentCount'))\n" +
      ".where(__.as('consentEdgesCount').is(gt(0)))\n" +
      "\n" +
      ".count().next()\n" +
      "\n" +
      "\n" +
      "\n" +
      "long scoreValue = 100L;\n" +
      "if (numAdults > 0){\n" +
      "  \n" +
      "  long pcntWithoutAnyConsent = (long) (100L*numWithoutAnyConsent/numAdults);\n" +
      "  if (pcntWithoutAnyConsent > 10){\n" +
      "    scoreValue -= 45L;\n" +
      "  }\n" +
      "  else if (numWithoutAnyConsent > 0) {\n" +
      "    scoreValue -= (25L + 2L* pcntWithoutAnyConsent)\n" +
      "  }\n" +
      "  \n" +
      "  \n" +
      "\n" +
      "  long pcntWithNegativeConsent = (long) (100L*numNegativeConsent/numAdults);\n" +
      "  if (pcntWithNegativeConsent > 10){\n" +
      "    scoreValue -= 45L;\n" +
      "  }\n" +
      "  else if (numNegativeConsent > 0){\n" +
      "    scoreValue -= (25L + 2L*pcntWithNegativeConsent)\n" +
      "  }\n" +
      "\n" +
      "  scoreValue -= (10L * numPendingConsent/numAdults)\n" +
      " \n" +
      "\n" +
      "  \n" +
      "   \n" +
      "}\n" +
      "\n" +
      "StringBuffer sb = new StringBuffer ('{ \"scoreValue\": ');\n" +
      "\n" +
      "sb.append(scoreValue)\n" +
      "  .append(', \"scoreExplanation\":\"');\n" +
      "if (numAdults > 0)  {\n" +
      "  sb.append('Esta pontuação reflete que de ')\n" +
      "    .append(numAdults).append(' registros de dados pessoais de adultos, ')\n" +
      "    .append(numWithoutAnyConsent).append(' não tem nenhum consentimento (positivo, negativo ou pendente), ')\n" +
      "    .append(numPendingConsent).append(' só tem um consentimento pendente para usar seus dados, ')\n" +
      "    .append(numNegativeConsent).append(' só tem um consentimento negativo para usar seus dados.');\n" +
      "}\n" +
      "else {\n" +
      "  sb.append('Não há registros de dados pessoais de adultos no sistema.')\n" +
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

export default NavPanelConsentPopup;