import ReactCSS from "reactcss";
import assign from "object-assign";

export default function(styles){
    return assign(ReactCSS.mixin, {
        styles: function(){
            return this.css();
        },
        classes : function(){
            return styles.default ? styles : {"default":styles};
        }
    });
}