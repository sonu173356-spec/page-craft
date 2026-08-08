'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store';
import {
  User,
  Feather,
  Mail,
  Lock,
  Globe,
  BookOpen,
  Save,
  CheckCircle2,
  AlertCircle,
  Share2,
  Sparkles,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AuthorSettingsPage() {
  const { user } = useAuthStore();

  const [profile, setProfile] = useState({
    name: user?.name || 'Eleanor Vance',
    title: 'Author & Novelist',
    penName: 'E. V. Vance',
    email: user?.email || 'eleanor@pagecraft.com',
    genres: 'Fiction, Mystery',
    bio: 'Bestselling author of suspenseful psychological thrillers and atmospheric mystery novels.',
    longBio:
      'Eleanor Vance has spent over a decade crafting intricate, suspenseful psychological thrillers that have captivated readers worldwide. Drawing inspiration from classical gothic literature and modern noir, her works explore memory, identity, and the shadows of human nature.',
    website: 'https://eleanorvancebooks.com',
    twitter: 'https://twitter.com/eleanorvance_author',
    instagram: 'https://instagram.com/eleanorvance.writes',
    linkedin: 'https://linkedin.com/in/eleanor-vance',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      toast.success('Author profile updated successfully!');
    }, 600);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!securityData.newPassword || securityData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters.');
      return;
    }
    if (securityData.newPassword !== securityData.confirmNewPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    toast.success('Security settings and password updated successfully.');
    setSecurityData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 text-[#171717]"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-[#171717]">
            Author Profile & Account Settings
          </h1>
          <p className="text-sm text-[#666666] mt-1">
            Manage your public publishing identity, author title, biography, and credentials.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Card & Bio Form */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSaveProfile} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DED3] shadow-2xs space-y-6">
            <div className="flex items-center gap-2 border-b border-[#E5DED3] pb-4">
              <Sparkles className="w-5 h-5 text-[#8B1A1A]" />
              <h2 className="font-playfair text-xl font-bold text-[#171717]">
                Public Author Identity
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                  Author Legal Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2.5 bg-[#FBF8F2] border border-[#E5DED3] rounded-xl text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                  Author Title <span className="text-[#8B1A1A]">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Author & Novelist / Business Author"
                  value={profile.title}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2.5 bg-[#FBF8F2] border border-[#E5DED3] rounded-xl text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                  Author Pen Name
                </label>
                <input
                  type="text"
                  name="penName"
                  value={profile.penName}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2.5 bg-[#FBF8F2] border border-[#E5DED3] rounded-xl text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                  Primary Genres
                </label>
                <input
                  type="text"
                  name="genres"
                  value={profile.genres}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2.5 bg-[#FBF8F2] border border-[#E5DED3] rounded-xl text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                Short Author Quote / Tagline
              </label>
              <input
                type="text"
                name="bio"
                value={profile.bio}
                onChange={handleProfileChange}
                className="w-full px-4 py-2.5 bg-[#FBF8F2] border border-[#E5DED3] rounded-xl text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                Full Editorial Biography (About the Author)
              </label>
              <textarea
                rows={4}
                name="longBio"
                value={profile.longBio}
                onChange={handleProfileChange}
                className="w-full px-4 py-2.5 bg-[#FBF8F2] border border-[#E5DED3] rounded-xl text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A] leading-relaxed"
              />
            </div>

            <div className="pt-2 border-t border-[#E5DED3]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#666666] mb-3">
                Social & Official Profiles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#888888] mb-1">
                    Personal Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={profile.website}
                    onChange={handleProfileChange}
                    className="w-full px-3.5 py-2 bg-[#FBF8F2] border border-[#E5DED3] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#888888] mb-1">
                    Twitter / X
                  </label>
                  <input
                    type="url"
                    name="twitter"
                    value={profile.twitter}
                    onChange={handleProfileChange}
                    className="w-full px-3.5 py-2 bg-[#FBF8F2] border border-[#E5DED3] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#888888] mb-1">
                    Instagram
                  </label>
                  <input
                    type="url"
                    name="instagram"
                    value={profile.instagram}
                    onChange={handleProfileChange}
                    className="w-full px-3.5 py-2 bg-[#FBF8F2] border border-[#E5DED3] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#888888] mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={handleProfileChange}
                    className="w-full px-3.5 py-2 bg-[#FBF8F2] border border-[#E5DED3] rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Security & Credentials Side Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E5DED3] shadow-2xs space-y-5">
            <div className="flex items-center gap-2 border-b border-[#E5DED3] pb-3">
              <Lock className="w-4 h-4 text-[#8B1A1A]" />
              <h3 className="font-playfair text-lg font-bold text-[#171717]">
                Account Security
              </h3>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#666666] mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="••••••••"
                  value={securityData.currentPassword}
                  onChange={handleSecurityChange}
                  className="w-full px-3.5 py-2 bg-[#FBF8F2] border border-[#E5DED3] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#666666] mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="••••••••"
                  value={securityData.newPassword}
                  onChange={handleSecurityChange}
                  className="w-full px-3.5 py-2 bg-[#FBF8F2] border border-[#E5DED3] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#666666] mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  placeholder="••••••••"
                  value={securityData.confirmNewPassword}
                  onChange={handleSecurityChange}
                  className="w-full px-3.5 py-2 bg-[#FBF8F2] border border-[#E5DED3] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#F7F1E8] hover:bg-[#8B1A1A] hover:text-white border border-[#E5DED3] text-[#171717] font-bold rounded-lg transition-colors cursor-pointer"
              >
                Update Password
              </button>
            </form>
          </div>

          {/* Publishing Rights Card */}
          <div className="bg-[#F7F1E8] p-6 rounded-3xl border border-[#E5DED3] space-y-3 text-xs">
            <h4 className="font-playfair font-bold text-sm text-[#8B1A1A] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Verified Publishing Partner
            </h4>
            <p className="text-[#666666] leading-relaxed">
              Your author account is verified for 100% royalty payouts and global distribution across Amazon, Flipkart, and 150+ international outlets.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
