"use client";

import React, { useState } from "react";
import { Sparkles, Calculator, CheckCircle2, TrendingUp, Info, CloudRain, Thermometer, Layers } from "lucide-react";

export default function PlanTab({ farmerLocation }) {
  const [inputs, setInputs] = useState({
    N: 110,
    P: 55,
    K: 40,
    ph: 6.8,
    temperature: 22,
    humidity: 65,
    rainfall: 85,
    area: 3,
    season: "Rabi",
  });

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [yieldResult, setYieldResult] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Fetch Crop Recommendation
      const cropRes = await fetch("/api/crop/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      const cropData = await cropRes.json();

      // 2. Fetch Harvest Yield Estimation for top crop
      const topCropName = cropData.top_crop || "wheat";
      const yieldRes = await fetch("/api/crop/yield", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop: topCropName,
          area: Number(inputs.area),
          season: inputs.season,
          rainfall: Number(inputs.rainfall),
          temperature: Number(inputs.temperature),
        }),
      });
      const yieldData = await yieldRes.json();

      setRecommendation(cropData);
      setYieldResult(yieldData);
    } catch (err) {
      setError("Failed to generate recommendation: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-medium text-emerald-300 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>STAGE 1: CROP PLANNING & SELECTION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Precision Agricultural Decision Engine
          </h1>
          <p className="mt-2 text-sm text-emerald-100/90 leading-relaxed">
            Input your soil testing parameters (Nitrogen, Phosphorus, Potassium, pH) and micro-climate conditions.
            Our multi-tier Machine Learning system computes the scientifically optimal crop and predicts harvest yield.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Soil & Climate Input Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-semibold text-slate-800 text-sm flex items-center space-x-2">
              <Layers className="h-4 w-4 text-emerald-600" />
              <span>Soil & Farm Parameters</span>
            </h2>
            <span className="text-[11px] text-slate-400">Location: {farmerLocation}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Nitrogen (N) [kg/ha]</label>
              <input
                type="number"
                value={inputs.N}
                onChange={(e) => setInputs({ ...inputs, N: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">Phosphorus (P) [kg/ha]</label>
              <input
                type="number"
                value={inputs.P}
                onChange={(e) => setInputs({ ...inputs, P: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">Potassium (K) [kg/ha]</label>
              <input
                type="number"
                value={inputs.K}
                onChange={(e) => setInputs({ ...inputs, K: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">Soil pH (1 - 14)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.ph}
                onChange={(e) => setInputs({ ...inputs, ph: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1 flex items-center space-x-1">
                <Thermometer className="h-3.5 w-3.5 text-amber-500" />
                <span>Avg Temp (°C)</span>
              </label>
              <input
                type="number"
                value={inputs.temperature}
                onChange={(e) => setInputs({ ...inputs, temperature: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1 flex items-center space-x-1">
                <CloudRain className="h-3.5 w-3.5 text-sky-500" />
                <span>Rainfall (mm)</span>
              </label>
              <input
                type="number"
                value={inputs.rainfall}
                onChange={(e) => setInputs({ ...inputs, rainfall: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">Farm Land Area (Hectares)</label>
              <input
                type="number"
                step="0.5"
                value={inputs.area}
                onChange={(e) => setInputs({ ...inputs, area: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">Cropping Season</label>
              <select
                value={inputs.season}
                onChange={(e) => setInputs({ ...inputs, season: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Rabi">Rabi (Winter - Oct to Mar)</option>
                <option value="Kharif">Kharif (Monsoon - Jun to Oct)</option>
                <option value="Zaid">Zaid (Summer - Mar to Jun)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 transition"
          >
            <Sparkles className="h-4 w-4" />
            <span>{loading ? "Computing Precision Model..." : "Run ML Crop & Yield Recommendation"}</span>
          </button>

          {error && <div className="text-xs text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">{error}</div>}
        </div>

        {/* Right Column: Recommendation & Yield Results */}
        <div className="lg:col-span-7 space-y-6">
          {!recommendation && !loading && (
            <div className="h-full min-h-[320px] bg-white rounded-2xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Calculator className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-slate-800 text-sm">Awaiting Soil Analysis Inputs</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Configure your soil nutrient levels and weather variables on the left, then click run to invoke the ML recommendation engine.
              </p>
            </div>
          )}

          {loading && (
            <div className="h-full min-h-[320px] bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center text-center animate-pulse">
              <Sparkles className="h-8 w-8 text-emerald-600 animate-spin mb-3" />
              <p className="text-sm font-semibold text-slate-700">Evaluating Agro-Climatic Match...</p>
              <p className="text-xs text-slate-400 mt-1">Querying Random Forest Classifier & Yield Regressor</p>
            </div>
          )}

          {recommendation && (
            <div className="space-y-4">
              {/* Top Crop Recommendation Card */}
              <div className="bg-white rounded-2xl border-2 border-emerald-500/80 p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wide">
                  {(recommendation.confidence * 100).toFixed(0)}% Match
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Top Recommended Crop</span>
                    <h3 className="text-2xl font-bold text-slate-900 capitalize">{recommendation.top_crop}</h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {recommendation.rationale}
                </p>

                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                  <span>Engine: {recommendation.source}</span>
                  <span className="text-emerald-700 font-medium">Optimal Season: {inputs.season}</span>
                </div>
              </div>

              {/* Yield Forecast Card */}
              {yieldResult && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                    <h3 className="font-semibold text-slate-800 text-sm flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span>Estimated Production & Yield Range</span>
                    </h3>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {inputs.area} Hectares
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center mb-4">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Min Expected</div>
                      <div className="text-lg font-bold text-slate-800">{yieldResult.yield_range_min_tonnes} T</div>
                      <div className="text-[10px] text-slate-400">Low rainfall case</div>
                    </div>

                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                      <div className="text-[10px] text-emerald-700 uppercase font-bold">Estimated Harvest</div>
                      <div className="text-xl font-extrabold text-emerald-900">{yieldResult.total_estimated_production_tonnes} T</div>
                      <div className="text-[10px] text-emerald-700 font-medium">{yieldResult.estimated_yield_per_ha} T / ha</div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Max Potential</div>
                      <div className="text-lg font-bold text-slate-800">{yieldResult.yield_range_max_tonnes} T</div>
                      <div className="text-[10px] text-slate-400">Optimal inputs</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 leading-relaxed">
                    <span className="font-semibold text-amber-900">Agronomic Advisory: </span>
                    {yieldResult.advisory}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
