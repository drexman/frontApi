import Axios from "axios";
const apiUrl = `http://127.0.0.1:4000/contato`;

class ContatoService {

    static save(params) {
        let api = apiUrl + `/save`
        return Axios.post(api, params);
    }

    static update(params)
    {

    }
    
    static getData(params) {

        let api = apiUrl + `/list?page=${params.page}&size=${params.size}`;
        return Axios.get(api);
    }
}

export default ContatoService;