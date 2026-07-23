'use client'

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import RPNInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DemandeDevis() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [formValues, setFormValues] = useState({
    fullName: '',
    company: '',
    role: '',
    email: '',
    confirmEmail: '',
    phone: '',
    mission: '',
    details: '',
  });

  const showToast = Boolean(uploadMessage);

  useEffect(() => {
    if (!uploadMessage) return;

    const timer = window.setTimeout(() => {
      setUploadMessage('');
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [uploadMessage]);

  const handleFile = (file) => {
    if (!file) return;

    if (file.size > 18 * 1024 * 1024) {
      setUploadMessage('Le fichier dépasse la limite de 18 Mo.');
      return;
    }

    setSelectedFile(file);
    setUploadMessage(`Fichier sélectionné : ${file.name}`);
  };

  const handleFileChange = (event) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name === 'from_name' ? 'fullName' : name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requiredFields = [
      formValues.fullName,
      formValues.company,
      formValues.role,
      formValues.email,
      formValues.confirmEmail,
      formValues.phone,
      formValues.mission,
      formValues.details,
    ];

    if (requiredFields.some((value) => !String(value).trim())) {
      setUploadMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (formValues.email !== formValues.confirmEmail) {
      setUploadMessage('Les adresses e-mail ne correspondent pas.');
      return;
    }

    if (!selectedFile) {
      setUploadMessage('Veuillez joindre un fichier avant d’envoyer la demande.');
      return;
    }

    setIsUploading(true);
    setUploadMessage('');

    try {
      const requestFormData = new FormData();
      requestFormData.append('file', selectedFile);
      requestFormData.append('fullName', formValues.fullName);
      requestFormData.append('company', formValues.company);
      requestFormData.append('role', formValues.role);
      requestFormData.append('email', formValues.email);
      requestFormData.append('phone', formValues.phone);
      requestFormData.append('mission', formValues.mission);
      requestFormData.append('details', formValues.details);

      const response = await fetch('/api/send-devis', {
        method: 'POST',
        body: requestFormData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Échec de l’envoi de la demande.');
      }

      setUploadMessage(`Votre demande a bien été envoyée avec la pièce jointe ${selectedFile.name}.`);
      setSelectedFile(null);
      setFormValues({
        fullName: '',
        company: '',
        role: '',
        email: '',
        confirmEmail: '',
        phone: '',
        mission: '',
        details: '',
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setUploadMessage(error.message || 'Une erreur est survenue pendant l’envoi.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Head>
        <title>DEMANDE DE DEVIS - EMTP</title>
      </Head>

      <div className="min-h-screen bg-white font-sans flex flex-col">
        <Navbar />

        <main className="grow py-16 px-4 md:px-10 lg:px-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B2545] uppercase mb-3 tracking-tight">
              DEMANDE DE DEVIS
            </h1>

            <div className="text-sm mb-16 flex items-center gap-2 text-gray-600 border-b border-gray-100 pb-4">
              <Link href="/" className="hover:text-[#0B2545]">ACCUEIL</Link>
              <span>|</span>
              <span className="text-[#F5A623] font-medium uppercase">Demande de devis</span>
            </div>

            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputField label="Votre Nom et Prénom *" name="from_name" value={formValues.fullName} onChange={handleChange} />
                <InputField label="Votre entreprise ou votre particulier *" name="company" value={formValues.company} onChange={handleChange} />
              </div>

              <InputField label="Vous êtes *" name="role" value={formValues.role} onChange={handleChange} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputField label="Votre adresse de Email *" type="email" name="email" value={formValues.email} onChange={handleChange} />
                <InputField label="Confirm Email *" type="email" name="confirmEmail" value={formValues.confirmEmail} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PhoneField
                  value={formValues.phone}
                  onChange={(value) => setFormValues((prev) => ({ ...prev, phone: value || '' }))}
                />
                <InputField label="Mission *" name="mission" value={formValues.mission} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="attachment" className="block text-sm font-bold text-[#0B2545] mb-3">Veuillez nous envoyer les données d&apos;entrée :</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-12 text-center bg-[#FAFAFA] hover:border-[#F5A623] cursor-pointer transition-all ${
                    isDragging ? 'border-[#F5A623] bg-[#FFF7E8]' : 'border-gray-300'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    id="attachment"
                    type="file"
                    name="attachment"
                    className="hidden"
                    accept="*/*"
                    onChange={handleFileChange}
                  />
                  <p className="text-sm text-gray-600">
                    {selectedFile
                      ? `Fichier sélectionné : ${selectedFile.name}`
                      : 'Click or drag a file to this area to upload. (Max 18 MB)'}
                  </p>
                </div>

                {isUploading && (
                  <div className="mt-4 flex justify-center">
                    <div className="flex items-center gap-3 rounded-xl border border-[#0B2545]/10 bg-[#0B2545]/5 px-4 py-3 shadow-sm">
                      <div className="h-6 w-6 animate-spin rounded-sm border-4 border-[#0B2545] border-t-transparent" />
                      <p className="text-sm font-medium text-[#0B2545]">Envoi en cours...</p>
                    </div>
                  </div>
                )}

                {showToast && uploadMessage && !uploadMessage.startsWith('Fichier sélectionné') && (
                  <div className="mt-4 flex justify-center">
                    <div
                      className={`w-full max-w-2xl rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm ${
                        uploadMessage.includes('bien été envoyée')
                          ? 'border-green-200 bg-green-50 text-green-800'
                          : 'border-red-200 bg-red-50 text-red-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                            uploadMessage.includes('bien été envoyée')
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {uploadMessage.includes('bien été envoyée') ? '✓' : '!'}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">
                            {uploadMessage.includes('bien été envoyée') ? 'Succès' : 'Information'}
                          </p>
                          <p className="mt-1 text-sm">{uploadMessage}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="details" className="block text-sm font-bold text-[#0B2545] uppercase mb-3">La demande de devis concerne : *</label>
                <textarea
                  id="details"
                  name="details"
                  value={formValues.details}
                  onChange={handleChange}
                  className="w-full h-40 p-4 border border-gray-300 focus:ring-2 focus:ring-[#F5A623] outline-none rounded-sm"
                  required
                ></textarea>
              </div>

              <div className="text-left pt-6">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="bg-[#0B2545] text-white py-4 px-12 font-bold text-sm uppercase hover:bg-[#F5A623] transition-all duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isUploading ? 'Envoi en cours...' : 'Envoyer la demande'}
                </button>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

function InputField({ label, type = 'text', name, value, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-bold text-[#0B2545] mb-3">{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-[#F5A623] outline-none rounded-sm"
      />
    </div>
  );
}

function PhoneField({ value, onChange }) {
  return (
    <div>
      <label htmlFor="phone" className="block text-sm font-bold text-[#0B2545] mb-3">Votre numéro de téléphone *</label>
      <RPNInput
        international
        defaultCountry="CI"
        value={value}
        onChange={onChange}
        numberInputProps={{
          id: 'phone',
          name: 'phone',
          placeholder: '07 20 28 79 79',
          pattern: '[0-9()+\\-\\s]{6,}',
          title: 'Veuillez saisir un numéro de téléphone valide.',
          className: 'w-full p-3 outline-none bg-transparent',
          required: true,
        }}
        countrySelectProps={{ name: 'phoneCountry', 'aria-label': 'Indicatif du pays' }}
        className="emtp-phone-input flex items-center border border-gray-300 rounded-sm px-3 focus-within:ring-2 focus-within:ring-[#F5A623]"
      />
    </div>
  );
}