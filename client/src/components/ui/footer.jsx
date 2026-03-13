import React from "react";
import {
  Heart,
  Shield,
  MapPin,
  Phone,
  Award,
  Activity,
  Pill,
  Ambulance,
  Baby,
  Brain,
  Zap,
  Cpu,
  Mail,
  Users,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Menu,
  X,
  Stethoscope,
  UserCheck,
  TrendingUp,
  Sparkles
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-4 gap-12">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold">वैदSeva</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Transforming healthcare with AI-powered solutions for better health outcomes in rural and urban communities.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold mb-6 text-lg">Services</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="hover:text-white transition-colors cursor-pointer">AI Telemedicine</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Health Monitoring</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Precision Medicine</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Emergency Care</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold mb-6 text-lg">Technology</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="hover:text-white transition-colors cursor-pointer">AI Diagnostics</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Secure Platform</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Real-time Analytics</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Predictive Care</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold mb-6 text-lg">Contact</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>1800-123-4567</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>support@vedseva.in</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>New Delhi, India</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                <p>&copy; 2025 वैदSeva. Transforming lives through AI-powered healthcare.</p>
              </div>
            </div>
          </footer>
  );
}