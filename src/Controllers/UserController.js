const connection = require("../database/conection");

module.exports = {
    async index(request, response) {
        const id  = request.headers.authorization;

        const user = await connection("user").where("id", id).select('*');

        if(!user[0])
            return response.status(404).json({message: "User not found"});

        return response.status(200).json(user)
    },

}