"use client";

import React from "react";

interface StatsHeaderProps {
  totalUsers: number;
  filteredUsers: number;
  isFiltered: boolean;
  maleCount: number;
  femaleCount: number;
}

export default function StatsHeader({ 
  totalUsers, 
  filteredUsers, 
  isFiltered, 
  maleCount, 
  femaleCount 
}: StatsHeaderProps) {
  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-white/60 backdrop-blur-sm shadow-xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Directory Overview
            </h2>
            <p className="text-slate-600">
              {isFiltered ? 'Filtered results' : 'All users'} from our professional network
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-600">Live data</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Total Users */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Total Users</p>
                <p className="text-2xl font-bold text-slate-900">{totalUsers}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Filtered Results */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  {isFiltered ? 'Matches' : 'Showing'}
                </p>
                <p className="text-2xl font-bold text-slate-900">{filteredUsers}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Male Users */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Male</p>
                <p className="text-2xl font-bold text-slate-900">{maleCount}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Female Users */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Female</p>
                <p className="text-2xl font-bold text-slate-900">{femaleCount}</p>
              </div>
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {isFiltered && (
          <div className="mt-4 bg-white/50 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
              <span>Filter Match Rate</span>
              <span>{Math.round((filteredUsers / totalUsers) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(filteredUsers / totalUsers) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 