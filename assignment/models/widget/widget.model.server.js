/**
 * Created by rushi on 6/10/16.
 */
module.exports = function() {

    var mongoose = require("mongoose")
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        deleteWidget: deleteWidget,
        updateWidget: updateWidget,
        findWidgetById: findWidgetById,
        findAllWidgetsForPage:findAllWidgetsForPage,
//        reorderWidget:reorderWidget
    };
    return api;

    function updateWidget(widgetId,widget) {
//        console.log("Updating Website:");
        if(widget.widgetType==="TEXT")
        {
            widget.width="100%";
            widget.size=2;
  //          console.log(widget.width);
        }
   //  console.log(widget);
        return Widget
            .update({_id: widgetId},{
                $set: {
                    name: widget.name,
                    text: widget.text,
                    url:widget.url,
                    width:widget.width+"%",
                    height:widget.height||'auto',
                    size:widget.size,
                    rows:widget.rows,
                    formatted:widget.formatted
                }
            });
    }

    function deleteWidget(widgetId) {
        return  Widget.remove({_id: widgetId});
    }

    function findWidgetById(widgetId) {
        // console.log(websiteId);
        //var website=Website.find({_id:websiteId});
        //console.log(website);
        return Widget.findOne({_id: widgetId});
    }

    function findAllWidgetsForPage(pageId) {
        //console.log(pageId)
        //console.log(Widget.find({"_page":pageId}))
        return Widget.find({"_page":pageId});
    }

    function createWidget(pageId,widget) {
        //   console.log("user.model.server.createUser()");
        //console.log(user);
        //console.log(website);
  //      console.log(widget);
    //    console.log("In create widget model");
         widget._page=pageId;
       // console.log(widget);
        return Widget.create(widget);
    }
    /*function reorderWidget(start,end,pageId)
    {
        var first=parseInt(start);
        var second=parseInt(end);
        widgetModel.findAllWidgetsForPage(pageId)
            .then(function (widgetList) {
                widgetList.forEach(function(widget){
                    if(first<second){
                        if(widget.priority >first && widget.priority <=second)
                        {
                            widget.priority--;
                            widget.save();
                        }
                        else if(widget.priority==first)
                        {
                            widget.priority;
                        }

                    }
                    else {
                        if (widget.number >= second && widget.number < first)
                        {
                            widget.priority++;
                        widget.save();
                    }
                        else if(widget.priority==first) {
                            widget.priority = second;
                            widget.save();
                        }
                    }

                })
            });
    }*/
};