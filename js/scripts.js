console.log(jQuery);

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

  //Fonction de sauvegarde en json du jardin: 
  const sauvegarde = (() => {
    const data = { a: document.getElementById("grilleDeJardin").innerHTML };
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const lien = document.getElementById('lienSave');
    lien.setAttribute('download', "monJardin.json");
    lien.setAttribute('href', url);
  });


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
          "m-0",
          "pl-0"
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

  if (largeurEcran < 768) {
    jQuery('.td').on('click', (e) => {
      if (jQuery(e.currentTarget).hasClass('div_selected')) {
        jQuery(e.currentTarget).removeClass('div_selected');
        classCompteur--;
      }
      else {
        classCompteur++;
        jQuery(e.currentTarget).addClass('div_selected');
      }

      if (classCompteur >= 1) {
        jQuery('.mobile_categories').attr("style", "display: block")
      }
      else {
        jQuery('.mobile_categories').attr("style", "display: none")
      }

    })

  }

  //Au clic de validation de la grille

  validationGrille.addEventListener("click", () => {
    if (window.innerWidth > 768) jQuery("#modelId").modal();

    //Création de la liste des plantes

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

    //disparition des boutons la page précédente
    returnCreation.classList.add("d-none");
    validationGrille.classList.add("d-none");

    //apparition des boutons d'impression et de sauvegarde
    document.getElementById("print").classList.add("d-block");
    document.getElementById("pdfSave").classList.add("d-block");
 document.getElementById("pdf").classList.add("d-block");

    //apparition de la modale d'explication
    document
      .getElementsByClassName("explicationVersionDesktop")[0]
      .classList.add("d-block");

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
  });

  //Sauvegarde sur le pc au format json d'un jardin:

  $("#pdfSave").on('click', () => sauvegarde());

  //import json

});
