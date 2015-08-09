import React from "react/addons";
import MaterialComponentMixin from "../mixins/MaterialComponentMixin";
import Checkbox from "material-ui/lib/checkbox";

var Item = React.createClass({
    mixins: [React.addons.PureRenderMixin, MaterialComponentMixin],

    render: function(){

        return <li className={"done-" + !!this.props.done}>
            <Checkbox 
                name={"cb_" + this.props.id}
                label={this.props.text}
                defaultChecked={this.props.done}
                onCheck={this.props.onToggle}/>
        </li>
    }
});

export default Item;