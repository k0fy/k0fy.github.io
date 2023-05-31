extends CanvasLayer


onready var popup_msg = $Pause_msg
#export var pause_msg = true setget show_pause_msg

func show_pause_msg(pause):
	if pause == true:
		popup_msg.show()
	else:
		popup_msg.hide()
	#Pause_msg

signal termina
signal reload
signal quit


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



func _input(event):
	if event.is_action_pressed("pause"):
		print("-p-")
		
		get_tree().paused = not get_tree().paused
		print("pausa: en false: ", get_tree().paused)
		
		if get_tree().paused == true:
			popup_msg.show()
			
		else:
			popup_msg.hide()
	
	if event.is_action_pressed("ui_accept"):
		emit_signal("termina")
	
	if event.is_action_pressed("reload"):
		emit_signal("reload")
	
	if event.is_action_pressed("quit"):
		emit_signal("quit")

#func on_change_cara(v):
#	#var cara = $Cara
#	$Cara.texture = Autoload.caras[v]

# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
#	pass
