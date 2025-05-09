
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
      <div className="hidden md:block md:w-[45%] relative bg-gradient-to-br from-parknSecure-blue/10 to-parknSecure-lightBlue/10">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-lg">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-parknSecure-blue/20">
              <img 
                src="/lovable-uploads/805015d7-a55e-4e85-97e1-d6c238f434fb.png" 
                alt="Parking Management Illustration" 
                className="w-full object-contain"
                style={{ filter: 'hue-rotate(190deg) saturate(1.2)' }} 
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-parknSecure-darkBlue/80 to-transparent">
                <div className="flex items-center gap-2 text-white">
                  <CircleParking className="h-5 w-5" />
                  <span className="font-medium">Connekt2Park</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Auth Content */}
      <div className="w-full md:w-[55%] p-6 flex flex-col">
        {/* Header with logo and company name */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <CompanyLogo size="md" />
            <h1 className="text-2xl font-bold text-parknSecure-darkBlue">ParkNSecure</h1>
          </div>
          
          {/* Only show these buttons on the welcome screen */}
          {authView === 'welcome' && (
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="border-parknSecure-blue text-parknSecure-blue hover:bg-parknSecure-blue hover:text-white"
                onClick={() => setAuthView('login')}
              >
                Login
              </Button>
              <Button 
                className="bg-parknSecure-blue hover:bg-parknSecure-darkBlue text-white"
                onClick={() => setAuthView('signup')}
              >
                Sign Up
              </Button>
            </div>
          )}
          
          {/* Show back button on other screens */}
          {authView !== 'welcome' && (
            <Button 
              variant="ghost" 
              className="text-parknSecure-gray"
              onClick={resetAuth}
            >
              Back to Home
            </Button>
          )}
        </div>
        
        {/* Content area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md auth-transition animate-fade-in">
            {authView === 'welcome' && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-parknSecure-darkBlue mb-6">
                  Welcome to ParkNSecure
                </h2>
                <p className="text-parknSecure-gray mb-4">
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
                    className="bg-parknSecure-blue hover:bg-parknSecure-darkBlue text-white"
                    onClick={() => setAuthView('signup')}
                  >
                    Create New Account
                  </Button>
                </div>
                <p className="text-sm italic text-parknSecure-darkBlue mt-10 px-6">
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
