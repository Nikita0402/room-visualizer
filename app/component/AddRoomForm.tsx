"use client";

import { useState } from "react";

export default function AddRoomForm({
  onClose,
  onAddRoom,
}: {
  onClose: () => void;
  onAddRoom: (newRoom: any) => void;
}) {
  const [roomName, setRoomName] = useState("");
  const [roomMeta, setRoomMeta] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === "string") {
        const newRoom = {
          img: event.target.result,
          name: roomName,
          meta: roomMeta || undefined,
        };
        onAddRoom(newRoom);
        setRoomName("");
        setRoomMeta("");
        setImageFile(null);
      }
    };
    reader.readAsDataURL(imageFile);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#25292b",
          padding: "1.5rem",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
          width: "90%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          color: "white",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.5rem", textAlign: "center" }}>
          Add Room Image
        </h2>

        <label>
          Room Name
          <input
            type="text"
            required
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #475569",
              fontSize: "1rem",
              backgroundColor: "#334155",
              color: "#F9FAFB",
              marginTop: "0.5rem",
            }}
          />
        </label>

        <label>
          Room Meta (optional)
          <textarea
            value={roomMeta}
            onChange={(e) => setRoomMeta(e.target.value)}
            rows={2}
            cols={50}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #475569",
              fontSize: "1rem",
              backgroundColor: "#334155",
              color: "#F9FAFB",
              resize: "none",
              marginTop: "0.5rem",
            }}
          />
        </label>

        <label>
          Upload Image
          <div style={{ position: "relative", marginTop: "0.5rem" }}>
            <input
              type="file"
              accept="image/*"
              id="room-image-upload"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              style={{
                display: "none",
              }}
            />
            <label
              htmlFor="room-image-upload"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#4B5563",
                color: "#F9FAFB",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                width: "100%",
                fontSize: "1rem",
                fontWeight: "500",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#6B7280")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#4B5563")
              }
            >
              {imageFile ? "Change Image" : "Choose Image"}
            </label>
            {imageFile && (
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.9rem",
                  color: "#ccc",
                  textAlign: "center",
                }}
              >
                {imageFile.name}
              </p>
            )}
          </div>
        </label>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="menuButton"
            style={{
              backgroundColor: "#00000059",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#d1d4de")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#00000059")
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="menuButton"
            style={{
              backgroundColor: "#00000059",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#d1d4de")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#00000059")
            }
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
