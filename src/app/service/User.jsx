import axios from 'axios';

// xác định API URL của phong Room
const API_URL_User = 'http://localhost:3001/User';

class UserService {
    // lấy tất cả danh sách phòng
    getAllUsers() {
        return axios.get(API_URL_User);
    }

    // thêm phòng mới
    addUser(roomData) {
        return axios.post(API_URL_User, userData);
    }

    // lấy tông tin phòng theo ID
    getUserID(id) {
        return axios.get(`${API_URL_User}/${id}`);
    }

    // cập nhật thông tin phòng
    updateUser(id, userData) {
        return axios.put(`${API_URL_User}/${id}`, userData);
    }

    // xóa phòng theo ID
    deleteUser(id) {
        return axios.delete(`${API_URL_User}/${id}`)
    }

}
export default new UserService();