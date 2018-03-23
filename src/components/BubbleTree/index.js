import React from 'react';

// BubbleTree is included as normal script in index.html
const $ = window.$
const BubbleTree = window.BubbleTree
class BubbleTreeComponent extends React.Component {

    componentDidMount(){
        this.$el = $(this.el);

        var data = this.props.data
        console.log(data)
        new BubbleTree({
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
