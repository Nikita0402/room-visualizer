"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "../styles/Menu.module.css";
import {
  Check,
  FilmStrip,
  HouseSimple,
  ShareNetwork,
  SignOut,
} from "phosphor-react";

export default function Menu() {
  const pathname = usePathname();
  const router = useRouter();

  const isRoomsPage = pathname === "/rooms";

  return (
    <div
      className={styles.menuContainer}
      style={{
        justifyContent: isRoomsPage ? "center" : "flex-start",
      }}
    >
      {isRoomsPage ? (
        <button className={styles.menuButton} onClick={() => router.push("/")}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Check size={16} weight="bold" />
            <span style={{ fontWeight: 600 }}>DONE</span>
          </div>
        </button>
      ) : (
        <>
          <button className={styles.menuButton}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ transform: "rotate(180deg)" }}>
                <SignOut size={16} weight="bold" />
              </span>
              <span>EXIT</span>
            </div>
          </button>

          <button className={styles.menuButton}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <HouseSimple size={16} weight="bold" />
              <span>CHANGE ROOM</span>
            </div>
          </button>

          <button
            className={styles.menuButton}
            onClick={() => router.push("/rooms")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <FilmStrip size={16} />
              <span>ROOMS</span>
            </div>
          </button>

          <button className={styles.menuButton}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <ShareNetwork size={16} />
              <span>SHARE</span>
            </div>
          </button>
        </>
      )}
    </div>
  );
}
