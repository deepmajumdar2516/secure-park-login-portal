
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
              alt="Parking Management Illustration" 
              className="w-full object-contain"
              style={{ filter: 'hue-rotate(190deg)' }} // Adjust hue to match the blue brand color
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
          </div>
          
          {/* Company name in top right corner */}
          <h1 className="text-2xl font-bold" style={{ color: "#008080" }}>ParkNSecure</h1>
          
          {/* Back button on non-welcome screens */}
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
                <h2 className="text-3xl font-bold mb-6" style={{ color: "#008080" }}>
                  Welcome to ParkNSecure
                </h2>
                <p className="text-parknSecure-gray mb-8">
                  Your comprehensive solution for secure parking management
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white"
                    onClick={() => setAuthView('login')}
                    style={{ borderColor: "#50C878", color: "#50C878" }}
                  >
                    Login to Your Account
                  </Button>
                  <Button 
                    size="lg"
                    onClick={() => setAuthView('signup')}
                    style={{ backgroundColor: "#50C878" }}
                    className="hover:bg-emerald-600 text-white"
                  >
                    Create New Account
                  </Button>
                </div>
                <p className="mt-6 text-sm" style={{ color: "#50C878" }}>
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
