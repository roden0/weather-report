import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export interface ContactFormData {
  name: string;
  dateOfBirth: string;
  city: string;
  email: string;
  phone: string;
}

export interface ContactFormErrors {
  [key: string]: string;
}

export interface UseContactFormReturn {
  formData: ContactFormData;
  errors: ContactFormErrors;
  submitted: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
}

export const useContactForm = (): UseContactFormReturn => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    dateOfBirth: '',
    city: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    // Check required fields
    if (!formData.name.trim()) newErrors.name = t('contact.errors.required');
    if (!formData.dateOfBirth) newErrors.dateOfBirth = t('contact.errors.required');
    if (!formData.city.trim()) newErrors.city = t('contact.errors.required');

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.errors.invalidEmail');
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = t('contact.errors.required');
    } else if (!/^\+?\(?\d{3}\)?[-\s.]?\d{3}[-\s.]?\d{4,6}$/.test(formData.phone)) {
      newErrors.phone = t('contact.errors.invalidPhone');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
      resetForm();
      setTimeout(() => {
        setSubmitted(false);
      }, 2000);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      dateOfBirth: '',
      city: '',
      email: '',
      phone: '',
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    submitted,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
