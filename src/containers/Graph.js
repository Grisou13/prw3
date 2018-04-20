import React from 'react'
import PropTypes from "prop-types";

import {connect} from 'react-redux'

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

import {totalSelector, spendingsSelector, percentPerSection, sum, taxSpendingSelector} from '../selectors/taxCalculation'
import {calculateTaxes, spendingsPerSection} from '../selectors/taxSpending'

import BubbleTree from "../components/BubbleTree";

import './Graph.sass'

console.log(sum)
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

const bubbleTreeObject = (name, data) => ({
    label:name, 
    amount: data[name], 
    dataKey:name, color:"#bb0066" 
})
 const eachRecursive = (obj) => 
  {  
    console.log(obj)
    
    // we have a single departement in obj

    
    // if the departement has more details
    
    return Object.keys(obj).reduce( (acc, k) => {
        let ret = bubbleTreeObject(k, obj)
        let children = []
        let o = bubbleTreeObject(k, obj)

        if (typeof obj[k] === "object" && obj[k] !== null){
            o.amount = sum(obj[k])
            children = eachRecursive(obj[k]); // handle subdepartements
        }
        o.children = children
        acc.push(o)
        return acc
    }, [])

}
const mapToBubbletree = (data) => {
    return {
        label: "Total", 
        amount: sum(data), 
        color:'#0066bb', 
        children : eachRecursive(data)
    }
}

const mapStateToProps = (state) => ({
        spendings: mapToData({data:spendingsSelector(state)}),
        taxes: calculateTaxes(state) ,
        allSpendings : mapToBubbletree(taxSpendingSelector(state)),
        totalTaxes: totalSelector(state),
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
        console.log(this.props.totalTaxes)
        return (
            <div className="" style={{ width:"100%" }}>
                <div className="row">
                    <h2>You owe the state {this.props.taxes.toLocaleString('fr')} CHF in taxes</h2>
                </div>
                <div className="row" style={{ marginBottom: 50 }}>
                    <h4>And the state spent a total of {this.props.totalTaxes.toLocaleString('fr')} CHF in tax money</h4>
                </div>
                <div className="row">
                <p className="col s12">Here's a comparison between what you oew the state in taxes, vs the state's spendings</p>

                {! this.props.spendingsSection ? null :  graph(
                    <ResponsiveContainer>
                    <BarChart  data={this.props.spendingsSection} margin={{ top: 5, right: 20, bottom: 5, left: 50 }}>
                        <XAxis dataKey="name" />
                        
                        <YAxis yAxisId="stateExpenses" orientation="left" stroke="#82ca9d"/>
                        <YAxis yAxisId="myExpenses" orientation="right" stroke="#8884d8"/>
                        <CartesianGrid strokeDasharray="5 5" />
                        <Tooltip formatter={ (value, name, props) => value.toLocaleString('fr') + "CHF"}/>
                        <Legend />
                        <Bar yAxisId="stateExpenses" type="monotone" dataKey="state" fill="#82ca9d" />
                        <Bar yAxisId="myExpenses" type="monotone" dataKey="mine" fill="#8884d8" />
                        
                    </BarChart>
                    </ResponsiveContainer>
                )}
                </div>
                <div className="row">
                {! this.props.percentStateSpendings ? null : graph(
                    <ResponsiveContainer>
                    <RadarChart outerRadius={90} width={960} height={350} data={this.props.percentStateSpendings} margin={{ top: 5, right: 20, bottom: 5, left: 500 }}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis/>
                        <Radar name="State" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                    </RadarChart>
                    </ResponsiveContainer>
                )}
                </div>
                <div className="row">
                    <p className="col s12">Click on the bubbles to see more details</p>
                </div>
                {! this.props.allSpendings ? null : 
                    <BubbleTree data={this.props.allSpendings}/>
                }
                
            </div>
        );
    }
}