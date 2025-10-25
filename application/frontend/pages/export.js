import { useEffect, useRef, useState } from "react";

export default function ExportData() {
    const [loading, setLoading] = useState(false);

    // Clean up camera on unmount
    useEffect(() => {

    }, []);

    return (
        <div>
            <main>
                <h1>Adatok Exportálása</h1>
                <p>Az összes adat exportálása CSV (Excel) fájlba.</p>
                <a href={`${process.env.API_URL}/record/export`} download="export.csv">
                    <button className="export-button">Adatok letöltése</button>
                </a>
                <p className="footer">&copy; 2025 Felsőgödi Kisállatrendelő. Minden jog fenntartva.</p>
            </main>
        </div>
    );
}
