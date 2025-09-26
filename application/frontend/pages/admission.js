import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Select from 'react-select';


export default function AdmissionPage() {
    const router = useRouter();
    const { name, address, email, mobile } = router.query;

    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [ownerMobile, setOwnerMobile] = useState("");
    const [ownerEmail, setOwnerEmail] = useState("");
    const [ownerAddress, setOwnerAddress] = useState("");
    const [birthDay, setBirthDay] = useState("");

    const [petName, setPetName] = useState("");
    const [chipid, setChipid] = useState("");
    const [species, setSpecies] = useState("");
    const [breed, setBreed] = useState("");
    const [petSex, setPetSex] = useState("male");
    const [petNeutralised, setPetNeutralised] = useState("non-neutralised");
    const [petNeutraliseDate, setPetNeutraliseDate] = useState("");
    
    const [weight, setWeight] = useState("");
    const [colour, setColour] = useState("");
    const [petNote, setPetNote] = useState("");
    const [petBirthDay, setPetBirthDay] = useState("");

    const [speciesSuggestions, setSpeciesSuggestions] = useState([]);
    const [dogBreedSuggestions, setDogBreedSuggestions] = useState([]);
    const [saving1, setSaving1] = useState(false);
    const [saving2, setSaving2] = useState(false);

    const [petCache, setPetCache] = useState([]);

    const [selectedSpecies, setSelectedSpecies] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState([]);

    const speciesOptions = [
        { value: 'kutya', label: 'Kutya' },
        { value: 'macska', label: 'Macska',  },
        { value: 'nyúl', label: 'Nyúl',  },
        { value: 'hörcsög', label: 'Hörcsög',  },
        { value: 'görény', label: 'Görény', },
        { value: 'tengerimalac', label: 'Tengerimalac',  },
        { value: 'teknős', label: 'Teknős',  },
        { value: 'sertés', label: 'Sertés', },
    ];

    const breedOptionsMap = {
        kutya: [
        { value: 'keverék', label: 'Keverék', },
        { value: 'labrador', label: 'Labrador' },
        { value: 'német juhász', label: 'Német juhász',  },
        { value: 'golden retriever', label: 'Golden retriever',  },
        { value: 'puli', label: 'Puli',  },
        { value: 'beagle', label: 'Beagle', },
        { value: 'bulldog', label: 'Bulldog',  },
        { value: 'husky', label: 'Husky',  },
        { value: 'tacskó', label: 'Tacskó',  },
        { value: 'rottweiler', label: 'Rottweiler'},
        { value: 'border collie', label: 'Border Collie'},
        { value: 'vizsla', label: 'Vizsla'},
        ],
        macska: [
        { value: 'sziámi', label: 'Sziámi' },
        { value: 'maine coon', label: 'Maine coon',  },
        { value: 'ragdoll', label: 'Ragdoll',  },
        { value: 'orosz kék', label: 'Orosz kék',  },
        { value: 'keverék', label: 'Keverék',  },
        ],
        nyúl: [
        { value: 'holland lop', label: 'Holland lop' },
        { value: 'rex', label: 'Rex',  },
        { value: 'lengyel', label: 'Lengyel',  },
        { value: 'európai', label: 'Európai',  },
        { value: 'keverék', label: 'Keverék',  },
        ]
    };
    const colourOptions = [
        { value: 'barna', label: 'Barna' },
        { value: 'sárga', label: 'Sárga',  },
        { value: 'fehér', label: 'Fehér',  },
        { value: 'fekete', label: 'Fekete',  },
        { value: 'tricolour', label: 'Tricolour', },
        { value: 'bézs', label: 'Bézs',  },
        { value: 'kékes', label: 'Kékes',  },
        { value: 'foltos', label: 'Foltos', },
        { value: 'csíkos', label: 'Csíkos', },
    ];
    const breedOptions = breedOptionsMap[selectedSpecies?.value] || [];

    useEffect(() => {
        if (name) {
            const parts = name.split(" ");
            if (parts.length > 1) {
                setLastname(parts[0]);
                setFirstname(parts.slice(1).join(" "));
            } else {
                setLastname(parts[0]);
            }
        }
        if (address) {
            setOwnerAddress(address);
        }
        if (email) {
            setOwnerEmail(email);
        }
        if (mobile) {
            setOwnerMobile(mobile);
        }
    }, [address, name, mobile, email]);

    
    const handleRemovePet = (index) => {
        setPetCache(petCache.filter((_, i) => i !== index));
    };

    const handleChangeChipID = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // remove non-digits
        value = value.slice(0, 15); // max 15 digits

        // insert hyphens every 4 digits
        let formatted = value.match(/.{1,4}/g)?.join("-") || "";
        setChipid(formatted);
    };

    const handleAddPet = (e) => {
        e.preventDefault();
        if (!petName) return;
        setPetCache([...petCache, {
            name: petName,
            chipid,
            species:selectedSpecies.value,
            breed,
            sex: petSex,
            colour,
            weight,
            birthDay: petBirthDay,
            neutralised: false
        }]);
        setPetName("");
        setSpecies("");
        setSelectedSpecies("");
        setChipid("");
        setBreed("");
        setPetSex("");
        setPetBirthDay("");
        setSpeciesSuggestions([]);
    };

    const handleOwnerSubmit = async (e) => {
        e.preventDefault();
        if (!lastname) return;
        setSaving1(true);
        setSaving2(true);
        try {
            const ownerRes = await axios.post(`${process.env.API_URL}/patient/register`, {
                lastname,
                firstname: firstname ? [firstname] : [],
                mobile: ownerMobile ? [ownerMobile] : [],
                email: ownerEmail ? [ownerEmail] : [],
                address: ownerAddress,
                birthday: birthDay
            }, { withCredentials: true });
            const ownerUid = ownerRes.data.uid;
            console.debug("Owner uid:", ownerUid);

            // Submit all cached pets
            for (const pet of petCache) {
                const petRes = await axios.post(`${process.env.API_URL}/pet/register`, {
                    uid: ownerUid,
                    chipid: pet.chipid,
                    name: pet.name,
                    species: pet.species,
                    breed: pet.breed,
                    sex: pet.sex,
                    colour: pet.colour,
                    weight: pet.weight,
                    birthday: pet.birthday
                }, { withCredentials: true });
                console.debug(petRes);
            }

            // Reset all fields and cache
            setLastname("");
            setFirstname("");
            setOwnerMobile("");
            setOwnerEmail("");
            setOwnerAddress("");
            setBirthDay("");
            setPetCache([]);

            alert("Patient and pets successfully added!");
            router.push("/");
        } catch (err) {
            console.error("Error adding patient and pets", err);
            alert("Failed to add patient and pets");
        } finally {
            setSaving1(false);
            setSaving2(false);
        }
    };

    return (
        <div>
            <main>
                <div>
                    <Link href={`/`}><h2>Főoldal</h2></Link>
                    
                    <h1>Új tulajdonos felvétele</h1>
                </div>
                <div className="form-container">
                    <div className="owner-form">
                        <form onSubmit={handleOwnerSubmit}>
                            <div>
                                <label>Vezetéknév</label>
                                <input type="text" value={lastname} onChange={e => setLastname(e.target.value)} required />
                            </div>
                            <div>
                                <label>Keresztnév</label>
                                <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)} />
                            </div>
                            <div>
                                <label>Telefonszám</label>
                                <input type="text" value={ownerMobile} onChange={e => setOwnerMobile(e.target.value)} />
                            </div>
                            <div>
                                <label>Email</label>
                                <input type="email" value={ownerEmail} onChange={e => setOwnerEmail(e.target.value)} />
                            </div>
                            <div>
                                <label>Lakcím</label>
                                <p>(ir.szám, város, utca, házszám)</p>
                                <input type="text" value={ownerAddress} onChange={e => setOwnerAddress(e.target.value)} />
                            </div>

                            <button type="submit" disabled={saving1}>{saving1 ? "Mentés..." : "Gazdi felvétel"}</button>
                        </form>
                    </div>

                    <div className="pet-form">
                        <form onSubmit={handleAddPet}>
                            <div>
                                <label>Állat neve</label>
                                <input type="text" value={petName} onChange={e => setPetName(e.target.value)} required />
                            </div>
                            <div>
                                <label>Chip-szám</label>
                                <input
                                type="text"
                                value={chipid}
                                onChange={handleChangeChipID}
                                placeholder="Enter chip ID"
                                />
                            </div>
                            <div>
                                <label>Faj</label>
                                <Select
                                    value={selectedSpecies}
                                    onChange={(option) => {
                                        setSelectedSpecies(option);
                                        setSelectedBreeds([]); // reset breeds when species changes
                                    }}
                                    defaultValue={[speciesOptions[0]]}
                                    name="species"
                                    options={speciesOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder="..."
                                />
                            </div>
                            <div>
                                <label>Fajta</label>
                                <Select
                                    defaultValue={[]}
                                    isMulti
                                    name="breed"
                                    value={selectedBreeds}
                                    onChange={setSelectedBreeds}
                                    options={breedOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder="..."
                                    isDisabled={!selectedSpecies} 
                                />
                            </div>
                            <div>
                                <label>Neme</label>
                                <div className="radio-group">
                                    <label>
                                        <input
                                            type="radio"
                                            checked={petSex === 'hím'}
                                            onChange={() => setPetSex('hím')}
                                        />
                                        <span>Hím</span>
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            checked={petSex === 'nőstény'}
                                            onChange={() => setPetSex('nőstény')}
                                        />
                                        <span>Nőstény</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label>Ivar</label>
                                <div className="radio-group">
                                    <label>
                                        <input
                                            type="radio"
                                            checked={petNeutralised === 'ivaros'}
                                            onChange={() => setPetNeutralised('ivaros')}
                                        />
                                        <span>Ivaros</span>
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            checked={petNeutralised === 'ivartalanított'}
                                            onChange={() => setPetNeutralised('ivartalanított')}
                                        />
                                        <span>Ivartalan</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label>Színe</label>
                                <Select
                                    defaultValue={[]}
                                    isMulti
                                    name="colour"
                                    options={colourOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder="..."
                                    isDisabled={!selectedSpecies} 
                                />
                            </div>
                            <div>
                                <label>Súlya</label>
                                <input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
                            </div>
                            <div>
                                <label>Születési Dátum</label>
                                <input type="date" value={petBirthDay} onChange={e => setPetBirthDay(e.target.value)} />
                            </div>
                            <div>
                                <label>Ivartalanítás Dátuma</label>
                                <input type="date" value={petNeutraliseDate} onChange={e => setPetNeutraliseDate(e.target.value)} />
                            </div>
                            <div>
                                <label>Megjegyzés</label> <br />
                                <textarea style={{"padding":"1%"}} value={petNote} onChange={e => setPetNote(e.target.value)} />
                            </div>
                            <button type="submit" disabled={saving2}>{saving2 ? "Mentés..." : "Állat felvétel"}</button>
                        </form>

                        {petCache.length > 0 && (
                            <div>
                                <h3>Hozzáadott állatok:</h3>
                                <ul>
                                    {petCache.map((pet, index) => (
                                        <li key={index}>
                                            {pet.name} ({pet.species})
                                            <button onClick={() => handleRemovePet(index)}>Visszavon</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
