import React, { useState } from 'react';
import {
  Heart,
  Calendar,
  Clock,
  User,
  Bell,
  Menu,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Star,
  Stethoscope,
  Video,
  UserCheck,
  CheckCircle,
  AlertCircle,
  Filter,
  Search
} from "lucide-react";
import Footer from '../components/ui/footer';

export default function BookAppointmentPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [consultationType, setConsultationType] = useState('both');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sample time slots data
  const timeSlots = [
    { id: 1, time: '09:00 AM', available: true, type: 'online' },
    { id: 2, time: '09:30 AM', available: true, type: 'online' },
    { id: 3, time: '10:00 AM', available: false, type: 'online' },
    { id: 4, time: '10:30 AM', available: true, type: 'online' },
    { id: 5, time: '11:00 AM', available: true, type: 'online' },
    { id: 6, time: '11:30 AM', available: true, type: 'online' },
    { id: 7, time: '12:00 PM', available: false, type: 'online' },
    { id: 8, time: '02:00 PM', available: true, type: 'online' },
    { id: 9, time: '02:30 PM', available: true, type: 'online' },
    { id: 10, time: '03:00 PM', available: true, type: 'online' },
    { id: 11, time: '03:30 PM', available: true, type: 'online' },
    { id: 12, time: '04:00 PM', available: false, type: 'online' },
    { id: 13, time: '04:30 PM', available: true, type: 'online' },
    { id: 14, time: '05:00 PM', available: true, type: 'online' }
  ];

  // Generate calendar dates
  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const calendarDates = generateCalendarDates();

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleTimeSlotSelect = (slot) => {
    if (slot.available) {
      setSelectedTimeSlot(slot);
    }
  };

  const handleBookNow = () => {
    if (selectedTimeSlot && selectedDate) {
      const appointmentData = {
        date: selectedDate.toISOString(),
        time: selectedTimeSlot.time,
        timeSlotId: selectedTimeSlot.id,
        consultationType: selectedTimeSlot.type,
        specialty: selectedSpecialty,
        formattedDate: formatDate(selectedDate),
        timestamp: new Date().toISOString()
      };
      
      // Log the data that would be passed to the next page
      console.log('Appointment Data:', appointmentData);
      
      // Here you would typically navigate to the confirmation page
      // navigate('/appointment-confirmation', { state: appointmentData });
      alert(`Booking confirmed!\nDate: ${appointmentData.formattedDate}\nTime: ${appointmentData.time}\nType: ${appointmentData.consultationType}\n\nData logged to console for development.`);
    }
  };

  const filteredTimeSlots = timeSlots.filter(slot => {
    if (consultationType === 'online') {
      return slot.type === 'online' || slot.type === 'both';
    }
    if (consultationType === 'in-person') {
      return slot.type === 'in-person' || slot.type === 'both';
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button className="lg:hidden text-gray-600 hover:text-blue-600 transition-colors">
                <Menu className="w-6 h-6" />
              </button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">वैदSeva</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-600 hover:text-blue-600 transition-colors">
                <Bell className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">SK</span>
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">Suresh Kishor</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar Section */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Select Date</h2>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-lg font-semibold text-gray-700">
                      {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Date Grid */}
                <div className="grid grid-cols-7 gap-2 mb-8">
                  {calendarDates.map((date, index) => {
                    const isSelected = date.toDateString() === selectedDate.toDateString();
                    const isToday = date.toDateString() === new Date().toDateString();
                    
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(date)}
                        className={`p-4 rounded-xl text-center transition-all duration-200 ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                            : isToday
                            ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                            : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                      >
                        <div className="text-xs font-medium opacity-80">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-lg font-bold">
                          {date.getDate()}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Time Slots */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Available Time Slots - {formatDate(selectedDate)}
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {filteredTimeSlots.map((slot) => {
                      const isSelected = selectedTimeSlot?.id === slot.id;
                      
                      return (
                        <button
                          key={slot.id}
                          onClick={() => handleTimeSlotSelect(slot)}
                          disabled={!slot.available}
                          className={`p-4 rounded-xl text-center transition-all duration-200 relative ${
                            !slot.available
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : isSelected
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
                              : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <Clock className="w-4 h-4" />
                            <span className="font-semibold">{slot.time}</span>
                          </div>
                          <div className="flex items-center justify-center space-x-1">
                            {slot.type === 'online' && <Video className="w-3 h-3" />}
                            {slot.type === 'in-person' && <MapPin className="w-3 h-3" />}
                            {slot.type === 'both' && (
                              <>
                                <Video className="w-3 h-3" />
                                <MapPin className="w-3 h-3" />
                              </>
                            )}
                            <span className="text-xs capitalize">
                              {slot.type === 'both' ? 'Both' : slot.type.replace('-', ' ')}
                            </span>
                          </div>
                          {!slot.available && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-medium"></span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Date</span>
                    <span className="font-semibold text-blue-800">{formatDate(selectedDate)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <span className="text-gray-700">Time</span>
                    <span className="font-semibold text-purple-800">
                      {selectedTimeSlot ? selectedTimeSlot.time : 'Not selected'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Type</span>
                    <span className="font-semibold text-green-800 capitalize">
                      {selectedTimeSlot ? (selectedTimeSlot.type === 'both' ? 'Flexible' : selectedTimeSlot.type.replace('-', ' ')) : 'Not selected'}
                    </span>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">RS</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Suresh Kishor</h3>
                      <p className="text-sm text-gray-600">Patient ID: VS-PT-12345</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>34 years</span>
                    <span>•</span>
                    <span>B+ Blood Group</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleBookNow}
                    disabled={!selectedTimeSlot}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      selectedTimeSlot
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg transform hover:scale-105'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {selectedTimeSlot ? 'Book Now' : 'Select Time Slot'}
                  </button>
                  
                  <button className="w-full py-3 rounded-xl border-2 border-blue-300 text-blue-600 hover:bg-blue-50 transition-colors font-medium">
                    Save for Later
                  </button>
                </div>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-yellow-800">Important Note</p>
                      <p className="text-xs text-yellow-700 mt-1">
                        Please arrive 15 minutes early for in-person appointments. Online consultations will start at the scheduled time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}