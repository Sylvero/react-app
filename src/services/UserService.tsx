import axios from 'axios'

const USERS_REST_API_URL = 'http://localhost:8080/getData?id=';

class UserService {

    getUsers(id: number){
        return axios.get(USERS_REST_API_URL+id);
    }
}

export default new UserService();