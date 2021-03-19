//DATOS - DB -

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

/* **funciones** */

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

var localPT = 0;

var sumaLocal = (x) => {
  localPT = localPT + x;
  $("#localPT").text(localPT);
}

/* ********** */


//selector de banderas
//pone banderas
$("#flag_uk").click(function(){
  $("#titulo").removeClass(["ES","FR","US"]).addClass( "UK" );
  //$("#titulo2").css("marginLeft","2em");

  $("#US").hide();
  $("#ES").hide();
  $("#FR").hide();
  $("#UK").show();
});

$("#flag_es").click(function(){
  $("#titulo").removeClass(["UK","FR","US"]).addClass( "ES" );
  //$("#titulo2").css("marginLeft","2em");

  $("#US").hide();
  $("#UK").hide();
  $("#FR").hide();
  $("#ES").show();
});

$("#flag_us").click(function(){
  $("#titulo").removeClass(["ES","FR","UK"]).addClass( "US" );
  //$("#titulo2").css("marginLeft","2em");

  $("#US").show();
  $("#ES").hide();
  $("#FR").hide();
  $("#UK").hide();
});

$("#flag_fr").click(function(){
  $("#titulo").removeClass(["ES","US","UK"]).addClass( "FR" );
  //$("#titulo2").css("marginLeft","2em");

  $("#US").hide();
  $("#ES").hide();
  $("#FR").show();
  $("#UK").hide();
});


//selector de navios
rellenaSelect();

/*
for (x in listaBarcos){
  listaBarcos[x].grupo
}*/

//selector de upgrades
rellena_shipUpgrades();

$("#add_ship").click(function(){
  var posId = $("#ship_upgrades").val();
  
  for(x in posId){
    if(posId[x] != "Ship Upgrades"){
      var desc = upgrades[posId[x]].desc;
      var puntos = upgrades[posId[x]].pt;
      //suma
      sumaLocal(puntos);
      
      var li = document.createElement("li");
      li.id = posId[x];
      li.innerText = desc + " (pt:" + puntos + ") ";

      var bt_x = newSpan();
      bt_x.classList.add("oi");
      bt_x.classList.add("oi-x");
      bt_x.style="color: #b91616; cursor: pointer;";
      
      bt_x.onclick = function(){
        $(this).parent().remove();
        localPT = localPT - puntos;
        $("#localPT").text(localPT);
      }
      
      li.appendChild(bt_x);
      //$(bt_x).appendTo(li);
      $(li).appendTo("#list_upgrades");
    }
  }
  //if(posId.indexOf("Ship Upgrades") != true){}
  
})

//selector de fortificaciones terrestres


// ---------------------------
