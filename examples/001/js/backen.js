//DATOS - DB -

/*
 * db/lista para imprimir
{
  barcos:[{bid:xx, upgrades:[], capitan:id},..],
  land:[id,id]
}

 */
var listaFinal={barcos:[],land:[]};


//fortificaciones terrestres
var land_fort =[
  {nombre:"Shore Gun Emplacement",    z:"M",  pt:40,  grupo:"land", display: ""},
  {nombre:"Shore Mortar Emplacement", z:"M",  pt:50,  grupo:"land", display: ""},
  {nombre:"Martello Tower",           z:"L",  pt:250, grupo:"land", display: ""},
  {nombre:"Shore Fortress",           z:"XL", pt:400, grupo:"land", display: ""},
  {nombre:"Floating Battery",         z:"M",  pt:50,  grupo:"land", display: ""},
];

//barcos
const listaBarcos = [ //line2_
  {nombre:"1st Rate",       z:"XL", pt:450, grupo:"line", display: ""}, //,display: "none";
  {nombre:"2nd Rate",       z:"XL", pt:400, grupo:"line", display: ""},
  {nombre:"Large 3rd Rate", z:"L",  pt:280,  grupo:"line", display: ""},
  {nombre:"Small 3rd Rate", z:"L",  pt:250,  grupo:"line", display: ""},
  {nombre:"4th Rate",       z:"M",  pt:190,  grupo:"line", display: ""},
  {nombre:"5th Rate",       z:"M",  pt:150,  grupo:"line", display: ""},
  {nombre:"6th Rate",       z:"M",  pt:120,  grupo:"line", display: ""},
  
  {nombre:"Large Merchant",   z:"L", pt:90, grupo:"unrated", display: ""},
  
  {nombre:"Small Merchant",   z:"M", pt:40, grupo:"unrated", display: ""},
  {nombre:"Large Galley",     z:"M", pt:90, grupo:"unrated", display: ""},
  {nombre:"Fireship",         z:"M", pt:80, grupo:"unrated", display: ""},
  
  {nombre:"Small Galley",     z:"S", pt:60, grupo:"unrated", display: ""},
  {nombre:"Brig",             z:"S", pt:80, grupo:"unrated", display: ""},
  {nombre:"Bomb Ketch",       z:"S", pt:80, grupo:"unrated", display: ""},
  {nombre:"Barque",           z:"S", pt:70, grupo:"unrated", display: ""},
  {nombre:"Sloop",            z:"S", pt:60, grupo:"unrated", display: ""},
  {nombre:"Cutter",           z:"S", pt:50, grupo:"unrated", display: ""},
  {nombre:"Schooner",         z:"S", pt:40, grupo:"unrated", display: ""},
  {nombre:"Bomb Vessel",      z:"S", pt:50, grupo:"unrated", display: ""},
  
  {nombre:"Gunbrig squadron", z:"T", pt:40, grupo:"unrated", display: ""},
  {nombre:"Gunboat Squadron", z:"T", pt:30, grupo:"unrated", display: ""},
  
  {nombre:"Santisima Trinidad",  z:"XL", pt:680, grupo:"ES", display: "none"},
  {nombre:"La Princesa",         z:"M",  pt:150,   grupo:"ES", display: "none"},
  
  {nombre:"USS Constitution", z:"L", pt:290, grupo:"US", display: "none"},
  {nombre:"USS Essex",        z:"M", pt:190, grupo:"US", display: "none"},
  
  {nombre:"HMS Victory",     z:"XL", pt:550, grupo:"UK", display: "none"},
  {nombre:"HMS Bellerophon", z:"L",  pt:360, grupo:"UK", display: "none"},
  {nombre:"Indefatigable",   z:"M",  pt:240, grupo:"UK", display: "none"},
  
  {nombre:"L’Orient",   z:"XL", pt:550, grupo:"FR", display: "none"},
  {nombre:"Bucentaure", z:"L",  pt:370, grupo:"FR", display: "none"}
];

//tamaño del barco
const ship_upgrades = {
  XL:4,
  L:3,
  M:2,
  S:1,
  T:0
};

//updates del barco
const upgrades = [ // {desc:"",pt:10}
  {desc:"Boarding Nets",    pt:10},
  {desc:"Grappling Hooks",  pt:20},
  {desc:"Grenades",         pt:30},
  {desc:"Lucky",            pt:30},
  {desc:"Master Carpenter", pt:20},
  {desc:"Master Caulker",   pt:20},
  {desc:"Master Gunner",    pt:30},
  {desc:"Over Gunned",      pt:100},
  {desc:"More Carronades",  pt:50},
  {desc:"Privateer",        pt:10},
  {desc:"Sharpshooters",    pt:20},
  {desc:"Ship’s Surgeon",   pt:30},
  {desc:"Streamlined Hull", pt:30},
  {desc:"Sturdy",           pt:60},
  {desc:"Swivel Guns",      pt:30},
  {desc:"Trained Marines",  pt:30}
];


