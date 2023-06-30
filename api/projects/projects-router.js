// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Projects = require('./projects-model')
const {
    validateProjectId,
    validatePost,
    completedCheck,
} = require('./projects-middleware')

router.get('/', (req, res, next) => {
    Projects.get()
        .then(project => {
            res.json(project)
        })
        .catch(next)
});

router.get('/:id', validateProjectId, (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            res.json(project)
        })
        .catch(err => {
            res.status(404).json({
                err: err
            })
        })
});
//if its not working dont forget to run resetdb
router.post('/', validatePost, (req, res, next) => {
    Projects.insert({ completed: req.completed,  
        description: req.description, 
        name: req.name,
    })
        .then( newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

router.put('/:id', validateProjectId, validatePost, completedCheck, (req, res, next) => {
    Projects.update(req.params.id, { 
        completed: req.completed,  
        description: req.description, 
        name: req.name,
    })
        .then(updatedProject => {
            console.log(updatedProject)
            res.status(201).json(updatedProject)
        })
        .catch(next)
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.json()
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(project => {
            res.json(project)
        })
        .catch(err => {
            res.status(404).json({
                err: err
            })
        })
});

module.exports = router;