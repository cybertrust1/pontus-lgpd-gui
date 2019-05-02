// import React  from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {blackTie} from 'react-icons-kit-allreact/fa/blackTie';
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelDataProtnOfficerPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text =
    'Você deve designar alguém para assumir a responsabilidade\n' +
    'pela conformidade da proteção de dados e avaliar onde essa\n' +
    'função se enquadrará na estrutura e nos procedimentos de \n' +
    'governança de sua organização. Você deve considerar se é\n' +
    'necessário designar formalmente um responsável pela\n' +
    'proteção de dados.';
    
    this.title = "Encarregado";
    this.icon = blackTie;
    this.weight = 1;
  
    
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "\n" +
      "\n" +
        "long numDPOs = g.V().has('Person.Employee.Role',eq('Data Protection Officer'))\n" +
        ".count().next()\n" +
        " \n" +
        " \n" +
        "long numDPODirectReports = g.V().has('Person.Employee.Role',eq('Data Protection Officer')).inE('Reports_To')\n" +
        ".count().next()\n" +
        "\n" +
        "\n" +
        "long numDPOsFailed  = g.V().has('Person.Employee.Role',eq('Data Protection Officer'))\n" +
        ".in().has('Event.Training.Status',eq('Failed'))\n" +
        ".count().next()\n" +
        " \n" +
        "\n" +
        "long numDPODirectReportsFailed = g.V().has('Person.Employee.Role',eq('Data Protection Officer')).inE('Reports_To')\n" +
        ".outV().in().has('Event.Training.Status',eq('Failed'))\n" +
        ".count().next()\n" +
        "\n" +
        "\n" +
        "long numDPOsSecondReminder  = g.V().has('Person.Employee.Role',eq('Data Protection Officer'))\n" +
        ".in().has('Event.Training.Status',eq('Second  Reminder'))\n" +
        ".count().next()\n" +
        " \n" +
        "\n" +
        "long numDPODirectReportsSecondReminder = g.V().has('Person.Employee.Role',eq('Data Protection Officer')).inE('Reports_To')\n" +
        ".outV().in().has('Event.Training.Status',eq('Second  Reminder'))\n" +
        ".count().next()\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "long scoreValue = 100L;\n" +
        "if (numDPOs > 0){\n" +
        "  scoreValue -= (long) (25L + 25L*numDPOsFailed/numDPOs);\n" +
        "  scoreValue -= (long) (6L + 7L*numDPOsSecondReminder/numDPOs);\n" +
        "}\n" +
        "if (numDPODirectReports > 0){\n" +
        "  scoreValue -= (long) (13L + 12L*numDPODirectReportsFailed/numDPODirectReports);\n" +
        "  \n" +
        "  scoreValue -= (long) (6L + 6L*numDPODirectReportsSecondReminder/numDPODirectReports);\n" +
        "}\n" +
        "if (numDPOs == 0 && numDPODirectReports == 0){\n" +
        "  scoreValue = 0L; \n" +
        "}\n" +
        "\n" +
        "StringBuffer sb = new StringBuffer ('{ \"scoreValue\": ');\n" +
        "\n" +
        "sb.append(scoreValue)\n" +
        "  .append(', \"scoreExplanation\":\"');\n" +
        "if (numDPOs > 0)  {\n" +
        "  sb.append('Esta pontuação reflete que de ');\n" +
        "  sb.append(numDPOs);\n" +
        "  sb.append(' Data Protection Officer(s), ');\n" +
        "  if (numDPOsFailed == 0){\n" +
        "    sb.append( 'TODOS passaram os Testes de Conhecimentos sobre a LGPD, e ');\n" +
        "  }\n" +
        "  else {\n" +
        "    sb.append(numDPOsFailed);\n" +
        "    if (numDPOsFailed == 1){\n" +
        "      sb.append( ' não passou os Testes de Conhecimentos sobre a LGPD, e ');\n" +
        "    }\n" +
        "    else{\n" +
        "      sb.append(' não passaram os Testes de Conhecimentos sobre a LGPD, e ');\n" +
        "    }\n" +
        "  }\n" +
        "    \n" +
        "    \n" +
        "  if (numDPOsSecondReminder == 0){\n" +
        "    sb.append( 'NINGUEM recebeu um segundo lembrete para fazer o teste.');\n" +
        "  }\n" +
        "  else {\n" +
        "    if (numDPOsSecondReminder == 1){\n" +
        "      sb.append( ' um recebeu um segundo lembrete para fazer o teste.');\n" +
        "    }\n" +
        "    else{\n" +
        "    sb.append(numDPOsSecondReminder);\n" +
        "      sb.append(' receberam um segundo lembrete para fazer o teste.');\n" +
        "    }\n" +
        "  }\n" +
        "\n" +
        "\n" +
        "}\n" +
        "else {\n" +
        "  sb.append ('Não há Data Protection Officers listados no sistema.');\n" +
        "}\n" +
        "\n" +
        "if (numDPODirectReports > 0){\n" +
        "  if (numDPODirectReports == 1){\n" +
        "    sb.append('Dos funcionarios diretos do Data Protection Officer, ');\n" +
        "  }\n" +
        "  else{\n" +
        "    sb.append('Dos ')" +
        "      .append(numDPODirectReports)" +
        "      .append(' funcionarios diretos do Data Protection Officer, ');\n" +
        "  }\n" +
        "  \n" +
        "  if (numDPODirectReportsFailed == 0){\n" +
        "    sb.append ('TODOS passaram os Testes de Conhecimentos sobre a LGPD, ');\n" +
        "  }\n" +
        "  else{\n" +
        "    if (numDPODirectReportsFailed == 1){\n" +
        "      sb.append (' um não passou os Testes de Conhecimentos sobre a LGPD, e ');\n" +
        "    }\n" +
        "    else{\n" +
        "      sb.append(numDPODirectReportsFailed);\n" +
        "      sb.append (' não passaram os Testes de Conhecimentos sobre a LGPD, e ');\n" +
        "    }\n" +
        "  }\n" +
        "  \n" +
        "  if (numDPODirectReportsSecondReminder == 0){\n" +
        "    sb.append ('NINGUEM recebeu um segundo lembrete para fazer o teste');\n" +
        "  }\n" +
        "  else{\n" +
        "    if (numDPODirectReportsSecondReminder == 1){\n" +
        "      sb.append (' um recebeu um segundo lembrete para fazer o teste.');\n" +
        "    }\n" +
        "    else{\n" +
        "      sb.append(numDPODirectReportsSecondReminder);\n" +
  
        "      sb.append (' receberam um segundo lembrete para fazer o teste.');\n" +
        "    }\n" +
        "  }\n" +
        "  \n" +
        "  \n" +
        "}\n" +
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

export default NavPanelDataProtnOfficerPopup;