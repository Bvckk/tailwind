import { useState, useEffect } from 'react';

const RoomFormUpdate = ({ room, onUpdate, onCancel }) => {
  const [updatedRoom, setUpdatedRoom] = useState({
    roomId: '',
    roomName: '',
    capacity: '',
    status: ''
  });

  useEffect(() => {
    if (room) {
      setUpdatedRoom(room);
    }
  }, [room]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedRoom({ ...updatedRoom, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!updatedRoom.roomName.trim() || Number(updatedRoom.capacity) <= 0) {
      alert("Vui lòng nhập tên phòng và sức chứa hợp lệ");
      return;
    }

    try {
      // Giữ lại roomId cũ khi cập nhật
      await onUpdate({ ...updatedRoom, roomId: room.roomId });
      onCancel();
    } catch (error) {
      alert("Cập nhật phòng thất bại!");
    }
  
  };

  return (
    <form onSubmit={handleSubmit} className="update-form w-full justify-items-center">
      <div className="form-group mb-5 w-4/6">
        <input
          name="roomId"
          className="w-full border-b h-8"
          value={updatedRoom.roomId}
          readOnly
        />
      </div>
      <div className="form-group mb-5 w-4/6">
        <input
          type="text"
          name="roomName"
          placeholder="Enter Room Name"
          value={updatedRoom.roomName}
          onChange={handleChange}
          className="form-control w-full border-b h-8"
          required
        />
      </div>

      <div className="form-group mb-5 w-4/6">
        <input
          type="number"
          placeholder="Enter Capacity"
          name="capacity"
          value={updatedRoom.capacity}
          onChange={handleChange}
          className="form-control w-full border-b h-8"
          min="1"
          required
        />
      </div>

      <div className="form-group mb-5 w-4/6">
        <select
          name="status"
          value={updatedRoom.status}
          onChange={handleChange}
          className="form-control border"
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Cập nhật</button>
        <button type="button" className="btn btn-secondary ml-3" onClick={onCancel}>Hủy</button>
      </div> 
    </form>
  );
};
 
export default RoomFormUpdate;
