const connection = require("../database/conection");

module.exports = {
    async index(request, response) {
        const { id }  = request.params;

        const product = await connection("product").where("id", id).select('*');

        if(!product[0])
            return response.status(404).json({message: "Product not found"});

        return response.status(200).json(product)
    },

    async show(request, response) {
        const id = request.headers.authorization;

        const verify_user = await connection('user').where("id", id).select("id", "username");

        if(!verify_user[0])
            return response.status(401).json({message: "Unauthorized"});

        const product = await connection("product").select('*');

        if(!product[0])
            return response.status(404).json({message: "No product here!"});

        return response.status(200).json(product)
    },

    async create(request, response){
        const id = request.headers.authorization;

        const verify_user = await connection('user').where("id", id).select("id", "username");

        if(!verify_user[0])
            return response.status(401).json({message: "Unauthorized"});

        const { 
            title,
            description,
            price,
            category_id
        } = request.body;

        
        const verify_category = await connection("category").where("id", category_id).first();

        if(!verify_category)
            return response.status(404).json({message: "Category does not exist"});

        const requestImages= request.files; 

        const product =  await connection("product").insert({
            title,
            description,
            price,
            category_id
        })
        const product_id = product;

        const images = await requestImages.map(image => {
            return {
                path: image.filename}
        })

        let path;

        await images.map(image => {
            async function Images() {
                path = image.path
                await connection('images').insert({
                    path,
                    product_id
                })
            }

            Images();
        })

        return response.status(200).json({message: "sucessfull"})
    },

    async update(request, response) {
        const { id } = request.params;

        const verify_user = await connection('user').where("id", id).select("id", "username");

        if(!verify_user[0])
            return response.status(401).json({message: "Unauthorized"});

        const { 
            title,
            description,
            price,
            category_id
        } = request.body;

        const verify_category = await connection("category").where("id", category_id).first();

        if(!verify_category)
            return response.status(404).json({message: "Category does not exist"});

        const requestImages= request.files; 

        const product =  await connection("product").update({
            title,
            description,
            price,
            category_id
        })
        const product_id = product;

        const images = await requestImages.map(image => {
            return {
                path: image.filename}
        })

        let path;

        await images.map(image => {
            async function Images() {
                path = image.path
                await connection('images').update({
                    path,
                    product_id
                })
            }

            Images();
        })

        return response.status(200).json({message: "sucessfull"})
    },

    async delete(request, response) {

        }
}