//-- fin db -------

//---variables---
//nacion
var flagID = "unaligned";

//------------------------------
/* **funciones** */

/*
 * clase para agregar a la lista
 */
var Agrega={};

/*
*Agrega.barco(DB, bid, upgrades,capitan)
*    bid      : ud del barco
*    upgrades : array con id de upgrades puede ser nulo
*    capitan  : id del personaje, puede ser nulo
 */
Agrega.barco=function(listaFinal, bid, upgrades, capitan){
  var tmp = {};
  if(bid !== undefined){
    tmp.bid = bid;
    
    if (upgrades !== undefined){
      tmp["upgrades"] = upgrades;
    }
    else{
      tmp["upgrades"] = undefined;
    }
    
    if(capitan !== undefined){
      tmp["capitan"] = capitan;
    }
    else
    {
      tmp["capitan"] = undefined;
    }
    
    listaFinal.barcos.push(tmp)
  }
  return listaFinal;
}
/*
Agrega.fortificacion(DB, fort)
  DB   : lista final
  fort : id de la fortificacion
*/
Agrega.fortificacion=function(listaFinal, fort){
  
  if(fort !== undefined){
    listaFinal.land.push(fort);
  }
  
  return listaFinal;
}


/*
 *
 */
const rellena_forts = () => {
  for (z in land_fort){
    x = document.createElement("OPTION");
    x.value = z;
    x.innerText =  land_fort[z].nombre + " (" + land_fort[z].z + " puntos: " + land_fort[z].pt + ")";
    $(x).appendTo("#forts");
  }
}

/*
 * name: rellena_shipUpgrades
 * @param nada
 * @return nada
 *
 * crea opciones para el select de ship upgrades a partir de un array
 * de objetos, usando los elementos del array tags 
 */
const rellena_shipUpgrades = () => {
  for (z in upgrades){
    x = document.createElement("OPTION");
    x.value = z;
    x.innerText = x.innerText + upgrades[z].desc + " (puntos: " + upgrades[z].pt + ")";
    $(x).appendTo("#ship_upgrades");
  }
}

/*
 * name: rellenaSelect
 * @param nada
 * @return nada
 *
 * agrega opciones a un grupo de optgroup con los tipos de barcos
 */
const rellenaSelect = () => {
  for (z in listaBarcos){
    x = document.createElement("OPTION");
    x.value = z;
    x.innerText = listaBarcos[z].nombre + " (" + listaBarcos[z].z + ", puntos: " + listaBarcos[z].pt + ")";
    $(x).appendTo("#"+listaBarcos[z].grupo);
  }
}

const newSpan = () => {
  return document.createElement("span");
}

var localPT = 0; ////////cambiar de ligar

var sumaLocal = (x) => {
  localPT = localPT + x;
  $("#localPT").text(localPT);
}

var restaLocal = (x) => {
  localPT = localPT - x;
  $("#localPT").text(localPT);
}

var op1 = () => {
  let x = $("#ship").val();
  $("#b1").text(listaBarcos[x].nombre);
  //line_info[x];
  $("#b_size").text(listaBarcos[x].z);
  restaLocal($("#b_pt").text());
  
  $("#b_pt").text(listaBarcos[x].pt);
  $("#up_tot").text(ship_upgrades[listaBarcos[x].z]);
  
  sumaLocal(listaBarcos[x].pt);
  ID_Ship(x);
  
  if(ship_upgrades[listaBarcos[x].z] === 0){ //upgrade1
    $("#upgrade1").prop("disabled", true);
  }
  else{
    $("#upgrade1").prop("disabled", false);
  }
};


const upg_select = (v) => {
  if(v === undefined){
    return parseInt($("#upg_select").text());
  }
  else {
    $("#upg_select").text(v);
    return parseInt(v);
  }
}

/*
 * name: ID_Ship
 * @param id
 * @return id
 * pone en un campo oculto el id del barco
 * 
 */
const ID_Ship = (id) => {
  if(id === undefined){
    return parseInt($("#id_ship").val());
  }
  else{
    $("#id_ship").val(id);
    return id;
  }
  //id_ship
}

/*
 * name: ID_upgrades
 * @param array con id
 * @return array con id
 *
 * pone en un campo oculto los id de los upgrades
 */

const ID_upgrades = (arr) => {
  if(arr === undefined){
    var x=[];
    x.push( $("#id_upgrades").val() );
    return x;
  }
  else {
    $("#id_upgrades").val(arr.toString());
    return arr;
  }
}

const listaUpgrades = () =>{
  var x=[];
  $("li").each(function(){
    x.push($(this).val())
  });
  return x;
}

