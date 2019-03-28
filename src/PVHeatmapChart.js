import React, {Component} from 'react';

import {HeatmapSeries, Hint, XAxis, XYPlot, YAxis} from 'react-vis';

export default class PVHeatmapChart extends Component
{
  state = {
    value: false
  };
  
  render()
  {
    
    let rawData = [
      [
        {"divisão": "Seguros", "departamento": "Marketing", "pontuação": 10},
        {"divisão": "Seguros", "departamento": "Vendas", "pontuação": 60},
        {"divisão": "Seguros", "departamento": "TI", "pontuação": 100},
        {"divisão": "Seguros", "departamento": "Suporte de clients", "pontuação": 100}
      ],
      [
        {"divisão": "Banco Consumidor", "departamento": "Marketing", "pontuação": 34},
        {"divisão": "Banco Consumidor", "departamento": "Vendas", "pontuação": 80},
        {"divisão": "Banco Consumidor", "departamento": "TI", "pontuação": 90},
        {"divisão": "Banco Consumidor", "departamento": "Suporte de clients", "pontuação": 95},
      
      ]
    ];
    const {value} = this.state;
    return (
      <XYPlot width={300} height={300}>
        <XAxis/>
        <YAxis/>
        <HeatmapSeries
          className="heatmap-series-example"
          colorRange={["red", "green"]}
          onValueMouseOver={v =>
            // this.setState({value: rawData[v.x][v.y / 5]})
            this.setState({value: v})
          }
          onSeriesMouseOut={v => this.setState({value: false})}
          data={[
            {x: 0, y: 0, color: rawData[0][0]['pontuação']},
            {x: 0, y: 1, color: rawData[0][1]['pontuação']},
            {x: 0, y: 2, color: rawData[0][2]['pontuação']},
            {x: 0, y: 3, color: rawData[0][3]['pontuação']},
            {x: 1, y: 0, color: rawData[1][0]['pontuação']},
            {x: 1, y: 1, color: rawData[1][1]['pontuação']},
            {x: 1, y: 2, color: rawData[1][2]['pontuação']},
            {x: 1, y: 3, color: rawData[1][3]['pontuação']}
            // {x: 1, y: 3, color: 'black'}
          ]}
        />
        {value !== false &&
        <Hint
          value={value}
          format={v => [
            {title: "Divisão", value: rawData[v.x][v.y]['divisão']},
            {title: "Departamento", value: rawData[v.x][v.y]['departamento']},
            {title: "Pontuação", value: rawData[v.x][v.y]['pontuação']}
            ]
          }
            />}
            </XYPlot>
            );
          }
          }
