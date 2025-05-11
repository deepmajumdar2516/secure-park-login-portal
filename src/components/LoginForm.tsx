
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateOTP, sendPhoneOTP } from '@/utils/otpGenerator';
import { toast } from '@/components/ui/sonner';

interface LoginFormProps {
  onSubmit: (data: { phone: string, generatedOtp: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhone(value);
    if (error) setError('');
  };

  const validatePhone = (): boolean => {
    if (phone.length < 10) {
      setError('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const handleGenerateOTP = async () => {
    if (!validatePhone()) return;

    try {
      setLoading(true);
      const otp = generateOTP();
      await sendPhoneOTP(phone, otp);
      
      toast.success('OTP sent to your phone', {
        description: 'Please check your phone for the verification code'
      });
      
      onSubmit({ phone, generatedOtp: otp });
    } catch (error) {
      toast.error('Failed to send OTP', {
        description: 'Please try again later'
      });
      console.error('Error generating OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full border-parknSecure-blue/20">
      <CardHeader className="border-b border-parknSecure-lightGray pb-4">
        <CardTitle className="text-2xl font-bold text-parknSecure-blue">
          Login to Your Account
        </CardTitle>
        <CardDescription>
          Enter your phone number to receive a verification code
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
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
              className={`border ${error ? 'border-red-500' : 'border-parknSecure-lightBlue/50'}`}
              disabled={loading}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          
          <Button 
            className="w-full bg-parknSecure-blue hover:bg-parknSecure-darkBlue text-white"
            onClick={handleGenerateOTP}
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Generate OTP'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
