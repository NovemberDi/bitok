import {database} from "@/db/database.js"
import axios from 'axios'
export default defineEventHandler(async (event) => {
    let {interval, start, end} = getQuery(event);
    start = Number(start);
    end = Number(end);
    let api
    try {  
        
        let needDays = Math.round((end - start)/(24*3600*1000));
        let intervals = [];
        let intStart;
        let intEnd;
        for (let i = 0; i < needDays; i+=20){
            intStart = i === 0 ? start: intEnd;
            intEnd = ((intStart+24*3600*1000*20) > end)?end:(intStart+24*3600*1000*20);
            intervals.push({start: intStart, end: intEnd})
        }
        for(const item of intervals){
            console.log(intervals.length + '  d: '+ (item.end-item.start)/(24*3600*1000))
            let dbData = await database.selectDb(item.start,item.end);
            let partDays = Math.round((item.end - item.start)/(24*3600*1000));

            if (partDays > Math.round(dbData.rowCount/24)){
        
                api = await axios.get(`https://api.coincap.io/v2/assets/bitcoin/history?interval=h1&start=${item.start}&end=${item.end}`)
                    if (dbData.rowCount === 0){
                        await database.insertDb(api.data.data);
                        console.log('заполнен с нуля');
                        
                           
                    } else{
                              await database.insertDb(api.data.data.filter(async item => {
                        
                                await dbData.rows.find(row => {
                                   return (row.data.time == item.time)
                                } ) 

                                } ))
                        console.log('обновлен')
                    } 
                }else{
                    console.log('данные в наличии')
                }
        }
        
        ;
        
        let response = await database.selectDb(start,end); 
        
       return await response.rows.filter((item, index) => {
            if ((index % Number(interval))=== 0) return item
        })
    } catch(err){
        // console.log(err)
        return err
    }

  })    