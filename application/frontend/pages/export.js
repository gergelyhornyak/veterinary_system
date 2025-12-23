import { useEffect, useRef, useState } from "react";

export default function ExportData() {
    const [loading, setLoading] = useState(false);

    // Clean up camera on unmount
    useEffect(() => {

    }, []);

    const handleExport = async () => {
        const response = await fetch(`${apiUrl()}/record/export`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Include if using auth
                // Authorization: `Bearer ${token}`,
            },
            credentials: "include", // if using cookies
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "export.csv";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div>
            <main>
                <h1>Adatok Exportálása</h1>
                <div style={{ justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p>Az összes adat exportálása CSV (Excel) fájlba.</p>
                    <button className="export-button" onClick={handleExport}>
                        Adatok letöltése
                    </button>
                    <p className="footer">&copy; 2025 Felsőgödi Kisállatrendelő. Minden jog fenntartva.</p>
                </div>
            </main>
        </div>
    );
}
