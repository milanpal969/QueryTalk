const mysql = require('mysql2');
const generate = require('./geminiTest');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee'
}).promise();

async function querySolver(sqlText) {
    try {
        console.log('from db', sqlText);
    const parse= async (sqlText) => {
    console.log("sql text= ",sqlText);
    let commands=[];
    let temp=[];
    let inString=false;
    for(let i=0; i<sqlText.length; i++)
    {
            
        if(sqlText.charCodeAt(i)>=60 && sqlText.charCodeAt(i)<=90)inString=true;
        if(inString)
        {
            temp.push(sqlText[i]);
        }

        if(sqlText[i]==';') 
        {
            inString=false;
            let tempStr=temp.join('');
            //console.log(tempStr);
            commands.push(tempStr);
            temp.length=0;
        }
    }
    console.log("here");
    console.log("commands",commands[0]);

    for(let i=0; i<commands.length; i++) 
    {
        let rows = await pool.query(commands[i]);  
        console.log(rows,"is rows");
    }
    
    //return rows;  

    //for(let i=0; i<commands.length; i++)console.log(commands[i]);
    }
    parse(sqlText);
    } catch (error) {
        console.error('Error executing query:', error);
        return error;  
    }

}

module.exports = querySolver;
