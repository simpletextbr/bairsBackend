const connection = require("../database/conection");
const bcrypt = require('bcryptjs');

module.exports = {
    async index(request, response) {
        const { id }  = request.params;

        const user = await connection("user").where("id", id).select(
            "id",
            "full_name",
            "username",
            "birth",
            "phone",
            "mail",
            "situation",
            "genre",
            "period",
            "study_shift",
            "rate",
            );

        if(!user[0])
            return response.status(404).json({message: "User not found"});

        return response.status(200).json(user)
    },

    async show(request, response) {
        const id = request.headers.authorization;

        const verify_user = await connection('user').where("id", id).select("id", "username");

        if(!verify_user[0])
            return response.status(401).json({message: "Unauthorized"});

        const user = await connection("user").select(
            "id",
            "full_name",
            "username",
            "birth",
            "phone",
            "mail",
            "situation",
            "genre",
            "period",
            "study_shift",
            "rate",
            );

        if(!user[0])
            return response.status(404).json({message: "No user here!"});

        return response.status(200).json(user)
    },

    async create(request, response) {
        const {
            full_name,
            username,
            birth,
            phone,
            mail,
            genre,
            period,
            study_shift,
            instituition_id,
            classroom_id
        } = request.body;

        const  situation  = "Unauthorized";
        const  rate  = 0;
        let { password } = request.body;

        const salt = bcrypt.genSaltSync(16);
        const hash = bcrypt.hashSync(password, salt);
        
        password = hash

        const { filename } = request.file;
        const profile_path = filename;

        const verify_phone = await connection("user").where("phone", phone).select("phone").first();
        const verify_mail = await connection("user").where("mail", mail).select("mail").first();

        if(!verify_mail && !verify_phone){
           await connection("user").insert({
                full_name,
                username,
                birth,
                phone,
                mail,
                situation,
                genre,
                period,
                study_shift,
                rate,
                profile_path,
                password,
                instituition_id,
                classroom_id
            })

            return response.status(200).json({send: "sucessfull"});
        } else if(verify_mail){
            return response.status(401).json({message: "this email already has an active account"})
        }else
            return response.status(401).json({message: "this phone already has an active account"})
               
    },

    
}