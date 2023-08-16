import { useState } from 'react'


export default function FormManager({ children, initialValues, onSubmit }) {
    const [formData, setFormData] = useState(initialValues);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit(formData);
    };
  
    return children({ formData, handleChange, handleSubmit });
  }
  
