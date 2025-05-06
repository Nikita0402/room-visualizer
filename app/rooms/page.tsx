"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRoomImageContext } from "../RoomImageContext";
import {
  Plus,
  Share,
  Heart,
  Copy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AddRoomForm from "../component/AddRoomForm";

const ModernActionButton = ({
  children,
  onClick,
  ariaLabel,
  customStyle,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  customStyle?: React.CSSProperties;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        backgroundColor: "transparent",
        color: "#fff",
        border: "none",
        borderRadius: "0.75rem",
        width: "48px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        zIndex: 10,
        padding: 0,
        position: "relative",
        overflow: "hidden",
        ...customStyle,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              zIndex: 0,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </motion.button>
  );
};

export default function RoomsPage() {
  const { rooms, setRooms } = useRoomImageContext();
  const { lastIndexSelected, setLastIndexSelected } = useRoomImageContext();
  const [currentIndex, setCurrentIndex] = useState(lastIndexSelected);
  const [showForm, setShowForm] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    startX.current = clientX;
    scrollLeft.current = containerRef.current?.scrollLeft || 0;
    if (animationTimeout.current) {
      clearTimeout(animationTimeout.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const walk = clientX - startX.current;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = false;
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const currentScrollLeft = containerRef.current.scrollLeft;
    const targetIndex = Math.round(currentScrollLeft / containerWidth);
    const clampedIndex = Math.max(0, Math.min(rooms.length - 1, targetIndex));

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const movedDistance = Math.abs(clientX - startX.current);

    if (movedDistance > 10) {
      scrollToIndex(clampedIndex);
    } else {
      scrollToIndex(currentIndex);
    }
  };

  const scrollToIndex = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;
      const containerWidth = container.offsetWidth;
      const clampedIndex = Math.max(0, Math.min(rooms.length - 1, index));
      const scrollLeft = clampedIndex * containerWidth;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });

      setCurrentIndex(clampedIndex);
      setLastIndexSelected(clampedIndex);
    },
    [containerRef, rooms.length]
  );

  useEffect(() => {
    if (rooms.length > 0) {
      scrollToIndex(lastIndexSelected);
    }
  }, [rooms.length, lastIndexSelected, scrollToIndex]);

  const handleAddRoom = (newRoom: any) => {
    const newRooms = [...rooms, newRoom];
    setRooms(newRooms);
    scrollToIndex(newRooms.length - 1);
    setCurrentIndex(newRooms.length - 1);
    setLastIndexSelected(newRooms.length - 1);
    setShowForm(false);
  };

  const handleDuplicate = () => {
    if (rooms[currentIndex]) {
      const newRooms = [...rooms, rooms[currentIndex]];
      setRooms(newRooms);
      scrollToIndex(newRooms.length - 1);
      setCurrentIndex(newRooms.length - 1);
      setLastIndexSelected(newRooms.length - 1);
    }
  };

  const handleShare = () => {
    scrollToIndex(currentIndex);
  };

  const handleFavorite = () => {
    scrollToIndex(currentIndex);
  };

  const handleNext = () => {
    scrollToIndex(Math.min(currentIndex + 1, rooms.length - 1));
  };

  const handlePrevious = () => {
    scrollToIndex(Math.max(currentIndex - 1, 0));
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="rooms"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.75 }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            width: "100vw",
            height: "100vh",
            background: "linear-gradient(180deg, #464C51 0%, #505860 100%)",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            ref={containerRef}
            style={{
              position: "relative",
              display: "flex",
              width: "90%",
              maxWidth: "900px",
              height: "70%",
              maxHeight: "700px",
              overflow: "hidden",
              cursor: "grab",
              touchAction: "pan-y",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              marginBottom: "20px",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          >
            {rooms.map((roomData, i) => (
              <motion.div
                key={i}
                style={{
                  flex: "0 0 100%",
                  height: "100%",
                  backgroundImage: `url(${roomData.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "16px",
                  transition: "transform 0.3s ease, filter 0.3s ease",
                  transform: `scale(${i === currentIndex ? 1.04 : 0.95})`,
                  filter: `blur(${i === currentIndex ? 0 : 4}px)`,
                  opacity: i === currentIndex ? 1 : 0.7,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.3 },
                  filter: `blur(${i === currentIndex ? 0 : 4}px)`,
                }}
              />
            ))}
          </div>
          {/* Previous Button */}
          <ModernActionButton
            onClick={handlePrevious}
            ariaLabel="Previous"
            customStyle={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "50%",
              padding: "0.5rem",
              zIndex: 20,
            }}
          >
            <ChevronLeft size={30} strokeWidth={2} />
          </ModernActionButton>

          {/* Next Button */}
          <ModernActionButton
            onClick={handleNext}
            ariaLabel="Next"
            customStyle={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "50%",
              padding: "0.5rem",
              zIndex: 20,
            }}
          >
            <ChevronRight size={30} strokeWidth={2} />
          </ModernActionButton>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "90%",
              maxWidth: "900px",
            }}
          >
            <div
              style={{
                color: "#fff",
                zIndex: 10,
                padding: "8px 12px",
                borderRadius: "8px",
              }}
            >
              <div>{rooms[currentIndex]?.name}</div>
              <div>{rooms[currentIndex]?.meta}</div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <ModernActionButton onClick={handleShare} ariaLabel="Share">
                <Share size={24} />
              </ModernActionButton>
              <ModernActionButton onClick={handleFavorite} ariaLabel="Favorite">
                <Heart size={24} />
              </ModernActionButton>
              <ModernActionButton
                onClick={handleDuplicate}
                ariaLabel="Duplicate"
              >
                <Copy size={24} />
              </ModernActionButton>

              <ModernActionButton
                onClick={() => setShowForm(true)}
                ariaLabel="Add Room"
              >
                <Plus size={24} />
              </ModernActionButton>
            </div>
          </div>

          {showForm && (
            <AddRoomForm
              onClose={() => setShowForm(false)}
              onAddRoom={handleAddRoom}
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
