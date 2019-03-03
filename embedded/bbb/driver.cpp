#include <iostream>

#define ASIO_STANDALONE
#include <asio.hpp>

#include "gpio.h"

using namespace std;
using namespace asio;

const int MAX_RETRIES = 5;

struct engine {
  engine(string host, string endpoint, string proto = "http")
    : host(host), endpoint(endpoint), proto(proto) {}

  string ping(){
    ip::tcp::iostream stream;
    int retries = 0;
    do {
      stream.connect(host, proto);
      retries++;
    } while(!stream && retries < MAX_RETRIES);

    if(!stream){
      throw new runtime_error("Failed to connect to stream after MAX_RETRIES");
    }

    stream << "GET " << endpoint << " HTTP/1.0\r\n";
    stream << "Host: " << host << "\r\n";
    stream << "Accept: */*\r\n";
    stream << "Connection: close\r\n\r\n";
    stream.flush();

    ostringstream oss; oss << stream.rdbuf() << endl;

    string ret = oss.str();
    // filter out the everyhting but the body (I hope)

    int start = 0;
    for(int i = 0; i < ret.size() - 3; i++){
      if(ret[i] == '\r' && ret[i+1] == '\n' && ret[i+2] == '\r' && ret[i+3] == '\n')
        start = i+4;
    }

    while(isspace(ret[start]) && start < ret.size())start++;

    int end = ret.size() - 1;
    while(isspace(ret[end]) && end >= start)end--;

    return string(ret.begin() + start, ret.begin() + end + 1);
  }

  // TODO: implement GPIO stuff to send the number to arduino here
  virtual void process_response(string s) {};

  void run(){
    while(true) {
      int target = clock() + CLOCKS_PER_SEC * .5;

      cout << "running" << endl;
      process_response(ping());

      cout << "waiting" << endl;
      if(clock() < target) {
        this_thread::sleep_for(std::chrono::milliseconds(max(0, (int)(target
                                                                      - clock()))
                                                         * 1000
                                                         / CLOCKS_PER_SEC));
      }
    }
  }

private:
  string host;
  string endpoint;
  string proto;
};

struct carousel_engine: engine {
  carousel_engine(): engine(HOST, ENDPOINT){
    out.set(0);
  }

  virtual void process_response(string s) {
    out.set(stoi(s.s.c_str()));
  }

  const static string HOST = "lol idk";
  const static string ENDPOINT = "lol idk";

  gpio_number out;
};

int main(){
  cout << "Hello BBB" << endl;

  //engine e("www.icanhazip.com", "/");
  struct my_engine: engine {
    virtual void process_response(string s) {
      cout << "got: " << s << endl;
    }

    my_engine(): engine("www.icanhazip.com", "/") {}
  } e;

  e.run();

  return 0;
}
