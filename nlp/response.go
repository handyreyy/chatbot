package main

import (
	"encoding/json"
	"fmt"
	"os"
)

func GetResponse(intent string) string {
	filePath := fmt.Sprintf("mock-data/%s.json", intent)

	data, err := os.ReadFile(filePath)
	if err != nil {
		fmt.Println("❌ Gagal baca file:", err)
		return "Maaf, terjadi kesalahan saat mengambil data."
	}

	var res struct {
		Response string `json:"response"`
	}

	if err := json.Unmarshal(data, &res); err != nil {
		fmt.Println("❌ Gagal unmarshal:", err)
		return "Maaf, data tidak valid."
	}

	return res.Response
}
