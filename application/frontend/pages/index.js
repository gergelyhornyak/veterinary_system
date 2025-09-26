import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";


export default function Home() {

  const router = useRouter();

  return (
    <div>
      <main>
        <h1>Felsőgödi Kisállatrendelő Praxis-Menedzsment Alkalmazás</h1>
        <div className="menu-button-container">
        <div>
          <Link href={`/database`}><p className="menu-button">Nyilvántartás</p></Link>
        </div>
        <div>
          <Link href={`/admission`}><p className="menu-button">Felvétel</p></Link>
        </div>
        <div>
          <Link href={`/treatment`}><p className="menu-button">Kezelés</p></Link>
        </div>
        <div>
          <Link href={`/drugs`}><p className="menu-button">Gyógyszer keresés</p></Link>
        </div>
        <div>
          <Link href={`/diseases`}><p className="menu-button">Betegség keresés</p></Link>
        </div>
        </div>

        <p className="footer">&copy; 2025 FKPMA. All rights reserved.</p>
      </main>
    </div>
  );
}

