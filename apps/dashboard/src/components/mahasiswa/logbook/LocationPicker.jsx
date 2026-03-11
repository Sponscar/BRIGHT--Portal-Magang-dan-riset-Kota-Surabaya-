import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon issue with bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Preset locations from lokasi master table
const PRESET_LOCATIONS = [
    {
        id: 'kantor_brida',
        name: 'Kantor BRIGHT',
        address: 'Kantor Pemerintahan Kota Surabaya, 25-27, Jalan Jimerto, RW 05, Ketabang, Genteng, Surabaya, Jawa Timur, Jawa, 60272, Indonesia',
        lat: -7.2576937,
        lng: 112.7474810,
    },
    {
        id: 'kebun_raya_mangrove',
        name: 'Kebun Raya Mangrove Surabaya Gunung Anyar',
        address: 'Taman Kebun Raya Mangrove Gunung Anyar, MR98+M6H, Gunung Anyar Tambak, Gunung Anyar, Surabaya, Jawa Timur, Jawa, 60295, Indonesia',
        lat: -7.3309692,
        lng: 112.8172351,
    },
    {
        id: 'ekowisata_mangrove',
        name: 'Ekowisata Mangrove Wonorejo Surabaya',
        address: 'Taman Hiburan Ekowisata Mangrove Wonorejo, No. 1, Track Wisata Mangrove, RW 07, Wonorejo, Rungkut, Surabaya, Jawa Timur, Jawa, 60293, Indonesia',
        lat: -7.3075505,
        lng: 112.8233680,
    },
    {
        id: 'taman_mangrove',
        name: 'Taman Mangrove Wonorejo Surabaya',
        address: 'Track Wisata Mangrove, RW 07, Wonorejo, Rungkut, Surabaya, Jawa Timur, Jawa, 60295, Indonesia',
        lat: -7.307473,
        lng: 112.843087,
    },
];

// Component to recenter map when coordinates change
const MapRecenter = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
        if (lat && lng) {
            map.setView([lat, lng], 15, { animate: true });
        }
    }, [lat, lng, map]);
    return null;
};

