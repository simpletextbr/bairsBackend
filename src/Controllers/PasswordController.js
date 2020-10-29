const connection = require('../database/conection');
const bcrypt = require('bcryptjs');

module.exports ={
    async update_pass_instituition(request, response){
        const { id } = request.params;

        const verify_instituition = await connection("instituition").where("id", id).select("password").first();

        if(!verify_instituition)
            return response.status(404).json({message: "Instituition not found"});

        const { newPassword, repeatNewPassword, olderPass } = request.body;
        const setOlderPass = verify_instituition.password;

        const compare = bcrypt.compareSync(olderPass, setOlderPass);

        if(compare === false)
            return response.status(401).json({message: "your old password is wrong, please try again!"});

        if(newPassword!==repeatNewPassword)
            return response.status(401).json({message: "your new passwords don't match, please try again!"});


        const salt = bcrypt.genSaltSync(16);
        const hash = bcrypt.hashSync(newPassword, salt);

        const password = hash;

        await connection("instituition").update({
            password
        }).where({id})

        return response.status(200).json({send: "sucessfull"});
    },

    async update_pass_user(request, response){
        const { id } = request.params;

        const verify_user = await connection("user").where("id", id).select("password").first();

        if(!verify_user)
            return response.status(404).json({message: "User not found"});

        const { newPassword, repeatNewPassword, olderPass } = request.body;
        const setOlderPass = verify_instituition.password;

        const compare = bcrypt.compareSync(olderPass, setOlderPass);

        if(compare === false)
            return response.status(401).json({message: "your old password is wrong, please try again!"});

        if(newPassword!==repeatNewPassword)
            return response.status(401).json({message: "your new passwords don't match, please try again!"});


        const salt = bcrypt.genSaltSync(16);
        const hash = bcrypt.hashSync(newPassword, salt);

        const password = hash;

        await connection("user").update({
            password
        }).where({id})

        return response.status(200).json({send: "sucessfull"});
    },


}