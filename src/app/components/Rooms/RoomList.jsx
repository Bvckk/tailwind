import { useState, useEffect } from 'react';
import RoomService from '../../service/Room';
import RoomFormAdd from './RoomFormAdd';
import RoomFormUpdate from './RoomFormUpdate';
import Pagination from '../Pagination';

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5

  // hàm lấy roomId tiếp theo
    const getNextRoomId = () => {
        if (rooms.length === 0) return "p101";
        const roomNumbers = rooms
            .map(room => {
                // Chỉ xử lý các roomId có định dạng 'p' + số
                if (typeof room.roomId === 'string' && room.roomId.startsWith('p')) {
                    // Lấy phần số và chuyển sang integer, radix 10 để đảm bảo hệ thập phân
                    return parseInt(room.roomId.slice(1), 10);
                }
                return null;
            })
            .filter(id => id !== null && !isNaN(id)); // Lọc ra các giá trị không hợp lệ

        if (roomNumbers.length === 0) return "p101"; // Nếu không có id hợp lệ nào, bắt đầu từ p101

        const maxId = Math.max(...roomNumbers, 100); // Tìm id lớn nhất, bắt đầu so sánh từ 100
        return `p${maxId + 1}`; // Trả về id tiếp theo
    }

  useEffect(() => {
    getAllRooms();
  }, []);

  const getAllRooms = () => {
    RoomService.getAllRooms()
            .then((response) => {
                setRooms(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    // sửa lại hàm addRoom
    const addRoom = (roomData) => {
      const newRoom = {
        ...roomData,
        roomId: getNextRoomId(), // tự sinh ID
      };
    
      RoomService.addRoom(newRoom)
        .then((response) => {
          getAllRooms();
          setShowFormAdd(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // sửa lại hàm updateRoom
    const updateRoom = (id, roomData) => {
        RoomService.updateRoom(id, roomData)
            .then((response) => {
                getAllRooms();
                setShowFormUpdate(false);
                setSelectedRoom(null); // đóng form và clear phòng chọn
            })
            .catch((error) => {
                console.log(error);
            })
    }

  const deleteRoom = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      RoomService.deleteRoom(id)
        .then(() => getAllRooms())
        .catch(err => console.log(err));
    }
  };

  const filteredRooms = rooms.filter(room =>
    room.roomName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'all' || room.status === filterStatus)
  );

  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
    )
  const totalPages = Math.ceil(filteredRooms.length / pageSize)

  return (
    <>
      <div className="container mx-auto p-2">
        {/* Header */}
        <header className="border-b mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-3">Danh sách phòng</h2>
              <p className="text-gray-300 text-sm mb-3">Quản lý danh sách phòng họp</p>
            </div>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              onClick={() => setShowFormAdd(true)}
            >
              + Thêm phòng mới
            </button>
          </div>
        </header>

        {/* Tools */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm phòng..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border rounded-lg px-4 py-2 w-1/2"
          />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-black"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border rounded-lg shadow-sm border-separate overflow-hidden">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Room ID</th>
                <th className="px-4 py-2 border">Room Name</th>
                <th className="px-4 py-2 border">Capacity</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border text-center w-40">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRooms.length > 0 ? (
                paginatedRooms.map(room => (
                  <tr key={room.id} className="hover:bg-gray-800">
                    <td className="px-4 py-2 border">{room.roomId}</td>
                    <td className="px-4 py-2 border">{room.roomName}</td>
                    <td className="px-4 py-2 border">{room.capacity}</td>
                    <td className="px-4 py-2 border">{room.status}</td>
                    <td className="px-4 py-2 border text-center">
                        <div className="flex justify-center gap-2">
                            <button
                              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                              onClick={() => {
                                setSelectedRoom(room);
                                setShowFormUpdate(true);
                              }}
                            >
                              Sửa
                            </button>
                            <button
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                              onClick={() => deleteRoom(room.id)}
                            >
                              Xóa
                            </button>
                        </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Không có phòng nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination
              currentPage={currentPage}
              totalPage={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
          />
        </div>

        {/* Modal thêm phòng */}
        {showFormAdd && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
        <div className="bg-gray-800 p-2 rounded-lg shadow-lg w-3/6 relative z-60">
        <div className="flex justify-between border-b p-2 items-center mb-4">
        <h3 className="text-lg font-bold">Thêm phòng mới</h3>
        <button onClick={() => setShowFormAdd(false)}>&times;</button>
        </div>
        <RoomFormAdd onSave={addRoom} defaultRoomId={getNextRoomId()} />
        </div>
        </div>
        )}
        {/* Modal cập nhật phòng */}
        {showFormUpdate && selectedRoom && (
          <div className="fixed inset-0 bg-black/80  flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-3/6">
              <div className="flex justify-between items-center p-2 mb-4 border-b">
                <h3 className="text-lg font-bold">Cập nhật thông tin</h3>
                <button onClick={() => setShowFormUpdate(false)}>&times;</button>
              </div>
              <RoomFormUpdate
                room={selectedRoom}
                onUpdate={(data) => updateRoom(selectedRoom.id, data)}
                onCancel={() => setShowFormUpdate(false)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
