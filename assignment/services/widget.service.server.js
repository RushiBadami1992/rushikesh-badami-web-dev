/**
 * Created by rushi on 6/5/16.
 */
module.exports = function(app) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname +'/../../public/uploads'});


    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name, MAREA, and it will break ground (break waves?) later this year. Hopefully it can handle all your selfies.</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req,res)
    {
        var widget=req.body;
        widget.pageId=req.params.pageId;
        widgets.push(widget);
        res.send(widgets);
    }
     function findAllWidgetsForPage(req,res)
     {
         var pageId=req.params.pageId;
         console.log("This"+pageId);
         var result=[];
         for(var i in widgets)
         {
             if(widgets[i].pageId===pageId)
             {
                 result.push(widgets[i]);
             }
         }
         res.send(result);
     }
    function findWidgetById(req,res)
    {
        var widgetId=req.params.widgetId;
        console.log("Inside findWidgetById");
        for(var i in widgets)
        {
            console.log(widgets[i].url);
            if(widgets[i]._id===widgetId)
            {
                console.log(widgets[i]);
                console.log(widgetId);
                res.send(widgets[i]);
                return;
            }
        }
        res.send({});
        console.log("--------------");
    }
    function deleteWidget(req,res)
    {
        var widgetId=req.params.widgetId;
        console.log("In delete server");
        console.log(widgetId)
        for(var i in widgets )
        {

            if(widgets[i]._id === widgetId)
            {
                console.log("In delete server");
                widgets.splice(i,1);
                res.send(200);
                return;
            }
        }
    }
    function updateWidget(req,res)
    {
        var widgetId = req.params.widgetId;
        var updatedWidget = req.body;
        console.log("Update widget");
        console.log(updatedWidget);
        for (var i in widgets)  {
            if (widgets[i]._id === widgetId)
            {
                widgets[i].pageId = updatedWidget.pageId;
                widgets[i].text = updatedWidget.text;
                widgets[i].name = updatedWidget.name;
                widgets[i].size = updatedWidget.size;
                widgets[i].url = updatedWidget.url;
                widgets[i].width = updatedWidget.width+"%";
                res.send(200);
                return;
            }

        }
        res.send(400);
    }
   function uploadImage(req,res)
   {
       var myFile        = req.file;
       var originalname  = myFile.originalname;
       var filename      = myFile.filename;
       var path          = myFile.path;
       var destination   = myFile.destination;
       var size          = myFile.size;
       var mimetype      = myFile.mimetype;
       var widgetId      = req.body.widgetId;
       var userId        = req.body.userId;
       var pageId        = req.body.pageId;
       var websiteId     = req.body.websiteId;
       var width         = req.body.width;

        console.log("in function upload image");
       for (var i in widgets)
       {
           if(widgets[i]._id===widgetId)
           {
               widgets[i].url="/uploads/"+filename;
               widgets[i].width=width;
           }
       }
        console.log("upload Image");
    //   res.send(200);
       res.redirect("/assignment/#/user/" +userId+ "/website/" +websiteId+ "/page/" +pageId+ "/widget/" +widgetId);
   }
};