import axios from 'axios';

const BASE_URL = 'https://fiap-reactjs-presencial.herokuapp.com';

var instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//todo axios dar erro qdo diferente de 200

async function post<T, Z>(url: string, params: T): Promise<Z> {
  try {
    console.log('entrou em post');
    console.log(`${BASE_URL}${url}`);
    const response = await instance.post(url, params);
    console.log(response.data);

    return response.data as Z;
  } catch (error) {
    console.log('deu erro');
    console.log(error);
  }
  return undefined;
}

async function put<T>(url: string, params: T) {
  try {
    console.log('entrou em put');
    const response = await instance.put(url, params);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log('deu erro');
    console.log(error);
  }
  return undefined;
}

export {post, put};
