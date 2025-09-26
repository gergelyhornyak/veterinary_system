import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function ExportPDF() {
    const router = useRouter();
    const { pid, uid, rid } = router.query;
    const [hospitalName, setHospitalName] = useState("Felsőgödi Kisállatrendelő");
    const [hospitalAddress, setHospitalAddress] = useState("2132, Göd, Bozóky Gyula tér 3");
    const [hospitalTelephone, setHospitalTelephone] = useState("21312412");
    const [hospitalMobile, setHospitalMobile] = useState("+3670312412");
    const [vetName, setVetName] = useState("Dr. Szamosi Judit");
    const [medChartDate, setMedChartDate] = useState(new Date().toISOString().substring(0, 10));
    const [anamnesis, setAnamnesis] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [therapy, setTherapy] = useState("");
    const [notes, setNotes] = useState("");

    const [owner, setOwner] = useState({});
    const [pet, setPet] = useState({});

    const [loading, setLoading] = useState(false);
    const [petRecord, setPetRecord] = useState({});
    const [petRecords, setPetRecords] = useState([]);
    const [petData, setPetData] = useState({});
    const [ownerData, setOwnerData] = useState({});

    useEffect(() => {
        setLoading(true);
        const getPetRecords = async (pid) => {
            const petRes = await axios.get(`${process.env.API_URL}/pet/${pid}/record`, { withCredentials: true });
            setPetRecords(petRes.data);
        }
        const getPetData = async (pid) => {
            const petRes = await axios.get(`${process.env.API_URL}/pet/${pid}/data`, { withCredentials: true });
            setPetData(petRes.data);
        }
        const getOwnerData = async (uid) => {
            const ownerRes = await axios.get(`${process.env.API_URL}/patient/${uid}/data`, { withCredentials: true });
            setOwnerData(ownerRes.data);
        }
        getPetData(pid);
        getPetRecords(pid);
        getOwnerData(uid);
        setLoading(false);
    }, [pid, uid, rid]);

    useEffect(() => {
        if (petRecords.length > 0) {
            // anamnesis
            const anamString = petRecords.map(record => {
                // Collect treatment notes
                const treatmentNotes = (record.treatment || [])
                    .map(t => t.notes)
                    .filter(Boolean);

                // Include the top-level note
                const allNotes = [...treatmentNotes, record.note, `\nsúlya: ${record.weight}`].filter(Boolean);

                // Join them for this record
                return allNotes.join(". ");
            })
                .filter(Boolean) // remove empty entries
                .join("\n");
            setAnamnesis(anamString);

            //therapy

            const therString = petRecords.map(record => {
                // Collect treatment notes
                const vaccines = (record.vaccination || [])
                    .map(t => t.value)
                    .filter(Boolean);

                // Join them for this record
                return vaccines.join("\n");;
            })
                .filter(Boolean) // remove empty entries
                .join("\n");
            setTherapy(therString);
        }
    }, [petRecords]);

    const downloadPDF = async () => {
        const element = document.getElementById("pdf-content");
        if (!element) return;

        // Capture component as canvas
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        // Create PDF
        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Add image, split across pages if needed
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Save PDF
        pdf.save("korlap.pdf");
    };

    if (loading) return <></>;

    /*
    <Link href={`/`}>
                <button>Főoldal</button>
            </Link>
            <button onClick={downloadPDF} >
                    Nyomtatás
            </button>
    */

    return (
        <div>
            <div style={{ "padding": "1px" }}>
                <div id="pdf-content">
                    <h1>{hospitalName}</h1>
                    <h2>Hétfő - Péntek: 16:00 - 19:00</h2>

                    <div className="row">
                        <div className="columnl">
                            {hospitalAddress}
                        </div>
                        <div className="columnr">
                            {hospitalTelephone} | {hospitalMobile}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="columnl">
                            Nyomtatási adatok: {hospitalName}, {vetName}
                        </div>
                        <div className="columnr">
                            Dátum: {medChartDate}
                        </div>
                    </div>
                    <hr />
                    <h2 style={{ "text-align": "center", "margin": "12px" }}>KÓRLAP</h2>
                    <div className="row">
                        <div className="column">
                            <p><u>Tulajdonos adatai:</u></p>
                            <p>{ownerData?.lastname}&nbsp;
                                {Array.isArray(ownerData?.firstname)
                                    ? ownerData.firstname.join(" ")
                                    : ownerData?.firstname || ""}
                            </p>
                            <p>{ownerData?.address}</p>
                            <p>Tel.: {Array.isArray(ownerData?.mobile)
                                ? ownerData.mobile.join(", ")
                                : ownerData?.mobile || ""}
                            </p>
                            <p>Email: {Array.isArray(ownerData?.email)
                                ? ownerData.email.join(" ")
                                : ownerData?.email || ""} </p>
                        </div>
                        <div className="column" style={{ "padding-left": "10px", "border-left": "solid black 1px" }}>
                            <p><u>Állat adatai:</u></p>
                            <p>Név: {petData.name}</p>
                            <p>Faj: {petData.species}</p>
                            <p>Fajta: {Array.isArray(petData?.breed)
                                ? petData.breed.join(" ")
                                : petData?.breed || ""}
                            </p>
                            <p>Színe: {Array.isArray(petData?.colour)
                                ? petData.colour.join(" ")
                                : petData?.colour || ""}
                            </p>
                            <p>Születési d.: {petData.birthday}</p>
                            <p>Ivar: {petData.sex}</p>
                            <p>Útlevélszáma: PET-123123</p>
                            <p>Útlevél dátuma: tegnap</p>
                            <p>Mikrochip száma: {petData.chipid}</p>
                            <p>Tömege: {petData.weight} kg</p>
                        </div>
                    </div>
                    <hr style={{ "margin-bottom": "4px" }} />
                    <div className="row">
                        <div className="column">
                            <div>
                                <b style={{ "font-size": "20px" }}>[ Kórelőzmény ]</b> <br />
                                <textarea
                                    value={anamnesis}
                                    placeholder="anamnézis"
                                    onChange={(e) => setAnamnesis(e.target.value)}

                                    className="transparent-textarea"
                                    rows="9"
                                />
                            </div>
                            <div>
                                <b style={{ "font-size": "20px" }}>[ Tünetek ]</b> <br />
                                <textarea

                                    value={symptoms}
                                    placeholder="symptoma"
                                    onChange={(e) => setSymptoms(e.target.value)}

                                    className="transparent-textarea"
                                    rows="9"
                                />
                            </div>
                        </div>
                        <div className="column">
                            <div>
                                <b style={{ "font-size": "20px" }}>[ Kezelés ]</b> <br />
                                <textarea
                                    onChange={(e) => setTherapy(e.target.value)}
                                    value={therapy}
                                    placeholder="therapia"

                                    className="transparent-textarea"
                                    rows="9"
                                />
                            </div>
                            <div>
                                <b style={{ "font-size": "20px" }}>[ Megjegyzés, javaslat ]</b> <br />
                                <textarea
                                    value={notes}
                                    placeholder="notes"
                                    onChange={(e) => setNotes(e.target.value)}

                                    className="transparent-textarea"
                                    rows="9"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* Export button */}

        </div>
    );
}
