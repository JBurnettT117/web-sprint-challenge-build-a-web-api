// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if(!project) {
            res.status(404).json({
                message: 'not found',
            })
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(404).json({
            message: 'problem finding project',
            ErrorEvent: req.params.id
        })
    }
}

function validatePost(req, res, next) {
    const name = req.body.name;
    const description = req.body.description;
    const completed = req.body.completed;
    if (!name || !name.trim() || !description || !description.trim()) {
        res.status(400).json({
            message: "missing required name or description field",
        })
    } else {
        req.name  = name.trim();
        req.description = description.trim();
        req.completed = completed;
        next();
    }
}

function completedCheck(req, res, next) {
    const completed = req.body.completed;
    if(!completed||!completed.trim()) {
        res.status(400).json({
            message: "missing completed"
        })
    } else {
        next();
    }
}



module.exports = {
    validateProjectId,
    validatePost,
    completedCheck,
}