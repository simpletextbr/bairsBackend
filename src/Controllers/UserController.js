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
            "cpf",
            "period",
            "study_shift",
            "rate",
            "registration_path",
            "profile_path",
            "instituition_id",
            "classroom_id"
            );

        if(!user[0])
            return response.status(404).json({message: "User not found"});

        return response.status(200).json(user)
    },

    async show(request, response) {
        const id = request.headers.authorization;

        const verify_user = await connection('user').where("id", id).select("id", "username", "situation");

        if(!verify_user[0])
            return response.status(401).json({message: "Unauthorized"});
        
        if(verify_user.situation==="Unauthorized")
            return response.status(401).json({message: "Unauthorized"});
        
        if(verify_user.situation==="Analyzing")
            return response.status(401).json({message: "wait to finish to analyze your registration" });

        const user = await connection("user").select(
            "id",
            "full_name",
            "username",
            "birth",
            "phone",
            "mail",
            "situation",
            "genre",
            "cpf",
            "period",
            "study_shift",
            "rate",
            "registration_path",
            "profile_path",
            "instituition_id",
            "classroom_id"
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
            classroom_id,
            cpf
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
                classroom_id,
                cpf
            })

            return response.status(200).json({send: "sucessfull"});
        } else if(verify_mail){
            return response.status(401).json({message: "this email already has an active account"})
        }else
            return response.status(401).json({message: "this phone already has an active account"})
               
    },

    async update(request, response) {
        const { id } = request.params;

        const verify_user = await connection("user").where("id", id).select("*").first();

        if(!verify_user)
            return response.status(404).json({message: "User not found"});
        
        const {
            username,
            phone,
            mail,
            genre,
            period,
            study_shift,
            classroom_id,
            instituition_id
        } = request.body;

        let { password } = request.body;
        let setOlderPass = verify_user.password;
        let setOlderinstituition_id = verify_user.instituition_id;

        const compare = bcrypt.compareSync(password, setOlderPass);
    
        if(compare === false)
            return response.status(401).json({message: "your password is wrong, please try again!"});

        if(setOlderinstituition_id === instituition_id){
        await connection("user").update({
            username,
            phone,
            mail,
            genre,
            period,
            study_shift,
            classroom_id,
            instituition_id
            }).where({ id })

        return response.status(200).json({send: "sucessfull"});
        }else{
            const situation = "Unauthorized";

            await connection("user").update({
                username,
                phone,
                mail,
                genre,
                period,
                situation,
                study_shift,
                classroom_id,
                instituition_id
                }).where({ id })
    
        return response.status(200).json({send: "sucessfull"});
        }
    }, 

    async delete(request, response) {
        const { id } = request.params;

        const verifyId = await connection("user").where("id", id).first();

        if(!verifyId)
            return response.status(404).json({message: "User not found"});
        
        await connection("user").where("id", id).delete();

        return response.status(204).send();
        }
    
}