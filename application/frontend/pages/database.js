import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Database() {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [ownerSearchTerm, setOwnerSearchTerm] = useState("");
    const [petSearchTerm, setPetSearchTerm] = useState("");

    const [listOfPatients, setListOfPatients] = useState([]);
    const [listOfPets, setListOfPets] = useState([]);
    const [listOfPetsIDandName, setListOfPetsIDandName] = useState([]);

    const [selectedPetOwner, setSelectedPetOwner] = useState(null);
    const [selectedPet, setSelectedPet] = useState(null);
    const [petRecordIDs, setPetRecordIDs] = useState(null); // store fetched data
    const [petRecords, setPetRecords] = useState([]); // store fetched data
    const [petDataLoading, setPetDataLoading] = useState(false); // store fetched data

    const [showDebtModal, setShowDebtModal] = useState(false);
    const [processingDebt, setProcessingDebt] = useState(false);
    const [debtOwnerID, setDebtOwnerID] = useState(null);
    const [debtOwnerName, setDebtOwnerName] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            setLoading(true);
            try {
                const [patientRes, petRes] = await Promise.all([
                    axios.get(`${process.env.API_URL}/owner/all`, { withCredentials: true }),
                    axios.get(`${process.env.API_URL}/pet/all`, { withCredentials: true })
                ]);
                //console.debug(patientRes.data,petRes.data);
                setListOfPatients(patientRes.data);
                setListOfPets(petRes.data);
                setListOfPetsIDandName(petRes.data.map(p => ({ pid: p.pid, name: p.name })));
            } catch (err) {
                console.error("Error fetching pets and owners data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPatients();
    }, []);

    const filteredPatients = listOfPatients.filter((p) => {
        const ownerTerm = ownerSearchTerm.toLowerCase().trim();
        //if (!ownerTerm) return true;
        const petTerm = petSearchTerm.toLowerCase().trim();
        //if (!petTerm) return true;

        const fullNameMatch = p.fullname.toLowerCase().includes(ownerTerm);
        const petsNameMatch = listOfPetsIDandName
            .filter(pet => p.pet.includes(pet.pid))
            .some(pet => pet.name.toLowerCase().includes(petTerm));

        if (!ownerTerm && petTerm) return petsNameMatch;
        if (ownerTerm && !petTerm) return fullNameMatch;

        return fullNameMatch || petsNameMatch;
    });

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

    const getAgeString = (birthDateString) => {
        const birthDate = new Date(birthDateString);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();

        // Adjust if birthday hasn't occurred yet this year
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return `${age} éves`;
    }

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

    const fetchPetData = async (pid) => {
        try {
            let petRecordData = [];
            setPetDataLoading(true);
            setPetRecordIDs(null);
            const petRes = await axios.get(`${process.env.API_URL}/pet/${pid}/record`, { withCredentials: true });
            console.debug(petRes.data);
            setPetRecordIDs(petRes.data.recordIDs);
            for (const record of petRes.data.recordIDs) {
                const recordRes = await axios.get(`${process.env.API_URL}/record/${record}/data`, { withCredentials: true });
                petRecordData.push(recordRes.data);
            }
            setPetRecords(petRecordData);
            console.debug("Fetched pet record data:", petRecordData);
            

        } catch (err) {
            console.error("Error fetching pet data:", err);
        } finally {
            setPetDataLoading(false);
        }
    };

    const getPetsForOwner = (ownerUid) => {
        const owner = listOfPatients.find(p => p.uid === ownerUid);
        if (!owner || !owner.pet || owner.pet.length === 0) return [];
        const petIds = owner.pet;
        return listOfPets.filter(pet => petIds.includes(pet.pid));
    };

    const handleConfirmPayDebt = async () => {
        setProcessingDebt(true);
        try {
            const targetUID = debtOwnerID;
            const res = await axios.post(
                `${process.env.API_URL}/owner/${targetUID}/update/debt`,
                { amount: 0 },
                { withCredentials: true }
            );
            console.log("Debt payment response:", res.data);
            // Refresh patient list to reflect updated debt
            const patientRes = await axios.get(`${process.env.API_URL}/owner/all`, { withCredentials: true });
            setListOfPatients(patientRes.data);
            alert("Tartozás sikeresen rendezve.");
        } catch (err) {
            console.error("Error paying debt:", err);
            alert("Failed to process debt payment.");
        } finally {
            setProcessingDebt(false);
            setShowDebtModal(false);
        }
    };

    if (loading) return <></>;
    if (!listOfPatients) return (
        <>
            <p>A tulajdonosok nem találhatók, vagy nincs hozzáférésed.</p>
            <Link href="/"><p>Vissza a főoldalra</p></Link>
        </>
    );


    return (
        <div className="container">
            <main className="main">
                <header className="header">
                    <Link href={`/`}><h2>Főoldal</h2></Link>
                    <h1 className="title">Nyilvántartás</h1>
                </header>

                <section className="search-section">
                    <label>
                        Tulajdonos neve:
                        <input
                            type="text"
                            className="input"
                            placeholder="Teljes neve"
                            value={ownerSearchTerm}
                            onChange={(e) => setOwnerSearchTerm(e.target.value)}
                        />
                    </label>
                </section>

                <section className="search-section">
                    <label>
                        Állat neve:
                        <input
                            type="text"
                            className="input"
                            placeholder="Állat neve"
                            value={petSearchTerm}
                            onChange={(e) => setPetSearchTerm(e.target.value)}
                        />
                    </label>
                </section>

                {loading ? (
                    <p className="loading">Betöltés...</p>
                ) : filteredPatients.length > 0 ? (
                    <ul className="patient-list">
                        {filteredPatients.map((p) => (
                            <li key={p.uid} className="patient-card">
                                <div className="patient-info">
                                    <p>
                                        <strong>Név:</strong> {p.fullname}
                                        <button className="button"
                                            onClick={() => { router.push(`/profile-editor?uid=${encodeURIComponent(`${p.uid}`)}`) }}>
                                            Szerkesztés
                                        </button>
                                    </p>
                                    {p.address && (
                                        <p>
                                            <strong>Lakcím:</strong> {p.address}
                                        </p>
                                    )}
                                    {p.debt > 0 && (
                                        <p>
                                            <strong style={{ "color": "crimson" }}>Tartozás:</strong> {p.debt} Ft
                                            <button
                                                type="button"
                                                className="button"
                                                onClick={() => {
                                                    setShowDebtModal(true);
                                                    setDebtOwnerID(p.uid);
                                                    setDebtOwnerName(p.fullname);
                                                }}
                                            >
                                                Rendezés
                                            </button>
                                        </p>

                                    )}
                                </div>
                                <div className="actions">
                                    <button
                                        className="button"
                                        onClick={() => {
                                            setSelectedPetOwner(selectedPetOwner === p.uid ? null : p.uid);
                                            setPetRecordIDs(null);
                                            setSelectedPet("");
                                        }
                                        }
                                    >
                                        ÁLLATOK
                                    </button>
                                </div>

                                {selectedPetOwner === p.uid && (
                                    <div className="pet-section">
                                        {getPetsForOwner(p.uid).length > 0 ? (
                                            <>
                                                <ul className="pet-list">
                                                    {getPetsForOwner(p.uid).map((pet) => (
                                                        <li key={pet.pid} className="pet-card">
                                                            <div>
                                                                <span><b>{pet.alive ? "" : "† "}</b></span>
                                                                <span className="pet-name">{pet.name}</span> - {pet.alive ? getAgeString(pet.birthday) : ""}
                                                            </div>
                                                            <div>
                                                                {pet.sex}, {pet.breed.join("-")} {pet.species}
                                                            </div>
                                                            <button
                                                                className="button secondary"
                                                                onClick={() => {
                                                                    setSelectedPet(pet.name);
                                                                    fetchPetData(pet.pid);
                                                                    
                                                                }}
                                                            >
                                                                Kórtörténet
                                                            </button>
                                                            <button
                                                                className="button secondary"
                                                                onClick={() =>
                                                                    router.push(`/treatment?pid=${pet.pid}&uid=${p.uid}`)}
                                                            >
                                                                Kezelem
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <button
                                                    onClick={() =>
                                                        router.push(
                                                            `/admission?existingowner=true&uid=${encodeURIComponent(`${p.uid}`)}`
                                                        )
                                                    }
                                                >
                                                    ÁLLAT<br />FELVÉTEL
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <p>Nincsenek állatai</p>
                                                <button
                                                    className="button primary"
                                                    onClick={() =>
                                                        router.push(
                                                            `/admission?existingowner=true&uid=${encodeURIComponent(`${p.uid}`)}`
                                                        )
                                                    }
                                                >
                                                    ÁLLAT<br />FELVÉTEL
                                                </button>
                                            </>
                                        )}
                                        {petDataLoading && <p className="loading">Betöltés...</p>}
                                        {!petDataLoading && petRecords && (
                                            <div className="history">
                                                <h3>{selectedPet} Kórtörténet:</h3>
                                                <ul className="history-list">
                                                    {petRecords.map((record) => (
                                                        <li key={record.rid} className="history-item">
                                                            <details>
                                                                <summary>
                                                                    <strong>Dátum:</strong> {formatDate(record.date)}
                                                                    <div>{translate(record.type)}</div>
                                                                </summary>

                                                                {record.vaccination && (
                                                                    <div>
                                                                        <strong>Oltások:</strong>{" "}
                                                                        {record.vaccination.map((vax, idx) => (
                                                                            <div key={idx}>
                                                                                {vax.value}<br />
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                                {record.treatment && (
                                                                    <div>
                                                                        <strong>Kezelés:</strong>{" "}
                                                                        {record.treatment.map((treat, idx) => (
                                                                            <div key={idx}>
                                                                                {treat.symptoms}
                                                                                {treat.treatment}
                                                                                {treat.suggestion}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                                {record.drug && (
                                                                    <div>
                                                                        <strong>Gyógyszerezés:</strong>{" "}
                                                                        {record.drug.map((treat, idx) => (
                                                                            <div key={idx}>{treat.value}</div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                                {record.receipt  && (
                                                                    <div>
                                                                        <strong>Receptek:</strong>{" "}
                                                                        {record.receipt.map((treat, idx) => (
                                                                            <div key={idx}>{treat.value}</div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                                {record.note && (
                                                                    <div>
                                                                        <strong>Megjegyzés:</strong> {record.note}
                                                                    </div>
                                                                )}

                                                            </details>

                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="no-results">
                        <p>Nincs ilyen nevű tulajdonos a rendszerben.</p>
                        <p>
                            Hozzá szeretnéd adni a nyilvántartáshoz <strong>{ownerSearchTerm}</strong>-t?
                        </p>
                        <br />
                        <button
                            onClick={() =>
                                router.push(`/admission?existingowner=false&name=${encodeURIComponent(ownerSearchTerm)}`)
                            }
                        >
                            TULAJDONOS FELVÉTEL
                        </button>
                    </div>
                )}

                <footer className="footer">
                    <p>&copy; 2025 FKPMA. All rights reserved.</p>
                </footer>
                {showDebtModal && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1000,
                        }}
                    >
                        <div
                            style={{
                                background: "white",
                                padding: "2rem",
                                borderRadius: "12px",
                                maxWidth: "400px",
                                textAlign: "center",
                            }}
                        >
                            <h3>Kifizetés megerősítése</h3>
                            <p>Biztosan kifizetettként szeretnéd megjelölni {debtOwnerName} adósságát?</p>
                            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-around" }}>
                                <button
                                    onClick={() => setShowDebtModal(false)}
                                    style={{ padding: "0.5rem 1rem" }}
                                >
                                    Nem
                                </button>
                                <button
                                    onClick={handleConfirmPayDebt}
                                    disabled={processingDebt}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        backgroundColor: processingDebt ? "gray" : "#27ae60",
                                        color: "white",
                                        borderRadius: "6px",
                                    }}
                                >
                                    {processingDebt ? "Feldolgozás..." : "Megerősítés"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

