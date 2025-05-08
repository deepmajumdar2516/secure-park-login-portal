
import React, { useState } from 'react';
import CompanyLogo from './CompanyLogo';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import OtpVerification from './OtpVerification';
import { Button } from '@/components/ui/button';

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
      {/* Left Side - Image (45% width) */}
      <div className="hidden md:block md:w-[45%] relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&w=1000&q=80")'
          }}
        >
          <div className="absolute inset-0 bg-parknSecure-darkBlue/40 flex items-center justify-center">
            <div className="text-white text-center p-8">
              <h2 className="text-3xl font-bold mb-4">Secure Parking Solutions</h2>
              <p className="text-xl">Manage your parking spaces with confidence</p>
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
                <p className="text-parknSecure-gray mb-8">
                  Your comprehensive solution for secure parking management
                </p>
                <div className="flex gap-4 justify-center">
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
              </div>
            )}
            
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
