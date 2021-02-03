import axios from 'axios';

export const createCategory = async (formData) => {
    const config = {
        headers: {
            "content-type": "application/json"
        }
    }
    const res = await axios.post('http://localhost:5000/api/category',formData,config);

    return res;

}