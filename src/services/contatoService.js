const apiUrl = `http://127.0.0.1:4000/contato`;

class ContatoService {
 

    static save()
    {
        let requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: {}
        }
        let api = apiUrl + `/save`;
        
        return new Promise((resolve, reject) => {
            fetch(api, requestOptions)
            .then(response => {
                const data = response.json();
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    static update()
    {

    }

    static delete()
    {

    }

    static getAll(params)
    {
        let requestOption ={
            headers: {'Content-Type': 'application/json'}
        }

        let api = apiUrl + `/list?page=${params.page}&size=${params.size}`;
        return new Promise((resolve, reject) => {
            fetch(api, requestOption).then(response => {
                const data = response.json();
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        });
    }
}

export default ContatoService;