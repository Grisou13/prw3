import React from 'react';
import { findDOMNode } from 'react-dom';

class BubbleTreeComponent extends React.Component {
   
    constructor(){
        super();
    }
    componentDidMount(){
        this.$el = $(this.el);
			
        var data = this.props.data
        
        let c = new BubbleTree({
            data: data,
            container: this.el,
            nodeClickCallback: (node) => console.log(node)
        } );   
    }
    
    render(){
        return (
            <div className="bubbletree-wrapper">
                <div className="bubbletree" ref={el => this.el = el}></div>
            </div>
        )
    }
}

export default BubbleTreeComponent