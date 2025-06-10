"use client";
import { Button } from "primereact/button";
import Image from "next/image";
import globe from "../../../../public/globe.svg";
import { navlinks } from "@/utils/navigation";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";
import "./NexaHeader.scss";

export default function NexaHeader() {
  const { data: user } = useUser();
  const pathname = usePathname();
  const client = useQueryClient();

  const menuRef = useRef<any>(null);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("http://localhost:6432/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    client.removeQueries({ queryKey: ["user"] });
    router.push("/");
  };

  const menuItems = [
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: handleLogout,
    },
  ];

  return (
    <header className="nexa-header">
      <div className="left-section">
        <Link className="link-class" href={"/"}>
          <Image src={globe} alt="Trimzales Logo" className="logo" />
          <span className="brand-name">Nexa Quanta</span>
        </Link>

        <nav className="nav-links">
          {navlinks.map((link) => (
            <a
              href={link.url}
              key={link.name}
              className={link.url === pathname ? "active" : ""}
            >
              <i className={link.icon}></i> {link.name}
            </a>
          ))}
        </nav>
      </div>

      <div className="right-section">
        <Menu model={menuItems} popup ref={menuRef} />


        <div
          className="profile desktop-only"
          onClick={(e) => menuRef.current.toggle(e)}
          style={{ cursor: "pointer" }}
        >
          <Avatar
            style={{
              backgroundColor: "#9c27b0",
              color: "#ffffff",
            }}
            shape="circle"
            size="large"
            label={user?.name?.charAt(0).toUpperCase() || "N"}
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-only">
          <Button
            icon="pi pi-ellipsis-v"
            rounded
            text
            severity="secondary"
            onClick={(e) => menuRef.current.toggle(e)}
          />
        </div>
      </div>
    </header>
  );
}
