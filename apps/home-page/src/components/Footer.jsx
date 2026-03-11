import React from 'react';

const Footer = () => {
    return (
        <footer id="contact" className="footer-section">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-brand-col">
                        <div className="footer-brand-header">
                            <div className="bg-white p-2 rounded-lg inline-flex mb-0">
                                <img src="/logo1.png" alt="Logo 1" className="h-10 w-auto object-contain" />
                                <img src="/logo.png" alt="BRIGHT Logo" className="h-10 w-auto object-contain" />
                            </div>
                            <div className="footer-brand-text">
                                <span className="font-bold text-xl leading-none">BRIGHT</span>
                                <span className="text-xs uppercase font-bold text-blue-200">Surabaya</span>
                            </div>
                        </div>
                        <p className="footer-brand-desc">Badan Riset dan Inovasi Daerah Kota Surabaya. Mendorong riset dan inovasi untuk masa depan yang lebih baik.</p>
                    </div>
                    <div>
                        <h4 className="footer-col-title">Kontak Kami</h4>
                        <div className="footer-contact-list">
                            <div className="footer-contact-item">
                                <span className="material-symbols-outlined notranslate text-lg mt-0.5">location_on</span>
                                <span>Jl. Jimerto No. 25-27,<br />Surabaya, Jawa Timur</span>
                            </div>
                            <div className="footer-contact-item">
                                <span className="material-symbols-outlined notranslate text-lg">call</span>
                                <span>(031) 5312144</span>
                            </div>
                            <div className="footer-contact-item">
                                <span className="material-symbols-outlined notranslate text-lg">mail</span>
                                <span>brida@surabaya.go.id</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="footer-col-title">Sosial Media</h4>
                        <div className="footer-social-list">
                            {/* Social Icons SVGs omitted for brevity in thought, but included here */}
                            <a href="#" className="footer-social-link">
                                <span className="sr-only">Instagram</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.488 2h-.173zM12.315 4.344h-.055c-2.324 0-2.607.01-3.524.051-.849.039-1.31.183-1.617.302-.403.156-.693.342-.997.646-.304.305-.49.595-.646.997-.119.307-.263.768-.302 1.617-.041.917-.051 1.2-.051 3.524v.055c0 2.324.01 2.607.051 3.524.039.849.183 1.31.302 1.617.156.403.342.693.646.997.305.304.49-.595.646-.997.119-.307.263-.768.302-1.617.041-.917.051-1.2.051-3.524v-.055c0-2.324-.01-2.607-.051-3.524-.039-.849-.183-1.31-.302-1.617-.156-.403-.342-.693-.646-.997-.304-.305-.49-.595-.997-.646-.307-.119-.768-.263-1.617-.302-.917-.041-1.2-.051-3.524-.051zM12.315 7.632a4.684 4.684 0 110 9.368 4.684 4.684 0 010-9.368zm0 2.344a2.34 2.34 0 100 4.68 2.34 2.34 0 000-4.68zm5.534-3.667a.879.879 0 110 1.758.879.879 0 010-1.758z" fillRule="evenodd"></path></svg>
                            </a>
                            <a href="#" className="footer-social-link">
                                <span className="sr-only">WhatsApp</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
                            </a>
                            <a href="#" className="footer-social-link">
                                <span className="sr-only">YouTube</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" fillRule="evenodd"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className="footer-copyright">© 2026 Badan Riset dan Inovasi Daerah Kota Surabaya.</p>
                    <div className="footer-links">
                        <a href="/#privacy" className="footer-link">Kebijakan Privasi</a>
                        <a href="/#terms" className="footer-link">Syarat &amp; Ketentuan</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
