import {
  useState,
  FormEvent,
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
} from "react";
import useFetchUsers from "../../hooks/useFetchUsers";
import { User } from "../../types/User";
export type FormValues = {
  id?: string;
  name: string;
  surname: string;
  role: "pj" | "ps" | "dir";
  authentication: boolean;
};

type FormErrors = {
  name?: string;
  surname?: string;
  birthDay?: string;
  role?: string;
  authentication?: string;
};

type SignupProps = {
  setUser: (user: User | null) => void;
  user: User | null;
};
const SignUpForm = ({ user, setUser }: SignupProps) => {
  const { postRequest, patchRequest } = useFetchUsers(
    "http://localhost:3001/users"
  );

  const [formData, setFormData] = useState<FormValues>({
    name: "",
    surname: "",
    role: "pj",
    authentication: false,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateField = useCallback((fieldName: string, value: string) => {
    const errors: FormErrors = {};
    switch (fieldName) {
      case "name":
        if (value.trim() === "") {
          errors.name = "Name is required";
        }
        break;
      case "surname":
        if (value.trim() === "") {
          errors.surname = "Surname is required";
        }
        break;
      case "role":
        if (!value.trim()) {
          errors.role = "Role is required";
        }
        break;
      default:
        break;
    }

    setFormErrors((prevErrors) => ({ ...prevErrors, ...errors }));
    //return Object.keys(errors).length === 0;
  }, []);

  const searchAllErrors = useCallback(() => {
    setFormErrors({});
    validateField("name", formData.name);
    validateField("surname", formData.surname);
  }, [formData.name, formData.surname, validateField]);

  useEffect(() => {
    searchAllErrors();
  }, [formData, searchAllErrors]);

  useEffect(() => {
    console.log(user);
    user && setFormData(user);
  }, [user]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    const { checked } = event.target as HTMLInputElement;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleReset = () => {
    setFormData({
      name: "",
      surname: "",
      role: "pj",
      authentication: false,
    });
    setFormErrors({});
    setSubmitted(false);
    setUser(null);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (Object.keys(formErrors).length === 0) {
      if (!user) {
        postRequest(formData);
      } else {
        patchRequest(user.id!, formData);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="text-white">
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />

          {submitted && formErrors.name && (
            <span style={{ color: "red" }} className="error">
              {formErrors.name}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Surname:</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="form-control"
          />
          {submitted && formErrors.surname && (
            <span style={{ color: "red" }} className="error">
              {formErrors.surname}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Role:</label>
          <select
            className="form-select"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="pj">PJ</option>
            <option value="ps">PS</option>
            <option value="dir">DIR</option>
          </select>
        </div>
        <br />
        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="authentication"
              checked={formData.authentication}
              onChange={handleChange}
            />
            <label className="form-check-label">
              Authorization for data processing:
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-warning">
          {user ? "Update" : "Enter"}
        </button>
        <button type="button" className="btn btn-danger" onClick={handleReset}>
          Reset
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
