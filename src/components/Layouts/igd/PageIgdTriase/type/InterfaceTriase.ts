export interface DataPemeriksaanTriase {
    kode_pemeriksaan: string,
    nama_pemeriksaan: string,
}

export interface DataSkalaTriase {
    map(arg0: (scale: any) => import('react/jsx-runtime').JSX.Element): import('react').ReactNode;
    length: number;
    kode_pemeriksaan: string;
    kode_skala1?: string;
    pengkajian_skala1?: string;
    kode_skala2?: string;
    pengkajian_skala2?: string;
    kode_skala3?: string;
    pengkajian_skala3?: string;
    kode_skala4?: string;
    pengkajian_skala4?: string;
    kode_skala5?: string;
    pengkajian_skala5?: string;
}
