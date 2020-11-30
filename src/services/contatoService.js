import Axios from "axios";

const apiUrl =  process.env.APP_URL + `/contato`;

class ContatoService {

    static save(params) {
        let api = apiUrl + `/save`
        return Axios.post(api, params);
    }

    static update(id, params)
    {
        let api = apiUrl + `/update/${id}`
        return Axios.put(api, params); 
    }

    static findById(id)
    {
        let api = apiUrl + `/findOne/${id}`
        return Axios.get(api); 
    } 

    static delete(id)
    {
        let api = apiUrl + `/delete/${id}`;
        return Axios.delete(api);
    } 
    
    static getData(params) {
        console.log(process.env);
        let api = process.env.APP_URL  + `/contato/list?page=${params.page}&size=${params.size}`;
        return Axios.get(api);
    }
}

export default ContatoService;