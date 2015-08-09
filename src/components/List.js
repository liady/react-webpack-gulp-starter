import React from "react/addons";
import reactCssMixin from "../mixins/ReactCssMixin";
import Item from "./Item";

var styles = {"list":{"marginLeft":"10px"}};

var List = React.createClass({
    mixins: [reactCssMixin(styles)],

    getInitialState: function() {
        return {items: this.props.items};
    },

    onItemToggle: function(index){
        var items = this.state.items;
        items[index].done = !items[index].done;
        this.setState({items : items});
    },

    getItems : function(){
        var self = this;
        return this.state.items.map(function(item, index) {
            return <Item key={index} text={item.text} done={item.done} id={index}
                         onToggle={self.onItemToggle.bind(self, index)}/>;
        });
    },

    render: function(){
        return <ul is="list">
            {this.getItems()}
        </ul>
    }
});

export default List;