const LocationPicker = ({ value, onChange, disabled = false }) => {
    const [selectedPreset, setSelectedPreset] = useState('');
    const [customAddress, setCustomAddress] = useState('');
    const [isGeocoding, setIsGeocoding] = useState(false);
    const [geocodeError, setGeocodeError] = useState('');
    const [mapCenter, setMapCenter] = useState({ lat: -7.3, lng: 112.78 }); // Default: Surabaya
    const [markerPos, setMarkerPos] = useState(null);
    const mapRef = useRef(null);

    // Sync with initial value
    useEffect(() => {
        if (value?.lokasiId) {
            const preset = PRESET_LOCATIONS.find(p => p.id === value.lokasiId);
            if (preset) {
                setSelectedPreset(value.lokasiId);
                setMarkerPos({ lat: preset.lat, lng: preset.lng });
                setMapCenter({ lat: preset.lat, lng: preset.lng });
            }
        } else if (value?.lokasiLat && value?.lokasiLng) {
            setSelectedPreset('lainnya');
            setCustomAddress(value.lokasiNama || '');
            setMarkerPos({ lat: value.lokasiLat, lng: value.lokasiLng });
            setMapCenter({ lat: value.lokasiLat, lng: value.lokasiLng });
        }
    }, []);

    const handlePresetChange = (e) => {
        const id = e.target.value;
        setSelectedPreset(id);
        setGeocodeError('');

        if (id === 'lainnya') {
            setCustomAddress('');
            setMarkerPos(null);
            onChange({ lokasiId: null, lokasiNama: '', lokasiLat: null, lokasiLng: null });
        } else if (id) {
            const preset = PRESET_LOCATIONS.find(p => p.id === id);
            if (preset) {
                setMarkerPos({ lat: preset.lat, lng: preset.lng });
                setMapCenter({ lat: preset.lat, lng: preset.lng });
                setCustomAddress('');
                onChange({
                    lokasiId: preset.id,
                    lokasiNama: preset.name,
                    lokasiLat: preset.lat,
                    lokasiLng: preset.lng,
                });
            }
        } else {
            setMarkerPos(null);
            setCustomAddress('');
            onChange({ lokasiId: null, lokasiNama: '', lokasiLat: null, lokasiLng: null });
        }
    };

    const handleGeocode = async () => {
        if (!customAddress.trim()) return;

        setIsGeocoding(true);
        setGeocodeError('');

        try {
            const query = encodeURIComponent(customAddress.trim());
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1&countrycodes=id`,
                {
                    headers: {
                        'Accept-Language': 'id',
                    },
                }
            );
            const data = await response.json();

            if (data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lng = parseFloat(result.lon);

                setMarkerPos({ lat, lng });
                setMapCenter({ lat, lng });
                onChange({
                    lokasiId: null,
                    lokasiNama: customAddress.trim(),
                    lokasiLat: lat,
                    lokasiLng: lng,
                });
            } else {
                setGeocodeError('Alamat tidak ditemukan. Coba masukkan alamat yang lebih spesifik.');
            }
        } catch (err) {
            setGeocodeError('Gagal mencari lokasi. Periksa koneksi internet Anda.');
        } finally {
            setIsGeocoding(false);
        }
    };

    const selectedPresetData = PRESET_LOCATIONS.find(p => p.id === selectedPreset);

    return (
        <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-[#1b0d0d]">Lokasi</label>

            {/* Dropdown preset */}
            <select
                value={selectedPreset}
                onChange={handlePresetChange}
                disabled={disabled}
                className="w-full h-10 text-sm rounded-lg border-[#e0d0d0] bg-white text-[#1b0d0d] shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 disabled:bg-slate-50 disabled:text-slate-500"
            >
                <option value="">Pilih Lokasi</option>
                {PRESET_LOCATIONS.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
                <option value="lainnya">Lainnya (Masukkan Alamat)</option>
            </select>

            {/* Preset address info */}
            {selectedPresetData && (
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <span className="material-symbols-outlined notranslate text-[16px] text-emerald-600">location_on</span>
                    <span className="text-xs text-emerald-700">{selectedPresetData.address}</span>
                </div>
            )}

            {/* Custom address input */}
            {selectedPreset === 'lainnya' && (
                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Masukkan alamat lengkap..."
                            value={customAddress}
                            onChange={(e) => setCustomAddress(e.target.value)}
                            disabled={disabled || isGeocoding}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleGeocode();
                                }
                            }}
                            className="flex-1 h-10 text-sm rounded-lg border-[#e0d0d0] bg-white text-[#1b0d0d] shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 disabled:bg-slate-50"
                        />
                        <button
                            type="button"
                            onClick={handleGeocode}
                            disabled={!customAddress.trim() || isGeocoding || disabled}
                            className="h-10 px-4 bg-primary text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm flex items-center gap-1.5 shrink-0"
                        >
                            {isGeocoding ? (
                                <>
                                    <span className="animate-spin material-symbols-outlined notranslate text-[16px]">progress_activity</span>
                                    Mencari...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined notranslate text-[16px]">search</span>
                                    Cari Lokasi
                                </>
                            )}
                        </button>
                    </div>
                    {geocodeError && (
                        <p className="text-xs text-blue-500 font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                            {geocodeError}
                        </p>
                    )}
                </div>
            )}

            {/* Map */}
            {selectedPreset && (
                <div className="rounded-xl overflow-hidden border-2 border-slate-200 shadow-sm mt-1 animate-in fade-in duration-300" style={{ height: '250px' }}>
                    <MapContainer
                        center={[mapCenter.lat, mapCenter.lng]}
                        zoom={15}
                        style={{ height: '100%', width: '100%' }}
                        ref={mapRef}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapRecenter lat={mapCenter.lat} lng={mapCenter.lng} />
                        {markerPos && (
                            <Marker position={[markerPos.lat, markerPos.lng]}>
                                <Popup>
                                    <div className="text-sm font-medium">
                                        {selectedPresetData?.name || customAddress || 'Lokasi'}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {markerPos.lat.toFixed(6)}, {markerPos.lng.toFixed(6)}
                                    </div>
                                </Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </div>
            )}

            {/* Coordinates display */}
            {markerPos && (
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="material-symbols-outlined notranslate text-[14px] text-slate-400">my_location</span>
                    <span className="text-[11px] text-slate-500 font-mono">
                        {markerPos.lat.toFixed(7)}, {markerPos.lng.toFixed(7)}
                    </span>
                </div>
            )}
        </div>
    );
};

export default LocationPicker;
