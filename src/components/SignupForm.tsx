
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateOTP, sendPhoneOTP, sendEmailOTP } from '@/utils/otpGenerator';
import { toast } from '@/components/ui/sonner';

interface SignupFormProps {
  onSubmit: (data: {
    phone: string,
    email: string,
    phoneOtp: string,
    emailOtp: string
  }) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    phone?: string;
    email?: string;
  }>({});

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhone(value);
    if (errors.phone) setErrors({ ...errors, phone: undefined });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) setErrors({ ...errors, email: undefined });
  };

  const validateInputs = (): boolean => {
    const newErrors: { phone?: string; email?: string } = {};
    
    if (phone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerateOTP = async () => {
    if (!validateInputs()) return;

    try {
      setLoading(true);
      
      // Generate OTPs
      const phoneOtp = generateOTP();
      const emailOtp = generateOTP();
      
      // Send OTPs
      await Promise.all([
        sendPhoneOTP(phone, phoneOtp),
        sendEmailOTP(email, emailOtp)
      ]);
      
      toast.success('Verification codes sent', {
        description: 'Please check your phone and email for the verification codes'
      });
      
      onSubmit({
        phone,
        email,
        phoneOtp,
        emailOtp
      });
    } catch (error) {
      toast.error('Failed to send verification codes', {
        description: 'Please try again later'
      });
      console.error('Error generating OTPs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-parknSecure-darkBlue">
          Create Your Account
        </CardTitle>
        <CardDescription>
          Enter your details to receive verification codes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-parknSecure-gray">
              Phone Number
            </label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={handlePhoneChange}
              className={`border ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              disabled={loading}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-parknSecure-gray">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              disabled={loading}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <Button 
            className="w-full bg-parknSecure-blue hover:bg-parknSecure-darkBlue"
            onClick={handleGenerateOTP}
            disabled={loading}
          >
            {loading ? 'Sending Verification Codes...' : 'Generate Verification Codes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
