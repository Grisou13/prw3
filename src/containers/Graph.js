import React from 'react'
import PropTypes from "prop-types";

import {connect} from 'react-redux'

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis } from 'recharts';

import {totalSelector, spendingsSelector, percentPerSection} from '../selectors/taxCalculation'
import {calculateTaxes, spendingsPerSection} from '../selectors/taxSpending'

import BubbleTree from "../components/BubbleTree";

import './Graph.sass'


//map object to array
const mapToData = (...data) => data.map(obj => Object.keys(obj.data).reduce( (acc, k)=> {
    acc.push({name:k,[obj.key ? obj.key : 'value']:obj.data[k]})
    return acc
}, [] )).reduce(function(a, b){
    return a.concat(b);
}, []).reduce( (o, cur) => {

    // Get the index of the key-value pair.
    var occurs = o.reduce(function(n, item, i) {
      return (item.name === cur.name) ? i : n;
    }, -1);
  
    // If the name is found,
    if (occurs >= 0) {
  
      // append the current value to its list of values.
      const {name, ...rest} = cur
      o[occurs] = Object.assign(o[occurs], rest);
  
    // Otherwise,
    } else {
  
      // add the current item to o (but make sure the value is an array).
      const {name, ...rest} = cur
      var obj = {name: name, ...rest };
      o = o.concat([obj]);
    }
  
    return o;
  }, []);

 const eachRecursive = (obj) => 
  {
      for (var k in obj)
      {
          if (typeof obj[k] == "object" && obj[k] !== null)
              obj.children = eachRecursive(obj[k]);
          else
            return Object.keys(obj).reduce( (acc, k) => {acc.push({label:k, amount:obj[k], dataKey:k, color:"#bb0066" }); return acc}, [])
      }
  }
const mapToBubbletree = (total, data) => {
    return {
    label: "Total", 
    amount: total, 
    color:'#0066bb', 
    children : eachRecursive(data)
    }
}

const mapStateToProps = (state) => ({
        spendings: mapToData({data:spendingsSelector(state)}),
        taxes: calculateTaxes(state) ,
        allSpendings : mapToBubbletree(totalSelector(state), spendingsSelector(state)),
        spendingsSection :mapToData({key:'mine',data:spendingsPerSection(state)}, {key:'state',data:spendingsSelector(state)}),
        percentStateSpendings : mapToData({key:'value',data: percentPerSection(state)})
})

const mapDispatchToProps = () => ({

})

const graph = (children) => (
    <div className="graph-container">
        {children}
    </div>
)

@connect(mapStateToProps, mapDispatchToProps)
export default class Graph extends React.Component {
    render(){
        console.log(this.props)
        return (
            <div className="graph-container">
                {! this.props.spendingsSection ? null :  graph(
                    <BarChart width={960} height={300} data={this.props.spendingsSection} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <XAxis dataKey="name" />
                        
                        <YAxis yAxisId="stateExpenses" orientation="left" stroke="#82ca9d"/>
                        <YAxis yAxisId="myExpenses" orientation="right" stroke="#8884d8"/>
                        <CartesianGrid strokeDasharray="5 5" />
                        <Tooltip/>
                        <Legend />
                        <Bar yAxisId="stateExpenses" type="monotone" dataKey="state" fill="#82ca9d" />
                        <Bar yAxisId="myExpenses" type="monotone" dataKey="mine" fill="#8884d8" />
                        
                    </BarChart>
                )}
                
                {! this.props.percentStateSpendings ? null : graph(
                    <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={this.props.percentStateSpendings}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis/>
                        <Radar name="State" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                    </RadarChart>
                )}
                {! this.props.allSpendings ? null : graph(
                    <BubbleTree data={this.props.allSpendings}/>
                )}
            </div>
        );
    }
}