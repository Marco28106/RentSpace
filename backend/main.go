package main

import (
	"log"

	"github.com/Marco28106/rentspace/backend/internal/config"
	"github.com/Marco28106/rentspace/backend/internal/database"
	"github.com/Marco28106/rentspace/backend/internal/route"
)

func main() {
	cfg := config.LoadConfig()
	log.Printf("Starting %s in %s mode\n", cfg.App.Name, cfg.App.Env)

	db, err := database.Connect(&cfg.Database)
	if err != nil {
		log.Fatalf("Fatal: Database initialization failed: %v", err)
	}

	if err := database.Migrate(db); err != nil {
		log.Fatalf("Fatal: Database migration failed: %v", err)
	}

	if cfg.App.Env != "production" {
		if err := database.Seed(db); err != nil {
			log.Fatalf("Fatal: Database seed failed: %v", err)
		}
	}

	if err := database.EnsurePricing(db); err != nil {
		log.Fatalf("Fatal: Pricing seed failed: %v", err)
	}

	router := route.SetupRouter(cfg, db)

	serverAddr := ":" + cfg.App.Port
	log.Printf("RentSpace API listening on http://localhost%s\n", serverAddr)
	if err := router.Run(serverAddr); err != nil {
		log.Fatalf("Fatal: Failed to start HTTP server: %v", err)
	}
}
