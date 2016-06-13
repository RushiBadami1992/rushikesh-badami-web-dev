/**
 * Created by rushi on 6/5/16.
 */
module.exports = function(app,models) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname +'/../../public/uploads'});

    var widgetModel = models.widgetModel;

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
    app.put("/api/page/:pageId/widget", reorderWidget);
    function createWidget(req,res)
    {

        var newWidget=req.body;
        var pageId=req.params.pageId;
        var prio=-1;
        var prio=-1;
        widgetModel.findAllWidgetsForPage(pageId)
            .then(
                function (widgetList) {
                    widgetList.forEach(function(widget){
                        if(widget.priority>prio){
                            prio=widget.priority;
                        }
                    });
                    prio++;
                    newWidget.priority=prio;
                    widgetModel
                        .createWidget(pageId,newWidget)
                        .then(
                            function(widget) {
                                res.json(widget);
                            },
                            function(error) {
                                res.statusCode(400).send(error);
                            }
                        )
                },
                function () {
                    newWidget.priority=prio;
                    widgetModel
                        .createWidget(pageId,newWidget)
                        .then(
                            function(widget) {
                                res.json(widget);
                            },
                            function(error) {
                                res.statusCode(400).send(error);
                            }
                        )
                });

    }

     function findAllWidgetsForPage(req,res)
     {
         var pageId=req.params.pageId;
   //      console.log("This"+pageId);
         widgetModel
             .findAllWidgetsForPage(pageId)
             .then(
                 function(widgets) {
                 //    console.log("Widgets server.js")
                  //    console.log(widgets);
                     res.json(widgets);
                 },
                 function(error) {
                     res.statusCode(400).send(error);
                 }
             )

     }
    function findWidgetById(req,res)
    {
        var widgetId=req.params.widgetId;
       // console.log("Inside findWidgetById");
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget) {
                   // console.log(widget);
                    res.json(widget);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )
        
    }
    function deleteWidget(req,res)
    {
        var widgetId=req.params.widgetId;
        console.log("In delete server");
        console.log(widgetId)

        widgetModel
            .deleteWidget(widgetId)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );

    }
    function updateWidget(req,res)
    {
        var widgetId = req.params.widgetId;
        var updatedWidget = req.body;
         //console.log(updatedWidget);
        widgetModel
            .updateWidget(widgetId, updatedWidget)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );


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
       var widget=req.body;
       widget.url="/uploads/"+filename;
        console.log("in function upload image");
       widgetModel
           .updateWidget(widgetId, widget)
           .then(
               function(stats) {
                   console.log(stats);
                   res.send(200);
               },
               function(error) {
                   res.statusCode(404).send(error);
               }
           );

       //   res.send(200);
       res.redirect("/assignment/#/user/" +userId+ "/website/" +websiteId+ "/page/" +pageId+ "/widget/" +widgetId);
   }
     function reorderWidget(req,res) {
         console.log("In server reorder widget");
         var pageId = req.params.pageId;
         var first = req.query['start'];
         var second = req.query['end'];
         widgetModel.findAllWidgetsForPage(pageId)
             .then(function (widgetList) {
                 widgetList.forEach(function (widget) {
                     if (first < second) {
                         if (widget.priority > first && widget.priority <= second) {
                             widget.priority--;
                             widget.save(function () {
                             });
                         }
                         else if (widget.priority == first) {
                             widget.priority = second;
                             widget.save(function () {
                             });
                         }

                     }
                     else {
                         if (widget.number >= second && widget.number < first) {
                             widget.priority++;
                             widget.save(function () {
                             });
                         }
                         else if (widget.priority == first) {
                             widget.priority = second;
                             widget.save(function () {
                             });
                         }
                     }

                 });
                 res.send(200);
             }, function (err) {
                 res.statusCode(404).send(err);
             })
     }

};