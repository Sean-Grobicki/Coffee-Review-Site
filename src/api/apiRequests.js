import getToken from './asyncStorage';

const getLocationInfo = async(id) =>
{
    const token = await getToken();
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/'+ id, 
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                        'X-Authorization': token,
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


module.exports =
{
    getLocationInfo: getLocationInfo
};