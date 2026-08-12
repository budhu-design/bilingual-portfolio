"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import { createClient } from "@/lib/supabase/client";
import { usePrefersReducedMotion } from "@/components/anim-kit/useReducedMotion";
import type { ShakhaLocation } from "@/lib/members/types";

const INDIA_CENTER: [number, number] = [22.9734, 78.6569];

function pinIcon(L: typeof import("leaflet"), verified: boolean) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:16px;height:16px;border-radius:9999px;
      background:${verified ? "#c8a24e" : "#f6f3ec"};
      border:2px solid #0d0d10;
      box-shadow:0 0 0 3px rgba(200,162,78,0.25);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

/**
 * Real Leaflet + OpenStreetMap locator, no API key required. Reads
 * shakha_locations from Supabase and stays live via a realtime subscription
 * — an admin adding/editing/removing a location updates every open tab.
 */
export function ShakhaLocatorMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const reduced = usePrefersReducedMotion();
  const [locations, setLocations] = useState<ShakhaLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);

  // Fetch + realtime subscription
  useEffect(() => {
    const supabase = createClient();
    let active = true;

    supabase
      .from("shakha_locations")
      .select("*")
      .then(({ data }) => {
        if (active && data) setLocations(data as ShakhaLocation[]);
        setLoading(false);
      });

    const channel = supabase
      .channel("shakha_locations_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "shakha_locations" }, (payload) => {
        setLocations((prev) => {
          if (payload.eventType === "DELETE") {
            return prev.filter((l) => l.id !== (payload.old as ShakhaLocation).id);
          }
          const next = payload.new as ShakhaLocation;
          const withoutOld = prev.filter((l) => l.id !== next.id);
          return [...withoutOld, next];
        });
      })
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  // Map init (client-only; Leaflet touches `window`)
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let disposed = false;

    import("leaflet").then((L) => {
      if (disposed || !containerRef.current || mapRef.current) return;
      const map = L.map(containerRef.current, {
        center: INDIA_CENTER,
        zoom: 4.5,
        zoomAnimation: !reduced,
        fadeAnimation: !reduced,
        markerZoomAnimation: !reduced,
        scrollWheelZoom: true,
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);
      mapRef.current = map;
      leafletRef.current = L;
      setMapReady(true);
    });

    return () => {
      disposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync markers whenever locations change
  useEffect(() => {
    const map = mapRef.current;
    const L = leafletRef.current;
    if (!map || !L || !mapReady) return;

    const seen = new Set<string>();
    for (const loc of locations) {
      seen.add(loc.id);
      const existing = markersRef.current.get(loc.id);
      if (existing) {
        existing.setLatLng([loc.lat, loc.lng]);
      } else {
        const marker = L.marker([loc.lat, loc.lng], { icon: pinIcon(L, loc.verified) }).addTo(map);
        marker.bindPopup(
          `<div style="font-family:inherit">
             <strong>${escapeHtml(loc.name)}</strong>${loc.name_hi ? `<br/><span style="opacity:.6">${escapeHtml(loc.name_hi)}</span>` : ""}
             ${loc.address ? `<br/><span style="font-size:12px">${escapeHtml(loc.address)}</span>` : ""}
             ${!loc.verified ? `<br/><span style="font-size:11px;color:#a63d40">Pending verification</span>` : ""}
           </div>`
        );
        markersRef.current.set(loc.id, marker);
      }
    }
    markersRef.current.forEach((marker, id) => {
      if (!seen.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });
  }, [locations, mapReady]);

  return (
    <div className="relative h-[440px] w-full overflow-hidden rounded-2xl border border-white/10">
      <div ref={containerRef} className="h-full w-full bg-[#111116]" />
      {loading && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#0d0d10]/60 text-sm text-[#f6f3ec]/50">
          Loading locations…
        </div>
      )}
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-[#0d0d10]/80 px-3 py-1.5 text-[10px] text-[#f6f3ec]/60 backdrop-blur">
        {locations.length} location{locations.length === 1 ? "" : "s"} · gold = verified
      </div>
    </div>
  );
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
