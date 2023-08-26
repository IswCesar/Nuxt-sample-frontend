import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001/api';

class UserDataService {

  endpoint: string = '/users'

  getAll(): Promise<any> {
    return axios.get(this.endpoint)
  }

  get(id: any): Promise<any> {
    return axios.get(`${this.endpoint}/${id}`)
  }

  create(data: any): Promise<any> {
    return axios.post(this.endpoint, data)
  }

  update(id: any, data: any): Promise<any> {
    return axios.put(`${this.endpoint}/${id}`, data)
  }

  delete(id: any): Promise<any> {
    return axios.delete(`${this.endpoint}/${id}`)
  }
}

export default new UserDataService()
