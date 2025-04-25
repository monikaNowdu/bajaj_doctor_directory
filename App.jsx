import { useState } from 'react';
import './App.css';
import Data from './doctors.json';

function App() {
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState('');
  const [doctortype, setDoctortype] = useState([]);

  const handleTypeChange = (value) => {
    if (doctortype.includes(value)) {
      setDoctortype(doctortype.filter(type => type !== value));
    } else {
      setDoctortype([...doctortype, value]);
    }
  };

  const filteredDoctors = Data.filter((doc) =>
    doc.name.toUpperCase().includes(search.toUpperCase()) &&
    (mode === '' || 
      (mode === 'Video' && doc.video_consult) ||
      (mode === 'In-person' && doc.in_clinic)
    ) &&
    (doctortype.length === 0 || doctortype.some(type => doc.specialities.map(s => s.name).includes(type)))
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Doctor Directory</h2>

      <input
        style={{ width: '470px', height: '40px', margin: '10px' }}
        type="text"
        placeholder="Search doctor"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h4>Consultation Mode</h4>
      <label>
        <input
          type="radio"
          name="mode"
          value="Video"
          onChange={(e) => setMode(e.target.value)}
        />
        Video
      </label>

      <label style={{ marginLeft: '20px' }}>
        <input
          type="radio"
          name="mode"
          value="In-person"
          onChange={(e) => setMode(e.target.value)}
        />
        In-person
      </label>

      <label style={{ marginLeft: '20px' }}>
        <input
          type="radio"
          name="mode"
          value=""
          onChange={() => setMode('')}
        />
        All
      </label>

      <br /><br />
      <h4>Specialization</h4>

      <label>
        <input
          type="checkbox"
          value="Dentist"
          checked={doctortype.includes("Dentist")}
          onChange={() => handleTypeChange("Dentist")}
        />
        Dentist
      </label>

      <label>
        <input
          type="checkbox"
          value="Homeopath"
          checked={doctortype.includes("Homeopath")}
          onChange={() => handleTypeChange("Homeopath")}
        />
        Homeopath
      </label>

      <label>
        <input
          type="checkbox"
          value="Gynaecologist and Obstetrician"
          checked={doctortype.includes("Gynaecologist and Obstetrician")}
          onChange={() => handleTypeChange("Gynaecologist and Obstetrician")}
        />
        Gynaecologist and Obstetrician
      </label>


      <br /><br />
      {filteredDoctors.map((doc) => (
        <div className="format" key={doc.id}>
          <div style={{
            border: '1px solid gray',
            margin: '10px',
            padding: '15px',
            borderRadius: '8px',
            width: '530px',
            display: 'flex',
            alignItems: 'flex-start'
          }}>
            <img 
              src={doc.photo} 
              alt={doc.name} 
              style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px', objectFit: 'cover' }}
            />
            <div>
              <h3>{doc.name}</h3>
              <p><strong>Experience:</strong> {doc.experience}</p>
              <p><strong>Consultation Fee:</strong> {doc.fees}</p>
              <p><strong>Clinic:</strong> {doc.clinic.name}</p>
              <p><strong>City:</strong> {doc.clinic.address.city}</p>
              <p><strong>Languages:</strong> {doc.languages.join(', ')}</p>
              <p><strong>Specialities:</strong> {doc.specialities.map(s => s.name).join(', ')}</p>
              <p><strong>Consultation Modes:</strong> 
                {doc.video_consult ? ' Video ' : ''} 
                {doc.in_clinic ? ' In-person' : ''}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
