"use client";

import { useState, type ReactNode } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Calendar, Clock, MapPin, Video, Mail, MessageCircle, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

function Verse({ children, reference, verse }: { children: ReactNode; reference: string; verse: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <p className="cursor-pointer hover:text-blue-700 transition-colors">
          {children}
        </p>
      </TooltipTrigger>
      <TooltipContent side="top" className="bg-slate-800 text-white max-w-xs px-4 py-3 rounded-lg shadow-xl">
        <p className="font-semibold text-amber-400 text-sm mb-1">{reference}</p>
        <p className="text-gray-300 italic text-xs leading-relaxed">{verse}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch meetings from Convex
  const meetings = useQuery(api.meetings.listMeetings) ?? [];

  // Subscribe mutation
  const subscribe = useMutation(api.emailSubscribers.subscribe);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('loading');
    setErrorMessage('');

    try {
      const result = await subscribe({
        email,
        source: 'landing_page',
      });
      if (result?.alreadySubscribed) {
        setSubscribeStatus('already');
      } else {
        setSubscribeStatus('success');
      }
      setEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    } catch (error) {
      setSubscribeStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to subscribe');
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubscribeStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };


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

      {/* Vision, Mission & Sponsor Message Section */}
      <section id="mission" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto px-4">

          {/* Section Title */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Who We Are
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Rooted in Christ. Led by the Spirit. Equipped by His Word.
            </p>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Card className="border-blue-100/80 bg-gradient-to-br from-blue-50/80 to-white shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                  Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-base">
                  To be a Christ-rooted ministry, led by the Holy Spirit and equipped in God&apos;s Word, to share the truth of Christ through loving and respectful conversations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-100/80 bg-gradient-to-br from-blue-50/80 to-white shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                  Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-base">
                  To grow a platform for courageous disciples of Jesus - grounded in Scripture, strengthened in faith, and committed to encouraging and sharpening one another. Equipped with God&apos;s truth and love, we serve our communities and boldly share the Gospel, building His Kingdom and reaching those who are lost.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sponsor Message Card */}
          <Card className="border-blue-100/80 bg-gradient-to-br from-blue-50/80 to-white shadow-md">
            <CardHeader className="text-center pb-0">
              <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                A Message From Our Sponsor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <div className="text-gray-600 leading-relaxed space-y-8 max-w-3xl mx-auto text-center text-base">
                  <div className="space-y-2">
                    <Verse reference="Jeremiah 29:7" verse="Also, seek the peace and prosperity of the city to which I have carried you into exile. Pray to the LORD for it, because if it prospers, you too will prosper.">
                      Seek the good of the place where God has put you, and pray for it, because your well-being is tied to its well-being.
                    </Verse>
                    <Verse reference="Philippians 4:8" verse="Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable — if anything is excellent or praiseworthy — think about such things.">
                      Also fix your mind on what is true, honourable, pure, excellent, and what is worthy of praise.
                    </Verse>
                    <Verse reference="2 Timothy 1:7" verse="For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.">
                      As God has not given us a spirit of fear, but power, love, and self-discipline.
                    </Verse>
                  </div>

                  <div className="space-y-2">
                    <Verse reference="1 Corinthians 9:25" verse="Everyone who competes in the games goes into strict training. They do it to get a crown that will not last, but we do it to get a crown that will last forever.">
                      Everyone who competes in the games goes into strict training. They do it to get a crown that will not last, but we do it to get a crown that will last forever.
                    </Verse>
                    <Verse reference="1 Corinthians 9:26" verse="Therefore I do not run like someone running aimlessly; I do not fight like a boxer beating the air.">
                      Therefore, do not run like someone running aimlessly; do not fight like a boxer beating the air.
                    </Verse>
                    <Verse reference="Ephesians 2:10" verse="For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.">
                      For you are God&apos;s handiwork, created in Christ Jesus to do good works, which God prepared in advance for you to do.
                    </Verse>
                    <Verse reference="1 Thessalonians 5:11" verse="Therefore encourage one another and build each other up, just as in fact you are doing.">
                      And so encourage one another and build each other up.
                    </Verse>
                    <Verse reference="1 Peter 3:15" verse="But in your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have. But do this with gentleness and respect.">
                      Share the gospel through prepared, respectful conversations.
                    </Verse>
                    <Verse reference="Ephesians 4:12" verse="To equip his people for works of service, so that the body of Christ may be built up.">
                      Equip His people for works of service, so that the body of Christ may be built up.
                    </Verse>
                  </div>

                  <div className="space-y-2">
                    <Verse reference="Colossians 2:6–7" verse="So then, just as you received Christ Jesus as Lord, continue to live your lives in him, rooted and built up in him, strengthened in the faith as you were taught, and overflowing with thankfulness.">
                      So then, just as you received Christ Jesus as Lord, continue to live your lives in him, rooted and built up in him, strengthened in the faith as you were taught, and overflowing with thankfulness.
                    </Verse>
                    <Verse reference="John 13:35" verse="By this everyone will know that you are my disciples, if you love one another.">
                      By this, everyone will know that you are the Lord&apos;s disciples, if you love one another.
                    </Verse>
                    <Verse reference="Joshua 1:9" verse="Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.">
                      Have you not been commanded? To be strong and courageous, not to be afraid nor discouraged, for the Lord your God will be with you wherever you go.
                    </Verse>
                  </div>

                  <div className="space-y-2">
                    <Verse reference="2 Timothy 3:17" verse="So that the servant of God may be thoroughly equipped for every good work.">
                      Be equipped by His Word for every good work.
                    </Verse>
                    <Verse reference="Mark 16:15" verse="He said to them, 'Go into all the world and preach the gospel to all creation.'">
                      As you are called to go and share the gospel.
                    </Verse>
                    <Verse reference="Joshua 1:8" verse="Keep this Book of the Law always on your lips; meditate on it day and night, so that you may be careful to do everything written in it. Then you will be prosperous and successful.">
                      Keep this Book of the Law always on your lips; meditate on it day and night, so that you may be careful to do everything written in it. Then you will be prosperous and successful.
                    </Verse>
                  </div>

                  <div className="space-y-2">
                    <Verse reference="Joshua 1:9" verse="Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.">
                      I ask again, have you not been commanded? To be strong and courageous, not to be afraid nor discouraged, for the Lord your God will be with you wherever you go.
                    </Verse>
                  </div>
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>

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
                    For online meetings, join the <a href="https://discord.gg/2jAaBbfCFA" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Discord</a>
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
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={subscribeStatus === 'loading'}
                    className="flex-1 px-4 py-3 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="submit"
                    disabled={subscribeStatus === 'loading'}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
                {subscribeStatus === 'success' && (
                  <p className="text-green-400 text-sm">
                    ✓ Successfully subscribed! We&apos;ll keep you updated.
                  </p>
                )}
                {subscribeStatus === 'already' && (
                  <p className="text-amber-400 text-sm">
                    You&apos;re already subscribed!
                  </p>
                )}
                {subscribeStatus === 'error' && (
                  <p className="text-red-400 text-sm">
                    ✗ {errorMessage}
                  </p>
                )}
              </form>
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
                      <p className="text-amber-600">info@forefront-ministries.com</p>
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
                      <a href="https://discord.gg/2jAaBbfCFA" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">discord.gg/2jAaBbfCFA</a>
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
