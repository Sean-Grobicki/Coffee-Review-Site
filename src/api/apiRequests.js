import Storage from './asyncStorage';

class API
{
    static async getLocationInfo(id)
    {
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/'+ id, 
            {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                        'X-Authorization': Storage.getToken(),
                    },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) =>{
            console.log(error);
            });
    }
}


export default API;