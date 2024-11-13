import axios from 'axios';

class ApiService {
  static async enviarGcId(id) {
    try {
      const response = await axios.post('http://mixdurasso.com:3000/api/player', { id: id });
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar o Gamersclub ID:', error);
      throw error;
    }
  }
}

export default ApiService;