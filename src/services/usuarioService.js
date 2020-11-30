import Axios from 'axios';

const apiUrl =  process.env.REACT_APP_URL + `/usuario`;

class UsuarioService {

    static save(params)
    {
        let api = apiUrl + `/save`
        return Axios.post(api, params);
    } 

    static update(id, params)
    {
        let api = apiUrl + `/update/${id}`
        return Axios.put(api, params); 
    }

    static auth(params)
    {   
        let api = apiUrl  + `/auth`;
        return Axios.post(api, params); 
    }
}

export default UsuarioService;