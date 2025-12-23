import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../lib/api";
import Link from "next/link";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { hu } from "date-fns/locale";


export default function AdmissionPage() {
    const router = useRouter();
    const { uid, existingowner, name } = router.query;

    const [ownerData, setOwnerData] = useState({});

    const [ownerFullName, setOwnerFullName] = useState("");
    const [ownerAddress, setOwnerAddress] = useState("");
    const [ownerMobile, setOwnerMobile] = useState("");
    const [ownerEmail, setOwnerEmail] = useState("");

    const [existingOwner, setExistingOwner] = useState(false);
    const [existingOwnerSubmit, setExistingOwnerSubmit] = useState("Új tulajdonos és állat felvétel");

    const [ownerID, setOwnerID] = useState("");
    const [petIDs, setPetIDs] = useState([]);

    const [ownerPetData, setOwnerPetData] = useState({});

    const [petName, setPetName] = useState("");
    const [petSpecies, setPetSpecies] = useState("");
    const [petBreed, setPetBreed] = useState([]);
    const [petColour, setPetColour] = useState([]);
    const [petSex, setPetSex] = useState("");
    const [petAlive, setPetAlive] = useState(true);
    const [petNeuter, setPetNeuter] = useState(false);
    const [petNeutraliseDate, setPetNeutraliseDate] = useState("");
    const [petBirthDay, setPetBirthDay] = useState("");
    const [petChipID, setPetChipID] = useState("");
    const [petNote, setPetNote] = useState("");

    const [petPhoto, setPetPhoto] = useState(null);
    const [petPhotoPreview, setPetPhotoPreview] = useState(null);

    const [speciesSuggestions, setSpeciesSuggestions] = useState([]);
    const [dogBreedSuggestions, setDogBreedSuggestions] = useState([]);
    const [selectedSpecies, setSelectedSpecies] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [selectedColours, setSelectedColours] = useState([]);

    const [saving1, setSaving1] = useState(false);
    const [saving2, setSaving2] = useState(false);

    const [petCache, setPetCache] = useState([]);

    const speciesOptions = [
        { value: 'kutya', label: 'kutya' },
        { value: 'macska', label: 'macska', },
        { value: 'nyúl', label: 'nyúl', },
        { value: 'hörcsög', label: 'hörcsög', },
        { value: 'görény', label: 'görény', },
        { value: 'tengerimalac', label: 'tengerimalac', },
        { value: 'teknős', label: 'teknős', },
        { value: 'sertés', label: 'sertés', },
    ];

    const breedOptionsMap = {
        kutya: [
            { value: 'keverék', label: 'keverék', },
            { value: 'labrador', label: 'labrador' },
            { value: 'német juhász', label: 'német juhász', },
            { value: 'golden retriever', label: 'golden retriever', },
            { value: 'puli', label: 'puli', },
            { value: 'beagle', label: 'beagle', },
            { value: 'bulldog', label: 'bulldog', },
            { value: 'husky', label: 'husky', },
            { value: 'tacskó', label: 'tacskó', },
            { value: 'rottweiler', label: 'rottweiler' },
            { value: 'border collie', label: 'border collie' },
            { value: 'vizsla', label: 'vizsla' },
        ],
        macska: [
            { value: 'keverék', label: 'keverék', },
            { value: 'házi', label: 'házi' },
            { value: 'sziámi', label: 'sziámi' },
            { value: 'maine coon', label: 'maine coon', },
            { value: 'ragdoll', label: 'ragdoll', },
            { value: 'orosz kék', label: 'orosz kék', },
        ],
        nyúl: [
            { value: 'keverék', label: 'keverék', },
            { value: 'holland lop', label: 'holland lop' },
            { value: 'rex', label: 'rex', },
            { value: 'lengyel', label: 'lengyel', },
            { value: 'európai', label: 'európai', },

        ],
        tengerimalac: [
            { value: 'keverék', label: 'keverék', },
        ],
        teknős: [
            { value: 'keverék', label: 'keverék', },
        ],
        sertés: [
            { value: 'keverék', label: 'keverék', },
        ],
    };
    const colourOptions = [
        { value: 'barna', label: 'barna' },
        { value: 'sárga', label: 'sárga', },
        { value: 'fehér', label: 'fehér', },
        { value: 'fekete', label: 'fekete', },
        { value: 'trikolor', label: 'trikolor', },
        { value: 'bézs', label: 'bézs', },
        { value: 'pöttyös', label: 'pöttyös', },
        { value: 'szürke', label: 'szürke', },
        { value: 'fóka', label: 'fóka', },
        { value: 'foltos', label: 'foltos', },
        { value: 'csíkos', label: 'csíkos', },
    ];
    const breedOptions = breedOptionsMap[selectedSpecies?.value] || [];

    useEffect(() => {
        console.debug("URL args:", uid, existingowner);
        if (uid) {
            setOwnerID(uid);
            setExistingOwner(true);
            setExistingOwnerSubmit("Meglévő tulajdonoshoz új állat(ok) felvétele");
        } else {
            setExistingOwner(false);
            setOwnerFullName(name || "");
            setExistingOwnerSubmit("Új tulajdonoshoz új állat(ok) felvétele");
        }

        const fetchOwnerAndPetsData = async () => {
            try {
                const ownerRes = await axios.get(`${apiUrl()}/owner/${uid}/data`, { withCredentials: true });
                setOwnerData(ownerRes.data);
                setOwnerFullName(ownerRes.data.fullname);
                setOwnerAddress(ownerRes.data.address);
                setOwnerMobile(ownerRes.data.mobile);
                setOwnerEmail(ownerRes.data.email);
                setOwnerID(uid);

                const pets = ownerRes.data.pet || [];
                const petsRes = await Promise.all(
                    pets.map(async (pid) => {
                        const petRes = await axios.get(`${apiUrl()}/pet/${pid}/data`, { withCredentials: true });
                        return petRes.data;
                    })
                );
                setOwnerPetData(petsRes);
            } catch (err) {
                console.error("Error fetching pets and owners data:", err);
            }
        };

        if (uid) {
            fetchOwnerAndPetsData();
        } else {
            setExistingOwner(false);
        }
    }, [uid, existingowner, name]);



    const handleRemovePet = (index) => {
        setPetCache(petCache.filter((_, i) => i !== index));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPetPhoto(file);
            setPetPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleChangeChipID = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // remove non-digits
        value = value.slice(0, 15); // max 15 digits

        // insert hyphens every 4 digits
        let formatted = value.match(/.{1,4}/g)?.join("-") || "";
        setPetChipID(formatted);
    };

    const formatDateForDisplay = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("hu-HU").format(date); // e.g. 2025. 10. 27.
};

    const handleAddPet = (e) => {
        e.preventDefault();
        if (!petName) return;
        setPetCache([...petCache, {
            name: petName,
            chipid: petChipID,
            species: selectedSpecies.value,
            breed: selectedBreeds.map(b => b.value),
            sex: petSex,
            colour: selectedColours.map(c => c.value),
            birthday: petBirthDay,
            neuter: petNeuter,
            alive: true,
            photo: petPhoto,
            photoPreview: petPhotoPreview,
            note: petNote,
        }]);
        setPetName("");
        setPetSpecies("");
        setSelectedSpecies("");
        setPetChipID("");
        setPetBreed([]);
        setPetSex("");
        setPetBirthDay("");
        setSpeciesSuggestions([]);
    };

    const handleOwnerSubmit = async (e) => {
        e.preventDefault();
        if (!ownerFullName) return;
        setSaving1(true);
        setSaving2(true);

        try {
            console.debug("Register all cached pets");
            const newPetIDs = [];

            // Submit all cached pets first
            for (const pet of petCache) {
                let photoUrl = null;
                if (pet.photo) {
                    const formData = new FormData();
                    formData.append("file", pet.photo);
                    const uploadRes = await axios.post(`${apiUrl()}/photo/upload`,
                        formData, 
                        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true} 
                    );
                    photoUrl = uploadRes.data.url;
                }
                const petRes = await axios.post(`${apiUrl()}/pet/register`, {
                    chipid: pet.chipid,
                    name: pet.name,
                    species: pet.species,
                    breed: pet.breed,
                    sex: pet.sex,
                    colour: pet.colour,
                    birthday: pet.birthday,
                    neuter: pet.neuter,
                    alive: true,
                    photo: photoUrl || ""
                }, { withCredentials: true });

                newPetIDs.push(petRes.data.pid);

                
            }

            setPetIDs(newPetIDs);
            console.debug("Registered pets:", newPetIDs);

            // If new owner:
            if (!existingOwner) {
                console.debug("Registering new owner");
                const ownerRes = await axios.post(`${apiUrl()}/owner/register`, {
                    fullname: ownerFullName,
                    mobile: ownerMobile,
                    email: ownerEmail,
                    address: ownerAddress,
                }, { withCredentials: true });

                const newUID = ownerRes.data.uid;
                setOwnerID(newUID);

                // Attach each pet
                for (const pid of newPetIDs) {
                    await axios.post(`${apiUrl()}/owner/${newUID}/update/pet`, {
                        newPet: pid
                    }, { withCredentials: true });
                }

                alert("Új tulajdonos és új állat sikeresen hozzáadva");

            } else {
                // Existing owner, add pets
                const currentUID = ownerID || ownerData.uid;
                for (const pid of newPetIDs) {
                    await axios.post(`${apiUrl()}/owner/${currentUID}/update/pet`, {
                        newPet: pid
                    }, { withCredentials: true });
                }

                alert("Új állat sikeresen hozzáadva meglévő tulajdonoshoz");
            }

            // Reset everything
            setOwnerFullName("");
            setOwnerMobile("");
            setOwnerEmail("");
            setOwnerAddress("");
            setPetCache([]);
            setPetIDs([]);
            setExistingOwner(false);
            setExistingOwnerSubmit("Új tulajdonos és állat felvétel");
            router.push("/");

        } catch (err) {
            console.error("Error adding owner and pets", err);
            alert("Hiba történt a mentés közben!");
        } finally {
            setSaving1(false);
            setSaving2(false);
        }
    };


    return (
        <div>
            <main style={{ "margin": "0% 16%" }}>
                <div>
                    <header className="header">

                        <Link href={`/`}><h2>Főoldal</h2></Link>

                        <h1 className="title">Tulajdonos és állata felvétele</h1>

                        <div style={{ "text-align": "center", "margin-bottom": "5%" }}>
                            <p>1. állat(ok) hozzáadása</p>
                            <p>2. tulajdonos hozzáadása</p>
                        </div>
                    </header>
                </div>
                <div className="form-container">
                    <div className="owner-form">
                        <form onSubmit={handleOwnerSubmit}>
                            <div>
                                <label><span style={{ "color": "crimson" }}>*</span> Teljes név</label>
                                <input type="text" value={ownerFullName} onChange={e => setOwnerFullName(e.target.value)} required />
                            </div>
                            <div>
                                <label><span style={{ "color": "crimson" }}>*</span> Lakcím</label>
                                <p>(ir.szám, város, utca, házszám)</p>
                                <input type="text" value={ownerAddress} onChange={e => setOwnerAddress(e.target.value)} />
                            </div>
                            <div>
                                <label>Telefonszám</label>
                                <input type="text" value={ownerMobile} onChange={e => setOwnerMobile(e.target.value)} />
                            </div>
                            <div>
                                <label>Email</label>
                                <input type="email" value={ownerEmail} onChange={e => setOwnerEmail(e.target.value)} />
                            </div>

                            <button type="submit" disabled={saving1}>{saving1 ? "Mentés..." : existingOwnerSubmit}</button>
                        </form>
                    </div>

                    <div className="pet-form">
                        <form onSubmit={handleAddPet}>
                            <div>
                                <label><span style={{ "color": "crimson" }}>*</span> Állat neve</label>
                                <input type="text" value={petName} onChange={e => setPetName(e.target.value)} required />
                            </div>
                            <div>
                                <label><span style={{ "color": "crimson" }}>*</span> Születési Dátum</label>
                                <DatePicker
                                    selected={petBirthDay ? new Date(petBirthDay) : null}
                                    onChange={(date) => setPetBirthDay(date.toISOString())} // .split("T")[0]
                                    dateFormat="yyyy / MM / dd"
                                    placeholderText="ÉÉÉÉ / HH / NN"
                                    locale={hu}
                                />
                            </div>
                            <div>
                                <label><span style={{ "color": "crimson" }}>*</span> Faj</label>
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
                                <label><span style={{ "color": "crimson" }}>*</span> Fajta</label>
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
                                <label><span style={{ "color": "crimson" }}>*</span> Színe</label>
                                <CreatableSelect
                                    defaultValue={[]}
                                    isMulti
                                    name="colour"
                                    value={selectedColours}
                                    onChange={setSelectedColours}
                                    options={colourOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder="..."
                                    isDisabled={!selectedSpecies}
                                />
                            </div>
                            <div>
                                <label><span style={{ "color": "crimson" }}>*</span> Neme</label>
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
                                            checked={!petNeuter}
                                            onChange={() => setPetNeuter(false)}
                                        />
                                        <span>Ivaros</span>
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            checked={petNeuter}
                                            onChange={() => setPetNeuter(true)}
                                        />
                                        <span>Ivartalanított</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label>Ivartalanítás Dátuma</label>
                                <DatePicker
                                    selected={petNeutraliseDate ? new Date(petNeutraliseDate) : null}
                                    onChange={(date) => setPetNeutraliseDate(date.toISOString())}
                                    dateFormat="yyyy / MM / dd"
                                    placeholderText="ÉÉÉÉ / HH / NN"
                                    locale={hu}
                                />
                            </div>
                            <div>
                                <label>Fénykép</label>
                                <input type="file" accept="image/*" onChange={handlePhotoChange} />
                                {petPhotoPreview && (
                                    <div style={{ marginTop: "10px" }}>
                                        <img src={petPhotoPreview} alt="Pet preview" style={{ width: "250px", borderRadius: "10px" }} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <label>Chip-szám</label>
                                <input
                                    type="text"
                                    value={petChipID}
                                    onChange={handleChangeChipID}
                                    placeholder="chip szám"
                                />
                            </div>
                            <div>
                                <label>Megjegyzés</label> <br />
                                <textarea style={{ "padding": "1%" }} value={petNote} onChange={e => setPetNote(e.target.value)} />
                            </div>
                            <button type="submit" disabled={saving2}>{saving2 ? "Mentés..." : "Állat felvétel"}</button>
                        </form>
                    </div>

                    <div className="pet-cache">
                        <h3>Felvett állatok:</h3>
                        {petCache.length === 0 && <p>Nincs felvett állat.</p>}
                        {petCache.map((pet, index) => (
                            <div key={index} className="pet-cache-item">
                                <strong>{pet.name}</strong> ({pet.breed.join(", ")} {pet.species})
                                <button onClick={() => handleRemovePet(index)}>Eltávolít</button>
                            </div>
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
}
