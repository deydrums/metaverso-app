/********************************Update  de Usuarios ***********/

const { connection } = require("../database/config");

const getUsers = async(req,res = response)=>{
    const sql = `SELECT * FROM users`;
    try {
        //Obtener todos los usuarios registrados

        await connection.query(sql, async (err, result) => {
            if(err) {return res.status(401).json({ok:false, message: err.message})};
            if(result.length > 0){
                result.map(user => {
                    console.log(delete user.password);
                })
            }
            return res.status(200).json({ok:true, data: result})
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}

module.exports = {
    getUsers
};