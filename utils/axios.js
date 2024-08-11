import axiosLib from 'axios'
const axios = axiosLib.create({
    baseURL: "http://41.89.163.139/classpass/api",
    headers: {
        Accept : "application/json"
    }
})
export default axios