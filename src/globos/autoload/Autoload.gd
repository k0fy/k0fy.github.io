extends Node

signal changeScore

var carita = 1
var score=0 setget setScore
var colorActual
var ant_score = 0

export  var FILE_NAME = "user://game-data.json"

var player = {
	"name": "",
	"score": 0,
	"level": 1,
	"high_score": {
		"value": 0,
		"date": ""
	}
}

var caras=[
	preload ("res://sprites/caras/cuadradas/smile.png"),
	preload ("res://sprites/caras/cuadradas/angry.png"),
	preload ("res://sprites/caras/cuadradas/neutral.png"),
]


var colores = [
	Color("07a7d3"), #azul
	Color("e84f50"), #rojo
	Color("fdb151"), #amarillo
	Color("51fd70") #verde
]

func setScore(_score):
	score = _score
	if ant_score < score:
		carita=0
		
	elif ant_score < score:
		carita = 2
		
	else:
		carita = 1
	
	ant_score = score
	
	emit_signal("changeScore", carita)
	

# guarda datos de juego
func save():
	var file = File.new()
	file.open(FILE_NAME, File.WRITE)
	file.store_string(to_json(player))
	file.close()

# carga datos de juego
func load():
	var file = File.new()
	
	if file.file_exists(FILE_NAME):
		file.open(FILE_NAME, File.READ)
		var data = parse_json(file.get_as_text())
		file.close()
		
		if typeof(data) == TYPE_DICTIONARY:
			player = data
		else:
			printerr("Corrupted data!")
	else:
		printerr("No saved data!")

# Called when the node enters the scene tree for the first time.
#func _ready():
#	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
#	pass
