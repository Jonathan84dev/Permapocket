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
  let classCompteur = 0;
  const largeurEcran = window.innerWidth;

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
    const data = { a: document.getElementById("grilleDeJardin").outerHTML };
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const lien = document.getElementById('jsonSaveLink');
    lien.setAttribute('download', "monJardin.json");
    lien.setAttribute('href', url);


  });

  //fonction de sauvegarde du Modele en json
  const sauvegardeModele2 = (() => {
    const data = { a: document.getElementById("modele2").innerHTML };
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const lien = document.getElementById('jsonModele2Link');
    lien.setAttribute('download', "JardinDeSaison.json");
    lien.setAttribute('href', url);
  });


  //fonction d'import d'un modele json depuis un PC
  const importJSONFunction = () => {
    document.getElementById('importerVotreJardin').classList.add("d-none");
    //disparition du formulaire
    formulaire.style.display = "none";
    creationTable.classList.remove("d-none");
    // $('#validationGrille').on('click', () => {
   document.getElementById('validationGrille').addEventListener('click', () => {
      console.log('test2');
      document.getElementById('step2validation').classList.remove('d-flex');
      document.getElementById('step2validation').classList.add('d-none');

      validationGrilleFonction();  
      
      // document.getElementById('jsonSave').addEventListener('click', () => {
      // console.log('test3');
      
      // sauvegarde();
      // });
      
     
    });
  }

  //Fonctions gestion de remplissage du jardin selon taille de fenêtre

  const validationGrilleFonction = () => {
    //disparition des boutons la page précédente
    returnCreation.classList.add("d-none");
    validationGrille.classList.add("d-none");


   // on cache le bloc texte 'dimensions du jardin'
    const confirm_size = jQuery('.confirm_size');
    jQuery(confirm_size).removeClass('d-block');



    /*****LARGEUR DESKTOP ******/
    if (largeurEcran >= 768) {

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
    };

    /***** LARGEUR MOBILE ********/

    if (largeurEcran < 768) {
      // alert('Cliquez sur les cases puis choisissez vos plantes pour les remplir automatiquement.');
      jQuery("#mobileModalExplication").modal();
      jQuery('.td').on('click', (e) => {
        //apparition de la modale d'explication
        document.getElementsByClassName("explicationVersionMobile")[0].classList.add("d-block");

        //au clic sur les boutons de la modale ou en-dehors, disparition de la modale
        document.getElementById("mobileModalExplication").addEventListener("click", () => {
          document.getElementById("mobileModalExplication").classList.remove("d-block");
        });

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

        //génération de la liste des plantes Mobile
        document.getElementById("mobile_categories").addEventListener('click', () => {
          jQuery("#presentationPlanteMobile").modal();

          for (let plante in plantes) {

            // pour chaque type de plante, on crée une div 
            const planteTable = document.createElement('div');
            planteTable.setAttribute("id", plante + "Mobile");
            planteTable.setAttribute("class", "container");
            planteTable.classList.add("row", "justify-content-start", "p-0", "pl-2", "m-0");

            // pour chaque plante d'un certain type, on crée une figure qui entre dans la div du type de la plante
            for (let j = 0; j < plantes[plante].length; j++) {

              planteTable.innerHTML = planteTable.innerHTML +

                `<figure class=" m-1 grid-item ${plante} row justify-content-center text-center" data-dismiss = "modal"><div class="text-center selection_plante"><img src="img/${plante}s/${plantes[plante][j]}.jpg"
           alt="${plantes[plante][j]}" class="plante"><span class="hoverTexte text-center">${plantes[plante][j]}</span></div> 
       <figcaption class="name text-capitalize mx-2">${plantes[plante][j]}</figcaption>   
       </figure>`;

            }

            // document.getElementById("spanVide").innerHTML=document.getElementById("spanVide").innerHTML + planteTable.innerHTML;
            document.getElementById("spanVide").after(planteTable);
            //  document.getElementById("plantesListeMobile").after(planteTable);

          }

          //Passage en majuscule de la première lettre de la légende des images de plantes et de leurs hover
          majFirstLetter(figcaption);
          //mise en forme et gestion images slick:

          $('#plantesListeMobile').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1200,
            dots: true, // faire apparaitre les points pour le défilement
            accessibility: true, // option d'accessibilité : active le défilement via les touches du clavier (gauche/droite) et la touche de sélection TAB
            swipe: true, // faire glisser avec la souris
            touchThreshold: 10, // si swipe = true, détermine la longueur du swipe nécessaire pour activer le défilement selon la règle :  (1/touchThreshold) * the width of the slider
          });


          // sélection de la plante cliquée : 
          jQuery('.selection_plante').on('click', (e) => {
            jQuery(e.currentTarget).addClass("ma_selection");
            const cases_cochees = jQuery('.div_selected');

            for (let i of cases_cochees) {

            //  console.log(jQuery('.selection_plante').html());
              cases_cochees.html(jQuery(e.currentTarget).html());

              jQuery('.div_selected').addClass('_plante');              
              // $('<div>').append($('#xxx').clone()).html();
              // cases_cochees.append(($(e.currentTarget)).clone().html()).html();              
              jQuery('.div_selected').removeClass('div_selected');
            }
          });
        });

        jQuery('._plante').on('dblclick', (e) => {
          console.log('clickclick');
          if (jQuery(e.currentTarget).html() != '') 
          {
            (jQuery(e.currentTarget).html(''))
          }
  
        });

      });
    }
    //apparition des boutons d'impression et de sauvegarde
    document.getElementById("print").classList.add("d-block");
    document.getElementById("jsonSave").classList.add("d-block");
    // document.getElementById("pdf").classList.add("d-block");
    document.getElementById("toGardenCreation").classList.add("d-block");
  }

  //sauvegarde Modele 02 JSon
  $("#jsonSaveModele2").on('click', () => sauvegardeModele2());


  //import json

  document.getElementById("importJson").addEventListener("change", (event) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      // console.log(event.target.result);
      const obj = JSON.parse(event.target.result);
      creationTable.innerHTML = obj.a + creationTable.innerHTML;
      console.log(creationTable);
    };
    reader.readAsText(event.target.files[0]);
    // creationTable.classList.remove("d-none");

  });

  // a la validation du téléchargement du fichier json: 
  document.getElementById('validationJardinImport').addEventListener('click', () => {
    importJSONFunction();
  });

  //Récupération des données du formulaire: au click, génération de la grille

  generation.addEventListener("click", (e) => {
    e.preventDefault();
    //génération de la grille
    if (largeur.value >= 0 && longueur.value >= 0) {
      const newTable = document.createElement("div");


      // ***** apparition du bloc texte : confirmation des dimensions du jardin ****
      const confirm_size = jQuery('.confirm_size');
      jQuery(confirm_size).addClass('d-block');


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
       //diparition possibilté import
       document.getElementById('importerVotreJardin').classList.add("d-none");   
    } else {
    }
  });



  //Au clic de validation de la grille

  validationGrille.addEventListener("click", (e) => {

    console.log('test');
    validationGrilleFonction();
  });

 //Sauvegarde sur le pc au format json d'un jardin:

 document.getElementById('jsonSave').addEventListener('click', () => {
  console.log('test3');
  
    sauvegarde()
  });
  
});


