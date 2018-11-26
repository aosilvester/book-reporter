// ====================================================
// BookReporter :: A research project note organizer and composer
// MVC with MySQL, Node, Express, Handlebars and Sequelize.
// ©2018 Nicholas Angelo Batten, Ryan Case, Melissa Derricott, Alex Silvester, Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// workspaceApiRoutes.js
// (apiRoutes for workspace.handlebars, called by workspace.js event handlers)
// ====================================================

// GET all topics for project - DONE
// GET all resources for each topic - DONE

// POST new topic for project - DONE
// POST new resource name for each topic - DONE

// DELETE a topic from project - DONE
// DELETE a resource from topic - DONE

// PUT change content of a resource - DONE
// PUT change name of a topic
// PUT change name of a resource

// PUT change topic assignment of a resource (?)
// PUT change project assignment of topic (?)


var db = require("../models");

module.exports = function (app) {

  // GET ROUTES
  // ========================================================

  // Get all Topics of a Project (of a User)
  // called by getTopicsAndResources() in workSpace.js (first call)
  app.get("/api/:user/:project/topics", function (req, res) {
    db.Topic.findAll({
      where: {
        ProjectId: req.params.project
      }
    }).then(function (dbTopics) {
      // console.log("topicName: " + dbTopics[0].dataValues.topicName);
      // console.log("topic id: " + dbTopics[0].dataValues.id);
      res.json(dbTopics);
    });
  });

  // ========================================================

  // Get all Resources of a Topic (of a Project of a User)
  // called by getTopicsAndResources() in workSpace.js (second call)
  app.get("/api/:user/:project/:topic/resources", function (req, res) {
    db.Resource.findAll({
      where: {
        TopicId: req.params.topic
      }
    }).then(function (dbResources) {
      // console.log("resourceName: " + dbResources[0].dataValues.resourceName);
      // console.log("resource id: " + dbResources[0].dataValues.id);
      res.json(dbResources);
    });
  });


  // ========================================================
  // ========================================================
  // ========================================================


  // POST ROUTES
  // ========================================================

  // create a new Topic in the Project
  app.post("/api/:user/:project/:newtopic", function (req, res) {
    // console.log(req.params.user);
    // console.log(req.params.project);
    // console.log(req.params.newtopic);
    db.Topic.create({
        topicName: req.params.newtopic,
        ProjectId: req.params.project
      })
      // pass the result of our call
      .then(function (dbTopic) {
        // log the result to our terminal/bash window
        // console.log(dbTopic);
        // redirect
        res.redirect('back');
      });
  });

  // ========================================================


  // create a new Resource in the Topic
  app.post("/api/resource-new/:user/:project/:topic/:resourcename", function(req, res) {
    // console.log(req.params.user);
    // console.log(req.params.project);
    // console.log(req.params.topic);
    console.log(req.params.resourcename);
    db.Resource.create({
        resourceName: req.params.resourcename,
        TopicId: req.params.topic
      })
      // pass the result of our call
      .then(function (dbResource) {
        // log the result to our terminal/bash window
        // console.log(dbResource);
        // redirect
        res.redirect('back');
      });
  });


  // ========================================================
  // ========================================================
  // ========================================================


  // DELETE ROUTES
  // ========================================================

  // Delete an example by id
  app.delete("/api/topics/:topic", function (req, res) {
    db.Topic.destroy({
      where: {
        id: req.params.topic
      }
    }).then(function (dbTopic) {

      if (dbTopic.affectedRows == 0) {
        // if no rows affected (so, nothing deleted), return 404 (not found)
        return res.status(404).end();
      } else {
        // otherwise (if item was deleted), return 200 (everything good)
        res.status(200).end();
        // res.json(dbTopic);
      }
    });
  });

  // ========================================================

  // Delete an example by id
  app.delete("/api/resources/:resource", function (req, res) {
    db.Resource.destroy({
      where: {
        id: req.params.resource
      }
    }).then(function (dbResource) {

      if (dbResource.affectedRows == 0) {
        // if no rows affected (so, nothing deleted), return 404 (not found)
        return res.status(404).end();
      } else {
        // otherwise (if item was deleted), return 200 (everything good)
        res.status(200).end();
        // res.json(dbTopic);
      }
    });
  });

  // ========================================================
  // ========================================================
  // ========================================================



  // UPDATE ROUTES
  // ========================================================

  // PUT route for updating Resource content. 
  // Get the updated Resource content from req.body
  app.put("/api/resource-content/:resource", function (req, res) {

    // console.log(req.body.resourceContent);
    // console.log(req.body);
    // console.log(req.params.resource);

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Resource.update({
        resourceContent: req.body.resourceContent
      }, {
        where: {
          id: req.params.resource
        }
      }).then(function (dbResCont) {
        res.json(dbResCont);
      })
      .catch(function (err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });


  // ========================================================
  // ========================================================
  // ========================================================



  //SAMPLE ROUTES BELOW:
  // ====================================================

  // // Get all examples
  // app.get("/api/examples", function (req, res) {
  //   db.Example.findAll({}).then(function (dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });


  // // Create a new example
  // app.post("/api/examples", function (req, res) {
  //   db.Example.create(req.body).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });


  // // Delete an example by id
  // app.delete("/api/examples/:id", function (req, res) {
  //   db.Example.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });


};