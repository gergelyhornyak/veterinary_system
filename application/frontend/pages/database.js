import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Database() {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [listOfPatients, setListOfPatients] = useState([]);
    const [listOfPets, setListOfPets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [petSearchTerm, setPetSearchTerm] = useState("");
    const [selectedPetOwner, setSelectedPetOwner] = useState(null);
    const [selectedPet, setSelectedPet] = useState(null);
    const [petData, setPetData] = useState(null); // store fetched data
    const [petDataLoading, setPetDataLoading] = useState(false); // store fetched data

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
            } catch (err) {
                console.error("Error fetching pets and owners data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPatients();
    }, []);

    const filteredPatients = listOfPatients.filter((p) => {
        const term = searchTerm.toLowerCase().trim();
        if (!term) return true;

        const fullNameMatch = p.fullname.toLowerCase().includes(term);        
        return fullNameMatch;
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

    const fetchPetData = async (pid) => {
        try {
            setPetDataLoading(true);
            setPetData(null);
            //setSelectedPet(pid);
            const petRes = await axios.get(`${process.env.API_URL}/pet/${pid}/record`, { withCredentials: true });
            //console.debug(petRes.data);
            setPetData(petRes.data);
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

    if (loading) return <></>;
    if (!listOfPatients) return (
        <>
            <p>Patients not found or you do not have access.</p>
            <Link href="/"><p>Go back to homepage</p></Link>
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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                                        onClick={() => {router.push(`/profile-editor?uid=${encodeURIComponent(`${p.uid}`)}`)}}>
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
                                            <strong style={{"color":"crimson"}}>Tartozás:</strong> {p.debt} Ft 
                                            <button className="button" 
                                            onClick={() => {router.push(`/pay-debt?uid=${encodeURIComponent(`${p.uid}`)}`)}}>
                                                Kifizetés
                                            </button>
                                        </p>

                                    )}
                                </div>
                                <div className="actions">
                                    <button
                                        className="button"
                                        onClick={() => {
                                            setSelectedPetOwner(selectedPetOwner === p.uid ? null : p.uid);
                                            setPetData(null);
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
                                                                <span>[{pet.alive ? "Élő" : "Elhunyt"}] </span>
                                                                <span className="pet-name">{pet.name}</span> - {getAgeString(pet.birthday)}
                                                            </div>
                                                            <div>
                                                                {pet.species} - {pet.breed.join(" ")} - {pet.sex}
                                                            </div>
                                                            <button
                                                                className="button secondary"
                                                                onClick={() => {
                                                                    fetchPetData(pet.pid);
                                                                setSelectedPet(pet.name);
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
                                                           `/admission?uid=${encodeURIComponent(`${p.uid}`)}&name=${encodeURIComponent(`${p.fullname}`)}&address=${encodeURIComponent(`${p.address}`)}&email=${encodeURIComponent(`${p.email}`)}&mobile=${encodeURIComponent(`${p.mobile}`)}`
                                                        )
                                                    }
                                                >
                                                    ÁLLAT<br/>FELVÉTEL
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <p>Nincsenek állatai</p>
                                                <button
                                                    className="button primary"
                                                    onClick={() =>
                                                        router.push(
                                                            `/admission?uid=${encodeURIComponent(`${p.uid}`)}&name=${encodeURIComponent(`${p.fullname}`)}&address=${encodeURIComponent(`${p.address}`)}&email=${encodeURIComponent(`${p.email}`)}&mobile=${encodeURIComponent(`${p.mobile}`)}`
                                                        )
                                                    }
                                                >
                                                    ÁLLAT<br/>FELVÉTEL
                                                </button>
                                            </>
                                        )}
                                        {petDataLoading && <p className="loading">Betöltés...</p>}
                                        {!petDataLoading && petData && (
                                            <div className="history">
                                                <h3>{selectedPet} Kórtörténet:</h3>
                                                <ul className="history-list">
                                                    {petData.map((record) => (
                                                        <li key={record.rid} className="history-item">
                                                            <details>
                                                                <summary>
                                                                    <strong>Dátum:</strong> {new Date(record.date).toLocaleDateString("hu-HU")}
                                                                <div>{translate(record.type)}</div>
                                                                </summary>
                                                                
                                                                {record.vaccination?.length > 0 && (
                                                                <div>
                                                                    <strong>Oltások:</strong>{" "}
                                                                    {record.vaccination.map((vax, idx) => (
                                                                        <div key={idx}>
                                                                            {vax.value}<br />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                )}
                                                                {record.treatment?.length > 0 && (
                                                                    <div>
                                                                        <strong>Kezelés:</strong>{" "}
                                                                        {record.treatment.map((treat, idx) => (
                                                                            <div key={idx}>{treat.notes}</div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                                {record.drug?.length > 0 && (
                                                                    <div>
                                                                        <strong>Gyógyszerezés:</strong>{" "}
                                                                        {record.drug.map((treat, idx) => (
                                                                            <div key={idx}>{treat.value}</div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                                {record.receipt?.length > 0 && (
                                                                    <div>
                                                                        <strong>Receptek:</strong>{" "}
                                                                        {record.receipt.map((treat, idx) => (
                                                                            <div key={idx}>{treat.value}</div>
                                                                        ))}
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
                            Hozzá szeretnéd adni a nyilvántartáshoz <strong>{searchTerm}</strong>-t?
                        </p>
                        <br/>
                        <button
                            onClick={() =>
                                router.push(`/admission?name=${encodeURIComponent(searchTerm)}`)
                            }
                        >
                            TULAJDONOS FELVÉTEL
                        </button>
                    </div>
                )}

                <footer className="footer">
                    <p>&copy; 2025 FKPMA. All rights reserved.</p>
                </footer>
            </main>
        </div>
    );
}

