import axios from 'axios';

const fetchFromApi = async () => {
  return await axios.get('https://70c5b72c-65db-4a66-ba01-3e14763157e8.mock.pstmn.io/');
};

export default fetchFromApi;
