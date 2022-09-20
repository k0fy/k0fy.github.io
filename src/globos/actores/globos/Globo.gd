extends Node2D



var aceleracion=0.0
export (int) var velocidad_inicial=30
export (int, 0, 3) var color

var colores = [
	Rect2(0, 0, 42, 55), #azul
	Rect2(50, 1, 42, 54), #rojo
	Rect2(100, 0, 42, 55), #amarillo
	Rect2(149, 0, 43, 56), #verde
]


# Called when the node enters the scene tree for the first time.
func _ready():
	$Sprite.region_rect=colores[color]


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	global_position.y -= delta * velocidad_inicial + aceleracion
	aceleracion += 0.01



func _on_VisibilityNotifier2D_screen_exited():
	queue_free()


func _on_TouchScreenButton_pressed():
	if Autoload.colorActual == color:
		Autoload.score += 1
		Autoload.carita = 0
#		emit_signal("set_carita", 0)
		
	else:
		Autoload.carita = 1
		Autoload.score -= 1
#		emit_signal("set_carita", 1)
		
	queue_free()

