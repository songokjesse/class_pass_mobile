import axios from "../utils/axios";

export async function attendance(attendance){
    const {data} = await  axios.post("/attendance", attendance);
    return data;
}