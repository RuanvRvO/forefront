"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Heart, Users, TrendingUp, Sparkles, Calendar, Clock, MapPin, Video, Mail, MessageCircle, Phone } from 'lucide-react';

export default function LandingPage() {
  const [email, setEmail] = useState('');

  // Fetch meetings from Convex
  const meetings = useQuery(api.meetings.listMeetings) ?? [];

  const values = [
    {
      icon: Heart,
      title: 'Self-Care First',
      description: 'We believe that to help others, we must first help ourselves. Personal growth is the foundation of collective impact.',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Together we&apos;re stronger. Our community provides a safe space for growth, learning, and mutual encouragement.',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Growth',
      description: 'Improvement is a journey, not a destination. We celebrate progress and support each other through challenges.',
    },
    {
      icon: Sparkles,
      title: 'Positive Impact',
      description: 'As we uplift ourselves, we naturally uplift those around us, creating a ripple effect of positive change.',
    },
  ];

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/hero-mountains.jpg')`,
            backgroundColor: '#2d3748',
          }}
        >
          <div className="absolute inset-0 bg-slate-800/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-2">
            Uplift Others by
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-amber-400 italic mb-6">
            Uplifting Ourselves
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Join a community dedicated to personal growth, mutual support, and collective empowerment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#schedule"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors w-full sm:w-48 text-center"
            >
              View Schedule
            </a>
            <a
              href="#mission"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg border border-white/30 transition-colors w-full sm:w-48 text-center"
            >
              Learn More
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section id="mission" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-6">
            Our Mission
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            We&apos;re building a movement of individuals committed to personal development and mutual support. By investing in ourselves, we create stronger communities and a better world.
          </p>

          {/* Who We Are - Image and Text */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
            <div className="lg:w-1/2">
              <Image
                src="/scrabble-quote.jpg"
                alt="Love People Use Things - The Opposite Never Works"
                width={500}
                height={500}
                className="rounded-xl shadow-lg w-full max-w-md mx-auto"
              />
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Who We Are</h3>
              <p className="text-gray-600 mb-4">
                We&apos;re a diverse group of individuals from all walks of life, united by a common goal: to become the best versions of ourselves while helping others do the same.
              </p>
              <p className="text-gray-600 mb-4">
                Our approach is simple but powerful. We start with ourselves—working on our mindset, habits, and personal development. As we grow, we share our experiences, support one another, and create a culture of continuous improvement.
              </p>
              <p className="text-gray-600">
                Whether you&apos;re just starting your personal development journey or you&apos;ve been on this path for years, you&apos;ll find a welcoming community here.
              </p>
            </div>
          </div>

          {/* Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-amber-50/50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-amber-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Meetings Section */}
      <section id="schedule" className="py-20 bg-amber-50/30">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-4">
            Upcoming Meetings
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Join us at any of our upcoming sessions. All meetings are open to new members. Dates and times are listed below.
          </p>

          {/* Meetings List */}
          {meetings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No upcoming meetings scheduled at the moment.</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon for new sessions!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div
                  key={meeting._id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">{meeting.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{meeting.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {meeting.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {meeting.time}
                        </span>
                        <span className="flex items-center gap-1">
                          {meeting.type === 'Online' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                          {meeting.location}
                        </span>
                      </div>
                    </div>
                    <span className={`
                      px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap self-start
                      ${meeting.type === 'Online'
                        ? 'bg-teal-100 text-teal-700'
                        : 'bg-teal-100 text-teal-700 border border-teal-200'
                      }
                    `}>
                      {meeting.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* First Time Joining Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-amber-50/50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">First Time Joining?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">What to Expect</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    Welcoming and judgment-free environment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    Facilitated discussions and activities
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    Opportunity to share or just listen
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    Connection with like-minded individuals
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">How to Join</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    No registration required for first visit
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    Simply show up to any meeting that interests you
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    For online meetings, email us for the link
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    Bring an open mind and positive energy
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-700 relative overflow-hidden">
        {/* Background subtle pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/hero-mountains.jpg')`,
            }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left side - CTA */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-gray-300 mb-8">
                Join our community today and take the first step towards personal growth and collective upliftment.
              </p>

              <h4 className="text-lg font-medium text-amber-400 mb-4">Get Updates</h4>
              <p className="text-gray-300 text-sm mb-4">
                Stay informed about upcoming meetings, special events, and community news.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Right side - Contact Info */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Get In Touch</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Email Us</h4>
                      <p className="text-amber-600">info@forefront.org</p>
                      <p className="text-gray-500 text-sm">We typically respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Join Our Community</h4>
                      <p className="text-gray-600 text-sm">Connect with members on our Discord server</p>
                      <a href="#" className="text-amber-600 hover:underline">discord.gg/qsb6afSs</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Questions?</h4>
                      <p className="text-gray-600 text-sm">Schedule a call with our team</p>
                      <a href="#" className="text-amber-600 hover:underline">Book a conversation</a>
                    </div>
                  </div>
                </div>

                <p className="mt-8 text-gray-500 italic text-sm border-t pt-6">
                  &quot;The journey of a thousand miles begins with a single step. Take yours with us.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Forefront</h3>
              <p className="text-gray-400 text-sm">
                A community dedicated to personal growth and collective empowerment. We believe in uplifting ourselves to uplift others.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#schedule" className="text-gray-400 hover:text-white transition-colors">Meeting Schedule</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Values</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-white font-medium mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Discord Community</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-slate-700 text-center">
            <p className="text-gray-400 text-sm">
              Made with <span className="text-red-500">❤</span> by people who believe in growth
            </p>
            <p className="text-gray-500 text-xs mt-2">
              © 2026 Forefront. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
