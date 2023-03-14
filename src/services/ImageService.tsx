import axios from 'axios'

const USERS_REST_API_URL = 'http://localhost:8080/getImage?id=';

class ImageService {

    getImages(id: number){
        return axios.get(USERS_REST_API_URL+id);
    }
}

export default new ImageService();