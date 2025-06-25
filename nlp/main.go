package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type MessageRequest struct {
	Text string `json:"text" binding:"required"`
}

func main() {
	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	r.POST("/api/message", func(c *gin.Context) {
		var req MessageRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			log.Println("Invalid request:", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		intent := DetectIntent(req.Text)
		response := GetResponse(intent)

		c.JSON(http.StatusOK, gin.H{"response": response})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server running on port %s", port)
	r.Run("0.0.0.0:" + port)
}
