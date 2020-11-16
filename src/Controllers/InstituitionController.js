const connection = require("../database/conection");
const bcrypt = require('bcryptjs');

module.exports ={
    async index(request, response) {
        const { id }  = request.params;

        const instituition = await connection("instituition").where("id", id).select(
            "id",
            'name',
            'campus',
            'address',
            'neighborhood',
            'number',
            'CEP',
            'city',
            'uf',
            "mail",
            "phone"
            );

        if(!instituition[0])
            return response.status(404).json({message: "Instituition not found"});

        return response.status(200).json(instituition)
    },

    async show(request, response) {
        const instituition = await connection("instituition").select(
            "id",
            'name',
            'campus',
            'address',
            'neighborhood',
            'number',
            'CEP',
            'city',
            'uf',
            "mail",
            "phone"
            );

        if(!instituition[0])
            return response.status(404).json({message: "Not Instituition here!"});

        return response.status(200).json(instituition)
    },
    
    async create(request, response) {
        const {
            name,
            phone,
            mail,
            campus,
            address,
            neighborhood,
            number,
            CEP,
            city,
            uf,
        } = request.body;

        let { password } = request.body;

        const salt = bcrypt.genSaltSync(16);
        const hash = bcrypt.hashSync(password, salt);
        
        password = hash

        const verify_phone = await connection("instituition").where("phone", phone).select("phone").first();
        const verify_mail = await connection("instituition").where("mail", mail).select("mail").first();

        if(!verify_mail && !verify_phone){
           await connection("instituition").insert({
                name,
                phone,
                mail,
                campus,
                address,
                neighborhood,
                number,
                CEP,
                city,
                uf,
                password
            })

            return response.status(200).json({send: "sucessfull"});
        } else if(verify_mail){
            return response.status(401).json({message: "this email already has an active account"})
        }else
            return response.status(401).json({message: "this phone already has an active account"})
               
    },

    async update(request, response) {
        const { id } = request.params;

        const verify_instituition = await connection("instituition").where("id", id).select("*").first();

        if(!verify_instituition)
            return response.status(404).json({message: "Instituition not found"});
        
        const {
            name,
            phone,
            mail,
            campus,
            address,
            neighborhood,
            number,
            CEP,
            city,
            uf,
        } = request.body;

        let { password } = request.body;
        let setOlderPass = verify_instituition.password;

        const compare = bcrypt.compareSync(password, setOlderPass);
    
        if(compare === false)
            return response.status(401).json({message: "your password is wrong, please try again!"});

        await connection("instituition").update({
                name,
                phone,
                mail,
                campus,
                address,
                neighborhood,
                number,
                CEP,
                city,
                uf,
            }).where({ id })

        return response.status(200).json({send: "sucessfull"});
    }, 
    
    async delete(request, response) {
        const { id } = request.params;

        const verifyId = await connection("instituition").where("id", id).first();

        if(!verifyId)
            return response.status(404).json({message: "Instituition not found"});
        
        await connection("instituition").where("id", id).delete();

        return response.status(204).send();
        }
    }
