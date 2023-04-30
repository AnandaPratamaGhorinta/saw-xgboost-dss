import axios from 'axios'
import { endpoints } from './endpoints/endpoints'

class Service {
     getUserData = async () =>{
        const result = await axios.get(endpoints.users)
        return result.data
     }
}

export default new Service();