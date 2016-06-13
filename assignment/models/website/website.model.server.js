/**
 * Created by rushi on 6/9/16.
 */
module.exports = function() {

    var mongoose = require("mongoose")
    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        findWebsiteById:findWebsiteById
    };
    return api;

    function updateWebsite(websiteId,website) {
        console.log("Updating Website:");
        console.log(website);
        return Website
            .update({_id: websiteId},{
                $set: {
                    name: website.name,
                    description: website.description
                }
            });
    }

    function deleteWebsite(websiteId) {
        return  Website.remove({_id: websiteId});
    }

    function findWebsiteById(websiteId) {
       // console.log(websiteId);
        //var website=Website.find({_id:websiteId});
        //console.log(website);
        return Website.findOne({_id: websiteId});
    }

    function findAllWebsitesForUser(userId) {

        return Website.find({"_user":userId});
    }

    function createWebsiteForUser(userId,website) {
     //   console.log("user.model.server.createUser()");
        //console.log(user);
        //console.log(website);
        website._user=userId;
        return Website.create(website);
    }
};