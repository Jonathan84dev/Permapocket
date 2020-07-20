// Sur la page gardencreation.html: 
// 1.recup donnée du formulaire
// 2.creation du template de jardin + disparition du formulaire
// 3.Possibilité de retour au formulaire
// 4. validation du template et passage au drag and drop

// diverses constantes
const formulaire = document.getElementById('formulaire');
const newGarden = document.getElementById('creationTable');
const largeur = document.getElementById('largeur');
const longueur = document.getElementById('longueur');
const generation = document.getElementById('generation');
const returnCreation = document.getElementById('retourCreation');
const validationGrille = document.getElementById('validationGrille');

//création des tableaux de fruits et légumes

const fruits = ['fraise', 'groseille', 'framboise', 'cassis', 'melon', 'pastèque'];
const legumes = ['aubergine', 'courgette', 'carotte', 'tomate', 'pommes-de-terre', 'ail', 'oignon', 'echalotte'];
const herbes = ['thym', 'basilic', 'ciboulette', 'romarin', 'persil', 'estragon', 'cerfeuil', 'melisse', 'menthe', 'sauge'];

//Récupération des données du formulaire: au click, génération de la grille et apparition bouton de validation de la grille + disparition du formulaire et des boutons  

generation.addEventListener('click', () => {
  event.preventDefault();
  if (largeur.value >= 0 && longueur.value >= 0) {
    for (let i = 0; i < longueur.value; i++) {
      const newTr = document.createElement('div');
      newTr.classList.add('tr', 'row', 'col-12', 'flex-nowrap', 'justify-content-center', 'align-items-center', 'm-0');
      newGarden.prepend(newTr);

      for (let j = 0; j < largeur.value; j++) {
        const newTd = document.createElement('div');
        newTd.classList.add('td', 'cell', 'm-1', 'p-0');
        newTr.appendChild(newTd);
      }
    }

    formulaire.style.display = 'none';

    creationTable.classList.remove('d-none');

  } else { };
});

validationGrille.addEventListener('click', () => {

  //Au clic de validation de grille: apparition de la div contenant les imagges  
  document.getElementById('plantes').classList.add('d-block');

  //+chargement d'isotope
  const $grid = jQuery('.grid');

  $grid.isotope({

    itemSelector: '.grid-item',
    layoutMode: 'masonry',
    getSortData: {
      name: '.name',
      category: '[data-category]'
    }
  });

  //disparition des boutons la page précédente
  returnCreation.classList.add('d-none');
  validationGrille.classList.add('d-none');

  //apparition des boutons d'impression et de sauvegarde 
  document.getElementById('print').classList.add('d-block');
  document.getElementById('pdfSave').classList.add('d-block');

  //apparition de la modale d'explication
  document.getElementsByClassName('explicationVersionDesktop')[0].classList.add('d-block');



  //au clic sur les boutons de la modale ou en-dehors, disparition de la modale
  document.getElementById('modelId').addEventListener('click', () => {
    document.getElementById('modelId').classList.remove('d-block');
  });



   //Dragula

  //initialise drake
  var drake = dragula({ copy: true });
  //get the td's and figures element
  const td = document.getElementsByClassName('td');
  const figures = document.getElementsByTagName('figure');

  //push td's and figure's elements into drake's container
  const tableauTd = [];
  for (let i in td) {
    drake.containers.push(td[i]);
    tableauTd.push(td[i]);
  };

  for (let j in figures) {
    drake.containers.push(figures[j]);
  };

//permet de vider une case du jardin de son contenu si on veut repositionner l'élément
  drake.containers.push(tableauTd);
  let effacer = dragula(tableauTd, { removeOnSpill: true });

//empêche de faire un drag de l'élément figcaption
  drake.on('drag', function (el, target, source) {
    if (el.tagName === 'FIGCAPTION') {
      console.log(el.tagName);
      drake.cancel();
    }
  })
  //on drop event, if target container is already full, old image is removed
  drake.on('drop', function (el, target, source, sibling) {
    // console.log('tada');
    //   console.log(el);
    // console.log(target);
    // console.log(source);
    // console.log(sibling);
    // console.log(source.tagName);
    // console.log(target.children.length);
    // console.log(target.children);
    if (target.tagName === 'DIV') {
      for (let i of target.children) {

        if (!i.classList.contains('gu-transit')) {
          console.log(i);
          i.remove();

        }
      }
    }
    if ((source.tagName === 'DIV' || source.tagName === 'FIGURE') && (target.tagName === 'FIGURE' || target.tagName === 'FIGCAPTION')) {
      if (el.classList.contains('gu-transit'))
        console.log(el);
      drake.remove();
    }
  });
});