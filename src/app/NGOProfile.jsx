import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  Shield,
  MapPin,
  Phone,
  Mail,
  Users,
  Menu,
  X,
  Bell,
  Search,
  Settings,
  LogOut,
  Activity,
  TrendingUp,
  AlertTriangle,
  Building,
  Globe,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  ChevronDown,
  Eye,
  Plus,
  FileText,
  Target,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Home,
  Database,
  Stethoscope,
  Clipboard
} from "lucide-react";

// Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function NGODashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');
  const [selectedRegion, setSelectedRegion] = useState('delhi');
  const [notifications, setNotifications] = useState(5);
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Sample data - replace with your ML model data
  const dashboardStats = {
    totalCases: 1245,
    activeAreas: 8,
    criticalAlerts: 3,
    healthcarePartners: 12
  };

  const diseaseData = [
    { 
      name: 'Malaria', 
      cases: 145, 
      trend: 'up', 
      color: 'bg-red-500',
      description: 'Primary vector: Female Anopheles mosquito. Most prevalent in northern districts. Symptoms include high fever, chills, and fatigue.',
      percentage: '+12%'
    },
    { 
      name: 'Dengue', 
      cases: 78, 
      trend: 'down', 
      color: 'bg-orange-500',
      description: 'Transmitted by Aedes mosquitoes. Recent spike in urban areas following monsoon season. Symptoms include high fever, severe headache.',
      percentage: '-8%'
    },
    { 
      name: 'Tuberculosis', 
      cases: 56, 
      trend: 'up', 
      color: 'bg-yellow-500',
      description: 'Airborne bacterial infection affecting primarily lungs. Higher prevalence in densely populated areas.',
      percentage: '+5%'
    },
    { 
      name: 'Cholera', 
      cases: 29, 
      trend: 'stable', 
      color: 'bg-blue-500',
      description: 'Caused by contaminated water or food. Recent outbreak after flooding in coastal regions.',
      percentage: '0%'
    }
  ];

  // Chart data configurations
  const trendsChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Malaria',
        data: [120, 135, 140, 145, 150, 145],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Dengue',
        data: [85, 80, 82, 78, 75, 78],
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Tuberculosis',
        data: [50, 52, 54, 56, 58, 56],
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        tension: 0.4,
      }
    ],
  };

  const ageDistributionData = {
    labels: ['0-10', '11-20', '21-40', '41-60', '60+'],
    datasets: [
      {
        label: 'Cases by Age',
        data: [85, 120, 340, 280, 420],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(168, 85, 247, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const treatmentResponseData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Success Rate (%)',
        data: [78, 82, 85, 88, 90, 92],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
      },
    ],
  };

  const resourceAllocationData = {
    labels: ['Medicine', 'Equipment', 'Staff', 'Infrastructure', 'Research'],
    datasets: [
      {
        data: [35, 20, 25, 15, 5],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(168, 85, 247, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 11,
            family: 'Inter, system-ui, sans-serif'
          },
          boxWidth: 12,
          boxHeight: 12
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        padding: 12
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.08)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 10,
            family: 'Inter, system-ui, sans-serif'
          },
          color: '#6b7280'
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
            family: 'Inter, system-ui, sans-serif'
          },
          color: '#6b7280'
        }
      }
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3
      },
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
        backgroundColor: '#fff'
      },
      bar: {
        borderRadius: 4,
        borderSkipped: false,
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 10,
          font: {
            size: 10,
            family: 'Inter, system-ui, sans-serif'
          },
          boxWidth: 12,
          boxHeight: 12
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        padding: 12,
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.parsed + '%';
          }
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: '#fff',
        hoverBorderWidth: 3
      }
    }
  };

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Initialize Leaflet map
      const map = L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        dragging: true,
        touchZoom: true
      }).setView([28.6139, 77.2090], 11); // Delhi coordinates

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        tileSize: 256,
        zoomOffset: 0
      }).addTo(map);

      // Sample disease outbreak markers with enhanced styling
      const outbreakMarkers = [
        { lat: 28.6139, lng: 77.2090, disease: 'Malaria', cases: 45, severity: 'high' },
        { lat: 28.5355, lng: 77.3910, disease: 'Dengue', cases: 32, severity: 'medium' },
        { lat: 28.4595, lng: 77.0266, disease: 'Tuberculosis', cases: 28, severity: 'low' },
        { lat: 28.7041, lng: 77.1025, disease: 'Cholera', cases: 15, severity: 'low' },
      ];

      outbreakMarkers.forEach(marker => {
        const color = marker.severity === 'high' ? '#ef4444' : 
                     marker.severity === 'medium' ? '#f97316' : '#22c55e';
        const shadowColor = marker.severity === 'high' ? 'rgba(239, 68, 68, 0.4)' : 
                           marker.severity === 'medium' ? 'rgba(249, 115, 22, 0.4)' : 'rgba(34, 197, 94, 0.4)';
        
        const markerIcon = L.divIcon({
          className: 'custom-outbreak-marker',
          html: `<div style="
            background-color: ${color}; 
            width: 24px; 
            height: 24px; 
            border-radius: 50%; 
            border: 3px solid white; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 0 0 4px ${shadowColor};
            animation: pulse-marker 2s infinite;
            cursor: pointer;
            transition: transform 0.2s ease;
          " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
          popupAnchor: [0, -12]
        });

        L.marker([marker.lat, marker.lng], { icon: markerIcon })
          .bindPopup(`
            <div style="
              text-align: center; 
              padding: 12px; 
              font-family: system-ui, -apple-system, sans-serif;
              min-width: 180px;
            ">
              <div style="
                font-weight: bold; 
                font-size: 16px; 
                color: ${color};
                margin-bottom: 8px;
                border-bottom: 2px solid ${color};
                padding-bottom: 4px;
              ">${marker.disease}</div>
              <div style="margin: 6px 0; font-size: 14px;">
                <strong>Cases:</strong> ${marker.cases}
              </div>
              <div style="
                font-size: 12px; 
                padding: 4px 8px; 
                border-radius: 12px; 
                background-color: ${color}; 
                color: white; 
                font-weight: 600;
                text-transform: uppercase;
                margin-top: 8px;
              ">${marker.severity} Priority</div>
            </div>
          `, {
            closeButton: true,
            autoClose: false,
            className: 'custom-popup'
          })
          .addTo(map);
      });

      // Add custom CSS for marker animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes pulse-marker {
          0% { box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 0 0 0px rgba(59, 130, 246, 0.7); }
          70% { box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 0 0 0px rgba(59, 130, 246, 0); }
        }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          border: none;
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
          border: none;
          box-shadow: none;
        }
        .leaflet-container {
          border-radius: 12px;
          overflow: hidden;
        }
      `;
      document.head.appendChild(style);

      mapInstanceRef.current = map;
    }

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'active-areas', name: 'Active Areas', icon: MapPin },
    { id: 'critical-alerts', name: 'Critical Alerts', icon: AlertTriangle },
    { id: 'health-data', name: 'Health Data', icon: Stethoscope },
    { id: 'reports', name: 'Reports', icon: Clipboard },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-50 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-100/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Permanent Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col relative z-10">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900">वैदSeva</span>
              <div className="text-xs text-green-600 font-medium">NGO Portal</div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6">
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSidebarItem(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSidebarItem === item.id
                    ? 'bg-green-50 text-green-700 border-r-2 border-green-500 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* User Section */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">NGO Admin</div>
              <div className="text-xs text-gray-500">Delhi Region</div>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 text-gray-700 hover:text-red-600 transition-colors duration-200 w-full rounded-lg hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-sm text-gray-600">Monitor healthcare initiatives and community programs</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cases, areas..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-64"
                />
              </div>
              
              <button className="relative p-2 text-gray-500 hover:text-gray-700 bg-gray-50 rounded-lg">
                <Bell className="w-6 h-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Cases Reported</p>
                  <p className="text-3xl font-black text-gray-900 mt-2">{dashboardStats.totalCases.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Areas</p>
                  <p className="text-3xl font-black text-gray-900 mt-2">{dashboardStats.activeAreas}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                  <p className="text-3xl font-black text-gray-900 mt-2">{dashboardStats.criticalAlerts}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Healthcare Partners</p>
                  <p className="text-3xl font-black text-gray-900 mt-2">{dashboardStats.healthcarePartners}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Disease Cases - Left Side */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Current Outbreaks</h2>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {diseaseData.map((disease, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${disease.color}`}></div>
                          <h3 className="font-semibold text-gray-900">{disease.name}</h3>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          disease.trend === 'up' ? 'text-red-700 bg-red-100' :
                          disease.trend === 'down' ? 'text-green-700 bg-green-100' :
                          'text-gray-700 bg-gray-100'
                        }`}>
                          {disease.percentage}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 mb-2">{disease.cases} cases</p>
                      <p className="text-xs text-gray-600">{disease.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map - Center */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Geographic Distribution</h2>
                  <div className="flex items-center space-x-2">
                    <select 
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    >
                      <option value="delhi">Delhi</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="bangalore">Bangalore</option>
                      <option value="all">All Regions</option>
                    </select>
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Interactive Map with Enhanced Styling */}
                <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border-2 border-gray-200 overflow-hidden shadow-inner relative">
                  <div ref={mapRef} className="w-full h-full rounded-xl"></div>
                  
                  {/* Map Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-3 z-[1000]">
                    <div className="text-xs font-semibold text-gray-700 mb-2">Outbreak Severity</div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
                        <span className="text-xs text-gray-600">High Priority</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm"></div>
                        <span className="text-xs text-gray-600">Medium Priority</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
                        <span className="text-xs text-gray-600">Low Priority</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Map Loading Overlay */}
                  <div className="absolute inset-0 bg-gray-100/50 backdrop-blur-sm flex items-center justify-center z-[500] pointer-events-none opacity-0 transition-opacity duration-300" id="map-loading">
                    <div className="bg-white rounded-lg p-4 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-gray-600">Loading map...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Charts - 4 Analytics Panels with Enhanced Styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Disease Trends Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">Disease Trends</h3>
                </div>
                <select 
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className="h-48 relative">
                <Line data={trendsChartData} options={chartOptions} />
              </div>
            </div>

            {/* Age Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">Age Distribution of Cases</h3>
              </div>
              <div className="h-48 relative">
                <Bar data={ageDistributionData} options={chartOptions} />
              </div>
            </div>

            {/* Treatment Response */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">Treatment Response Rates</h3>
              </div>
              <div className="h-48 relative">
                <Bar data={treatmentResponseData} options={chartOptions} />
              </div>
            </div>

            {/* Resource Allocation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <PieChart className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">Resource Allocation</h3>
              </div>
              <div className="h-48 relative">
                <Pie data={resourceAllocationData} options={pieChartOptions} />
              </div>
            </div>
          </div>
        </div>   
      </div>
    </div>
  );
}