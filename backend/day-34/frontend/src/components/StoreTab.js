"use client";

import React, { useState, useEffect } from "react";
import { Warehouse, Snowflake, Search, Phone, MapPin, CheckCircle, ShieldCheck, X } from "lucide-react";

export default function StoreTab({ farmerLocation = "Karnal, Haryana" }) {
  const [facilities, setFacilities] = useState([]);
  const [searchLocation, setSearchLocation] = useState(farmerLocation);
  const [cropFilter, setCropFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Booking modal state
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    farmerName: "",
    farmerContact: "",
    crop: "Potato",
    tonnes: 10,
    durationMonths: 3,
  });
  const [bookingConfirmation, setBookingConfirmation] = useState(null);
  const [submittingBooking, setSubmittingBooking] = useState(false);

  const fetchStorage = async (loc = "", crop = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (loc) params.append("location", loc);
      if (crop) params.append("crop", crop);
      const res = await fetch(`/api/storage?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setFacilities(data.facilities || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStorage(farmerLocation, "");
  }, [farmerLocation]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!selectedFacility) return;
    setSubmittingBooking(true);
    try {
      const res = await fetch("/api/storage/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          facilityId: selectedFacility.id,
          ...bookingForm,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setBookingConfirmation(data.booking);
        // Refresh facilities list to show updated available capacity
        fetchStorage(searchLocation, cropFilter);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingBooking(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-800 to-orange-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-medium text-amber-300 mb-3">
              <Warehouse className="h-3.5 w-3.5" />
              <span>STAGE 3: POST-HARVEST STORAGE & PRESERVATION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Warehouse & Cold Storage Discovery
            </h1>
            <p className="mt-2 text-sm text-amber-100/90 leading-relaxed">
              Prevent distress selling by storing produce in WDRA-accredited warehouses and precision cold chains. Access pledge financing (e-NWR) to receive immediate liquidity while holding for peak seasonal prices.
            </p>
          </div>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Filter location..."
              className="bg-white/10 backdrop-blur border border-white/20 px-3 py-2 rounded-xl text-xs text-white placeholder-amber-200/60 focus:outline-none w-full sm:w-48"
            />
            <button
              onClick={() => fetchStorage(searchLocation, cropFilter)}
              className="bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-xl text-xs font-semibold transition w-full sm:w-auto shadow-sm"
            >
              Filter
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center animate-pulse">
          <Warehouse className="h-8 w-8 text-amber-600 animate-bounce mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700">Locating Verified Storage Facilities...</p>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {facilities.map((fac) => {
            const isCold = fac.type.toLowerCase().includes("cold");
            const fillPct = Math.round(((fac.capacityTonnes - fac.availableTonnes) / fac.capacityTonnes) * 100);

            return (
              <div
                key={fac.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`h-9 w-9 rounded-xl flex items-center justify-center ${
                          isCold ? "bg-cyan-100 text-cyan-700" : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {isCold ? <Snowflake className="h-5 w-5" /> : <Warehouse className="h-5 w-5" />}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{fac.id}</span>
                        <h3 className="font-bold text-sm text-slate-900 leading-snug">{fac.name}</h3>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                      {fac.type}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{fac.address || fac.location}</span>
                  </div>

                  {/* Capacity Progress Bar */}
                  <div className="mt-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-500">Available: <strong className="text-slate-800">{fac.availableTonnes} T</strong></span>
                      <span className="text-slate-400 text-[11px]">Total: {fac.capacityTonnes} T</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${fillPct > 80 ? "bg-amber-500" : "bg-emerald-500"}`}
                        style={{ width: `${fillPct}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Rate & Features */}
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Monthly Rate</span>
                      <span className="text-base font-extrabold text-emerald-700">₹{fac.pricePerTonnePerMonth}</span>
                      <span className="text-[10px] text-slate-500"> / tonne</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Temp Spec</span>
                      <span className="text-xs font-semibold text-slate-700">{fac.temperatureCelsius || "Ambient"}</span>
                    </div>
                  </div>

                  {/* Feature Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {fac.features?.map((feat, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`tel:${fac.contact}`}
                    className="text-xs text-slate-600 hover:text-slate-900 flex items-center space-x-1"
                  >
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    <span>{fac.contact}</span>
                  </a>

                  <button
                    onClick={() => {
                      setSelectedFacility(fac);
                      setBookingConfirmation(null);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
                  >
                    Book Space
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Booking Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setSelectedFacility(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>

            {!bookingConfirmation ? (
              <div>
                <h3 className="text-lg font-bold text-slate-900">Reserve Storage Space</h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedFacility.name}</p>

                <form onSubmit={handleBook} className="mt-4 space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Farmer Full Name</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.farmerName}
                      onChange={(e) => setBookingForm({ ...bookingForm, farmerName: e.target.value })}
                      placeholder="e.g. Ramesh Tyagi"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Contact Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.farmerContact}
                      onChange={(e) => setBookingForm({ ...bookingForm, farmerContact: e.target.value })}
                      placeholder="+91-9876543210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Crop to Store</label>
                      <input
                        type="text"
                        required
                        value={bookingForm.crop}
                        onChange={(e) => setBookingForm({ ...bookingForm, crop: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Quantity (Tonnes)</label>
                      <input
                        type="number"
                        min="1"
                        max={selectedFacility.availableTonnes}
                        required
                        value={bookingForm.tonnes}
                        onChange={(e) => setBookingForm({ ...bookingForm, tonnes: Number(e.target.value) })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Duration (Months)</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={bookingForm.durationMonths}
                      onChange={(e) => setBookingForm({ ...bookingForm, durationMonths: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 text-[11px] flex justify-between">
                    <span>Est. Total Holding Cost:</span>
                    <strong className="text-amber-950">
                      ₹{selectedFacility.pricePerTonnePerMonth * bookingForm.tonnes * bookingForm.durationMonths}
                    </strong>
                  </div>

                  <button
                    type="submit"
                    disabled={submittingBooking}
                    className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-md shadow-amber-600/20 transition"
                  >
                    {submittingBooking ? "Confirming..." : "Confirm Reservation Request"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Storage Reserved Successfully!</h3>
                <p className="text-xs text-slate-600">
                  Booking ID: <strong className="text-emerald-700">{bookingConfirmation.bookingId}</strong>
                </p>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-left space-y-1">
                  <div>Facility: <strong>{bookingConfirmation.facilityName}</strong></div>
                  <div>Quantity: <strong>{bookingConfirmation.tonnes} Tonnes ({bookingConfirmation.crop})</strong></div>
                  <div>Estimated Cost: <strong>₹{bookingConfirmation.totalEstimatedCost}</strong></div>
                </div>
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold mt-2"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
