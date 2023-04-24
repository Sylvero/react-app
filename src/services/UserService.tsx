import axios from 'axios'

const USERS_REST_API_URL = 'http://localhost:8080/';

class UserService {

    getUsers(id: number){
        return axios.get(USERS_REST_API_URL+'getData?id='+id);
    }

    getFirstId() : Promise<number>{
        return axios.get(USERS_REST_API_URL + 'getFirstId').then((response) => {
            return response.data.id
        })
    }

    deleteUser(id: number | void) {
        return axios.delete(USERS_REST_API_URL+'deleteUser?id='+id);
    }

    generateData() {
        return axios.get(USERS_REST_API_URL+'generateData');
    }
}

export default new UserService();