
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, MapPin, Heart, ArrowRight } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    gender: '',
    lookingFor: '',
    location: '',
    bio: '',
    interests: [] as string[],
  });

  const steps = [
    {
      title: "Let's get to know you",
      fields: [
        { name: 'name', label: 'What is your name?', type: 'text', placeholder: 'Enter your full name' },
        { name: 'birthday', label: 'When were you born?', type: 'date', placeholder: 'Select your birthday' },
      ]
    },
    {
      title: "About you & your preferences",
      fields: [
        { 
          name: 'gender', 
          label: 'I am a', 
          type: 'select', 
          options: ['Man', 'Woman', 'Non-binary', 'Other']
        },
        { 
          name: 'lookingFor', 
          label: "I'm interested in", 
          type: 'select', 
          options: ['Men', 'Women', 'Everyone']
        },
      ]
    },
    {
      title: "Where are you located?",
      fields: [
        { name: 'location', label: 'Your location', type: 'text', placeholder: 'Enter your city' },
      ]
    },
    {
      title: "Tell us about yourself",
      fields: [
        { name: 'bio', label: 'Your bio', type: 'textarea', placeholder: 'Share something about yourself...' },
      ]
    },
    {
      title: "What are your interests?",
      fields: [
        { name: 'interests', label: 'Select your interests', type: 'interests' },
      ]
    }
  ];

  const allInterests = [
    'Travel', 'Cooking', 'Reading', 'Sports', 'Music', 'Movies', 'Gaming', 'Art',
    'Fitness', 'Photography', 'Dancing', 'Hiking', 'Yoga', 'Fashion', 'Technology',
    'Writing', 'Gardening', 'Pets', 'Meditation', 'Food'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      
      return { ...prev, interests: newInterests };
    });
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      // Submit form and navigate to the discover page
      navigate('/discover');
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  return (
    <MainLayout hideNav>
      <div className="min-h-screen flex flex-col p-6">
        <div className="flex items-center mb-8">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Profile Setup</h1>
            <p className="text-muted-foreground text-sm">Step {step + 1} of {steps.length}</p>
          </div>
          <div className="w-24 bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
        
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <div className="mb-6">
            <div className="mb-2 flex items-center">
              {step === 0 && <User className="mr-2 text-primary" size={20} />}
              {step === 2 && <MapPin className="mr-2 text-primary" size={20} />}
              {step === 4 && <Heart className="mr-2 text-primary" size={20} />}
              <h2 className="text-xl font-semibold">{steps[step].title}</h2>
            </div>
          </div>
          
          <div className="space-y-6">
            {steps[step].fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label htmlFor={field.name} className="block text-sm font-medium">
                  {field.label}
                </label>
                
                {field.type === 'text' && (
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData] as string}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  />
                )}
                
                {field.type === 'date' && (
                  <input
                    type="date"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData] as string}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  />
                )}
                
                {field.type === 'select' && (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData] as string}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  >
                    <option value="">Select an option</option>
                    {field.options?.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}
                
                {field.type === 'textarea' && (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData] as string}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  />
                )}
                
                {field.type === 'interests' && (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {allInterests.map(interest => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          formData.interests.includes(interest)
                            ? 'bg-primary text-white'
                            : 'bg-secondary text-foreground hover:bg-secondary/80'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
        
        <div className="mt-8 flex space-x-4">
          {step > 0 && (
            <button
              onClick={prevStep}
              className="flex-1 py-3 rounded-lg border border-border text-foreground font-medium button-transition"
            >
              Back
            </button>
          )}
          
          <motion.button
            className={`${
              step > 0 ? 'flex-1' : 'w-full'
            } py-3 rounded-lg bg-primary text-white font-medium flex items-center justify-center space-x-2 button-transition`}
            whileTap={{ scale: 0.98 }}
            onClick={nextStep}
          >
            <span>{step < steps.length - 1 ? 'Continue' : 'Start Matching'}</span>
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Onboarding;
