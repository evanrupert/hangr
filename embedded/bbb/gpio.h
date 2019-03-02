struct gpio_pin {
  // ctor should probably set the direction, export it, etc

  void set(bool val);
};

template <int N>
struct gpio_number {
  gpio_pin pins[N];

  void set(int x){
    for(int i = 0; i < N; i++){
      pins.set(x & (1 << i));
    }
  }
};
