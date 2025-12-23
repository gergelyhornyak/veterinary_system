import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { apiUrl } from "../lib/api";
import Link from "next/link";


export default function Home() {

  const router = useRouter();

  return (
    <div>
      <main>
        <h1>Felsőgödi Kisállatrendelő Praxis Menedzsment</h1>
        <div className="menu-button-container">
          <div>
            <Link href={`/database`}><p className="menu-button">Nyilvántartás</p></Link>
          </div>
          <div>
            <Link href={`/treatment`}><p className="menu-button">Állat Kezelés</p></Link>
          </div>
          <div>
            <Link href={`/admission`}><p className="menu-button">Tulajdonos Felvétel</p></Link>
          </div>
          <div>
            <Link href={`/drugs`}><p className="menu-button">Gyógyszer Leltározás</p></Link>
          </div>
          <div>
            <Link href={`/profile-editor`}><p className="menu-button">Adatok Szerkesztése</p></Link>
          </div>
          <div>
            <Link href={`/picture`}><p className="menu-button"><s>Kép Készítés</s></p></Link>
          </div>
          <div>
            <Link href={`/export`}><p className="menu-button">Minden adat exportálása</p></Link>
          </div>
        </div>

        <p className="footer">&copy; 2025 Felsőgödi Kisállatrendelő. Minden jog fenntartva.</p>
      </main>
    </div>
  );
}