/**
 * trae el nombre de la nacion
 * */
const NombreNacion = (flagID) =>{
  switch (flagID){
    case "unaligned": return "No Alineados";
    break;

    case "uk": return "Ingleses";
    break;
    
    case "es": return "Españoles";
    break;
    
    case "us": return "Estadounidenses";
    break;
    case "fr": return "Franceses";
    break;
  }
}

/*+
 * regresa el nombre de la lista a jugar
 * */
const nombreFlota = () =>{
  var x = document.getElementById("nombre_flota");
  
  if (x.value === ""){
    return x.placeholder;
  }
  else {
    return x.value;
  }
}

/* ********** */


//selector de banderas
//pone banderas
$("#flag_uk").click(function(){
  flagID = "uk";
  $("#titulo").removeClass(["ES","FR","US"]).addClass( "UK" );
  //$("#titulo2").css("marginLeft","2em");

  $("#US").hide();
  $("#ES").hide();
  $("#FR").hide();
  $("#UK").show();
});

$("#flag_es").click(function(){
  flagID = "es";
  $("#titulo").removeClass(["UK","FR","US"]).addClass( "ES" );
  //$("#titulo2").css("marginLeft","2em");

  $("#US").hide();
  $("#UK").hide();
  $("#FR").hide();
  $("#ES").show();
});

$("#flag_us").click(function(){
  flagID = "us";
  $("#titulo").removeClass(["ES","FR","UK"]).addClass( "US" );
  //$("#titulo2").css("marginLeft","2em");

  $("#US").show();
  $("#ES").hide();
  $("#FR").hide();
  $("#UK").hide();
});

$("#flag_fr").click(function(){
  flagID = "fr";
  $("#titulo").removeClass(["ES","US","UK"]).addClass( "FR" );
  //$("#titulo2").css("marginLeft","2em");

  $("#US").hide();
  $("#ES").hide();
  $("#FR").show();
  $("#UK").hide();
});

$("#flag_void").click(function(){//
  flagID = "unaligned";
  $("#US").hide();
  $("#ES").hide();
  $("#FR").hide();
  $("#UK").hide();
});

//selector de navios
rellenaSelect();

$("#ship").change(op1);
/*
for (x in listaBarcos){
  listaBarcos[x].grupo
}*/

//selector de upgrades
rellena_shipUpgrades();

//
rellena_forts();

$("#add_ship").click(function(){
  var posId = $("#ship_upgrades").val();
  
  if(posId != "Ship Upgrades"){
    var desc = upgrades[posId].desc;
    var puntos = upgrades[posId].pt;
    //suma
    sumaLocal(puntos);
    upg_select(upg_select() + 1);

    ID_upgrades(listaUpgrades());
    
    var li = document.createElement("li");
    li.value = posId;
    li.innerText = desc + " (pt:" + puntos + ") ";

    var bt_x = newSpan();
    bt_x.classList.add("oi");
    bt_x.classList.add("oi-x");
    bt_x.style="color: #b91616; cursor: pointer;";
    
    bt_x.onclick = function(){
      $(this).parent().remove();
      localPT = localPT - puntos;
      $("#localPT").text(localPT);
      upg_select(upg_select() - 1);

      ID_upgrades(listaUpgrades());
    }
    
    li.appendChild(bt_x);
    //$(bt_x).appendTo(li);
    $(li).appendTo("#list_upgrades");
  }

  //if(posId.indexOf("Ship Upgrades") != true){}
  
})

//selector de fortificaciones terrestres


// ----------PDF-----------------
var gel_pdf = document.getElementById("get_pdf");

  
get_pdf.onclick = function(){
  var jsPDF = window.jspdf.jsPDF;

  const config={
    unit: 'pt'
  };
  var doc = new jsPDF(config);
  
//  var jsPDF = window.jspdf.jsPDF;

  doc.setFont("courier", "normal");
  //var titulo = "Flota: " + nombreFlota() + "\nNación: " + NombreNacion(flagID);
  var titulo = ["Flota: " + nombreFlota(), "Nación: " + NombreNacion(flagID)];

  doc.setFontSize(15);
  doc.setFont("courier", "bold");
  doc.text(titulo, 8, 18);

  //tabla barco:
  //puntos nombre/tipo
  //       extras

  var pane = document.getElementById("preview-pane")
  try{
    pane.removeChild(pane.childNodes[0]);
  }
  catch (e) {
    console.log(e);
  }
  var embed = document.createElement("EMBED");
  embed.classList.add("pdf");
  pane.appendChild(embed);
  embed.src=doc.output("bloburl");

//  doc.addImage("examples/images/Octonyan.jpg", "JPEG", 15, 40, 180, 180);
//  doc.output('datauri', { filename: "test.pdf" });
//  doc.save("a4.pdf"); // will save the file in the current working directory


}

