package main

import (
	"net/http"
)

func root(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		http.ServeFile(w, r, r.URL.Path[1:])
	}
}

func main() {
	println("Serve has running...")
	http.HandleFunc("/", root)
	http.ListenAndServe(":8080", nil)
}
