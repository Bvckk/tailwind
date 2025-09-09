import axios from 'axios';

// xác định API URL của phong Room
const API_URL_Room = 'http://localhost:3001/Room';

class RoomService {
    // lấy tất cả danh sách phòng
    getAllRooms() {
        return axios.get(API_URL_Room);
    }

    // thêm phòng mới
    addRoom(roomData) {
        return axios.post(API_URL_Room, roomData);
    }

    // lấy tông tin phòng theo ID
    getRoomID(id) {
        return axios.get(`${API_URL_Room}/${id}`);
    }

    // cập nhật thông tin phòng
    updateRoom(id, roomData) {
        return axios.put(`${API_URL_Room}/${id}`, roomData);
    }

    // xóa phòng theo ID
    deleteRoom(id) {
        return axios.delete(`${API_URL_Room}/${id}`)
    }

}
export default new RoomService();