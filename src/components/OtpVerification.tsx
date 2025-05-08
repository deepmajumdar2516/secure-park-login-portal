
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { verifyOTP } from '@/utils/otpGenerator';
import { toast } from '@/components/ui/sonner';

interface OtpVerificationProps {
  phone?: string;
  email?: string;
  expectedPhoneOtp?: string;
  expectedEmailOtp?: string;
  onVerified: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  phone,
  email,
  expectedPhoneOtp,
  expectedEmailOtp,
  onVerified
}) => {
  const [phoneOtp, setPhoneOtp] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    phone?: string;
    email?: string;
  }>({});

  const isSignup = !!email && !!expectedEmailOtp;

  const handlePhoneOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setPhoneOtp(value);
      if (errors.phone) setErrors({ ...errors, phone: undefined });
    }
  };

  const handleEmailOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setEmailOtp(value);
      if (errors.email) setErrors({ ...errors, email: undefined });
    }
  };

  const validateInputs = (): boolean => {
    const newErrors: { phone?: string; email?: string } = {};
    
    if (!phoneOtp || phoneOtp.length !== 6) {
      newErrors.phone = 'Please enter a valid 6-digit OTP';
    }
    
    if (isSignup && (!emailOtp || emailOtp.length !== 6)) {
      newErrors.email = 'Please enter a valid 6-digit OTP';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerifyOTP = () => {
    if (!validateInputs()) return;

    try {
      setLoading(true);
      
      const isPhoneOtpValid = verifyOTP(phoneOtp, expectedPhoneOtp || '');
      
      if (!isPhoneOtpValid) {
        setErrors({ ...errors, phone: 'Invalid OTP' });
        toast.error('Invalid phone OTP', {
          description: 'The code you entered is incorrect'
        });
        setLoading(false);
        return;
      }
      
      if (isSignup) {
        const isEmailOtpValid = verifyOTP(emailOtp, expectedEmailOtp || '');
        
        if (!isEmailOtpValid) {
          setErrors({ ...errors, email: 'Invalid OTP' });
          toast.error('Invalid email OTP', {
            description: 'The code you entered is incorrect'
          });
          setLoading(false);
          return;
        }
      }
      
      toast.success(isSignup ? 'Registration successful!' : 'Login successful!', {
        description: 'Welcome to ParkNSecure'
      });
      
      setTimeout(() => {
        onVerified();
      }, 1500);
    } catch (error) {
      toast.error('Verification failed', {
        description: 'Please try again later'
      });
      console.error('Error verifying OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-parknSecure-darkBlue">
          Verify Your Identity
        </CardTitle>
        <CardDescription>
          {isSignup 
            ? 'Enter the verification codes sent to your phone and email'
            : 'Enter the verification code sent to your phone'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="phoneOtp" className="text-sm font-medium text-parknSecure-gray">
              Phone Verification Code
            </label>
            <div className="space-y-1">
              <p className="text-xs text-parknSecure-gray">{phone}</p>
              <Input
                id="phoneOtp"
                placeholder="Enter 6-digit code"
                value={phoneOtp}
                onChange={handlePhoneOtpChange}
                className={`border ${errors.phone ? 'border-red-500' : 'border-gray-300'} text-center text-lg tracking-widest`}
                maxLength={6}
                disabled={loading}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>
          
          {isSignup && (
            <div className="space-y-2">
              <label htmlFor="emailOtp" className="text-sm font-medium text-parknSecure-gray">
                Email Verification Code
              </label>
              <div className="space-y-1">
                <p className="text-xs text-parknSecure-gray">{email}</p>
                <Input
                  id="emailOtp"
                  placeholder="Enter 6-digit code"
                  value={emailOtp}
                  onChange={handleEmailOtpChange}
                  className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-center text-lg tracking-widest`}
                  maxLength={6}
                  disabled={loading}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-parknSecure-blue hover:bg-parknSecure-darkBlue"
          onClick={handleVerifyOTP}
          disabled={loading}
        >
          {loading ? 'Verifying...' : isSignup ? 'Register' : 'Login'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OtpVerification;
