extends Node2D

onready var UI = $UI
onready var UI_pause_msg = $UI/Pause_msg

var recGlobo = preload("res://actores/globos/Globo.tscn")


func _ready():
	UI_pause_msg.show()
	#pause_mode = Node.PAUSE_MODE_PROCESS
	get_tree().paused = true
	
	randomize()
	$UI/Final.hide()
	$ColorChange.wait_time = rand_range(.55, 3)
	$Juego.start()
	
# warning-ignore:return_value_discarded
	Autoload.connect("changeScore",self,"on_change_score")

func on_change_score(f):
	#var Cara = $UI/Cara
	#$UI/VBoxContainer2/HBoxContainer/Puntos.text = Autoload.score
	$UI/Cara.texture = Autoload.caras[f]
	$UI.setscore()


#func _input(event):
#	if event.is_action_pressed("pause"):
#		print("-p-")
#
#		get_tree().paused = not get_tree().paused
#		Autoload.paused =get_tree().paused
#
#		if Autoload.paused == true:
#			Autoload.paused = false
#			UI_pause_msg.hide()
#
#		else:
#			Autoload.paused = true
#			UI_pause_msg.show()
#
#		print("pausa: ",Autoload.paused)


func _process(_delta):
	$UI/VBoxContainer/Restante.text = String(floor($Juego.time_left))


func _on_Timer_timeout():
	var contenedor = $Contenido
	
	var globo = recGlobo.instance()
	
	#color del globo
	globo.color = randi() % 4
	
	globo.global_position.y = 600 + 10
	globo.global_position.x = rand_range(50,350)
	globo.velocidad_inicial = rand_range(0,35)
	
	globo.connect("suma_tiempo", self, "_on_suma_tiempo")
	
	contenedor.add_child(globo)


func _on_suma_tiempo(t):
	print("-",t,"-")
	$Juego.start($Juego.time_left+t)

func _on_ColorChange_timeout():
	Autoload.colorActual = randi() % 4
	var colorSel = $UI/VBoxContainer2/HBoxContainer2/MarginContainer/Color
	colorSel.color = Autoload.colores[Autoload.colorActual]


func _on_Juego_timeout():
	#get_tree().call_group("player_projectiles", "queue_free")
	$Timer.stop()
	$ColorChange.stop()
	
	for child in $Contenido.get_children():
		child.queue_free()
	
	$UI/Final.show()
	$UI/Final/HBoxContainer/Cara_f.texture = Autoload.caras[Autoload.carita]
	$UI/Final/HBoxContainer/Final_score.text = "Score: " + $UI/VBoxContainer2/HBoxContainer/Puntos.text


func _on_UI_termina():
	$Juego.stop()
	_on_Juego_timeout()
	UI_pause_msg.hide()


func _on_UI_reload():
# warning-ignore:return_value_discarded
	get_tree().reload_current_scene()
	UI_pause_msg.hide()



func _on_UI_quit():
	get_tree().quit()
