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
                    delete user.password;
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

const getInfo = async(req,res = response)=>{
    const sql_events = `SELECT * FROM events WHERE user_id = 1 ORDER BY created_at DESC`;
    const sql_users = `SELECT * FROM users`;
    try {
        //Obtener todos los usuarios registrados
        await connection.query(sql_events, async (err, events) => {
            if(err) {return res.status(401).json({ok:false, message: err.message})};
            await connection.query(sql_users, async (err, users) => {
                if(err) {return res.status(401).json({ok:false, message: err.message})};
                return res.status(200).json({ok:true, data: {users, events}})
            });
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}


module.exports = {
    getUsers,
    getInfo
};