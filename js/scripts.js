console.log(jQuery);


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
  }

    formulaire.style.display = 'none';

    creationTable.classList.remove('d-none');

    
    // Affichage mobile, selection des div 

let classCompteur = 0;     
const largeurEcran = window.innerWidth;

/* if (largeurEcran < 768) {
 */

if (largeurEcran < 768) {
jQuery('.td').on('click',(e) => {
    if (jQuery(e.currentTarget).hasClass('div_selected')) 
    {
      jQuery(e.currentTarget).removeClass('div_selected');
      classCompteur--;
    }
    else {
      classCompteur++;
      jQuery(e.currentTarget).addClass('div_selected');
    }

    if (classCompteur >= 1) {
      jQuery('.mobile_categories').attr( "style", "display: block")
    }
    else {
    jQuery('.mobile_categories').attr( "style", "display: none")
    }

  })

}



validationGrille.addEventListener('click', () => {
  if (window.innerWidth > 768) jQuery("#modelId").modal();
  document.getElementById('plantes').classList.add('d-md-block');
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

});

});
