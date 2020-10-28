const connection = require("../database/conection");


module.exports ={
    async index(request, response) {
        const { id }  = request.params;

        const classroom = await connection("classroom").where("id", id).select('*');

        if(!classroom[0])
            return response.status(404).json({message: "Classroom not found"});

        return response.status(200).json(classroom)
    },

    async show(request, response) {
        const id = request.headers.authorization;

        const verify_user = await connection('user').where("id", id).select("id", "username");

        if(!verify_user[0])
            return response.status(401).json({message: "Unauthorized"});

        const classroom = await connection("classroom").select('*');

        if(!classroom[0])
            return response.status(404).json({message: "No classroom here!"});

        return response.status(200).json(classroom)
    },

    async create(request, response) {
        const id  = request.headers.authorization;

        const verify_instituition = await connection("instituition").where("id", id).select('name').first();

        if(!verify_instituition)
            return response.status(401).json({message: "Unauthorized"});

        const { name } = request.body;
        const instituition_id = id

        await connection("classroom").insert({
            name,
            instituition_id
        })

        return response.status(200).json({send: "sucessfull"});
    },

    async update(request, response) {
        const { id }  = request.params;

        const verify_classroom = await connection("classroom").where("id", id).select('name').first();

        if(!verify_classroom)
            return response.status(404).json({message: "No instituitions here!"});

        const { name } = request.body;
        const instituition_id = id

        await connection("classroom").update({
            name,
            instituition_id
        }).where("id", id);

        return response.status(200).json({send: "sucessfull"});
    },

    async delete(request, response) {
        const { id } = request.params;

        const verifyId = await connection("classroom").where("id", id).select("name").first();

        if(!verifyId)
            return response.status(401).json({message: "Classroom not found"});
        
        await connection("classroom").where("id", id).delete();

        return response.status(204).send();
        }
}