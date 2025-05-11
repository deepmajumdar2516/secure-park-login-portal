
import React, { useState } from 'react';
import CompanyLogo from './CompanyLogo';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import OtpVerification from './OtpVerification';
import { Button } from '@/components/ui/button';
import { CircleParking, Search, MapPin, Car } from 'lucide-react';

type AuthView = 'welcome' | 'login' | 'signup' | 'verify-login' | 'verify-signup';

interface AuthData {
  phone?: string;
  email?: string;
  phoneOtp?: string;
  emailOtp?: string;
}

const AuthLayout: React.FC = () => {
  const [authView, setAuthView] = useState<AuthView>('welcome');
  const [authData, setAuthData] = useState<AuthData>({});
  
  const resetAuth = () => {
    setAuthView('welcome');
    setAuthData({});
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Left Side - Parking App Illustration (45% width) */}
      <div className="hidden md:block md:w-[45%] relative">
        <div className="absolute inset-0 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-lg">
            <img 
              src="/lovable-uploads/805015d7-a55e-4e85-97e1-d6c238f434fb.png" 
              alt="Simplified Parking Illustration" 
              className="w-full object-contain"
              style={{ 
                filter: 'hue-rotate(120deg) saturate(0.8) brightness(1.05)',
                mixBlendMode: 'multiply'
              }} 
            />
          </div>
        </div>
      </div>
      
      {/* Right Side - Auth Content */}
      <div className="w-full md:w-[55%] p-6 flex flex-col">
        {/* Header with logo and company name */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <CompanyLogo size="md" />
            <h1 className="text-2xl font-bold text-parknSecure-blue">ParkNSecure</h1>
          </div>
          
          {/* Only show company name and logo at the top right */}
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-parknSecure-blue">ParkNSecure</h2>
            <CompanyLogo size="md" />
          </div>
        </div>
        
        {/* Content area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md auth-transition animate-fade-in">
            {authView === 'welcome' && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-parknSecure-blue mb-6">
                  Welcome to ParkNSecure
                </h2>
                <p className="text-parknSecure-gray mb-8">
                  Your comprehensive solution for secure parking management
                </p>
                <div className="flex gap-4 justify-center mb-6">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-parknSecure-blue text-parknSecure-blue hover:bg-parknSecure-blue hover:text-white"
                    onClick={() => setAuthView('login')}
                  >
                    Login to Your Account
                  </Button>
                  <Button 
                    size="lg"
                    className="bg-parknSecure-lightBlue hover:bg-parknSecure-blue text-white"
                    onClick={() => setAuthView('signup')}
                  >
                    Create New Account
                  </Button>
                </div>
                <p className="text-sm text-parknSecure-gray mt-6 px-6 italic">
                  Experience seamless parking solutions with Connekt2Park – where technology meets convenience.
                </p>
              </div>
            )}
            
            {/* Login Form */}
            {authView === 'login' && (
              <LoginForm 
                onSubmit={(data) => {
                  setAuthData({
                    ...authData,
                    phone: data.phone,
                    phoneOtp: data.generatedOtp
                  });
                  setAuthView('verify-login');
                }}
              />
            )}
            
            {/* Signup Form */}
            {authView === 'signup' && (
              <SignupForm 
                onSubmit={(data) => {
                  setAuthData({
                    ...authData,
                    phone: data.phone,
                    email: data.email,
                    phoneOtp: data.phoneOtp,
                    emailOtp: data.emailOtp
                  });
                  setAuthView('verify-signup');
                }}
              />
            )}
            
            {/* OTP Verification */}
            {authView === 'verify-login' && (
              <OtpVerification 
                phone={authData.phone}
                expectedPhoneOtp={authData.phoneOtp}
                onVerified={() => {
                  alert('Login successful!');
                  resetAuth();
                }}
              />
            )}
            
            {authView === 'verify-signup' && (
              <OtpVerification 
                phone={authData.phone}
                email={authData.email}
                expectedPhoneOtp={authData.phoneOtp}
                expectedEmailOtp={authData.emailOtp}
                onVerified={() => {
                  alert('Registration successful!');
                  resetAuth();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
