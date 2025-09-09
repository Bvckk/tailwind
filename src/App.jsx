import { Routes, Route } from "react-router-dom";
import MainLayout from "./app/Mainlayout";
import HomePage from "@/Home/HomePage";
import RoomList from "@/Rooms/RoomList";
import BookingList from "@/Booking/BookingList";
import UserList from "@/User/UserList";
import './App.css'


export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </MainLayout>
  );
}