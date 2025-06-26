package main

import "regexp"

func DetectIntent(text string) string {
	text = regexp.MustCompile(`(?i)\s+`).ReplaceAllString(text, " ")

	if matched, _ := regexp.MatchString(`(?i)\b(cuti|sisa)\b`, text); matched {
		return "cek_cuti"
	}
	if matched, _ := regexp.MatchString(`(?i)\b(kontrak|surat)\b`, text); matched {
		return "permintaan_dokumen"
	}
	if matched, _ := regexp.MatchString(`(?i)\b(thr|tunjangan)\b`, text); matched {
		return "tanya_kebijakan_thr"
	}
	if matched, _ := regexp.MatchString(`(?i)\b(status|kontrak|tetap|pegawai tetap|pegawai kontrak)\b`, text); matched {
		return "status_karyawan"
	}
	if matched, _ := regexp.MatchString(`(?i)\b(bpjs|jaminan|klaim|asuransi)\b`, text); matched {
		return "info_bpjs"
	}

	return "unknown"
}
