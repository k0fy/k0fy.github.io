#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os, sys
import getopt
from sys import argv

VERSION = 'V 1.4.1'

USO = """
stream_ista 

%r

Parametros:
    -h, --help
        muestra ayuda
        
    -s, --vlc-stream
        El archivo m3u va a tener los tracks para stream
    
    --xspf
        Crea lista para reproduccion loca
        
    
    -v, --vlc
        Crea lista para reproduccion local

    -t, --totem
        No implementado aun
    
    -o, --m3u
        Para indicar el path y archivo de salida a crear
        
         -o path/al/archivo
         --m3u path/al/archivo

    -a, --add
        Agrega al archivo existente
        
        -a path/al/archivo
        --add path/al/archivo
        
    NOTA: Los parametros -a y -o son mutuamente excluyentes

    -p, --path
        Para indicarle el path donde inicia la busqueda
        
        -p path/a/checar
    


    Tipo de arcihivos
        Por default busca las siguientes extenciones de audio y video:
        
         *.asf, *.avi, *.divx, *.dv, *.flv, *.gxf, *.m1v, *.m2v, 
         *.m2ts, *.m4v, *.mkv, *.mov, *.mp2, *.mp4, *.mpeg, *.mpeg1,
         *.mpeg2, *.mpeg4, *.mpg, *.mts, *.mxf, *.ogm, *.ogg, *.ps,
         *.ts, *.vob, *.a52, *.aac, *.ac3, *.dts, *.flac, *.m4a, 
         *.m4p, *.mka, *.mod, *.mp1, *.mp2, *.mp3, *.ogg, *.oma
         *.spx, *.wav, *.xm, *.wmv, *.wma, *.webm
    
    Para crear una lista solo con archivos e audio o video se pueden
    usar los parametros '--audio' o '--video'
    
    --audio crea una lista con las siguientes extenciones de audio:
    
         *.a52, *.aac, *.ac3, *.dts, *.flac, *.m4a, 
         *.m4p, *.mka, *.mod, *.mp1, *.mp2, *.mp3, *.ogg, *.oma
         *.spx, *.wav, *.xm, *.wma
         
    --open_video
    
        Crea una lista con todos los archivos de video
         *.divx, *.mkv, *.ogm, *.ogg, 
    
    --open_audio
         *.flac, *.m4a, *.ogg, *.oma
        
    --video crea una lista con las siguientes extenciones de video:
    
        Crea una lista con todos los archivos de video
         *.asf, *.avi, *.divx, *.dv, *.flv, *.gxf, *.m1v, *.m2v, 
         *.m2ts, *.m4v, *.mkv, *.mov, *.mp2, *.mp4, *.mpeg, *.mpeg1,
         *.mpeg2, *.mpeg4, *.mpg, *.mts, *.mxf, *.ogm, *.ogg, *.ps,
         *.ts, *.wmv, *.vob, *.webm
""" % VERSION
#*.ps,


lARGS = ["audio","video", "vv","help", "vlc","vlc-stream", "totem","m3u=","add","path=","xspf"]
cARGS = "vstho:p:a:"

#extenciones
VIDEO = ['asf', 'avi', 'divx', 'dv', 
         'flv', 'gxf', 'm1v', 'm2v', 
         'm2ts', 'm4v', 'mkv', 'mov', 
         'mp2', 'mp4', 'mpeg', 'mpeg1', 
         'mpeg2', 'mpeg4', 'mpg', 'mts', 
         'mxf', 'ogm', 'ogg', 'ps',
         'ts', 'vob', 'wmv','webm'
        ]

MEDIA = ['asf', 'avi', 'divx', 'dv', 
         'flv', 'gxf', 'm1v', 'm2v', 
         'm2ts', 'm4v', 'mkv', 'mov', 
         'mp2', 'mp4', 'mpeg', 'mpeg1', 
         'mpeg2', 'mpeg4', 'mpg', 'mts', 
         'mxf', 'ogm', 'ogg', 'ps',
         'ts', 'vob', 'a52', 'aac', 
         'ac3', 'dts', 'flac', 'm4a', 
         'm4p', 'mka', 'mod', 'mp1', 
         'mp2', 'mp3', 'ogg', 'oma', 
         'spx', 'wav', 'xm', 'wmv', 
         'wma','webm'
        ]

#VIDEOX = ['wmv']

AUDIO = ['a52', 'aac', 'ac3', 'dts', 
         'flac', 'm4a', 'm4p', 'mka', 
         'mod', 'mp1', 'mp2', 'mp3', 
         'ogg', 'oma', 'spx', 'wav', 
         'xm', 'wma'
        ]

#AUDIOX = ['wma']

pre = 0
LISTA = ""
ADD = 0
top = os.getcwd()
vv = 0
EXT = ''




xspf_post="""
  <extension application="http://www.videolan.org/vlc/playlist/0">
      <vlc:item tid="0"/>
      <vlc:item tid="1"/>
  </extension>
</playlist>
"""

