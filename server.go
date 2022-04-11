package main

import (
	"io/ioutil"
	"math/rand"
	"sort"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	rand.Seed(time.Now().Unix())

	router.Use(static.Serve("/", static.LocalFile("./build", true)))

	router.GET("/api/images", func(c *gin.Context) {
		fileInfo, _ := ioutil.ReadDir("./build/images/gallery")
		var files []string

		sort.Slice(fileInfo, func(i, j int) bool {
			return fileInfo[i].ModTime().After(fileInfo[j].ModTime())
		})

		for _, f := range fileInfo {
			if strings.Contains(f.Name(), "png") {
				files = append(files, f.Name())
			}
		}
		c.JSON(200, files)
	})

	router.NoRoute(func(c *gin.Context) {
		c.File("./build/")
	})

	router.Run(":8080")
}
