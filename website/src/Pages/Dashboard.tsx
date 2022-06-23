import { useState } from "react";

const Dashboard = () => {
    const [name, setName] = useState<string>()
    return (
        <div>
            <h2>Name:</h2>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value); }} />
            <h2>Street:</h2>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value); }} />
            <h2>town:</h2>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value); }} />
            <h2>region:</h2>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value); }} />
            <h2>IN:</h2>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value); }} />
            <h2>priceLevel:</h2>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value); }} />
            <h2>Jméno:</h2>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value); }} />
            <h2>Jméno:</h2>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value); }} />
            <h2>Jméno:</h2>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value); }} />
        </div>
    )
}

export { Dashboard }