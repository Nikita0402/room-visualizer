"use client";
import { createContext, useContext, useState } from "react";


export type RoomData = {
  img: string;
  name: string;
  meta?: string;
};


type RoomImageContextType = {
  rooms: RoomData[];
  setRooms: React.Dispatch<React.SetStateAction<RoomData[]>>;
  lastIndexSelected: number;
  setLastIndexSelected: React.Dispatch<React.SetStateAction<number>>;
};


const RoomImageContext = createContext<RoomImageContextType | undefined>(undefined);


export const RoomImageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [rooms, setRooms] = useState<RoomData[]>([{ img: "/bedroom1.jpg", name: "Living Room", meta: "Cozy and modern" }]);
  const [lastIndexSelected, setLastIndexSelected] = useState<number>(0);

  return (
    <RoomImageContext.Provider value={{ rooms, setRooms, lastIndexSelected, setLastIndexSelected }}>
      {children}
    </RoomImageContext.Provider>
  );
};


export const useRoomImageContext = () => {
  const context = useContext(RoomImageContext);
  if (!context) {
    throw new Error("useRoomImageContext must be used within a RoomImageProvider");
  }
  return context;
};
