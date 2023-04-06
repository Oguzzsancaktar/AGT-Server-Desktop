import axios from './axiosInstance';

export const opcClientConnect = async () => {
  const result = await axios.post('/OpcClient/connect', {
    "opcUrl": "opc.tcp://127.0.0.1:49320",
    "userName": "administrator",
    "password": "e3c576z4jfvr3q"
  })
};

export const getOpcClientObjects = async () => {
  const result = await axios.get('/OpcClient/objects')
  return result;
};

export const getOpcClientObjecthildrens = async (id: string) => {
  const result = await axios.get('/OpcClient/objects/' + id + "/children")
  return result;
};
