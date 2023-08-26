import axios from 'axios'
import User from '~/types/users/User';
axios.defaults.baseURL = 'http://localhost:3001/api';

class UserDataService {

  endpoint: string = '/users'

  getAll(): Promise<any> {
    return axios.get(`${this.endpoint}?limit=100`)
  }

  get(id: string): Promise<any> {
    return axios.get(`${this.endpoint}/${id}`)
  }

  create(data: User): Promise<any> {
    return axios.post(this.endpoint, data)
  }

  update(id: string, data: User): Promise<any> {
    return axios.patch(`${this.endpoint}/${id}`, data)
  }

  delete(id: string): Promise<any> {
    return axios.delete(`${this.endpoint}/${id}`)
  }
}

export default new UserDataService()
