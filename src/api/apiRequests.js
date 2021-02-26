const SERVERURL = 'http://10.0.2.2:3333/api/1.0.0';

const get = async (route, header) => {
  return fetch(SERVERURL + route,
    {
      headers: header,
    })
    .then((response) => {
      const statusCode = response.status;
      let con;
      return response.json().then((json) => {
        con = json;
        return { code: statusCode, data: con };
      }).catch(() => {
        return { code: statusCode };
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const post = async (route, headers, body) => {
  return fetch(SERVERURL + route,
    {
      method: 'POST',
      headers: headers,
      body: body,
    })
    .then((response) => {
      const statusCode = response.status;
      let con;
      return response.json().then((json) => {
        con = json;
        return { code: statusCode, data: con };
      }).catch(() => {
        return { code: statusCode };
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const patch = async (route, headers, body) => {
  return fetch(SERVERURL + route,
    {
      method: 'PATCH',
      headers: headers,
      body: body,
    })
    .then((response) => {
      const statusCode = response.status;
      let con;
      return response.json().then((json) => {
        con = json;
        return { code: statusCode, data: con };
      }).catch(() => {
        return { code: statusCode };
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const remove = async (route, headers) => {
  return fetch(SERVERURL + route,
    {
      method: 'DELETE',
      headers: headers,
    })
    .then((response) => {
      const statusCode = response.status;
      let con;
      return response.json().then((json) => {
        con = json;
        return { code: statusCode, data: con };
      }).catch(() => {
        return { code: statusCode };
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getImage = async (route, header) => {
  return fetch(SERVERURL + route,
    {
      headers: header,
    })
    .then((response) => {
      const statusCode = response.status;
      let con;
      return response.blob().then((blob) => {
        con = blob;
        return { code: statusCode, data: con };
      }).catch(() => {
        return { code: statusCode };
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = {
  get: get,
  post: post,
  patch: patch,
  remove: remove,
  getImage: getImage,
};
