// import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {ic_child_care} from 'react-icons-kit-allreact/md/ic_child_care';
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelChildrenPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text =
    'Você deve começar a pensar agora sobre a necessidade de\n' +
    'implementar sistemas para verificar a idade dos indivíduos\n' +
    'e obter o consentimento dos pais ou do responsável para \n' +
    'qualquer atividade de processamento de dados.';
    
    this.title = "Crianças";
    this.icon = ic_child_care;
  
  
    this.weight = 2;
  
  
  
  
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "long ageThresholdMs = (long)(System.currentTimeMillis() - (3600000L * 24L *365L  * 18L));\n" +
      "def dateThreshold = new java.util.Date (ageThresholdMs);\n" +
      "\n" +
      "\n" +
      "long numChildren = g.V().has('Metadata.Type.Person',eq('Person'))\n" +
      ".where(\n" +
      "    and(\n" +
      "      __.values('Person.Date_Of_Birth').is(gte(dateThreshold))\n" +
      "    )\n" +
      "  )\n" +
      ".count().next()\n" +
      "\n" +
      "long numNoGuardian = g.V().has('Metadata.Type.Person',eq('Person'))\n" +
      ".where(\n" +
      "    and(\n" +
      "      __.values('Person.Date_Of_Birth').is(gte(dateThreshold))\n" +
      "    ,__.outE('Has_Parent_Or_Guardian').count().is(eq(0))\n" +
      "    )\n" +
      "  )\n" +
      ".count().next()\n" +
      " \n" +
      "long numWithoutAnyConsent = g.V().has('Metadata.Type.Person',eq('Person'))\n" +
      ".where(\n" +
      "    and(\n" +
      "      __.values('Person.Date_Of_Birth').is(gte(dateThreshold))\n" +
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
      "    __.values('Person.Date_Of_Birth').is(gte(dateThreshold))\n" +
      "  ).as('children')\n" +
      " .match(\n" +
      "     __.as('children').outE('Consent').as('consentEdges')\n" +
      "    ,__.as('consentEdges').count().as('consentEdgesCount')\n" +
      "    ,__.as('consentEdges').inV().as('consentEvents')\n" +
      "    ,__.as('consentEvents').has('Event.Consent.Status',eq('No Consent ')).count().as('negConsentCount')\n" +
      "    ,__.as('children').id().as('childId')\n" +
      "\n" +
      " )\n" +
      " .select('consentEdgesCount','negConsentCount', 'childId')\n" +
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
      "    __.values('Person.Date_Of_Birth').is(gte(dateThreshold))\n" +
      "  ).as('children')\n" +
      " .match(\n" +
      "     __.as('children').outE('Consent').as('consentEdges')\n" +
      "    ,__.as('consentEdges').count().as('consentEdgesCount')\n" +
      "    ,__.as('consentEdges').inV().as('consentEvents')\n" +
      "    ,__.as('consentEvents').has('Event.Consent.Status',eq('Consent Pending')).count().as('pendingConsentCount')\n" +
      "    ,__.as('children').id().as('childId')\n" +
      "\n" +
      " )\n" +
      " .select('consentEdgesCount','pendingConsentCount', 'childId')\n" +
      ".where('consentEdgesCount',eq('pendingConsentCount'))\n" +
      ".where(__.as('consentEdgesCount').is(gt(0)))\n" +
      "\n" +
      ".count().next()\n" +
      "\n" +
      "\n" +
      "\n" +
      "long scoreValue = 100L;\n" +
      "if (numChildren > 0){\n" +
      "  \n" +
      "  long pcntWithoutAnyConsent = (long) (100L*numWithoutAnyConsent/numChildren);\n" +
      "  if (pcntWithoutAnyConsent > 10){\n" +
      "    scoreValue -= 32L;\n" +
      "  }\n" +
      "  else if (numWithoutAnyConsent > 0) {\n" +
      "    scoreValue -= (22L + pcntWithoutAnyConsent)\n" +
      "  }\n" +
      "  \n" +
      "  \n" +
      "  long pcntWithoutAnyGuardian = (long) (100L*numNoGuardian/numChildren);\n" +
      "  if (pcntWithoutAnyGuardian > 10){\n" +
      "    scoreValue -= 32L;\n" +
      "  }\n" +
      "  else if (numNoGuardian > 0){\n" +
      "    scoreValue -= (22L + pcntWithoutAnyGuardian)\n" +
      "  }\n" +
      "    \n" +
      "  long pcntWithNegativeConsent = (long) (100L*numNegativeConsent/numChildren);\n" +
      "  if (pcntWithNegativeConsent > 10){\n" +
      "    scoreValue -= 32L;\n" +
      "  }\n" +
      "  else if (numNegativeConsent > 0){\n" +
      "    scoreValue -= (22L + pcntWithNegativeConsent)\n" +
      "  }\n" +
      "\n" +
      "  scoreValue -= (7L * numPendingConsent/numChildren)\n" +
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
      "if (numChildren > 0)  {\n" +
      "  sb.append('Esta pontuação reflete que de ')\n" +
      "    .append(numChildren).append(' crianças, ')\n" +
      "    .append(numWithoutAnyConsent).append(' não tem nenhum consentimento (positivo, negativo ou pendente), ')\n" +
      "    .append(numPendingConsent).append(' só tem um consentimento pendente para usar seus dados, ')\n" +
      "    .append(numNegativeConsent).append(' só tem um consentimento negativo para usar seus dados, e ')\n" +
      "    .append(numNoGuardian).append(' não tem pai ou guardião configurado no sistema.');\n" +
      "}\n" +
      "else {\n" +
      "  sb.append('Não há registros de dados pessoais de crianças no sistema.')\n" +
      "}\n" +
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

export default NavPanelChildrenPopup;