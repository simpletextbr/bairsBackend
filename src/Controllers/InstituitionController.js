const connection = require("../database/conection");
const bcrypt = require('bcryptjs');


module.exports ={
    async index(request, response) {
        const { id }  = request.params;

        const instituition = await connection("instituition").where("id", id).select('*');

        if(!instituition[0])
            return response.status(404).json({message: "Instituition not found"});

        return response.status(200).json(instituition)
    },

    async show(request, response) {
        const id = request.headers.authorization;

        const verify_user = await connection('user').where("id", id).select("id", "username");

        if(!verify_user[0]){
            return response.status(404).json({message: "User not found"});
        }

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
            return response.status(404).json({message: "No instituitions here!"});

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

        const verify_phone = await connection("instituition").where("phone", phone).first();
        const verify_mail = await connection("instituition").where("mail", mail).first();

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
            return response.status(401).json({message: "Este email Já possui cadastro ativo"})
        }else
            return response.status(401).json({message: "Este telefone Já possui cadastro ativo"})
               
    },

    async update(request, response) {
        const { id } = request.params;

        const verify_instituition = await connection("instituition").where("id", id).select("*").first();

        if(!verify_instituition)
            return response.status(400).json({message: "Instituition not found"});
        
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

        let { newPassword, repeatNewPassword, olderPass } = request.body;
        let setOlderPass = verify_instituition.password;

        const compare = bcrypt.compareSync(olderPass, setOlderPass);

        if(compare === false)
            return response.status(401).json({message: "A sua senha antiga não esta certa, por favor digite novamente!"});

        if(newPassword!==repeatNewPassword)
            return response.status(401).json({message: "As suas novas senhas não coincidem, por favor digite novamente!"});


        const salt = bcrypt.genSaltSync(16);
        const hash = bcrypt.hashSync(newPassword, salt);

        newPassword = hash;
        let password = newPassword;

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
                password
            }).where({ id })

        return response.status(200).json({send: "sucessfull"});
    }, 
    
    async delete(request, response) {
        const { id } = request.params;

        const verifyId = await connection("instituition").where("id", id).first();

        if(!verifyId)
            return response.status(401).json({message: "Instituition not found"});
        
        await connection("instituition").where("id", id).delete();

        return response.status(204).send();
        }
    }
