import axios from 'axios';

// xác định API URL của phong Room
const API_URL_Booking = 'http://localhost:3001/Booking';

class BookingService {
    // lấy tất cả danh sách phòng
    getAllBookings() {
        return axios.get(API_URL_Booking);
    }

    // thêm phòng mới
    addBooking(bookingData) {
        return axios.post(API_URL_Booking, bookingData);
    }

    // lấy tông tin phòng theo ID
    getBookingID(id) {
        return axios.get(`${API_URL_Booking}/${id}`);
    }

    // cập nhật thông tin phòng
    updateBooking(id, bookingData) {
        return axios.put(`${API_URL_Booking}/${id}`, bookingData);
    }

    // xóa phòng theo ID
    deleteBooking(id) {
        return axios.delete(`${API_URL_Booking}/${id}`)
    }

}
export default new BookingService();