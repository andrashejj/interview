"use client";

import React from "react";
import Image from "next/image";
import type { User } from "~/lib/schemas";
import { formatDate } from "~/lib/utils";

interface UserDetailModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserDetailModal({ user, isOpen, onClose }: UserDetailModalProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform transition-all duration-300 scale-100">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 px-6 py-8 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                      user.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                    }`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-slate-600">@{user.username}</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                      user.gender === 'male' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-pink-100 text-pink-800'
                    }`}>
                      {user.gender}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/60 transition-colors duration-200"
                >
                  <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Personal Info
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <span className="w-20 text-slate-500">Age:</span>
                      <span className="text-slate-900 font-medium">{user.age} years old</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-20 text-slate-500">Birth:</span>
                      <span className="text-slate-900">{formatDate(user.birthDate)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-20 text-slate-500">Blood:</span>
                      <span className="text-slate-900">{user.bloodGroup}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-20 text-slate-500">Eyes:</span>
                      <span className="text-slate-900">{user.eyeColor}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-20 text-slate-500">Hair:</span>
                      <span className="text-slate-900">{user.hair.color} {user.hair.type}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-20 text-slate-500">Height:</span>
                      <span className="text-slate-900">{user.height} cm</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-20 text-slate-500">Weight:</span>
                      <span className="text-slate-900">{user.weight} kg</span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="block text-slate-500 mb-1">Email:</span>
                      <a href={`mailto:${user.email}`} className="text-blue-600 hover:text-blue-800 font-medium">
                        {user.email}
                      </a>
                    </div>
                    <div className="text-sm">
                      <span className="block text-slate-500 mb-1">Phone:</span>
                      <a href={`tel:${user.phone}`} className="text-blue-600 hover:text-blue-800 font-medium">
                        {user.phone}
                      </a>
                    </div>
                    <div className="text-sm">
                      <span className="block text-slate-500 mb-1">Address:</span>
                      <div className="text-slate-900">
                        <div>{user.address.address}</div>
                        <div>{user.address.city}, {user.address.state} {user.address.postalCode}</div>
                        <div>{user.address.country}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                    Professional
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="block text-slate-500 mb-1">Position:</span>
                      <span className="text-slate-900 font-medium">{user.company.title}</span>
                    </div>
                    <div className="text-sm">
                      <span className="block text-slate-500 mb-1">Company:</span>
                      <span className="text-slate-900">{user.company.name}</span>
                    </div>
                    <div className="text-sm">
                      <span className="block text-slate-500 mb-1">Department:</span>
                      <span className="text-slate-900">{user.company.department}</span>
                    </div>
                    <div className="text-sm">
                      <span className="block text-slate-500 mb-1">University:</span>
                      <span className="text-slate-900">{user.university}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Additional
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="block text-slate-500 mb-1">Role:</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {user.role}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="block text-slate-500 mb-1">EIN:</span>
                      <span className="text-slate-900 font-mono">{user.ein}</span>
                    </div>
                    <div className="text-sm">
                      <span className="block text-slate-500 mb-1">Crypto:</span>
                      <div className="text-slate-900">
                        <div className="font-mono text-xs">{user.crypto.wallet}</div>
                        <div className="text-xs text-slate-500">{user.crypto.coin} on {user.crypto.network}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  User ID: {user.id}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.open(`mailto:${user.email}`, '_blank')}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Email
                  </button>
                  <button
                    onClick={() => window.open(`tel:${user.phone}`, '_blank')}
                    className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 