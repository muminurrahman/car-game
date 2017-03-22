function road(){
  var concrete = 400;
  var paint = concrete/4
  fill(200);
  rect(width/2, height/2, width,paint);
  fill(100);
  rect(width/2, height/2, width, concrete);

  for(var i = 0; i < width; i=i +40){
    fill(255);
    rect(i,height/2,50,6);
    fill(255)
    rect(i,height/2-paint,25,6);
    rect(i,height/2+paint,25,6);
  }
}