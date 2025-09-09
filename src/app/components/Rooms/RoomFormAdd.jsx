import { useState } from 'react';

const RoomFormAdd = ({ onSave, defaultRoomId }) => {
    const [newRoom, setNewRoom] = useState({
        roomId: '',
        roomName: '',
        capacity: '',
        status: 'available'
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        // kiểm tra thông tin đầu vào
        if (!newRoom.roomName || !newRoom.capacity || Number(newRoom.capacity) <= 0) {
            alert("Vui lòng nhập đầy đủ thông tin và sức chứa hợp lệ");
            return;
        }

        // set roomId từ defaultRoomId
        const roomToSave = { ...newRoom, roomId: defaultRoomId };

        onSave(roomToSave);
        alert("Thêm phòng thành công");

        setNewRoom({
            roomId: '',
            roomName: '',
            capacity: '',
            status: 'available'
        });
    };

    return (
        <div className="container bg-gray-800 items-center justify-center flex">
            <form onSubmit={handleSubmit} className="w-full justify-items-center">
                <div className="mb-3 mt-3 w-4/6">
                    <input type="text" className="w-full border-b h-8" value={defaultRoomId} readOnly />
                </div>
                <div className="mb-5 w-4/6">
                    <input
                        type="text"
                        className="form-control border-b w-full text-white h-8"
                        placeholder="Enter room name"
                        value={newRoom.roomName}
                        onChange={(e) => setNewRoom({ ...newRoom, roomName: e.target.value })}
                    />
                </div>
                <div className="mb-5 w-4/6">
                    <input
                        type="number"
                        className="form-control border-b w-full h-8 "
                        placeholder="Enter capacity"
                        value={newRoom.capacity}
                        onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                        min="1"
                    />
                </div>
                <div className="mb-5 w-4/6">
                    <select
                        className="form-control bg-gray-800 border h-8"
                        value={newRoom.status}
                        onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })}
                    >
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                </div>
                <div>
                <button type="submit" className="btn btn-primary mb-3">Save Room</button>
                </div>
            </form>
        </div>
    );
};

export default RoomFormAdd;