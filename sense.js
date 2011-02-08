jQuery(document).ready(function() {

  var canvasWidth=960;
  var canvasHeight=300;

  var backgroundColour="210,255,255";

  var circleCount = 15;
  var delay =10;//miliseconds betweek update

  //list of all the RGB colour options
  var colours=['255, 255,0 ,',
              '255,0,255,',
              '0,255,255,'
              ];
  //list of all the potential alpha levels            
  var alphas=['0.7',
              '0.3'
              ];
  //diamter of shapes
  var sizes=['20','30','50','35'];
  //X change on update
  var xDeltas=['.01','-.02','.04'];
  //Y change on update
  var yDeltas=['-.02','-.01','.03'];



  
  $(function() {
                // Shape class
                var Shape = $.Class.create({
                    // constructor
                    initialize: function(X,Y,dX,dY,Alpha,rgb,Size) {
                        this._X=X;
                        this._Y=Y;
                        this._deltaX=dX;
                        this._deltaY=dY;
                        this._alpha=Alpha;
                        this._RGB=rgb;
                        this._size=Size;
                        
                        ctx = $('#canvas')[0].getContext("2d");
                       // ctx.globalCompositeOperation = 'lighter';//https://developer.mozilla.org/en/Canvas_tutorial/Compositing


                    },
                    // methods
                    draw: function(){
                        ctx.beginPath();
                        ctx.fillStyle = "rgba("+this._RGB+this._alpha+")";
                       // ctx.clearRect(this._X, this._Y,this._size,this._size);//clears an area  
                        ctx.arc(this._X, this._Y,this._size, 0, Math.PI*2, true); 
                        ctx.closePath();
                        ctx.fill();

                        this._X -= this._deltaX;
                        this._Y -= this._deltaY;
                    },

                    fillBackground: function(){
                      ctx.fillStyle = "rgb("+backgroundColour+")";
                      ctx.fillRect(0,0,canvasWidth,canvasHeight);
                    }

                }, {
                    // properties
                    getset: [['X','_X'],['Y','_Y'],['deltaX','_deltaX'],['deltaY','_deltaY'],['alpha','_alpha'],['RGB','_RGB'],['size','_size']]
                });
  

                //loops found building random circles
                var shapes = new Array();
                var xStart, yStart, xDelta, yDelta, alpha, colour, size;
                for (var i =0; i<circleCount;i++){
                  xStart = Math.floor(Math.random()*canvasWidth);
                  yStart = Math.floor(Math.random()*canvasHeight) ;
                  xDelta = xDeltas[Math.floor(Math.random()*xDeltas.length)];
                  yDelta = yDeltas[Math.floor(Math.random()*yDeltas.length)];
                  alpha = alphas[Math.floor(Math.random()*alphas.length)];
                  colour = colours[Math.floor(Math.random()*colours.length)];
                  size = sizes[Math.floor(Math.random()*sizes.length)];
               
                  a1 = new Shape(xStart,yStart,xDelta,yDelta,alpha,colour,size);
                  shapes[i] =a1;
                }
                
                //loops round calling the update function
                var pause=0;
                for (var j = 0; j < 40000; j++) {
                   setTimeout(update,pause);
                   pause+=delay;
                }
               

              //updates the screen redrawing background and updating postions
              function update(){
                shapes[0].fillBackground();
                for (var i = 0; i < shapes.length; i++) {
                   var run = shapes[i].draw();
                }
                
              }


                
             });



               
});


