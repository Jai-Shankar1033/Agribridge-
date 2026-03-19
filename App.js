import React, { useEffect, useState, useRef } from 'react';
import { 
  Camera, CloudRain, Tractor, TrendingUp, Wifi, Users, 
  Mic, Menu, Languages, MapPin, X, Upload, Activity,
  CheckCircle2, Clock, AlertTriangle, Droplets, Leaf,
  Wind, Sun, Thermometer, ChevronRight, Search, BarChart3,
  Image as ImageIcon, Settings
} from 'lucide-react';

// --- SUB-COMPONENT: PRICE PREDICTOR MODAL ---
const PricePredictorModal = ({ onClose }) => {
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const cropData = {
    Wheat: [
      { mandi: "Khanna Mandi", price: "₹2,450", trend: "up", change: "+₹50" },
      { mandi: "Indore Market", price: "₹2,380", trend: "down", change: "-₹20" },
      { mandi: "Rajkot Mandi", price: "₹2,510", trend: "up", change: "+₹110" },
    ],
    Rice: [
      { mandi: "Karnal Mandi", price: "₹3,100", trend: "up", change: "+₹150" },
      { mandi: "Nalgonda Market", price: "₹2,950", trend: "up", change: "+₹40" },
    ],
    Tomato: [
      { mandi: "Azadpur Mandi", price: "₹1,200", trend: "down", change: "-₹300" },
      { mandi: "Nashik Market", price: "₹1,150", trend: "down", change: "-₹150" },
    ]
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[120] p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-8 text-white flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm"><TrendingUp size={32} /></div>
            <div>
              <h2 className="text-2xl font-black">Market AI</h2>
              <p className="text-yellow-100 text-sm font-medium">Predicting {selectedCrop} trends</p>
            </div>
          </div>
          <button onClick={onClose} className="bg-black/10 hover:bg-black/20 p-3 rounded-full transition-all active:scale-90"><X size={24} /></button>
        </div>
        <div className="p-8 max-h-[75vh] overflow-y-auto">
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {['Wheat', 'Rice', 'Tomato', 'Corn'].map(crop => (
              <button key={crop} onClick={() => setSelectedCrop(crop)} className={`px-6 py-2.5 rounded-2xl font-bold text-sm transition-all ${selectedCrop === crop ? 'bg-yellow-600 text-white shadow-lg ring-4 ring-yellow-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{crop}</button>
            ))}
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100 rounded-[2rem] p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><BarChart3 size={100} /></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <span className="bg-yellow-200 text-yellow-800 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">AI Forecast</span>
                <h3 className="text-3xl font-black text-gray-800 mt-2">Expect Rise: 12%</h3>
              </div>
              <div className="bg-white p-3 rounded-2xl shadow-sm"><TrendingUp className="text-green-500" size={32} /></div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed italic relative z-10">"Low arrivals detected in Northern hubs. Prices for {selectedCrop} are expected to hit a peak within 14 days."</p>
          </div>
          <h3 className="text-[11px] font-black text-gray-400 uppercase mb-4 tracking-[0.2em] px-2">Live Mandi Analytics</h3>
          <div className="space-y-4">
            {(cropData[selectedCrop] || cropData['Wheat']).map((m, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md hover:border-yellow-300 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${m.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {m.trend === 'up' ? <TrendingUp size={24} /> : <TrendingUp size={24} className="rotate-180" />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 group-hover:text-yellow-700">{m.mandi}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Verified 2h ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-gray-900">{m.price}</p>
                  <p className={`text-xs font-bold ${m.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>{m.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: DETAILED WEATHER MODAL ---
const WeatherModal = ({ location, onClose }) => {
  const forecast = [
    { day: "Mon", temp: "29°C", status: "Sunny", icon: <Sun className="text-yellow-500" /> },
    { day: "Tue", temp: "27°C", status: "Showers", icon: <CloudRain className="text-blue-400" /> },
    { day: "Wed", temp: "24°C", status: "Heavy Rain", icon: <CloudRain className="text-blue-600" /> },
    { day: "Thu", temp: "28°C", status: "Sunny", icon: <Sun className="text-yellow-500" /> },
    { day: "Fri", temp: "30°C", status: "Hot", icon: <Sun className="text-orange-500" /> },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[110] p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
        <div className="bg-blue-600 p-8 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="flex justify-between items-center relative z-10">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Weather Intelligence</h2>
              <p className="text-xs opacity-80 flex items-center gap-1 mt-2 font-bold uppercase tracking-widest">
                <MapPin size={12}/> {location?.lat || '28.6139'}° N, {location?.lon || '77.2090'}° E
              </p>
            </div>
            <button onClick={onClose} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all"><X size={24} /></button>
          </div>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50/50 p-5 rounded-3xl border border-blue-100 flex items-center gap-4 transition-transform hover:scale-105">
              <div className="bg-blue-600 p-2 rounded-xl text-white"><Wind size={24} /></div>
              <div><p className="text-[10px] text-gray-400 font-black uppercase">Wind</p><p className="text-lg font-black text-gray-800">12 km/h</p></div>
            </div>
            <div className="bg-blue-50/50 p-5 rounded-3xl border border-blue-100 flex items-center gap-4 transition-transform hover:scale-105">
              <div className="bg-blue-600 p-2 rounded-xl text-white"><Droplets size={24} /></div>
              <div><p className="text-[10px] text-gray-400 font-black uppercase">Humidity</p><p className="text-lg font-black text-gray-800">68%</p></div>
            </div>
          </div>
          <h3 className="text-[11px] font-black text-gray-400 uppercase mb-4 tracking-[0.2em]">Next 5 Days</h3>
          <div className="space-y-2">
            {forecast.map((f, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-blue-50 transition-colors group">
                <p className="font-bold text-gray-700 w-12">{f.day}</p>
                <div className="flex items-center gap-3 flex-1 justify-center">
                  <span className="group-hover:scale-125 transition-transform">{f.icon}</span>
                  <span className="text-sm text-gray-600 font-bold">{f.status}</span>
                </div>
                <p className="font-black text-gray-900 text-lg">{f.temp}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-orange-50 border border-orange-200 p-5 rounded-3xl flex gap-4 shadow-sm animate-pulse">
            <AlertTriangle className="text-orange-600 shrink-0" size={24} />
            <div>
              <p className="text-sm font-black text-orange-900 uppercase tracking-tight">Spraying Warning</p>
              <p className="text-xs text-orange-700 leading-relaxed font-medium">Strong winds expected Tuesday. Complete pesticide spraying by 10 AM tomorrow.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: CROP ADVISORY MODAL ---
const CropAdvisoryModal = ({ onClose }) => {
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const timeline = [
    { stage: "Sowing", status: "completed", date: "Oct 15", task: "Base fertilizer (NPK) applied." },
    { stage: "Germination", status: "completed", date: "Oct 25", task: "Initial irrigation done." },
    { stage: "Tillering", status: "active", date: "Today", task: "Apply First Top Dressing (Urea). Check for weeds.", alert: "Rain expected: Delay spraying by 24h." },
    { stage: "Flowering", status: "upcoming", date: "Dec 10", task: "Maintain soil moisture. Monitor for aphids." },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-20 duration-500">
        <div className="bg-cyan-600 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl"><Leaf size={28} /></div>
            <h2 className="text-2xl font-black tracking-tight">Personalized Advisory</h2>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform p-1"><X size={28} /></button>
        </div>
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <div className="flex bg-gray-100 p-1.5 rounded-2xl">
              {['Wheat', 'Rice'].map(c => (
                <button key={c} onClick={() => setSelectedCrop(c)} className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${selectedCrop === c ? 'bg-white shadow-md text-cyan-600' : 'text-gray-500'}`}>{c}</button>
              ))}
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none">Status</p>
              <p className="text-cyan-600 font-black text-lg">Tillering (Day 42)</p>
            </div>
          </div>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.2rem] before:h-full before:w-1 before:bg-gray-100">
            {timeline.map((item, index) => (
              <div key={index} className="relative flex items-start gap-8 group">
                <div className={`flex items-center justify-center w-10 h-10 rounded-2xl border-4 border-white shadow-lg shrink-0 z-10 transition-all ${item.status === 'completed' ? 'bg-green-500 text-white' : item.status === 'active' ? 'bg-cyan-600 text-white animate-bounce' : 'bg-gray-200 text-gray-400'}`}>
                  {item.status === 'completed' ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                </div>
                <div className={`flex-1 p-6 rounded-3xl border-2 transition-all ${item.status === 'active' ? 'bg-cyan-50/50 border-cyan-200 shadow-xl' : 'bg-white border-gray-50'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`text-lg font-black ${item.status === 'active' ? 'text-cyan-800' : 'text-gray-700'}`}>{item.stage}</h4>
                    <span className="text-[10px] font-black px-3 py-1 rounded-full bg-white border shadow-sm text-gray-400">{item.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{item.task}</p>
                  {item.alert && (
                    <div className="mt-4 flex items-start gap-3 bg-white/60 p-3 rounded-2xl border border-orange-100">
                      <AlertTriangle className="text-orange-500 shrink-0" size={16} />
                      <p className="text-[11px] text-orange-800 font-bold italic">{item.alert}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: AI PLANT DOCTOR MODAL ---
const PlantDoctorModal = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const analyzeCrop = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        disease: "Yellow Rust (पीला रतुआ)",
        confidence: "98.2%",
        treatment: "1. Spray Propiconazole 25% EC.\n2. Apply 1ml per liter of water.\n3. Avoid excess urea in current stage.",
      });
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in duration-500">
        <div className="bg-red-600 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl"><Camera size={24} /></div>
            <h2 className="text-xl font-black">AI Plant Doctor</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-black/10 rounded-full"><X size={24} /></button>
        </div>
        <div className="p-8">
          <div className="w-full h-72 bg-gray-50 rounded-[2rem] border-4 border-dashed border-gray-200 flex items-center justify-center mb-8 overflow-hidden relative group">
            {image ? (
              <>
                <img src={image} alt="Crop" className="w-full h-full object-cover" />
                {!result && !analyzing && (
                  <button onClick={() => setImage(null)} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-red-500"><X size={16} /></button>
                )}
              </>
            ) : (
              <div className="text-center">
                <div className="bg-red-50 p-6 rounded-full inline-block mb-4 text-red-400 group-hover:scale-110 transition-transform"><Upload size={48} /></div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Upload Leaf Image</p>
              </div>
            )}
            {analyzing && (
              <div className="absolute inset-0 bg-red-600/90 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center">
                <Activity className="animate-spin mb-4" size={50} />
                <p className="text-xl font-black tracking-tighter">SCANNING BIOMASS...</p>
                <p className="text-xs opacity-70 mt-2">Connecting to Agronomy Cloud</p>
              </div>
            )}
          </div>
          {!image ? (
            <label className="w-full flex items-center justify-center gap-3 py-5 bg-gray-900 text-white rounded-2xl font-black cursor-pointer hover:bg-black transition-all shadow-xl active:scale-95">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <Camera size={24} /> START DIAGNOSIS
            </label>
          ) : !result && !analyzing && (
            <button onClick={analyzeCrop} className="w-full py-5 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 transition-all shadow-xl shadow-red-200 active:scale-95">RUN AI ANALYSIS</button>
          )}
          {result && (
            <div className="space-y-4 animate-in slide-in-from-bottom-5 duration-500">
              <div className="flex justify-between items-end">
                <div><p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Result Found</p><p className="text-2xl font-black text-gray-900">{result.disease}</p></div>
                <div className="bg-green-100 text-green-700 text-[10px] font-black px-3 py-1 rounded-full uppercase">{result.confidence} Match</div>
              </div>
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Prescription</p>
                <p className="text-sm text-gray-700 leading-relaxed font-medium whitespace-pre-line">{result.treatment}</p>
              </div>
              <button onClick={() => setImage(null)} className="w-full py-3 text-sm font-bold text-gray-400 hover:text-red-600 transition-colors">Retake Photo</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- REUSABLE FEATURE CARD ---
const FeatureCard = ({ title, description, icon: Icon, color, onClick }) => (
  <div onClick={onClick} className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-50 relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform duration-700" style={{ color }}><Icon size={120} /></div>
    <div className="relative z-10">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-12 group-hover:scale-110" style={{ backgroundColor: `${color}15`, color }}><Icon size={32} /></div>
      <h3 className="text-xl font-black text-gray-800 mb-2 group-hover:text-black">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed font-medium">{description}</p>
      <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color }}>Know More <ChevronRight size={14} /></div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---
const App = () => {
  const [location, setLocation] = useState(null);
  const [showPlantDoctor, setShowPlantDoctor] = useState(false);
  const [showAdvisory, setShowAdvisory] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [showPricePredictor, setShowPricePredictor] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Background Image Logic
  const defaultBg = 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=2000';
  const [bgImage, setBgImage] = useState(localStorage.getItem('userFarmPhoto') || defaultBg);
  const fileInputRef = useRef(null);

  const handleBgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgImage(reader.result);
        localStorage.setItem('userFarmPhoto', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (p) => setLocation({ lat: p.coords.latitude.toFixed(4), lon: p.coords.longitude.toFixed(4) }),
      () => console.error("Location access denied")
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-green-100">
      {/* Modals */}
      {showPlantDoctor && <PlantDoctorModal onClose={() => setShowPlantDoctor(false)} />}
      {showAdvisory && <CropAdvisoryModal onClose={() => setShowAdvisory(false)} />}
      {showWeather && <WeatherModal location={location} onClose={() => setShowWeather(false)} />}
      {showPricePredictor && <PricePredictorModal onClose={() => setShowPricePredictor(false)} />}

      {/* STICKY NAV */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/10 text-white shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 p-2 rounded-xl shadow-lg shadow-green-500/30"><CloudRain size={24} className="text-white" /></div>
          <h1 className="text-2xl font-black tracking-tighter">AgriBridge<span className="text-green-400">.</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => fileInputRef.current.click()} className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest border border-white/10"><ImageIcon size={16} /> My Farm</button>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleBgUpload} />
          <button className="bg-white/10 hover:bg-white/20 p-2 rounded-xl"><Languages size={20} /></button>
          <div className="hidden md:flex gap-1">
            {['HI', 'EN', 'OR'].map(l => (
               <button key={l} className="px-3 py-1.5 text-xs font-black hover:text-green-400 transition-colors uppercase tracking-widest">{l}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* HEADER SECTION */}
      <header 
        className="relative h-[550px] flex items-center pt-20 px-6 rounded-b-[5rem] overflow-hidden shadow-2xl bg-cover bg-fixed transition-all duration-700"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85)), url('${bgImage}')` 
        }}
      >
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="animate-in fade-in slide-in-from-left-10 duration-700">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl tracking-tight leading-tight">Harvesting <br/> <span className="text-green-400">Intelligence.</span></h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-xs mb-10">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-2xl border border-white/20 font-black tracking-widest uppercase">
              <MapPin size={16} className="text-green-400" />
              {location ? `${location.lat}, ${location.lon}` : "Gps Locating..."}
            </div>
            <button onClick={() => { setBgImage(defaultBg); localStorage.removeItem('userFarmPhoto'); }} className="bg-black/20 hover:bg-black/40 text-white/50 p-2 rounded-xl transition-all"><Settings size={14} /></button>
          </div>
          
          <div onClick={() => setShowWeather(true)} className="group flex items-center gap-8 bg-white/10 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/20 inline-flex shadow-2xl cursor-pointer hover:bg-white/20 transition-all hover:scale-105 active:scale-95">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <Sun size={60} className="text-yellow-400 relative z-10 animate-spin-slow" />
              <CloudRain size={28} className="absolute -bottom-2 -right-2 text-blue-300 drop-shadow-lg" />
            </div>
            <div className="text-white">
              <div className="flex items-center gap-3">
                <p className="text-5xl font-black tracking-tighter italic">28°C</p>
                <div className="animate-pulse flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-full"><div className="w-2 h-2 bg-green-400 rounded-full"></div><span className="text-[10px] font-black uppercase tracking-tighter">Live Location</span></div>
              </div>
              <p className="text-sm opacity-70 font-bold uppercase tracking-widest mt-1">Delhi • Clear Sky • Low Winds</p>
            </div>
          </div>
        </div>
      </header>

      {/* DASHBOARD GRID */}
      <main className="max-w-6xl mx-auto px-6 -mt-16 pb-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard title="AI Plant Doctor" description="Instant crop disease detection with 98% accuracy using deep learning." icon={Camera} color="#ef4444" onClick={() => setShowPlantDoctor(true)} />
          <FeatureCard title="Smart Soil (IoT)" description="Connect Bluetooth sensors to monitor real-time NPK, pH, and moisture levels." icon={Wifi} color="#3b82f6" onClick={() => alert('Connect your IoT device via Bluetooth')} />
          <FeatureCard title="Price Predictor" description="Advanced market forecasting to help you sell crops at their absolute peak value." icon={TrendingUp} color="#eab308" onClick={() => setShowPricePredictor(true)} />
          <FeatureCard title="Rent Equipment" description="Uber-style equipment sharing. Tractors, Harvesters & Spraying Drones." icon={Tractor} color="#f97316" onClick={() => alert('Checking nearby rentals...')} />
          <FeatureCard title="Crop Advisory" description="Your personalized farm manager. Dynamic task list based on growth stage." icon={Leaf} color="#06b6d4" onClick={() => setShowAdvisory(true)} />
          <FeatureCard title="Farmer Forum" description="The global social network for agriculture. Share stories, learn from experts." icon={Users} color="#8b5cf6" onClick={() => alert('Forum is loading community posts...')} />
        </div>
      </main>

      {/* VOICE ASSISTANT BUTTON */}
      <div className="fixed bottom-8 right-8 z-[100] group">
        <div className={`absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity ${isListening ? 'animate-ping' : ''}`}></div>
        <button onMouseDown={() => setIsListening(true)} onMouseUp={() => setIsListening(false)} className={`relative bg-green-600 text-white p-6 rounded-full shadow-2xl border-4 border-white transition-all transform active:scale-90 flex items-center justify-center ${isListening ? 'bg-red-500 scale-125' : ''}`}>
          {isListening ? <Activity size={32} strokeWidth={3} /> : <Mic size={32} strokeWidth={3} />}
          {isListening && <span className="absolute -top-12 bg-black/80 text-white text-[10px] font-black px-4 py-2 rounded-xl whitespace-nowrap animate-bounce">I'm listening...</span>}
        </button>
      </div>
    </div>
  );
};

export default App;