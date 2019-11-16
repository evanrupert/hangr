#This is the python script that runs on the Raspberry Pi

import requests
import json
import time

import RPi.GPIO as GPIO
import time

URL = "http://6be0a9f4.ngrok.io/api/checkcarouselqueue"

SLEEP_TIME = 3

GPIO.setmode(GPIO.BCM)

GPIO.setup(23,GPIO.OUT)
GPIO.setup(17,GPIO.IN,pull_up_down=GPIO.PUD_UP)

p=GPIO.PWM(23,50)


cur = 0
def spin_to_win(target):
	global cur

	diff = ((target - cur) % 8 + target) % 8

	if diff:
		p.start(26)
	if (diff <2):
		diff+=8

	ct = 0

	prev = False
	while True:
		state = GPIO.input(17)
		print(state,prev)		
		print(prev != state)
		if not prev and state:
			if(ct == diff):
				p.stop()
				break
			else:
				ct+=1
				
		prev = state

	cur = target

while True:
	r= requests.get(URL)
		
	if r.status_code == 200:
		print("pulled data!","hello")
	else:
		print("failed to pull data. You suck")
	
	resp = r.json()
	if resp["messageInQueue"]:
		msg = resp["message"]
		print(msg["top"])


		spin_to_win(int(msg['top']))
	else:
		print("No new message in queue")
	
	time.sleep(SLEEP_TIME)

