var x = 300;
var y = 150;
var vida = 0;
var tiempo=0;
var duracion = 0;
var rotacion = 0;
var msg = 0;
var punto=0;
var ard = [[aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)]];

$(document).ready(inicio);
$(document).keydown(capturaTeclado);


function inicio(){
	var lienzo = $("#lienzo")[0];
	var contexto = lienzo.getContext("2d");
	var buffer = document.createElement("canvas");
	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	contextoBuffer = buffer.getContext("2d");
	contextoBuffer.fillStyle = "#c94c4c"; 
	contextoBuffer.clearRect(0,0,700,500);
	contextoBuffer.font = "bold 60px Caveat Brush";
	contextoBuffer.fillText("¡A jugar!", 260, 200);
	contextoBuffer.fillStyle = "#c94c4c"; 
	contextoBuffer.font = "bold 70px Sue Ellen Francisco";
	contextoBuffer.fillText("Nut's", 310, 290);
	contexto.clearRect(0,0,700,500);
	contexto.drawImage(buffer, 0, 0);
	$("button").click(function(){	
		x = 50;
		y = 350;	
		punto = 0;
		tiempo = 0;
		run();		
	});
}

function aleatorio(tope){
	return Math.floor((Math.random() * tope) + 1);
} 

function capturaTeclado(event){
	if(event.keyCode=='39'){//si la tecla presionada es direccional derecho
		if (x<600){
			x+=10;//mueve la ardilla 10 pixeles a la derecha
		}		
	}
	if(event.keyCode=='37'){//si la tecla presionada es direccional izquierdo
		if (x>10){
			x-=10;//mueve la ardilla 10 pixeles a la izquierda
		}
	}
	if(event.keyCode=='38'){//si la tecla presionada es direccional arriba
		if (y>5){
			y-=0;//No hay desplazamiento
		}
	}
	if(event.keyCode=='40'){// si la tecla presionada es direccional abajo
		if (y<15){
			y+=0;//No hay desplazamiento
		}
	}
}

function Ardillas(){
	this.img = [$("#ardilla")[0],$("#nutbroken")[0]];
	this.dibujar = function(ctx,i){
		var img = this.img[i];
		ctx.drawImage(img, x, y);
		ctx.save();
		ctx.restore();
	}
	
	this.colision = function(xx,yy){
		var distancia=0;
		distancia = Math.sqrt(Math.pow((xx-x), 2)+Math.pow((yy-y),2));
		if(distancia>80)
		   return false;
		else
		   return true;	
	}
}

function Nuts(){
	this.img = $("#nut")[0];			
	this.dibujar = function(ctx, x1, y1){
		var img = this.img;
		ctx.save();
		ctx.translate(x1,y1);
        ctx.rotate(rotacion*Math.PI/320);
		ctx.drawImage(img,img.width,img.height);
		ctx.restore();
	} 
}

function run(){ 
	var lienzo = $("#lienzo")[0];
	var contexto = lienzo.getContext("2d");
	var buffer = document.createElement("canvas");
	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	contextoBuffer = buffer.getContext("2d");
	contextoBuffer.fillStyle = "#ffffff"; 
	if(tiempo <= 60){ 
		tiempo+=0.05; 		
		duracion++;	
		if(tiempo % 50 == 0)
			msg = aleatorio(7);
		var objardillas = new Ardillas();
		var objnuts = [new Nuts(), new Nuts(),new Nuts(),new Nuts(),
				        new Nuts(),new Nuts(),new Nuts(), new Nuts()]; 
		contextoBuffer.clearRect(0,0,700,500);
		contextoBuffer.font = "bold 25px Sue Ellen Francisco";
        contextoBuffer.fill = "#c94c4c"; 
		contextoBuffer.fillText("Tiempo = " + Math.round(tiempo), 50, 35);
		contextoBuffer.fillText("Puntos = " + parseInt(punto), 50, 65);
		objardillas.dibujar(contextoBuffer,0);
		
		for(i=0;i<4;i++){			
			objnuts[i].dibujar(contextoBuffer, ard[i][0],ard[i][1]);
			if(objardillas.colision(ard[i][0], ard[i][1])){
				punto +=1;
				objardillas.dibujar(contextoBuffer,1);
                ard[i][0] =- 5 ;
			    ard[i][1] = aleatorio(500);
			}
			ard[i][0]-=5;
			ard[i][1]+=10;
			ard[i][0] = (700 + ard[i][0])%700;
			ard[i][1] = (500 + ard[i][1])%500;
		}
		contexto.clearRect(0,0,700,500);
		contexto.drawImage(buffer, 0, 0);
		setTimeout("run()",20);
		$("button").css("display","none");
	}else{
		contextoBuffer.clearRect(0,0,700,500);
		contextoBuffer.font = "bold 70px Sue Ellen Francisco";
        contextoBuffer.fillStyle = "#c94c4c";
		contextoBuffer.fillText("Atrapaste", 240, 200);
		contextoBuffer.fillText(parseInt(punto), 310, 290);
		contextoBuffer.font = "30px 70px Sue Ellen Francisco";
		contextoBuffer.fillText(" nueces", 250, 340);
		contexto.clearRect(0,0,700,500);
		contexto.drawImage(buffer, 0, 0);
		$("button").css("display","inline");
	}
}

