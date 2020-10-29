const connection = require("../database/conection");


module.exports ={
    async index(request, response) {
        const { id }  = request.params;

        const category = await connection("category").where("id", id).select('*');

        if(!category[0])
            return response.status(404).json({message: "Category not found"});

        return response.status(200).json(category)
    },

    async show(request, response) {
        const id = request.headers.authorization;

        const verify_user = await connection('user').where("id", id).select("id", "username");

        if(!verify_user[0])
            return response.status(401).json({message: "Unauthorized"});

        const category = await connection("category").select('*');

        if(!category[0])
            return response.status(404).json({message: "No category here!"});

        return response.status(200).json(category)
    },

    async create(request, response) {
        const id  = request.headers.authorization;

        const verify_user = await connection("user").where("id", id).select('situation').first();

        if(!verify_user)
            return response.status(401).json({message: "Unauthorized"});

        if(verify_user.situation==="Unauthorized")
            return response.status(401).json({message: "You cannot make categories without before submitting your registration" })
        
        if(verify_user.situation==="Analyzing")
            return response.status(401).json({message: "wait to finish to analyze your registration" })

        const { name } = request.body;

        await connection("category").insert({
            name,
        })

        return response.status(200).json({send: "sucessfull"});
    },

    async update(request, response) {
        const { id } = request.params;
        const userid  = request.headers.authorization;

        const verify_user = await connection("user").where("id", userid).select('situation').first();

        if(!verify_user)
            return response.status(401).json({message: "Unauthorized"});

        if(verify_user.situation==="Unauthorized")
            return response.status(401).json({message: "You cannot make categories without before submitting your registration" })
        
        if(verify_user.situation==="Analyzing")
            return response.status(401).json({message: "wait to finish to analyze your registration" })

        if(verify_user.situation==="Authorized")
            return response.status(401).json({message: "Only Admins can change the categories names" })
        
        
        const { name } = request.body;

        await connection("category").update({
            name,
        }).where({id})

        return response.status(200).json({send: "sucessfull"});
    },

    async delete(request, response) {
        const { id } = request.params;

        const verifyId = await connection("category").where("id", id).select("name").first();

        if(!verifyId)
            return response.status(404).json({message: "Category not found"});
        
        await connection("category").where("id", id).delete();

        return response.status(204).send();
        }
}