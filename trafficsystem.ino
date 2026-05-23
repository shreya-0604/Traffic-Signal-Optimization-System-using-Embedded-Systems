int red[] = {2,5,8,11};
int yellow[] = {3,6,9,12};
int green[] = {4,7,10,13};

int sensor[] = {A0, A1, A2, A3};

int density[4];

void setup() {
  for(int i=0;i<4;i++){
    pinMode(red[i], OUTPUT);
    pinMode(yellow[i], OUTPUT);
    pinMode(green[i], OUTPUT);
    pinMode(sensor[i], INPUT);
  }
}

void loop() {

  // Read sensors
  for(int i=0;i<4;i++){
    density[i] = digitalRead(sensor[i]);
  }

  // Find road with highest traffic
  int maxIndex = 0;
  for(int i=1;i<4;i++){
    if(density[i] > density[maxIndex]){
      maxIndex = i;
    }
  }

  // All RED
  for(int i=0;i<4;i++){
    digitalWrite(red[i], HIGH);
    digitalWrite(yellow[i], LOW);
    digitalWrite(green[i], LOW);
  }

  // Selected road GREEN
  digitalWrite(red[maxIndex], LOW);
  digitalWrite(green[maxIndex], HIGH);

  delay(5000);

  // YELLOW transition
  digitalWrite(green[maxIndex], LOW);
  digitalWrite(yellow[maxIndex], HIGH);

  delay(2000);

  digitalWrite(yellow[maxIndex], LOW);
}
