import axios from 'axios';

export const signup = async (data) => {
    const config = {
        headers: {
            "content-type": "application/json"
        }
    }
    const res = await axios.post('http://localhost:5000/api/auth/signup',data,config);

    return res;
}

export const signin = async (data) => {
    const config = {
        headers: {
            "content-type": "application/json"
        }
    }
    const res = await axios.post('http://localhost:5000/api/auth/signin',data,config);

    return res;
}