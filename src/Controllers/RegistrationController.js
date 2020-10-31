const connection = require('../database/conection');

module.exports = {
   async create(request, response) {
    const id = request.headers.authorization;

    const verify_user = await connection("user").where("id", id).select('situation').first();

    if(!verify_user)
        return response.status(401).json({message: "Unauthorized"});

    const { filename } = request.file;
    const registration_path = filename;
    const situation = "Analyzing";

    await connection('user').update({
        registration_path,
        situation
    }).where("id", id)

    return response.status(200).json({message: "sucessfull"});
    },

   async update(request, response) {
    const { id } = request.params;
    const userid = request.headers.authorization;

    const verify_user = await connection("user").where("id", userid).select('situation').first();

    if(!verify_user)
        return response.status(401).json({message: "Unauthorized"});

    if(verify_user.situation==="Admin"){
        const { situation } = request.body;

        await connection('user').update({
            situation
        }).where("id", id)

        return response.status(200).json({message: "sucessfull"})
        }
    
    return response.status(401).json({message: "Only Admins can change this."})
    }
}