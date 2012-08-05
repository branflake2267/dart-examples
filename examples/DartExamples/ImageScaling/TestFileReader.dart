#import('dart:html');

void main() {
  FileReader reader = new FileReader();
  
  int done = FileReader.DONE;
  int empty = FileReader.EMPTY;
  int loading = FileReader.LOADING;
  
  reader.abort();
  
  reader.on.abort.add((e) => print(e));
  reader.on.error.add((e) => print(e));
  reader.on.load.add((e) => print(e));
  reader.on.loadEnd.add((e) => print(e));
  reader.on.loadStart.add((e) => print(e));
  reader.on.progress.add((e) => print(e));
  
  FileReaderEvents events = reader.on;
}
