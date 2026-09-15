"use client";

import React, { useState, useEffect } from "react";
import { CloudRain, Wind, Droplets, Thermometer, Search, AlertTriangle, ShieldCheck, SunMedium } from "lucide-react";

export default function GrowTab({ farmerLocation = "Karnal, Haryana" }) {
  const [location, setLocation] = useState(farmerLocation);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (loc) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/weather?location=${encodeURIComponent(loc || "Karnal, Haryana")}`);
      const data = await res.json();
      if (data.success) {
        setWeatherData(data);
      } else {
        setError(data.message || "Could not retrieve weather data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(farmerLocation);
  }, [farmerLocation]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-sky-500/20 border border-sky-400/30 px-3 py-1 rounded-full text-xs font-medium text-sky-300 mb-3">
              <SunMedium className="h-3.5 w-3.5" />
              <span>STAGE 2: CROP GROWTH & AGRO-METEOROLOGY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Hyperlocal Weather & Irrigation Advisory
            </h1>
            <p className="mt-2 text-sm text-sky-100/90 leading-relaxed">
              Real-time agro-meteorology from Open-Meteo with FAO-56 reference evapotranspiration (ET0) and rain probability, helping you optimize irrigation schedules and safeguard against crop risks.
            </p>
          </div>

          {/* Location Search Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchWeather(location);
            }}
            className="flex items-center bg-white/10 backdrop-blur rounded-2xl p-1.5 border border-white/20 w-full sm:w-auto"
          >
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search district or farm location..."
              className="bg-transparent px-3 py-2 text-xs text-white placeholder-sky-200/60 focus:outline-none w-full sm:w-64"
            />
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-400 text-white p-2 rounded-xl transition shadow-sm"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {loading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center animate-pulse">
          <CloudRain className="h-8 w-8 text-sky-500 animate-bounce mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700">Connecting to Open-Meteo Satellite Station...</p>
          <p className="text-xs text-slate-400 mt-1">Retrieving 7-day temperature, rainfall, and evapotranspiration data</p>
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-xs flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {weatherData && !loading && (
        <div className="space-y-6">
          {/* Current Weather Overview Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>Temperature</span>
                <Thermometer className="h-4 w-4 text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">
                {weatherData.current.temperature}°C
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {weatherData.location.name}, {weatherData.location.country}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>Relative Humidity</span>
                <Droplets className="h-4 w-4 text-sky-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">
                {weatherData.current.humidity}%
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {weatherData.current.humidity > 80 ? "High (Fungal Risk)" : "Optimal"}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>Precipitation</span>
                <CloudRain className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">
                {weatherData.current.precipitation} mm
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Current ground rainfall</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>Wind Speed</span>
                <Wind className="h-4 w-4 text-teal-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">
                {weatherData.current.windSpeed} km/h
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {weatherData.current.windSpeed > 15 ? "Avoid Spraying" : "Safe for spraying"}
              </div>
            </div>
          </div>

          {/* 7-Day Forecast Grid */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-800 text-sm mb-4 flex items-center justify-between">
              <span>7-Day Agricultural Forecast</span>
              <span className="text-xs text-slate-400 font-normal">Data source: Open-Meteo High-Resolution Model</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
              {weatherData.forecast.map((day, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-center transition ${
                    i === 0
                      ? "bg-sky-50/70 border-sky-200 shadow-sm"
                      : "bg-slate-50 border-slate-100 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="text-[11px] font-bold text-slate-700">
                    {i === 0 ? "Today" : day.date.slice(5)}
                  </div>

                  <div className="my-2">
                    <span className="text-base font-extrabold text-slate-900">{day.maxTemperature}°</span>
                    <span className="text-xs text-slate-400 ml-1">/ {day.minTemperature}°</span>
                  </div>

                  <div className="space-y-1.5 text-[10px] text-slate-600">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-slate-400">Rain Prob</span>
                      <span className={`font-semibold ${day.rainProbability > 50 ? "text-blue-600" : "text-slate-600"}`}>
                        {day.rainProbability}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full"
                        style={{ width: `${day.rainProbability}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between px-1 text-[9px] text-slate-400">
                      <span>Sum: {day.rainfall}mm</span>
                      <span>ET0: {day.evapotranspiration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Irrigation & Pest Advisory */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="h-5 w-5 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  Field Action & Irrigation Recommendation
                </h4>
                <p className="text-xs text-emerald-800/90 mt-1 leading-relaxed">
                  {weatherData.forecast[0].rainProbability > 60
                    ? `Rain probability is high (${weatherData.forecast[0].rainProbability}%). Postpone scheduled irrigation and pesticide application to prevent runoff loss.`
                    : `Rain probability is low (${weatherData.forecast[0].rainProbability}%) with ET0 at ${weatherData.forecast[0].evapotranspiration} mm/day. Suitable for irrigation and foliar nutrient sprays.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
