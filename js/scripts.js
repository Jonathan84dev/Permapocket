// console.log(jQuery);

jQuery(document).ready(($) => {
  // Sur la page gardencreation.html:
  // 1.recup donnée du formulaire
  // 2.creation du template de jardin + disparition du formulaire
  // 3.Possibilité de retour au formulaire
  // 4. validation du template et passage au drag and drop version desktop

  // diverses constantes
  const formulaire = document.getElementById("formulaire");
  const newGarden = document.getElementById("creationTable");
  const largeur = document.getElementById("largeur");
  const longueur = document.getElementById("longueur");
  const generation = document.getElementById("generation");
  const returnCreation = document.getElementById("retourCreation");
  const validationGrille = document.getElementById("validationGrille");
  const figcaption = document.getElementsByTagName("figcaption");
  const hoverTexte = document.getElementsByClassName("hoverTexte");


  //fonction : mettre la 1ère lettre des string d'un tableau (nom) en majuscule
  const majFirstLetter = (nom) => {
    for (let i = 0; i < nom.length; i++) {
      let chaineDeCaract = nom[i].innerText;
      nom[i].innerText =
        chaineDeCaract.charAt(0).toUpperCase() +
        chaineDeCaract.substring(1).toLowerCase();
    }
  };
  //création constante contenant les plantes

  const plantes = {
    fruit: ["fraise", "groseille", "framboise", "cassis", "melon", "pastèque"],
    legume: [
      "aubergine",
      "courgette",
      "carotte",
      "tomate",
      "pomme de terre",
      "ail",
      "oignon",
      "echalotte",
    ],
    herbe: [
      "thym",
      "basilic",
      "ciboulette",
      "romarin",
      "persil",
      "estragon",
      "cerfeuil",
      "menthe",
      "sauge",
    ],
  };

  //Fonction de sauvegarde en json du jardin créé: 
  const sauvegarde = (() => {
    const data = { a: document.getElementById("grilleDeJardin").innerHTML };
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const lien = document.getElementById('jsonSaveLink');
    lien.setAttribute('download', "monJardin.json");
    lien.setAttribute('href', url);
  });

  const sauvegardeModele2 = (() => {
    const data = { a: document.getElementById("modele2").innerHTML };
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const lien = document.getElementById('jsonModele2Link');
    lien.setAttribute('download', "JardinDeSaison.json");
    lien.setAttribute('href', url);
  });

  $("#jsonSaveModele2").on('click', () => sauvegardeModele2());

  //Récupération des données du formulaire: au click, génération de la grille

  generation.addEventListener("click", (e) => {
    e.preventDefault();
    //génération de la grille
    if (largeur.value >= 0 && longueur.value >= 0) {
      const newTable = document.createElement("div");
      newTable.setAttribute("id", "grilleDeJardin");
      newGarden.prepend(newTable);
      for (let i = 0; i < longueur.value; i++) {
        const newTr = document.createElement("div");
        newTr.classList.add(
          "tr",
          "row",
          "col-12",
          "flex-nowrap",
          "justify-content-center",
          "align-items-center",
          "m-0"
        );
        newTable.prepend(newTr);

        for (let j = 0; j < largeur.value; j++) {
          const newTd = document.createElement("div");
          newTd.classList.add("td", "cell", "m-1", "p-0");
          newTr.appendChild(newTd);
        }
      }
      //disparition du formulaire
      formulaire.style.display = "none";
      //apparition des boutons de validation de la grille
      creationTable.classList.remove("d-none");
    } else {
    }
  });

  // Affichage mobile, selection des div 

  let classCompteur = 0;
  const largeurEcran = window.innerWidth;

  /* if (largeurEcran < 768) {
   */

  // if (largeurEcran < 768) {



  // }

  //Au clic de validation de la grille

  validationGrille.addEventListener("click", (e) => {
    e.preventDefault();

    /*****LARGEUR DESKTOP ******/
    if (largeurEcran > 768) {

      jQuery("#modelId").modal();

      //Création de la liste des plantes desktop

      const newRight = document.createElement("div");
      newRight.setAttribute("id", "right");
      newRight.setAttribute("class", "grid");

      for (let i in plantes) {

        for (let j = 0; j < plantes[i].length; j++) {

          newRight.innerHTML =
            newRight.innerHTML +
            `<figure class="m-1 grid-item ${i}" data-category="${i}"><div class="text-center"><img src="img/${i}s/${plantes[i][j]}.jpg"
           alt="${plantes[i][j]}" class="plante"><span class="hoverTexte">${plantes[i][j]}</span></div>
       <figcaption class="name">${plantes[i][j]}</figcaption>    
       </figure>`;
        }
      }

      //Insertion de la div contenant les plantes après les boutons de tris
      document.getElementById("triButton").after(newRight);


      //Passage en majuscule de la première lettre de la légende des images de plantes et de leurs hover

      majFirstLetter(figcaption);
      majFirstLetter(hoverTexte);

      //Au clic de validation de grille: apparition de la div contenant les imagges
      document.getElementById("plantes").classList.add("d-block");


      //appel aux fonctions de tri d'isotope (fichier scriptsIsotop.js)
      isotope();

      //apparition de la modale d'explication
      document.getElementsByClassName("explicationVersionDesktop")[0].classList.add("d-block");

      //au clic sur les boutons de la modale ou en-dehors, disparition de la modale
      document.getElementById("modelId").addEventListener("click", () => {
        document.getElementById("modelId").classList.remove("d-block");
      });

    };

    /***** LARGEUR MOBILE ********/

    if (largeurEcran <= 768) {
      // alert('Cliquez sur les cases puis choisissez vos plantes pour les remplir automatiquement.');
      jQuery("#mobileModalExplication").modal();
      jQuery('.td').on('click', (e) => {
        if (jQuery(e.currentTarget).hasClass('div_selected')) {
          jQuery(e.currentTarget).removeClass('div_selected');
          classCompteur--;
        }
        else {
          classCompteur++;
          jQuery(e.currentTarget).addClass('div_selected');
        };

        if (classCompteur >= 1) {
          jQuery('.mobile_categories').attr("style", "display: block");
        }
        else {
          jQuery('.mobile_categories').attr("style", "display: none");
        };

        //apparition de la modale d'explication
        document.getElementsByClassName("explicationVersionMobile")[0].classList.add("d-block");

        //au clic sur les boutons de la modale ou en-dehors, disparition de la modale
        document.getElementById("mobileModalExplication").addEventListener("click", () => {
          document.getElementById("mobileModalExplication").classList.remove("d-block");
        });

        //génération de la liste des plantes Mobile
        document.getElementById("mobile_categories").addEventListener('click', () => {
          jQuery("#presentationPlanteMobile").modal();

                 const mobilePlanteTable = document.createElement("div");
          mobilePlanteTable.setAttribute("id", "mobilePlanteTable");
          mobilePlanteTable.setAttribute("class", "container");
          const plantesListeMobile = document.getElementById("plantesListeMobile");
                  

          for (let plante in plantes) {
            // pour chaque type de plante, on crée une div 
            const planteTable = document.createElement('div');
            planteTable.setAttribute("id", plante + "Mobile");
            planteTable.setAttribute("class", "grid");

            // console.log(mobilePlanteTable.innerHTML);
            // pour chaque plante d'un certain type, on crée une figure qui entre dans la div du type de la plante
            for (let j = 0; j < plantes[plante].length; j++) {


              // planteTable.innerHTML = planteTable.innerHTML +
              planteTable.innerHTML = planteTable.innerHTML +
                `<figure class="m-1 grid-item ${plante}"><div class="text-center"><img src="img/${plante}s/${plantes[plante][j]}.jpg"
           alt="${plantes[plante][j]}" class="plante">
       <figcaption class="name text-capitalize">${plantes[plante][j]}</figcaption> </div>   
       </figure>`;
       
      //  console.log(planteTable.plante);  //undefined
      //  console.log(planteTable[plante]); //met toutes les figures à la suite
              
       
            }
        
            console.log(planteTable);


      //  mobilePlanteTable.innerHTML =   mobilePlanteTable.innerHTML + planteTable.after( planteTable); 
      // mobilePlanteTable.innerHTML =  planteTable; 
      //  mobilePlanteTable.innerHTML =  planteTable + after( planteTable); 
       mobilePlanteTable.innerHTML =  mobilePlanteTable.innerHTML + planteTable.innerHTML; 
          
            //Insertion de la div contenant les plantes dans la modale de selection des plantes    
         
        // console.log(mobilePlanteTable);
        plantesListeMobile.innerHTML= mobilePlanteTable;
          }     


      
      console.log(plantesListeMobile.innerHTML);
          //Passage en majuscule de la première lettre de la légende des images de plantes et de leurs hover

          majFirstLetter(figcaption);

        });

      });


    }




    //disparition des boutons la page précédente
    returnCreation.classList.add("d-none");
    validationGrille.classList.add("d-none");

    //apparition des boutons d'impression et de sauvegarde
    document.getElementById("print").classList.add("d-block");
    document.getElementById("jsonSave").classList.add("d-block");
    document.getElementById("pdf").classList.add("d-block");
    document.getElementById("toGardenCreation").classList.add("d-block");



  });

  //Dragula

  //initialise drake
  var drake = dragula({ copy: true });
  //get the td's and figures element
  const td = document.getElementsByClassName("td");
  const figures = document.getElementsByTagName("figure");

  //push td's and figure's elements into drake's container
  const tableauTd = [];
  for (let i in td) {
    drake.containers.push(td[i]);
    tableauTd.push(td[i]);
  }

  for (let j in figures) {
    drake.containers.push(figures[j]);
  }


  //permet de vider une case du jardin de son contenu si on veut repositionner l'élément
  drake.containers.push(tableauTd);
  let effacer = dragula(tableauTd, { removeOnSpill: true });

  //empêche de faire un drag de l'élément figcaption
  drake.on("drag", function (el, target, source) {
    if (el.tagName === "FIGCAPTION") {
      console.log(el.tagName);
      drake.cancel();
    }
  });
  //on drop event, if target container is already full, old image is removed

  drake.on("drop", (el, target, source, sibling) => {
    // console.log('tada');
    // console.log(el);
    // console.log(target);
    // console.log(source);
    // console.log(sibling);
    // console.log(source.tagName);
    // console.log(target.children.length);
    // console.log(target.children);
    if (target.tagName === "DIV") {
      for (let i of target.children) {
        if (!i.classList.contains("gu-transit")) {
          console.log(i);
          i.remove();
        }
      }
    }
    if (
      (source.tagName === "DIV" || source.tagName === "FIGURE") &&
      (target.tagName === "FIGURE" || target.tagName === "FIGCAPTION")
    ) {
      if (el.classList.contains("gu-transit")) console.log(el);
      drake.remove();
    }
  });


  //Sauvegarde sur le pc au format json d'un jardin:

  $("#jsonSave").on('click', () => sauvegarde());



  //import json

});


