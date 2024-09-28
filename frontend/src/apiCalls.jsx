import axios from 'axios'


export const sendData = async (payload) => {

    try{
        console.log(payload);
        const response = await axios.post('/api/',payload);
        console.log(response);
        return response.data;
    }catch(e){
        return e;
    }
}