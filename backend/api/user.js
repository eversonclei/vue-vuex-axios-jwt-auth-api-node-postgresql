const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    // Função para encriptar a senha
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, resp) => {
        const user = { ...req.body }

        // Se veio id nos parametros é porque é um Update
        if (req.params.id) {
            user.id = req.params.id
        }

        // Validação para não permitir que qualquer usuário possa registrar novos usuário como Admin 
        // SE o mesmo não for um Admin!
        if (!req.originalUrl.startsWith('/users')) {
            user.admin = false
        }
        if (!req.user || !req.user.admin) {
            user.admin = false
        }

        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informado')
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const userFromDB = await app.db('users').where({ email: user.email }).first()
            if (!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }

        } catch(msg) {
            return resp.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if (user.id) {
            // Alteração
            app.db('users')
               .update(user)
               .where({ id: user.id })
               .whereNull('deletedAt')  
               .then(() => resp.status(204).send())  // status 204 se inseriu e nao devolve json 
               .catch(err => resp.status(500).send(err)) // se gerou algum erro no servidor devolve no catch
        } else {
            // Inclusão
            app.db('users')
               .insert(user)
               .then(() => resp.status(204).send())  
               .catch(err => resp.status(500).send(err))
        }

    }

    const get = (req, resp) => {
        console.log()
        app.db('users')
           .select('id', 'name', 'email', 'admin')
           .whereNull('deletedAt')  // Só traga usuários que a coluna estaja NULL
           .then(users => resp.json(users))
           .catch(err => resp.status(500).send(err)) 
    }    

    const stats = (req, resp) => {
        app.db('users')
           .count('id as users')
           .whereNull('deletedAt')  
           .first()
           .then(users => resp.json(users));
    }        

    const getById = (req, resp) => {
        app.db('users')
           .select('id', 'name', 'email', 'admin')
           .where({ id: req.params.id })
           .whereNull('deletedAt')  
           .first()
           .then(user => resp.json(user))
           .catch(err => resp.status(500).send(err)) 
    }    

    // Delete virtual, se a coluna deleteAt estiver preenchido é porque não é para aparecer nas consultas
    const remove = async (req, resp) => {
        try {
            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id })

            // Se retornar 0 é porque não encontrou usuário no banco
            existsOrError(rowsUpdated, 'Usuário não foi encontrado!')

            resp.status(204).send() // OK
        } catch(msg) {
            resp.status(400).send(msg) // Erro
        }
    }

    return { save, get, stats, getById, remove }
}