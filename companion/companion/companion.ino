#include <WiFi.h>
#include <WebServer.h>
#include "DHT.h"
#include <LiquidCrystal_SR.h>

LiquidCrystal_SR lcd(17,16,21);

// 🔐 WiFi Credentials
const char* ssid = "WIFI_SSID";
const char* password = "WIFI_PASSWORD";

// 🌡️ DHT Setup
#define DHTPIN 19
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

// 🌐 Web Server
WebServer server(80);

// 📡 Handle /data route
void handleData() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(500, "application/json", "{\"error\":\"Sensor read failed\"}");
    return;
  }

  String json = "{";
  json += "\"temperature\":" + String(temperature) + ",";
  json += "\"humidity\":" + String(humidity);
  json += "}";

  // ✅ ADD THIS LINE
  server.sendHeader("Access-Control-Allow-Origin", "*");

  server.send(200, "application/json", json);
}

// 🟢 Setup
void setup() {
  lcd.begin(16,2);
  lcd.clear();
  Serial.begin(115200);

  dht.begin();

  // Connect WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  lcd.setCursor(0, 0);
  lcd.print("Connecting Wifi");
  lcd.setCursor(0,1);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    lcd.print("=");
  }
  lcd.clear();
  Serial.println("\nConnected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  lcd.setCursor(0,0);
  lcd.print("Companion IP:");
  lcd.setCursor(0,1);
  lcd.print(WiFi.localIP());


  // Routes
  server.on("/data",handleData);

  // Start server
  server.begin();
  Serial.println("Server started");
}

// 🔁 Loop
void loop() {
  server.handleClient();
}