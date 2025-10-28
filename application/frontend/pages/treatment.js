import { useRouter } from "next/router";
import { useState, useEffect, DragEvent, ChangeEvent } from "react";
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

    const [treatmentNote, setTreatmentNote] = useState("");
    const [petTreatment, setPetTreatment] = useState({});
    const [petTreatmentDescr, setPetTreatmentDescr] = useState({});

    const [petRecord, setPetRecord] = useState([]);

    const [selectedDrug, setSelectedDrug] = useState([]);
    const [selectedVaccine, setSelectedVaccine] = useState([]);

    const [drugOptions, setDrugOptions] = useState([]);


    const [petFood, setPetFood] = useState([]);
    const [petMedicine, setPetMedicine] = useState([]);
    const [petAnalysis, setPetAnalysis] = useState([]);
    const [petHistory, setPetHistory] = useState([]);
    const [petSuggestion, setPetSuggestion] = useState([]);
    const [petSymptoms, setPetSymptoms] = useState([]);

    const [activeFilter, setActiveFilter] = useState('all');

    const [petPhoto, setPetPhoto] = useState(null);
    const [petPhotoPreview, setPetPhotoPreview] = useState(null);

    useEffect(() => {
        setLoading(true);
        if (pid) {
            setPetID(pid);
            const getPetRecord = async (pid) => {
                let petRecordData = [];
                const petRes = await axios.get(`${process.env.API_URL}/pet/${pid}/record`, { withCredentials: true });
                
                for (const record of petRes.data.recordIDs) {
                    const recordRes = await axios.get(`${process.env.API_URL}/record/${record}/data`, { withCredentials: true });
                    petRecordData.push(recordRes.data);
                }
                setPetRecord(petRecordData);
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
                const ownerRes = await axios.get(`${process.env.API_URL}/owner/${uid}/data`, { withCredentials: true });

                setOwnerData(ownerRes.data);
            }
            getOwnerData(uid);
        }
        setLoading(false);
    }, [pid, uid]);

    const saveTreatment = async () => {
        try {
            console.debug(petPhoto);
            let photoUrl = null;
            if (petPhoto) {
                const formData = new FormData();
                formData.append("file", petPhoto);
                const uploadRes = await axios.post(`${process.env.API_URL}/photo/upload`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
                );
                photoUrl = uploadRes.data.url;
            }
            let recordIDTemp;
            /*
                petHistory
                petSymptoms
                petAnalysis
                petTreatment
                petSuggestion
                treatmentNote
            */
            petTreatment = {
                history: petHistory,
                symptoms: petSymptoms,
                analysis: petAnalysis,
                treatment: petTreatmentDescr,
                suggestion: petSuggestion,
            }
            const recordRes = await axios.post(`${process.env.API_URL}/record/add`, {
                date: new Date().toISOString(),
                type: activeFilter,
                drug: selectedDrug,
                treatment: petTreatment,
                vaccination: selectedVaccine,
                receipt: petMedicine,
                note: treatmentNote,
                photo: photoUrl || ""
            }, { withCredentials: true });
            //const ownerUid = ownerRes.data.uid;
            recordIDTemp = recordRes.data.rid;
            console.debug("recordID: ", recordRes.data.rid);
            setRecordID(recordRes.data.rid);
            console.debug("record saved", recordRes.data.rid);
            const petRes = await axios.post(`${process.env.API_URL}/pet/${pid}/update/record`, {
                newRecordID: recordIDTemp} , { withCredentials: true });
            console.debug("pet and record: ", recordRes.data.rid, petRes.data.pid);
        } catch (err) {
            console.error(err);
        }
    };

    const submitTreatment = () => {
        saveTreatment();
        router.push(`/medical-record?rid=${encodeURIComponent(recordID)}&pid=${encodeURIComponent(pid)}&uid=${encodeURIComponent(uid)}`
        )
    };

    const formatDate = (dateString, form = "long") => {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        if (form == "short") {
            return `${year}. ${month}. ${day}.`;
        }
        return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
    };

    const translate = (type) => {
        if (type == "vaccination") {
            return "oltás";
        } else if (type == "treatment") {
            return "kezelés";
        } else if (type == "drug") {
            return "gyógyszerezés";
        } else if (type == "receipt") {
            return "recept";
        }
    };


    const filterRecords = (records) => {
        if (activeFilter === 'all') return records;
        return records.filter(record => record.type === activeFilter);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPetPhoto(file);
            setPetPhotoPreview(URL.createObjectURL(file));
        }
    };


    if (loading) return <></>;

    return (
        <div className="page">
            <main>
                <header className="header">
                    <Link href={`/`}><h2>Főoldal</h2></Link>
                    <h1 className="title">Beavatkozás</h1>
                </header>

                {petData ? (
                    <section className="pet-info" style={{ "width": "90%" }}>
                        <p>
                            <strong>Tulajdonos:</strong> {ownerData.fullname} <br />
                            <strong>Állat:</strong> {petData.name}, {petData.breed.join(" ")} {petData.species} - {petData.colour.join("-")}, {petData.sex}, {" "}
                            <span className={petData?.neutralised ? "neutralised" : "not-neutralised"}>
                                {petData?.neutralised ? "ivartalanított" : "ivaros"}
                            </span>
                            {" "}(szül.: {formatDate(petData.birthday, "short")})
                        </p>
                        <h3>Előző beavatkozások:</h3>
                        <div className="filter-buttons">
                            <button
                                className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('all')}>
                                Összes
                            </button>
                            <button
                                className={`filter-button ${activeFilter === 'vaccination' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('vaccination')}>
                                Oltások
                            </button>
                            <button
                                className={`filter-button ${activeFilter === 'drug' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('drug')}>
                                Gyógyszerezés
                            </button>
                            <button
                                className={`filter-button ${activeFilter === 'receipt' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('receipt')}>
                                Recept
                            </button>
                            <button
                                className={`filter-button ${activeFilter === 'treatment' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('treatment')}>
                                Kezelés
                            </button>
                        </div>
                        <ul className="record-list" style={{ "display": "flex", "flex-wrap": "wrap", "gap": "5px" }}>
                            {filterRecords(petRecord).map((r) => (
                                <li key={r.rid} className="record-card" style={{ "min-width": "45%" }}>
                                    <details>
                                        <summary>
                                            <strong>{formatDate(r.date)}</strong> <br />
                                            {translate(r.type)}
                                        </summary>
                                        <div className="record-extra">
                                            {r.type == "vaccination" && r.vaccination.length > 0 && (
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

                                            {r.type == "treatment" && r.treatment.length > 0 && (
                                                <div className="vaccination-list">
                                                    <strong>Kezelések:</strong>
                                                    <ul>
                                                        {r.treatment.map((v, idx) => (
                                                            <li key={idx} className="vaccination-item">
                                                                <p>{v.notes}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {r.type == "drug" && r.drug.length > 0 && (
                                                <div className="vaccination-list">
                                                    <strong>Gyógyszerezés:</strong>
                                                    <ul>
                                                        {r.drug.map((v, idx) => (
                                                            <li key={idx} className="vaccination-item">
                                                                <p>{v.value} ({v.note})</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {r.type == "receipt" && r.receipt.length > 0 && (
                                                <div className="vaccination-list">
                                                    <strong>Receptek:</strong>
                                                    <ul>
                                                        {r.receipt.map((v, idx) => (
                                                            <li key={idx} className="vaccination-item">
                                                                <p>{v.value}</p>
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
                    <form className="treatment-form"> {/*onSubmit={saveTreatment}*/}
                        {activeFilter == "treatment" &&
                            <>
                                <div className="form-group">
                                    <label>Kórelőzmény</label>
                                    <textarea
                                        value={petHistory}
                                        onChange={(e) => setPetHistory(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Tünetek</label>
                                    <textarea
                                        value={petSymptoms}
                                        onChange={(e) => setPetSymptoms(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Vizsgálat</label>
                                    <textarea
                                        value={petAnalysis}
                                        onChange={(e) => setPetAnalysis(e.target.value)}
                                    />
                                </div>

                                <div className="form-group"> 
                                    <label>Fénykép</label>
                                    <input type="file" accept="image/*" onChange={handlePhotoChange} />
                                    {petPhotoPreview && (
                                        <div style={{ marginTop: "10px" }}>
                                            <img src={petPhotoPreview} alt="Pet preview" style={{ width: "250px", borderRadius: "10px" }} />
                                        </div>
                                    )}
                                </div>
                                    

                                <div className="form-group">
                                    <label>Kezelés</label>
                                    <textarea
                                        value={petTreatmentDescr}
                                        onChange={(e) => setPetTreatmentDescr(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Javaslat</label>
                                    <textarea
                                        value={petSuggestion}
                                        onChange={(e) => setPetSuggestion(e.target.value)}
                                    />
                                </div>
                            </>
                        }
                        {activeFilter == "vaccination" &&
                            <>
                                <div className="form-group">
                                    <label>Oltások</label>
                                    <Select
                                        value={selectedVaccine}
                                        onChange={setSelectedVaccine}
                                        options={drugOptions}
                                        classNamePrefix="select"
                                        placeholder="Válasszon..."
                                        isMulti
                                    />
                                </div>
                            </>
                        }
                        <div className="form-group">
                            <label>Gyógyszerek</label>
                            <Select
                                value={selectedDrug}
                                onChange={setSelectedDrug}
                                options={drugOptions}
                                classNamePrefix="select"
                                placeholder="Válasszon..."
                                isMulti
                            />
                        </div>

                        <div className="selected-drugs-section">
                            <h3>Kiválasztott gyógyszerek:</h3>
                            {selectedDrug.map((drug, index) => (
                                <div key={index} className="selected-drug">
                                    <label>{drug.label}</label>
                                    <input
                                        style={{ "margin": "1%", "font-size": "20px" }}
                                        placeholder="javallat"
                                        onChange={(e) => {
                                            // Handle textarea change for each drug if needed
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                        {activeFilter == "receipt" &&
                            <>
                                <div className="form-group">
                                    <label>Gyógyszerek (külsős)</label>
                                    <textarea
                                        value={petMedicine}
                                        onChange={(e) => setPetMedicine(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Gyógytápok</label>
                                    <textarea
                                        value={petFood}
                                        onChange={(e) => setPetFood(e.target.value)}
                                    />
                                </div>
                            </>
                        }

                        <div className="form-group">
                            <label>Megjegyzés</label>
                            <textarea
                                value={treatmentNote}
                                onChange={(e) => setTreatmentNote(e.target.value)}
                            />
                        </div>

                        <div className="button-row">
                            <button className="button primary" onClick={() => submitTreatment()}>
                                Kórlap készítés (és beavatkozás mentése)
                            </button>
                            <button className="button secondary" onClick={() => saveTreatment()}>
                                Beavatkozás mentése és lezárása
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div >
    );
}