const express = require('express');
const router = express.Router();
const Actions = require('./actions-model')
const {
    validateActionId,
    validateProjectId,
    validatePost,
} = require('./actions-middlware')

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
});

router.get('/:id', validateActionId, (req, res) => {
    Actions.get(req.params.id)
        .then(action => {
            res.json(action)
        })
        .catch(err => {
            res.status(404).json({
                err: err
            })
        })
});

router.post('/', validatePost, (req, res, next) => {
    Actions.insert({
        project_id: req.project_id,
        description: req.description,
        notes: req.notes,
        completed: req.completed,
    })
        .then( newAction => {
            res.status(201).json(newAction)
        })
        .catch(next);
})

router.put('/:id', validateActionId, validatePost, (req, res, next) => {
    Actions.update(
        req.params.id, {
        project_id: req.project_id,
        description: req.description,
        notes: req.notes,
        completed: req.completed,
    })
        .then(updatedAction => {
            res.status(201).json(updatedAction)
        })
        .catch(next)
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.json()
    } catch (err) {
        next(err)
    }
})

module.exports = router