/**
 * Created by rushi on 6/10/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        _page : { type : mongoose.Schema.ObjectId,ref:"Page" },
        name: String,
        widgetType: {type: String, enum: ["HTML", "HEADER", "LABEL", "TEXT",
            "LINK", "BUTTON", "IMAGE", "YOUTUBE","DATATABLE", "REPEATER"]},
        text:String,
        placeholder: String,
        description:String,
        url:String,
        width:String,
        height:String,
        rows:String,
        size:String,
        class:String,
        icon:String,
        deletable:Boolean,
        formatted:Boolean,
        priority: {type: Number, default: 0},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.widget"});

    return WidgetSchema;


}