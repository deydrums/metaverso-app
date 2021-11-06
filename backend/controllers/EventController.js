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


const getEvent = async(req,res = response)=>{

    const id = req.params['id']; 
    //const sql_event = `SELECT * FROM events WHERE id = ${id}`;
    const sql_event = `SELECT * FROM events WHERE id = ${id}`;

    const sql_participants = `
        SELECT u.*
        FROM users u
        INNER JOIN participants p ON p.user_id = u.id
        INNER JOIN events e ON p.event_id = e.id
        WHERE p.event_id = ${id} GROUP BY u.id;
    `;

    const sql_creator = `
        SELECT u.*
        FROM users u
        INNER JOIN events e ON e.user_id = u.id
        WHERE e.id = ${id} GROUP BY e.id;
    `;
    try {

        await connection.query(sql_event, [id , id],  async (err, event) => {
            if(err) {return res.status(401).json({ok:false, message: err.message})};
            if(event.length === 0){return res.status(404).json({ok:false, message:'Evento no encontrado'})}
            await connection.query(sql_participants,  async (err, participants) => {
                if(err) {return res.status(401).json({ok:false, message: err.message})};
                event[0].participants = participants;
                await connection.query(sql_creator,  async (err, user) => {
                    if(err) {return res.status(401).json({ok:false, message: err.message})};
                    event[0].user = user[0];
                    return res.status(200).json({ok:true, data: event[0]});
                });
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
    getEvents,
    getEvent
};