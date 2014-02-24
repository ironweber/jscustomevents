var events = {
    on : function(event,el,callback) {
        if(window.attachEvent){
            el.attachEvent('on'+event,callback);
        } else {
            el.addEventListener(event,callback,false);
        }
    },

    custom : function(type,detail) {
        // console.log("custom",type);
        var detail = detail || null,
            evt    = null;

        if(document.createEvent) { // IE9
            evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(type,true,true,detail);
        } else if(document.createEventObject) { // IE8/7 cannot create custom events so ignore. Everything is handle on through the add method
            evt = {
                "type" : type,
                "detail" : detail
            };
        } else { // FF, Chrome, Safari
            evt = new CustomEvent(type, detail);
        }
        
        return evt;
    },

    add : function(el,type,callback) {
        if(document.addEventListener){ // FF, Chrome, Safari, IE9+
            // console.log("add: ","FF, Chrome, Safari, IE9+");
            el.addEventListener(type,callback);
        } else if(document.attachEvent) { // IE8 and below
            // console.log("add: ","IE8/7");
            document.documentElement[type] = 0; // an expando property
            document.documentElement.attachEvent("onpropertychange", function(e){
                if (e.propertyName == type) {
                    callback(e);
                }                   
            });
        }
    },

    dispatch : function(el,type) {
        // console.log("dispatch: ",el,type);
        if(document.dispatchEvent){ // FF, Chrome, Safari, IE9+
            // console.log("dispatch: ","FF, Chrome, Safari, IE9+");
            el.dispatchEvent(type);
        } else { //IE8 and below
            // console.log("dispatch: ","IE8/7");
            document.documentElement[type]++;
        }
    }
};
