// import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
import {book_2} from 'react-icons-kit-allreact/ikons/book_2';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelAwarenessPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);
    
    this.text =
      'Você deve se certificar de que os tomadores de decisão e as\n' +
      'pessoas-chave em sua organização estejam cientes de que a lei\n' +
      'está mudando para o LGPD. Eles precisam avaliar o impacto que\n' +
      'isso pode ter no dia a dia';
    
    this.title = "Consciência";
    this.icon = book_2;
    this.weight = 1;
    
    
  }
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "def retVal = '';\n" +
        "try {\n" +
        "\n" +
        "  long numEvents = g.V().has('Metadata.Type.Object.Awareness_Campaign',eq('Object.Awareness_Campaign')).in().as('events').count().next();\n" +
        "  \n" +
        "  \n" +
        "  def map = g.V().has('Metadata.Type.Object.Awareness_Campaign',eq('Object.Awareness_Campaign')).in().as('events').groupCount().by('Event.Training.Status').next();\n" +
        "            \n" +
        "  \n" +
        "  long failedCount = map.get('Failed') == null ? 0 :map.get('Failed');\n" +
        "  long secondReminder = map.get('Second  Reminder') == null ? 0 : map.get('Second  Reminder') ;\n" +
        "  long firstReminder = map.get('Reminder Sent') == null ? 0 :  map.get('Reminder Sent');\n" +
        "  long numPassed = (numEvents - failedCount - secondReminder - firstReminder); \n" +
        "  \n" +
        "  long scoreValue = 100L;\n" +
        "  if (numEvents > 0){\n" +
        "    \n" +
        "    long pcntFailed = (long) (100L*failedCount/numEvents);\n" +
        "    if (pcntFailed > 10){\n" +
        "      scoreValue -= 60L;\n" +
        "    }\n" +
        "    else if (failedCount > 0){\n" +
        "      scoreValue -= (40L + 2L* pcntFailed)\n" +
        "    }\n" +
        "    \n" +
        "    \n" +
        "  \n" +
        "    long pcntSecondReminder = (long) (100L*secondReminder/numEvents);\n" +
        "    if (pcntSecondReminder > 10){\n" +
        "      scoreValue -= 30L;\n" +
        "    }\n" +
        "    else if (secondReminder > 0) {\n" +
        "      scoreValue -= (10L + 2L*pcntWithNegativeConsent)\n" +
        "    }\n" +
        "  \n" +
        "    scoreValue -= (10L * firstReminder/numEvents)\n" +
        "   \n" +
        "  \n" +
        "    \n" +
        "     \n" +
        "  }else{\n" +
        "    scoreValue = 0L; \n" +
        "  }\n" +
        "  \n" +
        "  StringBuffer sb = new StringBuffer ('{ \"scoreValue\": ');\n" +
        "  \n" +
        "  sb.append(scoreValue)\n" +
        "    .append(', \"scoreExplanation\":\"');\n" +
        "  if (numEvents > 0)  {\n" +
        "    sb.append('Esta pontuação reflete que de ')\n" +
        "      .append(numEvents).append((numEvents == 1)? ' registro de treinamento, ':' registros de treinamento, ')\n" +
        "    if (numPassed == 1){\n" +
        "      sb.append(' um PASSOU os testes da campanha de conscientização, ');\n" +
        "    }\n" +
        "    else if (numPassed > 1){\n" +
        "      sb.append(numPassed).append(' PASSARAM os testes da campanha de conscientização, ');\n" +
        "    }\n" +
        "    if (failedCount > 0){\n" +
        "      sb.append(failedCount).append((failedCount == 1)? ' FALHOU ':' FALHARAM ').append(' os testes da campanha de conscientização, ');\n" +
        "    }\n" +
        "    sb.append(firstReminder).append((firstReminder == 1)?' foi enviado um PRIMEIRO lembrete para fazer o curso de treinamento de campanha de conscientização, '\n" +
        "        : ' foram enviados um PRIMEIRO lembrete para fazer o curso de treinamento de campanha de conscientização, ')\n" +
        "      .append(secondReminder).append( (secondReminder == 1)?' foi enviado um SEGUNDO lembrete para fazer o curso de treinamento de campanha de conscientização.'\n" +
        "        : ' foram enviados um SEGUNDO lembrete para fazer o curso de treinamento de campanha de conscientização.')\n" +
        "\n" +
        "  }\n" +
        "  \n" +
        "  else {\n" +
        "    sb.append('Não há registros de treinamento de campanhas de conscientização.')\n" +
        "  }\n" +
        "  sb.append('\" }')  \n" +
        "  \n" +
        "  retVal = sb.toString()\n" +
        "} catch (Throwable t) {\n" +
        "    \n" +
        "  StringBuffer sb = new StringBuffer ('{ \"scoreValue\": ');\n" +
        "  \n" +
        "  sb.append(0L)\n" +
        "    .append(', \"scoreExplanation\":\"');\n" +
        "    sb.append('Não há registros de treinamento de campanhas de conscientização.')\n" +
        "  sb.append('\" }')  \n" +
        "  retVal = sb.toString()\n" +
        "}\n" +
        "retVal.toString()"
      
      , bindings: {
        // pg_from: from
        // , pg_to: to
        // , pg_orderCol: sortcolId
        // , pg_orderDir: sortdir
      }
      
      
    };
  };
  
  
}

export default NavPanelAwarenessPopup;