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

	// 2. Initialize Database connection
	db, err := database.Connect(&cfg.Database)
	if err != nil {
		log.Fatalf("Fatal: Database initialization failed: %v", err)
	}

	// 3. Run database migrations
	if err := database.Migrate(db); err != nil {
		log.Fatalf("Fatal: Database migration failed: %v", err)
	}

	// 4. Seed development data (only in non-production environments)
	if cfg.App.Env != "production" {
		if err := database.Seed(db); err != nil {
			log.Fatalf("Fatal: Database seed failed: %v", err)
		}
	}

	// 5. Initialize Router and Middlewares
	router := route.SetupRouter(cfg, db)

	// 6. Start HTTP Server
	serverAddr := ":" + cfg.App.Port
	log.Printf("RentSpace API listening on http://localhost%s\n", serverAddr)
	if err := router.Run(serverAddr); err != nil {
		log.Fatalf("Fatal: Failed to start HTTP server: %v", err)
	}
}