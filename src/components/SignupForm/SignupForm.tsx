import { useState, FormEvent, ChangeEvent, FC, useCallback, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export type FormValues = {
  id?: string;
  name: string;
  surname: string;
  role: 'pj' | 'ps' | 'dir';
  authentication: boolean;
};

type FormErrors = {
    name?: string;
    surname?: string;
    birthDay?: string;
    role?: string;
    authentication?: string;
  };

const SignUpForm: FC = () => {
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    surname: '',
    role: 'pj',
    authentication: false,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const validateField = useCallback((fieldName: string, value: string ) => {
    const errors: FormErrors = {};
    switch (fieldName) {
      case 'name':
        if (value.trim()=== '') {
          errors.name = 'Name is required';
        }
        break;
      case 'surname':
        if (value.trim()==='') {
          errors.surname = 'Surname is required';
        }
        break;
      case 'role':
        if (!value.trim()) {
          errors.role = 'Role is required';
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
    validateField('name', formData.name);
    validateField('surname', formData.surname);
}, [formData.name, formData.surname, validateField]);

useEffect(() => {
  searchAllErrors();
}, [formData, searchAllErrors]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    const { checked } = event.target as HTMLInputElement;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);

     if (Object.keys(formErrors).length) console.log(formErrors)

    else navigate('/handler');
  
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      {submitted && formErrors.name && <span style={{ color: 'red' }} className="error">{formErrors.name}</span>}
      <br />
      <label>
        Surname:
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
        />
      </label>
      {submitted && formErrors.surname && <span style={{ color: 'red' }} className="error">{formErrors.surname}</span>}
      <br />
      <label>
        Role:
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="pj">PJ</option>
          <option value="ps">PS</option>
          <option value="dir">DIR</option>
        </select>
      </label>
      <br />
      <label>
        Authorization for data processing:
        <input
          type="checkbox"
          name="authentication"
          checked={formData.authentication}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>

    </>
  );
};

export default SignUpForm;
