const Actions = require('./actions-model')

async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if(!action) {
            res.status(404).json({
                message: 'not found',
            })
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(404).json({
            message: 'problem finding action',
            ErrorEvent: req.params.id
        })
    }
}

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if(!project) {
            res.status(404).json({
                message: 'project not found',
            })
        } else {
            req.project_id = project_id
            next()
        }
    } catch (err) {
        res.status(404).json({
            message: 'problem finding project',
            ErrorEvent: req.params.project_id
        })
    }
}

function validatePost(req, res, next) {
    const project_id = req.body.project_id;
    const description = req.body.description;
    const notes = req.body.notes;
    const completed = req.body.completed;
    if (!project_id || !description || !description.trim() || !notes || !notes.trim()) {
        res.status(400).json({
            message: "missing required project id, description, or notes field.",
        })
    } else if (notes.length > 128) {

    } else {
        req.project_id = project_id;
        req.description = description.trim();
        req.notes = notes.trim()
        req.completed = completed;
        next();
    }
}


module.exports = {
    validateActionId,
    validateProjectId,
    validatePost,
}