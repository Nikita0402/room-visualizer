"use client";

import { useRoomImageContext } from "./RoomImageContext";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence from Framer Motion

export default function HomePage() {
  const { lastIndexSelected, setLastIndexSelected } = useRoomImageContext();
  const { rooms, setRooms } = useRoomImageContext();

  const getImgUrl = () => {
    return rooms[lastIndexSelected].img;
  };

  return (
    <AnimatePresence>
      {" "}
      {/* No exitBeforeEnter prop needed */}
      <motion.div
        key="home" // Use key to uniquely identify the component for transitions
        initial={{ opacity: 0 }} // Start with opacity 0 (invisible)
        animate={{ opacity: 1 }} // Fade to full opacity (visible)
        exit={{ opacity: 0 }} // Fade out when navigating away
        transition={{ duration: 0.5 }} // Set transition duration for fade
        style={{ width: "100%", height: "100%" }} // Ensure full size
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
