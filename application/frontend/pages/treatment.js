import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Select from 'react-select';

export default function TreatmentPage() {
    const router = useRouter();
    const { pid, uid } = router.query;
    const [loading, setLoading] = useState(true);

    const [ownerID, setOwnerID] = useState("");
    const [ownerData, setOwnerData] = useState({});
    const [petID, setPetID] = useState("");
    const [petData, setPetData] = useState(null);
    const [recordID, setRecordID] = useState("");

    const [petName, setPetName] = useState("");
    const [chipid, setChipid] = useState("");
    const [species, setSpecies] = useState("");
    const [breed, setBreed] = useState("");
    const [petSex, setPetSex] = useState("male");
    const [petNeutralised, setPetNeutralised] = useState("non-neutralised");
    const [petNeutraliseDate, setPetNeutraliseDate] = useState("");

    const [currentWeight, setCurrentWeight] = useState("");
    const [treatmentNote, setTreatmentNote] = useState("");

    const [petRecord, setPetRecord] = useState([]);

    const [treatmentPlan, setTreatmentPlan] = useState([]);

    const [selectedDrug, setSelectedDrug] = useState([]);
    const [drugOptions, setDrugOptions] = useState([]);

    const [therapyPlan, setTherapyPlan] = useState("");

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (pid) {
            setPetID(pid);
            const getPetRecord = async (pid) => {
                const petRes = await axios.get(`${process.env.API_URL}/pet/${pid}/record`, { withCredentials: true });
                setPetRecord(petRes.data);
            }
            const getPetData = async (pid) => {
                const petRes = await axios.get(`${process.env.API_URL}/pet/${pid}/data`, { withCredentials: true });

                setPetData(petRes.data);
            }
            const getDrugs = async () => {
                const drugRes = await axios.get(`${process.env.API_URL}/drug/all`, { withCredentials: true });
                setDrugOptions(drugRes.data);
            }
            getPetData(pid);
            getPetRecord(pid);
            getDrugs();
        }
        if (uid) {
            setOwnerID(uid);
            const getOwnerData = async (uid) => {
                const ownerRes = await axios.get(`${process.env.API_URL}/patient/${uid}/data`, { withCredentials: true });

                setOwnerData(ownerRes.data);
            }
            getOwnerData(uid);
        }
        setLoading(false);
    }, [pid, uid]);

    const saveTreatment = async () => {
        try {
            console.debug("selectedDrug",selectedDrug);
            const recordRes = await axios.post(`${process.env.API_URL}/record/add`, {
                pid: pid,
                vaccination: selectedDrug,
                treatment: treatmentPlan,
                weight: currentWeight,
                note: treatmentNote
            }, { withCredentials: true });
            //const ownerUid = ownerRes.data.uid;
            const recordID = recordRes.data.rid;
            console.debug("recordID",recordID);
            setRecordID(recordID);
            console.debug("record saved", recordRes);
        } catch (err) {
            console.error(err);
        }
    };

    const submitTreatment = () => {
        saveTreatment();
        router.push(`/medical-record?rid=${encodeURIComponent(recordID)}&pid=${encodeURIComponent(pid)}&uid=${encodeURIComponent(uid)}`
        )
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
    }
    const getDaysRemaining = (startDateString, duration) => {
        const startDate = new Date(startDateString);
        const today = new Date();

        // Calculate the end date
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + duration);

        // Calculate difference in milliseconds
        const diffMs = endDate - today;

        // Convert milliseconds to days
        const remainingDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        return remainingDays >= 0 ? remainingDays : 0; // return 0 if already passed
    }

    if (loading) return <></>;

    return (
        <div className="page">
            <main>
                <header className="header">
                    <Link href={`/`}>
                        <p className="home-link">← Főoldal</p>
                    </Link>
                    <h1>Állat kezelése</h1>
                </header>

                {petData ? (
                    <section className="pet-info">
                        <p>
                            <strong>Tulajdonos:</strong> {ownerData.lastname} <br />
                            <strong>Kiskedvenc:</strong> {petData.name}, {petData.breed} {petData.species}, {petData.colour}, {petData.sex},{" "}
                            <span className={petData?.neutralised ? "neutralised" : "not-neutralised"}>
                                {petData?.neutralised ? "ivartalanított" : "ivaros"}
                            </span>
                        </p>
                        <h3>Múltbéli kezelései:</h3>
                        <ul className="record-list">
                            {petRecord.map((r) => (
                                <li key={r.rid} className="record-card">
                                    <details>
                                        <summary>
                                        <strong>{formatDate(r.date)}</strong> <br />
                                        {r.note}
                                        </summary>
                                            <div className="record-extra">
                                                {r.vaccination && r.vaccination.length > 0 && (
                                                    <div className="vaccination-list">
                                                        <strong>Oltások:</strong>
                                                        <ul>
                                                            {r.vaccination.map((v, idx) => (
                                                                <li key={idx} className="vaccination-item">
                                                                    <p>{v.value}</p>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {r.treatment && r.treatment.length > 0 && (
                                                    <div className="vaccination-list">
                                                        <strong>Kezelések:</strong>
                                                        <ul>
                                                            {r.treatment.map((v, idx) => (
                                                                <li key={idx} className="vaccination-item">
                                                                    {v.notes && <p>Megjegyzés: {v.notes}</p>}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        
                                    </details>
                                </li>
                            ))}
                        </ul>
                    </section>
                ) : (
                    <section className="no-pet">
                        <Link href={`/database`}>
                            <p>Állat kiválasztása</p>
                        </Link>
                    </section>
                )}

                <hr className="divider" />

                <section className="form-section">
                    <form onSubmit={saveTreatment} className="treatment-form">
                        <div className="form-group">
                            <label>Kezelés terv</label>
                            <textarea
                                value={treatmentPlan}
                                onChange={(e) => setTreatmentPlan(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Oltások</label>
                            <Select
                                value={selectedDrug}
                                onChange={setSelectedDrug}
                                options={drugOptions}
                                classNamePrefix="select"
                                placeholder="Válasszon..."
                                isMulti
                            />
                        </div>

                        <div className="form-group">
                            <label>Jelenlegi súlya (kg)</label>
                            <input type="number"
                                value={currentWeight}
                                onChange={(e) => setCurrentWeight(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Kúra / Terápia</label>
                            <textarea
                                value={therapyPlan}
                                onChange={(e) => setTherapyPlan(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Megjegyzés</label>
                            <textarea
                                value={treatmentNote}
                                onChange={(e) => setTreatmentNote(e.target.value)}
                            />
                        </div>

                        <div className="button-row">
                            <button className="button primary" onClick={() => submitTreatment()}>
                                Kórlap készítés
                            </button>
                            <button className="button secondary" onClick={() => saveTreatment()}>
                                Kezelés lezárása
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}