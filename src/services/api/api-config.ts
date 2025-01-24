const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://pindai-be.test/api/v1"

export const API_ENDPOINTS = {
  DOSEN: "/dosen",
  CURRENT_USER: "/me",
  PROFILE: "/profile",
  LOGIN: "/auth/login",
  ANGGOTA: "/list/dosen",
  LOGOUT: "/auth/logout",
  LIST_PRODI: "/list/prodi",
  REGISTER: "/auth/register",
  LIST_FAKULTAS: "/list/fakultas",
  LIST_SCHOLAR: "/list/author-scholar",
  LIST_INDEKSASI: "/list/jenis-indeksasi",
  LIST_PENELITIAN: "/list/jenis-penelitian",
  LIST_PENGABDIAN: "/list/jenis-pengabdian",
  LIST_PUBLIKASI: "/list/jenis-publikasi",
  LIST_APPROVED_PENELITIAN: "/list/approved/penelitian",
  LIST_CANCELED_PENELITIAN: "/list/canceled/penelitian",
  LIST_APPROVED_PENGABDIAN: "/list/approved/pengabdian",
  LIST_CANCELED_PENGABDIAN: "/list/canceled/pengabdian",
  LIST_APPROVED_PUBLIKASI: "/list/approved/publikasi",
  LIST_CANCELED_PUBLIKASI: "/list/canceled/publikasi",
}

export const API_ENDPOINTS_KEUANGAN = {
  PENELITIAN: "/keuangan/penelitian",
  PENGABDIAN: "/keuangan/pengabdian",
  PUBLIKASI: "/keuangan/publikasi",

  APPROVED_PENELITIAN: "/keuangan/approved/penelitian",
  CANCELED_PENELITIAN: "/keuangan/canceled/penelitian",
  APPROVED_PENGABDIAN: "/keuangan/approved/pengabdian",
  CANCELED_PENGABDIAN: "/keuangan/canceled/pengabdian",
  APPROVED_PUBLIKASI: "/keuangan/approved/publikasi",
  CANCELED_PUBLIKASI: "/keuangan/canceled/publikasi",
}

export const API_ENDPOINTS_DPPM = {
  APPROVED_PENELITIAN: "/dppm/approved/penelitian",
  CANCELED_PENELITIAN: "/dppm/canceled/penelitian",
  APPROVED_PENGABDIAN: "/dppm/approved/pengabdian",
  CANCELED_PENGABDIAN: "/dppm/canceled/pengabdian",
  APPROVED_PUBLIKASI: "/dppm/approved/publikasi",
  CANCELED_PUBLIKASI: "/dppm/canceled/publikasi",
  PENELITIAN: "/dppm/penelitian",
  PENGABDIAN: "/dppm/pengabdian",
  DASHBOARD: "/dppm/dashboard",
  FAKULTAS: "/dppm/fakultas",
  KAPRODI: "/dppm/kaprodi",
  DOSEN: "/dppm/dosen",
}

export const API_ENDPOINTS_KAPRODI = {
  DOSEN: "/kaprodi/dosen",
  DASHBOARD: "/kaprodi/dashboard",
  ACTIVE: "/kaprodi/active/dosen",
  PENELITIAN: "/kaprodi/penelitian",
  PENGABDIAN: "/kaprodi/pengabdian",
  APPROVED: "/kaprodi/approved/dosen",
  APPROVED_PENELITIAN: "/kaprodi/approved/penelitian",
  CANCELED_PENELITIAN: "/kaprodi/canceled/penelitian",
  APPROVED_PENGABDIAN: "/kaprodi/approved/pengabdian",
  CANCELED_PENGABDIAN: "/kaprodi/canceled/pengabdian",
  APPROVED_PUBLIKASI: "/kaprodi/approved/publikasi",
  CANCELED_PUBLIKASI: "/kaprodi/canceled/publikasi",
}

export const API_ENDPOINTS_DOSEN = {
  AKUN: "/dosen/akun",
  DOSEN: "/dosen/dosen",
  DASHBOARD: "/dosen/dashboard",
  PENELITIAN: "/dosen/penelitian",
  PENGABDIAN: "/dosen/pengabdian",
  PUBLIKASI: "/dosen/publikasi",
  DOWNLOAD_PENELITIAN: "/dosen/penelitian/download",
  DOWNLOAD_PENGABDIAN: "/dosen/pengabdian/download",
  UPLOAD_PENELITIAN: "/dosen/penelitian/upload",
  UPLOAD_PENGABDIAN: "/dosen/pengabdian/upload",
}

export { API_BASE_URL }
