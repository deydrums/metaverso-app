const { connection } = require("../database/config");


const getEvents = async(req,res = response)=>{
    const sql = `SELECT * FROM events`;
    var eventos;
    const sql_participants = `
        SELECT u.*
        FROM users u
        INNER JOIN participants p ON p.user_id = u.id
        INNER JOIN events e ON p.event_id = e.id
        WHERE p.event_id = ? GROUP BY u.id;
    `;

    try {
        //Obtener todos los eventos registrados
        await connection.query(sql, async (err, events) => {
            if(err) {return res.status(401).json({ok:false, message: err.message})};
            events.map( async (event, index) => {
                events[index].participants =   ev(event)
            })
            ret(events)
        })

        const ev = async (event) =>{
            await connection.query(sql_participants,event.id,  (err, participants) => {
                if(err) {return res.status(401).json({ok:false, message: err.message})};
                return participants
            });
        }

        const ret = (events) =>{
            return res.status(200).json({ok:true, message: events});
        }




    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}

module.exports = {
    getEvents
};