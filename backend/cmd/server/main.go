package main

import (
	"log"

	"github.com/Marco28106/rentspace/backend/internal/config"
	"github.com/Marco28106/rentspace/backend/internal/database"
	"github.com/Marco28106/rentspace/backend/internal/route"
)

func main() {
	// 1. Load configuration
	cfg := config.LoadConfig()
	log.Printf("Starting %s in %s mode\n", cfg.App.Name, cfg.App.Env)

	// 2. Initialize Database connection (non-fatal in dev)
	db, err := database.Connect(&cfg.Database)
	if err != nil {
		log.Printf("Warning: Database initialization failed, starting without DB: %v", err)
		db = nil
	}

	// Run migrations and seed data in development when DB is available
	if db != nil {
		if err := database.Migrate(db); err != nil {
			log.Printf("Error running migrations: %v", err)
		} else {
			log.Println("Migrations applied")
		}
		if err := database.Seed(db); err != nil {
			log.Printf("Error running seed: %v", err)
		} else {
			log.Println("Seed completed")
		}
	}

	// 3. Initialize Router and Middlewares
	router := route.SetupRouter(cfg, db)

	// 4. Start HTTP Server
	serverAddr := ":" + cfg.App.Port
	log.Printf("RentSpace API listening on http://localhost%s\n", serverAddr)
	if err := router.Run(serverAddr); err != nil {
		log.Fatalf("Fatal: Failed to start HTTP server: %v", err)
	}
}
