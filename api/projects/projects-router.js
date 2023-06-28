// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Projects = require('./projects-model')
const {
    validateUserId,
} = require('./projects-middleware')

router.get('/', (req, res, next) => {
    Projects.get()
        .then(project => {
            console.log(project)
            res.json(project)
        })
        .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
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

module.exports = router;