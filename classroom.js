img="";
status="";
object=[];
function preload()
{
    img=loadImage("classroom.jpg");
}
function setup()
{
    canvas=createCanvas(640,420);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML='Status:Detecting Objects';
}
function modelLoaded()
{
    console.log("Model Loaded!");
    status=true;
    objectDetector.detect(img,gotResult);
}
function gotResult(error, results)
{
    if(error) 
    {
      console.log(error);
    }
    console.log(results);
    object=results;
}
function draw()
{
    image(img,0,0,640,420);

    if(status !="")
    {
        r=random(255);
        g=random(255);
        b=random(255);
         objectDetector.detect(img,gotResult);
         for (let index = 0; index < object.length; index++) {
            document.getElementById("status").innerHTML="status:object detected";
            fill(r,g,b);
            document.getElementById("number_of_objects").innerHTML="Number Of Object Detected are : "+object.length;
            percent=floor(object[index].confidence*100);
            text(object[index].label+","+percent+"%",object[index].x+15,object[index].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[index].x,object[index].y,object[index].width,object[index].height);
 
             
         }
    }
}