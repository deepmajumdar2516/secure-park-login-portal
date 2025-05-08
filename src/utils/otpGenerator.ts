
/**
 * Generates a random OTP of specified length
 * @param length Length of the OTP to generate
 * @returns A random numeric OTP
 */
export const generateOTP = (length: number = 6): string => {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

/**
 * Simulates sending OTP to phone number
 * In a real app, this would integrate with SMS service
 */
export const sendPhoneOTP = (phoneNumber: string, otp: string): Promise<boolean> => {
  console.log(`[DEV] Sending OTP ${otp} to phone: ${phoneNumber}`);
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
};

/**
 * Simulates sending OTP to email
 * In a real app, this would integrate with email service
 */
export const sendEmailOTP = (email: string, otp: string): Promise<boolean> => {
  console.log(`[DEV] Sending OTP ${otp} to email: ${email}`);
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
};

/**
 * Simulates verifying OTP
 * In a real app, this would validate against stored OTPs
 */
export const verifyOTP = (
  providedOTP: string,
  expectedOTP: string
): boolean => {
  return providedOTP === expectedOTP;
};
