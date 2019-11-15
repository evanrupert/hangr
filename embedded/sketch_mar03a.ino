void setup() {
  // put your setup code here, to run once:
pinMode(A0,INPUT);
pinMode(24,OUTPUT);
pinMode(52,OUTPUT);
Serial.begin(9600);

}

void loop() {
  // put your main code here, to run repeatedly:
  int curVal = analogRead(A0);
  if(curVal>130)
  {
    digitalWrite(24,HIGH);
    digitalWrite(52,HIGH);
    Serial.print("High  ");
    Serial.println(curVal);
  }
  else
  {
    digitalWrite(24,LOW);
    digitalWrite(52,LOW);
    Serial.print("LOW  ");
    Serial.println(curVal);
  } 
   
  

}
