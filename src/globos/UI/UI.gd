extends CanvasLayer




func setscore():
#	var t# = Autoload.scores
	#t = String(Autoload.score)
	var PUNTOS = $VBoxContainer2/HBoxContainer/Puntos
	
	if Autoload.score >= 0:
		if String(Autoload.score).length() == 1:
			PUNTOS.text = "000" + String(Autoload.score)
			
		elif String(Autoload.score).length() == 2:
			PUNTOS.text = "00" + String(Autoload.score)
			
		elif String(Autoload.score).length() == 1:
			PUNTOS.text = "0" + String(Autoload.score)
			
		else:
			PUNTOS.text = String(Autoload.score)
			
	else:
		if String(Autoload.score).length() == 1:
			PUNTOS.text = "-00" + String(abs(Autoload.score))
			
		elif String(Autoload.score).length() == 2:
			PUNTOS.text = "-0" + String(abs(Autoload.score))
			
		elif String(Autoload.score).length() == 1:
			PUNTOS.text = "-" + String(abs(Autoload.score))
			
		else:
			PUNTOS.text = String(Autoload.score)

# Called when the node enters the scene tree for the first time.
#func _ready():
	#Globo.connect("set_carita",self, "on_change_cara")
#	pass # Replace with function body.

#func on_change_cara(v):
#	#var cara = $Cara
#	$Cara.texture = Autoload.caras[v]

# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
#	pass
