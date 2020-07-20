// Sur la page gardencreation.html: 
// 1.recup donnée du formulaire
// 2.creation du template de jardin + disparition du formulaire
// 3.Possibilité de retour au formulaire
// 4. validation du template et passage au drag and drop

const formulaire = document.getElementById('formulaire');
const newGarden = document.getElementById('creationTable');
const largeur = document.getElementById('largeur');
const longueur = document.getElementById('longueur');
const generation = document.getElementById('generation');
const returnCreation = document.getElementById('retourCreation');
const validationGrille = document.getElementById('validationGrille');

const fruits = ['fraise', 'groseille', 'framboise', 'cassis', 'melon', 'pastèque'];
const legumes = ['aubergine', 'courgette', 'carotte', 'tomate', 'pommes-de-terre', 'ail', 'oignon', 'echalotte'];
const herbes = ['thym', 'basilic', 'ciboulette', 'romarin', 'persil', 'estragon', 'cerfeuil', 'melisse', 'menthe', 'sauge'];

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
  document.getElementById('plantes').classList.add('d-md-block');
  

jQuery(document).ready(($) => {
  const $grid = jQuery('.grid');

  $grid.isotope({
    
      itemSelector: '.grid-item',
      layoutMode: 'masonry',
      getSortData: {
          name: '.name',
          category: '[data-category]'
      }
  });
});

  returnCreation.classList.add('d-none');
  validationGrille.classList.add('d-none');
  document.getElementById('print').classList.add('d-block');
  document.getElementById('pdfSave').classList.add('d-block');
  document.getElementsByClassName('explicationVersionDesktop')[0].classList.add('d-block');
  if (document.getElementById('exampleModal')) {
    document.getElementById('exampleModal').on('show.bs.modal', event => {
      var button = $(event.relatedTarget);
      var modal = $(this);
    });
  }

document.getElementById('modelId').addEventListener('click', () => {
    document.getElementById('modelId').classList.remove('d-block');
  });



  //Dragula

  var drake = dragula({copy:true});
  const td = document.getElementsByClassName('td');
  
  const tableauTd = [];
  for (let i in td) {
    drake.containers.push(td[i]);
    tableauTd.push(td[i]);
};

const figures = document.getElementsByTagName('figure');
console.log(figures);
const tabTwo = [];
  for (let j in figures) {
    drake.containers.push(figures[j]);
    // tableauTd.push(figures[j]);
    tabTwo.push(figures[j]);
};
 

console.log(tableauTd);
/*Pour drag and drop + copy*/
var drake = dragula([tableauTd, tabTwo], { copy: true });

/*Pour effacer d'un conteneur*/
var effacerImage = dragula(tableauTd, { removeOnSpill: true});

drake.on('drag', function () {
  console.log('test drake');
})
effacerImage.on('drag', function (el, target, source, sibling) {
  console.log('test effacer');
});

});

