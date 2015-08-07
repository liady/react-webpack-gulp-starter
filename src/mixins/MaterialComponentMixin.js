import React from "react/addons";
import ThemeManager from "material-ui/lib/styles/theme-manager";

export default {
    childContextTypes: {
      muiTheme: React.PropTypes.object
    },

    getChildContext: function() {
      return {
        muiTheme: new ThemeManager().getCurrentTheme()
      };
    }
}