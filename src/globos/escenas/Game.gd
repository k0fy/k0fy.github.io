extends Node2D

var recGlobo = preload("res://actores/globos/Globo.tscn")


func _ready():
	randomize()
	$UI/Final.hide()
	$ColorChange.wait_time=rand_range(.55, 3)
	$Juego.start()
	
	Autoload.connect("changeScore",self,"on_change_score")

func on_change_score(f):
	#var Cara = $UI/Cara
	#$UI/VBoxContainer2/HBoxContainer/Puntos.text = Autoload.score
	$UI/Cara.texture = Autoload.caras[f]
	$UI.setscore()
	
	
	


func _process(delta):
	$UI/VBoxContainer/Restante.text = String(floor($Juego.time_left))


func _on_Timer_timeout():
	var contenedor = $Contenido
	
	var globo = recGlobo.instance()
	
	#color del globo
	globo.color = randi() % 4
	
	globo.global_position.y = 600 + 10
	globo.global_position.x = rand_range(50,350)
	globo.velocidad_inicial = rand_range(0,35)
	
	contenedor.add_child(globo)


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
