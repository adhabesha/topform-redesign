package main

import (
	"embed"
	"encoding/json"
	"io/fs"
	"log"
	"net/http"
	"os"
	"strings"
)

//go:embed static
var content embed.FS

type enquiry struct {
	Name, Mobile, Email, Device, Subject, Description string
}

func main() {
	site, _ := fs.Sub(content, "static")
	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(http.FS(site)))
	mux.HandleFunc("/api/contact", func(w http.ResponseWriter, r *http.Request) {
		var e enquiry
		if r.Method != http.MethodPost || json.NewDecoder(http.MaxBytesReader(w, r.Body, 1<<16)).Decode(&e) != nil ||
			strings.TrimSpace(e.Name) == "" || !strings.Contains(e.Email, "@") {
			http.Error(w, "Please enter your name and a valid email.", http.StatusBadRequest)
			return
		}
		log.Printf("ENQUIRY %+v", e) // TODO: forward to info@topformtechnologies.com (SMTP/Resend)
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"ok":true}`))
	})
	mux.HandleFunc("/healthz", func(w http.ResponseWriter, _ *http.Request) { w.Write([]byte("ok")) })
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Println("Topform site on :" + port)
	log.Fatal(http.ListenAndServe(":"+port, mux))
}
