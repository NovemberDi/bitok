import pg from "pg"
import dotenv from"dotenv"
dotenv.config()
const Client = pg.Client;

const params = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
};


const database = {
    data: 'Data',
    bd:null,
    initDb: async ()=>{
        const client = new Client(params);
        try{
        console.log('Попытка подключения..')
        await  client.connect();
        await client.query(`CREATE TABLE IF NOT EXISTS rates (
            id serial primary key,
            data jsonb
          );`);
        console.log('Успех DB')
        return database.bd = client
    }
        catch(err) {
            console.log(err);
            database.bd = null;
            setTimeout(async()=>await database.initDb(),3000)
        }

    },
    insertDb: async (mes) => {
        console.log('Запись в бд попытка')             
        try{
            console.log('Запись в бд');
            await mes.forEach(async (item) => {
                let data = {};
                data.time = item.time;
                data.priceUsd = item.priceUsd;      
                await  database.bd.query(`insert into rates(data) values('${JSON.stringify(data)}')`)
            });          
        }catch(err){
                console.log(err)
            }
    },
    selectDb: async (start, stop) => {
            try{
            return await database.bd.query(`select data
            from rates
            WHERE data ->> 'time' > '${start}' and data ->> 'time' < '${stop}' ORDER BY data ->> 'time';`)
            } catch(err) {
                console.log(err)
                return 'Ошибка запроса к БД'
            }
        
        }
            
}

database.initDb();
export  { database };