def iterador(top, EXT, v=0):
    dirs = []
    for raiz, directoios, archivos in os.walk(top):
        for archivo in archivos:
            if archivo.split(".")[-1].lower() in EXT:
                if v==1: print "->%s" % os.path.join(raiz, archivo)
                dirs.append(os.path.join(raiz, archivo))
                
  return dirs
  
class cl_xspf:
    xspf_pre = """
<?xml version="1.0" encoding="UTF-8"?>
<playlist xmlns="http://xspf.org/ns/0/" xmlns:vlc="http://www.videolan.org/vlc/playlist/ns/0/" version="1">
  <title>Lista de reproducción</title>
  <trackList>
    """
    def extension(self, tid):
        ex='  <extension application="http://www.videolan.org/vlc/playlist/0">'
        for x in range(tid):
            ex+="\n"
            ex+='     <vlc:item tid="%i"/>' % x
        ex+=' </extension>'
        return ex
    def track(self, id, location):
        return """
    <track>
      <location>file://%s</location>
      <extension application="http://www.videolan.org/vlc/playlist/0">
        <vlc:id>%i</vlc:id>
      </extension>
    </track>
        """ %(location, id)
    def end(self):        
        return "</playlist>"
        
        

if len(argv) == 1:
    print USO
    sys.exit(2)

try:
    opts, args = getopt.getopt(argv[1:], cARGS,lARGS)
except getopt.GetoptError:
    #print "help information and exit:"
    print USO
    sys.exit(2)

for ls_opc, arg in opts:
    if ls_opc in ("-h", "--help"):
        print USO
        #print "help information and exit:"
        sys.exit()

    if ls_opc in ("-s", "--vlc-stream"):
        pre = 1
        #sys.exit()

    if ls_opc in ("", "--xspf"):
        pre = 2

    if ls_opc in ("-v", "--vlc"):
        pre = 0
        #sys.exit()

    if ls_opc in ("-t", "--totem"):
        print " -t/--totem no implementado aun"
        #sys.exit()

    if ls_opc in ("-o", "--m3u"):
        #print "no implementado aun"
        LISTA =  arg

    if ls_opc in ("-a", "--add"):
        #print "no implementado aun"
        ADD = 1
        LISTA =  arg
        #sys.exit()

    if ls_opc in ("-p", "--path"):
        #print "no implementado aun"
        top =  arg
        #sys.exit()

    if ls_opc in ("", "--audio"):
        print ls_opc
        #print "no implementado aun"
        if EXT == '': 
            EXT = AUDIO
            print 111


    if ls_opc in ("", "--video"):
        #print "no implementado aun"
        if EXT == '': 
            EXT = VIDEO
            print 2222
            

    if ls_opc == "--vv":
        #print "no implementado aun"
        vv = 1

if EXT == '': EXT = MEDIA

#print EXT
#sys.exit()


if vv == 1:
    print "-" * 20
    print "argumentos: "
    print opts
    print "pre: %i" % (pre)
    print "path de salida: %s" % (LISTA)
    print "agrega: %i" % (ADD)
    print "path de busqueda: %s" % (top)
    print "-" * 20

#<app> s path

if LISTA == "":
    #print 1
    LISTA = top + "stream_lista.m3u"



"""
EXT = ['avi', 'mpg', 'ogm', 'mp3', 
        'mkv', 'ogg', 'm4v', 'divx', 
        'flv', 'mov', 'mp2', 
        'mp4', 'mpeg', 'mpeg1', 
        'mpeg2', 'mpeg4', 'asf','webm'
    ]
"""

dirs = []

#print 2
print VERSION
print "explorando %s" % (top)
print "salida en: %s\n" % (LISTA)

#print EXT

## funcion
dirs = iterador(top, EXT)
#for raiz, directoios, archivos in os.walk(top):
#    for archivo in archivos:
#        if archivo.split(".")[-1].lower() in EXT:
#            print "->%s" % os.path.join(raiz, archivo)
#            dirs.append(os.path.join(raiz, archivo))


if ADD == 1:
    #print 3
    fArch = open(LISTA,"a")
else:
    #print 4
    fArch = open(LISTA,"w")
    fArch.write("#EXTM3U\n")


if pre == 2:
    l = cl_xspf()
    fArch.write(l.xspf_pre)

for f in dirs:
    if pre == 1:
        fArch.write("#EXTVLCOPT:sout=#duplicate{dst=std{access=http,mux=ts,dst=192.168.1.64:1234}}\n")
        fArch.write(f + '\n')
        
    elif pre == 2:
        fArch.write(l.track(f))
        
    
    else:
        fArch.write(f + '\n')

if pre == 2:
  fArch.write(l.extension(len(dirs)))

#print 5
fArch.close()

print "\n\tTERMINADO ==> %s" % (LISTA)
