package config

import (
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/joho/godotenv"
)

type Config struct {
	App      AppConfig
	Database DatabaseConfig
	JWT      JWTConfig
	CORS     CORSConfig
	Payment  PaymentConfig
}

type PaymentConfig struct {
	MidtransServerKey string
}

type AppConfig struct {
	Name string
	Env  string
	Port string
}

type DatabaseConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	Name     string
	SSLMode  string
}

type JWTConfig struct {
	Secret          string
	ExpirationHours int
}

type CORSConfig struct {
	AllowedOrigins []string
}

func LoadConfig() *Config {
	// Try loading .env from current directory or parent directory
	if err := godotenv.Load(); err != nil {
		if err := godotenv.Load("../.env"); err != nil {
			log.Println("Note: .env file not found, loading from system environment")
		}
	}

	expHours, err := strconv.Atoi(getEnv("JWT_EXPIRATION_HOURS", "24"))
	if err != nil {
		expHours = 24
	}

	originsRaw := getEnv("CORS_ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
	var origins []string
	for _, orig := range strings.Split(originsRaw, ",") {
		trimmed := strings.TrimSpace(orig)
		if trimmed != "" {
			origins = append(origins, trimmed)
		}
	}

	return &Config{
		App: AppConfig{
			Name: getEnv("APP_NAME", "RentSpace"),
			Env:  getEnv("APP_ENV", "development"),
			Port: getEnv("APP_PORT", "8080"),
		},
		Database: DatabaseConfig{
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnv("DB_PORT", "5432"),
			User:     getEnv("DB_USER", "postgres"),
			Password: getEnv("DB_PASSWORD", ""),
			Name:     getEnv("DB_NAME", "rentspace_db"),
			SSLMode:  getEnv("DB_SSLMODE", "disable"),
		},
		JWT: JWTConfig{
			Secret:          getEnv("JWT_SECRET", "super-secret-rentspace-jwt-key-default"),
			ExpirationHours: expHours,
		},
		CORS: CORSConfig{
			AllowedOrigins: origins,
		},
		Payment: PaymentConfig{
			MidtransServerKey: getEnv("MIDTRANS_SERVER_KEY", ""),
		},
	}
}

func getEnv(key string, defaultValue string) string {
	val := os.Getenv(key)
	if val == "" {
		return defaultValue
	}
	return val
}
