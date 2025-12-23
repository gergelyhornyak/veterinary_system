import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { apiUrl } from "../lib/api";
import Link from "next/link";

export default function ProfileEditorPage() {
  const router = useRouter();

  const { uid } = router.query;

  const [owner, setOwner] = useState(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) return;
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const ownerRes = await axios.get(`${apiUrl()}/owner/${uid}/data`, { withCredentials: true });
        if (cancelled) return;
        setOwner(ownerRes.data);

        // ensure pets cleared before fetching to avoid duplicates from repeated runs
        setPets([]);

        const petIds = ownerRes.data.pet || [];
        console.debug("ownerRes.data.pet: ", ownerRes.data);

        // fetch all pets in parallel and set state once
        const petPromises = petIds.map((pid) =>
          axios.get(`${apiUrl()}/pet/${pid}/data`, { withCredentials: true }).then(res => res.data)
        );
        const petsData = await Promise.all(petPromises);

        if (cancelled) return;
        setPets(petsData);
        console.debug("pets data:", petsData);
      } catch (err) {
        if (!cancelled) setError("Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [uid]);

  async function handleSave() {
    try {
      setSaving(true);
      setError(null);

      const ownerRes = await axios.post(`${apiUrl()}/owner/${uid}/update`, {
        fullname: owner.fullname,
        address: owner.address,
        mobile: owner.mobile,
        email: owner.email,
      }, { withCredentials: true });

      console.debug(pets);

      // const petRes = await axios.post(`${process.env.API_URL}/pet/update${uid}`, {
      //   fullname,
      //   mobile: ownerMobile ? [ownerMobile] : [],
      //   email: ownerEmail ? [ownerEmail] : [],
      //   address: ownerAddress,
      //   birthday: birthday
      // }, { withCredentials: true });

      alert("Profile updated successfully!");
    } catch (err) {
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <>
        <div>Loading</div>
        <header className="header">
          <Link href={`/`}><h2>Főoldal</h2></Link>
          <h1 className="title">Szerkesztő</h1>
        </header>
      </>
    );
  }

  return (
    <div>
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <header className="header">
          <Link href={`/`}><h2>Főoldal</h2></Link>
          <h1 className="title">Szerkesztő</h1>
        </header>

        {/* Owner Info */}
        <section>
          <h2>
            Tulajdonos
          </h2>
          <div>
            <input
              type="text"
              value={owner.fullname || ""}
              onChange={(e) => setOwner({ ...owner, name: e.target.value })}
              placeholder="Teljes név"
              className=""
            />
            <input
              type="email"
              value={owner.email || ""}
              onChange={(e) => setOwner({ ...owner, email: e.target.value })}
              placeholder="Email"
              className=""
            />
            <input
              type="text"
              value={owner.mobile || ""}
              onChange={(e) => setOwner({ ...owner, mobile: e.target.value })}
              placeholder="Mobil"
              className=""
            />
            <input
              type="text"
              value={owner.address || ""}
              onChange={(e) => setOwner({ ...owner, address: e.target.value })}
              placeholder="Lakcím"
              className=""
            />
            <input
              type="text"
              value={owner.debt || ""}
              onChange={(e) => setOwner({ ...owner, debt: e.target.value })}
              placeholder="Tartozás"
              className=""
            />
          </div>
        </section>

        {/* Pets List */}
        <section>
          <h2>
            Állatok
          </h2>
          {pets && pets.map((pet, index) => (
            <div key={index} className="mb-4">
              <h3>{pet.name}, {pet.breed} {pet.species} </h3>

              <button
                onClick={async () => {
                  if (confirm(`Biztosan törölni szeretnéd ${pet.name} adatait?`)) {
                    try {
                      // Optional: Call backend to delete pet
                      await axios.post(`${apiUrl()}/owner/${owner.uid}/remove/pet`, { pet: pet.pid }, { withCredentials: true });

                      // Remove from local state
                      const updatedPets = pets.filter((_, i) => i !== index);
                      setPets(updatedPets);
                    } catch (err) {
                      alert("Nem sikerült törölni az állatot");
                    }
                  }
                }}
                style={{
                  backgroundColor: "#e63946",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                Állat eltávolítása
              </button>

              <div className="">
                Neve:
                <input
                  type="text"
                  value={pet.name || ""}
                  onChange={(e) => {
                    const updatedPets = [...pets];
                    updatedPets[index] = { ...pet, name: e.target.value };
                    setPets(updatedPets);
                  }}
                  placeholder="Állat neve"
                  className="border rounded-lg p-2 w-full"
                />
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <label>
                    <input
                      type="radio"
                      name={`neuter-${index}`}
                      checked={pet.neuter === true}
                      onChange={(e) => {
                        const updatedPets = [...pets];
                        updatedPets[index] = { ...pet, neuter: true };
                        setPets(updatedPets);
                      }}
                    />
                    Ivartalanított

                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`neuter-${index}`}
                      checked={pet.neuter === false}
                      onChange={(e) => {
                        const updatedPets = [...pets];
                        updatedPets[index] = { ...pet, neuter: false };
                        setPets(updatedPets);
                      }}
                    />
                    Ivaros
                  </label>
                </div>
                <input
                  type="text"
                  value={pet.microchip || ""}
                  onChange={(e) => {
                    const updatedPets = [...pets];
                    updatedPets[index] = { ...pet, microchip: e.target.value };
                    setPets(updatedPets);
                  }}
                  placeholder="Chip szám"
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <div>
                <label>Állapota</label>
                <select
                  value={pet.alive === true ? "alive" : "deceased"}
                  onChange={(e) => {
                    const updatedPets = [...pets];
                    updatedPets[index] = { ...pet, alive: e.target.value === "alive" };
                    setPets(updatedPets);
                  }}
                  style={{ padding: "8px", borderRadius: "8px", border: "1px solid #fff", marginTop: "8px" }}
                >
                  <option value="alive">Élő </option>
                  <option value="deceased">Elhunyt <b>†</b></option>
                </select>
              </div>
              <textarea
                value={pet.notes || ""}
                onChange={(e) => {
                  const updatedPets = [...pets];
                  updatedPets[index] = { ...pet, notes: e.target.value };
                  setPets(updatedPets);
                }}
                placeholder="Megjegyzések"
                style={{ width: "100%", height: "80px", padding: "8px", borderRadius: "8px", border: "1px solid #ccc", marginTop: "8px" }}
              />
              <hr style={{ border: "1px solid #eee", margin: "20px 0" }} />
            </div>
          ))}
        </section>

        {/* Save Button */}
        <div className="">
          <button
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Mentés folyamatban..." : "Mentés"}
          </button>
        </div>
      </div>
    </div>
  );
}
