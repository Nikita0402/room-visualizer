"use client";

import { useRoomImageContext } from "./RoomImageContext";
import { motion, AnimatePresence } from "framer-motion"; 

export default function HomePage() {
  const { lastIndexSelected, setLastIndexSelected } = useRoomImageContext();
  const { rooms, setRooms } = useRoomImageContext();

  const getImgUrl = () => {
    return rooms[lastIndexSelected].img;
  };

  return (
    <AnimatePresence>
      {" "}
      
      <motion.div
        key="home" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        transition={{ duration: 0.5 }} 
        style={{ width: "100%", height: "100%" }} 
      >
        <div
          style={{
            backgroundImage: `url(${getImgUrl()})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            width: "100%",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
