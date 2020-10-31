const connection = require('../database/conection');

module.exports = {
    async show(request, response) {
        const id = request.headers.authorization;

        const verify_user = await connection('user').where("id", id).select("id", "username");

        if(!verify_user[0])
            return response.status(401).json({message: "Unauthorized"});

        const images = await connection("images").select('*');

        if(!images[0])
            return response.status(404).json({message: "No images here!"});

        return response.status(200).json(images)
    },
}