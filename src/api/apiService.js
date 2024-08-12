import axios from 'axios';

class ApiService {
  static async enviarGcId(gcId) {
    try {
      const response = await axios.post('http://mixdurasso.vps-kinghost.net:3000/players', { id_gc: gcId });
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar o Gamersclub ID:', error);
      throw error;
    }
  }
}

export default ApiService;