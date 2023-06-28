// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateUserId(req, res, next) {
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



module.exports = {
    validateUserId,
}