
//Setup light sensor
void setup() {
  // put your setup code here, to run once:
pinMode(A0,INPUT);
pinMode(24,OUTPUT);
pinMode(52,OUTPUT);
Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  int curVal = analogRead(A0); //reads from the light sensor
  if(curVal>130) //measured threshold for black/white distinction
  {
    digitalWrite(24,HIGH); //read by the Pi to determine whether to increase count
    digitalWrite(52,HIGH); //read by the Pi to determine whether to increase count
    Serial.print("High  "); //for debugging
    Serial.println(curVal); //for debugging
  }
  else
  {
    digitalWrite(24,LOW); //read by the Pi to determine whether to increase count
    digitalWrite(52,LOW); //read by the Pi to determine whether to increase count
    Serial.print("LOW  "); //for debugging
    Serial.println(curVal);//for debugging
  } 
}
