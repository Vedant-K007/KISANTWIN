'use client';

import React, { useState } from 'react';
import { useFarm, DEMO_USERS, UserProfile } from '../../context/FarmContext';
import {
  ShieldCheck,
  User,
  Building,
  Landmark,
  Phone,
  Lock,
  KeyRound,
  CheckCircle,
  X,
  Sparkles,
  ArrowRight,
  RefreshCw,
  LogOut
} from 'lucide-react';

export const LoginModal: React.FC = () => {
  const {
    currentUser,
    loginModalOpen,
    setLoginModalOpen,
    switchUser,
    showToast
  } = useFarm();

  const [authMode, setAuthMode] = useState<'persona' | 'phone'>('persona');
  const [phoneNumber, setPhoneNumber] = useState<string>('9822041928');
  const [otpStep, setOtpStep] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('4829');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  if (!loginModalOpen) return null;

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpStep) {
      setOtpStep(true);
      showToast(`📩 OTP Code sent to +91 ${phoneNumber}`);
    } else {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setOtpStep(false);
        switchUser('user-01');
        setLoginModalOpen(false);
        showToast('✓ Authentication Successful! Logged in as Rahul Deshmukh.');
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE5DF] max-w-xl w-full shadow-2xl space-y-6 relative overflow-hidden">
        {/* Header Background Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#12372A] via-[#16A878] to-[#65C18C]" />

        {/* Modal Top Header Bar */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#12372A] text-white flex items-center justify-center shadow-md shadow-[#16A878]/20 shrink-0">
              <ShieldCheck className="w-7 h-7 text-[#16A878]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-xl text-[#17231D] tracking-tight">KisanTwin Security & Auth</h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#EAF8F1] text-[#16A878] border border-[#16A878]/30">
                  AES-256 SECURE
                </span>
              </div>
              <p className="text-xs text-[#66756D] font-medium mt-0.5">
                Switch user persona or sign in with your Kisan Twin authorization credentials.
              </p>
            </div>
          </div>

          <button
            onClick={() => setLoginModalOpen(false)}
            className="p-2 text-[#66756D] hover:text-[#17231D] rounded-full hover:bg-[#F5F7F3] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Account Banner */}
        <div className="bg-[#12372A] text-white p-4 rounded-2xl border border-[#1E523F] flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#16A878] text-white font-black text-sm flex items-center justify-center shadow-xs">
              {currentUser.initials}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm text-white">{currentUser.name}</span>
                {currentUser.isVerified && (
                  <span className="text-[9px] font-bold bg-[#16A878]/20 text-[#65C18C] px-2 py-0.2 rounded-full border border-[#16A878]/40">
                    ✓ Verified Aadhaar
                  </span>
                )}
              </div>
              <div className="text-xs text-[#D6E5DE]/80 font-medium">
                {currentUser.phone} • {currentUser.location}
              </div>
            </div>
          </div>

          <div className="text-right text-[10px] text-[#65C18C] font-extrabold uppercase tracking-wider hidden sm:block">
            <span>{currentUser.role.toUpperCase()} MODE</span>
            <div className="text-[9px] text-white/70 font-mono normal-case">{currentUser.farmId}</div>
          </div>
        </div>

        {/* Tab Selection: Persona Switch vs Mobile OTP Sign In */}
        <div className="flex bg-[#F5F7F3] p-1 rounded-2xl border border-[#DCE5DF] text-xs font-extrabold">
          <button
            onClick={() => setAuthMode('persona')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              authMode === 'persona' ? 'bg-white text-[#17231D] shadow-xs' : 'text-[#66756D] hover:text-[#17231D]'
            }`}
          >
            Instant Demo Account Persona Switcher
          </button>
          <button
            onClick={() => setAuthMode('phone')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              authMode === 'phone' ? 'bg-white text-[#17231D] shadow-xs' : 'text-[#66756D] hover:text-[#17231D]'
            }`}
          >
            Mobile OTP / Kisan ID Login
          </button>
        </div>

        {/* TAB 1: INSTANT DEMO PERSONA SWITCHER */}
        {authMode === 'persona' && (
          <div className="space-y-3">
            <div className="text-xs font-extrabold uppercase text-[#66756D] tracking-wider">
              Select Demo Account Persona:
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {DEMO_USERS.map((user) => {
                const isActive = currentUser.id === user.id;
                let roleBadgeColor = 'bg-[#EAF8F1] text-[#16A878] border-[#16A878]/30';
                let Icon = User;
                if (user.role === 'fpo') {
                  roleBadgeColor = 'bg-[#E8F3FF] text-[#2F80ED] border-[#2F80ED]/30';
                  Icon = Building;
                } else if (user.role === 'officer') {
                  roleBadgeColor = 'bg-[#F5F7F3] text-[#12372A] border-[#12372A]/30';
                  Icon = Landmark;
                }

                return (
                  <div
                    key={user.id}
                    onClick={() => {
                      switchUser(user.id);
                      setLoginModalOpen(false);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-[#EAF8F1]/60 border-[#16A878] shadow-xs ring-1 ring-[#16A878]'
                        : 'bg-white border-[#DCE5DF] hover:border-[#16A878] hover:bg-[#F5F7F3]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2.5 rounded-xl ${roleBadgeColor} border`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold text-sm text-[#17231D]">{user.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${roleBadgeColor}`}>
                            {user.role.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-[#66756D] font-medium mt-0.5">{user.location} • {user.fpoName}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {isActive ? (
                        <span className="flex items-center space-x-1 text-xs font-extrabold text-[#16A878] bg-[#EAF8F1] px-3 py-1 rounded-full border border-[#16A878]/30">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>ACTIVE</span>
                        </span>
                      ) : (
                        <button className="text-xs font-bold text-[#12372A] hover:text-[#16A878] bg-[#F5F7F3] hover:bg-[#EAEFEA] px-3 py-1.5 rounded-full border border-[#DCE5DF] transition-all">
                          Switch Account
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: MOBILE OTP / KISAN ID LOGIN */}
        {authMode === 'phone' && (
          <form onSubmit={handlePhoneLogin} className="space-y-4 text-xs">
            {!otpStep ? (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#17231D]">
                  Enter Registered Mobile Number or Kisan ID:
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#66756D] font-extrabold text-sm">
                    +91
                  </span>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="98220 41928"
                    className="w-full pl-14 pr-4 py-3 rounded-2xl border border-[#DCE5DF] text-sm font-extrabold text-[#17231D] focus:outline-hidden focus:border-[#16A878] bg-[#F5F7F3]"
                  />
                </div>
                <p className="text-[11px] text-[#66756D]">
                  A 4-digit security OTP will be sent to your Aadhaar-linked mobile phone.
                </p>
                <button
                  type="submit"
                  className="w-full bg-[#16A878] hover:bg-[#128F66] text-white font-extrabold py-3 rounded-2xl text-xs shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Send OTP Verification Code</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-[#EAF8F1] p-3 rounded-2xl border border-[#16A878]/30 text-[#12372A]">
                  OTP sent to <strong>+91 {phoneNumber}</strong>. Please enter the 4-digit code below:
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#17231D] mb-1">4-Digit Security PIN / OTP:</label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    maxLength={4}
                    className="w-full tracking-widest text-center py-3 rounded-2xl border border-[#DCE5DF] text-xl font-black text-[#17231D] focus:outline-hidden focus:border-[#16A878] bg-[#F5F7F3]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full bg-[#12372A] hover:bg-[#1A4A39] text-white font-extrabold py-3 rounded-2xl text-xs shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isVerifying ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-[#16A878]" />
                  ) : (
                    <KeyRound className="w-4 h-4 text-[#16A878]" />
                  )}
                  <span>{isVerifying ? 'Verifying Credentials...' : 'Verify & Log In to KisanTwin'}</span>
                </button>
              </div>
            )}
          </form>
        )}

        {/* Footer Security Badges */}
        <div className="pt-3 border-t border-[#DCE5DF] flex items-center justify-between text-[11px] text-[#66756D] font-medium">
          <div className="flex items-center space-x-2">
            <Lock className="w-3.5 h-3.5 text-[#16A878]" />
            <span>Encrypted Session • Govt. Agri Stack Interoperable</span>
          </div>
          <button
            onClick={() => {
              showToast('Logged out of active session.');
              setLoginModalOpen(false);
            }}
            className="flex items-center space-x-1 text-[#E45756] hover:underline font-bold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
