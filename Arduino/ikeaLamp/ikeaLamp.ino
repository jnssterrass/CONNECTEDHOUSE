/*
  CONNECTED HOUSE DEVICE

 A simple web server that responds to specific Domotics API
 using an Arduino Ethernet shield.

 Circuit:
 * Ethernet shield attached to pins 10, 11, 12, 13
 * Digital outputs attached to pins 2 and 3

 created April 2015
 by Juan Salmerón Moya

 */

#include <SPI.h>
#include <Ethernet.h>

// Enter a MAC address and IP address for your controller below.
// The IP address will be dependent on your local network:
byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};
IPAddress ip(192, 168, 137, 5);
//IPAddress ip(169, 254, 122, 85);

//Relay 1 attached to pin(2)
boolean relay1_level = LOW;
//Relay 2 attached to pin(3)
boolean relay2_level = LOW;

// Initialize the Ethernet server library
// with the IP address and port you want to use
// (port 80 is default for HTTP):
EthernetServer server(80);

void setup() {
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }

  // start the Ethernet connection and the server:
  Ethernet.begin(mac, ip);
  server.begin();
  Serial.print("server is at ");
  Serial.println(Ethernet.localIP());
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, INPUT);
}

String getDevice(const String& request) {
  int indexFrom = request.indexOf("device")+7;
  int indexTo = request.indexOf("&",indexFrom);  
  String device = request.substring(indexFrom,indexTo);
  return device;
}

String getAction(const String& request) {
  int indexFrom = request.indexOf("action")+7;
  int indexTo = request.indexOf("&",indexFrom);
  String action = request.substring(indexFrom,indexTo);
  return action;
}

String getValue(const String& request) {
  int indexFrom = request.indexOf("value")+7;
  int indexTo = request.indexOf("&",indexFrom);
  String value = request.substring(indexFrom,indexTo);
  return value;
}

void sendResponse200ok(EthernetClient& client) {
  client.println("HTTP/1.1 200 OK");
}

void innerSendResponse(EthernetClient& client, String& s) {
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/html");
  client.println("Connection: close");  // the connection will be closed after completion of the response
  client.println();
  client.println(s);
}

void sendResponse(EthernetClient& client, String s) {
  String aux = s;
  innerSendResponse(client,aux);
}

void sendPOSTResponse(EthernetClient& client, String device, String action, String value, String response) {
  String aux = "{\"device\":\"";
  aux += device;
  aux += "\",\"action\":\"";
  aux += action; 
  aux += "\",\"value\":\""; 
  aux += value;
  aux += "\",\"response\":\""; 
  aux += response;
  aux += "\"}";
  innerSendResponse(client,aux);
}

void loop() {
  // listen for incoming clients
  EthernetClient client = server.available();
  if (client) {
    Serial.println("new client");
    Serial.println(".................................");
    Serial.println("REQUEST:\n");
    
    // Get Request
    String request = "";
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        //Serial.write(c);
        request.concat(c);
      }
      else break;
    }
   
    // Print request
    Serial.println("request processed");
    //Serial.print(request);
    
    // Process request to get DEVICE, ACTION and VALUE
    String DEVICE = "";
    String ACTION = "";
    String VALUE = "";
    if(request.indexOf("device") > -1) {
      Serial.println("DEVICE:");
      DEVICE = getDevice(request);
      Serial.println(DEVICE);
      if(request.indexOf("action") > -1) {
        Serial.println("ACTION:");
        ACTION = getAction(request);
        Serial.println(ACTION);  
        if(request.indexOf("value") > -1) {
          Serial.println("VALUE:");
          VALUE = getValue(request);
          Serial.println(VALUE);
        } 
        else Serial.println("request without value");                  
      }
      else Serial.println("request without action");    
    }
    else Serial.println("request without device");

    // Perform actions
    // Ikea Lamp
    if(DEVICE == "554133ea5a6531af894ff621") {
      if (ACTION == "a1") {
        digitalWrite(2, HIGH);
        sendPOSTResponse(client,DEVICE,ACTION,VALUE,"a1");
      } else if (ACTION == "a2") {
        digitalWrite(2, LOW);
        sendPOSTResponse(client,DEVICE,ACTION,VALUE,"a2");
      } else {
        sendPOSTResponse(client,DEVICE,ACTION,VALUE,"unknown_action");
      }
    }
    else {
      sendPOSTResponse(client,DEVICE,ACTION,VALUE,"unknown_device");
    }
 
    Serial.println(".................................");
    // give the web browser time to receive the data
    delay(1);
    // close the connection:
    client.stop();
    Serial.println("client disconnected");
  }
}

