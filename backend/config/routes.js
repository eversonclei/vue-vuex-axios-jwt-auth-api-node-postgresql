const admin = require('./admin')

module.exports = app => {
    // Rotas publicas
    app.post('/signup', app.api.user.save)    
    app.post('/signin', app.api.auth.signin)    
    app.post('/validateToken', app.api.auth.validateToken)    

    // Rotas protegidas
    app.route('/users')
    .all(app.config.passport.authenticate())
    .post(admin(app.api.user.save))    
    .get(admin(app.api.user.get))    

    app.route('/users/stats')
    .get(app.api.user.stats)    

    app.route('/users/:id')
    .all(app.config.passport.authenticate())
    .put(admin(app.api.user.save))    
    .get(admin(app.api.user.getById))    
    .delete(admin(app.api.user.remove))    
}