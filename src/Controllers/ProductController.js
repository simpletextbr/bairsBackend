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
        
        const user_id = verify_user[0].id

        const { 
            title,
            description,
            price,
            type,
            category_id,
        } = request.body;

        
        const verify_category = await connection("category").where("id", category_id).first();

        if(!verify_category)
            return response.status(404).json({message: "Category does not exist"});

        const requestImages= request.files; 

        const product =  await connection("product").insert({
            title,
            description,
            price,
            type,
            category_id,
            user_id
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
        const user_id  = request.headers.authorization;

        const verify_user = await connection("user").where("id", user_id).select('situation').first();
        const verify_product = await connection('product').where("id", id).select("*").first();

        if(!verify_user)
            return response.status(401).json({message: "Unauthorized"});

        if(!verify_product)
            return response.status(404).json({message: "Product not found"});

        const { 
            title,
            description,
            price,
            type,
            category_id
        } = request.body;

        await connection("product").update({
            title,
            description,
            price,
            type,
            category_id,
        }).where("id", verify_product.id)

        return response.status(200).json({message: "sucessfull"})
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const verify_product = await connection("product").where("id", id).first();

        if(!verify_product)
            return response.status(404).json({message: "product not found"});

        if(user_id !== verify_product.user_id)
            return response.status(401).json({message: "Unauthorized"}); 
        
        await connection("product").where("id", id).delete();

        const product_id = id;
        
        const images = await connection("images").where("product_id", product_id).select("product_id");

        await images.map(async()=> {
            await connection('images').where("product_id", product_id).delete()
        })

        return response.status(204).send();
    }
}