import { useState } from 'react';
import Sidebar from '../components/mahasiswa/Sidebar';
import MobileHeader from '../components/mahasiswa/MobileHeader';
import { useAuth } from '../context/AuthContext';
import ProfileCard from '../components/mahasiswa/profile/ProfileCard';
import ProfileForm from '../components/mahasiswa/profile/ProfileForm';

const Profile = () => {
    const { user } = useAuth();

    // Mock extended data since we don't have a real backend for these yet
    // In a real app, these would come from an API or AuthContext
    const [profileData, setProfileData] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        whatsapp: user?.whatsapp || '',
        address: user?.address || '',
        provinsi: user?.provinsi || '',
        kotaKabupaten: user?.kotaKabupaten || '',
        kecamatan: user?.kecamatan || '',
        kelurahan: user?.kelurahan || '',
        alamatLengkap: user?.alamatLengkap || '',
        nik: user?.nik || '',
        university: user?.university || '',
        major: user?.major || '',
        universityAddress: user?.universityAddress || '',
        uniKelurahan: user?.uniKelurahan || '',
        uniKecamatan: user?.uniKecamatan || '',
        internshipType: user?.internshipType || '',
        timKerja: user?.timKerja || '',
        profileImage: localStorage.getItem('user_profile_image') || null,
        internshipDuration: user?.internshipDuration || '',
        conversionType: user?.conversionType || '',
        nim: user?.nim || '12345678', // added safety mock
        semester: user?.semester || '6' // added safety mock
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert('Ukuran file maksimal 2MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setProfileData(prev => ({ ...prev, profileImage: base64String }));
                // In a real app, upload this file to backend
                localStorage.setItem('user_profile_image', base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsEditing(false);

        // Save updated profile data to localStorage
        // Note: timKerja is NOT editable by student, it's assigned by Admin
        const updatedUser = {
            ...user,
            name: profileData.fullName,
            phone: profileData.phone,
            whatsapp: profileData.whatsapp,
            address: profileData.address,
            provinsi: profileData.provinsi,
            kotaKabupaten: profileData.kotaKabupaten,
            kecamatan: profileData.kecamatan,
            kelurahan: profileData.kelurahan,
            alamatLengkap: profileData.alamatLengkap,
            nik: profileData.nik,
            university: profileData.university,
            major: profileData.major,
            universityAddress: profileData.universityAddress,
            uniKelurahan: profileData.uniKelurahan,
            uniKecamatan: profileData.uniKecamatan,
            internshipDuration: profileData.internshipDuration,
            conversionType: profileData.conversionType,
            nim: profileData.nim,
            semester: profileData.semester
        };
        localStorage.setItem('brida_user', JSON.stringify(updatedUser));

        // Also update the registration data if it exists
        const savedReg = localStorage.getItem('brida_latest_registration');
        if (savedReg) {
            const parsedReg = JSON.parse(savedReg);
            const updatedReg = {
                ...parsedReg,
                name: profileData.fullName,
                phone: profileData.phone,
                whatsapp: profileData.whatsapp,
                address: profileData.address,
                provinsi: profileData.provinsi,
                kotaKabupaten: profileData.kotaKabupaten,
                kecamatan: profileData.kecamatan,
                kelurahan: profileData.kelurahan,
                alamatLengkap: profileData.alamatLengkap,
                nik: profileData.nik,
                university: profileData.university,
                major: profileData.major,
                universityAddress: profileData.universityAddress,
                uniKelurahan: profileData.uniKelurahan,
                uniKecamatan: profileData.uniKecamatan,
                internshipDuration: profileData.internshipDuration,
                conversionType: profileData.conversionType
                // timKerja is NOT updated here - assigned by Admin only
            };
            localStorage.setItem('brida_latest_registration', JSON.stringify(updatedReg));
        }

        alert('Profil berhasil diperbarui!');
    };

    return (
        <div className="flex h-screen w-full bg-[#fafafa] text-[#1b0d0d] font-display overflow-hidden">
            <Sidebar />

            <div className="flex h-full flex-1 flex-col overflow-hidden">
                <MobileHeader title="Profil Saya" />

                <main className="flex-1 overflow-y-auto bg-[#fafafa] p-4 lg:p-8">
                    <div className="w-full max-w-4xl mx-auto space-y-6 pb-10">
                        {/* Header */}
                        <div className="mb-2">
                            <h1 className="text-2xl font-bold text-[#1b0d0d]">Profil Saya</h1>
                            <p className="text-sm text-[#9a4c4c] mt-1">Kelola informasi pribadi dan data akademik Anda.</p>
                        </div>

                        {/* Profile Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-[#f3e7e7] p-6 lg:p-8">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                {/* Left Column: Avatar & Status using Component */}
                                <ProfileCard
                                    profileData={profileData}
                                    isEditing={isEditing}
                                    onImageChange={handleImageChange}
                                />

                                {/* Right Column: Details Form using Component */}
                                <ProfileForm
                                    profileData={profileData}
                                    isEditing={isEditing}
                                    onInputChange={handleInputChange}
                                    onSave={handleSave}
                                    onCancel={() => setIsEditing(false)}
                                    onEditClick={() => setIsEditing(true)}
                                />
                            </div>
                        </div>
                    </div>
                </main >
            </div >
        </div >
    );
};

export default Profile;
