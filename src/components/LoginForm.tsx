
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold" style={{ color: "#008080" }}>
          Login to Your Account
        </CardTitle>
        <CardDescription style={{ color: "#50C878" }}>
          Enter your phone number to receive a verification code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium" style={{ color: "#50C878" }}>
              Phone Number
            </label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={handlePhoneChange}
              className={`border ${error ? 'border-red-500' : 'border-gray-300'}`}
              disabled={loading}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          
          <Button 
            className="w-full text-white hover:opacity-90"
            onClick={handleGenerateOTP}
            disabled={loading}
            style={{ backgroundColor: "#50C878" }}
          >
            {loading ? 'Sending OTP...' : 'Generate OTP'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
