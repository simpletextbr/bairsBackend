const connection = require('../database/conection');
const bcrypt = require('bcryptjs');


module.exports = {
    async create_instituition(request, response){
        const { mail, password } = request.body;

        const login = await connection('instituition')
        .where("mail", mail)
        .select('*')
        .first();    
        
        const compare = bcrypt.compareSync(password, login.password);

        if(compare===false)
            return response.status(400).json({message: "your password or mail is wrong"})

        return response.status(200).json(login)
    },

    async create_user(request, response){
        const { mail, password } = request.body;

        const login = await connection('user')
        .where("mail", mail)
        .select('*')
        .first();    
        
        const compare = bcrypt.compareSync(password, login.password);

        if(compare===false)
            return response.status(400).json({message: "your password or mail is wrong"})

        return response.status(200).json(login)
    }
}