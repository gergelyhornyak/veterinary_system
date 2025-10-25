import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Bar, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const TYPE_LABELS = {
    vaccination: "Oltás",
    treatment: "Kezelés",
    drug: "Gyógyszerezés",
    receipt: "Recept",
};


export default function StatsPage() {
    const [records, setRecords] = useState([]);
    const [sortType, setSortType] = useState("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecords = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${process.env.API_URL}/record/all`, { withCredentials: true });
                setRecords(res.data);
            } catch (err) {
                console.error("Error fetching records:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecords();
    }, []);

    // Filter records by type
    const filteredRecords = sortType === "all"
        ? records
        : records.filter(r => r.type === sortType);

    // Prepare data for chart
    const typeCounts = records.reduce((acc, r) => {
        acc[r.type] = (acc[r.type] || 0) + 1;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(TYPE_LABELS).map(type => TYPE_LABELS[type]),
        datasets: [
            {
                label: "Beavatkozások száma",
                data: Object.keys(TYPE_LABELS).map(type => typeCounts[type] || 0),
                backgroundColor: ["#3498db", "#2ecc71", "#e67e22", "#9b59b6"],
            },
        ],
    };

    const dateCounts = records.reduce((acc, r) => {
        const date = new Date(r.date).toLocaleDateString("hu-HU");
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const timelineLabels = Object.keys(dateCounts).sort(
        (a, b) => new Date(a) - new Date(b)
    );

    const timelineData = {
        labels: timelineLabels,
        datasets: [
            {
                label: "Beavatkozások száma naponta",
                data: timelineLabels.map(date => dateCounts[date]),
                fill: false,
                borderColor: "#3498db",
                backgroundColor: "#3498db",
                tension: 0.2,
            },
        ],
    };

    return (
        <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
            <header className="header">
                <Link href={`/`}><h2>Főoldal</h2></Link>
                <h1 className="title">Kezelések Statisztikája</h1>
            </header>

            <div style={{ marginBottom: "20px" }}>
                <label>Szűrés típus szerint: </label>
                <select value={sortType} onChange={e => setSortType(e.target.value)}>
                    <option value="all">Összes</option>
                    {Object.keys(TYPE_LABELS).map(type => (
                        <option key={type} value={type}>{TYPE_LABELS[type]}</option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: "40px" }}>
                <Bar data={chartData} options={{
                    responsive: true,
                    plugins: {
                        legend: { position: "top" },
                        title: { display: true, text: "Beavatkozások típus szerint" },
                    },
                }} />
            </div>
            <div style={{ marginBottom: "40px" }}>
                <Line data={timelineData} options={{
                    responsive: true,
                    plugins: {
                        legend: { position: "top" },
                        title: { display: true, text: "Beavatkozások idővonal" },
                    },
                }} />
            </div>

            <h2>Beavatkozások története</h2>
            {loading ? (
                <p>Betöltés...</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {filteredRecords
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map(record => (
                            <li key={record.rid} style={{
                                borderBottom: "1px solid #eee",
                                padding: "10px 0",
                                marginBottom: "8px"
                            }}>
                                <strong>{new Date(record.date).toLocaleDateString("hu-HU")}</strong> - {TYPE_LABELS[record.type] || record.type}
                                {record.note && <div style={{ color: "#555" }}>Megjegyzés: {record.note}</div>}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}