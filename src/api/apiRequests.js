const SERVERURL = 'http://10.0.2.2:3333/api/1.0.0';

const get = async(route,header) =>
{
    return fetch(SERVERURL + route,
            {
                headers: header,
            })
            .then((response) => response.json())
            .catch((error) =>{
            console.log(error.message);
            });
}

const post = async(route,headers,body) =>
{
    return fetch(SERVERURL+route,
        {
          method: 'POST',
          headers: headers,
          body: body,
        })
        .then((response) => response.json())
        .catch((error) => 
        {
          console.log(error.message);
        });
}

module.exports =
{
    get: get,
    post: post,
};