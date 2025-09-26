import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Database() {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [patients, setPatients] = useState([]);
    const [pets, setPets] = useState([]);
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
                    axios.get(`${process.env.API_URL}/patient/all`, { withCredentials: true }),
                    axios.get(`${process.env.API_URL}/pet/all`, { withCredentials: true })
                ]);
                console.debug(patientRes.data,petRes.data);
                setPatients(patientRes.data);
                setPets(petRes.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPatients();
    }, []);

    const filteredPatients = patients.filter((p) => {
        const term = searchTerm.toLowerCase().trim();
        if (!term) return true;

        // Split search by whitespace to support "lastname firstname"
        const parts = term.split(/\s+/);
        const lastPart = parts[0] || "";
        const firstPart = parts[1] || "";

        const lastnameMatch = p.lastname.toLowerCase().startsWith(lastPart);
        const firstnameMatch = firstPart ? p.firstname?.some((fn) => fn.toLowerCase().startsWith(firstPart)) : true;

        return lastnameMatch && firstnameMatch;
    });

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
            console.debug(petRes.data);
            setPetData(petRes.data);
        } catch (err) {
            console.error("Error fetching pet data:", err);
        } finally {
            setPetDataLoading(false);
        }
    };

    const getPetsForOwner = (ownerUid) => {
        const owner = patients.find(p => p.uid === ownerUid);
        if (!owner || !owner.pet || owner.pet.length === 0) return [];
        const petIds = owner.pet;
        return pets.filter(pet => petIds.includes(pet.pid));
    };

    if (loading) return <></>;
    if (!patients) return (
        <>
            <p>Patients not found or you do not have access.</p>
            <Link href="/"><p>Go back to homepage</p></Link>
        </>
    );


    return (
        <div className="container">
            <main className="main">
                <header className="header">
                    <Link href={`/`}>
                        <h2 className="link">Főoldal</h2>
                    </Link>
                    <h1 className="title">Nyilvántartás</h1>
                </header>

                <section className="search-section">
                    <label>
                        Tulajdonos neve:
                        <input
                            type="text"
                            className="input"
                            placeholder="Vezetéknév keresztnév"
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
                                        <strong>Neve:</strong> {p.lastname}, {p.firstname.join(" ")}
                                    </p>
                                    {p.mobile?.length > 0 && (
                                        <p>
                                            <strong>Tel.szám:</strong> {p.mobile.join(", ")}
                                        </p>
                                    )}
                                    {p.email?.length > 0 && (
                                        <p>
                                            <strong>Email:</strong> {p.email}
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
                                                                <span className="pet-name">{pet.name}</span> – {getAgeString(pet.birth)}
                                                            </div>
                                                            <div>
                                                                {pet.species} – {pet.breed} – {pet.sex}
                                                            </div>
                                                            <div>{pet?.weight} kg</div>
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
                                                            `/admission?name=${encodeURIComponent(
                                                                `${p.lastname} ${p.firstname.join(" ")}`
                                                            )}&address=${encodeURIComponent(p?.address)}&email=${encodeURIComponent(
                                                                p?.email
                                                            )}&mobile=${encodeURIComponent(p?.mobile[0])}`
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
                                                            `/admission?name=${encodeURIComponent(
                                                                `${p.lastname} ${p.firstname.join(" ")}`
                                                            )}`
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
                                                                <div>
                                                                    <strong>Dátum:</strong> {new Date(record.date).toLocaleDateString("hu-HU")}
                                                                </div>
                                                                <div>{record.note}</div>
                                                                </summary>
                                                                
                                                                {record.vaccination?.length > 0 && (
                                                                <div>
                                                                    <strong>Oltások:</strong>{" "}
                                                                    {record.vaccination.map((vax, idx) => (
                                                                        <div key={idx}>
                                                                            {vax.label}<br />
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

