
const ValidateForm = {

 
    validate(type, value)
    {
        let expression = ''
        switch (type)
        {
            case 'email':
                expression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return expression.test(value);
            default:
                return false;
        }    

    }
}


export default ValidateForm;