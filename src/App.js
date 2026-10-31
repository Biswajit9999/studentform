import { useState } from "react";
import "./App.css";

const FIELDS = [
  { name: "name", label: "Name", type: "text", placeholder: "Enter name" },
  { name: "username", label: "Username", type: "text", placeholder: "Enter username" },
  { name: "college", label: "College", type: "text", placeholder: "Enter college" },
  { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
  { name: "password", label: "Password", type: "password", placeholder: "Enter password" },
  { name: "address", label: "Address", type: "text", placeholder: "Enter address" },
];

const INITIAL_VALUES = {
  name: "",
  username: "",
  college: "",
  email: "",
  password: "",
  address: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// returns an error message for one field, or "" when the field is valid
const validateField = (name, value) => {
  switch (name) {
    case "name":
      return value.trim() ? "" : "Name is required";
    case "college":
      return value.trim() ? "" : "College is required";
    case "address":
      return value.trim() ? "" : "Address is required";
    case "username":
      return /[A-Z]/.test(value) ? "Username must be lowercase only" : "";
    case "email":
      return EMAIL_REGEX.test(value.trim()) ? "" : "Enter a valid email address";
    case "password":
      return value.length >= 8 ? "" : "Password must be at least 8 characters";
    default:
      return "";
  }
};

function App() {
  const [formData, setFormData] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // validate the field being edited, so its error appears/disappears live
    const message = validateField(name, value);
    setErrors((prev) => {
      const next = { ...prev };
      if (message) {
        next[name] = message;
      } else {
        delete next[name];
      }
      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    FIELDS.forEach(({ name }) => {
      const message = validateField(name, formData[name]);
      if (message) nextErrors[name] = message;
    });

    setErrors(nextErrors);

    // do not submit when anything is invalid
    if (Object.keys(nextErrors).length > 0) return;

    console.log("Registered:", formData);
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Student Registration Form</h1>

        <form onSubmit={handleSubmit} noValidate>
          {FIELDS.map(({ name, label, type, placeholder }) => (
            <div className="field" key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
              />
              {errors[name] && <p className="error">{errors[name]}</p>}
            </div>
          ))}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default App;