import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Select from 'react-select';

export default function DrugsManagement() {
    const [newDrug, setNewDrug] = useState({
        value: '',
        label: '',
        category: 'drug'
    });
    const [drugOptions, setDrugOptions] = useState([]);
    const [selectedDrug, setSelectedDrug] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        try {
            const getDrugs = async () => {
                const drugRes = await axios.get(`${process.env.API_URL}/drug/all`, { withCredentials: true });
                setDrugOptions(drugRes.data);
            }
            getDrugs();
        } catch (error) {
            console.error("Error fetching drugs:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDrug(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddDrug = () => {
        if (newDrug.value && newDrug.label) {
            setDrugs(prev => [...prev, newDrug]);
            setNewDrug({
                value: '',
                label: '',
                category: 'drug'
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <header className="header">
                <Link href={`/`}><h2>Főoldal</h2></Link>
                <h1 className="title">Gyógyszer Rendszerezés</h1>
            </header>

            <div style={{ marginBottom: '20px' }}>
                <div className="form-group">
                    <label>Gyógyszerek</label>
                    <Select
                        value={selectedDrug}
                        onChange={setSelectedDrug}
                        options={drugOptions}
                        classNamePrefix="select"
                        placeholder="..."
                    />
                </div>
                <input
                    type="text"
                    name="value"
                    placeholder="Gyógyszer Neve"
                    value={newDrug.value}
                    onChange={handleInputChange}
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <input
                    type="text"
                    name="label"
                    placeholder="Gyógyszer Neve"
                    value={newDrug.label}
                    onChange={handleInputChange}
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <select
                    name="category"
                    value={newDrug.category}
                    onChange={handleInputChange}
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                >
                    <option value="drug">Gyógyszer</option>
                    <option value="vaccine">Oltás</option>
                    <option value="pedigree">Tabletta</option>
                </select>
                <button
                    onClick={handleAddDrug}
                    style={{ padding: '10px 20px' }}
                >
                    Új Gyógyszer Hozzáadása
                </button>
            </div>

            <ul>
                {drugOptions.map((drug, index) => (
                    <li key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                        <strong>{drug.label}</strong>
                        <div>Típusa: {drug.type}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
