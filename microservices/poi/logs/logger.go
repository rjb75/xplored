package logs

import (
	"log"
	"os"
)

var (
	ErrorLogger *log.Logger
	InfoLogger  *log.Logger
)

// method to create log file for normal functionality
func InitLogs() {
	logfile, err := os.OpenFile("../../../logs/poi.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)

	if err != nil {
		log.Fatal("Error creating log file")
	}

	ErrorLogger = log.New(logfile, "ERROR: ", log.Ldate|log.Ltime|log.Lshortfile)
	InfoLogger = log.New(logfile, "INFO: ", log.Ldate|log.Ltime|log.Lshortfile)
}

// method to create log file for testing
func TestLogs() {
	logfile, err := os.OpenFile("../../../logs/poi-test.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)

	if err != nil {
		log.Fatal("Error creating log file")
	}

	ErrorLogger = log.New(logfile, "ERROR: ", log.Ldate|log.Ltime|log.Lshortfile)
	InfoLogger = log.New(logfile, "INFO: ", log.Ldate|log.Ltime|log.Lshortfile)
}
