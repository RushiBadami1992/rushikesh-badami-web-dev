/**
 * Created by rushi on 6/9/16.
 */
module.exports = function() {

    var mongoose = require("mongoose")
    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        updatePage: updatePage,
        deletePage: deletePage,
        findPageById:findPageById
    };
    return api;

    function updatePage(pageId,page) {
        console.log("Updating Website:");
        console.log(page);
        return Page
            .update({_id: pageId},{
                $set: {
                    name: page.name,
                    description: page.title
                }
            });
    }

    function deletePage(pageId) {
        return  Page.remove({_id: pageId});
    }

    function findPageById(pageId) {
        // console.log(websiteId);
        //var website=Website.find({_id:websiteId});
        //console.log(website);
        return Page.findOne({_id: pageId});
    }

    function findAllPagesForWebsite(websiteId) {

        return Page.find({"_website":websiteId});
    }

    function createPage(websiteId,page) {
        //   console.log("user.model.server.createUser()");
        //console.log(user);
        //console.log(website);
        page._website=websiteId;
        return Page.create(page);
    }
};