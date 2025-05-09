
import React, { useState } from 'react';
import CompanyLogo from './CompanyLogo';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import OtpVerification from './OtpVerification';
import { Button } from '@/components/ui/button';
import { CircleParking, Search, MapPin } from 'lucide-react';

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
      {/* Left Side - Parking App Mockup (45% width) */}
      <div className="hidden md:block md:w-[45%] relative">
        <div 
          className="absolute inset-0 bg-parknSecure-lightGray"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Mobile Phone Mockup */}
            <div className="relative w-[320px] h-[650px] bg-black rounded-[40px] p-3 shadow-xl border-8 border-black">
              {/* Status Bar */}
              <div className="absolute top-0 left-0 right-0 h-7 bg-gray-700 rounded-t-[32px] flex items-center justify-between px-6">
                <div className="text-white text-xs font-medium">9:41</div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* App Content */}
              <div className="w-full h-full bg-[#e8f1f5] rounded-[32px] pt-8 flex flex-col">
                {/* Search Bar */}
                <div className="px-4 mb-6">
                  <div className="bg-white h-12 rounded-full flex items-center px-4 shadow-md">
                    <div className="w-5 h-5 rounded-full border border-gray-300 mr-3"></div>
                    <span className="text-gray-400">Search for parking...</span>
                  </div>
                </div>
                
                {/* Map Area */}
                <div className="flex-1 relative bg-[#e8f1f5]">
                  {/* Map Grid Lines */}
                  <div className="absolute inset-0 grid grid-cols-3">
                    <div className="border-r border-gray-300/50"></div>
                    <div className="border-r border-gray-300/50"></div>
                  </div>
                  <div className="absolute inset-0 grid grid-rows-3">
                    <div className="border-b border-gray-300/50"></div>
                    <div className="border-b border-gray-300/50"></div>
                  </div>
                  
                  {/* Parking Icons */}
                  <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 rounded-full bg-parknSecure-blue flex items-center justify-center text-white font-bold shadow-lg">
                      P
                    </div>
                  </div>
                  
                  <div className="absolute bottom-1/4 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-md border-2 border-white">
                    </div>
                  </div>
                  
                  <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 rounded-full bg-parknSecure-green flex items-center justify-center text-white font-bold shadow-lg">
                      P
                    </div>
                  </div>
                </div>
                
                {/* Bottom Nav Bar */}
                <div className="h-16 bg-white rounded-b-[28px] flex items-center justify-around px-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-parknSecure-darkBlue flex items-center justify-center text-white">
                      <MapPin size={20} />
                    </div>
                    <span className="text-xs text-parknSecure-darkBlue font-medium mt-1">Map</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                      <Search size={20} className="text-gray-400" />
                    </div>
                    <span className="text-xs text-gray-400 mt-1">Search</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                      <CircleParking size={20} className="text-gray-400" />
                    </div>
                    <span className="text-xs text-gray-400 mt-1">Bookings</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>
                    </div>
                    <span className="text-xs text-gray-400 mt-1">Profile</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Company Info Below Phone */}
            <div className="text-parknSecure-darkBlue text-center mt-8">
              <h2 className="text-2xl font-bold mb-2">ParkNSecure Mobile App</h2>
              <p className="text-lg">Find and book parking spots with ease</p>
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
